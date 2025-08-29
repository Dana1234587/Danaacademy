
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
    explanation: 'أولاً، نحسب التيار الكهربائي (I) المار في الموصل، والذي يكون ثابتًا.\n$I = \\frac{\\Delta q}{\\Delta t}$\n$I = \\frac{600 \\times 10^{-6} C}{10 \\times 10^{-3} s} = 0.06 A$\n\nالآن، نستخدم هذا التيار لحساب الشحنة الجديدة ($q_{new}$) التي تعبر خلال الزمن الجديد ($t_{new}$).\\n$q_{new} = I \\times t_{new}$\n$q_{new} = 0.06 A \\times 0.5 s = 0.03 C$\n\nأخيرًا، نحول الشحنة من كولوم إلى مايكروكولوم:\n$0.03 C \\times (1,000,000 \\mu C / 1 C) = 30,000 \\mu C = 3 \\times 10^4 \\mu C$',
  },
  {
    id: 2,
    questionText: 'موصلان نحاسيان يختلفان عن بعضهما في الطول ومساحة المقطع طول الموصل الأول $l$ ونصف قطره $r$ , اما الموصل الثاني طوله $3l$ ونصف قطره $2r$ إذا وصل طرفي كل منهما بمصدر فرق جهد $V$ فإن نسبة التيار المار في الموصل الثاني الى التيار المار في الموصل الاول $(\\frac{I_2}{I_1})$ ونسبة مقاومية الموصل الثاني الى مقاومية الموصل الاول $(\\frac{\\rho_2}{\\rho_1})$ على الترتيب هما:',
    options: [
      '$\\frac{I_2}{I_1}=\\frac{4}{3}, \\frac{\\rho_2}{\\rho_1}=1$',
      '$\\frac{I_2}{I_1}=\\frac{3}{4}, \\frac{\\rho_2}{\\rho_1}=1$',
      '$\\frac{I_2}{I_1}=\\frac{3}{4}, \\frac{\\rho_2}{\\rho_1}=\\frac{4}{3}$',
      '$\\frac{I_2}{I_1}=\\frac{1}{4}, \\frac{\\rho_2}{\\rho_1}=1$',
    ],
    correctAnswerIndex: 0,
    explanation: '<b>المطلوب: إيجاد النسب $\\frac{I_2}{I_1}$ و $\\frac{\\rho_2}{\\rho_1}$</b>\n<b>أولًا: حساب نسبة المقاومية $(\\frac{\\rho_2}{\\rho_1})$:</b>\nبما أن الموصلين مصنوعان من نفس المادة (النحاس)، فإن مقاوميتهما النوعية متساوية. إذن:\n$\\rho_1 = \\rho_2$\nوبالتالي، النسبة $\\frac{\\rho_2}{\\rho_1} = 1$.\n\n<b>ثانيًا: حساب نسبة التيارين $(\\frac{I_2}{I_1})$:</b>\n1. نحسب مقاومة كل موصل:\n- المقاومة تُعطى بالعلاقة: $R = \\rho \\frac{L}{A} = \\rho \\frac{L}{\\pi r^2}$\n- مقاومة الموصل الأول: $R_1 = \\rho \\frac{l}{\\pi r^2}$\n- مقاومة الموصل الثاني: $R_2 = \\rho \\frac{3l}{\\pi (2r)^2} = \\frac{3\\rho l}{4\\pi r^2} = \\frac{3}{4} R_1$\n2. نستخدم قانون أوم لإيجاد نسبة التيارين:\n- من قانون أوم، $I = \\frac{V}{R}$. بما أن الجهد (V) ثابت لكلا الموصلين، فإن التيار يتناسب عكسيًا مع المقاومة $(I \\propto \\frac{1}{R})$.\n- إذًا، $\\frac{I_2}{I_1} = \\frac{R_1}{R_2}$\n- نعوض بقيمة $R_2$: $\\frac{I_2}{I_1} = \\frac{R_1}{\\frac{3}{4} R_1} = \\frac{4}{3}$\n\n<b>النتيجة النهائية:</b>\nالنسب المطلوبة هي $\\frac{I_2}{I_1} = \\frac{4}{3}$ و $\\frac{\\rho_2}{\\rho_1} = 1$.',
  },
  {
    id: 3,
    questionText: 'أي من الآتية يمثل قراءة الفولتميتر في الدارة المجاورة',
    image: 'https://i.ibb.co/zDj4gRZ/3.png',
    imageHint: 'circuit diagram voltmeter',
    options: [
        '$Ir$',
        '$\\varepsilon$',
        '$\\varepsilon-2IR$',
        '$\\frac{IR}{2}$',
    ],
    correctAnswerIndex: 3,
    explanation: 'المقاومتان $R$ موصولتان على التوازي بين نفس العقدتين، إذن مقاومتُهما المكافئة:\n$R_{eq} = R \\|\\| R = \\frac{R}{2}$.\n\nالتيار الكلي في الدارة (المار في البطارية) هو $I$. جهد طرفَي المصدر (وهو نفسه جهد طرفَي المجموعة الخارجية) يساوي:\n$V_{\\text{terminal}} = I R_{eq} = I(\\frac{R}{2}) = \\frac{IR}{2}$.\n\nوبشكلٍ مكافئ يمكن كتابته أيضًا:\n$V_{\\text{terminal}} = \\varepsilon - Ir$,\n\nلكن من بين الخيارات المعطاة الصيغة المطابقة هي $\\frac{IR}{2}$.'
  },
    {
    id: 4,
    questionText: 'إذا كانت قراءة الأميتر في الشكل تساوي $0.5 A$ وقراءة الفولتميتر بين النقطتين $a,b$ تساوي $5.5 V$، فما معدل الطاقة المستهلكة في المقاومة $8 \\Omega$ (بوحدة $J/s$) وقيمة المقاومة المجهولة $R$ على الترتيب؟',
    image: 'https://i.ibb.co/zhqngG8q/4.png',
    imageHint: 'circuit diagram with ammeter and voltmeter',
    options: [
      '$P=2 J/s, R=4 \\Omega$',
      '$P=7 J/s, R=12 \\Omega$',
      '$P=10 J/s, R=4 \\Omega$',
      '$P=2 J/s, R=2 \\Omega$',
    ],
    correctAnswerIndex: 0,
    explanation: '<b>أولاً: حساب الطاقة المستهلكة (القدرة) في المقاومة $8 \\Omega$:</b>\nالتيار المقاس $I=0.5 A$ يمر عبر المقاومة $8 \\Omega$.\n$P_{8\\Omega} = I^2 R = (0.5)^2 \\times 8 = 2 J/s$.\n\n<b>ثانياً: إيجاد قيمة المقاومة $R$:</b>\n1. نحسب المقاومة الكلية للدائرة بين النقطتين a و b.\n$R_{\\text{total}} = \\frac{V_{ab}}{I} = \\frac{5.5 V}{0.5 A} = 11 \\Omega$.\n2. المقاومتان $(12 \\Omega \\|\\| R)$ موصولتان على التوالي مع المقاومة $8 \\Omega$. إذن، المقاومة المكافئة لهما هي:\n$R_{\\text{parallel}} = R_{\\text{total}} - 8 \\Omega = 11 \\Omega - 8 \\Omega = 3 \\Omega$.\n3. الآن، نستخدم قانون التوصيل على التوازي لإيجاد $R$:\n$\\frac{1}{R_{\\text{parallel}}} = \\frac{1}{12} + \\frac{1}{R}$\n$\\frac{1}{3} = \\frac{1}{12} + \\frac{1}{R}$\n$\\frac{1}{R} = \\frac{1}{3} - \\frac{1}{12} = \\frac{4-1}{12} = \\frac{3}{12} = \\frac{1}{4}$\nإذن, $R = 4 \\Omega$.',
  },
  {
    id: 5,
    questionText: 'يمثل الشكل المجاور دارة كهربائية. عندما كان المفتاح s مفتوحاً كانت قراءة الفولتميتر ($9 V$) وبعد غلق المفتاح أصبحت ($8 V$). فإن مقدار القوة الدافعة الكهربائية $\\varepsilon$ والمقاومة الداخلية $r$ على الترتيب هما:',
    image: 'https://i.ibb.co/NdYqWpfd/5.png',
    imageHint: 'circuit diagram with switch',
    options: [
        '$\\varepsilon = 12V, r = 1 \\Omega$',
        '$\\varepsilon = 12V, r = 2 \\Omega$',
        '$\\varepsilon = 9V, r = 2 \\Omega$',
        '$\\varepsilon = 9V, r = 1 \\Omega$',
    ],
    correctAnswerIndex: 1,
    explanation: '<b>المطلوب: إيجاد $\\varepsilon$ و $r$</b>\n<b>1) المفتاح مفتوح:</b>\nقراءة الفولتميتر هي جهد طرفي البطارية، وهو نفسه جهد المقاومة الخارجية $6\\Omega$. إذن:\n$V = 9V$ على $6\\Omega \\Rightarrow I_1 = \\frac{V}{R} = \\frac{9}{6} = 1.5 A$.\nمن علاقة جهد البطارية:\n$V = \\varepsilon - I_1 r \\Rightarrow 9 = \\varepsilon - 1.5r$ (معادلة 1).\n<b>2) المفتاح مغلق:</b>\nالآن $6\\Omega$ توازي $12\\Omega$. المقاومة المكافئة لهما: $\\frac{1}{R_{eq}} = \\frac{1}{6} + \\frac{1}{12} = \\frac{3}{12} \\Rightarrow R_{eq} = 4\\Omega$. \nقراءة الفولتميتر الآن $V=8V$ على هذه المجموعة:\n$I_2 = \\frac{V}{R_{eq}} = \\frac{8}{4} = 2A$.\nمن علاقة جهد البطارية:\n$V = \\varepsilon - I_2 r \\Rightarrow 8 = \\varepsilon - 2r$ (معادلة 2).\n<b>3) حل المعادلتين:</b>\nنطرح (2) من (1): $(9-8) = (\\varepsilon - 1.5r) - (\\varepsilon - 2r) \\Rightarrow 1 = 0.5r \\Rightarrow r=2\\Omega$.\nنعوض في (2): $8 = \\varepsilon - 2(2) \\Rightarrow \\varepsilon = 12V$.\n<b>النتيجة النهائية:</b>\n$\\varepsilon = 12V, r = 2\\Omega$'
  },
  {
    id: 6,
    questionText: 'عند درجات الحرارة المنخفضة تؤول المقاومة الكهربائية الى صفر لبعض الفلزات فإن هذه الفلزات تصبح',
    image: '',
    imageHint: '',
    options: [
      'رديئة التوصيل',
      'شبه موصلة',
      'فائقة التوصيل',
      'تبقى مقاومتها كما هي',
    ],
    correctAnswerIndex: 2,
    explanation: 'هذه الظاهرة تُعرف باسم "فائقة التوصيل" (Superconductivity). عندما يتم تبريد بعض المواد إلى درجة حرارة حرجة منخفضة جدًا، تختفي مقاومتها الكهربائية تمامًا، مما يسمح للتيار بالمرور دون أي فقدان للطاقة.'
  }
];
    
    
