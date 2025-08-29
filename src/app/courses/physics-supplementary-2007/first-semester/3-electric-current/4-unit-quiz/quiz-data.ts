
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
    questionText: 'ما هي وحدة قياس التيار الكهربائي في النظام الدولي للوحدات؟',
    image: '',
    imageHint: '',
    options: [
        'الفولت (V)',
        'الأوم (Ω)',
        'الأمبير (A)',
        'الواط (W)',
    ],
    correctAnswerIndex: 2,
    explanation: 'وحدة قياس التيار الكهربائي هي الأمبير (A)، والتي تُعرّف بأنها كولوم واحد يمر عبر نقطة ما في الثانية الواحدة. الفولت هو وحدة الجهد، الأوم هو وحدة المقاومة، والواط هو وحدة القدرة.',
  },
  // سيتم إضافة باقي الأسئلة هنا
];
