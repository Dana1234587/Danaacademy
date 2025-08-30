
'use server';

import { adminDB } from '@/lib/firebase-admin';
import type { Exam } from '@/app/admin/exams/actions';

interface Question {
    id: string;
    text: string;
    imageUrl?: string;
    options: string[];
    correctAnswerIndex: number;
    explanation?: string;
}

export interface ExamWithQuestions extends Exam {
    questions: Question[];
}

export async function getExamForStudent(examId: string): Promise<ExamWithQuestions | null> {
    try {
        const examRef = adminDB.collection('exams').doc(examId);
        const examSnap = await examRef.get();

        if (!examSnap.exists) {
            console.error(`No exam found with ID: ${examId}`);
            return null;
        }

        const examData = examSnap.data() as Omit<Exam, 'id'>;

        const questionsRef = examRef.collection('questions');
        const questionsSnap = await questionsRef.get();

        const questions = questionsSnap.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        } as Question));

        // In a real app, you would shuffle questions and options here.
        // For simplicity, we'll return them in order.

        return {
            id: examSnap.id,
            ...examData,
            createdAt: examData.createdAt.toDate(),
            startDate: examData.startDate ? examData.startDate.toDate() : undefined,
            endDate: examData.endDate ? examData.endDate.toDate() : undefined,
            questions,
        };

    } catch (error) {
        console.error("Error fetching exam for student:", error);
        throw new Error("Failed to load exam details.");
    }
}

interface SubmissionData {
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


export async function submitExamAction(data: SubmissionData): Promise<{success: boolean, submissionId?: string, error?: string}> {
    try {
        const submissionRef = await adminDB.collection('examSubmissions').add({
            ...data,
            submittedAt: new Date(), // Use server timestamp
        });
        return { success: true, submissionId: submissionRef.id };
    } catch(error: any) {
        console.error("Error submitting exam:", error);
        return { success: false, error: "فشل حفظ نتيجة الامتحان. الرجاء المحاولة مرة أخرى." };
    }
}
