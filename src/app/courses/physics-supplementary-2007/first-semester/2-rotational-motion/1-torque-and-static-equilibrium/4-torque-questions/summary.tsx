
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
        title: "تعريف الازدواج",
        formula: "\\Sigma \\vec{F} = 0, \\Sigma \\vec{\\tau} \\neq 0",
        description: "الازدواج هو نظام يتكون من قوتين متساويتين في المقدار ومتعاكستين في الاتجاه، وخط عملهما غير متطابق. ينتج عن الازدواج عزم صافٍ يسبب دورانًا فقط، دون أي حركة انتقالية (لأن محصلة القوى تساوي صفر)."
    },
    {
        title: "حساب عزم الازدواج",
        formula: "\\tau = Fd",
        description: "مقدار عزم الازدواج يساوي حاصل ضرب مقدار إحدى القوتين (F) في المسافة العمودية بين خطي عملهما (d)."
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
          <AlertTitle className="font-bold">استقلالية عزم الازدواج</AlertTitle>
          <AlertDescription>
           من أهم خصائص عزم الازدواج أنه لا يعتمد على موقع محور الدوران، فطالما أن القوتين تحققان شروط الازدواج، سيكون عزمهما ثابتًا بغض النظر عن النقطة التي نحسب العزم حولها.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
