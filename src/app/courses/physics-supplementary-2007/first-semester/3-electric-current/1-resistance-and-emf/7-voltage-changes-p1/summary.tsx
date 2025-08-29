
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
        title: "عبور مقاومة (R)",
        formula: "\\Delta V = -IR",
        description: "عند عبور مقاومة في نفس اتجاه التيار، يقل الجهد (هبوط في الجهد). إذا تم العبور عكس اتجاه التيار، يزداد الجهد ($\\Delta V = +IR$)."
    },
    {
        title: "عبور بطارية (ε) - حالة تفريغ",
        formula: "\\Delta V = +\\varepsilon - Ir",
        description: "عند عبور بطارية من قطبها السالب إلى الموجب (في حالة تفريغ)، يزداد الجهد بمقدار القوة الدافعة وينقص بمقدار الهبوط في الجهد الداخلي."
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
          <AlertTitle className="font-bold">استراتيجية حساب $V_{ab}$</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'لحساب فرق الجهد بين النقطتين a و b ($V_a - V_b$), ابدأ من النقطة b واكتب جهدها $V_b$, ثم تحرك نحو النقطة a مضيفًا أو طارحًا تغيرات الجهد عبر كل عنصر حتى تصل إلى a وتساوي التعبير بـ $V_a$. ثم أعد ترتيب المعادلة.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
