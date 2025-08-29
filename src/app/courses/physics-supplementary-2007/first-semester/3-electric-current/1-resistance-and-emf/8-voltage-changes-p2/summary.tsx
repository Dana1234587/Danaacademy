
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "عبور بطارية (ε) - حالة شحن",
        formula: "\\Delta V_{ab} = +\\varepsilon + Ir",
        description: "عند عبور بطارية من قطبها السالب إلى الموجب (عكس اتجاه التيار الداخل للشحن)، يزداد الجهد بمقدار القوة الدافعة وأيضًا بمقدار الهبوط في الجهد الداخلي، لأننا نعبر المقاومة الداخلية عكس اتجاه التيار."
    },
    {
        title: "قاعدة الإشارات لحساب الجهد",
        formula: "",
        description: "1. عند عبور مقاومة R مع التيار I: $\\Delta V = -IR$.\n2. عند عبور مقاومة R عكس التيار I: $\\Delta V = +IR$.\n3. عند عبور بطارية ε من السالب للموجب: $\\Delta V = +\\varepsilon$.\n4. عند عبور بطارية ε من الموجب للسالب: $\\Delta V = -\\varepsilon$."
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
                    {law.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">التأريض</AlertTitle>
          <AlertDescription>
           النقطة المؤرضة في الدارة يكون جهدها صفرًا وتعتبر نقطة مرجعية لحساب جهد أي نقطة أخرى في الدارة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
