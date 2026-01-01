// Momentum Unit Content - توجيهي 2008 فصل أول - الوحدة الأولى

export interface Lesson {
    id: string;
    number: number;
    title: string;
    titleAr: string;
    duration: number; // in minutes
    content: LessonContent;
}

export interface LessonContent {
    introduction: string;
    sections: Section[];
    formulas: Formula[];
    examples: Example[];
    summary: string[];
}

export interface Section {
    id: string;
    title: string;
    content: string;
    image?: string;
}

export interface Formula {
    id: string;
    name: string;
    latex: string;
    description: string;
    variables: { symbol: string; meaning: string }[];
}

export interface Example {
    id: string;
    question: string;
    solution: string[];
    answer: string;
}

export const momentumUnit = {
    id: 'momentum',
    number: 1,
    name: 'Momentum',
    nameAr: 'الزخم',
    description: 'Linear momentum, conservation of momentum, collisions',
    descriptionAr: 'الزخم الخطي، حفظ الزخم، التصادمات',

    lessons: [
        {
            id: 'lesson-1',
            number: 1,
            title: 'Linear Momentum',
            titleAr: 'الزخم الخطي',
            duration: 20,
            content: {
                introduction: `
الزخم الخطي هو كمية فيزيائية تصف حركة الجسم وتعتمد على كتلته وسرعته.
يُعتبر الزخم من أهم المفاهيم في الميكانيكا الكلاسيكية.
        `,
                sections: [
                    {
                        id: 'definition',
                        title: 'تعريف الزخم',
                        content: `
الزخم الخطي (p) هو حاصل ضرب كتلة الجسم في سرعته المتجهة.

الزخم كمية متجهة، له مقدار واتجاه. اتجاه الزخم هو نفس اتجاه السرعة.

**وحدة القياس:** كغم·م/ث (kg·m/s)
            `
                    },
                    {
                        id: 'importance',
                        title: 'أهمية الزخم',
                        content: `
1. **وصف حركة الأجسام**: الزخم يعطي صورة أوضح عن حركة الجسم من السرعة وحدها.
2. **التصادمات**: يُستخدم لتحليل التصادمات بين الأجسام.
3. **قانون حفظ الزخم**: في الأنظمة المعزولة، الزخم الكلي يبقى ثابتاً.
4. **قوانين نيوتن**: القانون الثاني لنيوتن يمكن صياغته بدلالة الزخم.
            `
                    }
                ],
                formulas: [
                    {
                        id: 'momentum-formula',
                        name: 'قانون الزخم',
                        latex: 'p = m \\cdot v',
                        description: 'الزخم يساوي حاصل ضرب الكتلة في السرعة',
                        variables: [
                            { symbol: 'p', meaning: 'الزخم (kg·m/s)' },
                            { symbol: 'm', meaning: 'الكتلة (kg)' },
                            { symbol: 'v', meaning: 'السرعة (m/s)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'احسب زخم سيارة كتلتها 1200 kg تتحرك بسرعة 25 m/s.',
                        solution: [
                            'المعطيات: m = 1200 kg, v = 25 m/s',
                            'المطلوب: p = ?',
                            'الحل: p = m × v',
                            'p = 1200 × 25',
                            'p = 30000 kg·m/s'
                        ],
                        answer: '30000 kg·m/s'
                    },
                    {
                        id: 'example-2',
                        question: 'كرة قدم كتلتها 0.5 kg تتحرك بسرعة 20 m/s. ما زخمها؟',
                        solution: [
                            'المعطيات: m = 0.5 kg, v = 20 m/s',
                            'المطلوب: p = ?',
                            'الحل: p = m × v = 0.5 × 20 = 10 kg·m/s'
                        ],
                        answer: '10 kg·m/s'
                    }
                ],
                summary: [
                    'الزخم = الكتلة × السرعة',
                    'الزخم كمية متجهة',
                    'وحدة الزخم: kg·m/s',
                    'اتجاه الزخم = اتجاه السرعة'
                ]
            }
        },
        {
            id: 'lesson-2',
            number: 2,
            title: 'Impulse',
            titleAr: 'الدفع',
            duration: 25,
            content: {
                introduction: `
الدفع هو التغير في زخم الجسم، ويحدث عندما تؤثر قوة على الجسم لفترة زمنية معين.
        `,
                sections: [
                    {
                        id: 'impulse-definition',
                        title: 'تعريف الدفع',
                        content: `
الدفع (J) هو حاصل ضرب القوة المؤثرة في الفترة الزمنية التي تؤثر خلالها.

الدفع يساوي التغير في الزخم: J = Δp

**وحدة القياس:** N·s أو kg·m/s
            `
                    },
                    {
                        id: 'impulse-applications',
                        title: 'تطبيقات الدفع',
                        content: `
1. **الوسائد الهوائية في السيارات**: تزيد زمن التصادم فتقلل القوة
2. **ثني الركبتين عند القفز**: يزيد زمن التوقف فيقلل القوة على المفاصل
3. **قفازات الملاكمة**: تزيد زمن التأثير فتقلل القوة
            `
                    }
                ],
                formulas: [
                    {
                        id: 'impulse-formula-1',
                        name: 'قانون الدفع',
                        latex: 'J = F \\cdot \\Delta t',
                        description: 'الدفع يساوي القوة مضروبة في الزمن',
                        variables: [
                            { symbol: 'J', meaning: 'الدفع (N·s)' },
                            { symbol: 'F', meaning: 'القوة (N)' },
                            { symbol: 'Δt', meaning: 'الفترة الزمنية (s)' }
                        ]
                    },
                    {
                        id: 'impulse-momentum-theorem',
                        name: 'نظرية الدفع والزخم',
                        latex: 'J = \\Delta p = m(v_f - v_i)',
                        description: 'الدفع يساوي التغير في الزخم',
                        variables: [
                            { symbol: 'J', meaning: 'الدفع (N·s)' },
                            { symbol: 'Δp', meaning: 'التغير في الزخم (kg·m/s)' },
                            { symbol: 'v_f', meaning: 'السرعة النهائية (m/s)' },
                            { symbol: 'v_i', meaning: 'السرعة الابتدائية (m/s)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'قوة مقدارها 500 N تؤثر على جسم لمدة 0.02 s. احسب الدفع.',
                        solution: [
                            'المعطيات: F = 500 N, Δt = 0.02 s',
                            'المطلوب: J = ?',
                            'الحل: J = F × Δt',
                            'J = 500 × 0.02 = 10 N·s'
                        ],
                        answer: '10 N·s'
                    }
                ],
                summary: [
                    'الدفع = القوة × الزمن',
                    'الدفع = التغير في الزخم',
                    'وحدة الدفع: N·s',
                    'زيادة زمن التصادم تقلل القوة'
                ]
            }
        },
        {
            id: 'lesson-3',
            number: 3,
            title: 'Conservation of Momentum',
            titleAr: 'حفظ الزخم',
            duration: 30,
            content: {
                introduction: `
قانون حفظ الزخم من أهم القوانين في الفيزياء. ينص على أن الزخم الكلي لنظام معزول يبقى ثابتاً.
        `,
                sections: [
                    {
                        id: 'law-statement',
                        title: 'نص قانون حفظ الزخم',
                        content: `
**في النظام المعزول (عندما يكون مجموع القوى الخارجية = صفر):**

الزخم الكلي قبل التفاعل = الزخم الكلي بعد التفاعل

هذا يعني أن الزخم لا يُخلق ولا يُفنى، بل ينتقل من جسم لآخر.
            `
                    },
                    {
                        id: 'isolated-system',
                        title: 'النظام المعزول',
                        content: `
النظام المعزول هو النظام الذي لا تؤثر عليه قوى خارجية.

**أمثلة على أنظمة معزولة:**
- تصادم كرتين على سطح أفقي أملس
- انفجار قذيفة في الهواء
- ارتداد البندقية عند إطلاق الرصاصة
            `
                    }
                ],
                formulas: [
                    {
                        id: 'conservation-formula',
                        name: 'قانون حفظ الزخم',
                        latex: 'm_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}',
                        description: 'مجموع الزخم قبل = مجموع الزخم بعد',
                        variables: [
                            { symbol: 'm₁, m₂', meaning: 'كتلتا الجسمين (kg)' },
                            { symbol: 'v₁ᵢ, v₂ᵢ', meaning: 'السرعات الابتدائية (m/s)' },
                            { symbol: 'v₁f, v₂f', meaning: 'السرعات النهائية (m/s)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'عربة كتلتها 2 kg تتحرك بسرعة 3 m/s تصطدم بعربة ساكنة كتلتها 1 kg فتلتحمان. ما سرعتهما بعد التصادم؟',
                        solution: [
                            'المعطيات: m₁ = 2 kg, v₁ᵢ = 3 m/s, m₂ = 1 kg, v₂ᵢ = 0',
                            'المطلوب: v (بعد الالتحام)',
                            'باستخدام حفظ الزخم:',
                            'm₁v₁ᵢ + m₂v₂ᵢ = (m₁ + m₂)v',
                            '(2)(3) + (1)(0) = (2+1)v',
                            '6 = 3v',
                            'v = 2 m/s'
                        ],
                        answer: '2 m/s'
                    }
                ],
                summary: [
                    'الزخم محفوظ في الأنظمة المعزولة',
                    'الزخم قبل التفاعل = الزخم بعد التفاعل',
                    'يُستخدم لتحليل التصادمات والانفجارات'
                ]
            }
        },
        {
            id: 'lesson-4',
            number: 4,
            title: 'Elastic Collisions',
            titleAr: 'التصادم المرن',
            duration: 25,
            content: {
                introduction: `
التصادم المرن هو التصادم الذي تُحفظ فيه الطاقة الحركية بالإضافة إلى الزخم.
        `,
                sections: [
                    {
                        id: 'elastic-definition',
                        title: 'تعريف التصادم المرن',
                        content: `
في التصادم المرن:
1. يُحفظ الزخم الكلي
2. تُحفظ الطاقة الحركية الكلية
3. الأجسام ترتد عن بعضها

**أمثلة:** تصادم كرات البلياردو، تصادم الذرات في الغازات
            `
                    }
                ],
                formulas: [
                    {
                        id: 'elastic-collision',
                        name: 'شروط التصادم المرن',
                        latex: '\\frac{1}{2}m_1v_{1i}^2 + \\frac{1}{2}m_2v_{2i}^2 = \\frac{1}{2}m_1v_{1f}^2 + \\frac{1}{2}m_2v_{2f}^2',
                        description: 'الطاقة الحركية قبل = الطاقة الحركية بعد',
                        variables: []
                    }
                ],
                examples: [],
                summary: [
                    'يُحفظ الزخم والطاقة الحركية',
                    'الأجسام ترتد عن بعضها',
                    'نادر الحدوث في الواقع (مثالي)'
                ]
            }
        },
        {
            id: 'lesson-5',
            number: 5,
            title: 'Inelastic Collisions',
            titleAr: 'التصادم غير المرن',
            duration: 25,
            content: {
                introduction: `
التصادم غير المرن هو التصادم الذي تُفقد فيه جزء من الطاقة الحركية (تتحول لأشكال أخرى).
        `,
                sections: [
                    {
                        id: 'inelastic-definition',
                        title: 'تعريف التصادم غير المرن',
                        content: `
في التصادم غير المرن:
1. يُحفظ الزخم الكلي
2. تُفقد جزء من الطاقة الحركية (تتحول لحرارة، صوت، تشوه)

**التصادم غير المرن التام (الالتحام):** الجسمان يلتصقان ويتحركان معاً
            `
                    }
                ],
                formulas: [
                    {
                        id: 'perfectly-inelastic',
                        name: 'التصادم غير المرن التام',
                        latex: 'm_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f',
                        description: 'الجسمان يتحركان بسرعة واحدة بعد الالتحام',
                        variables: [
                            { symbol: 'v_f', meaning: 'السرعة المشتركة بعد الالتحام (m/s)' }
                        ]
                    }
                ],
                examples: [],
                summary: [
                    'يُحفظ الزخم فقط',
                    'تُفقد طاقة حركية',
                    'أكثر شيوعاً في الواقع'
                ]
            }
        }
    ] as Lesson[]
};

export function getLessonById(lessonId: string): Lesson | undefined {
    return momentumUnit.lessons.find(l => l.id === lessonId);
}
