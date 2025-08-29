
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "فرضية بلانك لتكمية الطاقة",
        formula: "E = nhf",
        description: "الطاقة المنبعثة أو الممتصة من قبل المادة تأتي على شكل حزم (كمّات) منفصلة، وهي مضاعفات صحيحة (n) لكمية أساسية هي hf، حيث h هو ثابت بلانك و f هو تردد الإشعاع."
    },
    {
        title: "طاقة الفوتون",
        formula: "E = hf = \\frac{hc}{\\lambda}",
        description: "الفوتون هو كمّة الطاقة الكهرومغناطيسية. طاقته تتناسب طرديًا مع تردده (f) وعكسيًا مع طوله الموجي (λ)."
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
          <AlertTitle className="font-bold">ثابت بلانك (h)</AlertTitle>
          <AlertDescription>
           هو ثابت فيزيائي أساسي يربط بين طاقة الفوتون وتردده. قيمته تقريبًا $6.63 \\times 10^{-34}$ جول.ثانية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
