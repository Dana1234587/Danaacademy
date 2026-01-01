// Rotational Motion Unit Content - توجيهي 2008 فصل أول - الوحدة الثالثة

import { Lesson } from './momentum';

export const rotationalMotionUnit = {
    id: 'rotational-motion',
    number: 3,
    name: 'Rotational Motion',
    nameAr: 'الحركة الدورانية',
    description: 'Torque, moment of inertia, angular momentum',
    descriptionAr: 'العزم، القصور الذاتي، الزخم الزاوي',

    lessons: [
        {
            id: 'lesson-1',
            number: 1,
            title: 'Angular Displacement and Velocity',
            titleAr: 'الإزاحة والسرعة الزاوية',
            duration: 25,
            content: {
                introduction: `
الحركة الدورانية تصف دوران الأجسام حول محور ثابت. لوصف هذه الحركة نستخدم الكميات الزاوية بدلاً من الخطية.
        `,
                sections: [
                    {
                        id: 'angular-displacement',
                        title: 'الإزاحة الزاوية',
                        content: `
الإزاحة الزاوية (θ) هي الزاوية التي يدورها الجسم حول محور الدوران.

**وحدات القياس:**
- الراديان (rad) - الوحدة القياسية
- الدرجات (°)
- الدورات (rev)

**العلاقة:** 1 rev = 2π rad = 360°
            `
                    },
                    {
                        id: 'angular-velocity',
                        title: 'السرعة الزاوية',
                        content: `
السرعة الزاوية (ω) هي معدل تغير الإزاحة الزاوية مع الزمن.

**وحدة القياس:** rad/s

**العلاقة مع السرعة الخطية:** v = ωr
            `
                    }
                ],
                formulas: [
                    {
                        id: 'angular-velocity-formula',
                        name: 'السرعة الزاوية',
                        latex: '\\omega = \\frac{\\theta}{t} = \\frac{2\\pi}{T} = 2\\pi f',
                        description: 'السرعة الزاوية = الإزاحة الزاوية ÷ الزمن',
                        variables: [
                            { symbol: 'ω', meaning: 'السرعة الزاوية (rad/s)' },
                            { symbol: 'θ', meaning: 'الإزاحة الزاوية (rad)' },
                            { symbol: 'T', meaning: 'الزمن الدوري (s)' },
                            { symbol: 'f', meaning: 'التردد (Hz)' }
                        ]
                    },
                    {
                        id: 'linear-angular-relation',
                        name: 'العلاقة بين السرعة الخطية والزاوية',
                        latex: 'v = \\omega \\cdot r',
                        description: 'السرعة الخطية = السرعة الزاوية × نصف القطر',
                        variables: [
                            { symbol: 'v', meaning: 'السرعة الخطية (m/s)' },
                            { symbol: 'r', meaning: 'نصف القطر (m)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'عجلة تدور 120 rev/min. ما سرعتها الزاوية؟',
                        solution: [
                            'المعطيات: 120 rev/min = 2 rev/s',
                            'f = 2 Hz',
                            'ω = 2πf = 2π × 2 = 4π rad/s',
                            'ω ≈ 12.57 rad/s'
                        ],
                        answer: '4π ≈ 12.57 rad/s'
                    }
                ],
                summary: [
                    'الإزاحة الزاوية تقاس بالراديان (rad)',
                    'السرعة الزاوية ω = θ/t = 2πf',
                    'السرعة الخطية v = ωr'
                ]
            }
        },
        {
            id: 'lesson-2',
            number: 2,
            title: 'Torque',
            titleAr: 'العزم',
            duration: 30,
            content: {
                introduction: `
العزم (moment of force) هو المقياس الدوراني للقوة. كما تسبب القوة تسارعاً خطياً، يسبب العزم تسارعاً زاوياً.
        `,
                sections: [
                    {
                        id: 'torque-definition',
                        title: 'تعريف العزم',
                        content: `
العزم (τ) هو حاصل ضرب القوة في ذراعها (البعد العمودي من نقطة الدوران لخط عمل القوة).

**العوامل المؤثرة:**
1. مقدار القوة
2. بعد القوة عن محور الدوران
3. زاوية تأثير القوة

**وحدة القياس:** N·m
            `
                    }
                ],
                formulas: [
                    {
                        id: 'torque-formula',
                        name: 'قانون العزم',
                        latex: '\\tau = F \\cdot r \\cdot \\sin(\\theta) = F \\cdot d',
                        description: 'العزم = القوة × ذراع القوة',
                        variables: [
                            { symbol: 'τ', meaning: 'العزم (N·m)' },
                            { symbol: 'F', meaning: 'القوة (N)' },
                            { symbol: 'r', meaning: 'المسافة من محور الدوران (m)' },
                            { symbol: 'd', meaning: 'ذراع القوة (m)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'قوة 20 N تؤثر على باب على بعد 0.8 m من المفصلة. احسب العزم إذا كانت القوة عمودية على الباب.',
                        solution: [
                            'المعطيات: F = 20 N, r = 0.8 m, θ = 90°',
                            'τ = F × r × sin(90°)',
                            'τ = 20 × 0.8 × 1 = 16 N·m'
                        ],
                        answer: '16 N·m'
                    }
                ],
                summary: [
                    'العزم = القوة × ذراع القوة',
                    'ذراع القوة d = البعد العمودي من محور الدوران',
                    'العزم أكبر عندما تكون القوة عمودية'
                ]
            }
        },
        {
            id: 'lesson-3',
            number: 3,
            title: 'Moment of Inertia',
            titleAr: 'عزم القصور الذاتي',
            duration: 30,
            content: {
                introduction: `
عزم القصور الذاتي هو المقاومة الدورانية للجسم. يقابل الكتلة في الحركة الخطية.
        `,
                sections: [
                    {
                        id: 'inertia-definition',
                        title: 'تعريف عزم القصور الذاتي',
                        content: `
عزم القصور الذاتي (I) هو مقاومة الجسم للتغير في حالته الدورانية.

**يعتمد على:**
1. كتلة الجسم
2. توزيع الكتلة حول محور الدوران
3. موقع محور الدوران

**وحدة القياس:** kg·m²
            `
                    }
                ],
                formulas: [
                    {
                        id: 'point-mass-inertia',
                        name: 'عزم القصور لجسيم نقطي',
                        latex: 'I = mr^2',
                        description: 'عزم القصور = الكتلة × مربع البعد عن المحور',
                        variables: [
                            { symbol: 'I', meaning: 'عزم القصور (kg·m²)' },
                            { symbol: 'm', meaning: 'الكتلة (kg)' },
                            { symbol: 'r', meaning: 'البعد عن المحور (m)' }
                        ]
                    }
                ],
                examples: [],
                summary: [
                    'عزم القصور يعتمد على توزيع الكتلة',
                    'كلما ابتعدت الكتلة عن المحور زاد عزم القصور',
                    'يقابل الكتلة في الحركة الدورانية'
                ]
            }
        },
        {
            id: 'lesson-4',
            number: 4,
            title: 'Angular Momentum',
            titleAr: 'الزخم الزاوي',
            duration: 25,
            content: {
                introduction: `
الزخم الزاوي هو المقابل الدوراني للزخم الخطي. يصف مقدار الحركة الدورانية للجسم.
        `,
                sections: [
                    {
                        id: 'angular-momentum-def',
                        title: 'تعريف الزخم الزاوي',
                        content: `
الزخم الزاوي (L) هو حاصل ضرب عزم القصور في السرعة الزاوية.

L = I × ω

**وحدة القياس:** kg·m²/s
            `
                    }
                ],
                formulas: [
                    {
                        id: 'angular-momentum-formula',
                        name: 'الزخم الزاوي',
                        latex: 'L = I \\cdot \\omega = mvr',
                        description: 'الزخم الزاوي = عزم القصور × السرعة الزاوية',
                        variables: [
                            { symbol: 'L', meaning: 'الزخم الزاوي (kg·m²/s)' },
                            { symbol: 'I', meaning: 'عزم القصور (kg·m²)' },
                            { symbol: 'ω', meaning: 'السرعة الزاوية (rad/s)' }
                        ]
                    }
                ],
                examples: [],
                summary: [
                    'الزخم الزاوي L = Iω',
                    'يحفظ في الأنظمة المعزولة',
                    'يفسر دوران المتزلجين'
                ]
            }
        },
        {
            id: 'lesson-5',
            number: 5,
            title: 'Conservation of Angular Momentum',
            titleAr: 'حفظ الزخم الزاوي',
            duration: 25,
            content: {
                introduction: `
قانون حفظ الزخم الزاوي: إذا كان العزم الخارجي على نظام يساوي صفراً، يبقى الزخم الزاوي ثابتاً.
        `,
                sections: [
                    {
                        id: 'conservation-law',
                        title: 'نص القانون',
                        content: `
عندما يكون مجموع العزوم الخارجية = صفر:

L = Iω = ثابت

**تطبيقات:**
- المتزلج على الجليد (يضم يديه فتزداد سرعته)
- راقصة الباليه
- القط أثناء السقوط
            `
                    }
                ],
                formulas: [
                    {
                        id: 'conservation-angular',
                        name: 'حفظ الزخم الزاوي',
                        latex: 'I_1 \\omega_1 = I_2 \\omega_2',
                        description: 'الزخم الزاوي قبل = الزخم الزاوي بعد',
                        variables: []
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'متزلج يدور بسرعة 2 rad/s وعزم قصوره 4 kg·m². إذا ضم ذراعيه وأصبح عزم قصوره 2 kg·m²، ما سرعته الجديدة؟',
                        solution: [
                            'المعطيات: I₁ = 4 kg·m², ω₁ = 2 rad/s, I₂ = 2 kg·m²',
                            'باستخدام حفظ الزخم الزاوي:',
                            'I₁ω₁ = I₂ω₂',
                            '4 × 2 = 2 × ω₂',
                            'ω₂ = 8/2 = 4 rad/s'
                        ],
                        answer: '4 rad/s'
                    }
                ],
                summary: [
                    'الزخم الزاوي محفوظ عند انعدام العزوم الخارجية',
                    'نقص عزم القصور → زيادة السرعة الزاوية',
                    'يفسر ظواهر طبيعية كثيرة'
                ]
            }
        }
    ] as Lesson[]
};

export function getLessonById(lessonId: string): Lesson | undefined {
    return rotationalMotionUnit.lessons.find(l => l.id === lessonId);
}
