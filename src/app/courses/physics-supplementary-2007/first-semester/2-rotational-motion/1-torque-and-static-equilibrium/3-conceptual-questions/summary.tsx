
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "العزم المحصل ($\\Sigma\\tau$)",
        formula: "\\Sigma\\tau = \\tau_1 + \\tau_2 + \\dots",
        description: "العزم المحصل حول محور معين هو المجموع الجبري (مع مراعاة الإشارة) لجميع العزوم المؤثرة على الجسم حول نفس المحور."
    },
    {
        title: "اصطلاح الإشارات",
        formula: "",
        description: "بشكل عام، يعتبر العزم الذي يسبب دورانًا عكس اتجاه عقارب الساعة موجبًا (+)، والعزم الذي يسبب دورانًا مع اتجاه عقارب الساعة سالبًا (-)."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           1. حدد محور الدوران. <br/>
           2. حدد جميع القوى المؤثرة. <br/>
           3. احسب عزم كل قوة على حدة (المقدار والإشارة). <br/>
           4. اجمع العزوم جبريًا لإيجاد العزم المحصل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
