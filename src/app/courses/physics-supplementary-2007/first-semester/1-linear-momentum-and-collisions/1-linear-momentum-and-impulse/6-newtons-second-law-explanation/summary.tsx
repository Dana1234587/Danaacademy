
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الصيغة العامة لقانون نيوتن الثاني",
        formula: "\\Sigma \\vec{F} = \\frac{\\Delta \\vec{p}}{\\Delta t}",
        description: "تنص على أن محصلة القوى الخارجية المؤثرة على نظام تساوي المعدل الزمني للتغير في الزخم الخطي للنظام. هذه الصيغة صالحة دائمًا، حتى لو تغيرت كتلة النظام."
    },
    {
        title: "الحالة الخاصة (الكتلة الثابتة)",
        formula: "\\Sigma \\vec{F} = m\\vec{a}",
        description: "عندما تكون كتلة النظام ثابتة، يمكن تبسيط الصيغة العامة إلى الشكل الأكثر شيوعًا. حيث a هو تسارع الجسم."
    },
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
          <AlertTitle className="font-bold">متى نستخدم الصيغة العامة؟</AlertTitle>
          <AlertDescription>
           يجب استخدام الصيغة العامة $\\Sigma F = \\frac{\\Delta p}{\\Delta t}$ في الحالات التي تتغير فيها الكتلة، مثل الصواريخ التي تحرق الوقود، أو عربات الرمل التي يتسرب منها الرمل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
