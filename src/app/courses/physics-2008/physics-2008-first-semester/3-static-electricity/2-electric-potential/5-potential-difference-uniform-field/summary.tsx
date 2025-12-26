
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import React from 'react';

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
        title: "فرق الجهد في مجال منتظم",
        formula: "\\Delta V_{ab} = V_a - V_b = -Ed\\cos(\\theta)",
        description: "لحساب فرق الجهد بين نقطتين a و b. حيث E هو شدة المجال المنتظم، d هي مقدار الإزاحة من النقطة a إلى النقطة b، و $\\theta$ هي الزاوية بين اتجاه المجال (E) واتجاه الإزاحة (d)."
    },
    {
        title: "حالات خاصة للزاوية",
        description: "• **عندما $\\theta = 0^\\circ$ (مع المجال):** $\\Delta V_{ab} = -Ed$. يكون فرق الجهد سالبًا، أي $V_a < V_b$. \n• **عندما $\\theta = 180^\\circ$ (عكس المجال):** $\\Delta V_{ab} = -Ed\\cos(180) = +Ed$. يكون فرق الجهد موجبًا، أي $V_a > V_b$.\n• **عندما $\\theta = 90^\\circ$ (عمودي على المجال):** $\\Delta V_{ab} = 0$. الجهد متساوٍ على طول الخط العمودي على المجال."
    },
    {
        title: "سطوح تساوي الجهد",
        description: "هي سطوح تكون جميع نقاطها لها نفس الجهد الكهربائي. تكون خطوط المجال الكهربائي عمودية دائمًا على سطوح تساوي الجهد. لا يلزم بذل أي شغل لنقل شحنة على سطح تساوي الجهد."
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
          <AlertTitle className="font-bold">الاتجاه هو المفتاح</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'تذكر دائمًا أن الجهد الكهربائي يقل كلما تحركنا **مع** اتجاه المجال الكهربائي، ويزداد كلما تحركنا **عكس** اتجاهه.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

