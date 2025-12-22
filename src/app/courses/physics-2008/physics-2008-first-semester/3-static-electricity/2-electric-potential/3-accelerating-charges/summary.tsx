
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const processLine = (line: string) => {
        const parts = line.split(/(\$.*?\$|\*\*.*?\*\*)/g).filter(part => part);
        
        return parts.map((part, index) => {
            if (part.startsWith('$') && part.endsWith('$')) {
                const math = part.substring(1, part.length - 1);
                return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={math} /></span>;
            } else if (part.startsWith('**') && part.endsWith('**')) {
                const content = part.substring(2, part.length - 2);
                return <strong key={index} className="font-bold text-foreground">{content}</strong>;
            } else {
                return <span key={index}>{part}</span>;
            }
        });
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {processLine(line)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const laws = [
    {
        title: "الطاقة الحركية المكتسبة",
        formula: "\\Delta KE = W_{elec} = -q\\Delta V",
        description: "عندما تتحرك شحنة بفعل القوة الكهربائية فقط، فإن الشغل المبذول عليها يتحول بالكامل إلى طاقة حركية. إذا بدأت الشحنة من السكون، فإن طاقتها الحركية النهائية هي $KE_f = -q\\Delta V = -q(V_{final} - V_{initial})$."
    },
    {
        title: "السرعة النهائية",
        formula: "v_f = \\sqrt{\\frac{2(q\\Delta V)}{m}} = \\sqrt{\\frac{2KE_f}{m}}",
        description: "يمكن اشتقاق السرعة النهائية من معادلة الطاقة الحركية. لاحظ أن السرعة تتناسب عكسيًا مع الجذر التربيعي للكتلة. نستخدم القيمة المطلقة لـ (qΔV) تحت الجذر لأن الطاقة الحركية دائمًا موجبة."
    }
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right"><SmartTextRenderer as="div" text={law.title}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                <CardDescription className="text-right">
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مقارنة بين الجسيمات</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'إذا تسارع جسيمان لهما نفس الشحنة من السكون عبر نفس فرق الجهد، فسيكتسبان **نفس الطاقة الحركية النهائية**. ولكن، الجسيم ذو الكتلة الأصغر ستكون **سرعته النهائية أكبر**.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
