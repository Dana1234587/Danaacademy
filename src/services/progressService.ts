'use server';

/**
 * Progress Service - تتبع تقدم الطالب في الدروس
 * يتتبع مشاهدة الفيديو وحل الأسئلة
 */

import { adminDB } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// أنواع البيانات
export interface VideoProgress {
    watchedSeconds: number;
    totalSeconds: number;
    percentage: number;
    lastPosition: number;
}

export interface QuizProgress {
    correctAnswers: number;
    totalQuestions: number;
    percentage: number;
}

export interface LessonProgress {
    studentId: string;
    lessonId: string;
    courseId: string;
    unitId?: string;
    videoProgress: VideoProgress;
    quizProgress: QuizProgress;
    overallProgress: number;
    isCompleted: boolean;
    updatedAt: Date;
}

// وزن كل نوع في الحساب الكلي
const VIDEO_WEIGHT = 0.6; // 60%
const QUIZ_WEIGHT = 0.4;  // 40%

/**
 * إنشاء معرف فريد للتقدم
 */
function getProgressId(studentId: string, lessonId: string): string {
    return `${lessonId}_${studentId}`;
}

/**
 * حساب التقدم الكلي
 */
function calculateOverallProgress(videoPercentage: number, quizPercentage: number): number {
    return Math.round((videoPercentage * VIDEO_WEIGHT) + (quizPercentage * QUIZ_WEIGHT));
}

/**
 * تحديث تقدم مشاهدة الفيديو
 */
export async function updateVideoProgress(
    studentId: string,
    lessonId: string,
    courseId: string,
    watchedSeconds: number,
    totalSeconds: number,
    currentPosition: number,
    unitId?: string
): Promise<{ success: boolean; progress: number }> {
    try {
        const progressId = getProgressId(studentId, lessonId);
        const docRef = adminDB.collection('studentProgress').doc(progressId);

        const videoPercentage = totalSeconds > 0
            ? Math.min(100, Math.round((watchedSeconds / totalSeconds) * 100))
            : 0;

        const doc = await docRef.get();

        if (doc.exists) {
            const existing = doc.data() as LessonProgress;

            // نحدث فقط إذا كان التقدم أعلى
            const newWatchedSeconds = Math.max(existing.videoProgress?.watchedSeconds || 0, watchedSeconds);
            const newPercentage = Math.max(existing.videoProgress?.percentage || 0, videoPercentage);

            const overallProgress = calculateOverallProgress(
                newPercentage,
                existing.quizProgress?.percentage || 0
            );

            await docRef.update({
                'videoProgress.watchedSeconds': newWatchedSeconds,
                'videoProgress.totalSeconds': totalSeconds,
                'videoProgress.percentage': newPercentage,
                'videoProgress.lastPosition': currentPosition,
                overallProgress,
                isCompleted: overallProgress >= 80,
                updatedAt: FieldValue.serverTimestamp(),
            });

            return { success: true, progress: overallProgress };
        } else {
            // إنشاء سجل جديد
            const overallProgress = calculateOverallProgress(videoPercentage, 0);

            await docRef.set({
                studentId,
                lessonId,
                courseId,
                unitId: unitId || '',
                videoProgress: {
                    watchedSeconds,
                    totalSeconds,
                    percentage: videoPercentage,
                    lastPosition: currentPosition,
                },
                quizProgress: {
                    correctAnswers: 0,
                    totalQuestions: 0,
                    percentage: 0,
                },
                overallProgress,
                isCompleted: overallProgress >= 80,
                updatedAt: FieldValue.serverTimestamp(),
            });

            return { success: true, progress: overallProgress };
        }
    } catch (error) {
        console.error('Error updating video progress:', error);
        return { success: false, progress: 0 };
    }
}

/**
 * تحديث تقدم حل الأسئلة
 */
export async function updateQuizProgress(
    studentId: string,
    lessonId: string,
    courseId: string,
    correctAnswers: number,
    totalQuestions: number,
    unitId?: string
): Promise<{ success: boolean; progress: number }> {
    try {
        const progressId = getProgressId(studentId, lessonId);
        const docRef = adminDB.collection('studentProgress').doc(progressId);

        const quizPercentage = totalQuestions > 0
            ? Math.round((correctAnswers / totalQuestions) * 100)
            : 0;

        const doc = await docRef.get();

        if (doc.exists) {
            const existing = doc.data() as LessonProgress;

            // نحدث فقط إذا كان التقدم أعلى
            const newCorrectAnswers = Math.max(existing.quizProgress?.correctAnswers || 0, correctAnswers);
            const newPercentage = Math.max(existing.quizProgress?.percentage || 0, quizPercentage);

            const overallProgress = calculateOverallProgress(
                existing.videoProgress?.percentage || 0,
                newPercentage
            );

            await docRef.update({
                'quizProgress.correctAnswers': newCorrectAnswers,
                'quizProgress.totalQuestions': totalQuestions,
                'quizProgress.percentage': newPercentage,
                overallProgress,
                isCompleted: overallProgress >= 80,
                updatedAt: FieldValue.serverTimestamp(),
            });

            return { success: true, progress: overallProgress };
        } else {
            // إنشاء سجل جديد
            const overallProgress = calculateOverallProgress(0, quizPercentage);

            await docRef.set({
                studentId,
                lessonId,
                courseId,
                unitId: unitId || '',
                videoProgress: {
                    watchedSeconds: 0,
                    totalSeconds: 0,
                    percentage: 0,
                    lastPosition: 0,
                },
                quizProgress: {
                    correctAnswers,
                    totalQuestions,
                    percentage: quizPercentage,
                },
                overallProgress,
                isCompleted: overallProgress >= 80,
                updatedAt: FieldValue.serverTimestamp(),
            });

            return { success: true, progress: overallProgress };
        }
    } catch (error) {
        console.error('Error updating quiz progress:', error);
        return { success: false, progress: 0 };
    }
}

