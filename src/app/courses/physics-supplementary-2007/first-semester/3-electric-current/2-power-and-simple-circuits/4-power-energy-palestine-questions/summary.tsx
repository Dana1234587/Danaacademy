
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
        title: "القدرة والمقارنات",
        formula: "P \\propto R \\quad (\\text{توالي}) \\quad , \\quad P \\propto \\frac{1}{R} \\quad (\\text{توازي})",
        description: "عند المقارنة بين قدرة مقاومتين، حدد أولاً نوع التوصيل. في التوصيل على التوالي، التيار ثابت والقدرة طردية مع المقاومة. في التوصيل على التوازي، الجهد ثابت والقدرة عكسية مع المقاومة."
    },
    {
        title: "كفاءة الدارة",
        formula: "\\eta = \\frac{P_{out}}{P_{in}} = \\frac{I^2R}{I^2(R+r)} = \\frac{R}{R+r}",
        description: "كفاءة نقل القدرة في دارة بسيطة هي نسبة القدرة المستهلكة في المقاومة الخارجية إلى القدرة الكلية المنتجة من المصدر."
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
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تذكر</AlertTitle>
          <AlertDescription>
           الأسئلة الإضافية غالبًا ما تختبر الفهم العميق للعلاقات بين المتغيرات (طردي، عكسي، تربيعي) بدلاً من الحسابات المباشرة فقط. تدرب على تحليل هذه العلاقات.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
