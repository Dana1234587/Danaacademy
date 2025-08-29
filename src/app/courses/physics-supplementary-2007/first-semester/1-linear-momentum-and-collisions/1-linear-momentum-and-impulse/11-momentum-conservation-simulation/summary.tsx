
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "حفظ الزخم الخطي",
        formula: "\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final}",
        description: "في أي نظام معزول (لا توجد قوى خارجية محصلة)، يكون الزخم الخطي الكلي قبل التصادم مساويًا للزخم الخطي الكلي بعد التصادم. هذا القانون ينطبق على جميع أنواع التصادمات."
    },
    {
        title: "حفظ الطاقة الحركية",
        formula: "\\Sigma K_{initial} = \\Sigma K_{final}",
        description: "تكون الطاقة الحركية الكلية محفوظة فقط في التصادمات المرنة تمامًا. في التصادمات غير المرنة، جزء من الطاقة الحركية يتحول إلى أشكال أخرى (حرارة، صوت)."
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
          <AlertTitle className="font-bold">أنواع التصادمات</AlertTitle>
          <AlertDescription>
           - **مرن:** الزخم محفوظ والطاقة الحركية محفوظة. <br/>
           - **غير مرن:** الزخم محفوظ والطاقة الحركية غير محفوظة. <br/>
           - **عديم المرونة كليًا:** الزخم محفوظ، والأجسام تلتحم بعد التصادم، والفقد في الطاقة الحركية يكون أكبر ما يمكن.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
