
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القوة الدافعة الحثية الحركية",
        formula: "\\varepsilon = B L v \\sin(\\theta)",
        description: "القوة الدافعة الحثية ($\\varepsilon$) المتولدة في موصل مستقيم طوله (L) يتحرك بسرعة (v) في مجال مغناطيسي (B). الزاوية ($\\theta$) هي الزاوية بين السرعة والمجال."
    },
    {
        title: "الحالة الخاصة (التعامد)",
        formula: "\\varepsilon = BLv",
        description: "عندما تكون السرعة والمجال وطول الموصل متعامدين على بعضهم البعض، تصل القوة الدافعة إلى قيمتها العظمى."
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
          <AlertTitle className="font-bold">تحديد القطبية</AlertTitle>
          <AlertDescription>
           لتحديد أي طرف من الموصل يصبح القطب الموجب، استخدم قاعدة اليد اليمنى: وجه الأصابع باتجاه السرعة (v) واجعل المجال (B) يخرج من راحة يدك. سيشير الإبهام إلى اتجاه القوة المغناطيسية على الشحنات الموجبة، وبالتالي إلى القطب الموجب للموصل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
