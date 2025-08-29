
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المقاومة في دارة AC",
        formula: "V_R = I R",
        description: "في المقاومة، يكون الجهد والتيار في نفس الطور (متفقان في الطور). زاوية الطور بينهما صفر."
    },
    {
        title: "المفاعلة الحثية (Inductive Reactance)",
        formula: "X_L = \\omega L = 2\\pi f L",
        description: "هي ممانعة المحث لمرور التيار المتردد. في المحث، يسبق الجهد التيار بزاوية طور $90^\\circ$ (ربع دورة)."
    },
    {
        title: "المفاعلة المواسعية (Capacitive Reactance)",
        formula: "X_C = \\frac{1}{\\omega C} = \\frac{1}{2\\pi f C}",
        description: "هي ممانعة المواسع لمرور التيار المتردد. في المواسع، يتأخر الجهد عن التيار بزاوية طور $90^\\circ$ (ربع دورة)."
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
          <AlertTitle className="font-bold">تذكر</AlertTitle>
          <AlertDescription>
           المقاومة (R) لا تعتمد على التردد. المفاعلة الحثية ($X_L$) تزداد مع زيادة التردد. المفاعلة المواسعية ($X_C$) تقل مع زيادة التردد.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
