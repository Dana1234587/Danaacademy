
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون بيو-سافار (الصيغة القياسية)",
        formula: "dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin(\\theta)}{r^2}",
        description: "يستخدم لحساب مقدار المجال المغناطيسي (dB) الناتج عن عنصر تيار صغير (Idl). حيث (μ₀) هي النفاذية المغناطيسية للفراغ، (r) هي المسافة من العنصر إلى النقطة، و (θ) هي الزاوية بين اتجاه التيار واتجاه متجه الموضع."
    },
    {
        title: "قانون بيو-سافار (الصيغة المتجهية)",
        formula: "d\\vec{B} = \\frac{\\mu_0}{4\\pi} \\frac{I (d\\vec{l} \\times \\hat{r})}{r^2}",
        description: "هذه الصيغة تعطي اتجاه المجال المغناطيسي بالإضافة إلى مقداره. اتجاه المجال يكون عموديًا على كل من عنصر التيار ($d\\vec{l}$) ومتجه الوحدة ($\r̂$), ويتم تحديده باستخدام قاعدة اليد اليمنى."
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
          <AlertTitle className="font-bold">قاعدة اليد اليمنى</AlertTitle>
          <AlertDescription>
           لتحديد اتجاه المجال، وجّه إبهامك مع اتجاه التيار (I). التفاف أصابعك حول السلك سيمثل اتجاه خطوط المجال المغناطيسي الدائرية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
