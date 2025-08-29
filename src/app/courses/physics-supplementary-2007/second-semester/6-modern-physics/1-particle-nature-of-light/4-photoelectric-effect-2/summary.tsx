
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "معادلة أينشتاين الكهروضوئية",
        formula: "K_{max} = hf - \\phi",
        description: "تمثل مبدأ حفظ الطاقة. الطاقة الحركية العظمى للإلكترون المتحرر ($K_{max}$) تساوي طاقة الفوتون الساقط ($hf$) مطروحًا منها الطاقة اللازمة لتحريره (اقتران الشغل $\\phi$)."
    },
    {
        title: "جهد الإيقاف (V_s)",
        formula: "K_{max} = e V_s",
        description: "هو فرق الجهد العكسي اللازم لإيقاف أسرع الإلكترونات. الطاقة الحركية العظمى للإلكترون (بالجول) تساوي حاصل ضرب شحنة الإلكترون (e) في جهد الإيقاف (V)."
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
          <AlertTitle className="font-bold">ملاحظة على الوحدات</AlertTitle>
          <AlertDescription>
           عند استخدام $K_{max} = e V_s$, إذا كانت $K_{max}$ بوحدة الإلكترون فولت (eV)، فإن قيمة $V_s$ بوحدة الفولت ستكون مساوية عدديًا لها. (مثال: $K_{max} = 2.5$ eV يعني أن $V_s = 2.5$ V).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
