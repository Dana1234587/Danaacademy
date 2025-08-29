
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الزخم الزاوي لجسيم نقطي",
        formula: "\\vec{L} = \\vec{r} \\times \\vec{p}",
        description: "الزخم الزاوي (L) لجسيم نقطي هو حاصل الضرب المتجهي لمتجه الموضع (r) في متجه الزخم الخطي (p). مقداره هو $L = rp\\sin\\theta = mvr\\sin\\theta$."
    },
    {
        title: "الزخم الزاوي لجسم جاسئ",
        formula: "\\vec{L} = I \\vec{\\omega}",
        description: "لجسم جاسئ يدور حول محور ثابت، يُحسب الزخم الزاوي بضرب عزم قصوره الذاتي (I) حول ذلك المحور في سرعته الزاوية (ω). هذا هو القانون الأكثر استخدامًا في مسائل الأجسام الدوارة."
    },
    {
        title: "قانون نيوتن الثاني بدلالة الزخم الزاوي",
        formula: "\\Sigma \\vec{\\tau} = \\frac{d\\vec{L}}{dt}",
        description: "ينص على أن محصلة العزوم الخارجية المؤثرة على جسم تساوي المعدل الزمني للتغير في زخمه الزاوي. هذه هي الصيغة الأشمل لديناميكا الحركة الدورانية."
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
          <AlertTitle className="font-bold">تشابه المفاهيم</AlertTitle>
          <AlertDescription>
           لاحظ كيف أن الزخم الزاوي (L) يماثل الزخم الخطي (p)، والسرعة الزاوية (ω) تماثل السرعة الخطية (v)، وعزم القصور الذاتي (I) يماثل الكتلة (m).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
