
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "مقدار القوة المغناطيسية",
        formula: "F = |q|vB\\sin(\\theta)",
        description: "القوة (F) المؤثرة على شحنة (q) تتحرك بسرعة (v) في مجال مغناطيسي (B). حيث $\\theta$ هي الزاوية بين اتجاهي السرعة والمجال."
    },
    {
        title: "الصيغة المتجهية (قوة لورنتز)",
        formula: "\\vec{F} = q(\\vec{v} \\times \\vec{B})",
        description: "تعطي هذه الصيغة كلاً من مقدار واتجاه القوة. اتجاه القوة يكون عموديًا على كل من متجه السرعة ومتجه المجال المغناطيسي."
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
           لتحديد اتجاه القوة على **شحنة موجبة**: وجّه أصابعك باتجاه السرعة ($\vec{v}$)، واجعل المجال ($\vec{B}$) يخرج من راحة يدك، فيشير إبهامك إلى اتجاه القوة ($\vec{F}$). **للشحنة السالبة**، يكون اتجاه القوة عكس اتجاه الإبهام.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
