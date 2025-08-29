
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
        title: "قانون المقاومة",
        formula: "R = \\rho \\frac{L}{A}",
        description: "مقاومة (R) موصل تعتمد على مقاوميته ($\\rho$)، طوله (L)، ومساحة مقطعه العرضي (A)."
    },
    {
        title: "المقاومية ($\\rho$)",
        formula: "",
        description: "هي مقياس لممانعة المادة لمرور التيار الكهربائي. وهي خاصية مميزة للمادة تعتمد على نوعها ودرجة حرارتها فقط."
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
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                <CardDescription className="text-right">
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           لا تخلط بين المقاومة والمقاومية. المقاومة خاصية للجسم (تعتمد على أبعاده)، بينما المقاومية خاصية للمادة المصنوع منها الجسم.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
