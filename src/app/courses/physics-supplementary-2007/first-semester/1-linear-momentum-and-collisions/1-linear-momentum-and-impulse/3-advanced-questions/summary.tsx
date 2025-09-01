
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX, force LTR direction
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const laws = [
    {
        title: "مقارنة الطاقة الحركية عند ثبات الزخم",
        formula: "K = \\frac{p^2}{2m}",
        description: "عندما يكون لجسمين نفس الزخم الخطي (p)، فإن طاقتهما الحركية (K) تتناسب عكسيًا مع كتلتهما (m). \n **الجسم ذو الكتلة الأصغر يمتلك طاقة حركية أكبر.**"
    },
    {
        title: "مقارنة الزخم عند ثبات الطاقة الحركية",
        formula: "p = \\sqrt{2mK}",
        description: "عندما يكون لجسمين نفس الطاقة الحركية (K)، فإن زخمهما الخطي (p) يتناسب طرديًا مع الجذر التربيعي لكتلتهما ($\\sqrt{m}$). \n **الجسم ذو الكتلة الأكبر يمتلك زخمًا خطيًا أكبر.**"
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl"><SmartTextRenderer as="div" text={law.title}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription>
                  <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مثال توضيحي</AlertTitle>
          <AlertDescription>
           <p className="text-right">تخيل شاحنة وسيارة تتحركان بنفس الزخم الخطي. لإيقافهما، تحتاج إلى نفس الدفع (لأن $\\Delta p$ متساوٍ). لكن السيارة (ذات الكتلة الأصغر) يجب أن تكون سرعتها أعلى بكثير لتعويض كتلتها، وبالتالي تمتلك طاقة حركية أكبر بكثير، والضرر الناتج عن اصطدامها يكون أكبر.</p>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
