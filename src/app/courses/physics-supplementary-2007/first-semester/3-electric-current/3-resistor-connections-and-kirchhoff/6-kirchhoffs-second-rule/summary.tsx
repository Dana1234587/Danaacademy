
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قاعدة كيرشوف الثانية (قاعدة العروة)",
        formula: "\\Sigma (\\Delta V) = 0",
        description: "المجموع الجبري للتغيرات في الجهد الكهربائي عبر جميع عناصر أي مسار مغلق (عروة) في دارة كهربائية يساوي صفرًا."
    },
    {
        title: "قاعدة الإشارات",
        formula: "",
        description: "1. عبر مقاومة R مع التيار I: $\\Delta V = -IR$\n2. عبر مقاومة R عكس التيار I: $\\Delta V = +IR$\n3. عبر بطارية ε من السالب للموجب: $\\Delta V = +\\varepsilon$\n4. عبر بطارية ε من الموجب للسالب: $\\Delta V = -\\varepsilon$"
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
          <AlertTitle className="font-bold">مبدأ حفظ الطاقة</AlertTitle>
          <AlertDescription>
           قاعدة العروة هي تعبير عن مبدأ حفظ الطاقة. فهي تعني أن أي شحنة تعود إلى نقطة البداية في مسار مغلق يجب أن يكون لها نفس الطاقة التي بدأت بها، أي أن مجموع الطاقات المكتسبة (من البطاريات) يساوي مجموع الطاقات المفقودة (في المقاومات).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
