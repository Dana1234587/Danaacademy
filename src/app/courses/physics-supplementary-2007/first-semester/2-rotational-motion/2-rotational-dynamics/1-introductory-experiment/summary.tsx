
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const concepts = [
    {
        title: "القصور الذاتي الدوراني (عزم القصور الذاتي)",
        description: "هو مقياس لممانعة الجسم لإحداث تغيير في حالته الحركية الدورانية. يعتمد على كتلة الجسم وكيفية توزيع تلك الكتلة حول محور الدوران."
    },
    {
        title: "العوامل المؤثرة على عزم القصور الذاتي",
        description: "1. **مقدار الكتلة:** كلما زادت الكتلة زاد القصور الذاتي.\n2. **توزيع الكتلة:** كلما كانت الكتلة أبعد عن محور الدوران، زاد القصور الذاتي.\n3. **موضع محور الدوران:** يتغير القصور الذاتي بتغير موضع المحور."
    },
];

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
        {concepts.map((concept, index) => (
          <Card key={index} className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">{concept.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    {concept.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مقارنة بالحركة الخطية</AlertTitle>
          <AlertDescription>
           عزم القصور الذاتي (I) في الحركة الدورانية يماثل دور الكتلة (m) في الحركة الخطية. كلاهما مقياس للقصور الذاتي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
