
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
    explanation: `
    <div dir="rtl">
        <b>أولًا: حساب نسبة المقاومية $(\\rho_1/\\rho_2)$:</b>
        <p>بما أن الموصلين مصنوعان من نفس المادة (النحاس)، فإن مقاوميتهما النوعية متساوية. إذن:</p>
        <p>$\\rho_1 = \\rho_2$</p>
        <p>وبالتالي، النسبة $\\frac{\\rho_1}{\\rho_2} = 1$.</p>
        <br/>
        <b>ثانيًا: حساب نسبة التيارين $(I_1/I_2)$:</b>
        <ol style="list-style-type: decimal; padding-right: 20px;">
            <li>
                <b>نحسب مقاومة كل موصل:</b>
                <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
                    <li>المقاومة تُعطى بالعلاقة: $R = \\rho \\frac{L}{A} = \\rho \\frac{L}{\\pi r^2}$</li>
                    <li>مقاومة الموصل الأول: $R_1 = \\rho \\frac{l}{\\pi r^2}$</li>
                    <li>مقاومة الموصل الثاني: $R_2 = \\rho \\frac{3l}{\\pi (2r)^2} = \\frac{3\\rho l}{4\\pi r^2} = \\frac{3}{4} R_1$</li>
                </ul>
            </li>
            <li>
                <b>نستخدم قانون أوم لإيجاد نسبة التيارين:</b>
                <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
                    <li>من قانون أوم، $I = \\frac{V}{R}$. بما أن الجهد (V) ثابت لكلا الموصلين، فإن التيار يتناسب عكسيًا مع المقاومة $(I \\propto \\frac{1}{R})$.</li>
                    <li>إذًا، $\\frac{I_1}{I_2} = \\frac{R_2}{R_1}$</li>
                    <li>نعوض بقيمة $R_2$: $\\frac{I_1}{I_2} = \\frac{\\frac{3}{4} R_1}{R_1} = \\frac{3}{4}$</li>
                </ul>
            </li>
        </ol>
        <br/>
        <b>النتيجة النهائية:</b>
        <p>الزوج المرتب هو $(I_1/I_2, \\rho_1/\\rho_2) = (3/4, 1)$.</p>
        <b>الإجابة الصحيحة هي (أ).</b>
    </div>
    `
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
    explanation: '<b>طريقة الحل</b><br/><br/>المقاومتان $R$ موصولتان على التوازي بين نفس العقدتين، إذن مقاومتُهما المكافئة:<br/>$R_{eq} = R \\|\\| R = \\frac{R}{2}$.<br/><br/>التيار الكلي في الدارة (المار في البطارية) هو $I$. جهد طرفَي المصدر (وهو نفسه جهد طرفَي المجموعة الخارجية) يساوي:<br/>$V_{\\text{terminal}} = I R_{eq} = I(\\frac{R}{2}) = \\frac{IR}{2}$.<br/><br/>وبشكلٍ مكافئ يمكن كتابته أيضًا:<br/>$V_{\\text{terminal}} = \\varepsilon - Ir$,<br/><br/>لكن من بين الخيارات المعطاة الصيغة المطابقة هي $\\frac{IR}{2}$.<br/><br/><b>الإجابة الصحيحة: (د) $\\frac{IR}{2}$.</b>'
  },
];
