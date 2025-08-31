
'use server';

/**
 * @fileOverview This file defines a Genkit flow for parsing and formatting a physics exam question.
 *
 * - generateExamQuestion - A function that takes a raw text question and formats it into a structured object with LaTeX.
 * - ExamQuestion - The return type for the generateExamQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

// Note: This schema is simplified. It only generates text for options, not image URLs.
// The front-end will need to handle the conversion to the full form schema.
const ExamQuestionSchema = z.object({
  text: z.string().describe('The question text. Should be in Arabic and can include LaTeX for formulas, like $\\Delta p = m(v_f - v_i)$.'),
  options: z.array(z.string()).length(4).describe('An array of four plausible and distinct possible answers. Can also include LaTeX.'),
  explanation: z.string().describe('A detailed step-by-step explanation for the correct answer. Should be in Arabic and can use LaTeX for formulas.'),
});

// This is the type that will be returned from the AI flow.
export type AiGeneratedExamQuestion = z.infer<typeof ExamQuestionSchema>;


export async function generateExamQuestion(rawQuestionText: string): Promise<AiGeneratedExamQuestion> {
  return generateExamQuestionFlow(rawQuestionText);
}

const generateQuestionPrompt = ai.definePrompt({
  name: 'generateExamQuestionPrompt',
  input: {schema: z.string()},
  output: {schema: ExamQuestionSchema},
  model: 'gemini-1.5-pro',
  prompt: `You are an intelligent text formatting and structuring assistant for a physics education platform.
Your task is to receive a block of text containing a physics question, four options, and an explanation.
You must parse this text, convert all physical formulas and variables into proper LaTeX format, and structure the output into the specified JSON format.

**CRITICAL INSTRUCTIONS:**
1.  **Parse the input:** Identify the distinct parts: question text, the four options, and the explanation. The input format will be clear but unstructured.
2.  **Format LaTeX:** Convert all physics notations, formulas, variables, and units into proper LaTeX. For example, 'v_f' should become '$v_f$', 'Delta p' should become '$\\Delta p$', '10 m/s' should become '$10 \\, \\text{m/s}$', 'kg.m/s' should become '$kg \\cdot m/s$'.
3.  **Structure Output:** Populate the JSON object according to the output schema. The 'options' field must be an array of exactly four strings.

**Example Input Text:**
---
السؤال: سيارة كتلتها 1000kg تتحرك بسرعة 20 m/s شرقًا. ما مقدار زخمها الخطي؟
الخيارات:
1) 20,000 kg.m/s شرقًا
2) 50 kg.m/s شرقًا
3) 20,000 kg/m.s شرقًا
4) 200,000 kg.m/s شرقًا
الشرح: الزخم الخطي (p) = الكتلة (m) × السرعة (v). إذن، p = 1000 kg * 20 m/s = 20,000 kg.m/s. الاتجاه هو نفس اتجاه السرعة، أي شرقًا.
---

**Example JSON Output based on the text above:**
{
  "text": "سيارة كتلتها $1000 \\, \\text{kg}$ تتحرك بسرعة $20 \\, \\text{m/s}$ شرقًا. ما مقدار زخمها الخطي؟",
  "options": [
    "$20,000 \\, \\text{kg} \\cdot \\text{m/s}$ شرقًا",
    "$50 \\, \\text{kg} \\cdot \\text{m/s}$ شرقًا",
    "$20,000 \\, \\text{kg/m} \\cdot \\text{s}$ شرقًا",
    "$200,000 \\, \\text{kg} \\cdot \\text{m/s}$ شرقًا"
  ],
  "explanation": "الزخم الخطي ($p$) = الكتلة ($m$) × السرعة ($v$). إذن، $p = 1000 \\, \\text{kg} \\times 20 \\, \\text{m/s} = 20,000 \\, \\text{kg} \\cdot \\text{m/s}$. الاتجاه هو نفس اتجاه السرعة، أي شرقًا."
}


**User-provided text to process:**
{{{input}}}
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
