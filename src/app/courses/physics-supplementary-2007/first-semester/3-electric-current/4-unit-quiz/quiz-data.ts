
export interface QuizQuestion {
  id: number;
  questionText: string;
  image?: string;
  imageHint?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const unit3QuizQuestions: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'إذا علمت أن كمية شحنة مقدارها $600 \\mu C$ تعبر مقطع الموصل خلال $10 ms$، فإن كمية الشحنة التي تعبر مقطع الموصل خلال $0.5 s$ (بوحدة المايكروكولوم) هي:',
    image: '',
    imageHint: '',
    options: [
        '$0.03 \\mu C$',
        '$3 \\times 10^4 \\mu C$',
        '$60 \\mu C$',
        '$0.06 \\mu C$',
    ],
    correctAnswerIndex: 1,
    explanation: '<b>الحل:</b><br/>أولاً، نحسب التيار الكهربائي (I) المار في الموصل، والذي يكون ثابتًا.<br/>I = Δq / Δt<br/>I = (600 × 10⁻⁶ C) / (10 × 10⁻³ s) = 0.06 A<br/><br/>الآن، نستخدم هذا التيار لحساب الشحنة الجديدة (q_new) التي تعبر خلال الزمن الجديد (t_new).<br/>q_new = I × t_new<br/>q_new = 0.06 A × 0.5 s = 0.03 C<br/><br/>أخيرًا، نحول الشحنة من كولوم إلى مايكروكولوم:<br/>0.03 C × (1,000,000 μC / 1 C) = 30,000 μC = 3 × 10⁴ μC<br/><b>الإجابة الصحيحة هي (ب).</b>',
  },
  // سيتم إضافة باقي الأسئلة هنا
];
