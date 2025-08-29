
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
    questionText: 'موصلان نحاسيان يختلفان في الطول ومساحة المقطع: طول الموصل الأول $l$ ونصف قطره $r$، أمّا الموصل الثاني فطوله $3l$ ونصف قطره $2r$. وُصل طرفا كلٍّ منهما بمصدر جهد ثابت $V$. أوجد:\n\n($\\frac{I_2}{I_1}$,$\\frac{\\rho_1}{\\rho_2}$)\n\nحيث $I_1, I_2$ تيارا الموصلين، و$\\rho_1, \\rho_2$ مقاوميتهما النوعية.',
    options: [
      '($\\frac{3}{4}$,$\\frac{1}{1}$)',
      '($\\frac{4}{3}$,$\\frac{1}{1}$)',
      '($\\frac{3}{4}$,$\\frac{4}{3}$)',
      '($\\frac{1}{4}$,$\\frac{1}{1}$)',
    ],
    correctAnswerIndex: 1,
    explanation: `
<b>أولًا: حساب نسبة المقاومية ($\\frac{\\rho_1}{\\rho_2}$):</b><br/>
بما أن الموصلين مصنوعان من نفس المادة (النحاس)، فإن مقاوميتهما النوعية متساوية. إذن:<br/>
$\\rho_1 = \\rho_2$<br/>
وبالتالي، النسبة $\\frac{\\rho_1}{\\rho_2} = 1$. هذا يستبعد الخيار (ج).<br/><br/>
<b>ثانيًا: حساب نسبة التيارين ($\\frac{I_2}{I_1}$):</b><br/>
<ol style="list-style-type: decimal; padding-right: 20px;">
  <li><b>نحسب مقاومة كل موصل:</b>
    <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
      <li>المقاومة تُعطى بالعلاقة: $R = \\frac{\\rho L}{A} = \\frac{\\rho L}{\\pi r^2}$</li>
      <li>مقاومة الموصل الأول: $R_1 = \\frac{\\rho_1 l_1}{\\pi r_1^2} = \\frac{\\rho l}{\\pi r^2}$</li>
      <li>مقاومة الموصل الثاني: $R_2 = \\frac{\\rho_2 l_2}{\\pi r_2^2} = \\frac{\\rho (3l)}{\\pi (2r)^2} = \\frac{3\\rho l}{4\\pi r^2} = \\frac{3}{4} R_1$</li>
    </ul>
  </li>
  <li><b>نستخدم قانون أوم لإيجاد نسبة التيارين:</b>
    <ul style="list-style-type: disc; padding-right: 20px; margin-top: 5px;">
      <li>من قانون أوم، $I = \\frac{V}{R}$. بما أن الجهد (V) ثابت لكلا الموصلين، فإن التيار يتناسب عكسيًا مع المقاومة ($I \\propto \\frac{1}{R}$).</li>
      <li>إذًا، $\\frac{I_2}{I_1} = \\frac{R_1}{R_2}$</li>
      <li>نعوض بقيمة $R_2$: $\\frac{I_2}{I_1} = \\frac{R_1}{\\frac{3}{4} R_1} = \\frac{4}{3}$</li>
    </ul>
  </li>
</ol>
<b>النتيجة النهائية:</b><br/>
الزوج المرتب هو ($\\frac{I_2}{I_1}$, $\\frac{\\rho_1}{\\rho_2}$) = ($\\frac{4}{3}$, $1$).<br/>
<b>الإجابة الصحيحة هي (ب).</b>`
  },
];
