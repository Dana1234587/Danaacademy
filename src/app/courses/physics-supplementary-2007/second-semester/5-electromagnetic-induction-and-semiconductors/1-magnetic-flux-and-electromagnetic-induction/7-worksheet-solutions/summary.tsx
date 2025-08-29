
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون فارادي",
        formula: "\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t}",
        description: "القانون الأساسي لحساب القوة الدافعة الحثية. استخدمه عندما يتغير التدفق عبر ملف."
    },
    {
        title: "القوة الدافعة الحثية الحركية",
        formula: "\\varepsilon = BLv\\sin(\\theta)",
        description: "حالة خاصة من قانون فارادي، تُستخدم عندما يتحرك موصل مستقيم في مجال مغناطيسي."
    },
    {
        title: "التيار والقوة",
        formula: "I = \\frac{\\varepsilon}{R} \\quad , \\quad F = ILB",
        description: "بمجرد حساب القوة الدافعة الحثية، يمكن استخدام قانون أوم لحساب التيار الحثي، ومن ثم حساب القوة المغناطيسية المؤثرة على الموصل."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           عند حل أي مسألة، اسأل نفسك أولاً: ما هو سبب تولد القوة الدافعة؟ هل هو تغير في التدفق عبر ملف (استخدم فارادي) أم حركة موصل (استخدم القوة الدافعة الحركية)؟ هذا يحدد القانون الذي يجب أن تبدأ به.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
