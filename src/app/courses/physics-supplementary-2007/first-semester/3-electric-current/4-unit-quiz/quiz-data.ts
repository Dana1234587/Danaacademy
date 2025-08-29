
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
<b>أولًا: حساب نسبة المقاومية ($\\frac{\\rho_1}{\\rho_2}$):</b><br/>
بما أن الموصلين مصنوعان من نفس المادة (النحاس)، فإن مقاوميتهما النوعية متساوية. إذن:<br/>
$\\rho_1 = \\rho_2$<br/>
وبالتالي، النسبة $\\frac{\\rho_1}{\\rho_2} = 1$.<br/><br/>
<b>ثانيًا: حساب نسبة التيارين ($\\frac{I_1}{I_2}$):</b><br/>
<ol style="list-style-type: decimal; padding-right: 20px;">
  <li><b>نحسب مقاومة كل موصل:</b>
    <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
      <li>المقاومة تُعطى بالعلاقة: $R = \\frac{\\rho L}{A} = \\frac{\\rho L}{\\pi r^2}$</li>
      <li>مقاومة الموصل الأول: $R_1 = \\frac{\\rho l}{\\pi r^2}$</li>
      <li>مقاومة الموصل الثاني: $R_2 = \\frac{\\rho (3l)}{\\pi (2r)^2} = \\frac{3\\rho l}{4\\pi r^2} = \\frac{3}{4} R_1$</li>
    </ul>
  </li>
  <li><b>نستخدم قانون أوم لإيجاد نسبة التيارين:</b>
    <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
      <li>من قانون أوم، $I = \\frac{V}{R}$. بما أن الجهد (V) ثابت لكلا الموصلين، فإن التيار يتناسب عكسيًا مع المقاومة ($I \\propto \\frac{1}{R}$).</li>
      <li>إذًا، $\\frac{I_1}{I_2} = \\frac{R_2}{R_1}$</li>
      <li>نعوض بقيمة $R_2$: $\\frac{I_1}{I_2} = \\frac{\\frac{3}{4} R_1}{R_1} = \\frac{3}{4}$</li>
    </ul>
  </li>
</ol>
<b>النتيجة النهائية:</b><br/>
الزوج المرتب هو ($\\frac{I_1}{I_2}$, $\\frac{\\rho_1}{\\rho_2}$) = ($\\frac{3}{4}$, $1$).<br/>
<b>الإجابة الصحيحة هي (أ).</b>`
  },
  {
    id: 3,
    questionText: 'أي من الآتية يمثل قراءة الفولتميتر في الدارة المجاورة',
    image: 'https://placehold.co/600x400.png',
    imageHint: 'circuit diagram voltmeter',
    options: [
        '$Ir$',
        '$\\varepsilon$',
        '$\\varepsilon-2IR$',
        '$\\frac{IR}{2}$',
    ],
    correctAnswerIndex: 1,
    explanation: 'بما أن الفولتميتر مثالي (مقاومته لا نهائية)، فإنه لا يمر تيار في الدارة (I=0). قراءة الفولتميتر تمثل فرق الجهد بين طرفي البطارية. $V = \\varepsilon - Ir$. بما أن I=0، فإن $V = \\varepsilon$.<b>الإجابة الصحيحة هي (ب).</b>'
  },
];
