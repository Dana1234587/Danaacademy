
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index} dir="rtl">{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed">
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
        title: "تعريف مركز الكتلة",
        formula: "",
        description: "مركز الكتلة (Center of Mass) هو نقطة فريدة في جسم أو نظام من الأجسام يتصرف النظام بأكمله كما لو كانت كتلته الكلية مركزة في هذه النقطة."
    },
    {
        title: "حساب مركز الكتلة لنظام من الجسيمات",
        formula: "x_{CM} = \\frac{\\sum m_i x_i}{\\sum m_i}",
        description: "لحساب إحداثي مركز الكتلة على محور ($x$)، نضرب كتلة كل جسيم في إحداثيه السيني، نجمع النواتج، ثم نقسم على الكتلة الكلية للنظام. نفس المبدأ ينطبق على المحورين $y$ و $z$."
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
      </div>
    </div>
  );
}
