
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb, Zap } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "القوى على أضلاع حلقة مستطيلة في مجال مغناطيسي",
        formula: "",
        description: "عند غمر حلقة مستطيلة تحمل تياراً في مجال مغناطيسي منتظم:\n• الضلعان الموازيان لاتجاه المجال ← لا تؤثر عليهما قوة مغناطيسية (θ = 0°)\n• الضلعان العموديان على اتجاه المجال ← تؤثر عليهما قوة مغناطيسية (θ = 90°)",
        units: ""
    },
    {
        title: "قانون عزم الازدواج",
        formula: "\\tau = NBIA\\sin(\\alpha)",
        description: "عزم الازدواج المؤثر على ملف يحمل تياراً في مجال مغناطيسي، حيث:\n• N = عدد اللفات\n• B = شدة المجال المغناطيسي\n• I = شدة التيار\n• A = مساحة الملف\n• α = الزاوية بين العمودي على مستوى الملف واتجاه المجال",
        units: "\\tau \\text{ (N·m)}, \\quad B \\text{ (T)}, \\quad I \\text{ (A)}, \\quad A \\text{ (m}^2\\text{)}"
    },
    {
        title: "العزم الأقصى",
        formula: "\\tau_{max} = NBIA \\quad (\\alpha = 90°)",
        description: "يكون عزم الازدواج أكبر ما يمكن عندما يكون مستوى الحلقة موازياً لاتجاه المجال المغناطيسي (α = 90°).",
        units: ""
    },
    {
        title: "العزم الصفري",
        formula: "\\tau = 0 \\quad (\\alpha = 0° \\text{ or } 180°)",
        description: "يكون عزم الازدواج صفراً عندما يكون مستوى الحلقة عمودياً على اتجاه المجال المغناطيسي (α = 0° أو 180°).",
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
                    <AlertTitle className="font-bold text-blue-800 dark:text-blue-400">فهم الزاوية α</AlertTitle>
                    <AlertDescription className="text-blue-700 dark:text-blue-300">
                        الزاوية α هي بين العمودي على مستوى الملف (ليس مستوى الملف نفسه) واتجاه المجال:
                        <ul className="mt-2 list-disc list-inside">
                            <li>مستوى الملف موازٍ للمجال ← العمودي عمودي على المجال ← α = 90° ← عزم أقصى</li>
                            <li>مستوى الملف عمودي على المجال ← العمودي موازٍ للمجال ← α = 0° ← عزم صفري</li>
                        </ul>
                    </AlertDescription>
                </Alert>

                <Alert variant="default" className="border-green-500 bg-green-50 dark:bg-green-950/20">
                    <Zap className="h-4 w-4 text-green-600" />
                    <AlertTitle className="font-bold text-green-800 dark:text-green-400">تطبيق: المحرك الكهربائي</AlertTitle>
                    <AlertDescription className="text-green-700 dark:text-green-300">
                        يعمل المحرك الكهربائي على مبدأ عزم الازدواج. الملف يدور بسبب القوى المغناطيسية المتعاكسة على الضلعين العموديين، ويُستخدم مبدل التيار (الكوموتيتر) لعكس اتجاه التيار عند كل نصف دورة للحفاظ على استمرارية الدوران.
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
