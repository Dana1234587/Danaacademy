
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl">حفظ الزخم الخطي في الانفجارات</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={"\\Sigma \\vec{p}_{initial} = \\Sigma \\vec{p}_{final}"} />
                </div>
                <CardDescription>
                    في نظام معزول (مثل قذيفة تنفجر)، يكون الزخم الكلي قبل الانفجار مساوياً للزخم الكلي بعده. إذا كان الجسم ساكنًا في البداية، فإن الزخم الكلي النهائي يساوي صفرًا، أي أن زخم الأجزاء الناتجة يكون متساويًا في المقدار ومتعاكسًا في الاتجاه.
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تذكر</AlertTitle>
          <AlertDescription>
            الأسئلة المتقدمة غالبًا ما تربط بين أكثر من مفهوم، مثل حفظ الزخم وحفظ الطاقة أو قوانين الحركة. مفتاح الحل هو تحليل السؤال بعناية وتحديد المبادئ الفيزيائية المطبقة في كل مرحلة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
