
export interface QuizQuestion {
  id: number;
  questionText: string;
  image?: string;
  imageHint?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

// Manually create the first question and then spread the rest
const firstQuestion = {
    id: 1,
    questionText: 'في الشكل المجاور، إذا كانت محصلة العزوم المؤثرة في العارضة تساوي صفرًا، فإن مقدار القوة F بوحدة N تساوي:',
    image: 'https://i.ibb.co/Xr1bh4G/1.png',
    imageHint: 'rotational equilibrium question',
    options: ['أ', 'ب', 'ج', 'د'],
    correctAnswerIndex: 0,
    explanation: 'لتحقيق الاتزان الدوراني، يجب أن تكون محصلة العزوم تساوي صفرًا (Στ = 0). نختار محور الدوران عند النقطة O. العزم مع عقارب الساعة يكون سالبًا وعكس عقارب الساعة يكون موجبًا.\n\nالعزم الموجب (عكس عقارب الساعة): τ_ccw = 10 N * 1 m = +10 N.m\n\nالعزوم السالبة (مع عقارب الساعة): τ_cw = -(20 N * 0.5 m) - (F * 1 m) = -10 - F\n\nمجموع العزوم: Στ = 10 - 10 - F = 0\n\nإذن: 0 - F = 0  =>  F = 0 N.\n\nالإجابة الصحيحة هي (أ).',
};

const placeholderQuestions = Array.from({ length: 19 }, (_, i) => ({
  id: i + 2,
  questionText: `السؤال ${i + 2}: انظر إلى الصورة واختر الإجابة الصحيحة.`,
  image: `https://placehold.co/800x400?text=Question+${i + 2}`,
  imageHint: 'physics question',
  options: ['أ', 'ب', 'ج', 'د'],
  correctAnswerIndex: 0, // Default to 'أ' for now
  explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم ${i + 2}.`,
}));

export const unit2QuizQuestions: QuizQuestion[] = [firstQuestion, ...placeholderQuestions];
