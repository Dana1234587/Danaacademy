
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
        title: "تأثير المفاتيح",
        formula: "",
        description: "عند فتح أو غلق مفتاح، تتغير المقاومة المكافئة للدارة. يجب إعادة حساب المقاومة المكافئة والتيار الكلي. غلق مفتاح يضيف مسارًا جديدًا للتيار، مما يقلل المقاومة الكلية عادةً ويزيد التيار الكلي."
    },
    {
        title: "قراءة أجهزة القياس",
        formula: "",
        description: "الأميتر يقيس التيار المار في الفرع الذي يوصل به على التوالي. الفولتميتر يقيس فرق الجهد بين النقطتين اللتين يوصل بينهما على التوازي."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'تذكر أن قراءة الفولتميتر عبر بطارية ليست دائمًا القوة الدافعة. هي تساوي $\\varepsilon$ فقط عندما تكون الدائرة مفتوحة (لا يمر تيار). في الدارة المغلقة، $V = \\varepsilon - Ir$.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
