
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
        title: "تحليل البندول القذفي",
        formula: "mv = (m+M)V  \\quad \\rightarrow \\quad \\frac{1}{2}(m+M)V^2 = (m+M)gh",
        description: "يتم تحليل حركة البندول القذفي على مرحلتين:\n1. **مرحلة التصادم:** تصادم عديم المرونة، نطبق فيه مبدأ **حفظ الزخم الخطي** لإيجاد السرعة المشتركة بعد التصادم.\n2. **مرحلة الارتفاع:** حركة بندول، نطبق فيها مبدأ **حفظ الطاقة الميكانيكية** لربط السرعة بعد التصادم بأقصى ارتفاع يصل إليه النظام."
    },
    {
        title: "كرات نيوتن",
        formula: "",
        description: "مثال على التصادمات المرنة تقريبًا. عندما تصطدم كرة واحدة، ترتد كرة واحدة من الطرف الآخر بنفس السرعة تقريبًا. هذا هو الحل الوحيد الذي يحقق حفظ الزخم الخطي وحفظ الطاقة الحركية معًا."
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
               {law.formula && (
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                )}
                <div className="text-right">
                    {law.description.split('\n').map((line, i) => {
                        const parts = line.split(/(\*\*.*?\*\*)/g);
                        return (
                            <p key={i} className="my-1 leading-relaxed">
                                {parts.map((part, j) => 
                                    part.startsWith('**') && part.endsWith('**') ? 
                                    <strong key={j} className="font-bold text-primary">{part.slice(2, -2)}</strong> : 
                                    part
                                )}
                            </p>
                        );
                    })}
                </div>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           لا تخلط بين المبدأين! حفظ الزخم يُطبق <strong>خلال</strong> التصادم. حفظ الطاقة الميكانيكية يُطبق <strong>بعد</strong> التصادم أثناء حركة النظام كبندول. لا تكون الطاقة الحركية محفوظة خلال التصادم في البندول القذفي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

    