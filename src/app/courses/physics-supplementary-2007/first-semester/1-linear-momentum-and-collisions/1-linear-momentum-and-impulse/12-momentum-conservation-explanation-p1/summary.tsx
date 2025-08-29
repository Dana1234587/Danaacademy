
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
        title: "مبدأ حفظ الزخم الخطي",
        formula: "\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final}",
        description: "إذا كانت محصلة القوى الخارجية المؤثرة على نظام تساوي صفرًا (نظام معزول)، فإن الزخم الخطي الكلي للنظام يبقى ثابتًا."
    },
    {
        title: "النظام المعزول",
        formula: "\\Sigma \\vec{F}_{ext} = 0",
        description: "هو نظام تكون فيه القوى الداخلية (مثل قوى التصادم) أكبر بكثير من القوى الخارجية (مثل الاحتكاك)، أو أن محصلة القوى الخارجية تساوي صفرًا. في هذه الحالة فقط يمكن تطبيق قانون حفظ الزخم."
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
          <AlertTitle className="font-bold">تطبيق على التصادمات</AlertTitle>
          <AlertDescription>
           قانون حفظ الزخم هو الأداة الأساسية لتحليل جميع أنواع التصادمات والانفجارات في الأنظمة المعزولة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
