
export interface QuizQuestion {
  id: number;
  questionText: string;
  image?: string;
  imageHint?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const unit2QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'اختر رمز الإجابة الصحيحة',
    image: 'https://i.ibb.co/Xr1bh4G7/1.png',
    imageHint: 'rotational equilibrium question',
    options: ['أ', 'ب', 'ج', 'د'],
    correctAnswerIndex: 0,
    explanation: 'لتحقيق الاتزان الدوراني، يجب أن تكون محصلة العزوم تساوي صفرًا (Στ = 0). نختار محور الدوران عند النقطة O. العزم مع عقارب الساعة يكون سالبًا وعكس عقارب الساعة يكون موجبًا.\n\nالعزم الموجب (عكس عقارب الساعة): τ_ccw = 10 N * 1 m = +10 N.m\n\nالعزوم السالبة (مع عقارب الساعة): τ_cw = -(20 N * 0.5 m) - (F * 1 m) = -10 - F\n\nمجموع العزوم: Στ = 10 - 10 - F = 0\n\nإذن: 0 - F = 0  =>  F = 0 N.\n\nالإجابة الصحيحة هي (أ).',
  },
  ...Array.from({ length: 19 }, (_, i) => ({
    id: i + 2,
    questionText: `اختر رمز الإجابة الصحيحة`,
    image: `https://placehold.co/800x400?text=Question+${i + 2}`,
    imageHint: 'physics question',
    options: ['أ', 'ب', 'ج', 'د'],
    correctAnswerIndex: 0, // Default to 'أ' for now
    explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم ${i + 2}.`,
  }))
];
