
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
        title: "المقاومة والأبعاد",
        formula: "R = \\rho \\frac{L}{A}",
        description: "القانون الأساسي الذي يربط مقاومة الموصل بمقاومية مادته وأبعاده الهندسية."
    },
    {
        title: "حفظ الحجم عند إعادة التشكيل",
        formula: "V = A \\times L = \\text{constant}",
        description: "عند سحب سلك أو إعادة تشكيله، يتغير طوله ومساحة مقطعه، لكن حجمه يبقى ثابتًا. هذا يعني أن $A_1 L_1 = A_2 L_2$."
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
          <AlertTitle className="font-bold">استراتيجية حل مسائل سحب الأسلاك</AlertTitle>
          <AlertDescription>
           1. اكتب علاقة المقاومة بدلالة الطول والمساحة. <br/>
           2. استخدم مبدأ حفظ الحجم لإيجاد العلاقة بين المساحة الجديدة والقديمة بدلالة تغير الطول (أو العكس). <br/>
           3. عوض في قانون المقاومة لإيجاد المقاومة الجديدة بدلالة القديمة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
