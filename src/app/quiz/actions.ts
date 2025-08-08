"use server";

import { z } from "zod";
import { generateQuiz, type GenerateQuizInput } from "@/ai/flows/generate-quiz";

const formSchema = z.object({
  subtopic: z.string(),
  difficulty: z.string(),
});

export async function generateQuizAction(
  input: z.infer<typeof formSchema>
): Promise<{ success: boolean; data?: { quiz: string }; error?: string }> {
  const validatedInput = formSchema.safeParse(input);
  if (!validatedInput.success) {
    return { success: false, error: "Invalid input." };
  }
  
  const difficultyMap = {
    "سهل": "easy",
    "متوسط": "medium",
    "صعب": "hard"
  }

  const aiInput: GenerateQuizInput = {
    subtopic: validatedInput.data.subtopic,
    difficulty: difficultyMap[validatedInput.data.difficulty as keyof typeof difficultyMap] || "medium",
  };

  try {
    const output = await generateQuiz(aiInput);
    return { success: true, data: output };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return { success: false, error: errorMessage };
  }
}
