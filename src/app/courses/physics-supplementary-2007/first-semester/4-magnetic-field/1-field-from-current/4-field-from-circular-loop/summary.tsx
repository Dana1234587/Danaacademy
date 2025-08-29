
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال في مركز ملف دائري",
        formula: "B = \\frac{\\mu_0 N I}{2r}",
        description: "يصف هذا القانون مقدار المجال المغناطيسي (B) في مركز ملف دائري عدد لفاته (N)، نصف قطره (r)، ويمر به تيار (I)."
    },
    {
        title: "قاعدة اليد اليمنى (للملف الدائري)",
        formula: "",
        description: "لتحديد اتجاه المجال، لف أصابع يدك اليمنى مع اتجاه التيار في الحلقة. سيشير إبهامك إلى اتجاه المجال المغناطيسي داخل الحلقة (في المركز)."
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
           لاحظ عدم وجود الرمز ($\pi$) في مقام هذا القانون، على عكس قانون السلك المستقيم. هذا خطأ شائع يجب الانتباه إليه.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
