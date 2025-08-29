
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
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


const concepts = [
    {
        title: "القصور الذاتي الدوراني (عزم القصور الذاتي)",
        description: "هو مقياس لممانعة الجسم لإحداث تغيير في حالته الحركية الدورانية. يعتمد على كتلة الجسم وكيفية توزيع تلك الكتلة حول محور الدوران."
    },
    {
        title: "العوامل المؤثرة على عزم القصور الذاتي",
        description: "1. **مقدار الكتلة:** كلما زادت الكتلة زاد القصور الذاتي.\n2. **توزيع الكتلة:** كلما كانت الكتلة أبعد عن محور الدوران، زاد القصور الذاتي.\n3. **موضع محور الدوران:** يتغير القصور الذاتي بتغير موضع المحور."
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {concepts.map((concept, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    {concept.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مقارنة بالحركة الخطية</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'عزم القصور الذاتي ($I$) في الحركة الدورانية يماثل دور الكتلة ($m$) في الحركة الخطية. كلاهما مقياس للقصور الذاتي.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
