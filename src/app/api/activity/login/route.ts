import { NextRequest, NextResponse } from 'next/server';
import { logUserLogin } from '@/services/activityService';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const { studentId, studentName, studentEmail } = body;

        if (!studentId) {
            return NextResponse.json(
                { error: 'Missing required field: studentId' },
                { status: 400 }
            );
        }

        const result = await logUserLogin(studentId, studentName, studentEmail);

        return NextResponse.json(result);
    } catch (error: any) {
        console.error('Error in login log API:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
