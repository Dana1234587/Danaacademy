
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
        title: "القوة الدافعة الكهربائية ($\\varepsilon$)",
        formula: "\\varepsilon = \\frac{W}{q}",
        description: "هي الشغل الذي تبذله البطارية لنقل وحدة الشحنات الموجبة من القطب السالب إلى الموجب داخلها، أو هي فرق الجهد بين قطبي البطارية عندما تكون الدائرة مفتوحة."
    },
    {
        title: "فرق الجهد بين قطبي البطارية (حالة تفريغ)",
        formula: "V_{ab} = \\varepsilon - Ir",
        description: "عندما تنتج البطارية تيارًا (تفريغ)، يكون فرق الجهد بين طرفيها (Vab) أقل من قوتها الدافعة ($\\varepsilon$) بمقدار الهبوط في الجهد عبر مقاومتها الداخلية (r)."
    },
    {
        title: "فرق الجهد بين قطبي البطارية (حالة شحن)",
        formula: "V_{ab} = \\varepsilon + Ir",
        description: "عندما يتم شحن البطارية، يكون التيار داخلًا إلى القطب الموجب، ويكون فرق الجهد بين طرفيها أكبر من قوتها الدافعة."
    }
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {laws.map((law, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right"><SmartTextRenderer text={law.title} /></CardTitle>
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
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
            <SmartTextRenderer as="div" text={'القوة الدافعة ($\\varepsilon$) والمقاومة الداخلية ($r$) هما خاصيتان ثابتتان للبطارية نفسها. أما فرق الجهد الطرفي ($Vab$) والتيار ($I$) فهما متغيران ويعتمدان على الدارة الخارجية الموصولة بالبطارية.'} />
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
