
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "حفظ الزخم في بعدين",
        formula: "\\Sigma p_{ix} = \\Sigma p_{fx} \\quad , \\quad \\Sigma p_{iy} = \\Sigma p_{fy}",
        description: "يتم تطبيق قانون حفظ الزخم بشكل مستقل على كل محور (المحور السيني والمحور الصادي). الزخم كمية متجهة، لذا يجب تحليله إلى مركباته عند التعامل مع التصادمات في بعدين."
    },
    {
        title: "التصادمات ومبادئ الحفظ الأخرى",
        formula: "",
        description: "غالبًا ما تتطلب المسائل المعقدة ربط مبدأ حفظ الزخم بمبادئ أخرى، مثل حفظ الطاقة الميكانيكية (في حركة المقذوفات أو البندول قبل أو بعد التصادم) أو قوانين الحركة لتحليل حركة الجسم."
    },
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
               {law.formula && (
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                )}
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مفتاح الحل</AlertTitle>
          <AlertDescription>
           في المسائل المعقدة، قم بتقسيم المشكلة إلى مراحل. على سبيل المثال: مرحلة ما قبل التصادم (قد تنطوي على سقوط حر)، مرحلة التصادم (طبق حفظ الزخم)، ومرحلة ما بعد التصادم (قد تنطوي على حركة مقذوف).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
