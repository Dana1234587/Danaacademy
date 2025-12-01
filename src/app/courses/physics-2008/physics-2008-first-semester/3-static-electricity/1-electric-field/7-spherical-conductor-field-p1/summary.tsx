
'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

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
        title: "حساب المجال الكهربائي لكرة موصلة مشحونة",
        description: "يختلف حساب المجال الكهربائي حسب موقع النقطة بالنسبة للكرة (نصف قطرها R):",
        points: [
            {
                heading: "1. داخل الموصل (r < R)",
                formula: "E = 0",
                details: "المجال الكهربائي داخل أي موصل في حالة اتزان يساوي صفرًا دائمًا."
            },
            {
                heading: "2. على سطح الموصل (r = R)",
                formula: "E = k \\frac{q}{R^2}",
                details: "يكون المجال على السطح في قيمته العظمى ويُحسب كما لو كانت الشحنة كلها مركزة في المركز."
            },
            {
                heading: "3. خارج الموصل (r > R)",
                formula: "E = k \\frac{q}{r^2}",
                details: "يُحسب المجال خارج الكرة كما لو كانت شحنة نقطية، حيث r هي المسافة من مركز الكرة إلى النقطة."
            }
        ]
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
                {law.description && <CardDescription className="text-right pt-2">{law.description}</CardDescription>}
            </CardHeader>
            <CardContent className="space-y-4">
                {law.points?.map((point, pIndex) => (
                     <div key={pIndex} className="p-3 bg-background/50 rounded-lg border">
                        <h4 className="font-semibold text-foreground text-right">{point.heading}</h4>
                         <div dir="ltr" className="bg-primary/5 p-3 rounded-lg text-center my-2">
                            <BlockMath math={point.formula} />
                        </div>
                        <p className="text-sm text-muted-foreground text-right">{point.details}</p>
                    </div>
                ))}
            </CardContent>
          </Card>
        ))}

        <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">حساب البعد عن المركز (r)</CardTitle>
            </CardHeader>
            <CardContent>
                <CardDescription className="text-right">
                    انتبه جيدًا لنص السؤال. إذا أعطاك "البعد عن السطح" (d)، فيجب عليك إضافة نصف قطر الكرة (R) إليه للحصول على البعد عن المركز (r) المستخدم في القانون.
                </CardDescription>
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center mt-4">
                    <BlockMath math={"r = R + d"} />
                </div>
            </CardContent>
        </Card>
        
      </div>
    </div>
  );
}
