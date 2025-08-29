
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "ظاهرة كومبتون",
        description: "هي ظاهرة تشتت الفوتونات (عادة من الأشعة السينية أو غاما) عند اصطدامها بإلكترون حر. تُفسر هذه الظاهرة على أنها تصادم مرن بين جسيمين، مما يؤكد أن للفوتونات زخمًا خطيًا."
    },
    {
        title: "حفظ الزخم والطاقة",
        formula: "\\vec{p}_{photon} + \\vec{p}_{electron} = \\vec{p'}_{photon} + \\vec{p'}_{electron}",
        description: "في هذا التصادم، يتم حفظ كل من الزخم الخطي الكلي والطاقة الكلية للنظام المكون من الفوتون والإلكترون."
    },
    {
        title: "معادلة كومبتون",
        formula: "\\Delta\\lambda = \\lambda' - \\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)",
        description: "تحسب هذه المعادلة التغير في الطول الموجي للفوتون ($\Delta\lambda$) بعد تشتته بزاوية ($\theta$). المقدار $h/(m_e c)$ هو ثابت يُعرف بطول موجة كومبتون للإلكترون."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           أكبر تغير في الطول الموجي (وبالتالي أكبر طاقة تُعطى للإلكترون) يحدث عندما يرتد الفوتون للخلف بزاوية $180^\\circ$.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
