
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "مبدأ عمل المحول",
        description: "يعتمد على الحث المتبادل: تيار متردد في الملف الابتدائي يولد تدفقًا مغناطيسيًا متغيرًا، هذا التدفق ينتقل عبر القلب الحديدي ويخترق الملف الثانوي، مولدًا فيه قوة دافعة كهربائية حثية."
    },
    {
        title: "معادلة المحول المثالي",
        formula: "\\frac{V_s}{V_p} = \\frac{N_s}{N_p} = \\frac{I_p}{I_s}",
        description: "في المحول المثالي (كفاءة 100%)، تكون نسبة الجهود كنسبة عدد اللفات، ونسبة التيارات هي المقلوب."
    },
    {
        title: "كفاءة المحول (η)",
        formula: "\\eta = \\frac{P_{out}}{P_{in}} = \\frac{V_s I_s}{V_p I_p}",
        description: "هي النسبة بين القدرة الخارجة من الملف الثانوي والقدرة الداخلة إلى الملف الابتدائي، وعادة ما تكون أقل من 100% بسبب الفقد في الطاقة."
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
          <AlertTitle className="font-bold">أنواع المحولات</AlertTitle>
          <AlertDescription>
           - **محول رافع للجهد:** $N_s > N_p \implies V_s > V_p \implies I_s < I_p$. <br/>
           - **محول خافض للجهد:** $N_s < N_p \implies V_s < V_p \implies I_s > I_p$.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
