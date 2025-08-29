
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
        title: "تعريف مركز الكتلة",
        formula: "",
        description: "مركز الكتلة (Center of Mass) هو نقطة فريدة في جسم أو نظام من الأجسام يتصرف النظام بأكمله كما لو كانت كتلته الكلية مركزة في هذه النقطة."
    },
    {
        title: "حساب مركز الكتلة لنظام من الجسيمات",
        formula: "x_{CM} = \\frac{\\sum m_i x_i}{\\sum m_i}",
        description: "لحساب إحداثي مركز الكتلة على محور ($x$)، نضرب كتلة كل جسيم في إحداثيه السيني، نجمع النواتج، ثم نقسم على الكتلة الكلية للنظام. نفس المبدأ ينطبق على المحورين $y$ و $z$."
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
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
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
          <AlertTitle className="font-bold">مركز الكتلة ومركز الثقل</AlertTitle>
          <AlertDescription>
           في مجال جاذبية منتظم (مثل قرب سطح الأرض)، يتطابق مركز الكتلة مع مركز الثقل (Center of Gravity)، وهي النقطة التي يمكن اعتبار أن وزن الجسم كله يؤثر فيها.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
