import { NextRequest, NextResponse } from 'next/server';
import { updateVideoProgress } from '@/services/progressService';

// Force dynamic to prevent static pre-rendering during build
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            studentId,
            lessonId,
            courseId,
            watchedSeconds,
            totalSeconds,
            currentPosition,
            unitId
        } = body;

        if (!studentId || !lessonId || !courseId) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const result = await updateVideoProgress(
            studentId,
            lessonId,
            courseId,
            watchedSeconds || 0,
            totalSeconds || 0,
            currentPosition || 0,
            unitId
        );

        return NextResponse.json(result);
    } catch (error) {
        console.error('Error in video progress API:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
