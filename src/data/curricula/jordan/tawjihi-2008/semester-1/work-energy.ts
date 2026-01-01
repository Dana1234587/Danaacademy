// Work and Energy Unit Content - توجيهي 2008 فصل أول - الوحدة الثانية

import { Lesson } from './momentum';

export const workEnergyUnit = {
    id: 'work-energy',
    number: 2,
    name: 'Work and Energy',
    nameAr: 'الشغل والطاقة',
    description: 'Work, kinetic energy, potential energy, power',
    descriptionAr: 'الشغل، الطاقة الحركية، طاقة الوضع، القدرة',

    lessons: [
        {
            id: 'lesson-1',
            number: 1,
            title: 'Work',
            titleAr: 'الشغل',
            duration: 25,
            content: {
                introduction: `
الشغل في الفيزياء يختلف عن المفهوم اليومي. الشغل يُبذل فقط عندما تُحرك قوة جسماً مسافة معينة في اتجاه القوة.
لا يوجد شغل بدون إزاحة، ولا شغل إذا كانت القوة عمودية على الإزاحة.
        `,
                sections: [
                    {
                        id: 'definition',
                        title: 'تعريف الشغل',
                        content: `
الشغل (W) هو حاصل ضرب القوة المؤثرة في الإزاحة في اتجاه القوة.

**الشروط:**
1. وجود قوة مؤثرة
2. وجود إزاحة
3. أن يكون هناك مركبة للقوة في اتجاه الإزاحة

**وحدة القياس:** جول (J) = N·m
            `
                    },
                    {
                        id: 'work-types',
                        title: 'أنواع الشغل',
                        content: `
1. **شغل موجب:** عندما تكون القوة في اتجاه الحركة (θ < 90°)
2. **شغل سالب:** عندما تكون القوة عكس اتجاه الحركة (θ > 90°)
3. **شغل صفر:** عندما تكون القوة عمودية على الحركة (θ = 90°)
            `
                    }
                ],
                formulas: [
                    {
                        id: 'work-formula',
                        name: 'قانون الشغل',
                        latex: 'W = F \\cdot d \\cdot \\cos(\\theta)',
                        description: 'الشغل = القوة × الإزاحة × جيب تمام الزاوية',
                        variables: [
                            { symbol: 'W', meaning: 'الشغل (J)' },
                            { symbol: 'F', meaning: 'القوة (N)' },
                            { symbol: 'd', meaning: 'الإزاحة (m)' },
                            { symbol: 'θ', meaning: 'الزاوية بين القوة والإزاحة' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'احسب الشغل المبذول لسحب صندوق مسافة 10 m بقوة 50 N تميل 60° على الأفقي.',
                        solution: [
                            'المعطيات: F = 50 N, d = 10 m, θ = 60°',
                            'المطلوب: W = ?',
                            'الحل: W = F × d × cos(θ)',
                            'W = 50 × 10 × cos(60°)',
                            'W = 50 × 10 × 0.5 = 250 J'
                        ],
                        answer: '250 J'
                    }
                ],
                summary: [
                    'الشغل = القوة × الإزاحة × cos(θ)',
                    'وحدة الشغل: الجول (J)',
                    'الشغل كمية عددية (ليست متجهة)'
                ]
            }
        },
        {
            id: 'lesson-2',
            number: 2,
            title: 'Kinetic Energy',
            titleAr: 'الطاقة الحركية',
            duration: 20,
            content: {
                introduction: `
الطاقة الحركية هي الطاقة التي يمتلكها الجسم بسبب حركته. كل جسم متحرك يمتلك طاقة حركية.
        `,
                sections: [
                    {
                        id: 'kinetic-definition',
                        title: 'تعريف الطاقة الحركية',
                        content: `
الطاقة الحركية (KE) هي الطاقة الناتجة عن حركة الجسم، وتعتمد على:
1. **كتلة الجسم:** كلما زادت الكتلة زادت الطاقة الحركية
2. **سرعة الجسم:** الطاقة الحركية تتناسب مع مربع السرعة

**وحدة القياس:** جول (J)
            `
                    }
                ],
                formulas: [
                    {
                        id: 'kinetic-energy-formula',
                        name: 'قانون الطاقة الحركية',
                        latex: 'KE = \\frac{1}{2} m v^2',
                        description: 'الطاقة الحركية = نصف الكتلة × مربع السرعة',
                        variables: [
                            { symbol: 'KE', meaning: 'الطاقة الحركية (J)' },
                            { symbol: 'm', meaning: 'الكتلة (kg)' },
                            { symbol: 'v', meaning: 'السرعة (m/s)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'احسب الطاقة الحركية لسيارة كتلتها 1000 kg تتحرك بسرعة 20 m/s.',
                        solution: [
                            'المعطيات: m = 1000 kg, v = 20 m/s',
                            'المطلوب: KE = ?',
                            'الحل: KE = ½mv²',
                            'KE = 0.5 × 1000 × (20)²',
                            'KE = 0.5 × 1000 × 400 = 200000 J'
                        ],
                        answer: '200000 J = 200 kJ'
                    }
                ],
                summary: [
                    'الطاقة الحركية = ½ × الكتلة × مربع السرعة',
                    'تتناسب مع مربع السرعة (مضاعفة السرعة = 4 أضعاف الطاقة)',
                    'كمية عددية موجبة دائماً'
                ]
            }
        },
        {
            id: 'lesson-3',
            number: 3,
            title: 'Work-Energy Theorem',
            titleAr: 'نظرية الشغل والطاقة',
            duration: 25,
            content: {
                introduction: `
نظرية الشغل والطاقة تربط بين الشغل المبذول على جسم والتغير في طاقته الحركية.
        `,
                sections: [
                    {
                        id: 'theorem-statement',
                        title: 'نص النظرية',
                        content: `
الشغل الكلي المبذول على جسم يساوي التغير في طاقته الحركية.

W_net = ΔKE = KE_f - KE_i

هذا يعني:
- إذا كان الشغل موجباً، تزداد الطاقة الحركية
- إذا كان الشغل سالباً، تنقص الطاقة الحركية
            `
                    }
                ],
                formulas: [
                    {
                        id: 'work-energy-theorem',
                        name: 'نظرية الشغل والطاقة',
                        latex: 'W_{net} = \\Delta KE = \\frac{1}{2}mv_f^2 - \\frac{1}{2}mv_i^2',
                        description: 'الشغل الكلي = الطاقة الحركية النهائية - الطاقة الحركية الابتدائية',
                        variables: [
                            { symbol: 'W_net', meaning: 'الشغل الكلي (J)' },
                            { symbol: 'v_f', meaning: 'السرعة النهائية (m/s)' },
                            { symbol: 'v_i', meaning: 'السرعة الابتدائية (m/s)' }
                        ]
                    }
                ],
                examples: [],
                summary: [
                    'الشغل الكلي = التغير في الطاقة الحركية',
                    'شغل موجب → زيادة السرعة',
                    'شغل سالب → نقص السرعة'
                ]
            }
        },
        {
            id: 'lesson-4',
            number: 4,
            title: 'Potential Energy',
            titleAr: 'طاقة الوضع',
            duration: 25,
            content: {
                introduction: `
طاقة الوضع هي الطاقة المخزنة في الجسم بسبب موقعه أو شكله. أشهر أنواعها طاقة وضع الجاذبية.
        `,
                sections: [
                    {
                        id: 'gravitational-pe',
                        title: 'طاقة وضع الجاذبية',
                        content: `
طاقة الوضع الجاذبية هي الطاقة المخزنة في الجسم بسبب ارتفاعه عن سطح مرجعي.

**الخصائص:**
- تزداد بزيادة الارتفاع
- تزداد بزيادة الكتلة
- تعتمد على اختيار مستوى الإسناد
            `
                    }
                ],
                formulas: [
                    {
                        id: 'gravitational-pe-formula',
                        name: 'طاقة وضع الجاذبية',
                        latex: 'PE = mgh',
                        description: 'طاقة الوضع = الكتلة × تسارع الجاذبية × الارتفاع',
                        variables: [
                            { symbol: 'PE', meaning: 'طاقة الوضع (J)' },
                            { symbol: 'm', meaning: 'الكتلة (kg)' },
                            { symbol: 'g', meaning: 'تسارع الجاذبية (9.8 m/s²)' },
                            { symbol: 'h', meaning: 'الارتفاع (m)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'احسب طاقة وضع كتاب كتلته 2 kg على رف ارتفاعه 1.5 m.',
                        solution: [
                            'المعطيات: m = 2 kg, g = 10 m/s², h = 1.5 m',
                            'المطلوب: PE = ?',
                            'الحل: PE = mgh',
                            'PE = 2 × 10 × 1.5 = 30 J'
                        ],
                        answer: '30 J'
                    }
                ],
                summary: [
                    'طاقة الوضع = الكتلة × g × الارتفاع',
                    'تعتمد على مستوى الإسناد المختار',
                    'يمكن تحويلها لطاقة حركية والعكس'
                ]
            }
        },
        {
            id: 'lesson-5',
            number: 5,
            title: 'Conservation of Energy',
            titleAr: 'حفظ الطاقة',
            duration: 30,
            content: {
                introduction: `
قانون حفظ الطاقة من أهم القوانين في الفيزياء. الطاقة لا تُخلق ولا تُفنى، بل تتحول من شكل لآخر.
        `,
                sections: [
                    {
                        id: 'law-statement',
                        title: 'نص قانون حفظ الطاقة',
                        content: `
في النظام المعزول (بدون قوى خارجية غير محافظة):

**الطاقة الميكانيكية الكلية تبقى ثابتة**

E_total = KE + PE = ثابت

هذا يعني: عند سقوط جسم، تتحول طاقة الوضع لطاقة حركية.
            `
                    }
                ],
                formulas: [
                    {
                        id: 'energy-conservation',
                        name: 'حفظ الطاقة الميكانيكية',
                        latex: 'KE_1 + PE_1 = KE_2 + PE_2',
                        description: 'مجموع الطاقة في البداية = مجموع الطاقة في النهاية',
                        variables: []
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'كرة سقطت من ارتفاع 20 m. ما سرعتها عند الأرض؟ (g = 10 m/s²)',
                        solution: [
                            'المعطيات: h = 20 m, v_i = 0, g = 10 m/s²',
                            'باستخدام حفظ الطاقة:',
                            'mgh = ½mv²',
                            'gh = ½v²',
                            'v² = 2gh = 2 × 10 × 20 = 400',
                            'v = 20 m/s'
                        ],
                        answer: '20 m/s'
                    }
                ],
                summary: [
                    'الطاقة الكلية = الطاقة الحركية + طاقة الوضع = ثابت',
                    'الطاقة تتحول ولا تفنى',
                    'يُستخدم لحل مسائل السقوط والبندول'
                ]
            }
        },
        {
            id: 'lesson-6',
            number: 6,
            title: 'Power',
            titleAr: 'القدرة',
            duration: 20,
            content: {
                introduction: `
القدرة تقيس معدل إنجاز الشغل أو معدل تحويل الطاقة. جهازان قد يبذلان نفس الشغل لكن بقدرات مختلفة.
        `,
                sections: [
                    {
                        id: 'power-definition',
                        title: 'تعريف القدرة',
                        content: `
القدرة (P) هي معدل بذل الشغل أو معدل انتقال الطاقة.

**وحدة القياس:** واط (W) = J/s

**وحدات أخرى:**
- كيلوواط (kW) = 1000 W
- حصان (hp) ≈ 746 W
            `
                    }
                ],
                formulas: [
                    {
                        id: 'power-formula',
                        name: 'قانون القدرة',
                        latex: 'P = \\frac{W}{t} = F \\cdot v',
                        description: 'القدرة = الشغل ÷ الزمن = القوة × السرعة',
                        variables: [
                            { symbol: 'P', meaning: 'القدرة (W)' },
                            { symbol: 'W', meaning: 'الشغل (J)' },
                            { symbol: 't', meaning: 'الزمن (s)' },
                            { symbol: 'v', meaning: 'السرعة (m/s)' }
                        ]
                    }
                ],
                examples: [
                    {
                        id: 'example-1',
                        question: 'رافعة تنجز شغلاً مقداره 6000 J في 30 s. ما قدرتها؟',
                        solution: [
                            'المعطيات: W = 6000 J, t = 30 s',
                            'المطلوب: P = ?',
                            'الحل: P = W/t = 6000/30 = 200 W'
                        ],
                        answer: '200 W'
                    }
                ],
                summary: [
                    'القدرة = الشغل ÷ الزمن',
                    'القدرة = القوة × السرعة',
                    'وحدة القدرة: الواط (W)'
                ]
            }
        }
    ] as Lesson[]
};

export function getLessonById(lessonId: string): Lesson | undefined {
    return workEnergyUnit.lessons.find(l => l.id === lessonId);
}
