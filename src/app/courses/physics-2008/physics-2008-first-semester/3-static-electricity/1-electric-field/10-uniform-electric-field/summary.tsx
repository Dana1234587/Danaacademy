
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "المجال الكهربائي المنتظم بين صفيحتين",
        formula: "E = \\frac{\\sigma}{\\epsilon_0}",
        description: "مقدار المجال الكهربائي (E) بين صفيحتين موصلتين متوازيتين لا نهائيتين، مشحونتين بشحنتين متساويتين في المقدار ومتعاكستين في النوع، يساوي الكثافة السطحية للشحنة (σ) على أي من الصفيحتين مقسومة على السماحية الكهربائية للفراغ (ε₀)."
    },
    {
        title: "خصائص المجال الكهربائي المنتظم",
        description: "• **ثابت المقدار:** قيمة المجال هي نفسها عند جميع النقاط بين الصفيحتين (بعيدًا عن الحواف).\n• **ثابت الاتجاه:** اتجاه المجال هو نفسه عند جميع النقاط، ويكون عموديًا على الصفيحتين، من الصفيحة الموجبة إلى الصفيحة السالبة.\n• **خطوط متوازية:** تُمثَّل خطوط المجال بخطوط مستقيمة متوازية والمسافات بينها متساوية."
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
           لاحظ أن قانون المجال الكهربائي المنتظم بين صفيحتين لا يعتمد على المسافة من الصفيحتين، على عكس المجال الكهربائي لشحنة نقطية أو كرة الذي يضعف مع مربع المسافة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
