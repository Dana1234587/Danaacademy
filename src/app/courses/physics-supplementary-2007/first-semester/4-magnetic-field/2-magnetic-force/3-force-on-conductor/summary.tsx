
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القوة على موصل مستقيم",
        formula: "F = I L B \\sin(\\theta)",
        description: "القوة (F) المؤثرة على سلك مستقيم طوله (L) يمر به تيار (I) وموضوع في مجال مغناطيسي (B). حيث $\\theta$ هي الزاوية بين اتجاه التيار واتجاه المجال."
    },
    {
        title: "الصيغة المتجهية",
        formula: "\\vec{F} = I (\\vec{L} \\times \\vec{B})",
        description: "تعطي هذه الصيغة اتجاه القوة. حيث $\\vec{L}$ هو متجه طوله يساوي طول السلك واتجاهه هو اتجاه التيار الاصطلاحي."
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
           لتحديد اتجاه القوة، استخدم نفس قاعدة اليد اليمنى المستخدمة للشحنة الموجبة. وجّه أصابعك باتجاه التيار ($\vec{I}$ أو $\vec{L}$)، واجعل المجال ($\vec{B}$) يخرج من راحة يدك، فيشير إبهامك إلى اتجاه القوة ($\vec{F}$).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
