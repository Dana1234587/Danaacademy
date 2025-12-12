
'use client';

import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info, Lightbulb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const processLine = (line: string) => {
        const parts = line.split(/(\$.*?\$)/g).filter(part => part);

        return parts.map((part, index) => {
            if (part.startsWith('$') && part.endsWith('$')) {
                const math = part.substring(1, part.length - 1).replace(/\\\\/g, '\\');
                return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={math} /></span>;
            } else {
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
        title: "الصيغة العامة لقانون نيوتن الثاني",
        formula: "\\Sigma \\vec{F} = \\frac{\\Delta \\vec{p}}{\\Delta t}",
        description: "تنص على أن محصلة القوى الخارجية المؤثرة على نظام تساوي المعدل الزمني للتغير في الزخم الخطي للنظام. هذه الصيغة صالحة دائمًا، حتى لو تغيرت كتلة النظام."
    },
    {
        title: "الحالة الخاصة (الكتلة الثابتة)",
        formula: "\\Sigma \\vec{F} = m\\vec{a}",
        description: "عندما تكون كتلة النظام ثابتة، يمكن تبسيط الصيغة العامة إلى الشكل الأكثر شيوعًا. حيث a هو تسارع الجسم."
    },
    {
        title: "اتجاه القوة والتغير في الزخم",
        formula: "\\vec{F} \\propto \\Delta\\vec{p}",
        description: "اتجاه القوة المحصلة يكون دائمًا بنفس اتجاه التغير في الزخم الخطي ($\\Delta\\vec{p}$)."
    }
];

const strategy = [
     {
        title: "استراتيجية الحل",
        steps: [
            {
                title: "الخطوة الأولى: حساب التغير في الزخم",
                description: `**إذا كانت كتلة الجسم ثابتة:**\nنستخدم العلاقة:\n$\\Delta \\vec{p} = m(\\vec{v}_f - \\vec{v}_i)$\nحيث:\n• $\\Delta \\vec{p}$ هو التغير في الزخم الخطي.\n• $m$ هي كتلة الجسم.\n• $\\vec{v}_f$ هي السرعة النهائية.\n• $\\vec{v}_i$ هي السرعة الابتدائية.\n\n**إذا كانت كتلة الجسم متغيرة:**\nنحسب الزخم الابتدائي والنهائي بشكل منفصل ثم نوجد الفرق.\n$\\vec{p}_i = m_i \\vec{v}_i$\n$\\vec{p}_f = m_f \\vec{v}_f$\n$\\Delta \\vec{p} = \\vec{p}_f - \\vec{p}_i$`
            },
            {
                title: "الخطوة الثانية: حساب محصلة القوة",
                formula: "\\Sigma \\vec{F} = \\frac{\\Delta\\vec{p}}{\\Delta t}",
                description: "قسّم التغير في الزخم الخطي على الفترة الزمنية للحصول على القوة المحصلة المتوسطة."
            }
        ]
    }
]

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right"><SmartTextRenderer as="div" text={law.title}/></CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}

        {strategy.map((s, index) => (
          <Card key={`strat-${index}`} className="shadow-md border-primary/20">
              <CardHeader>
                <CardTitle className="text-primary text-xl text-right">{s.title}</CardTitle>
              </CardHeader>
               <CardContent className="space-y-6">
                    {s.steps.map((step, stepIndex) => (
                        <div key={stepIndex} className="p-4 bg-muted/50 rounded-lg">
                            <h4 className="font-bold text-md text-foreground mb-2 text-right">{step.title}</h4>
                            {step.formula && (
                               <div dir="ltr" className="bg-primary/5 p-3 rounded-lg text-center mb-2">
                                  <BlockMath math={step.formula} />
                              </div>
                            )}
                            <div className="text-sm text-muted-foreground text-right"><SmartTextRenderer as="div" text={step.description} /></div>
                        </div>
                    ))}
                    <Alert variant="destructive">
                        <Info className="h-4 w-4" />
                        <AlertTitle className="font-bold">انتبه للإشارات!</AlertTitle>
                        <AlertDescription>
                            <SmartTextRenderer as="div" text={"عندما يرتد الجسم، ينعكس اتجاه سرعته، لذا يجب إعطاء السرعة النهائية إشارة معاكسة للسرعة الابتدائية (إذا كانت $v_i$ موجبة، تصبح $v_f$ سالبة)."} />
                        </AlertDescription>
                    </Alert>
               </CardContent>
          </Card>
        ))}

         <Alert>
          <Lightbulb className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة رياضية</AlertTitle>
          <AlertDescription>
           <SmartTextRenderer as="div" text={'الصيغة الدقيقة لقانون نيوتن الثاني هي أن القوة المحصلة هي مشتقة الزخم بالنسبة للزمن: $\\Sigma \\vec{F} = \\frac{d\\vec{p}}{dt}$. ولكن في التوجيهي، نتعامل مع القوة المتوسطة خلال فترة زمنية، لذا نستخدم صيغة المعدل: $\\Sigma \\vec{F} = \\frac{\\Delta\\vec{p}}{\\Delta t}$.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
