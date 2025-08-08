// This file is machine-generated - edit with care!

'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating quizzes on specific physics subtopics.
 *
 * - generateQuiz - A function that generates a quiz based on a given subtopic and difficulty level.
 * - GenerateQuizInput - The input type for the generateQuiz function.
 * - GenerateQuizOutput - The return type for the generateQuiz function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateQuizInputSchema = z.object({
  subtopic: z
    .string()
    .describe('The specific physics subtopic for which to generate the quiz.'),
  difficulty: z
    .string()
    .describe(
      'The difficulty level of the quiz (e.g., easy, medium, hard).'
    ),
});

export type GenerateQuizInput = z.infer<typeof GenerateQuizInputSchema>;

const GenerateQuizOutputSchema = z.object({
  quiz: z.string().describe('The generated quiz questions and answers.'),
});

export type GenerateQuizOutput = z.infer<typeof GenerateQuizOutputSchema>;

export async function generateQuiz(input: GenerateQuizInput): Promise<GenerateQuizOutput> {
  return generateQuizFlow(input);
}

const generateQuizPrompt = ai.definePrompt({
  name: 'generateQuizPrompt',
  input: {schema: GenerateQuizInputSchema},
  output: {schema: GenerateQuizOutputSchema},
  prompt: `You are an expert physics teacher.

  Generate a quiz for the following physics subtopic with the specified difficulty level.

  Subtopic: {{{subtopic}}}
  Difficulty: {{{difficulty}}}

  The quiz should include multiple-choice questions and their corresponding answers.
  Return the quiz questions and answers.
  Make sure to include the correct answer.
  `,
});

const generateQuizFlow = ai.defineFlow(
  {
    name: 'generateQuizFlow',
    inputSchema: GenerateQuizInputSchema,
    outputSchema: GenerateQuizOutputSchema,
  },
  async input => {
    const {output} = await generateQuizPrompt(input);
    return output!;
  }
);
