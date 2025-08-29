
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "مبدأ التراكب للمجالات المغناطيسية",
        formula: "\\vec{B}_{total} = \\vec{B}_1 + \\vec{B}_2 + \\dots",
        description: "المجال المغناطيسي المحصل عند نقطة ما هو المجموع المتجهي للمجالات الناتجة عن جميع المصادر (التيارات) المؤثرة عند تلك النقطة."
    },
    {
        title: "شروط نقطة انعدام المجال",
        formula: "\\vec{B}_{total} = 0 \\implies \\vec{B}_1 = -\\vec{B}_2",
        description: "لكي ينعدم المجال المحصل، يجب أن يكون هناك مجالان على الأقل متساويان في المقدار ومتعاكسان في الاتجاه عند تلك النقطة."
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
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية الحل</AlertTitle>
          <AlertDescription>
           1. حدد اتجاه المجال من كل مصدر عند المنطقة المطلوبة. <br/>
           2. حدد المنطقة التي يمكن أن يكون فيها المجالان متعاكسين. <br/>
           3. طبّق شرط تساوي المقدار ($B_1 = B_2$) في تلك المنطقة لإيجاد المسافة المجهولة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
