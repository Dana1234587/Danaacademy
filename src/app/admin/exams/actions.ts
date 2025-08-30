
'use server';

import { z } from 'zod';
import { adminDB } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

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
        return snapshot.docs.map(doc => {
            const data = doc.data();
            return { 
                id: doc.id, 
                ...data,
                createdAt: data.createdAt.toDate(),
                startDate: data.startDate ? data.startDate.toDate() : undefined,
                endDate: data.endDate ? data.endDate.toDate() : undefined,
            } as Exam;
        });
    } catch (error) {
        console.error("Error fetching exams:", error);
        return [];
    }
}
