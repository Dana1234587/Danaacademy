
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
        title: "الكميات الأساسية في الميكانيكا",
        items: [
            { name: 'الطول (Length)', symbol: 'm', unit: 'متر' },
            { name: 'الكتلة (Mass)', symbol: 'kg', unit: 'كيلوغرام' },
            { name: 'الزمن (Time)', symbol: 's', unit: 'ثانية' },
        ]
    },
    {
        title: "وحدات مشتقة هامة",
        items: [
            { name: 'السرعة (Velocity)', unit: 'm/s' },
            { name: 'القوة (Force) - نيوتن', unit: '$1 N = 1 kg \\cdot m/s^2$' },
            { name: 'الطاقة (Energy) - جول', unit: '$1 J = 1 N \\cdot m = 1 kg \\cdot m^2/s^2$' },
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
            </CardHeader>
            <CardContent>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                    {law.items.map((item, itemIndex) => (
                       <li key={itemIndex}>
                          <span className="font-bold text-foreground">{item.name}:</span>{' '}
                          <SmartTextRenderer as="span" text={item.unit} />
                          {item.symbol && <span className="text-sm"> ({item.symbol})</span>}
                       </li>
                    ))}
                </ul>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تجانس الوحدات</AlertTitle>
          <AlertDescription>
             <div className="space-y-2">
                <p>يجب أن تكون الوحدات على طرفي أي معادلة فيزيائية متجانسة (متطابقة).</p>
                <p><b>مثال:</b> قانون نيوتن الثاني: $F = ma$.</p>
                <p>وحدة القوة (F) هي النيوتن (N).</p>
                <p>وحدة الطرف الأيمن هي وحدة الكتلة (kg) مضروبة في وحدة التسارع (m/s²). إذن، $kg \\cdot m/s^2$.</p>
                <p>لذلك، نستنتج أن $1 N = 1 kg \\cdot m/s^2$. وهذا يؤكد صحة وتجانس المعادلة.</p>
             </div>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
