
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

const laws = [
    {
        title: "قانون الشغل-الطاقة للحركة الدورانية",
        formula: "W_{net} = \\Delta K_{rot} = \\frac{1}{2}I\\omega_f^2 - \\frac{1}{2}I\\omega_i^2",
        description: "الشغل الكلي المبذول بواسطة العزم المحصل على جسم دوار يساوي التغير في طاقته الحركية الدورانية."
    },
    {
        title: "مقارنة الحركة الدورانية بالخطية",
        formula: "K_{rot} = \\frac{1}{2}I\\omega^2 \\quad \\longleftrightarrow \\quad K_{lin} = \\frac{1}{2}mv^2",
        description: "الطاقة الحركية الدورانية تماثل الطاقة الحركية الخطية، حيث يحل عزم القصور الذاتي (I) محل الكتلة (m)، وتحل السرعة الزاوية (ω) محل السرعة الخطية (v)."
    },
    {
        title: "العوامل المؤثرة على الطاقة الحركية الدورانية",
        description: "تعتمد الطاقة الحركية الدورانية على عاملين رئيسيين:\n1. **عزم القصور الذاتي (I):** كلما زاد عزم القصور الذاتي، زادت الطاقة الحركية لنفس السرعة الزاوية.\n2. **مربع السرعة الزاوية (ω²):** تتناسب الطاقة طرديًا مع مربع السرعة الزاوية."
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
                    {law.description.split('\n').map((line, i) => <p key={i} className="mb-2">{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تأثير محور الدوران</AlertTitle>
          <AlertDescription>
           حتى لو كانت كتلة الجسم ثابتة، فإن تغيير محور الدوران يغير من قيمة عزم القصور الذاتي (I). وبما أن الطاقة الحركية الدورانية تعتمد على (I)، فإن تغيير محور الدوران سيؤدي إلى تغير الطاقة الحركية الدورانية للجسم حتى لو كان يدور بنفس السرعة الزاوية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
