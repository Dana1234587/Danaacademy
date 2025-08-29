
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "تحليل المتجهات",
        formula: "\\vec{F} = F_x \\hat{i} + F_y \\hat{j}",
        description: "يمكن تحليل أي متجه إلى مركبتين متعامدتين. المركبة الأفقية $F_x = F \\cos(\\theta)$ والمركبة الرأسية $F_y = F \\sin(\\theta)$."
    },
    {
        title: "الضرب القياسي (النقطي)",
        formula: "\\vec{A} \\cdot \\vec{B} = |A| |B| \\cos(\\theta)",
        description: "يُستخدم لإيجاد مركبة متجه في اتجاه متجه آخر، ونتيجته كمية قياسية. مثال على ذلك هو الشغل."
    },
    {
        title: "الضرب المتجهي (التقاطعي)",
        formula: "|\\vec{A} \\times \\vec{B}| = |A| |B| \\sin(\\theta)",
        description: "نتيجته متجه جديد عمودي على المستوى الذي يجمع المتجهين، ويتم تحديد اتجاهه بقاعدة اليد اليمنى. مثال على ذلك هو العزم."
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
           تعتبر هذه المفاهيم الرياضية أساسية لفهم جميع جوانب الحركة الدورانية، خاصة العزم والزخم الزاوي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
