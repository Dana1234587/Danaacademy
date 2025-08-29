
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
        title: "الطاقة والقدرة",
        formula: "P = \\frac{E}{t}",
        description: "القدرة (P) هي المعدل الزمني لاستهلاك أو إنتاج الطاقة (E). تُقاس القدرة بالواط (W) والطاقة بالجول (J)."
    },
    {
        title: "مقارنة القدرة في المقاومات",
        formula: "P = I^2R \\quad , \\quad P = \\frac{V^2}{R}",
        description: "عند مقارنة مقاومتين على التوالي، يكون التيار (I) ثابتًا، لذا نستخدم $P = I^2R$ (القدرة طردية مع المقاومة). عند المقارنة على التوازي، يكون الجهد (V) ثابتًا، لذا نستخدم $P = V^2/R$ (القدرة عكسية مع المقاومة)."
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
          <AlertTitle className="font-bold">كفاءة البطارية</AlertTitle>
          <AlertDescription>
            كفاءة البطارية هي النسبة بين القدرة التي تصل للدائرة الخارجية إلى القدرة الكلية التي تنتجها البطارية.
            <div dir="ltr" className="text-center mt-2 font-mono text-sm">
                <BlockMath math={"\\eta = \\frac{P_{out}}{P_{prod}} = \\frac{IV}{I\\varepsilon} = \\frac{V}{\\varepsilon}"} />
            </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
