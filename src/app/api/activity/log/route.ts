import { NextRequest, NextResponse } from 'next/server';
import { logActivity, ActivityType, ActivityDetails } from '@/services/activityService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            studentId,
            type,
            details,
            studentName,
            studentEmail
        } = body;

        if (!studentId || !type) {
            return NextResponse.json(
                { error: 'Missing required fields: studentId and type are required' },
                { status: 400 }
            );
        }

        const validTypes: ActivityType[] = [
            'video_watch',
            'quiz_attempt',
            'lesson_complete',
            'login',
            'session_end',
            'course_enroll'
        ];

        if (!validTypes.includes(type)) {
            return NextResponse.json(
                { error: `Invalid activity type. Valid types: ${validTypes.join(', ')}` },
                { status: 400 }
            );
        }

        const result = await logActivity(
            studentId,
            type as ActivityType,
            details || {},
            studentName,
            studentEmail
        );

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error in activity log API:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
