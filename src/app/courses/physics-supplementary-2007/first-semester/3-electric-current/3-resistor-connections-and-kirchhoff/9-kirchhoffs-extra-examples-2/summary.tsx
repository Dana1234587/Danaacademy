
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "مراجعة شاملة لقواعد كيرشوف",
        description: "تعتمد الطريقة على تطبيق قاعدتي كيرشوف بشكل منهجي للحصول على نظام من المعادلات الخطية التي يمكن حلها لإيجاد التيارات المجهولة في الدارة."
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
          <AlertTitle className="font-bold">نصائح لحل المسائل المعقدة</AlertTitle>
          <AlertDescription>
           عندما تبدو الدارة معقدة، لا ترتبك. قم بترقيم الوصلات وتسمية التيارات بشكل منهجي. اختر مساراتك المغلقة بعناية، وحاول أن تجعل كل معادلة جديدة بسيطة قدر الإمكان. الدقة في تطبيق قاعدة الإشارات هي مفتاح الحل الصحيح.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
