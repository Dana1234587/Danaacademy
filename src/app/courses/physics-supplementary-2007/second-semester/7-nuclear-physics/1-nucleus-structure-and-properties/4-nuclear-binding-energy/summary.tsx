
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "فرق الكتلة ($\\Delta m$)",
        formula: "\\Delta m = (Z m_p + N m_n) - m_{nuc}",
        description: "هو الفرق بين مجموع كتل مكونات النواة وهي منفردة (بروتونات ونيوترونات) وكتلة النواة الفعلية وهي مجتمعة. هذه الكتلة \"المفقودة\" تتحول إلى طاقة ربط."
    },
    {
        title: "طاقة الربط النووية (B.E.)",
        formula: "B.E. = (\\Delta m) c^2",
        description: "هي الطاقة المكافئة لفرق الكتلة، وتمثل الطاقة اللازمة لفصل نيوكليونات النواة عن بعضها تمامًا. كلما زادت طاقة الربط، كانت النواة أكثر استقرارًا."
    },
    {
        title: "طاقة الربط لكل نيوكليون",
        formula: "\\frac{B.E.}{A}",
        description: "هي مقياس أكثر دقة لاستقرار النواة. الأنوية ذات طاقة الربط الأعلى لكل نيوكليون (الذروة عند الحديد-56) هي الأكثر استقرارًا."
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
          <AlertTitle className="font-bold">الانشطار والاندماج</AlertTitle>
          <AlertDescription>
            تنتج الطاقة من الانشطار (انقسام نواة ثقيلة) والاندماج (اتحاد أنوية خفيفة) لأن نواتج كلتا العمليتين لديها طاقة ربط لكل نيوكليون أعلى (أكثر استقرارًا) من المتفاعلات.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
