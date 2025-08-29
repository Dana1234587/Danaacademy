
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "منحنى (التدفق - الزمن)",
        formula: "\\text{الميل} = \\frac{\\Delta \\Phi_B}{\\Delta t}",
        description: "ميل المماس لمنحنى التدفق المغناطيسي مع الزمن يمثل المعدل الزمني للتغير في التدفق."
    },
    {
        title: "العلاقة مع القوة الدافعة الحثية",
        formula: "\\varepsilon = -N \\times (\\text{الميل})",
        description: "يمكن إيجاد القوة الدافعة الحثية اللحظية من ميل منحنى التدفق عند تلك اللحظة. إذا كان الميل ثابتًا (خط مستقيم)، تكون القوة الدافعة ثابتة. إذا كان الميل صفرًا (خط أفقي)، تكون القوة الدافعة صفرًا."
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
          <AlertTitle className="font-bold">ملاحظة على الإشارة</AlertTitle>
          <AlertDescription>
           بسبب الإشارة السالبة في قانون فارادي، إذا كان ميل منحنى التدفق موجبًا، تكون القوة الدافعة الحثية سالبة. وإذا كان الميل سالبًا، تكون القوة الدافعة الحثية موجبة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
