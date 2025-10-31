
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
        title: "السرعة الزاوية (ω)",
        formulas: ["\\omega_{avg} = \\frac{\\Delta \\theta}{\\Delta t}", "\\omega_{inst} = \\frac{d\\theta}{dt}"],
        description: "هي المعدل الزمني للتغير في الإزاحة الزاوية. تقاس بوحدة rad/s."
    },
    {
        title: "التسارع الزاوي (α)",
        formulas: ["\\alpha_{avg} = \\frac{\\Delta \\omega}{\\Delta t}", "\\alpha_{inst} = \\frac{d\\omega}{dt}"],
        description: "هو المعدل الزمني للتغير في السرعة الزاوية. يقاس بوحدة rad/s²."
    },
     {
        title: "معادلات الحركة الدورانية (بتسارع ثابت)",
        formulas: [
            "\\omega_f = \\omega_i + \\alpha t",
            "\\Delta\\theta = \\omega_i t + \\frac{1}{2}\\alpha t^2",
            "\\omega_f^2 = \\omega_i^2 + 2\\alpha \\Delta\\theta"
        ],
        description: "هذه المعادلات تماثل تمامًا معادلات الحركة الخطية، ولكن باستخدام الكميات الزاوية."
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
                {law.formulas && 
                    <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center space-y-4">
                        {law.formulas.map((formula, i) => <BlockMath key={i} math={formula} />)}
                    </div>
                }
                <CardDescription className="text-right">
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'تذكر دائمًا أن الدورة الكاملة تساوي $2\\pi$ راديان. هذا التحويل أساسي في حل العديد من المسائل.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
