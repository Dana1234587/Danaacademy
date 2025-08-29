
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
    explanation: 'الحل:\nأولاً، نحسب التيار الكهربائي (I) المار في الموصل، والذي يكون ثابتًا.\n$I = \\frac{\\Delta q}{\\Delta t}$\n$I = \\frac{600 \\times 10^{-6} C}{10 \\times 10^{-3} s} = 0.06 A$\n\nالآن، نستخدم هذا التيار لحساب الشحنة الجديدة ($q_{new}$) التي تعبر خلال الزمن الجديد ($t_{new}$).\n$q_{new} = I \\times t_{new}$\n$q_{new} = 0.06 A \\times 0.5 s = 0.03 C$\n\nأخيرًا، نحول الشحنة من كولوم إلى مايكروكولوم:\n$0.03 C \\times (1,000,000 \\mu C / 1 C) = 30,000 \\mu C = 3 \\times 10^4 \\mu C$\nالإجابة الصحيحة هي (ب).',
  },
  {
    id: 2,
    questionText: 'موصلان نحاسيان يختلفان عن بعضهما في الطول ومساحة المقطع طول الموصل الأول $l$ ونصف قطره $r$ , اما الموصل الثاني طوله $3l$ ونصف قطره $2r$ إذا وصل طرفي كل منهما بمصدر فرق جهد $V$ فإن نسبة التيار المار في الموصل الاول الى التيار المار في الموصل الثاني ونسبة مقاومية الموصل الاول الى مقاومية الموصل الثاني على الترتيب هي: $(\\frac{I_1}{I_2},\\frac{\\rho_1}{\\rho_2})$',
    options: [
      '($\\frac{3}{4}$,$\\frac{1}{1}$)',
      '($\\frac{4}{3}$,$\\frac{1}{1}$)',
      '($\\frac{3}{4}$,$\\frac{4}{3}$)',
      '($\\frac{1}{4}$,$\\frac{1}{1}$)',
    ],
    correctAnswerIndex: 0,
    explanation: 'أولًا: حساب نسبة المقاومية $(\\frac{\\rho_1}{\\rho_2})$:\nبما أن الموصلين مصنوعان من نفس المادة (النحاس)، فإن مقاوميتهما النوعية متساوية. إذن:\n$\\rho_1 = \\rho_2$\nوبالتالي، النسبة $\\frac{\\rho_1}{\\rho_2} = 1$.\n\nثانيًا: حساب نسبة التيارين $(\\frac{I_1}{I_2})$:\n1. نحسب مقاومة كل موصل:\n- المقاومة تُعطى بالعلاقة: $R = \\rho \\frac{L}{A} = \\rho \\frac{L}{\\pi r^2}$\n- مقاومة الموصل الأول: $R_1 = \\rho \\frac{l}{\\pi r^2}$\n- مقاومة الموصل الثاني: $R_2 = \\rho \\frac{3l}{\\pi (2r)^2} = \\frac{3\\rho l}{4\\pi r^2} = \\frac{3}{4} R_1$\n2. نستخدم قانون أوم لإيجاد نسبة التيارين:\n- من قانون أوم، $I = \\frac{V}{R}$. بما أن الجهد (V) ثابت لكلا الموصلين، فإن التيار يتناسب عكسيًا مع المقاومة $(I \\propto \\frac{1}{R})$.\n- إذًا، $\\frac{I_1}{I_2} = \\frac{R_2}{R_1}$\n- نعوض بقيمة $R_2$: $\\frac{I_1}{I_2} = \\frac{\\frac{3}{4} R_1}{R_1} = \\frac{3}{4}$\n\nالنتيجة النهائية:\nالزوج المرتب هو $(\\frac{I_1}{I_2}, \\frac{\\rho_1}{\\rho_2}) = (\\frac{3}{4}, 1)$.\nالإجابة الصحيحة هي (أ).',
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
    explanation: 'طريقة الحل\n\nالمقاومتان $R$ موصولتان على التوازي بين نفس العقدتين، إذن مقاومتُهما المكافئة:\n$R_{eq} = R \\|\\| R = \\frac{R}{2}$.\n\nالتيار الكلي في الدارة (المار في البطارية) هو $I$. جهد طرفَي المصدر (وهو نفسه جهد طرفَي المجموعة الخارجية) يساوي:\n$V_{\\text{terminal}} = I R_{eq} = I(\\frac{R}{2}) = \\frac{IR}{2}$.\n\nوبشكلٍ مكافئ يمكن كتابته أيضًا:\n$V_{\\text{terminal}} = \\varepsilon - Ir$,\n\nلكن من بين الخيارات المعطاة الصيغة المطابقة هي $\\frac{IR}{2}$.\n\nالإجابة الصحيحة: (د) $\\frac{IR}{2}$.'
  },
  {
    id: 4,
    questionText: 'إذا كانت قراءة الأميتر في الشكل تساوي $0.5 A$ وقراءة الفولتميتر بين النقطتين $a,b$ تساوي $5.5 V$، فما معدل الطاقة المستهلكة في المقاومة $8 \\Omega$ (بوحدة $J/s$) وقيمة المقاومة المجهولة $R$ على الترتيب؟',
    image: 'https://i.ibb.co/zhqngG8q/4.png',
    imageHint: 'circuit diagram with ammeter and voltmeter',
    options: [
        '$2 J/s, R=4 \\Omega$',
        '$7 J/s, R=12 \\Omega$',
        '$10 J/s, R=4 \\Omega$',
        '$2 J/s, R=2 \\Omega$',
    ],
    correctAnswerIndex: 0,
    explanation: 'أولاً: حساب الطاقة المستهلكة (القدرة) في المقاومة $8 \\Omega$:\nالتيار المقاس $I=0.5 A$ يمر عبر المقاومة $8 \\Omega$.\n$P_{8\\Omega} = I^2 R = (0.5)^2 \\times 8 = 2 \\text{ J/s}$.\n\nثانياً: إيجاد قيمة المقاومة $R$:\n1. نحسب المقاومة الكلية للدائرة بين النقطتين a و b.\n$R_{\\text{total}} = \\frac{V_{ab}}{I} = \\frac{5.5 V}{0.5 A} = 11 \\Omega$.\n2. المقاومتان $(12 \\Omega \\|\\| R)$ موصولتان على التوالي مع المقاومة $8 \\Omega$. إذن، المقاومة المكافئة لهما هي:\n$R_{\\text{parallel}} = R_{\\text{total}} - 8 \\Omega = 11 \\Omega - 8 \\Omega = 3 \\Omega$.\n3. الآن، نستخدم قانون التوصيل على التوازي لإيجاد $R$:\n$\\frac{1}{R_{\\text{parallel}}} = \\frac{1}{12} + \\frac{1}{R}$\n$\\frac{1}{3} = \\frac{1}{12} + \\frac{1}{R}$\n$\\frac{1}{R} = \\frac{1}{3} - \\frac{1}{12} = \\frac{4-1}{12} = \\frac{3}{12} = \\frac{1}{4}$\nإذن, $R = 4 \\Omega$.\n\nالنتيجة النهائية:\nمعدل الطاقة المستهلكة هو $2 \\text{ J/s}$ وقيمة المقاومة $R$ هي $4 \\Omega$.\nالإجابة الصحيحة هي (أ).'
  },
  {
    id: 5,
    questionText: 'يمثل الشكل المجاور دارة كهربائية عندما كان المفتاح s مفتوح كانت قراءة الفولتميتر ($9 V$) وبعد غلق المفتاح أصبحت ($8 V$) فإن مقدار ($\\varepsilon , r$) على الترتيب',
    image: 'https://i.ibb.co/NdYqWpfd/5.png',
    imageHint: 'circuit diagram with switch',
    options: [
      '($12 V$, $1 \\Omega$)',
      '($12 V$, $2 \\Omega$)',
      '($9 V$, $2 \\Omega$)',
      '($9 V$, $1 \\Omega$)',
    ],
    correctAnswerIndex: 0,
    explanation: 'الشرح سيتم إضافته لاحقًا.',
  }
];

    



