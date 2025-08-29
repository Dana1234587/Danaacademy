
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">مراجعة شاملة للدرس الأول</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    هذه الحصة تراجع المفاهيم الأساسية التي تمت تغطيتها في الدرس الأول، بما في ذلك:
                     <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><b>التدفق المغناطيسي:</b> تعريفه، قانونه، والعوامل المؤثرة عليه.</li>
                        <li><b>قانون فارادي:</b> العلاقة بين القوة الدافعة الحثية ومعدل تغير التدفق.</li>
                        <li><b>قانون لنز:</b> تحديد اتجاه التيار الحثي لمقاومة التغير.</li>
                        <li><b>القوة الدافعة الحركية:</b> حالة خاصة لتولد الجهد في موصل متحرك.</li>
                        <li><b>الحث الذاتي والمحثات:</b> مقاومة المحث للتغير في التيار.</li>
                        <li><b>المحولات الكهربائية:</b> مبدأ عملها وأنواعها وقوانينها.</li>
                    </ul>
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مفتاح النجاح</AlertTitle>
          <AlertDescription>
           النجاح في هذا الدرس يعتمد على فهم العلاقة بين تغير التدفق وتولد القوة الدافعة الحثية، والقدرة على تطبيق القواعد (مثل قاعدة اليد اليمنى وقانون لنز) لتحديد الاتجاهات بشكل صحيح.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
