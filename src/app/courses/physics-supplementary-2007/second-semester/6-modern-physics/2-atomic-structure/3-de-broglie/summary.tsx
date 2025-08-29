
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "فرضية دي بروي",
        formula: "\\lambda = \\frac{h}{p} = \\frac{h}{mv}",
        description: "افترض دي بروي أن جميع الجسيمات المادية لها خصائص موجية. الطول الموجي (λ) المصاحب لجسيم يساوي ثابت بلانك (h) مقسومًا على زخم الجسيم الخطي (p)."
    },
    {
        title: "تفسير مدارات بور",
        formula: "2\\pi r_n = n\\lambda",
        description: "فسرت فرضية دي بروي شرط تكمية المدارات لبور. المدارات المستقرة هي تلك التي يكون محيطها مساويًا لعدد صحيح (n) من أطوال موجة دي بروي المصاحبة للإلكترون، مما يؤدي إلى تكوين موجة موقوفة مستقرة."
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
          <AlertTitle className="font-bold">الطبيعة المزدوجة</AlertTitle>
          <AlertDescription>
           فرضية دي بروي عززت مفهوم الطبيعة المزدوجة (جسيم-موجة) ليس فقط للضوء، بل للمادة أيضًا. كل شيء في الكون له خصائص جسيمية وموجية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
