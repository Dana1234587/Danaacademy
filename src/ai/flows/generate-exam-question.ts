// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating a single physics exam question.
 *
 * - generateExamQuestion - A function that generates one question based on a given topic.
 * - ExamQuestion - The return type for the generateExamQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Note: This schema is simplified. It only generates text for options, not image URLs.
// The front-end will need to handle the conversion to the full form schema.
const ExamQuestionSchema = z.object({
  text: z.string().describe('The question text. Should be in Arabic and can include LaTeX for formulas, like $\\Delta p = m(v_f - v_i)$.'),
  options: z.array(z.string()).length(4).describe('An array of four possible answers. Can also include LaTeX.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The 0-based index of the correct answer in the options array.'),
  explanation: z.string().describe('A detailed explanation for the correct answer. Should be in Arabic and can include LaTeX.'),
});

export type ExamQuestion = z.infer<typeof ExamQuestionSchema>;


export async function generateExamQuestion(topic: string): Promise<ExamQuestion> {
  return generateExamQuestionFlow(topic);
}

const generateQuestionPrompt = ai.definePrompt({
  name: 'generateExamQuestionPrompt',
  input: {schema: z.string()},
  output: {schema: ExamQuestionSchema},
  prompt: `You are an expert physics teacher specializing in the Tawjihi curriculum.
  Your task is to generate a single, high-quality multiple-choice question based on the provided topic.

  Topic: {{{input}}}

  The question must be in Arabic.
  The question and options can and should use LaTeX for formulas where appropriate (e.g., $\\Delta p = m(v_f - v_i)$).
  Ensure the options are plausible and that there is only one unambiguously correct answer.
  Provide a clear and detailed explanation for the correct answer.
  `,
});

const generateExamQuestionFlow = ai.defineFlow(
  {
    name: 'generateExamQuestionFlow',
    inputSchema: z.string(),
    outputSchema: ExamQuestionSchema,
  },
  async input => {
    const {output} = await generateQuestionPrompt(input);
    return output!;
  }
);
