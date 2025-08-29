
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
        title: "رمز النواة",
        formula: "^A_Z X",
        description: "حيث X هو رمز العنصر، Z هو العدد الذري (عدد البروتونات)، و A هو العدد الكتلي (عدد البروتونات + عدد النيوترونات)."
    },
    {
        title: "النظائر (Isotopes)",
        description: "هي أنوية لنفس العنصر (لها نفس العدد الذري Z) ولكنها تختلف في عدد النيوترونات (N)، وبالتالي تختلف في العدد الكتلي (A). مثال: $^{12}_6C$ و $^{14}_6C$."
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
                    <SmartTextRenderer as="div" text={law.description} />
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">النيوكليونات</AlertTitle>
          <AlertDescription>
           يُطلق مصطلح "النيوكليونات" على الجسيمات المكونة للنواة، أي البروتونات والنيوترونات معًا.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
