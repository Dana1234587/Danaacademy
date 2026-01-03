import { NextRequest, NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ lessonId: string }> }
) {
    try {
        const resolvedParams = await params;
        const { lessonId } = resolvedParams;
        const { searchParams } = new URL(request.url);
        const studentId = searchParams.get('studentId');

        if (!studentId) {
            return NextResponse.json({ error: 'studentId is required' }, { status: 400 });
        }

        // جلب تقدم الطالب لهذه الحصة
        const progressDoc = await adminDB
            .collection('lessonProgress')
            .doc(`${studentId}_${lessonId}`)
            .get();

        if (!progressDoc.exists) {
            return NextResponse.json({
                progress: null,
                message: 'No progress found for this lesson'
            });
        }

        const data = progressDoc.data();
        return NextResponse.json({
            progress: {
                videoProgress: data?.videoProgress || { percentage: 0 },
                quizProgress: data?.quizProgress || { percentage: 0 },
                overallProgress: data?.overallProgress || 0,
                isCompleted: data?.isCompleted || false,
            }
        });
    } catch (error: any) {
        console.error('Error fetching lesson progress:', error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
