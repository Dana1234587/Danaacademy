
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون غاوس",
        formula: "\\Phi_{total} = \\frac{Q_{enc}}{\\epsilon_0}",
        description: "ينص على أن التدفق الكهربائي الكلي عبر أي سطح مغلق (سطح غاوس) يساوي مجموع الشحنات الكهربائية (Q_enc) المحصورة داخل ذلك السطح، مقسومًا على السماحية الكهربائية للفراغ (ε₀)."
    },
    {
        title: "إشارة التدفق الكلي",
        description: "• **تدفق موجب (Φ > 0):** يعني أن صافي الشحنة المحصورة موجب (Q_enc > 0). عدد خطوط المجال الخارجة من السطح أكبر من الداخلة.\n• **تدفق سالب (Φ < 0):** يعني أن صافي الشحنة المحصورة سالب (Q_enc < 0). عدد خطوط المجال الداخلة إلى السطح أكبر من الخارجة."
    },
    {
        title: "التدفق الصفري",
        formula: "\\Phi_{total} = 0",
        description: "يحدث التدفق الكلي الصفري في حالتين:\n1. إذا كان السطح المغلق لا يحتوي على أي شحنات بداخله (Q_enc = 0).\n2. إذا كان المجموع الجبري للشحنات داخل السطح المغلق يساوي صفرًا."
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
                    {law.description.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           قانون غاوس لا يعتمد على شكل السطح المغلق أو حجمه، ولا على موقع الشحنات بداخله، بل يعتمد فقط على المجموع الجبري للشحنات المحصورة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
