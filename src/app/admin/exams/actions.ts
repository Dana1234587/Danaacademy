
'use server';

import { z } from 'zod';
import { adminDB } from '@/lib/firebase-admin';
import { FieldValue, Timestamp } from 'firebase-admin/firestore';
import { generateExamQuestion } from '@/ai/flows/generate-exam-question';
import type { ExamQuestion as AIExamQuestion } from '@/ai/flows/generate-exam-question.types';
import { unit1QuizQuestions as u1q } from '@/app/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/3-unit-quiz/quiz-data';
import { unit2QuizQuestions as u2q } from '@/app/courses/physics-supplementary-2007/first-semester/2-rotational-motion/4-unit-quiz/quiz-data';
import { unit3QuizQuestions as u3q } from '@/app/courses/physics-supplementary-2007/first-semester/3-electric-current/4-unit-quiz/quiz-data';


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
    status: 'active' | 'inactive';
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

const templateMap = {
    'unit1': { questions: u1q, courseId: 'tawjihi-2007-supplementary' },
    'unit2': { questions: u2q, courseId: 'tawjihi-2007-supplementary' },
    'unit3': { questions: u3q, courseId: 'tawjihi-2007-supplementary' },
};


export async function createExamFromTemplateAction(templateId: keyof typeof templateMap) {
    const template = templateMap[templateId];
    if (!template) {
        return { success: false, error: 'قالب الامتحان غير موجود.' };
    }

    const questions = template.questions.map(q => ({
        text: q.questionText,
        imageUrl: q.image,
        options: q.options.map(opt => ({
            text: typeof opt === 'string' ? opt : opt.text,
            imageUrl: typeof opt === 'string' ? '' : opt.image,
        })),
        correctAnswerIndex: q.correctAnswerIndex,
        explanation: q.explanation,
        explanationImageUrl: '',
    }));

    const examData: ExamFormValues = {
        title: `امتحان من قالب: ${templateId}`,
        description: `امتحان تم إنشاؤه تلقائيًا من قالب ${templateId}`,
        duration: 60,
        attemptsAllowed: 1,
        courseId: template.courseId,
        questions: questions,
    };
    
    return createExamAction(examData);
}


export async function generateQuestionAction(topic: string): Promise<{ success: boolean, question?: AIExamQuestion, error?: string }> {
    if (!topic || topic.trim().length < 5) {
        return { success: false, error: 'الرجاء إدخال موضوع واضح ومحدد.' };
    }
    try {
        const question = await generateExamQuestion({ topic });
        return { success: true, question };
    } catch (e: any) {
        console.error("Error in generateQuestionAction:", e);
        return { success: false, error: e.message || 'فشل إنشاء السؤال بواسطة الذكاء الاصطناعي.' };
    }
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
            status: 'inactive' as const, // Exams are inactive by default
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
            // We don't update createdAt or status here
        };

        const batch = adminDB.batch();
        batch.update(examDocRef, examPayload);

        // This is a simple but destructive way to update questions: delete all old ones, then add all new ones.
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

export async function toggleExamStatusAction(examId: string, currentStatus: 'active' | 'inactive'): Promise<{success: boolean, error?: string}> {
    try {
        const newStatus = currentStatus === 'active' ? 'inactive' : 'active';
        await adminDB.collection('exams').doc(examId).update({ status: newStatus });
        return { success: true };
    } catch(error: any) {
        console.error(`Error toggling status for exam ${examId}:`, error);
        return { success: false, error: "فشل تغيير حالة الامتحان."};
    }
}

export async function deleteExamAction(examId: string): Promise<{success: boolean, error?: string}> {
    try {
        const examDocRef = adminDB.collection('exams').doc(examId);
        
        // It's good practice to delete subcollections if they exist, but for now we delete the main doc
        // For a more robust solution, a batched write or a Cloud Function would be needed to delete subcollections recursively.
        await examDocRef.delete();

        return { success: true };

    } catch(error: any) {
        console.error(`Error deleting exam ${examId}:`, error);
        return { success: false, error: "فشل حذف الامتحان."};
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
                status: data.status || 'inactive', // Default to inactive if not set
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
            status: data.status || 'inactive',
        } as Exam;

    } catch (error) {
        console.error(`Error fetching exam details for ${examId}:`, error);
        throw error;
    }
}
