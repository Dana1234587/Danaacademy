
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التصادم المرن",
        description: "هو التصادم الذي تكون فيه كل من الطاقة الحركية الكلية والزخم الخطي الكلي للنظام محفوظة قبل وبعد التصادم."
    },
    {
        title: "حفظ الزخم الخطي",
        formula: "\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final}",
        description: "القانون الأول الذي ينطبق على التصادمات المرنة في نظام معزول."
    },
    {
        title: "حفظ الطاقة الحركية",
        formula: "\\Sigma K_{initial} = \\Sigma K_{final}",
        description: "القانون الثاني الذي ينطبق على التصادمات المرنة. لا يوجد فقدان للطاقة الحركية."
    },
    {
        title: "علاقة السرعة النسبية (للتصادم المرن فقط)",
        formula: "v_{1i} + v_{1f} = v_{2i} + v_{2f}",
        description: "هذه العلاقة هي نتيجة مباشرة لتطبيق القانونين السابقين معًا. يمكن استخدامها لتبسيط حل المسائل بشكل كبير، لكنها صالحة فقط في حالة التصادمات المرنة."
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
                {law.formula && (
                    <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                        <BlockMath math={law.formula} />
                    </div>
                )}
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
            عند حل مسائل التصادم المرن، يمكنك استخدام معادلة حفظ الزخم مع معادلة علاقة السرعة النسبية كنظام من معادلتين لحل مجهولين (مثل السرعات النهائية).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
