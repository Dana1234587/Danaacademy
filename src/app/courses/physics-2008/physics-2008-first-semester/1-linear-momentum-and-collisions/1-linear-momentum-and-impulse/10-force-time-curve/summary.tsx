
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
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
        title: "الدفع من منحنى (القوة-الزمن)",
        formula: "I = \\text{Area under F-t curve}",
        description: "الدفع (I) المؤثر على جسم يساوي المساحة المحصورة بين منحنى القوة-الزمن ومحور الزمن. إذا كانت القوة تحت المحور (سالبة)، تكون المساحة (والدفع) سالبة."
    },
    {
        title: "القوة المتوسطة",
        formula: "\\bar{F} = \\frac{I_{total}}{\\Delta t_{total}}",
        description: "يمكن حساب القوة المتوسطة خلال فترة زمنية معينة بقسمة الدفع الكلي (المساحة الكلية) خلال تلك الفترة على مقدار الفترة الزمنية."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تذكر قوانين المساحة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'ستحتاج إلى حساب مساحة الأشكال الهندسية البسيطة: \n- مساحة المستطيل = الطول × العرض \n- مساحة المثلث = $0.5$ × القاعدة × الارتفاع \n- مساحة شبه المنحرف = $0.5$ × (مجموع القاعدتين المتوازيتين) × الارتفاع'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
