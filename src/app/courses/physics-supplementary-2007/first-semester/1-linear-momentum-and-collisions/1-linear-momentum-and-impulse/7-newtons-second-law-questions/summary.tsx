
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الصيغة العامة لقانون نيوتن الثاني",
        formula: "\\Sigma \\vec{F} = \\frac{\\Delta \\vec{p}}{\\Delta t}",
        description: "تذكر دائمًا أن هذه هي الصيغة الأشمل، وتستخدم خصوصًا عند تغير الكتلة."
    },
    {
        title: "حفظ الزخم",
        formula: "\\Sigma \\vec{p}_{before} = \\Sigma \\vec{p}_{after}",
        description: "في الأنظمة المعزولة (التي تكون فيها محصلة القوى الخارجية صفر)، يكون الزخم الكلي للنظام محفوظًا. هذا المبدأ أساسي في حل مسائل الانفجارات والإلقاء."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           عند حل أي سؤال، اسأل نفسك أولًا: هل الكتلة ثابتة أم متغيرة؟ هل النظام معزول؟ تحديد هذه النقاط يساعد في اختيار القانون الصحيح للبدء به.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
