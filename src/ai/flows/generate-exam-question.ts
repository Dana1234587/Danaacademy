
'use server';

/**
 * @fileOverview A Genkit flow for generating a single, unique, high-quality physics exam question.
 */

import { ai } from '@/ai/genkit';
import {
    ExamQuestionInputSchema,
    ExamQuestionOutputSchema,
    type ExamQuestion,
    type ExamQuestionInput
} from './generate-exam-question.types';
import { gemini15Flash } from '@genkit-ai/googleai';


export async function generateExamQuestion(input: ExamQuestionInput): Promise<ExamQuestion> {
  return generateExamQuestionFlow(input);
}


const generateQuestionPrompt = ai.definePrompt({
    name: 'generateExamQuestionPrompt',
    model: gemini15Flash,
    input: { schema: ExamQuestionInputSchema },
    output: { schema: ExamQuestionOutputSchema },
    system: `You are an expert physics author and educator. Your task is to create a single, original, high-quality multiple-choice question.

    **CRITICAL INSTRUCTIONS:**
    1.  **Originality is paramount.** DO NOT copy, rephrase, or use any existing questions. You must generate a completely new and unique question based on the provided topic.
    2.  **Use LaTeX for all formulas and symbols.** Any symbol that is not an Arabic letter must be enclosed in single dollar signs. For example, write 'كتلة مقدارها $m_1 = 2 \\text{ kg}$' NOT 'كتلة مقدارها m_1 = 2 kg'.
    3.  **Language:** All text (question, options, explanation) must be in Arabic.
    4.  **Format:** The output must strictly follow the provided JSON schema. Ensure there are exactly 4 options.`,

    prompt: `Generate a multiple-choice physics question about the topic: {{{topic}}}.`
});


const generateExamQuestionFlow = ai.defineFlow(
  {
    name: 'generateExamQuestionFlow',
    inputSchema: ExamQuestionInputSchema,
    outputSchema: ExamQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await generateQuestionPrompt(input);
    if (!output) {
      throw new Error('AI failed to generate a question.');
    }
    return output;
  }
);
