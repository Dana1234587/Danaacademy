
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
        title: "المقاومة الكهربائية (R)",
        formula: "R = \\frac{V}{I}",
        description: "المقاومة هي خاصية للمادة تعيق مرور التيار الكهربائي. تُعرّف بأنها النسبة بين فرق الجهد (V) المطبق على الموصل وشدة التيار (I) المار فيه. وحدتها هي الأوم ($\\Omega$)."
    },
    {
        title: "قانون أوم",
        formula: "V = IR",
        description: "ينص على أن فرق الجهد عبر موصل أومي يتناسب طرديًا مع شدة التيار المار فيه، بثبوت درجة الحرارة."
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
          <AlertTitle className="font-bold">الموصلات الأومية واللاأومية</AlertTitle>
          <AlertDescription>
           - **الموصلات الأومية:** مقاومتها ثابتة لا تتغير بتغير الجهد أو التيار (مثل الفلزات عند درجة حرارة ثابتة).
           <br/>
           - **الموصلات اللاأومية:** مقاومتها تتغير بتغير الجهد أو التيار (مثل الثنائيات والترانزستورات).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
