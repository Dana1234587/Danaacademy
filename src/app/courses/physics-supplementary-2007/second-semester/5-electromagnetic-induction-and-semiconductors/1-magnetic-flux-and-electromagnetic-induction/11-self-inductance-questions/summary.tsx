
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الطاقة المخزنة في محث",
        formula: "U_L = \\frac{1}{2} L I^2",
        description: "هي الطاقة اللازمة لإنشاء التيار في المحث وتُخزن في مجاله المغناطيسي. تُقاس بالجول."
    },
    {
        title: "دارات RL",
        formula: "\\varepsilon - I R - L \\frac{dI}{dt} = 0",
        description: "هذه هي معادلة العروة لدارة RL على التوالي. تصف كيف يتغير التيار مع الزمن عند غلق أو فتح المفتاح."
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
          <AlertTitle className="font-bold">سلوك المحث</AlertTitle>
          <AlertDescription>
           - **لحظة غلق المفتاح (t=0):** يعمل المحث كدارة مفتوحة ($I=0$).<br/>
           - **بعد فترة طويلة (t → ∞):** يعمل المحث كسلك عديم المقاومة ($I = \\varepsilon/R$).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
