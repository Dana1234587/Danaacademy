
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "منحنى (القوة - الزمن)",
        points: [
            "المساحة تحت المنحنى = الدفع ($I = \\Delta p$)",
            "ميل الخط = لا يمثل كمية فيزيائية شائعة مباشرة."
        ]
    },
    {
        title: "منحنى (الزخم - الزمن)",
        points: [
            "المساحة تحت المنحنى = لا تمثل كمية فيزيائية شائعة مباشرة.",
            "ميل الخط = القوة المحصلة ($F_{net} = \\frac{\\Delta p}{\\Delta t}$)"
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
            <CardContent className="space-y-2">
                <ul className="list-disc list-inside text-right text-muted-foreground space-y-2">
                  {law.points.map((point, pIndex) => (
                    <li key={pIndex}>{point}</li>
                  ))}
                </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
