
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "حفظ الزخم في بعد واحد",
        formula: "m_1 \\vec{v}_{1i} + m_2 \\vec{v}_{2i} = m_1 \\vec{v}_{1f} + m_2 \\vec{v}_{2f}",
        description: "الصيغة الأساسية لحل مسائل التصادمات والانفجارات في بعد واحد. تذكر أن السرعة كمية متجهة، لذا يجب الانتباه للإشارات."
    },
    {
        title: "حالة خاصة: الانفجار من السكون",
        formula: "\\vec{p}_{1f} + \\vec{p}_{2f} = 0 \\implies \\vec{p}_{1f} = -\\vec{p}_{2f}",
        description: "إذا كان الجسم ساكنًا في البداية ثم انفجر، فإن الزخم الكلي للأجزاء الناتجة يساوي صفرًا. أي أن زخم كل جزء يساوي سالب زخم الجزء الآخر."
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
          <AlertTitle className="font-bold">الطاقة الحركية</AlertTitle>
          <AlertDescription>
           لا تنسَ أن الزخم محفوظ دائمًا في النظام المعزول، لكن الطاقة الحركية ليست كذلك. تزداد الطاقة الحركية في الانفجارات وتقل في التصادمات غير المرنة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
