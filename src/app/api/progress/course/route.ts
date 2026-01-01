import { NextRequest, NextResponse } from 'next/server';
import { getCourseProgress, getCourseSummary } from '@/services/progressService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const courseId = searchParams.get('courseId');

        if (!studentId || !courseId) {
            return NextResponse.json(
                { error: 'Missing required fields: studentId and courseId' },
                { status: 400 }
            );
        }

        console.log('📊 Course progress API called:', { studentId, courseId });

        const [summary, lessons] = await Promise.all([
            getCourseSummary(studentId, courseId),
            getCourseProgress(studentId, courseId),
        ]);

        console.log('📊 Course progress result:', {
            courseId,
            lessonsCount: lessons.length,
            summaryProgress: summary?.averageProgress || 0
        });

        return NextResponse.json({
            success: true,
            summary,
            lessons
        });
    } catch (error: any) {
        console.error('Error fetching course progress:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
