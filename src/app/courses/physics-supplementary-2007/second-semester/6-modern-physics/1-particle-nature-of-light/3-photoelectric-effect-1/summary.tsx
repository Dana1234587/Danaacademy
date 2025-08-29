
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "تفسير أينشتاين",
        description: "الضوء يتكون من كمّات من الطاقة تسمى الفوتونات. عند سقوط فوتون على فلز، فإنه يعطي طاقته الكاملة لإلكترون واحد فقط. إذا كانت هذه الطاقة كافية، يتحرر الإلكترون."
    },
    {
        title: "اقتران الشغل (φ)",
        formula: "\\phi = h f_0",
        description: "هو الحد الأدنى من الطاقة اللازمة لتحرير إلكترون من سطح الفلز. $f_0$ هو تردد العتبة، وهو أقل تردد للضوء يمكنه تحرير الإلكترونات."
    },
    {
        title: "شرط الانبعاث الكهروضوئي",
        formula: "E_{photon} \\ge \\phi \\quad \\text{or} \\quad hf \\ge hf_0",
        description: "لا يحدث الانبعاث الكهروضوئي إلا إذا كانت طاقة الفوتون الساقط أكبر من أو تساوي اقتران الشغل للفلز."
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
          <AlertTitle className="font-bold">الشدة مقابل الطاقة</AlertTitle>
          <AlertDescription>
           - **شدة الضوء** تحدد **عدد** الإلكترونات المتحررة (التيار).<br/>
           - **طاقة الفوتون (التردد)** تحدد **الطاقة الحركية** للإلكترونات المتحررة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
