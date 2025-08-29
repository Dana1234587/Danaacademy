
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التدفق المغناطيسي",
        formula: "\\Phi_B = B A \\cos(\\theta)",
        description: "القانون الأساسي لحساب التدفق. تذكر أن A هي المساحة التي يخترقها المجال، و B هي شدة المجال، و $\\theta$ هي الزاوية بين B والعمودي على المساحة A."
    },
    {
        title: "التغير في التدفق ($\\Delta\\Phi_B$)",
        formula: "\\Delta\\Phi_B = \\Phi_{final} - \\Phi_{initial}",
        description: "يمكن أن يحدث التغير في التدفق نتيجة لتغير شدة المجال (B)، أو تغير المساحة (A)، أو تغير الزاوية ($\\theta$). من الضروري تحديد العامل المتغير لحساب التغير في التدفق بشكل صحيح."
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
           1. اقرأ السؤال بعناية لتحديد المعطيات: B, A, و $\\theta$. <br/>
           2. انتبه بشكل خاص للزاوية المعطاة. هل هي بين المجال والمستوى، أم بين المجال والعمودي على المستوى؟ <br/>
           3. عند حساب التغير في التدفق، حدد أي من العوامل (B, A, or $\\theta$) يتغير واحسب التدفق الابتدائي والنهائي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
