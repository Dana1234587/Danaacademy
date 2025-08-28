
export interface QuizQuestion {
  id: number;
  questionText: string;
  image?: string;
  imageHint?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const unit2QuizQuestions: QuizQuestion[] = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  questionText: `السؤال ${i + 1}: انظر إلى الصورة واختر الإجابة الصحيحة.`,
  image: `https://placehold.co/800x400?text=Question+${i + 1}`,
  imageHint: 'physics question',
  options: ['أ', 'ب', 'ج', 'د'],
  correctAnswerIndex: i % 4, // Distributes answers somewhat evenly (0, 1, 2, 3, 0, 1, ...)
  explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم ${i + 1}.`,
}));
