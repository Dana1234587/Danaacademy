
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الجهد المتردد اللحظي",
        formula: "v(t) = V_{max} \\sin(\\omega t)",
        description: "يصف قيمة الجهد عند أي لحظة زمنية. $V_{max}$ هي القيمة العظمى للجهد و $\\omega$ هو التردد الزاوي."
    },
    {
        title: "القيمة الفعالة للجهد (RMS)",
        formula: "V_{rms} = \\frac{V_{max}}{\\sqrt{2}}",
        description: "هي قيمة الجهد المستمر الذي يعطي نفس القدرة الحرارية في مقاومة معينة. وهي القيمة التي تقيسها أجهزة الفولتميتر عادة."
    },
    {
        title: "القيمة الفعالة للتيار (RMS)",
        formula: "I_{rms} = \\frac{I_{max}}{\\sqrt{2}}",
        description: "هي قيمة التيار المستمر الذي يعطي نفس القدرة الحرارية. وهي القيمة التي تقيسها أجهزة الأميتر عادة."
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
            عند التعامل مع دارات التيار المتردد، إذا لم يتم تحديد نوع القيمة (عظمى أم فعالة)، فإن القيمة المعطاة للجهد أو التيار تعتبر دائمًا القيمة الفعالة (RMS).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
