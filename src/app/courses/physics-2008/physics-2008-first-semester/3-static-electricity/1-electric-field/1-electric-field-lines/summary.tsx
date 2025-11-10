
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const concepts = [
    {
        title: "خصائص خطوط المجال الكهربائي",
        items: [
            "تخرج من الشحنة الموجبة وتدخل في الشحنة السالبة.",
            "لا تتقاطع أبدًا.",
            "تدل كثافتها على شدة المجال (تكون متقاربة حيث المجال قوي ومتباعدة حيث المجال ضعيف).",
            "اتجاه المماس لخط المجال عند أي نقطة يمثل اتجاه المجال الكهربائي عند تلك النقطة.",
        ]
    },
    {
        title: "شحنة الاختبار",
        description: "هي شحنة نقطية موجبة وصغيرة جدًا، تُستخدم نظريًا لتحديد اتجاه وشدة المجال الكهربائي عند نقطة ما دون أن تؤثر بشكل كبير على المجال الأصلي."
    },
    {
        title: "المجال الكهربائي المنتظم وغير المنتظم",
        description: "• **المجال المنتظم:** هو مجال ثابت في المقدار والاتجاه عند جميع النقاط. خطوطه تكون مستقيمة، متوازية، والمسافات بينها متساوية. يمكن الحصول عليه بين صفيحتين موصلتين متوازيتين مشحونتين بشحنتين متساويتين في المقدار ومختلفتين في النوع.\n• **المجال غير المنتظم:** هو مجال يتغير مقداره أو اتجاهه (أو كلاهما) من نقطة لأخرى. ينشأ عادة عن الشحنات النقطية أو الكرات المشحونة."
    }
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {concepts.map((concept, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-right">
                    {concept.description ? (
                        concept.description.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)
                    ) : (
                        <ul className="list-disc list-inside space-y-2">
                            {concept.items?.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                        </ul>
                    )}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           اتجاه القوة الكهربائية المؤثرة على شحنة اختبار موجبة يكون دائمًا بنفس اتجاه المجال الكهربائي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
