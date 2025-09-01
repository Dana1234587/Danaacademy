
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
        title: "الاشتقاق من قانون نيوتن الثالث",
        formula: "\\vec{F}_{12} = -\\vec{F}_{21} \\implies \\Delta \\vec{p}_1 = -\\Delta \\vec{p}_2",
        description: "القوة التي يؤثر بها الجسم الأول على الثاني تساوي وتعاكس القوة التي يؤثر بها الثاني على الأول. وبما أن زمن التأثير متساوٍ، فإن الدفع المتبادل متساوٍ ومتعاكس، وبالتالي يكون التغير في زخم الجسم الأول مساويًا في المقدار ومعاكسًا في الاتجاه للتغير في زخم الجسم الثاني."
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
