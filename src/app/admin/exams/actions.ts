
'use server';

import { z } from 'zod';
import { adminDB } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { generateExamQuestion, type AiGeneratedExamQuestion } from '@/ai/flows/generate-exam-question';


const questionOptionSchema = z.object({
  text: z.string().min(1, { message: 'لا يمكن ترك الخيار فارغًا.' }),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
});


const examQuestionSchema = z.object({
  text: z.string().min(10, { message: 'نص السؤال قصير جدًا.' }),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
  options: z.array(questionOptionSchema).length(4, { message: 'يجب أن يكون هناك 4 خيارات.' }),
  correctAnswerIndex: z.coerce.number().min(0).max(3),
  explanation: z.string().optional(),
  explanationImageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
});

const examFormSchema = z.object({
  title: z.string().min(5, { message: 'يجب أن يكون عنوان الامتحان 5 أحرف على الأقل.' }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: 'يجب أن تكون مدة الامتحان دقيقة واحدة على الأقل.' }),
  attemptsAllowed: z.coerce.number().min(1, { message: 'يجب أن يكون عدد المحاولات 1 على الأقل.' }),
  courseId: z.string({ required_error: 'الرجاء اختيار الدورة.' }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  questions: z.array(examQuestionSchema).min(1, { message: 'يجب إضافة سؤال واحد على الأقل.' }),
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
export type ExamQuestion = z.infer<typeof examQuestionSchema>;


export type Exam = {
    id: string;
    title: string;
    description?: string;
    duration: number;
    attemptsAllowed: number;
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
        console.error("Exam validation failed:", validation.error.flatten());
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

export async function updateExamAction(examId: string, data: ExamFormValues) {
    const validation = examFormSchema.safeParse(data);
    if (!validation.success) {
        console.error("Exam validation failed:", validation.error.flatten());
        return { success: false, error: 'بيانات الإدخال غير صالحة.' };
    }

    const { questions, ...examData } = validation.data;

    try {
        const examDocRef = adminDB.collection('exams').doc(examId);

        const examPayload = {
            ...examData,
            questionCount: questions.length,
            // We don't update createdAt
        };

        const batch = adminDB.batch();
        batch.update(examDocRef, examPayload);

        // This is a simple but destructive way to update questions: delete all old ones, then add all new ones.
        // A more complex implementation would diff the arrays.
        const questionsCollectionRef = examDocRef.collection('questions');
        const oldQuestionsSnapshot = await questionsCollectionRef.get();
        oldQuestionsSnapshot.docs.forEach(doc => batch.delete(doc.ref));

        questions.forEach(question => {
            const questionDocRef = questionsCollectionRef.doc();
            batch.set(questionDocRef, question);
        });

        await batch.commit();
        
        return { success: true, examId: examDocRef.id };

    } catch (error: any) {
        console.error(`Error updating exam ${examId}: `, error);
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
        throw error;
    }
}

export async function getAllSubmissions(): Promise<Submission[]> {
    try {
        const snapshot = await adminDB.collection('examSubmissions').orderBy('submittedAt', 'desc').get();
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
        throw error;
    }
}


export async function getExamSubmissions(examId: string): Promise<Submission[]> {
    try {
        const q = adminDB.collection('examSubmissions').where("examId", "==", examId);
        const snapshot = await q.get();
        
        if (snapshot.empty) {
            return [];
        }
        
        const submissions = snapshot.docs.map(doc => {
             const data = doc.data();
             return {
                id: doc.id,
                ...data,
                submittedAt: (data.submittedAt as Timestamp).toDate(),
             } as Submission;
        });

        // Sort in code to avoid composite indexes for now
        return submissions.sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime());

    } catch (error) {
        console.error(`Error fetching submissions for exam ${examId}:`, error);
        throw error;
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
        throw error;
    }
}

export async function generateExamQuestionAction(rawQuestionText: string): Promise<{
    success: boolean,
    data?: ExamQuestion,
    error?: string,
}> {
    if (!rawQuestionText) {
        return { success: false, error: 'نص السؤال لا يمكن أن يكون فارغًا.' };
    }
    try {
        const aiResult: AiGeneratedExamQuestion = await generateExamQuestion(rawQuestionText);
        
        // Transform the AI result to match the form schema precisely
        const questionForForm: ExamQuestion = {
            text: aiResult.text,
            imageUrl: '', // AI doesn't generate images
            options: aiResult.options.map(opt => ({ text: opt, imageUrl: '' })),
            correctAnswerIndex: 0, // Default to the first option, user must change it
            explanation: aiResult.explanation || '', 
            explanationImageUrl: '', // AI doesn't generate images
        };
        
        return { success: true, data: questionForForm };

    } catch (e: any) {
        console.error("Error in generateExamQuestionAction:", e);
        // Provide a more descriptive error message to the user
        const errorMessage = e.message || 'An unknown error occurred while generating the question.';
        return { success: false, error: `فشل في توليد السؤال: ${errorMessage}` };
    }
}
