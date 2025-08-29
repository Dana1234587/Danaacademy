
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        // The katex component will handle LTR rendering for the math formula
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
        title: "نصف قطر النواة",
        formula: "r = r_0 A^{1/3}",
        description: "حيث ($r_0$) ثابت تجريبي قيمته تقريبًا ($1.2 \\times 10^{-15} m$) أو ($1.2 fm$)، و ($A$) هو العدد الكتلي للنواة."
    },
    {
        title: "حجم النواة",
        formula: "V = \\frac{4}{3}\\pi r^3",
        description: "بما أن نصف القطر يعتمد على $A^{1/3}$, فإن الحجم يتناسب طرديًا مع A. وهذا يعني أن كل نيوكليون يشغل نفس الحجم تقريبًا داخل النواة."
    },
    {
        title: "كثافة النواة",
        formula: "\\rho \\approx \\text{constant}",
        description: "بما أن كتلة النواة تتناسب طرديًا مع A وحجمها يتناسب طرديًا مع A، فإن كثافتها (الكتلة/الحجم) تكون ثابتة تقريبًا لجميع الأنوية، وهي قيمة هائلة جدًا."
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
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={"هذه القوانين هي نماذج تقريبية تفترض أن النواة كروية الشكل، وهو افتراض جيد لمعظم الأنوية."} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
