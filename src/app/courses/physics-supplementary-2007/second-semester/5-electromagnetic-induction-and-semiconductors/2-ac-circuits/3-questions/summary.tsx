
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المعاوقة الكلية (Z)",
        formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}",
        description: "المعاوقة هي الممانعة الكلية لدارة RLC لمرور التيار المتردد. وهي المجموع المتجهي للمقاومة والمفاعلات."
    },
    {
        title: "قانون أوم لدارة AC",
        formula: "V_{max} = I_{max} Z \\quad \\text{or} \\quad V_{rms} = I_{rms} Z",
        description: "يُستخدم لحساب التيار الكلي في الدارة بمعرفة الجهد الكلي والمعاوقة الكلية."
    },
    {
        title: "زاوية الطور (φ)",
        formula: "\\tan(\\phi) = \\frac{X_L - X_C}{R}",
        description: "هي زاوية الطور بين الجهد الكلي والتيار الكلي في الدارة. إذا كانت موجبة، فإن الجهد يسبق التيار (دارة حثية). إذا كانت سالبة، فإن التيار يسبق الجهد (دارة مواسعية)."
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
           1. احسب $X_L$ و $X_C$ من التردد. <br/>
           2. احسب المعاوقة الكلية Z. <br/>
           3. استخدم قانون أوم لحساب التيار الكلي. <br/>
           4. احسب زاوية الطور لتحديد خصائص الدارة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
