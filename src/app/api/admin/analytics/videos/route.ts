import { NextRequest, NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';

// Force dynamic to prevent static pre-rendering during build
export const dynamic = 'force-dynamic';

export interface VideoAnalyticsData {
    studentId: string;
    studentName: string;
    lessonId: string;
    lessonName: string;
    courseId: string;
    watchedSeconds: number;
    totalSeconds: number;
    percentage: number;
    lastPosition: number;
    updatedAt: Date | null;
}

export interface HeatmapData {
    lessonId: string;
    lessonName: string;
    totalStudents: number;
    avgPercentage: number;
    completionRate: number; // % of students who completed >80%
    totalWatchTime: number; // total seconds watched by all students
}

export async function GET(request: NextRequest) {
    console.log('📊 Video Analytics API called');

    try {
        // جلب جميع بيانات تقدم الطلاب
        const progressSnap = await adminDB.collection('studentProgress').get();

        if (progressSnap.empty) {
            console.log('No progress data found');
            return NextResponse.json({
                analytics: [],
                heatmap: [],
                summary: { totalStudents: 0, totalLessons: 0, avgProgress: 0 }
            });
        }

        // جلب بيانات الطلاب للأسماء
        const studentsSnap = await adminDB.collection('students').get();
        const studentNames: Record<string, string> = {};
        studentsSnap.docs.forEach(doc => {
            const data = doc.data();
            studentNames[data.uid || doc.id] = data.displayName || data.name || 'طالب';
        });

        const analytics: VideoAnalyticsData[] = [];
        const lessonStats: Record<string, {
            totalPercentage: number;
            count: number;
            completed: number;
            totalWatchTime: number;
        }> = {};

        progressSnap.docs.forEach(doc => {
            const data = doc.data();
            const videoProgress = data.videoProgress || {};

            const record: VideoAnalyticsData = {
                studentId: data.studentId,
                studentName: studentNames[data.studentId] || 'طالب',
                lessonId: data.lessonId,
                lessonName: extractLessonName(data.lessonId),
                courseId: data.courseId,
                watchedSeconds: videoProgress.watchedSeconds || 0,
                totalSeconds: videoProgress.totalSeconds || 0,
                percentage: videoProgress.percentage || 0,
                lastPosition: videoProgress.lastPosition || 0,
                updatedAt: data.updatedAt?.toDate() || null
            };

            analytics.push(record);

            // تجميع إحصائيات الدروس للـ heatmap
            if (!lessonStats[data.lessonId]) {
                lessonStats[data.lessonId] = {
                    totalPercentage: 0,
                    count: 0,
                    completed: 0,
                    totalWatchTime: 0
                };
            }
            lessonStats[data.lessonId].totalPercentage += record.percentage;
            lessonStats[data.lessonId].count++;
            lessonStats[data.lessonId].totalWatchTime += record.watchedSeconds;
            if (record.percentage >= 80) {
                lessonStats[data.lessonId].completed++;
            }
        });

        // بناء بيانات الخريطة الحرارية
        const heatmap: HeatmapData[] = Object.entries(lessonStats).map(([lessonId, stats]) => ({
            lessonId,
            lessonName: extractLessonName(lessonId),
            totalStudents: stats.count,
            avgPercentage: Math.round(stats.totalPercentage / stats.count),
            completionRate: Math.round((stats.completed / stats.count) * 100),
            totalWatchTime: Math.round(stats.totalWatchTime)
        }));

        // ترتيب حسب متوسط النسبة (تنازلي)
        heatmap.sort((a, b) => b.avgPercentage - a.avgPercentage);

        // ملخص عام
        const uniqueStudents = new Set(analytics.map(a => a.studentId)).size;
        const uniqueLessons = new Set(analytics.map(a => a.lessonId)).size;
        const totalProgress = analytics.reduce((sum, a) => sum + a.percentage, 0);

        const summary = {
            totalStudents: uniqueStudents,
            totalLessons: uniqueLessons,
            avgProgress: analytics.length > 0 ? Math.round(totalProgress / analytics.length) : 0,
            totalWatchTime: analytics.reduce((sum, a) => sum + a.watchedSeconds, 0)
        };

        console.log('✅ Video Analytics retrieved:', {
            recordCount: analytics.length,
            heatmapItems: heatmap.length,
            summary
        });

        return NextResponse.json({ analytics, heatmap, summary });
    } catch (error: any) {
        console.error('❌ Error in video analytics API:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}

/**
 * استخراج اسم الدرس من المعرف
 */
function extractLessonName(lessonId: string): string {
    if (!lessonId) return 'غير معروف';

    // المعرف بصيغة: physics-2008/physics-2008-first-semester/1-linear-momentum/1-lesson-name
    const parts = lessonId.split('/');
    const lastPart = parts[parts.length - 1] || lessonId;

    // تحويل من kebab-case إلى readable
    return lastPart
        .replace(/^\d+-/, '') // إزالة الأرقام البادئة
        .replace(/-/g, ' ')   // استبدال الشرطات بمسافات
        .replace(/\b\w/g, c => c.toUpperCase()); // Capitalize
}
