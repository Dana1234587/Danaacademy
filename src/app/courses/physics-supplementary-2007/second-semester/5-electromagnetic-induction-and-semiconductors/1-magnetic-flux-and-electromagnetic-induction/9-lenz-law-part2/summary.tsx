
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "مراجعة قانون لنز",
        description: "التيار الحثي المتولد يقاوم دائمًا التغير في التدفق المغناطيسي الذي أحدثه."
    },
    {
        title: "حالات المقاومة",
        description: "1. **عند زيادة التدفق:** يتولد مجال حثي معاكس للمجال الأصلي (قوة تنافر).\n2. **عند نقصان التدفق:** يتولد مجال حثي في نفس اتجاه المجال الأصلي (قوة تجاذب)."
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
                <CardDescription className="text-right">
                    {law.description.split('\n').map((line, i) => <p key={i}>{line}</p>)}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">تحديد اتجاه التيار</AlertTitle>
          <AlertDescription>
           بعد تحديد اتجاه المجال المغناطيسي الحثي المطلوب، استخدم قاعدة اليد اليمنى (للملفات) لتحديد اتجاه التيار الذي سينتج هذا المجال. لف أصابعك مع التيار، فيشير إبهامك إلى اتجاه المجال (القطب الشمالي).
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
