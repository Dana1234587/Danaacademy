'use server';

import { adminDB } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

// أنواع الأنشطة
export type ActivityType =
    | 'video_watch'
    | 'quiz_attempt'
    | 'lesson_complete'
    | 'login'
    | 'session_end'
    | 'course_enroll';

export interface ActivityDetails {
    lessonId?: string;
    lessonTitle?: string;
    courseId?: string;
    courseTitle?: string;
    unitId?: string;

    // للفيديو
    watchedSeconds?: number;
    totalSeconds?: number;
    videoPercentage?: number;

    // للأسئلة
    correctAnswers?: number;
    totalQuestions?: number;
    score?: number;

    // للجلسة
    sessionDuration?: number;
}

export interface ActivityLog {
    id?: string;
    studentId: string;
    studentName?: string;
    studentEmail?: string;
    type: ActivityType;
    details: ActivityDetails;
    createdAt?: any;
}

// تسجيل نشاط جديد
export async function logActivity(
    studentId: string,
    type: ActivityType,
    details: ActivityDetails,
    studentName?: string,
    studentEmail?: string
): Promise<{ success: boolean; activityId?: string }> {
    try {
        const activityRef = adminDB.collection('activityLogs').doc();

        await activityRef.set({
            studentId,
            studentName: studentName || '',
            studentEmail: studentEmail || '',
            type,
            details,
            createdAt: FieldValue.serverTimestamp(),
        });

        // تحديث آخر نشاط للطالب
        await updateStudentActivity(studentId);

        return { success: true, activityId: activityRef.id };
    } catch (error) {
        console.error('Error logging activity:', error);
        return { success: false };
    }
}

// تحديث آخر نشاط ووقت المستخدم
async function updateStudentActivity(studentId: string): Promise<void> {
    try {
        const studentRef = adminDB.collection('students').doc(studentId);
        const studentDoc = await studentRef.get();

        if (studentDoc.exists) {
            await studentRef.update({
                lastActivityAt: FieldValue.serverTimestamp(),
            });
        }
    } catch (error) {
        console.error('Error updating student activity:', error);
    }
}

// تسجيل دخول المستخدم
export async function logUserLogin(
    studentId: string,
    studentName?: string,
    studentEmail?: string
): Promise<{ success: boolean }> {
    try {
        // تسجيل نشاط الدخول
        await logActivity(studentId, 'login', {}, studentName, studentEmail);

        // تحديث بيانات الطالب
        const studentRef = adminDB.collection('students').doc(studentId);
        const studentDoc = await studentRef.get();

        if (studentDoc.exists) {
            await studentRef.update({
                lastLoginAt: FieldValue.serverTimestamp(),
                loginCount: FieldValue.increment(1),
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error logging user login:', error);
        return { success: false };
    }
}

// تحديث الوقت الكلي المقضي
export async function updateTotalTimeSpent(
    studentId: string,
    additionalSeconds: number
): Promise<{ success: boolean }> {
    try {
        const studentRef = adminDB.collection('students').doc(studentId);
        const studentDoc = await studentRef.get();

        if (studentDoc.exists) {
            await studentRef.update({
                totalTimeSpent: FieldValue.increment(additionalSeconds),
                lastActivityAt: FieldValue.serverTimestamp(),
            });
        }

        return { success: true };
    } catch (error) {
        console.error('Error updating total time spent:', error);
        return { success: false };
    }
}

// جلب سجل أنشطة طالب معين
export async function getStudentActivities(
    studentId: string,
    limit: number = 50,
    startAfter?: any
): Promise<{ activities: ActivityLog[]; hasMore: boolean }> {
    try {
        let query = adminDB
            .collection('activityLogs')
            .where('studentId', '==', studentId)
            .orderBy('createdAt', 'desc')
            .limit(limit + 1);

        if (startAfter) {
            query = query.startAfter(startAfter);
        }

        const snapshot = await query.get();
        const activities: ActivityLog[] = [];

        snapshot.docs.slice(0, limit).forEach((doc) => {
            activities.push({
                id: doc.id,
                ...doc.data(),
            } as ActivityLog);
        });

        return {
            activities,
            hasMore: snapshot.docs.length > limit,
        };
    } catch (error) {
        console.error('Error getting student activities:', error);
        return { activities: [], hasMore: false };
    }
}

// جلب آخر الأنشطة لجميع الطلاب (للأدمن)
export async function getRecentActivities(
    limit: number = 100
): Promise<ActivityLog[]> {
    try {
        const snapshot = await adminDB
            .collection('activityLogs')
            .orderBy('createdAt', 'desc')
            .limit(limit)
            .get();

        const activities: ActivityLog[] = [];
        snapshot.forEach((doc) => {
            activities.push({
                id: doc.id,
                ...doc.data(),
            } as ActivityLog);
        });

        return activities;
    } catch (error) {
        console.error('Error getting recent activities:', error);
        return [];
    }
}

// جلب إحصائيات النشاط لطالب معين
export async function getStudentActivityStats(studentId: string): Promise<{
    totalVideoTime: number;
    totalQuizzes: number;
    averageScore: number;
    lessonsCompleted: number;
    lastActivity: Date | null;
}> {
    try {
        const snapshot = await adminDB
            .collection('activityLogs')
            .where('studentId', '==', studentId)
            .get();

        let totalVideoTime = 0;
        let totalQuizzes = 0;
        let totalScore = 0;
        let lessonsCompleted = 0;
        let lastActivity: Date | null = null;

        snapshot.forEach((doc) => {
            const data = doc.data();

            if (data.type === 'video_watch' && data.details?.watchedSeconds) {
                totalVideoTime += data.details.watchedSeconds;
            }

            if (data.type === 'quiz_attempt') {
                totalQuizzes++;
                if (data.details?.score) {
                    totalScore += data.details.score;
                }
            }

            if (data.type === 'lesson_complete') {
                lessonsCompleted++;
            }

            if (data.createdAt && (!lastActivity || data.createdAt.toDate() > lastActivity)) {
                lastActivity = data.createdAt.toDate();
            }
        });

        return {
            totalVideoTime,
            totalQuizzes,
            averageScore: totalQuizzes > 0 ? Math.round(totalScore / totalQuizzes) : 0,
            lessonsCompleted,
            lastActivity,
        };
    } catch (error) {
        console.error('Error getting student activity stats:', error);
        return {
            totalVideoTime: 0,
            totalQuizzes: 0,
            averageScore: 0,
            lessonsCompleted: 0,
            lastActivity: null,
        };
    }
}
