
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قانون أوم",
        formula: "V = IR",
        description: "ينص على أن فرق الجهد (V) عبر موصل يتناسب طرديًا مع التيار (I) المار فيه، وثابت التناسب هو المقاومة (R). هذا القانون هو حجر الزاوية في تحليل الدارات الكهربائية."
    },
    {
        title: "الرسم البياني لقانون أوم (V-I)",
        formula: "R = \\frac{\\Delta V}{\\Delta I} = \\text{الميل}",
        description: "لموصل أومي، تكون العلاقة بين الجهد والتيار خطية. ميل الخط المستقيم في الرسم البياني للجهد (المحور الصادي) مقابل التيار (المحور السيني) يمثل قيمة المقاومة."
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
          <AlertTitle className="font-bold">تذكر</AlertTitle>
          <AlertDescription>
           قانون أوم يربط بين الكميات الثلاث الأساسية في الدارة: الجهد، التيار، والمقاومة. بمعرفة أي اثنتين، يمكنك دائمًا حساب الثالثة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

    