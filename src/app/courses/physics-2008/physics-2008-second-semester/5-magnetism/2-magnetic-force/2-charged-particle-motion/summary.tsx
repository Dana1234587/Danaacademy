
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "القوة المغناطيسية كقوة مركزية",
        formula: "F_B = F_c = \\frac{mv^2}{r}",
        description: "القوة المغناطيسية قوة مركزية لأنها دائماً عمودية على السرعة، مما يجعلها تغير اتجاه السرعة دون تغيير مقدارها. اتجاهها دائماً نحو مركز المسار الدائري.",
        units: ""
    },
    {
        title: "نصف قطر المسار الدائري",
        formula: "r = \\frac{mv}{qB}",
        description: "نصف قطر المسار الدائري للجسيم المشحون المتحرك عمودياً على مجال مغناطيسي منتظم.",
        units: "r \\text{ (m)}, \\quad m \\text{ (kg)}, \\quad v \\text{ (m/s)}, \\quad q \\text{ (C)}, \\quad B \\text{ (T)}"
    },
    {
        title: "الشحنة النوعية",
        formula: "\\frac{q}{m} = \\frac{v}{rB}",
        description: "الشحنة النوعية هي نسبة الشحنة إلى الكتلة، وهي خاصية مميزة لكل نوع من الجسيمات المشحونة. تُستخدم لتمييز الجسيمات المختلفة.",
        units: "\\frac{q}{m} \\text{ (C/kg)}"
    },
    {
        title: "التسارع المركزي",
        formula: "a_c = \\frac{v^2}{r}",
        description: "التسارع المركزي للجسيم المتحرك في مسار دائري، اتجاهه نحو المركز دائماً.",
        units: "a_c \\text{ (m/s}^2\\text{)}"
    }
];

const comparisonTable = {
    headers: ['الخاصية', 'القوة الكهربائية (F_E)', 'القوة المغناطيسية (F_B)'],
    rows: [
        ['تأثر الشحنات', 'ساكنة ومتحركة', 'متحركة فقط'],
        ['الشغل', 'تبذل شغلاً (تغير الطاقة الحركية)', 'لا تبذل شغلاً'],
        ['اتجاه القوة', 'موازية لاتجاه المجال الكهربائي', 'عمودية على اتجاه المجال المغناطيسي'],
        ['القانون', 'F_E = qE', 'F_B = qvB\\sin\\theta'],
    ]
};

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
                            <CardDescription className="text-right">
                                {law.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}

                <Card className="shadow-lg border-2 border-primary/30">
                    <CardHeader className="bg-primary/5">
                        <CardTitle className="text-primary text-xl text-center">مقارنة: القوة الكهربائية vs القوة المغناطيسية</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead className="bg-muted">
                                    <tr>
                                        {comparisonTable.headers.map((header, i) => (
                                            <th key={i} className="p-3 text-right font-bold border-b">
                                                {header.includes('F_') ? <InlineMath math={header} /> : header}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {comparisonTable.rows.map((row, i) => (
                                        <tr key={i} className="border-b hover:bg-muted/50">
                                            {row.map((cell, j) => (
                                                <td key={j} className="p-3 text-right">
                                                    {cell.includes('=') || cell.includes('\\') ? (
                                                        <span dir="ltr"><InlineMath math={cell} /></span>
                                                    ) : cell}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
                    <AlertDescription>
                        عندما تتحرك الشحنة بسرعة عمودية على المجال المغناطيسي المنتظم، تسلك مساراً دائرياً. إذا كانت هناك مركبة للسرعة موازية للمجال، تتحرك الشحنة في مسار لولبي (حلزوني).
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
