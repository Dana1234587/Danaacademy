
'use server';

import { z } from 'zod';
import { adminDB } from '@/lib/firebase-admin';
import { FieldValue, Timestamp, collection, getDocs } from 'firebase-admin/firestore';

const examFormSchema = z.object({
  title: z.string().min(5, { message: 'يجب أن يكون عنوان الامتحان 5 أحرف على الأقل.' }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: 'يجب أن تكون مدة الامتحان دقيقة واحدة على الأقل.' }),
  courseId: z.string({ required_error: 'الرجاء اختيار الدورة.' }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  questions: z.array(
    z.object({
      text: z.string().min(10, { message: 'نص السؤال قصير جدًا.' }),
      imageUrl: z.string().url().optional().or(z.literal('')),
      options: z.array(z.string().min(1, { message: 'لا يمكن ترك الخيار فارغًا.' })).length(4, { message: 'يجب أن يكون هناك 4 خيارات.' }),
      correctAnswerIndex: z.coerce.number().min(0).max(3),
      explanation: z.string().optional(),
    })
  ).min(1, { message: 'يجب إضافة سؤال واحد على الأقل.' }),
}).refine(data => {
    if (data.endDate && !data.startDate) {
        return false;
    }
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
        return false;
    }
    return true;
}, {
    message: 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.',
    path: ['endDate'],
});


export type ExamFormValues = z.infer<typeof examFormSchema>;

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


export async function createExamAction(data: ExamFormValues) {
    const validation = examFormSchema.safeParse(data);
    if (!validation.success) {
        return { success: false, error: 'بيانات الإدخال غير صالحة.' };
    }

    const { questions, ...examData } = validation.data;

    try {
        const examCollection = adminDB.collection('exams');
        const examDocRef = examCollection.doc();

        const examPayload = {
            ...examData,
            questionCount: questions.length,
            createdAt: FieldValue.serverTimestamp(),
        };

        const batch = adminDB.batch();
        batch.set(examDocRef, examPayload);

        const questionsCollectionRef = examDocRef.collection('questions');
        questions.forEach(question => {
            const questionDocRef = questionsCollectionRef.doc();
            batch.set(questionDocRef, question);
        });

        await batch.commit();
        
        return { success: true, examId: examDocRef.id };

    } catch (error: any) {
        console.error("Error creating exam: ", error);
        return { success: false, error: error.message };
    }
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

export async function getAllSubmissions(): Promise<Submission[]> {
    try {
        const snapshot = await adminDB.collection('examSubmissions').get();
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
        console.error("Error fetching all submissions:", error);
        return [];
    }
}


export async function getExamSubmissions(examId: string): Promise<Submission[]> {
    try {
        const q = adminDB.collection('examSubmissions').where("examId", "==", examId).orderBy('submittedAt', 'desc');
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
        console.error(`Error fetching submissions for exam ${examId}:`, error);
        return [];
    }
}

export async function getExamDetails(examId: string): Promise<Exam | null> {
    try {
        const docRef = adminDB.collection('exams').doc(examId);
        const docSnap = await docRef.get();
        if (!docSnap.exists) {
            return null;
        }
        const data = docSnap.data()!;
         return { 
            id: docSnap.id, 
            ...data,
            createdAt: (data.createdAt as Timestamp).toDate(),
            startDate: data.startDate ? (data.startDate as Timestamp).toDate() : undefined,
            endDate: data.endDate ? (data.endDate as Timestamp).toDate() : undefined,
        } as Exam;

    } catch (error) {
        console.error(`Error fetching exam details for ${examId}:`, error);
        return null;
    }
}

  
