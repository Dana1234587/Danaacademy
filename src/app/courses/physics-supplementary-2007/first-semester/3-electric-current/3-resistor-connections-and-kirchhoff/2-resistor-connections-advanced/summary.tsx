
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
        title: "إلغاء مقاومة",
        formula: "I_R = 0",
        description: "تُلغى المقاومة إذا وُصل معها على التوازي سلك عديم المقاومة، أو إذا كان فرق الجهد بين طرفيها يساوي صفرًا (كما في قنطرة وتستون المتزنة)."
    },
    {
        title: "قنطرة وتستون المتزنة",
        formula: "\\frac{R_1}{R_2} = \\frac{R_3}{R_4}",
        description: "عندما يتحقق هذا الشرط، يكون التيار المار في المقاومة الوسطى (الجلفانومتر) صفرًا، ويمكن إزالتها من الدارة لتبسيطها إلى مجموعتي مقاومات على التوالي موصولتين على التوازي."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           قبل البدء بحساب المقاومة المكافئة، تحقق دائمًا من وجود حالات خاصة مثل وجود سلك يلغي مقاومة أو وجود قنطرة وتستون. هذا يمكن أن يبسط الحل بشكل كبير.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
