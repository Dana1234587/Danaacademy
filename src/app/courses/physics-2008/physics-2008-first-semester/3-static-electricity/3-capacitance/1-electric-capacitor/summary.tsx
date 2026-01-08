
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const concepts = [
    {
        title: "تعريف المواسعة الكهربائية",
        formula: "C = \\frac{Q}{V}",
        description: "المواسعة الكهربائية هي النسبة بين الشحنة المخزنة على المواسع وفرق الجهد بين لوحيه. المواسعة خاصية ثابتة للمواسع تعتمد على شكله وأبعاده ونوع العازل."
    },
    {
        title: "وحدة المواسعة: الفاراد (F)",
        formula: "1 \\text{ F} = \\frac{1 \\text{ C}}{1 \\text{ V}}",
        description: "الفاراد هو مواسعة مواسع يختزن شحنة مقدارها 1 كولوم عندما يكون فرق الجهد بين لوحيه 1 فولت. الفاراد وحدة كبيرة جداً، لذا نستخدم عادةً: ميكروفاراد (μF) أو نانوفاراد (nF) أو بيكوفاراد (pF)."
    },
    {
        title: "شحن المواسع",
        description: "يُشحن المواسع عن طريق وصله ببطارية. تنتقل الشحنات من البطارية إلى لوحي المواسع حتى يصبح فرق الجهد بين لوحي المواسع مساوياً لفرق جهد البطارية، عندها تنتهي عملية الشحن ويتوقف مرور التيار."
    },
    {
        title: "العلاقة بين Q و V",
        description: "العلاقة بين الشحنة (Q) وفرق الجهد (V) علاقة طردية: كلما زاد فرق الجهد زادت الشحنة المخزنة، بينما تبقى المواسعة (C) ثابتة لأنها خاصية للمواسع نفسه ولا تعتمد على الشحنة أو الجهد."
    },
    {
        title: "طاقة الوضع المخزنة في المواسع (PE)",
        formula: "PE = \\frac{1}{2} Q V = \\frac{1}{2} C V^2 = \\frac{1}{2} \\frac{Q^2}{C}",
        description: "طاقة الوضع الكهربائية المخزنة في المواسع تساوي المساحة تحت منحنى (Q-V). يمكن حسابها بثلاث صيغ متكافئة حسب المعطيات المتوفرة.\n\nملاحظة مهمة: الشغل الذي تبذله البطارية لشحن المواسع يساوي طاقة الوضع المخزنة فيه."
    },
    {
        title: "اشتقاق قوانين الطاقة",
        description: "من العلاقة C = Q/V يمكن اشتقاق الصيغ الثلاث للطاقة:\n• الصيغة الأولى: PE = ½QV (مباشرة من مساحة المثلث تحت المنحنى)\n• الصيغة الثانية: PE = ½CV² (بتعويض Q = CV)\n• الصيغة الثالثة: PE = ½Q²/C (بتعويض V = Q/C)"
    }
];

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg">
            <div className="space-y-6">
                {concepts.map((concept, index) => (
                    <Card key={index} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-primary text-xl text-right">{concept.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {concept.formula && (
                                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                                    <BlockMath math={concept.formula} />
                                </div>
                            )}
                            <CardDescription className="text-right leading-relaxed whitespace-pre-line">
                                {concept.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
