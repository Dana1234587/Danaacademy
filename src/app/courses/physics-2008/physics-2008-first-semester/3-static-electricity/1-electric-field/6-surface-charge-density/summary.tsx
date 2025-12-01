
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
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
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
        title: "الكثافة السطحية للشحنة (σ)",
        formula: "\\sigma = \\frac{Q}{A}",
        description: "هي مقدار الشحنة الكهربائية (Q) الموجودة على وحدة المساحة (A) من سطح الموصل. تُقاس بوحدة كولوم لكل متر مربع ($C/m^2$)."
    },
    {
        title: "العوامل المؤثرة على σ (لموصل كروي)",
        description: "بالنسبة لموصل كروي مساحته $A = 4\\pi r^2$, فإن الكثافة السطحية هي $\\sigma = \\frac{Q}{4\\pi r^2}$. من هنا نرى أن:\n• **زيادة الشحنة (Q):** تزداد الكثافة السطحية بشكل طردي.\n• **زيادة نصف القطر (r):** تقل الكثافة السطحية بشكل كبير لأنها تتناسب عكسيًا مع مربع نصف القطر ($r^2$). فإذا تضاعف نصف القطر، تقل الكثافة إلى الربع."
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
          <AlertTitle className="font-bold">تحويل الوحدات</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'انتبه عند تحويل الوحدات! على سبيل المثال:\n $1 \\mu C/cm^2 = \\frac{1 \\times 10^{-6} C}{(10^{-2} m)^2} = \\frac{10^{-6}}{10^{-4}} C/m^2 = 10^{-2} C/m^2$'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
