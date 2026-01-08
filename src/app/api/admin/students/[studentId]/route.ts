import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/firebase-admin';

export async function GET(
    request: NextRequest,
    { params }: { params: Promise<{ studentId: string }> }
) {
    try {
        const { studentId } = await params;

        if (!studentId) {
            return NextResponse.json({ success: false, error: 'Student ID is required' }, { status: 400 });
        }

        // جلب بيانات الطالب من Firestore
        const studentDoc = await db.collection('students').doc(studentId).get();

        if (!studentDoc.exists) {
            return NextResponse.json({ success: false, error: 'Student not found' }, { status: 404 });
        }

        const studentData = studentDoc.data();

        return NextResponse.json({
            success: true,
            student: {
                id: studentDoc.id,
                studentName: studentData?.studentName,
                email: studentData?.email,
                courses: studentData?.courses || [],
                courseIds: studentData?.courseIds || [],
                blockedCourses: studentData?.blockedCourses || [],
                gender: studentData?.gender,
                phone1: studentData?.phone1,
                phone2: studentData?.phone2,
            }
        });
    } catch (error) {
        console.error('Error fetching student:', error);
        return NextResponse.json({ success: false, error: 'Failed to fetch student' }, { status: 500 });
    }
}
