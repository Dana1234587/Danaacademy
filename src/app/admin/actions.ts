// This file is intentionally blank. It can be used for future admin-wide server actions.
'use server';

import { generateExamQuestion, ExamQuestion as AIGeneratedQuestion } from '@/ai/flows/generate-exam-question';
import type { ExamQuestion } from './create-exam/page';

export async function generateExamQuestionAction(topic: string): Promise<{
    success: boolean,
    data?: ExamQuestion,
    error?: string,
}> {
    if (!topic) {
        return { success: false, error: 'Topic cannot be empty.' };
    }
    
    try {
        const aiResult: AIGeneratedQuestion = await generateExamQuestion(topic);

        // Convert the AI result to the form's schema structure
        const question: ExamQuestion = {
            ...aiResult,
            imageUrl: '', // AI doesn't generate image URLs for the question itself yet
            explanationImageUrl: '', // AI doesn't generate image URLs for the explanation yet
            options: aiResult.options.map(opt => ({ text: opt, imageUrl: '' }))
        };

        return { success: true, data: question };
    } catch (e) {
        console.error("Error in generateExamQuestionAction:", e);
        const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred while generating the question.';
        return { success: false, error: errorMessage };
    }
}
