import { NextRequest, NextResponse } from 'next/server';
import { updateVideoProgress } from '@/services/progressService';

// Force dynamic to prevent static pre-rendering during build
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    console.log('📥 Video progress API called');

    try {
        const body = await request.json();
        console.log('📦 Request body:', JSON.stringify(body, null, 2));

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
            console.log('❌ Missing required fields:', { studentId, lessonId, courseId });
            return NextResponse.json(
                { error: 'Missing required fields', details: { studentId: !!studentId, lessonId: !!lessonId, courseId: !!courseId } },
                { status: 400 }
            );
        }

        console.log('🔄 Calling updateVideoProgress with:', {
            studentId,
            lessonId,
            courseId,
            watchedSeconds: watchedSeconds || 0,
            totalSeconds: totalSeconds || 0,
            currentPosition: currentPosition || 0,
            unitId
        });

        const result = await updateVideoProgress(
            studentId,
            lessonId,
            courseId,
            watchedSeconds || 0,
            totalSeconds || 0,
            currentPosition || 0,
            unitId
        );

        console.log('✅ updateVideoProgress result:', result);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('❌ Error in video progress API:', error?.message || error);
        console.error('Stack:', error?.stack);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}

