
'use server';

import { collection, query, where, getDocs, Timestamp, orderBy } from 'firebase/firestore';
import { adminDB } from '@/lib/firebase-admin';

export type Exam = {
    id: string;
    title: string;
    description?: string;
    duration: number;
    courseId: string;
    createdAt: Date;
    questionCount: number;
    startDate?: Date;
    endDate?: Date;
};

export type Submission = {
    id: string;
    studentId: string;
    studentName: string;
    examId: string;
    examTitle: string;
    courseId: string;
    score: number;
    totalQuestions: number;
    submittedAt: Date;
    answers: (number | null)[];
}

export async function getExams(): Promise<Exam[]> {
    try {
        const snapshot = await adminDB.collection('exams').orderBy('createdAt', 'desc').get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                createdAt: (data.createdAt as Timestamp).toDate(),
                startDate: data.startDate ? (data.startDate as Timestamp).toDate() : undefined,
                endDate: data.endDate ? (data.endDate as Timestamp).toDate() : undefined,
            } as Exam;
        });
    } catch (error) {
        console.error("Error fetching exams:", error);
        return [];
    }
}

export async function getStudentSubmissions(studentId: string): Promise<Submission[]> {
    try {
        const q = adminDB.collection('examSubmissions').where("studentId", "==", studentId);
        const snapshot = await q.get();
        if (snapshot.empty) {
            return [];
        }
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                ...data,
                submittedAt: (data.submittedAt as Timestamp).toDate(),
            } as Submission;
        });
    } catch (error) {
        console.error("Error fetching student submissions:", error);
        return [];
    }
}
