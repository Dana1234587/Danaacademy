
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "اضمحلال غاما (γ)",
        formula: "^A_Z X^* \\rightarrow ^A_Z X + \\gamma",
        description: "يحدث عندما تكون النواة في حالة إثارة (يُشار إليها بـ *) بعد اضمحلال ألفا أو بيتا. تعود النواة إلى حالتها المستقرة عن طريق إطلاق طاقتها الزائدة على شكل فوتون عالي الطاقة (أشعة غاما)."
    },
    {
        title: "خصائص أشعة غاما",
        description: "هي فوتونات (إشعاع كهرومغناطيسي)، ليس لها كتلة ولا شحنة. سرعتها هي سرعة الضوء وقدرتها على الاختراق عالية جدًا."
    },
    {
        title: "سلاسل الاضمحلال",
        description: "غالبًا ما تكون النواة الوليدة الناتجة عن اضمحلال ما غير مستقرة هي الأخرى، فتخضع لسلسلة من الاضمحلالات المتتالية (ألفا وبيتا) حتى تصل إلى نواة مستقرة (عادة ما تكون أحد نظائر الرصاص)."
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
           اضمحلال غاما لا يغير من تركيب النواة (لا Z ولا A يتغيران). هو مجرد عملية تفقد فيها النواة الطاقة لتصل إلى حالة أكثر استقرارًا.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
