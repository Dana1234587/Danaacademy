
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "طاقة الفوتون المنبعث أو الممتص",
        formula: "E_{photon} = |E_{final} - E_{initial}| = hf",
        description: "طاقة الفوتون تساوي تمامًا فرق الطاقة بين المستويين اللذين انتقل بينهما الإلكترون. حيث h هو ثابت بلانك و f هو تردد الفوتون."
    },
    {
        title: "متسلسلات طيف الهيدروجين",
        formula: "\\frac{1}{\\lambda} = R_H (\\frac{1}{n_f^2} - \\frac{1}{n_i^2})",
        description: "صيغة ريدبرغ لحساب مقلوب الطول الموجي للفوتونات. $R_H$ هو ثابت ريدبرغ، $n_f$ هو رقم المستوى النهائي و $n_i$ هو رقم المستوى الابتدائي."
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
          <AlertTitle className="font-bold">المتسلسلات الرئيسية</AlertTitle>
          <AlertDescription>
           - **ليمان ($n_f=1$):** انتقالات إلى المستوى الأرضي (فوق بنفسجية).<br/>
           - **بالمر ($n_f=2$):** انتقالات إلى المستوى الثاني (ضوء مرئي).<br/>
           - **باشن ($n_f=3$):** انتقالات إلى المستوى الثالث (تحت حمراء).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
