
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
        title: "منهجية كيرشوف",
        formula: "\\Sigma I = 0 \\quad , \\quad \\Sigma (\\Delta V) = 0",
        description: "تعتمد الطريقة على تطبيق قاعدتي كيرشوف بشكل منهجي للحصول على نظام من المعادلات الخطية التي يمكن حلها لإيجاد التيارات المجهولة في الدارة."
    },
    {
        title: "حساب فرق الجهد (Vab)",
        formula: "V_a - V_b = \\Sigma (\\Delta V)_{\\text{from b to a}}",
        description: "لحساب فرق الجهد بين نقطتين، ابدأ من النقطة الثانية (b)، وتحرك نحو النقطة الأولى (a) عبر أي مسار، وقم بجمع تغيرات الجهد جبريًا. النتيجة هي $V_a - V_b$."
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
          <AlertTitle className="font-bold">الاتجاهات الافتراضية</AlertTitle>
          <AlertDescription>
           لا تقلق بشأن افتراض اتجاه خاطئ للتيار. إذا كان افتراضك خاطئًا، ستظهر قيمة التيار سالبة في الحل النهائي، مما يعني أن اتجاهه الفعلي هو عكس ما افترضته. القيمة العددية ستكون صحيحة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
