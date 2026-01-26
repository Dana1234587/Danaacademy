
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info, Lightbulb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "نقطة انعدام المجال المغناطيسي",
        formula: "\\vec{B}_{net} = 0",
        description: "هي النقطة التي تكون عندها محصلة المجال المغناطيسي تساوي صفرًا. يحدث ذلك عندما يكون هناك مجالين مغناطيسيين متساويين في المقدار ومتعاكسين في الاتجاه."
    },
    {
        title: "مفتاح الحل",
        formula: "B_1 = B_2",
        description: "لإيجاد نقطة انعدام المجال، نساوي بين مقداري المجالين المغناطيسيين عند تلك النقطة."
    },
    {
        title: "موصلان متوازيان - تياران بنفس الاتجاه",
        formula: "",
        description: "عندما يكون التياران في نفس الاتجاه، تقع نقطة انعدام المجال بين الموصلين وتكون أقرب للموصل الذي يحمل التيار الأصغر."
    },
    {
        title: "موصلان متوازيان - تياران متعاكسان",
        formula: "",
        description: "عندما يكون التياران متعاكسين في الاتجاه، تقع نقطة انعدام المجال خارج الموصلين وتكون أقرب للموصل الذي يحمل التيار الأصغر."
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
                            <CardDescription className="text-right">
                                {law.description}
                            </CardDescription>
                        </CardContent>
                    </Card>
                ))}
                <Alert variant="default" className="border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20">
                    <Lightbulb className="h-4 w-4 text-yellow-600" />
                    <AlertTitle className="font-bold text-yellow-800 dark:text-yellow-400">ملاحظة مهمة جداً</AlertTitle>
                    <AlertDescription className="text-yellow-700 dark:text-yellow-300">
                        المجالات المغناطيسية هي التي تكون متعاكسة في الاتجاه وليس التيارات! لذلك يجب تحديد اتجاه المجال من كل موصل أولاً ثم تحديد المنطقة التي تتعاكس فيها المجالات.
                    </AlertDescription>
                </Alert>
                <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle className="font-bold">خطوات الحل</AlertTitle>
                    <AlertDescription>
                        <ol className="list-decimal list-inside mt-2 space-y-1">
                            <li>حدد اتجاه المجال المغناطيسي من كل موصل باستخدام قاعدة اليد اليمنى.</li>
                            <li>حدد المنطقة التي تتعاكس فيها اتجاهات المجالات.</li>
                            <li>طبق شرط الانعدام: <InlineMath math="B_1 = B_2" /></li>
                            <li>حل المعادلة لإيجاد المسافة من أحد الموصلين.</li>
                        </ol>
                    </AlertDescription>
                </Alert>
            </div>
        </div>
    );
}
