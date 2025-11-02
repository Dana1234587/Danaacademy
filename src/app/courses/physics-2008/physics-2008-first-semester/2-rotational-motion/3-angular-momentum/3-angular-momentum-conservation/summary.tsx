
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "مبدأ حفظ الزخم الزاوي",
        formula: "\\text{If } \\Sigma \\vec{\\tau}_{ext} = 0, \\text{ then } \\vec{L}_{initial} = \\vec{L}_{final}",
        description: "إذا كانت محصلة العزوم الخارجية المؤثرة على نظام تساوي صفرًا، فإن الزخم الزاوي الكلي للنظام يبقى ثابتًا (محفوظًا)."
    },
    {
        title: "تطبيق على الأنظمة المتغيرة",
        formula: "I_i \\omega_i = I_f \\omega_f",
        description: "هذه هي الصيغة العملية لحفظ الزخم الزاوي. إذا تغير عزم القصور الذاتي للنظام (بسبب تغير توزيع الكتلة)، فيجب أن تتغير السرعة الزاوية بشكل عكسي للحفاظ على الزخم الزاوي ثابتًا."
    }
];

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
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
          <AlertTitle className="font-bold">حفظ الطاقة مقابل حفظ الزخم الزاوي</AlertTitle>
          <AlertDescription>
            <SmartTextRenderer as="div" text={'في الأنظمة التي يتم فيها حفظ الزخم الزاوي (مثل المتزلج الذي يضم ذراعيه)، لا تكون الطاقة الحركية الدورانية محفوظة بالضرورة. في الواقع، هي تزداد لأن $K = L^2 / (2I)$، وعندما يقل $I$، تزداد $K$.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
