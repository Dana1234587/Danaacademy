
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
        title: "حفظ الزخم الزاوي",
        formula: "I_i \\omega_i = I_f \\omega_f",
        description: "المبدأ الأساسي في الأنظمة الدورانية المعزولة. أي تغيير في توزيع الكتلة (وبالتالي في عزم القصور الذاتي) يجب أن يقابله تغيير في السرعة الزاوية للحفاظ على الزخم الزاوي ثابتًا."
    },
    {
        title: "الطاقة في الأنظمة المعزولة دورانيًا",
        formula: "K_{rot} = \\frac{L^2}{2I}",
        description: "في نظام معزول حيث L ثابت، تتناسب الطاقة الحركية الدورانية عكسيًا مع عزم القصور الذاتي. إذا قل عزم القصور الذاتي (بتقريب الكتلة من المحور)، تزداد الطاقة الحركية (عادةً على حساب الشغل المبذول من القوى الداخلية)."
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
          <AlertTitle className="font-bold">مفتاح الحل</AlertTitle>
          <AlertDescription>
           عند تحليل أي سيناريو، اسأل نفسك: هل النظام معزول (لا يوجد عزم خارجي)؟ إذا كانت الإجابة نعم، فإن الزخم الزاوي محفوظ. ثم اسأل: هل تغير توزيع الكتلة؟ إذا كان الأمر كذلك، فإن عزم القصور الذاتي قد تغير، وبالتالي ستتغير السرعة الزاوية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
