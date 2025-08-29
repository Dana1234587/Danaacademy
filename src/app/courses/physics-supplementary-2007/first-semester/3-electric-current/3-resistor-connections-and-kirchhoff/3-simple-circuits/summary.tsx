
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
        title: "قانون أوم للدارة البسيطة",
        formula: "I_{total} = \\frac{\\Sigma \\varepsilon}{\\Sigma R_{ext} + \\Sigma r_{int}}",
        description: "التيار الكلي في دارة بسيطة يساوي مجموع القوى الدافعة مقسومًا على مجموع المقاومات الكلي (الخارجية والداخلية). تُجمع القوى الدافعة إذا كانت في نفس الاتجاه وتُطرح إذا كانت متعاكسة."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">خطوات تحليل الدارة البسيطة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'1. احسب المقاومة الخارجية المكافئة ($R_{eq}$).\n2. احسب التيار الكلي المار في الدارة باستخدام قانون أوم للدارة البسيطة.\n3. اعمل بشكل عكسي من المصدر نحو الفروع لحساب التيار والجهد والقدرة لكل عنصر.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
