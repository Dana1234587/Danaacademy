// Equilibrium and Elasticity Unit Content - توجيهي 2008 فصل أول - الوحدة الرابعة

import { Lesson } from './momentum';

export const equilibriumElasticityUnit = {
    id: 'equilibrium-elasticity',
    number: 4,
    name: 'Equilibrium and Elasticity',
    nameAr: 'التوازن والمرونة',
    description: 'Equilibrium conditions, elasticity, stress and strain',
    descriptionAr: 'شروط التوازن، المرونة، الإجهاد والانفعال',

    lessons: [
        {
            id: 'lesson-1',
            number: 1,
            title: 'Static Equilibrium',
            titleAr: 'التوازن الاستاتيكي',
            duration: 25,
            content: {
                introduction: `
التوازن الاستاتيكي يحدث عندما يكون الجسم ساكناً ولا يتحرك. لتحقيق ذلك يجب استيفاء شرطين أساسيين.
        `,
                sections: [
                    {
                        id: 'equilibrium-conditions',
                        title: 'شروط التوازن',
                        content: `
**الشرط الأول (توازن الانتقال):**
مجموع القوى المؤثرة = صفر
ΣF = 0

**الشرط الثاني (توازن الدوران):**
مجموع العزوم حول أي نقطة = صفر
Στ = 0

**عندما يتحقق الشرطان:** الجسم في حالة توازن استاتيكي
            `
                    }
                ],
                formulas: [
                    {
                        id: 'equilibrium-conditions',
                        name: 'شروط التوازن',
                        latex: '\\sum F_x = 0, \\sum F_y = 0, \\sum \\tau = 0',
                        description: 'مجموع القوى في كل اتجاه ومجموع العزوم تساوي صفر',
                        variables: []
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'عارضة أفقية طولها 4 m ترتكز على دعامتين عند طرفيها. تؤثر قوة 100 N في منتصفها. ما ردود فعل الدعامتين؟',
                        solution: [
                            'بما أن القوة في المنتصف والعارضة متماثلة',
                            'كل دعامة تتحمل نصف الحمل',
                            'R₁ = R₂ = 100/2 = 50 N'
                        ],
                        answer: 'R₁ = R₂ = 50 N'
                    }
                ],
                summary: [
                    'التوازن يتطلب: ΣF = 0 و Στ = 0',
                    'الجسم المتوازن لا يتحرك ولا يدور',
                    'يُستخدم في تحليل الجسور والمباني'
                ]
            }
        },
        {
            id: 'lesson-2',
            number: 2,
            title: 'Center of Gravity',
            titleAr: 'مركز الثقل',
            duration: 20,
            content: {
                introduction: `
مركز الثقل هو النقطة التي يمكن اعتبار وزن الجسم كله مركزاً فيها. موقعه يحدد استقرار الجسم.
        `,
                sections: [
                    {
                        id: 'center-of-gravity',
                        title: 'تعريف مركز الثقل',
                        content: `
مركز الثقل هو النقطة التي يؤثر فيها وزن الجسم بالكامل.

**خصائص:**
- للأجسام المنتظمة: في المركز الهندسي
- قد يكون خارج الجسم (للأجسام المجوفة)
- يحدد استقرار الجسم
            `
                    },
                    {
                        id: 'stability',
                        title: 'الاستقرار',
                        content: `
**أنواع التوازن:**
1. **توازن مستقر:** الجسم يعود لوضعه الأصلي عند إزاحته
2. **توازن غير مستقر:** الجسم يبتعد عن وضعه عند أي إزاحة
3. **توازن محايد:** الجسم يبقى في وضعه الجديد

**عوامل الاستقرار:**
- انخفاض مركز الثقل
- اتساع قاعدة الارتكاز
            `
                    }
                ],
                formulas: [],
                examples: [],
                summary: [
                    'مركز الثقل = نقطة تأثير الوزن',
                    'الاستقرار يزداد بانخفاض مركز الثقل',
                    'قاعدة الارتكاز الواسعة تزيد الاستقرار'
                ]
            }
        },
        {
            id: 'lesson-3',
            number: 3,
            title: 'Stress and Strain',
            titleAr: 'الإجهاد والانفعال',
            duration: 30,
            content: {
                introduction: `
عندما تؤثر قوة على جسم، يتشوه الجسم. الإجهاد والانفعال يصفان هذا التشوه كمياً.
        `,
                sections: [
                    {
                        id: 'stress',
                        title: 'الإجهاد (Stress)',
                        content: `
الإجهاد (σ) هو القوة المؤثرة على وحدة المساحة.

σ = F/A

**الوحدة:** باسكال (Pa) = N/m²

**أنواع الإجهاد:**
- إجهاد شد
- إجهاد ضغط
- إجهاد قص
            `
                    },
                    {
                        id: 'strain',
                        title: 'الانفعال (Strain)',
                        content: `
الانفعال (ε) هو التغير النسبي في أبعاد الجسم.

ε = ΔL/L₀

**الخصائص:**
- كمية بلا وحدة (نسبة)
- يمكن أن يكون موجباً (استطالة) أو سالباً (انضغاط)
            `
                    }
                ],
                formulas: [
                    {
                        id: 'stress-formula',
                        name: 'الإجهاد',
                        latex: '\\sigma = \\frac{F}{A}',
                        description: 'الإجهاد = القوة ÷ المساحة',
                        variables: [
                            { symbol: 'σ', meaning: 'الإجهاد (Pa)' },
                            { symbol: 'F', meaning: 'القوة (N)' },
                            { symbol: 'A', meaning: 'المساحة (m²)' }
                        ]
                    },
                    {
                        id: 'strain-formula',
                        name: 'الانفعال',
                        latex: '\\epsilon = \\frac{\\Delta L}{L_0}',
                        description: 'الانفعال = التغير في الطول ÷ الطول الأصلي',
                        variables: [
                            { symbol: 'ε', meaning: 'الانفعال (Dimensionless)' },
                            { symbol: 'ΔL', meaning: 'التغير في الطول (m)' },
                            { symbol: 'L₀', meaning: 'الطول الأصلي (m)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'سلك طوله 2 m ومساحة مقطعه 1 mm². إذا شُد بقوة 200 N واستطال 0.5 mm، احسب الإجهاد والانفعال.',
                        solution: [
                            'الإجهاد: σ = F/A = 200 / (1 × 10⁻⁶) = 2 × 10⁸ Pa',
                            'الانفعال: ε = ΔL/L₀ = 0.5 × 10⁻³ / 2 = 2.5 × 10⁻⁴'
                        ],
                        answer: 'σ = 200 MPa, ε = 2.5 × 10⁻⁴'
                    }
                ],
                summary: [
                    'الإجهاد = القوة ÷ المساحة',
                    'الانفعال = التغير النسبي في الطول',
                    'الانفعال كمية بلا وحدة'
                ]
            }
        },
        {
            id: 'lesson-4',
            number: 4,
            title: "Young's Modulus",
            titleAr: 'معامل يونغ',
            duration: 25,
            content: {
                introduction: `
معامل يونغ (معامل المرونة) يربط بين الإجهاد والانفعال للمواد المرنة. يميز كل مادة عن غيرها.
        `,
                sections: [
                    {
                        id: 'youngs-modulus',
                        title: 'تعريف معامل يونغ',
                        content: `
معامل يونغ (E) هو النسبة بين الإجهاد والانفعال في منطقة المرونة.

E = σ/ε = (F/A) / (ΔL/L)

**الخصائص:**
- ثابت لكل مادة
- كلما كان أكبر كانت المادة أكثر صلابة
- يقاس بالباسكال (Pa)
            `
                    }
                ],
                formulas: [
                    {
                        id: 'youngs-modulus-formula',
                        name: 'معامل يونغ',
                        latex: 'E = \\frac{\\sigma}{\\epsilon} = \\frac{FL_0}{A \\Delta L}',
                        description: 'معامل يونغ = الإجهاد ÷ الانفعال',
                        variables: [
                            { symbol: 'E', meaning: 'معامل يونغ (Pa)' },
                            { symbol: 'σ', meaning: 'الإجهاد (Pa)' },
                            { symbol: 'ε', meaning: 'الانفعال' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'سلك فولاذي طوله 3 m ومساحة مقطعه 2 mm² استطال 1.5 mm عند شده بقوة 600 N. ما معامل يونغ؟',
                        solution: [
                            'E = FL₀ / (A × ΔL)',
                            'E = (600 × 3) / (2 × 10⁻⁶ × 1.5 × 10⁻³)',
                            'E = 1800 / (3 × 10⁻⁹)',
                            'E = 6 × 10¹¹ Pa = 600 GPa'
                        ],
                        answer: 'E = 600 GPa'
                    }
                ],
                summary: [
                    'معامل يونغ = الإجهاد ÷ الانفعال',
                    'ثابت لكل مادة',
                    'الفولاذ أكبر من المطاط'
                ]
            }
        },
        {
            id: 'lesson-5',
            number: 5,
            title: "Hooke's Law",
            titleAr: 'قانون هوك',
            duration: 20,
            content: {
                introduction: `
قانون هوك يصف العلاقة بين القوة والاستطالة في النوابض والمواد المرنة ضمن حدود المرونة.
        `,
                sections: [
                    {
                        id: 'hookes-law',
                        title: 'نص قانون هوك',
                        content: `
القوة المؤثرة على نابض تتناسب طردياً مع استطالته (ضمن حد المرونة).

F = kx

**حيث:**
- k: ثابت النابض (صلابة النابض)
- x: الاستطالة أو الانضغاط

**حد المرونة:** النقطة التي بعدها لا يعود الجسم لشكله الأصلي
            `
                    }
                ],
                formulas: [
                    {
                        id: 'hookes-law-formula',
                        name: 'قانون هوك',
                        latex: 'F = kx',
                        description: 'القوة = ثابت النابض × الاستطالة',
                        variables: [
                            { symbol: 'F', meaning: 'القوة (N)' },
                            { symbol: 'k', meaning: 'ثابت النابض (N/m)' },
                            { symbol: 'x', meaning: 'الاستطالة (m)' }
                        ]
                    },
                    {
                        id: 'elastic-pe',
                        name: 'طاقة وضع النابض',
                        latex: 'PE = \\frac{1}{2}kx^2',
                        description: 'الطاقة المخزنة في النابض',
                        variables: []
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'نابض ثابته 200 N/m. ما القوة اللازمة لشده مسافة 15 cm؟',
                        solution: [
                            'المعطيات: k = 200 N/m, x = 0.15 m',
                            'F = kx = 200 × 0.15 = 30 N'
                        ],
                        answer: 'F = 30 N'
                    }
                ],
                summary: [
                    'F = kx ضمن حد المرونة',
                    'k ثابت النابض (صلابته)',
                    'طاقة النابض = ½kx²'
                ]
            }
        }
    ] as Lesson[]
};

export function getLessonById(lessonId: string): Lesson | undefined {
    return equilibriumElasticityUnit.lessons.find(l => l.id === lessonId);
}
