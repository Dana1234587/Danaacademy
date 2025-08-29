
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "عزم القصور الذاتي لنظام من الجسيمات",
        formula: "I = \\sum m_i r_i^2 = m_1 r_1^2 + m_2 r_2^2 + \\dots",
        description: "عزم القصور الذاتي لنظام هو المجموع الجبري لعزوم القصور الذاتي لكل جسيم في النظام. وهو كمية قياسية."
    },
    {
        title: "نظرية المحور الموازي",
        formula: "I = I_{cm} + Md^2",
        description: "تُستخدم هذه النظرية لحساب عزم القصور الذاتي (I) حول أي محور، إذا كان عزم القصور الذاتي حول محور موازٍ له ويمر بمركز الكتلة ($I_{cm}$) معروفًا. حيث M هي كتلة الجسم و d هي المسافة العمودية بين المحورين."
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
           عزم القصور الذاتي يعتمد بشكل كبير على توزيع الكتلة. كلما ابتعدت الكتلة عن محور الدوران، زادت قيمة عزم القصور الذاتي بشكل كبير (لأنه يعتمد على $r^2$).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
