
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "التدفق عبر سطح مغلق (قانون غاوس)",
        formula: "\\Phi_{total} = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{enc}}{\\epsilon_0}",
        description: "التدفق الكهربائي الكلي عبر أي سطح مغلق يساوي مجموع الشحنات الكهربائية المحصورة داخل السطح ($Q_{enc}$) مقسومًا على سماحية الفراغ الكهربائية ($\\epsilon_0$)."
    },
    {
        title: "حالة خاصة: لا توجد شحنة محصورة",
        formula: "\\Phi_{total} = 0",
        description: "إذا لم تكن هناك شحنات محصورة داخل السطح المغلق ($Q_{enc}=0$), فإن التدفق الكهربائي الكلي عبر السطح يساوي صفرًا. هذا يعني أن عدد خطوط المجال التي تدخل السطح تساوي عدد الخطوط التي تخرج منه."
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
           لحساب التدفق عبر وجه واحد من سطح مغلق، يمكننا استخدام حقيقة أن التدفق الكلي صفر. 
           $\\Phi_{total} = \\Phi_{face1} + \\Phi_{face2} + ... = 0$. 
           إذا تمكنا من حساب التدفق عبر جميع الأوجه الأخرى (لأنها قد تكون صفرًا أو سهلة الحساب)، يمكننا بسهولة إيجاد تدفق الوجه المجهول.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
