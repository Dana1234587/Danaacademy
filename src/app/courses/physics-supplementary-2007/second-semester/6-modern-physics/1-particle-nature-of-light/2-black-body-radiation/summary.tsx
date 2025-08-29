
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الجسم الأسود",
        description: "هو جسم مثالي يمتص جميع الإشعاعات الساقطة عليه، وهو أيضًا باعث مثالي للإشعاع عند تسخينه."
    },
    {
        title: "قانون فين للإزاحة",
        formula: "\\lambda_{max} T = \\text{constant}",
        description: "الطول الموجي الذي تكون عنده شدة الإشعاع عظمى ($\lambda_{max}$) يتناسب عكسيًا مع درجة الحرارة المطلقة (T) للجسم الأسود."
    },
    {
        title: "قانون ستيفان-بولتزمان",
        formula: "P = \\sigma A T^4",
        description: "القدرة الكلية (P) التي يشعها الجسم الأسود تتناسب طرديًا مع مساحة سطحه (A) ومع القوة الرابعة لدرجة حرارته المطلقة (T)."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">كارثة الأشعة فوق البنفسجية</AlertTitle>
          <AlertDescription>
           كانت فشل الفيزياء الكلاسيكية في تفسير منحنى إشعاع الجسم الأسود، حيث تنبأت بقيم لانهائية للإشعاع عند الترددات العالية. حل بلانك هذه المشكلة بافتراض تكمية الطاقة، مما مهد الطريق لولادة فيزياء الكم.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
