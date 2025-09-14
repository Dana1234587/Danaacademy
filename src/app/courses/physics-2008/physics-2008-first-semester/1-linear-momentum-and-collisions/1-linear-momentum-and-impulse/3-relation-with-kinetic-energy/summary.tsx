'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info, Satellite } from 'lucide-react';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const processLine = (line: string) => {
        // Regex to split by LaTeX ($...$) and bold (**...**) markers, keeping the delimiters
        const parts = line.split(/(\$.*?\$|\*\*.*?\*\*)/g).filter(part => part);
        
        return parts.map((part, index) => {
            if (part.startsWith('$') && part.endsWith('$')) {
                // LaTeX part - ensure backslashes are not escaped
                const math = part.substring(1, part.length - 1).replace(/\\\\/g, '\\');
                return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={math} /></span>;
            } else if (part.startsWith('**') && part.endsWith('**')) {
                // Bold part
                const content = part.substring(2, part.length - 2);
                return <strong key={index} className="font-bold text-foreground">{content}</strong>;
            } else {
                // Regular text part
                return <span key={index}>{part}</span>;
            }
        });
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {processLine(line)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const laws = [
    {
        title: "العلاقة بين الطاقة الحركية K والزخم الخطي p",
        formula: "K = \\frac{p^2}{2m}",
        description: "يمكن اشتقاق هذه العلاقة من قانوني طاقة الحركة $K=\\frac{1}{2}mv^2$ والزخم $p=mv$."
    },
    {
        title: "العلاقة بين الزخم p وطاقة الحركة K",
        formula: "p = \\sqrt{2mK}",
        description: "هذه الصيغة مفيدة جدًا عند مقارنة زخم جسمين لهما نفس طاقة الحركة أو العكس."
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl"><SmartTextRenderer as="div" text="العلاقة بين الطاقة الحركية K والزخم الخطي p"/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={"K = \\frac{p^2}{2m}"} />
                </div>
                <CardDescription>
                  <div className='space-y-2 text-right'>
                    <p className='font-bold'>طريقة الاشتقاق:</p>
                    <SmartTextRenderer text={"1. نبدأ من تعريف طاقة الحركة: $K = \\frac{1}{2}mv^2$"} />
                    <SmartTextRenderer text={"2. من تعريف الزخم الخطي $p = mv$, نعزل السرعة: $v = \\frac{p}{m}$"} />
                    <SmartTextRenderer text={"3. نعوض قيمة السرعة (v) في معادلة طاقة الحركة:"} />
                    <div dir="ltr" className="bg-muted p-2 rounded-lg text-center text-sm">
                        <BlockMath math={"K = \\frac{1}{2}m(\\frac{p}{m})^2 = \\frac{1}{2}m\\frac{p^2}{m^2} = \\frac{p^2}{2m}"} />
                    </div>
                  </div>
                </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl"><SmartTextRenderer as="div" text="العلاقة بين الزخم p وطاقة الحركة K"/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                 <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={"p = \\sqrt{2mK}"} />
                </div>
                <CardDescription>
                   <SmartTextRenderer text={"هذه الصيغة مفيدة جدًا عند مقارنة زخم جسمين لهما نفس طاقة الحركة أو العكس."} />
                </CardDescription>
            </CardContent>
          </Card>

          <Alert>
              <Info className="h-4 w-4" />
              <AlertTitle className="font-bold">مقارنة الطاقة الحركية عند ثبات الزخم</AlertTitle>
              <AlertDescription>
                <div className='space-y-2'>
                    <SmartTextRenderer as="div" text={"من العلاقة $K = \\frac{p^2}{2m}$, نلاحظ أنه عند ثبات الزخم الخطي (p)، فإن الطاقة الحركية (K) تتناسب عكسيًا مع الكتلة (m)."} />
                    <SmartTextRenderer as="div" text={"**أي أن الجسم ذا الكتلة الأكبر يمتلك طاقة حركية أقل.**"} />
                    <SmartTextRenderer text={"مثال: شاحنة وسيارة صغيرتان تتحركان بنفس الزخم الخطي. لإيقافهما، تحتاج إلى نفس الدفع لأن التغير في الزخم $\\Delta p$ متساوٍ. لكن الشاحنة ذات الكتلة الأكبر تمتلك طاقة حركية أقل، وبالتالي فإن الضرر الناتج عنها سيكون أقل من السيارة الأسرع ذات الكتلة الأصغر التي تمتلك طاقة حركية أكبر."} />
                </div>
              </AlertDescription>
           </Alert>
            <Alert variant="destructive" className="border-yellow-500/50 text-yellow-800 dark:text-yellow-300 [&>svg]:text-yellow-600 dark:[&>svg]:text-yellow-400 bg-yellow-50">
              <Satellite className="h-4 w-4" />
              <AlertTitle className="font-bold text-yellow-700 dark:text-yellow-500">مثال تطبيقي: القمر الصناعي</AlertTitle>
              <AlertDescription>
                <div className='space-y-2'>
                    <SmartTextRenderer as="div" text={"قمر صناعي يدور حول الأرض في مسار دائري بسرعة ثابتة المقدار:"} />
                    <SmartTextRenderer as="div" text={"- **طاقته الحركية**  $K=\\frac{1}{2}mv^2$ ثابتة لأن كتلته (m) ومقدار سرعته (v) ثابتان."} />
                    <SmartTextRenderer as="div" text={"- **زخمه الخطي** ($\\vec{p}=m\\vec{v}$) متغير لأن اتجاه متجه السرعة ($\\vec{v}$) يتغير باستمرار ليبقى مماسياً للمسار الدائري."} />
                </div>
              </AlertDescription>
           </Alert>
      </div>
    </div>
  );
}