/**
 * الحصول على تقدم درس معين
 */
export async function getLessonProgress(
    studentId: string,
    lessonId: string
): Promise<LessonProgress | null> {
    try {
        const progressId = getProgressId(studentId, lessonId);
        const doc = await adminDB.collection('studentProgress').doc(progressId).get();

        if (!doc.exists) return null;

        const data = doc.data();
        return {
            ...data,
            updatedAt: data?.updatedAt?.toDate() || new Date(),
        } as LessonProgress;
    } catch (error) {
        console.error('Error getting lesson progress:', error);
        return null;
    }
}

/**
 * الحصول على تقدم كل دروس دورة معينة
 */
export async function getCourseProgress(
    studentId: string,
    courseId: string
): Promise<LessonProgress[]> {
    try {
        const snapshot = await adminDB.collection('studentProgress')
            .where('studentId', '==', studentId)
            .where('courseId', '==', courseId)
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                updatedAt: data?.updatedAt?.toDate() || new Date(),
            } as LessonProgress;
        });
    } catch (error) {
        console.error('Error getting course progress:', error);
        return [];
    }
}

/**
 * الحصول على ملخص تقدم الطالب في دورة
 */
export async function getCourseSummary(
    studentId: string,
    courseId: string
): Promise<{
    totalLessons: number;
    completedLessons: number;
    averageProgress: number;
    videoAverage: number;
    quizAverage: number;
}> {
    try {
        const progress = await getCourseProgress(studentId, courseId);

        if (progress.length === 0) {
            return {
                totalLessons: 0,
                completedLessons: 0,
                averageProgress: 0,
                videoAverage: 0,
                quizAverage: 0,
            };
        }

        const completedLessons = progress.filter(p => p.isCompleted).length;
        const videoSum = progress.reduce((sum, p) => sum + (p.videoProgress?.percentage || 0), 0);
        const quizSum = progress.reduce((sum, p) => sum + (p.quizProgress?.percentage || 0), 0);
        const overallSum = progress.reduce((sum, p) => sum + (p.overallProgress || 0), 0);

        return {
            totalLessons: progress.length,
            completedLessons,
            averageProgress: Math.round(overallSum / progress.length),
            videoAverage: Math.round(videoSum / progress.length),
            quizAverage: Math.round(quizSum / progress.length),
        };
    } catch (error) {
        console.error('Error getting course summary:', error);
        return {
            totalLessons: 0,
            completedLessons: 0,
            averageProgress: 0,
            videoAverage: 0,
            quizAverage: 0,
        };
    }
}

// ============ دوال للأدمن ============

export interface StudentProgressSummary {
    studentId: string;
    studentName: string;
    courses: string[];
    totalLessons: number;
    completedLessons: number;
    videoAverage: number;
    quizAverage: number;
    overallAverage: number;
    lastActivity: Date | null;
}

/**
 * الحصول على تقدم جميع الطلاب (للأدمن)
 */
export async function getAllStudentsProgress(): Promise<LessonProgress[]> {
    try {
        const snapshot = await adminDB.collection('studentProgress')
            .orderBy('updatedAt', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                updatedAt: data?.updatedAt?.toDate() || new Date(),
            } as LessonProgress;
        });
    } catch (error) {
        console.error('Error getting all students progress:', error);
        return [];
    }
}

/**
 * الحصول على تقدم طالب معين في جميع الدروس
 */
export async function getStudentFullProgress(studentId: string): Promise<LessonProgress[]> {
    try {
        const snapshot = await adminDB.collection('studentProgress')
            .where('studentId', '==', studentId)
            .orderBy('updatedAt', 'desc')
            .get();

        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                ...data,
                updatedAt: data?.updatedAt?.toDate() || new Date(),
            } as LessonProgress;
        });
    } catch (error) {
        console.error('Error getting student full progress:', error);
        return [];
    }
}
