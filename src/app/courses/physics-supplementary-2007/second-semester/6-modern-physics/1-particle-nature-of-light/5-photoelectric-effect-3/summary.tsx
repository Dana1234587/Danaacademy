
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
        description: "هي معادلة خطية تربط بين الطاقة الحركية العظمى ($K_{max}$) وتردد الفوتون الساقط (f)."
    },
    {
        title: "تحليل الرسم البياني ($K_{max}$ مقابل f)",
        description: "• **الميل:** يساوي ثابت بلانك (h).\n• **التقاطع مع المحور الأفقي (f):** يعطي تردد العتبة ($f_0$).\n• **امتداد الخط ليقطع المحور الرأسي (K):** يعطي سالب اقتران الشغل ($-\\phi$)."
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
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           الرسم البياني للظاهرة الكهروضوئية هو أداة قوية. يمكن من خلاله استنتاج قيم أساسية مثل ثابت بلانك واقتران الشغل وتردد العتبة بشكل تجريبي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
