import { NextRequest, NextResponse } from 'next/server';
import { getStudentActivities, getStudentActivityStats } from '@/services/activityService';

export const dynamic = 'force-dynamic';

export async function GET(
    request: NextRequest,
    { params }: { params: { studentId: string } }
) {
    try {
        const studentId = params.studentId;
        const { searchParams } = new URL(request.url);
        const limit = parseInt(searchParams.get('limit') || '50');
        const includeStats = searchParams.get('includeStats') === 'true';

        if (!studentId) {
            return NextResponse.json(
                { error: 'Missing studentId parameter' },
                { status: 400 }
            );
        }

        const { activities, hasMore } = await getStudentActivities(studentId, limit);

        let stats = null;
        if (includeStats) {
            stats = await getStudentActivityStats(studentId);
        }

        return NextResponse.json({
            success: true,
            activities,
            hasMore,
            stats
        });
    } catch (error: any) {
        console.error('Error fetching student activities:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
