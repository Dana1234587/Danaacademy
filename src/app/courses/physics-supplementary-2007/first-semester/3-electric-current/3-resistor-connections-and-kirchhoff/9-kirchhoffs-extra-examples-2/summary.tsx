
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
              <CardTitle className="text-primary text-xl text-right">المبادئ الأساسية</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                  حل مسائل كيرشوف المعقدة يعتمد على نفس المبادئ الأساسية: حفظ الشحنة (قاعدة الوصلة) وحفظ الطاقة (قاعدة العروة).
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">نصيحة لحل المسائل المتقدمة</AlertTitle>
          <AlertDescription>
           عندما تبدو الدارة معقدة، لا ترتبك. قم بترقيم الوصلات وتسمية التيارات بشكل منهجي. اختر مساراتك المغلقة بعناية، وحاول أن تجعل كل معادلة جديدة بسيطة قدر الإمكان. الدقة في تطبيق قاعدة الإشارات هي مفتاح الحل الصحيح.
          </AlertDescription>
        </Alert>
        
        <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">تذكر دائمًا</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                  <ul className="list-disc list-inside space-y-2">
                    <li>عدد معادلات الوصلة المستقلة هو (عدد الوصلات - 1).</li>
                    <li>عدد معادلات العروة المطلوبة = (عدد التيارات المجهولة) - (عدد معادلات الوصلة المستقلة).</li>
                    <li>فرق الجهد بين نقطتين لا يعتمد على المسار.</li>
                  </ul>
                </CardDescription>
            </CardContent>
          </Card>
      </div>
    </div>
  );
}
