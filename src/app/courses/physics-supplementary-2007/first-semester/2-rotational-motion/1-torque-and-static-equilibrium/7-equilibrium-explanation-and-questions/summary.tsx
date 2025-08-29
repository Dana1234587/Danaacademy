
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

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

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">مراجعة شروط الاتزان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    تذكر دائمًا تطبيق الشرطين معًا:
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li><b>الاتزان الانتقالي:</b> <SmartTextRenderer as="span" text={'$\Sigma F_x = 0$ و $\Sigma F_y = 0$'} />. (مجموع القوى على كل محور يساوي صفر).</li>
                        <li><b>الاتزان الدوراني:</b> <SmartTextRenderer as="span" text={'$\Sigma \tau = 0$'} /> حول أي محور. (مجموع العزوم يساوي صفر).</li>
                    </ol>
                </CardDescription>
            </CardContent>
          </Card>
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">نقطة مهمة</AlertTitle>
          <AlertDescription>
           في مسائل السلالم، غالبًا ما يكون الحائط "أملس" (لا توجد قوة احتكاك، فقط قوة رد فعل عمودية)، بينما تكون الأرضية "خشنة" (توجد قوة احتكاك وقوة رد فعل عمودية). انتبه جيدًا لهذه التفاصيل في نص السؤال.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
