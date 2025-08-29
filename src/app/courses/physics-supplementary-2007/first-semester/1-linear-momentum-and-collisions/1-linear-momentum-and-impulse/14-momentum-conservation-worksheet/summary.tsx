
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} className="inline-block mx-1"><InlineMath math={part} /></span>;
    };
    return (
        <Wrapper className="leading-relaxed">
            {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block my-1 text-right">
                    {line.split('$').map(renderPart)}
                </span>
            ))}
        </Wrapper>
    );
};


const laws = [
    {
        title: "حفظ الزخم الخطي",
        formula: "\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final}",
        description: "القانون الأساسي لحل جميع المسائل. الزخم الكلي قبل الحدث (تصادم أو انفجار) يساوي الزخم الكلي بعده."
    },
    {
        title: "الطاقة الحركية المفقودة",
        formula: "\\Delta K = K_{final} - K_{initial}",
        description: "تستخدم لحساب مقدار الطاقة الحركية التي تحولت إلى أشكال أخرى في التصادمات غير المرنة. تكون قيمة $\\Delta K$ سالبة، وتشير إلى الفقدان."
    },
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
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           1. حدد النظام.<br/>
           2. اكتب قانون حفظ الزخم.<br/>
           3. عوض بالقيم مع الانتباه الشديد للإشارات (الاتجاهات).<br/>
           4. حل لإيجاد المجهول.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
