
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التدفق المغناطيسي ($\\Phi_B$)",
        formula: "\\Phi_B = B A \\cos(\\theta)",
        description: "التدفق المغناطيسي هو مقياس لعدد خطوط المجال المغناطيسي التي تعبر سطحًا. حيث (B) شدة المجال، (A) مساحة السطح، و ($\\theta$) هي الزاوية بين متجه المجال المغناطيسي ومتجه المساحة (العمودي على السطح)."
    },
    {
        title: "وحدة القياس",
        formula: "1 \\text{ وبر (Wb)} = 1 \\text{ تسلا} \\cdot \\text{متر}^2",
        description: "وحدة التدفق المغناطيسي هي الويبر (Wb)."
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
