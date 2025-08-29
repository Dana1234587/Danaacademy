
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون الاضمحلال الإشعاعي",
        formula: "N(t) = N_0 e^{-\\lambda t}",
        description: "يصف عدد الأنوية غير المضمحلة (N) المتبقية في عينة بعد مرور زمن (t). $N_0$ هو العدد الابتدائي للأنوية، و $\\lambda$ هو ثابت الاضمحلال."
    },
    {
        title: "النشاطية الإشعاعية (A)",
        formula: "A(t) = \\lambda N(t) = A_0 e^{-\\lambda t}",
        description: "هي معدل اضمحلال الأنوية في عينة (عدد الاضمحلالات في الثانية). تُقاس بوحدة البكريل (Bq) أو الكوري (Ci)."
    },
    {
        title: "عمر النصف (T½)",
        formula: "T_{1/2} = \\frac{\\ln(2)}{\\lambda} \\approx \\frac{0.693}{\\lambda}",
        description: "هو الزمن اللازم لاضمحلال نصف عدد الأنوية الابتدائية في عينة مشعة. وهو قيمة ثابتة ومميزة لكل نظير مشع."
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
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           الاضمحلال الإشعاعي عملية عشوائية احتمالية. لا يمكننا التنبؤ بلحظة اضمحلال نواة معينة، لكن يمكننا التنبؤ بسلوك عدد كبير من الأنوية بشكل إحصائي دقيق باستخدام هذه القوانين.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
