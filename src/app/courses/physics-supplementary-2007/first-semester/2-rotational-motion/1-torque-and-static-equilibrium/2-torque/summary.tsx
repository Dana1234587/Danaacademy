
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
        title: "تعريف العزم ($\\vec{\\tau}$)",
        formula: "\\vec{\\tau} = \\vec{r} \\times \\vec{F}",
        description: "العزم هو حاصل الضرب المتجهي لمتجه الموضع ($\\vec{r}$)، الذي يمتد من محور الدوران إلى نقطة تأثير القوة، في متجه القوة ($\\vec{F}$)."
    },
    {
        title: "مقدار العزم",
        formula: "\\tau = rF\\sin(\\theta)",
        description: "حيث (r) هو مقدار متجه الموضع، (F) هو مقدار القوة، و ($\\theta$) هي الزاوية بين المتجهين $\\vec{r}$ و $\\vec{F}$."
    },
    {
        title: "ذراع القوة ($r_{\\perp}$)",
        formula: "\\tau = r_{\\perp} F",
        description: "يمكن أيضًا حساب العزم بضرب مقدار القوة (F) في ذراع القوة ($r_{\\perp}$)، وهو المسافة العمودية من محور الدوران إلى خط عمل القوة. ($r_{\\perp} = r\\sin(\\theta)$)."
    }
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right"><SmartTextRenderer as="div" text={law.title} /></CardTitle>
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
          <AlertTitle className="font-bold">قاعدة اليد اليمنى</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'لتحديد اتجاه متجه العزم، وجّه أصابع يدك اليمنى باتجاه متجه الموضع ($r$) ثم قم بلفها باتجاه متجه القوة ($F$) عبر الزاوية الأصغر. سيشير إبهامك إلى اتجاه العزم. (عكس عقارب الساعة موجب، مع عقارب الساعة سالب).'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
