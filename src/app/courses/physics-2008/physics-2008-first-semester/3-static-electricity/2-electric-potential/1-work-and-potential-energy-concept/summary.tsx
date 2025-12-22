
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
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
        title: "الشغل المبذول بواسطة قوة ثابتة (W)",
        formula: "W = Fd\\cos(\\theta)",
        description: "هو حاصل الضرب النقطي للقوة (F) في الإزاحة (d). وهو كمية قياسية وحدتها الجول (J).\n• **شغل موجب:** عندما تكون القوة في نفس اتجاه الحركة ($\\theta < 90^\\circ$).\n• **شغل سالب:** عندما تكون القوة عكس اتجاه الحركة ($\\theta > 90^\\circ$)."
    },
    {
        title: "شغل القوة الكهربائية وعلاقته بالطاقة",
        formula: "W_{elec} = -\\Delta U_E = \\Delta K",
        description: "عندما تتحرك شحنة تحت تأثير القوة الكهربائية فقط:\n• **يقلل** من طاقة الوضع الكهربائية ($\\Delta U_E$ سالب).\n• **يزيد** من طاقتها الحركية ($\\Delta K$ موجب)."
    },
    {
        title: "شغل القوة الخارجية (بسرعة ثابتة)",
        formula: "W_{ext} = \\Delta U_E \\quad (\\text{if } \\Delta K = 0)",
        description: "لتحريك شحنة بسرعة ثابتة، يجب تطبيق قوة خارجية ($F_{ext}$) تساوي القوة الكهربائية وتعاكسها. هذا الشغل المبذول بواسطة القوة الخارجية يتحول بالكامل إلى طاقة وضع كهربائية، بينما يبقى التغير في الطاقة الحركية صفرًا. الشغل الكلي على الشحنة يكون صفرًا."
    }
];

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
                {law.formula && 
                  <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                      <BlockMath math={law.formula} />
                  </div>
                }
                <CardDescription className="text-right">
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تذكير: اتجاه القوة الكهربائية</AlertTitle>
          <AlertDescription>
           - **الشحنة الموجبة:** تتأثر بقوة بنفس اتجاه المجال الكهربائي (E).\n- **الشحنة السالبة:** تتأثر بقوة عكس اتجاه المجال الكهربائي (E).
          </AlertDescription>
        </Alert>
         <Alert variant="destructive">
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مبرهنة الشغل-الطاقة الحركية</AlertTitle>
          <AlertDescription>
           تذكر دائمًا أن الشغل الكلي المبذول على جسم يساوي التغير في طاقته الحركية: $W_{total} = \\Delta K$.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
