
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
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
        title: "الشرط الأول للاتزان (الاتزان الانتقالي)",
        formula: "\\Sigma \\vec{F} = 0",
        description: "يجب أن تكون محصلة (المجموع المتجهي) لجميع القوى الخارجية المؤثرة على الجسم تساوي صفرًا. هذا يضمن عدم وجود تسارع خطي."
    },
    {
        title: "الشرط الثاني للاتزان (الاتزان الدوراني)",
        formula: "\\Sigma \\vec{\\tau} = 0",
        description: "يجب أن تكون محصلة (المجموع الجبري) لجميع العزوم الخارجية المؤثرة على الجسم حول أي محور دوران تساوي صفرًا. هذا يضمن عدم وجود تسارع زاوي."
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
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
