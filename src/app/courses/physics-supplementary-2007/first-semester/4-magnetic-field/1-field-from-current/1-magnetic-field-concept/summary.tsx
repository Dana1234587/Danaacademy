
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال المغناطيسي (B)",
        formula: "",
        description: "هو منطقة محيطة بالمغناطيس أو الموصل الذي يمر به تيار، تظهر فيها آثار قوة مغناطيسية. وهو كمية متجهة تقاس بوحدة تسلا (T)."
    },
    {
        title: "خصائص خطوط المجال المغناطيسي",
        formula: "",
        description: "1. وهمية ومغلقة (لا بداية ولا نهاية لها).\n2. لا تتقاطع أبدًا.\n3. اتجاهها عند أي نقطة هو اتجاه المماس للمسار عند تلك النقطة.\n4. تدل كثافتها على شدة المجال."
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
                   {law.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           المصدر الأساسي للمجال المغناطيسي هو الشحنات الكهربائية المتحركة (التيار الكهربائي). هذا هو المبدأ الذي سنبني عليه كل هذه الوحدة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
