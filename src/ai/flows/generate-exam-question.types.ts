import { z } from 'genkit';

/**
 * @fileOverview This file defines the data structures (types and schemas)
 * for the exam question generation flow. It is separated from the main flow
 * file to comply with Next.js 'use server' module constraints.
 */

// This is the output schema that the AI will be forced to return.
export const ExamQuestionSchema = z.object({
  text: z.string().describe('The question text. Should be in Arabic and can include LaTeX for formulas, like $\\Delta p = m(v_f - v_i)$.'),
  options: z.array(z.string()).length(4).describe('An array of four plausible and distinct possible answers. Can also include LaTeX.'),
  explanation: z.string().describe('A detailed step-by-step explanation for the correct answer. Should be in Arabic and can use LaTeX for formulas.'),
});

// This is the type that will be returned from the AI flow.
export type AiGeneratedExamQuestion = z.infer<typeof ExamQuestionSchema>;
