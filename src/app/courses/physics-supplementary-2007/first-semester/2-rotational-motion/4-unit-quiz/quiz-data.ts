
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
  {
      id: 2,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/GfH6MqBW/2.png`,
      imageHint: 'moment of inertia question',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: 'القصور الذاتي الدوراني الأصلي يُعطى بالعلاقة I = mr². \nعندما تتضاعف الكتلة (m\' = 2m) ويقل نصف القطر إلى النصف (r\' = r/2)، يصبح القصور الذاتي الجديد:\nI\' = m\'(r\')²\nI\' = (2m)(r/2)²\nI\' = (2m)(r²/4)\nI\' = (2/4)mr²\nI\' = (1/2)mr²\nبما أن I = mr²، فإن I\' = I/2. الإجابة الصحيحة هي (ب).',
  },
  {
      id: 3,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/396PKKrG/3.png`,
      imageHint: 'physics question circular motion',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 0, 
      explanation: `الزخم الخطي كمية متجهة. في الحركة الدائرية بسرعة ثابتة المقدار، يتغير اتجاه السرعة باستمرار، وبالتالي يتغير اتجاه الزخم الخطي. لذا، الزخم الخطي متغير.`,
  },
  {
      id: 4,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/6RYJVmh2/4.png`,
      imageHint: 'physics question equilibrium',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 0,
      explanation: `لتحقيق الاتزان، محصلة العزوم حول نقطة الارتكاز تساوي صفر. عزم F1 = 60 * 2 = 120 N.m (عكس عقارب الساعة). عزم F2 = F2 * 6 (مع عقارب الساعة). إذن 6 * F2 = 120، مما يعني أن F2 = 20 N.`,
  },
  {
      id: 5,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/BV3Z6jFX/5.png`,
      imageHint: 'physics question angular velocity',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 3,
      explanation: `حسب قانون نيوتن الثاني للحركة الدورانية (Στ = Iα). إذا كانت السرعة الزاوية ثابتة، فإن التسارع الزاوي (α) يساوي صفر. وبالتالي، محصلة العزم تساوي صفر.`,
  },
  {
      id: 6,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/1YFmkxB3/6.png`,
      imageHint: 'physics question moment of inertia comparison',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 3,
      explanation: `عزم القصور الذاتي يعتمد على توزيع الكتلة حول محور الدوران (I = Σmr²). أقل عزم قصور ذاتي يكون عندما تكون الكتل أقرب ما يمكن لمحور الدوران، كما في الشكل (د).`,
  },
  {
      id: 7,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/mr1PyV6y/7.png`,
      imageHint: 'physics question seesaw balance',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: `عندما يقترب الطفل الأثقل من نقطة الارتكاز، يقل عزمه (τ = Fd). سيصبح عزم الطفل الأخف هو الأكبر، مما يسبب دوران الأرجوحة باتجاه الطفل الذي كتلته أصغر.`,
  },
  {
      id: 8,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/W4HWLnSW/8.png`,
      imageHint: 'physics question rotational motion',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 2,
      explanation: `من معادلات الحركة الدورانية: Δθ = ω₀t + ½αt². بما أن الجسم بدأ من السكون، فإن θ₁ (للثانية الأولى) = ½α(1)² = ½α. الإزاحة الكلية بعد ثانيتين θ_total = ½α(2)² = 2α. إذن، الإزاحة في الثانية الثانية فقط هي θ₂ = θ_total - θ₁ = 2α - ½α = 1.5α = 3 * (½α) = 3θ.`,
  },
  {
      id: 9,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/VprFdfDq/9.png`,
      imageHint: 'physics question conservation of angular momentum',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 0,
      explanation: `بسبب مبدأ حفظ الزخم الزاوي (L = Iω)، عندما تضم الراقصة ذراعيها يقل عزم قصورها الذاتي (I) لأن الكتلة تقترب من محور الدوران. للحفاظ على L ثابتًا، يجب أن تزداد السرعة الزاوية (ω).`,
  },
  {
      id: 10,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/h1HCDr8x/10.png`,
      imageHint: 'physics question work energy theorem rotational',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: `الشغل المبذول يساوي التغير في الطاقة الحركية الدورانية: W = ΔK = ½I(ω_f² - ω_i²). بالتعويض: W = ½ * 3 * (10² - 6²) = 1.5 * (100 - 36) = 1.5 * 64 = 96 J.`,
  },
  {
      id: 11,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/qKvbm6n/11.png`,
      imageHint: 'physics question rotational work',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 2,
      explanation: `الشغل الدوراني W = τΔθ. يجب تحويل الدورات إلى راديان: Δθ = 20 revolutions * 2π rad/revolution = 40π rad. إذن W = 10 N.m * 40π rad = 400π J.`,
  },
  {
      id: 12,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/SXPLzqw7/12.png`,
      imageHint: 'physics question rolling race',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: `الجسم الذي يصل أولاً هو الذي يمتلك أصغر عزم قصور ذاتي، لأنه يحول جزءًا أكبر من طاقته إلى طاقة حركية انتقالية. ترتيب القصور الذاتي من الأصغر للأكبر: كرة مصمتة (⅖MR²) < اسطوانة/قرص (½MR²) < حلقة (MR²). لذا الكرة هي الأسرع.`,
  },
  {
      id: 13,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/60pHNbyr/13.png`,
      imageHint: 'physics question static equilibrium tension',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: `من الاتزان الرأسي: T₁sin(30) + T₂sin(30) = mg = 100. ومن الاتزان الأفقي: T₁cos(30) = T₂cos(30)، مما يعني T₁ = T₂. بالتعويض في المعادلة الأولى: 2 * T₁ * sin(30) = 100  =>  2 * T₁ * 0.5 = 100  => T₁ = 100 N. إذن T₂ = 100 N.`,
  },
  {
      id: 14,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/G3v3D5Bv/14.png`,
      imageHint: 'physics question angular momentum comparison',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 3,
      explanation: `الزخم الزاوي L = Iω. بما أن السرعة الزاوية (ω) متساوية للجميع، فإن الجسم الذي له أكبر زخم زاوي هو الذي له أكبر عزم قصور ذاتي (I). الحلقة تمتلك أكبر عزم قصور ذاتي (I=MR²) مقارنة ببقية الأشكال.`,
  },
  {
      id: 15,
      questionText: `اختر رمز الإجابة الصحيحة`,
      image: `https://i.ibb.co/wFxzJFLG/15.png`,
      imageHint: 'physics question rotational dynamics',
      options: ['أ', 'ب', 'ج', 'د'],
      correctAnswerIndex: 1,
      explanation: `أولاً، نحسب العزم: τ = F * r_perp = 10 N * 0.5 m = 5 N.m. ثم نستخدم قانون نيوتن الثاني للدوران: Στ = Iα. إذن: 5 = 2 * α، مما يعطي α = 2.5 rad/s².`,
  }
];
