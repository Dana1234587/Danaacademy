
export interface QuizQuestion {
  id: number;
  questionText: string;
  image?: string;
  imageHint?: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
}

const firstQuestion: QuizQuestion = {
  id: 1,
  questionText: 'اختر رمز الإجابة الصحيحة',
  image: 'https://i.ibb.co/Xr1bh4G/1.png',
  imageHint: 'rotational equilibrium question',
  options: ['أ', 'ب', 'ج', 'د'],
  correctAnswerIndex: 0,
  explanation: 'لتحقيق الاتزان الدوراني، يجب أن تكون محصلة العزوم تساوي صفرًا (Στ = 0). نختار محور الدوران عند النقطة O. العزم مع عقارب الساعة يكون سالبًا وعكس عقارب الساعة يكون موجبًا.\n\nالعزم الموجب (عكس عقارب الساعة): τ_ccw = 10 N * 1 m = +10 N.m\n\nالعزوم السالبة (مع عقارب الساعة): τ_cw = -(20 N * 0.5 m) - (F * 1 m) = -10 - F\n\nمجموع العزوم: Στ = 10 - 10 - F = 0\n\nإذن: 0 - F = 0  =>  F = 0 N.\n\nالإجابة الصحيحة هي (أ).',
};

const secondQuestion: QuizQuestion = {
    id: 2,
    questionText: `اختر رمز الإجابة الصحيحة`,
    image: `https://i.ibb.co/GfH6MqBW/2.png`,
    imageHint: 'moment of inertia question',
    options: ['أ', 'ب', 'ج', 'د'],
    correctAnswerIndex: 1,
    explanation: 'القصور الذاتي الدوراني الأصلي يُعطى بالعلاقة I = mr². \nعندما تتضاعف الكتلة (m\' = 2m) ويقل نصف القطر إلى النصف (r\' = r/2)، يصبح القصور الذاتي الجديد:\nI\' = m\'(r\')²\nI\' = (2m)(r/2)²\nI\' = (2m)(r²/4)\nI\' = (2/4)mr²\nI\' = (1/2)mr²\nبما أن I = mr²، فإن I\' = I/2. الإجابة الصحيحة هي (ب).',
};

const placeholderQuestions: QuizQuestion[] = [
    {
        id: 3,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/396PKKrG/3.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0, 
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 3.`,
    },
    {
        id: 4,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/6RYJVmh2/4.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 4.`,
    },
    {
        id: 5,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/BV3Z6jFX/5.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 5.`,
    },
    {
        id: 6,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/1YFmkxB3/6.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 6.`,
    },
    {
        id: 7,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/mr1PyV6y/7.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 7.`,
    },
    {
        id: 8,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/W4HWLnSW/8.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 8.`,
    },
    {
        id: 9,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/VprFdfDq/9.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 9.`,
    },
    {
        id: 10,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/h1HCDr8x/10.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 10.`,
    },
    {
        id: 11,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/qKvbm6n/11.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 11.`,
    },
    {
        id: 12,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/SXPLzqw7/12.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 12.`,
    },
    {
        id: 13,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/60pHNbyr/13.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 13.`,
    },
    {
        id: 14,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/G3v3D5Bv/14.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 14.`,
    },
    {
        id: 15,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://i.ibb.co/wFxzJFLG/15.png`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0,
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم 15.`,
    },
    ...Array.from({ length: 5 }, (_, i) => ({
        id: i + 16,
        questionText: `اختر رمز الإجابة الصحيحة`,
        image: `https://placehold.co/800x400?text=Question+${i + 16}`,
        imageHint: 'physics question',
        options: ['أ', 'ب', 'ج', 'د'],
        correctAnswerIndex: 0, // Default to 'أ' for now
        explanation: `سيتم إضافة شرح مفصل للإجابة الصحيحة هنا بعد مراجعة السؤال رقم ${i + 16}.`,
    }))
];

export const unit2QuizQuestions: QuizQuestion[] = [firstQuestion, secondQuestion, ...placeholderQuestions];
