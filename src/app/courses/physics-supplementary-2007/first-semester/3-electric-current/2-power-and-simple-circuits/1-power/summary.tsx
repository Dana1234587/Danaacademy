
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القدرة المستهلكة في مقاومة (P_R)",
        formula: "P = IV = I^2R = \\frac{V^2}{R}",
        description: "هي معدل تحول الطاقة الكهربائية إلى طاقة حرارية في المقاومة. يمكن استخدام أي من الصيغ الثلاث حسب المعطيات."
    },
    {
        title: "القدرة المنتجة في بطارية (P_prod)",
        formula: "P_{prod} = \\varepsilon I",
        description: "هي المعدل الذي تحول به البطارية الطاقة الكيميائية إلى طاقة كهربائية. تمثل القدرة الكلية التي تنتجها البطارية."
    },
    {
        title: "القدرة المستهلكة في بطارية (P_int)",
        formula: "P_{int} = I^2r",
        description: "هي القدرة التي تُفقد على شكل حرارة داخل البطارية بسبب مقاومتها الداخلية (r)."
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
          <AlertTitle className="font-bold">حفظ الطاقة</AlertTitle>
          <AlertDescription>
            في أي دارة كهربائية، القدرة الكلية المنتجة تساوي القدرة الكلية المستهلكة.
            <div dir="ltr" className="text-center mt-2 font-mono text-sm">
                <BlockMath math={"\\Sigma P_{produced} = \\Sigma P_{consumed}"} />
            </div>
             <div dir="ltr" className="text-center mt-1 font-mono text-sm">
                <BlockMath math={"\\varepsilon I = I^2R_{ext} + I^2r_{int}"} />
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
