
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
        title: "تعريف الدفع (Impulse)",
        formula: "\\vec{I} = \\Sigma \\vec{F} \\cdot \\Delta t",
        description: "الدفع هو تأثير قوة على جسم خلال فترة زمنية معينة. وهو كمية متجهة اتجاهها بنفس اتجاه القوة المحصلة."
    },
    {
        title: "مبرهنة (الزخم-الدفع)",
        formula: "\\vec{I} = \\Delta \\vec{p}",
        description: "تنص هذه المبرهنة الأساسية على أن الدفع الكلي المؤثر على جسم يساوي تمامًا التغير في زخمه الخطي. هذه العلاقة تربط بين مسببات الحركة (القوة) وأثرها (التغير في الحركة)."
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
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">وحدات متكافئة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'من المبرهنة، نستنتج أن وحدة الدفع ($N \\cdot s$) تكافئ وحدة الزخم ($kg \\cdot m/s$).'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
