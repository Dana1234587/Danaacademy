
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "قاعدة كيرشوف الأولى (قاعدة الوصلة)",
        formula: "\\Sigma I_{in} = \\Sigma I_{out}",
        description: "مبدأ حفظ الشحنة: مجموع التيارات الداخلة إلى أي وصلة يساوي مجموع التيارات الخارجة منها."
    },
    {
        title: "قاعدة كيرشوف الثانية (قاعدة العروة)",
        formula: "\\Sigma (\\Delta V) = 0",
        description: "مبدأ حفظ الطاقة: المجموع الجبري للتغيرات في الجهد عبر أي مسار مغلق في الدارة يساوي صفرًا."
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
          <AlertTitle className="font-bold">استراتيجية الحل الكاملة</AlertTitle>
          <AlertDescription>
           <ol className="list-decimal list-inside mt-2 space-y-1">
                <li>حدد الوصلات والتيارات المجهولة وافترض اتجاهًا لكل تيار.</li>
                <li>طبّق قاعدة كيرشوف الأولى على (عدد الوصلات - 1) من الوصلات.</li>
                <li>اختر عددًا من المسارات المغلقة (العروات) المستقلة بحيث يكون مجموع عدد المعادلات مساويًا لعدد المجاهيل.</li>
                <li>طبّق قاعدة كيرشوف الثانية على كل مسار مغلق، مع الانتباه جيدًا لقاعدة الإشارات.</li>
                <li>حل نظام المعادلات رياضيًا لإيجاد قيم التيارات المجهولة.</li>
           </ol>
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
