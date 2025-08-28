
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
    questionText: 'مسطرة مهملة الوزن طولها $100\\text{cm}$ قابلة للدوران حول محور يمر بمنتصفها $O$. عند الطرفين $A$ و $B$ تؤثر قوتان رأسيّتان مقدار كلٍّ منهما $60\\text{N}$ (إحداهما لأعلى عند $A$ والأخرى لأسفل عند $B$). وعلى نقطتين داخليتين $C$ و $D$ (بحيث $AC=BD=30\\text{cm}$) تؤثر قوتان مائلتان مقدار كلٍّ منهما $F$ بزاوية $30^\\circ$ مع المسطرة (كما في الشكل). إذا كانت المسطرة في حالة اتزان، فأوجد $F$.',
    image: 'https://i.ibb.co/Xr1bh4G7/1.png',
    imageHint: 'rotational equilibrium question with multiple forces',
    options: [
      '$60\\text{N}$',
      '$150\\text{N}$',
      '$300\\text{N}$',
      '$600\\text{N}$'
    ],
    correctAnswerIndex: 2,
    explanation: `لحل السؤال، يمكن استخدام طريقتين وكلاهما يؤدي إلى نفس النتيجة الصحيحة:

**الطريقة الأولى: حساب محصلة العزوم حول المحور O**

بما أن المسطرة في حالة اتزان، فإن محصلة العزوم حول أي نقطة تساوي صفرًا. نختار محور الدوران عند النقطة $O$ ونعتبر الدوران عكس عقارب الساعة موجبًا.
1.  **عزم القوة عند A:** يسبب دورانًا عكس عقارب الساعة (+). المسافة $r_A = 50\\text{cm} = 0.5\\text{m}$.
    $\\tau_A = r_A \\times F_A = 0.5 \\times 60 = +30 \\text{ N.m}$
2.  **عزم القوة عند B:** يسبب دورانًا عكس عقارب الساعة (+) أيضًا.
    $\\tau_B = r_B \\times F_B = 0.5 \\times 60 = +30 \\text{ N.m}$
3.  **عزم القوة عند C:** المركبة العمودية للقوة هي $F \\sin(30^\\circ)$ وتسبب دورانًا مع عقارب الساعة (-). المسافة $r_C = 50 - 30 = 20\\text{cm} = 0.2\\text{m}$.
    $\\tau_C = -r_C \\times (F \\sin 30^\\circ) = -0.2 \\times F \\times 0.5 = -0.1 F$
4.  **عزم القوة عند D:** المركبة العمودية للقوة هي $F \\sin(30^\\circ)$ وتسبب دورانًا مع عقارب الساعة (-). المسافة $r_D = 50 - 30 = 20\\text{cm} = 0.2\\text{m}$.
    $\\tau_D = -r_D \\times (F \\sin 30^\\circ) = -0.2 \\times F \\times 0.5 = -0.1 F$

**تطبيق شرط الاتزان:**
$\\Sigma \\tau = \\tau_A + \\tau_B + \\tau_C + \\tau_D = 0$
$30 + 30 - 0.1F - 0.1F = 0$
$60 - 0.2F = 0 \\implies 60 = 0.2F$
$F = \\frac{60}{0.2} = 300 \\text{ N}$

---

**الطريقة الثانية: استخدام عزم الازدواج**

1.  **الازدواج الأول:** القوتان عند A و B (60N) تكونان ازدواجًا يسبب دورانًا **عكس عقارب الساعة** (+).
    $\\tau_1 = 60 \\text{ N} \\times 1.0 \\text{ m} = +60 \\text{ N.m}$
2.  **الازدواج الثاني:** القوتان F تكونان ازدواجًا آخر. المركبة العمودية لكل قوة هي $F \\sin(30^\\circ)$. هذا الازدواج يسبب دورانًا **مع عقارب الساعة** (-). المسافة العمودية بينهما هي $40\\text{cm} = 0.4\\text{m}$.
    $\\tau_2 = -(F \\sin 30^\\circ) \\times 0.4\\text{m} = -(F \\times 0.5) \\times 0.4 = -0.2 F$

**تطبيق شرط الاتزان:**
$\\Sigma \\tau = \\tau_1 + \\tau_2 = 0$
$60 - 0.2F = 0 \\implies F = 300 \\text{ N}$`,
  },
  {
      id: 2,
      questionText: `ثلاثة أطفال كتلهم $(20\\text{kg}, 28\\text{kg}, 32\\text{kg})$ يقفون عند حافة لُعبة دوّارة على شكل قرص دائري منتظم كتلته $M=100\\text{kg}$ ونصف قطره $r=2.0\\text{m}$. يدور القرص بسرعة زاوية ثابتة مقدارها $\\omega_0=2.0\\text{rad/s}$ حول محور ثابت عمودي على سطح القرص ويمرّ بمركزه. تحرّك الطفل ذو الكتلة $20\\text{kg}$ باتجاه المحور وتوقّف عند مركز القرص. ما الذي يحدث؟`,
      image: `https://i.ibb.co/GfH6MqBW/2.png`,
      imageHint: 'moment of inertia question',
      options: [
          'تزداد السرعة الزاوية ويزداد الزخم الزاوي',
          'تزداد السرعة الزاوية ويبقى الزخم الزاوي ثابتًا',
          'تزداد السرعة الزاوية ويزداد عزم القصور الذاتي للنظام',
          'تقل السرعة الزاوية ويزداد عزم القصور الذاتي للنظام'
      ],
      correctAnswerIndex: 1,
      explanation: `**1. فهم المبدأ الفيزيائي الأساسي:**
النظام يتكون من القرص الدوّار + الأطفال الثلاثة.
عندما يتحرك الطفل نحو المركز، فإن القوة التي تحركه هي قوة **داخلية** ضمن النظام. لا توجد عزوم خارجية محصلة تؤثر على دوران النظام.
بما أنه لا يوجد عزم خارجي محصل، فإن **الزخم الزاوي (L) للنظام يبقى محفوظًا (ثابتًا)**.

**2. تحليل الحالة الابتدائية والنهائية:**
الزخم الزاوي (L) يُعطى بالعلاقة $L = I \\times \\omega$.
عزم القصور الذاتي (I) يعتمد على توزيع الكتلة حول محور الدوران. كلما ابتعدت الكتلة عن المحور، زاد عزم القصور الذاتي.
في الحالة الابتدائية، كان الأطفال الثلاثة عند حافة القرص، مما يعني أن عزم القصور الذاتي للنظام $I_{\\text{initial}}$ كان في قيمته القصوى.
في الحالة النهائية، تحرك الطفل ذو الكتلة $20\\text{kg}$ إلى المركز ($r = 0$). هذا يعني أن جزءًا من كتلة النظام اقترب بشكل كبير من محور الدوران.
عندما تقترب الكتلة من المحور، **يقل** عزم القصور الذاتي الكلي للنظام. إذن: $I_{\\text{final}} < I_{\\text{initial}}$.

**3. تطبيق قانون حفظ الزخم الزاوي:**
لدينا $L_{\\text{initial}} = L_{\\text{final}}$
إذن: $I_{\\text{initial}} \\times \\omega_{\\text{initial}} = I_{\\text{final}} \\times \\omega_{\\text{final}}$
لقد استنتجنا أن $I_{\\text{final}}$ **أقل** من $I_{\\text{initial}}$.
لكي تبقى المعادلة صحيحة، إذا **قلّ** أحد الطرفين (I)، يجب أن **يزداد** الطرف الآخر (ω).
لذلك، لا بد أن **تزداد السرعة الزاوية النهائية $\\omega_{\\text{final}}$**.

**الخلاصة:**
بسبب حفظ الزخم الزاوي، عندما يتحرك الطفل إلى المركز، يقل عزم القصور الذاتي للنظام، وللتعويض عن هذا النقصان، يجب أن تزداد السرعة الزاوية للقرص. الإجابة الصحيحة هي **(ب)**.`,
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
      explanation: `من الاتزان الرأسي: T₁sin(30) + T₂sin(30) = mg = 100. ومن الاتزان الأفقي: T₁cos(30) = T₂cos(30)، مما يعني T₁ = T₂. بالتعويض في المعادلة الأولى: 2 * T₁ * 0.5 = 100  => T₁ = 100 N. إذن T₂ = 100 N.`,
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
