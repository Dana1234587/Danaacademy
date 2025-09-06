
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';


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
        title: "منحنى (الزخم p - السرعة v)",
        formula: "\\text{الميل} = \\frac{\\Delta p}{\\Delta v} = m",
        description: "عند رسم الزخم الخطي (p) على المحور الصادي والسرعة (v) على المحور السيني، وبما أن $p = mv$, فإن العلاقة بين p و v هي علاقة خطية. ميل هذا الخط المستقيم يمثل كتلة الجسم (m). الجسم ذو الميل الأكبر له كتلة أكبر."
        
    },
    {
        title: "منحنى (الزخم p - الكتلة m)",
        formula: "\\text{الميل} = \\frac{\\Delta p}{\\Delta m} = v",
        description: "عند رسم الزخم الخطي (p) على المحور الصادي والكتلة (m) على المحور السيني، وإذا تحركت أجسام مختلفة الكتل بنفس السرعة، فإن العلاقة بين زخم كل جسم وكتلته تكون خطية. ميل هذا الخط المستقيم يمثل السرعة الثابتة (v) التي تتحرك بها الأجسام."
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
                   <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تبديل المحاور</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'انتبه جيدًا! إذا تم تبديل المحاور (مثلاً، رسمنا v على المحور الصادي و p على المحور السيني)، فإن الميل سيصبح مقلوب الكمية. في هذه الحالة، ميل منحنى (v-p) سيساوي $\\frac{1}{m}$.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
