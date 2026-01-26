
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "القوة المتبادلة بين موصلين متوازيين (لوحدة الأطوال)",
        formula: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}",
        description: "القوة المغناطيسية المتبادلة لوحدة الأطوال بين موصلين متوازيين يمر بهما تياران I₁ و I₂، ويفصل بينهما مسافة d.",
        units: "\\frac{F}{L} \\text{ (N/m)}, \\quad I_1, I_2 \\text{ (A)}, \\quad d \\text{ (m)}"
    },
    {
        title: "القوة الكلية على موصل طوله L",
        formula: "F = \\frac{\\mu_0 I_1 I_2 L}{2\\pi d}",
        description: "القوة المغناطيسية الكلية المؤثرة على موصل طوله L من موصل آخر مواز له.",
        units: ""
    },
    {
        title: "طبيعة القوة المتبادلة",
        formula: "",
        description: "• إذا كان التياران في نفس الاتجاه ← قوة تجاذب\n• إذا كان التياران متعاكسين ← قوة تنافر",
        units: ""
    },
    {
        title: "تعريف الأمبير",
        formula: "\\frac{F}{L} = 2 \\times 10^{-7} \\text{ N/m}",
        description: "الأمبير هو شدة التيار الذي إذا مر في موصلين متوازيين طويلين ورفيعين يفصل بينهما متر واحد في الفراغ، أثر كل منهما في الآخر بقوة مقدارها 2×10⁻⁷ نيوتن لكل متر من طوليهما.",
        units: ""
    }
];

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg">
            <div className="space-y-6">
                {laws.map((law, index) => (
                    <Card key={index} className="shadow-md">
                        <CardHeader>
                            <CardTitle className="text-primary text-xl text-right">{law.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {law.formula &&
                                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                                    <BlockMath math={law.formula} />
                                </div>
                            }
                            {law.units &&
                                <div dir="ltr" className="bg-muted p-2 rounded text-center text-sm">
                                    <InlineMath math={law.units} />
                                </div>
                            }
                            <CardDescription className="text-right whitespace-pre-line">
                                {law.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}

                <Alert variant="default" className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
                    <Info className="h-4 w-4 text-blue-600" />
                    <AlertTitle className="font-bold text-blue-800 dark:text-blue-400">اشتقاق القانون</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                        تنشأ القوة لأن كل موصل ينشئ مجالاً مغناطيسياً يؤثر على الموصل الآخر:
                        <div dir="ltr" className="mt-2 space-y-1 text-center">
                            <div>المجال من الموصل 1: <InlineMath math="B_1 = \frac{\mu_0 I_1}{2\pi d}" /></div>
                            <div>القوة على الموصل 2: <InlineMath math="F = B_1 I_2 L = \frac{\mu_0 I_1 I_2 L}{2\pi d}" /></div>
                        </div>
                    </AlertDescription>
                </Alert>

                <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-400">ملاحظة مهمة</AlertTitle>
                    <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        القوة المتبادلة بين الموصلين متساوية في المقدار ومتعاكسة في الاتجاه (قانون نيوتن الثالث)، بغض النظر عن اختلاف شدتي التيارين.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
