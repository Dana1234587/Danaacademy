
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "حالة الرنين",
        formula: "X_L = X_C",
        description: "تحدث حالة الرنين الكهربائي في دارة RLC عندما تتساوى المفاعلة الحثية مع المفاعلة المواسعية."
    },
    {
        title: "تردد الرنين (f₀)",
        formula: "f_0 = \\frac{1}{2\\pi\\sqrt{LC}}",
        description: "هو التردد المحدد الذي تحدث عنده حالة الرنين. يعتمد فقط على محاثة المحث ومواسعة المواسع."
    },
    {
        title: "خصائص الدارة عند الرنين",
        formula: "Z = R \\quad , \\quad I = I_{max} \\quad , \\quad \\phi = 0",
        description: "عند الرنين، تكون المعاوقة (Z) في أدنى قيمة لها وتساوي المقاومة (R)، والتيار (I) يكون في أعلى قيمة له، وزاوية الطور (φ) تساوي صفرًا، أي أن الدارة تتصرف كدارة مقاومة صرفة."
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
          <AlertTitle className="font-bold">تطبيقات الرنين</AlertTitle>
          <AlertDescription>
           تُستخدم ظاهرة الرنين بشكل أساسي في دارات الموالفة (Tuning circuits) في أجهزة الراديو والتلفاز لاختيار تردد محطة معينة وتجاهل جميع الترددات الأخرى.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
