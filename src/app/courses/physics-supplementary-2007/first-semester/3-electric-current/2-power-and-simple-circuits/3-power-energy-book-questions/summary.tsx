
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
        title: "الطاقة (E) والقدرة (P)",
        formula: "E = P \\times t",
        description: "الطاقة المستهلكة تساوي القدرة مضروبة في الزمن. تذكر تحويل الزمن إلى ثواني للحصول على الطاقة بوحدة الجول، أو إبقاءه بالساعات مع القدرة بالكيلوواط للحصول على الطاقة بوحدة كيلوواط-ساعة."
    },
    {
        title: "القدرة في دارة كاملة",
        formula: "P_{prod} = P_{ext} + P_{int}",
        description: "القدرة التي تنتجها البطارية ($\\varepsilon I$) تتوزع بين المقاومة الخارجية ($I^2R$) والمقاومة الداخلية ($I^2r$)."
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
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           عند حل مسائل القدرة، حدد أولاً العنصر المطلوب حساب قدرته (مقاومة خارجية، مقاومة داخلية، بطارية كاملة). ثم اختر الصيغة المناسبة للقدرة بناءً على المعطيات المتوفرة (الجهد، التيار، المقاومة).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
