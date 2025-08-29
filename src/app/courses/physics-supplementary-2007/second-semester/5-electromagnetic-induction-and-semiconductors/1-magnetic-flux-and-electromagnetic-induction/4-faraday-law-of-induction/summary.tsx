
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون فارادي في الحث",
        formula: "\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t}",
        description: "القوة الدافعة الكهربائية الحثية ($\\varepsilon$) المتولدة في ملف تساوي سالب حاصل ضرب عدد لفات الملف (N) في المعدل الزمني للتغير في التدفق المغناطيسي ($\\Delta\\Phi_B / \\Delta t$)."
    },
    {
        title: "مكونات القانون",
        formula: "",
        description: "• $\\varepsilon$: القوة الدافعة الحثية (بالفولت).\n• N: عدد لفات الملف.\n• $\\Delta\\Phi_B$: التغير في التدفق المغناطيسي (بالويبر).\n• $\\Delta t$: الفترة الزمنية التي حدث فيها التغير (بالثواني)."
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
          <AlertTitle className="font-bold">قانون لنز والإشارة السالبة</AlertTitle>
          <AlertDescription>
           الإشارة السالبة في قانون فارادي مهمة جدًا وتمثل قانون لنز. هي تعني أن القوة الدافعة الحثية (والتيار الحثي الناتج عنها) تتولد دائمًا في اتجاه يقاوم التغير في التدفق المغناطيسي الذي أنتجها. سنتناول هذا بالتفصيل في حصة قادمة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
