
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "قانون لنز",
        description: "ينص على أن: \"اتجاه التيار الحثي المتولد في ملف يكون بحيث ينتج مجالًا مغناطيسيًا حثيًا يقاوم التغير في التدفق المغناطيسي الذي سببه\"."
    },
    {
        title: "حفظ الطاقة",
        description: "قانون لنز هو تطبيق مباشر لمبدأ حفظ الطاقة. فالشغل المبذول لمقاومة القوة المغناطيسية الناتجة عن التيار الحثي هو الذي يتحول إلى طاقة كهربائية في الدارة."
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
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">استراتيجية تطبيق قانون لنز</AlertTitle>
          <AlertDescription>
           <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>حدد اتجاه المجال المغناطيسي الأصلي.</li>
                <li>حدد هل التدفق المغناطيسي عبر الحلقة يزداد أم يقل.</li>
                <li>حدد اتجاه المجال المغناطيسي الحثي الذي يجب أن تولده الحلقة لمقاومة هذا التغير (إذا كان التدفق يزداد، يقاومه بمجال معاكس. إذا كان يقل، يساعده بمجال في نفس الاتجاه).</li>
                <li>استخدم قاعدة اليد اليمنى لتحديد اتجاه التيار الحثي الذي ينتج هذا المجال الحثي.</li>
           </ol>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
