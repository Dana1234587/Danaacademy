
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
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
        title: "تعريف الزخم الخطي (p)",
        formula: "p = m \\cdot v",
        description: "الزخم الخطي هو حاصل ضرب كتلة الجسم (m) في سرعته المتجهة (v). وهو كمية فيزيائية متجهة، اتجاهها هو نفس اتجاه السرعة."
    },
    {
        title: "وحدة قياس الزخم الخطي",
        formula: "kg \\cdot m/s",
        description: "في النظام الدولي للوحدات (SI)، يُقاس الزخم بوحدة كيلوغرام متر لكل ثانية."
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl">{law.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription>
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
