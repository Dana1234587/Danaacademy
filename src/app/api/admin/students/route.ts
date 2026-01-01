import { NextRequest, NextResponse } from 'next/server';
import { adminDB } from '@/lib/firebase-admin';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
    try {
        // Get all students with their stats
        const studentsSnapshot = await adminDB.collection('students').get();

        const students = studentsSnapshot.docs.map((doc) => {
            const data = doc.data();
            return {
                id: doc.id,
                studentName: data.studentName || '',
                username: data.username || '',
                email: data.email || '',
                courses: data.courses || [],
                courseIds: data.courseIds || [],
                gender: data.gender || 'male',
                phone1: data.phone1 || '',
                phone2: data.phone2 || '',
                totalTimeSpent: data.totalTimeSpent || 0,
                lastLoginAt: data.lastLoginAt?.toDate?.() || null,
                lastActivityAt: data.lastActivityAt?.toDate?.() || null,
                loginCount: data.loginCount || 0,
                createdAt: data.createdAt?.toDate?.() || null,
            };
        });

        return NextResponse.json({
            success: true,
            students
        });
    } catch (error: any) {
        console.error('Error fetching students with stats:', error?.message || error);
        return NextResponse.json(
            { error: 'Internal server error', message: error?.message },
            { status: 500 }
        );
    }
}
