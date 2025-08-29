
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المعاوقة (Z)",
        formula: "Z = \\sqrt{R^2 + (X_L - X_C)^2}",
        description: "هي الممانعة الكلية التي يواجهها التيار المتردد في دارة RLC. وهي المجموع المتجهي للمقاومة والمفاعلة الكلية ($X_L - X_C$). وحدتها هي الأوم ($\\Omega$)."
    },
    {
        title: "قانون أوم في دارات AC",
        formula: "V = IZ",
        description: "يمكن استخدام قانون أوم بنفس الشكل في دارات التيار المتردد، ولكن باستخدام المعاوقة (Z) بدلاً من المقاومة (R). يمكن تطبيق القانون على القيم العظمى أو القيم الفعالة."
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
          <AlertTitle className="font-bold">مخطط المعاوقة</AlertTitle>
          <AlertDescription>
           يمكن تمثيل المعاوقة كمثلث قائم الزاوية، حيث يكون الضلع الأفقي هو المقاومة (R)، والضلع الرأسي هو المفاعلة الكلية ($X_L - X_C$)، والوتر هو المعاوقة (Z).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
