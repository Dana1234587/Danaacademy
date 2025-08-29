
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
        title: "قانون نيوتن الثاني للحركة الدورانية",
        formula: "\\Sigma \\vec{\\tau} = I \\vec{\\alpha}",
        description: "ينص على أن محصلة العزوم الخارجية المؤثرة على جسم جاسئ تساوي حاصل ضرب عزم قصوره الذاتي (I) في تسارعه الزاوي ($\\vec{\\alpha}$). هذا القانون هو أساس ديناميكا الحركة الدورانية."
    },
    {
        title: "مقارنة بالحركة الخطية",
        formula: "\\Sigma \\vec{F} = m \\vec{a}",
        description: "لاحظ التشابه التام مع قانون نيوتن الثاني للحركة الخطية. العزم ($\\tau$) يحل محل القوة (F)، وعزم القصور الذاتي (I) يحل محل الكتلة (m)، والتسارع الزاوي ($\\alpha$) يحل محل التسارع الخطي (a)."
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
           <SmartTextRenderer as="div" text={'في المسائل التي تربط بين الحركة الخطية والدورانية (مثل بكرة يتدلى منها ثقل)، قم بتطبيق قانون نيوتن الثاني للحركة الخطية على الجزء الذي يتحرك خطيًا، وقانون نيوتن الثاني للحركة الدورانية على الجزء الذي يدور، ثم اربط بينهما باستخدام العلاقة $a = \\alpha r$.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
