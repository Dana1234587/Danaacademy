
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "التفاعل النووي الصناعي",
        description: "هو عملية يتم فيها قذف نواة مستقرة بجسيم (مثل بروتون، نيوترون، أو جسيم ألفا) لتحويلها إلى نواة أخرى، والتي قد تكون غير مستقرة (مشعة)."
    },
    {
        title: "الانشطار النووي (Fission)",
        description: "هو تفاعل تنقسم فيه نواة ثقيلة (مثل اليورانيوم-235) عند قذفها بنيوترون بطيء إلى نواتين أخف (شظايا انشطار)، مع إطلاق عدد من النيوترونات وطاقة هائلة. هذه النيوترونات يمكن أن تسبب انشطار أنوية أخرى، مما يؤدي إلى تفاعل متسلسل."
    },
    {
        title: "الاندماج النووي (Fusion)",
        description: "هو تفاعل تتحد فيه نواتان خفيفتان (مثل نظائر الهيدروجين) لتكوين نواة أثقل، مع إطلاق كمية هائلة من الطاقة. هذه هي العملية التي تحدث في الشمس والنجوم."
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
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">حفظ الطاقة والكتلة</AlertTitle>
          <AlertDescription>
           في جميع التفاعلات النووية، تكون الكتلة والطاقة محفوظتين بشكل متبادل. النقص في الكتلة بين المتفاعلات والنواتج يتحول إلى طاقة محررة وفقًا لمعادلة أينشتاين $E = \\Delta m c^2$.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
