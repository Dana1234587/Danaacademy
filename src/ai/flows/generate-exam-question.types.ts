
import { z } from 'genkit';

/**
 * @fileOverview Defines the data structures (types and schemas)
 * for the AI-powered exam question generation flow.
 */

export const ExamQuestionInputSchema = z.object({
  topic: z.string().describe('The physics topic for the question.'),
});
export type ExamQuestionInput = z.infer<typeof ExamQuestionInputSchema>;


export const ExamQuestionOutputSchema = z.object({
  text: z.string().describe('The question text. Should be in Arabic and use LaTeX for formulas, for example: $$\\Delta p = m(v_f - v_i)$$'),
  options: z.array(z.string()).length(4).describe('An array of exactly four string options for the multiple-choice question. Options should be in Arabic and use LaTeX for formulas.'),
  correctAnswerIndex: z.number().min(0).max(3).describe('The index (0-3) of the correct answer in the options array.'),
  explanation: z.string().describe('A detailed explanation for the correct answer, in Arabic, using LaTeX for formulas.'),
});

export type ExamQuestion = z.infer<typeof ExamQuestionOutputSchema>;
