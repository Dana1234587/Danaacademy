
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

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
        title: "منحنى (القوة - الزمن)",
        points: [
            "المساحة تحت المنحنى = الدفع ($I = \\Delta p$)",
            "ميل الخط = لا يمثل كمية فيزيائية شائعة مباشرة."
        ]
    },
    {
        title: "منحنى (الزخم - الزمن)",
        points: [
            "المساحة تحت المنحنى = لا تمثل كمية فيزيائية شائعة مباشرة.",
            "ميل الخط = القوة المحصلة ($F_{net} = \\frac{\\Delta p}{\\Delta t}$)"
        ]
    },
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
            <CardContent className="space-y-2">
                <ul className="list-disc list-inside text-right text-muted-foreground space-y-2">
                  {law.points.map((point, pIndex) => (
                    <li key={pIndex}><SmartTextRenderer as="span" text={point} /></li>
                  ))}
                </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
