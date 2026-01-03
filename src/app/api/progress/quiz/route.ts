import { NextRequest, NextResponse } from 'next/server';
import { updateQuizProgress } from '@/services/progressService';

// Force dynamic to prevent static pre-rendering during build
export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    console.log('📥 Quiz progress API called');

    try {
        const body = await request.json();
        console.log('📦 Request body:', JSON.stringify(body, null, 2));

        const {
            studentId,
            lessonId,
            courseId,
            correctAnswers,
            totalQuestions,
            unitId
        } = body;

        if (!studentId || !lessonId || !courseId) {
            console.log('❌ Missing required fields:', { studentId, lessonId, courseId });
            return NextResponse.json(
                { error: 'Missing required fields', details: { studentId: !!studentId, lessonId: !!lessonId, courseId: !!courseId } },
                { status: 400 }
            );
        }

        console.log('🔄 Calling updateQuizProgress with:', {
            studentId,
            lessonId,
            courseId,
            correctAnswers: correctAnswers || 0,
            totalQuestions: totalQuestions || 0,
            unitId
        });

        const result = await updateQuizProgress(
            studentId,
            lessonId,
            courseId,
            correctAnswers || 0,
            totalQuestions || 0,
            unitId
        );

        console.log('✅ updateQuizProgress result:', result);
        return NextResponse.json(result);
    } catch (error: any) {
        console.error('❌ Error in quiz progress API:', error?.message || error);
        console.error('Stack:', error?.stack);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
