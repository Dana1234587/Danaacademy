
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "تكمية الزخم الزاوي",
        formula: "L_n = mvr = n \\frac{h}{2\\pi}",
        description: "فرضية بور الأساسية: الزخم الزاوي للإلكترون في مداره مكمى، أي أنه يأخذ قيمًا محددة من مضاعفات h/2π. حيث n هو عدد الكم الرئيسي (1, 2, 3, ...)."
    },
    {
        title: "نصف قطر مدار بور",
        formula: "r_n = n^2 r_1",
        description: "أنصاف أقطار المدارات المسموحة مكمّاة وتتناسب مع مربع عدد الكم الرئيسي (n²). $r_1$ هو نصف قطر بور للمدار الأول ويساوي تقريبًا $0.529 \\times 10^{-10}$ متر."
    },
    {
        title: "طاقة المستوى في ذرة الهيدروجين",
        formula: "E_n = -\\frac{13.6}{n^2} \\text{ eV}",
        description: "طاقة الإلكترون في كل مستوى مكمّاة وتتناسب عكسيًا مع مربع عدد الكم الرئيسي (n²). الإشارة السالبة تعني أن الإلكترون مرتبط بالنواة."
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
           نموذج بور نجح بشكل كبير في تفسير طيف ذرة الهيدروجين، لكنه فشل في تفسير أطياف الذرات الأكثر تعقيدًا. ومع ذلك، تبقى فكرة تكمية الطاقة والمدارات أساسية في الفيزياء الحديثة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
