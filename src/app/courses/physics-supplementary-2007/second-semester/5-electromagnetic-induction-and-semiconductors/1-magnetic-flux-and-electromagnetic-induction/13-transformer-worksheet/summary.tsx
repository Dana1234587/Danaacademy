
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "معادلة المحول (الجهد واللفات)",
        formula: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p}",
        description: "نسبة الجهد بين الملف الثانوي والابتدائي تساوي نسبة عدد اللفات بينهما."
    },
    {
        title: "معادلة المحول (التيار واللفات)",
        formula: "\\frac{I_s}{I_p} = \\frac{N_p}{N_s}",
        description: "للمحول المثالي، نسبة التيار بين الملف الثانوي والابتدائي هي مقلوب نسبة عدد اللفات."
    },
    {
        title: "حفظ القدرة (المحول المثالي)",
        formula: "P_p = P_s \\implies V_p I_p = V_s I_s",
        description: "في المحول المثالي، تكون القدرة الداخلة مساوية للقدرة الخارجة."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           1. حدد المعطيات: $V_p, V_s, I_p, I_s, N_p, N_s$. <br/>
           2. استخدم نسبة الجهد واللفات لإيجاد الجهد المجهول. <br/>
           3. استخدم قانون أوم في الدارة الثانوية ($I_s = V_s / R$) لحساب تيار الخرج. <br/>
           4. استخدم علاقة حفظ القدرة (أو نسبة التيارات) لإيجاد تيار الدخل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
