
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
        title: "التغير في الزخم (الدفع)",
        formula: "\\Delta \\vec{p} = \\vec{p}_f - \\vec{p}_i = m(\\vec{v}_f - \\vec{v}_i)",
        description: "هو الفرق بين الزخم النهائي والابتدائي. وهو كمية متجهة تقاس بوحدة $kg \\cdot m/s$."
    },
    {
        title: "المعدل الزمني للتغير في الزخم (القوة)",
        formula: "\\Sigma \\vec{F} = \\frac{\\Delta \\vec{p}}{\\Delta t}",
        description: "هو القوة المحصلة المؤثرة على الجسم، وتقاس بوحدة نيوتن (N)."
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
          <AlertTitle className="font-bold">تطبيق مهم</AlertTitle>
          <AlertDescription>
            <SmartTextRenderer as="div" text={'لتقليل القوة المؤثرة أثناء التصادم (مثل الوسائد الهوائية)، يتم زيادة زمن التلامس $\\Delta t$. هذا لا يغير من مقدار التغير في الزخم $\\Delta p$، لكنه يقلل من القوة $F$ بشكل كبير.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
