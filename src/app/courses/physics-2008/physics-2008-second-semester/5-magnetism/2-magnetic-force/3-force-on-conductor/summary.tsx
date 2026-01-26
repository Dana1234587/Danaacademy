
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "القوة المغناطيسية على موصل يحمل تياراً",
        formula: "F = BIL\\sin(\\theta)",
        description: "القوة المغناطيسية المؤثرة في موصل طوله (L) يمر به تيار (I) ومغمور في مجال مغناطيسي (B)، حيث θ هي الزاوية بين اتجاه التيار واتجاه المجال المغناطيسي.",
        units: "F \\text{ (N)}, \\quad B \\text{ (T)}, \\quad I \\text{ (A)}, \\quad L \\text{ (m)}"
    },
    {
        title: "الحالة الخاصة: عمودي",
        formula: "F_{max} = BIL \\quad (\\theta = 90°)",
        description: "عندما يكون التيار عمودياً على المجال المغناطيسي، تكون القوة في أقصى قيمتها.",
        units: ""
    },
    {
        title: "قاعدة اليد اليمنى للموصل",
        formula: "",
        description: "لتحديد اتجاه القوة المغناطيسية على موصل:\n• الإبهام ← اتجاه التيار (I)\n• الأصابع الأربعة ← اتجاه المجال المغناطيسي (B)\n• باطن اليد ← اتجاه القوة المغناطيسية (F)",
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

                <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-400">شرط التعامد</AlertTitle>
                    <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        لتطبيق القانون بشكل صحيح، يجب أن يكون التيار (I) والطول (L) واقعين في مستوى عمودي على اتجاه المجال المغناطيسي (B) للحصول على أقصى قوة.
                    </AlertDescription>
                </Alert>


            </div>
        </div>
    );
}
