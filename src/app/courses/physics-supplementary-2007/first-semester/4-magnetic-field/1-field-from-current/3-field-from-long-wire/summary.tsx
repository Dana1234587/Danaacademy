
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال المغناطيسي لسلك مستقيم طويل",
        formula: "B = \\frac{\\mu_0 I}{2\\pi r}",
        description: "يصف هذا القانون مقدار المجال المغناطيسي (B) على بعد مسافة عمودية (r) من سلك مستقيم طويل جدًا يحمل تيارًا (I). المجال يتناسب طرديًا مع التيار وعكسيًا مع المسافة."
    },
    {
        title: "قاعدة اليد اليمنى (للسلك المستقيم)",
        formula: "",
        description: "هي القاعدة المستخدمة لتحديد اتجاه خطوط المجال المغناطيسي حول السلك. وجّه إبهامك باتجاه التيار (I)، وسيشير التفاف أصابعك إلى اتجاه المجال المغناطيسي (B)."
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
           خطوط المجال المغناطيسي حول سلك مستقيم تكون على شكل دوائر متحدة المركز مركزها السلك نفسه، وتقع في مستوى عمودي على السلك.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
