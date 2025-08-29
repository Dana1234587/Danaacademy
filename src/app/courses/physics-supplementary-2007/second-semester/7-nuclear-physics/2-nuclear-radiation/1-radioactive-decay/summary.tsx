
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الاضمحلال الإشعاعي",
        description: "هو عملية تلقائية تتحول فيها نواة غير مستقرة إلى نواة أكثر استقرارًا عن طريق إطلاق جسيمات أو إشعاعات."
    },
    {
        title: "اضمحلال ألفا (α)",
        formula: "^A_Z X \\rightarrow ^{A-4}_{Z-2} Y + ^4_2 He",
        description: "يحدث في الأنوية الثقيلة (Z > 83). تفقد النواة جسيم ألفا (نواة هيليوم)، فيقل العدد الكتلي بمقدار 4 والعدد الذري بمقدار 2."
    },
    {
        title: "اضمحلال بيتا السالبة (β⁻)",
        formula: "^A_Z X \\rightarrow ^A_{Z+1} Y + ^0_{-1} e + \\bar{\\nu}_e",
        description: "يحدث في الأنوية التي لديها فائض من النيوترونات. يتحول نيوترون إلى بروتون، ويتم إطلاق إلكترون (جسيم بيتا) وضديد نيوترينو. يبقى العدد الكتلي ثابتًا ويزداد العدد الذري بمقدار 1."
    },
    {
        title: "اضمحلال بيتا الموجبة (β⁺)",
        formula: "^A_Z X \\rightarrow ^A_{Z-1} Y + ^0_{+1} e + \\nu_e",
        description: "يحدث في الأنوية التي لديها فائض من البروتونات. يتحول بروتون إلى نيوترون، ويتم إطلاق بوزيترون (جسيم بيتا موجب) ونيوترينو. يبقى العدد الكتلي ثابتًا ويقل العدد الذري بمقدار 1."
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
          <AlertTitle className="font-bold">حفظ العدد الكتلي والذري</AlertTitle>
          <AlertDescription>
           في جميع التفاعلات والاضمحلالات النووية، يجب أن يكون مجموع الأعداد الكتلية ومجموع الأعداد الذرية (الشحنات) متساويًا على طرفي المعادلة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
