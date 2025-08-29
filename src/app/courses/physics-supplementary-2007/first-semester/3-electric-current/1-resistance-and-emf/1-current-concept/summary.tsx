
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التيار الكهربائي (I)",
        formula: "I = \\frac{\\Delta q}{\\Delta t}",
        description: "التيار هو المعدل الزمني لتدفق الشحنة الكهربائية عبر مقطع عرضي لموصل. يُقاس بوحدة الأمبير (A)، والتي تكافئ كولوم/ثانية."
    },
    {
        title: "اتجاه التيار",
        formula: "",
        description: "التيار الفعلي هو اتجاه حركة الإلكترونات (من القطب السالب إلى الموجب). التيار الاصطلاحي، المستخدم في تحليل الدارات، هو اتجاه حركة الشحنات الموجبة الافتراضية (من القطب الموجب إلى السالب)."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           في جميع تحليلات الدارات الكهربائية، نستخدم دائمًا اتجاه التيار الاصطلاحي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
