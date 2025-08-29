
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "عزم القصور الذاتي",
        formula: "I = \\sum m_i r_i^2",
        description: "القانون الأساسي لحساب عزم القصور الذاتي لنظام من الجسيمات النقطية. تذكر أنه كمية قياسية."
    },
    {
        title: "نظرية المحور الموازي",
        formula: "I = I_{cm} + Md^2",
        description: "أداة قوية جدًا لحساب عزم القصور الذاتي حول أي محور إذا كنت تعرف قيمته حول محور موازٍ يمر بمركز الكتلة."
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
          <AlertTitle className="font-bold">حفظ القوانين</AlertTitle>
          <AlertDescription>
           ليس عليك حفظ قوانين عزم القصور الذاتي لجميع الأشكال (مثل القرص، الحلقة، القضيب)، فهي تعطى عادة في ورقة الامتحان. لكن عليك معرفة كيفية استخدامها وتطبيق نظرية المحور الموازي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
