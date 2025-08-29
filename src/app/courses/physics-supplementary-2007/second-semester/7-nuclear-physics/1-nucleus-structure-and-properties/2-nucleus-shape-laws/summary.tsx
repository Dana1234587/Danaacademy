
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "نصف قطر النواة",
        formula: "r = r_0 A^{1/3}",
        description: "حيث (r₀) ثابت تجريبي قيمته تقريبًا $1.2 \\times 10^{-15} m$ (أو 1.2 فيرمي)، و (A) هو العدد الكتلي للنواة."
    },
    {
        title: "حجم النواة",
        formula: "V = \\frac{4}{3}\\pi r^3",
        description: "بما أن نصف القطر يعتمد على $A^{1/3}$, فإن الحجم يتناسب طرديًا مع A. وهذا يعني أن كل نيوكليون يشغل نفس الحجم تقريبًا داخل النواة."
    },
    {
        title: "كثافة النواة",
        formula: "\\rho \\approx \\text{constant}",
        description: "بما أن كتلة النواة تتناسب طرديًا مع A وحجمها يتناسب طرديًا مع A، فإن كثافتها (الكتلة/الحجم) تكون ثابتة تقريبًا لجميع الأنوية، وهي قيمة هائلة جدًا."
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
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
            هذه القوانين هي نماذج تقريبية تفترض أن النواة كروية الشكل، وهو افتراض جيد لمعظم الأنوية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
