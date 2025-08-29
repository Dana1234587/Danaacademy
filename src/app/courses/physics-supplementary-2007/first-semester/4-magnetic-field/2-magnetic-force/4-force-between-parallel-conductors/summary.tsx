
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "القوة لوحدة الأطوال بين سلكين",
        formula: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi r}",
        description: "تحسب هذه العلاقة مقدار القوة المؤثرة على كل وحدة طول من أحد السلكين بسبب المجال المغناطيسي للسلك الآخر. (r) هي المسافة بين السلكين."
    },
    {
        title: "نوع القوة المتبادلة",
        formula: "",
        description: "1. **تياران بنفس الاتجاه:** قوة تجاذب (السلكان يقتربان من بعضهما).\n2. **تياران متعاكسان:** قوة تنافر (السلكان يبتعدان عن بعضهما)."
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
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                <CardDescription className="text-right">
                    {law.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">قانون نيوتن الثالث</AlertTitle>
          <AlertDescription>
           القوة التي يؤثر بها السلك الأول على الثاني تساوي في المقدار وتعاكس في الاتجاه القوة التي يؤثر بها السلك الثاني على الأول، تطبيقًا مباشرًا لقانون نيوتن الثالث (الفعل ورد الفعل).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
