
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
    };
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const laws = [
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
              <CardTitle className="text-primary text-xl text-right"><SmartTextRenderer as="div" text={law.title} /></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'لحساب التدفق عبر وجه واحد من سطح مغلق، نستخدم حقيقة أن التدفق الكلي صفر:\n$\\Phi_{total} = \\Phi_{face1} + \\Phi_{face2} + ... = 0$\n\nإذا تمكنا من حساب التدفق عبر جميع الأوجه الأخرى (لأنها قد تكون صفرًا أو سهلة الحساب)، يمكننا بسهولة إيجاد تدفق الوجه المجهول.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
