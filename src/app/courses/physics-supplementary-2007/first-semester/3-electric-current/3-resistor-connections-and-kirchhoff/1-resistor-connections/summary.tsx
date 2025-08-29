
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التوصيل على التوالي (Series)",
        formula: "R_{eq} = R_1 + R_2 + \\dots",
        description: "التيار ثابت: $I_{total} = I_1 = I_2$. الجهد يتجزأ: $V_{total} = V_1 + V_2$. المقاومة المكافئة أكبر من أكبر مقاومة."
    },
    {
        title: "التوصيل على التوازي (Parallel)",
        formula: "\\frac{1}{R_{eq}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\dots",
        description: "الجهد ثابت: $V_{total} = V_1 = V_2$. التيار يتجزأ: $I_{total} = I_1 + I_2$. المقاومة المكافئة أصغر من أصغر مقاومة."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           ابدأ من أبعد نقطة عن المصدر وقم بتبسيط مجموعات المقاومات (التوالي أو التوازي) خطوة بخطوة حتى تصل إلى مقاومة واحدة مكافئة للدارة بأكملها.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
