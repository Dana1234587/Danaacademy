
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التدفق الكهربائي ($\\Phi_E$)",
        formula: "\\Phi_E = E A \\cos(\\theta)",
        description: "التدفق الكهربائي هو مقياس لعدد خطوط المجال الكهربائي التي تعبر سطحًا. حيث (E) شدة المجال، (A) مساحة السطح، و ($\\theta$) هي الزاوية بين متجه المجال الكهربائي ومتجه المساحة (العمودي على السطح)."
    },
    {
        title: "وحدة القياس",
        formula: "1 \\text{ N} \\cdot \\text{m}^2 / C = 1 \\text{ V} \\cdot \\text{m}",
        description: "وحدة التدفق الكهربائي هي نيوتن.متر مربع لكل كولوم، وهي تكافئ فولت.متر."
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
          <AlertTitle className="font-bold">ملاحظة على الزاوية ($\\theta$)</AlertTitle>
          <AlertDescription>
           انتبه جيدًا! الزاوية $\\theta$ في القانون هي دائمًا بين متجه المجال ومتجه المساحة (العمودي على السطح)، وليست الزاوية بين المجال ومستوى السطح نفسه.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
