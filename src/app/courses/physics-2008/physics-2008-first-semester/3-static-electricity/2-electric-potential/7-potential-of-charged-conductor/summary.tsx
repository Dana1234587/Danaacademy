
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الجهد داخل وعلى سطح الموصل الكروي (r ≤ R)",
        formula: "V = k \\frac{q}{R}",
        description: "الجهد الكهربائي ثابت في جميع النقاط داخل الموصل الكروي وعلى سطحه، وقيمته تساوي الجهد على السطح. هذا لأن المجال الكهربائي في الداخل يساوي صفرًا."
    },
    {
        title: "الجهد خارج الموصل الكروي (r > R)",
        formula: "V = k \\frac{q}{r}",
        description: "خارج الموصل، يتصرف الجهد كما لو كان ناتجًا عن شحنة نقطية موضوعة في المركز. يقل الجهد كلما ابتعدنا عن السطح."
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
      </div>
    </div>
  );
}
