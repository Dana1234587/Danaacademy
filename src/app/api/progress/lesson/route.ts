import { NextRequest, NextResponse } from 'next/server';
import { getLessonProgress } from '@/services/progressService';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');
        const lessonId = searchParams.get('lessonId');

        if (!studentId || !lessonId) {
            return NextResponse.json(
                { error: 'Missing studentId or lessonId' },
                { status: 400 }
            );
        }

        const progress = await getLessonProgress(studentId, lessonId);

        return NextResponse.json({
            success: true,
            progress: progress ? {
                overallProgress: progress.overallProgress || 0,
                videoProgress: progress.videoProgress?.percentage || 0,
                quizProgress: progress.quizProgress?.percentage || 0,
                isCompleted: progress.isCompleted || false,
            } : null
        });
    } catch (error) {
        console.error('Error fetching lesson progress:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
