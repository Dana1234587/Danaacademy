
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "حساب الطاقة الحركية المفقودة",
        formula: "\\Delta K = K_{final} - K_{initial}",
        description: "في التصادمات غير المرنة، تكون الطاقة النهائية أقل من الابتدائية، لذا تكون قيمة $\\Delta K$ سالبة، وتشير إلى مقدار الطاقة التي تحولت إلى أشكال أخرى."
    },
    {
        title: "حالة خاصة: تصادم مرن بين كتلتين متساويتين",
        formula: "v_{1f} = v_{2i} \\quad , \\quad v_{2f} = v_{1i}",
        description: "في التصادم المرن في بعد واحد بين جسمين لهما نفس الكتلة، يتبادل الجسمان سرعتيهما."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           1. حدد نوع التصادم (مرن، غير مرن، عديم المرونة).<br/>
           2. طبّق قانون حفظ الزخم دائمًا.<br/>
           3. إذا كان التصادم مرنًا، يمكنك تطبيق قانون حفظ الطاقة الحركية أيضًا.<br/>
           4. لحساب الطاقة المفقودة، احسب الطاقة الحركية الكلية قبل وبعد التصادم ثم أوجد الفرق.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
