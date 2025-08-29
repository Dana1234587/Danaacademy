
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "مكونات النواة",
        description: "• العدد الذري (Z) = عدد البروتونات.\n• العدد الكتلي (A) = عدد البروتونات + عدد النيوترونات.\n• عدد النيوترونات (N) = A - Z."
    },
    {
        title: "خصائص النواة",
        description: "• نصف القطر: $r = r_0 A^{1/3}$.\n• الحجم: $V \\propto A$.\n• الكثافة: $\\rho \\approx$ ثابتة."
    },
    {
        title: "استقرار النواة",
        description: "• يعتمد على القوة النووية القوية وطاقة الربط لكل نيوكليون.\n• الأنوية غير المستقرة تقع خارج نطاق الاستقرار."
    },
    {
        title: "طاقة الربط",
        description: "• $B.E. = \\Delta m \\cdot c^2$ حيث $\\Delta m$ هو فرق الكتلة."
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
                    {law.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           عند حل مسائل هذا الدرس، تأكد من التفريق بين العدد الذري والكتلي، وفهم كيفية استخدام القوانين لحساب نصف القطر وفرق الكتلة وطاقة الربط. تذكر أن طاقة الربط الأعلى لكل نيوكليون تعني نواة أكثر استقرارًا.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
