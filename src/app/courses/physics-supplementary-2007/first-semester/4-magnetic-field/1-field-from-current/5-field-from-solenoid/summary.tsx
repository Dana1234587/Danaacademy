
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال داخل ملف لولبي طويل",
        formula: "B = \\mu_0 n I",
        description: "يصف هذا القانون مقدار المجال المغناطيسي (B) المنتظم داخل ملف لولبي طويل. حيث n هي كثافة اللفات (عدد اللفات لكل وحدة طول، $n = N/L$) و I هو التيار."
    },
    {
        title: "قاعدة اليد اليمنى (للملف اللولبي)",
        formula: "",
        description: "لتحديد اتجاه المجال، لف أصابع يدك اليمنى مع اتجاه التيار في اللفات. سيشير إبهامك إلى اتجاه المجال المغناطيسي داخل الملف، والذي يمثل القطب الشمالي للمغناطيس الكهربائي المتكون."
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
            المجال المغناطيسي داخل الملف اللولبي الطويل منتظم تقريبًا (ثابت في المقدار والاتجاه)، بينما يكون المجال خارجه ضعيفًا جدًا ويمكن إهماله في الحسابات.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
