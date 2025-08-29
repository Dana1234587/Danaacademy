
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الطاقة الحركية الدورانية",
        formula: "K_{rot} = \\frac{1}{2} I \\omega^2",
        description: "هي طاقة الجسم الناتجة عن دورانه حول محور. لاحظ التشابه مع الطاقة الحركية الخطية ($K_{lin} = \\frac{1}{2}mv^2$)."
    },
    {
        title: "الطاقة الحركية الكلية لجسم متدحرج",
        formula: "K_{total} = K_{lin} + K_{rot} = \\frac{1}{2}mv_{cm}^2 + \\frac{1}{2}I_{cm}\\omega^2",
        description: "عندما يتدحرج جسم دون انزلاق، فإنه يمتلك طاقة حركية انتقالية لمركز كتلته وطاقة حركية دورانية حول مركز كتلته."
    },
    {
        title: "حفظ الطاقة الميكانيكية",
        formula: "\\Delta K + \\Delta U = 0",
        description: "في غياب القوى غير المحافظة (مثل الاحتكاك)، تكون الطاقة الميكانيكية الكلية (الحركية + الكامنة) للنظام محفوظة. هذا المبدأ مهم جدًا في مسائل الأجسام التي تتدحرج على المنحدرات."
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
          <AlertTitle className="font-bold">التدحرج بدون انزلاق</AlertTitle>
          <AlertDescription>
           الشرط الأساسي للتدحرج بدون انزلاق هو وجود علاقة بين السرعة الخطية والسرعة الزاوية: $v_{cm} = R\\omega$.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
