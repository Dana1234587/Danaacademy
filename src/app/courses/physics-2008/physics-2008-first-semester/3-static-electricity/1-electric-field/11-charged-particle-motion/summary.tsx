
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import React from 'react';

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
        title: "تسارع جسيم مشحون",
        formula: "a = \\frac{F_e}{m} = \\frac{qE}{m}",
        description: "بإهمال قوة الجاذبية، فإن القوة المحصلة المؤثرة على الجسيم هي القوة الكهربائية ($F_e=qE$). من قانون نيوتن الثاني ($F=ma$)، يمكن حساب التسارع (a)."
    },
    {
        title: "معادلات الحركة بتسارع ثابت",
        formulas: [
            "v_f = v_i + at",
            "\\Delta x = v_i t + \\frac{1}{2}at^2",
            "v_f^2 = v_i^2 + 2a \\Delta x"
        ],
        description: "بما أن المجال منتظم، فإن القوة والتسارع ثابتان. لذا، يمكن استخدام معادلات الحركة الخطية بتسارع ثابت لتحليل حركة الجسيم.\n- $v_f$: السرعة النهائية\n- $v_i$: السرعة الابتدائية\n- $a$: التسارع\n- $t$: الزمن\n- $\\Delta x$: الإزاحة"
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
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                 {law.formulas && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center space-y-2">
                      {law.formulas.map((f, i) => <BlockMath key={i} math={f} />)}
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
          <AlertTitle className="font-bold">تحديد اتجاه الحركة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'**اتجاه القوة/التسارع:** الشحنة الموجبة تتسارع بنفس اتجاه المجال (E). الشحنة السالبة تتسارع عكس اتجاه المجال (E).\n**تسارع أم تباطؤ؟** إذا كانت السرعة الابتدائية ($v_i$) بنفس اتجاه القوة الكهربائية، فإن الجسم يتسارع. إذا كانت $v_i$ عكس اتجاه القوة، فإن الجسم يتباطأ.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
