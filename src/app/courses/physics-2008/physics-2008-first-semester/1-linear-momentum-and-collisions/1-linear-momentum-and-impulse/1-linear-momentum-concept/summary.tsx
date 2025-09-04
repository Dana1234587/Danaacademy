
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const laws = [
    {
        title: "تعريف الزخم الخطي ($\\vec{p}$)",
        formula: "\\vec{p} = m \\cdot \\vec{v}",
        description: "الزخم الخطي هو حاصل ضرب كتلة الجسم (m) في سرعته المتجهة ($\\vec{v}$). وهو كمية فيزيائية متجهة، اتجاهها هو نفس اتجاه السرعة."
    },
    {
        title: "وحدة قياس الزخم الخطي",
        formula: "kg \\cdot m/s",
        description: "في النظام الدولي للوحدات (SI)، يُقاس الزخم بوحدة كيلوغرام متر لكل ثانية."
    },
    {
        title: "الزخم كمقياس لصعوبة الإيقاف",
        description: "يمكن اعتبار الزخم الخطي مقياسًا لمدى صعوبة إيقاف جسم متحرك. كلما زاد زخم الجسم (بسبب زيادة كتلته أو سرعته)، كان من الصعب إيقافه."
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl"><SmartTextRenderer as="div" text={law.title}/></CardTitle>
            </CardHeader>
            <CardContent>
                {law.formula && (
                     <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center mb-4">
                        <BlockMath math={law.formula} />
                    </div>
                )}
                <CardDescription>
                    <SmartTextRenderer text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة على الاتجاه</AlertTitle>
          <AlertDescription>
             <SmartTextRenderer as="div" text={"بشكل عام، نعتبر الحركة نحو اليمين (أو محور $x$ الموجب) ذات إشارة موجبة (+)، والحركة نحو اليسار (أو محور $x$ السالب) ذات إشارة سالبة (-)."} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
