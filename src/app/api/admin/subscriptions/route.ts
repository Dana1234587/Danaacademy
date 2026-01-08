import { NextRequest, NextResponse } from 'next/server';
import { blockCourseForAllStudents, unblockCourseForAllStudents, getBlockedCountPerCourse } from '@/services/studentService';

export const dynamic = 'force-dynamic';

// GET: عدد الطلاب المحظورين لكل كورس
export async function GET() {
    try {
        const counts = await getBlockedCountPerCourse();
        return NextResponse.json({ success: true, counts });
    } catch (error: any) {
        console.error('Error getting blocked counts:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}

// POST: حظر أو إلغاء حظر كورس عن كل طلابه
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { courseId, action } = body;

        if (!courseId || !action) {
            return NextResponse.json(
                { success: false, error: 'Missing courseId or action' },
                { status: 400 }
            );
        }

        if (action === 'block') {
            const result = await blockCourseForAllStudents(courseId);
            return NextResponse.json({
                success: true,
                message: `تم حظر ${result.blockedCount} طالب من الكورس`,
                ...result
            });
        } else if (action === 'unblock') {
            const result = await unblockCourseForAllStudents(courseId);
            return NextResponse.json({
                success: true,
                message: `تم إلغاء حظر ${result.unblockedCount} طالب`,
                ...result
            });
        } else {
            return NextResponse.json(
                { success: false, error: 'Invalid action. Use "block" or "unblock"' },
                { status: 400 }
            );
        }
    } catch (error: any) {
        console.error('Error managing course block:', error);
        return NextResponse.json(
            { success: false, error: error?.message || 'Unknown error' },
            { status: 500 }
        );
    }
}
