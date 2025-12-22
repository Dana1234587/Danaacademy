
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
        // This regex splits the string by LaTeX delimiters ($...$) while keeping them.
        const parts = line.split(/(\$.*?\$|\*\*.*?\*\*)/g).filter(part => part);
        
        return parts.map((part, index) => {
            if (part.startsWith('$') && part.endsWith('$')) {
                // This is a LaTeX part
                const math = part.substring(1, part.length - 1).replace(/\\\\/g, '\\');
                return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={math} /></span>;
            } else if (part.startsWith('**') && part.endsWith('**')) {
                // Bold part
                const content = part.substring(2, part.length - 2);
                return <strong key={index} className="font-bold text-foreground">{content}</strong>;
            } else {
                // Regular text part
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
        title: "الجهد الكهربائي (V)",
        formula: "V = \\frac{PE}{q}",
        description: "هو **خاصية للمكان**، ويُعرّف بأنه طاقة الوضع الكهربائية (PE) لكل وحدة شحنة (q) عند نقطة معينة. هو كمية قياسية وحدتها الفولت (V)، وهو يكافئ جول/كولوم."
    },
    {
        title: "طاقة الوضع الكهربائية (PE)",
        formula: "PE = qV",
        description: "هي **خاصية للشحنة** الموجودة في مكان معين. وهي الطاقة التي تمتلكها الشحنة (q) بسبب وجودها عند نقطة ذات جهد كهربائي (V)."
    },
    {
        title: "العلاقة بين المجال والجهد",
        formula: "E = -\\frac{\\Delta V}{\\Delta x}",
        description: "خطوط المجال الكهربائي (E) تشير دائمًا في اتجاه **تناقص** الجهد الكهربائي (V).\n- كلما تحركنا **مع** اتجاه المجال، قلّ الجهد.\n- كلما تحركنا **عكس** اتجاه المجال، زاد الجهد."
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
          <AlertTitle className="font-bold">تأثير الشحنات</AlertTitle>
          <AlertDescription>
           - الجهد الكهربائي (V) عند نقطة **يعتمد فقط على الشحنات المصدر** التي تولد المجال، ولا يعتمد على شحنة الاختبار التي نضعها عند تلك النقطة.\n- طاقة الوضع (PE) **تعتمد على كل من شحنة المصدر وشحنة الاختبار**.
          </AlertDescription>
        </Alert>
         <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظات على حركة الشحنات</AlertTitle>
          <AlertDescription>
             <SmartTextRenderer as="div" text={'**بفعل القوة الكهربائية فقط:**\n- الشحنة الموجبة تتحرك تلقائيًا من الجهد الأعلى إلى الأقل (مع المجال)، فتقل طاقة وضعها وتزداد طاقتها الحركية.\n- الشحنة السالبة تتحرك تلقائيًا من الجهد الأقل إلى الأعلى (عكس المجال)، فتقل طاقة وضعها وتزداد طاقتها الحركية.\n\n**بفعل قوة خارجية (بسرعة ثابتة):**\n- لتحريك شحنة عكس اتجاه القوة الكهربائية المؤثرة عليها، يجب بذل شغل خارجي **موجب**، وهذا الشغل يخزن على شكل زيادة في طاقة الوضع الكهربائية.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
