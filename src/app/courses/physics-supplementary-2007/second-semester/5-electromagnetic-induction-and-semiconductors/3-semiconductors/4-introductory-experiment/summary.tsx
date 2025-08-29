
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "سلوك شبه الموصل مع الحرارة",
        description: "على عكس الفلزات، تقل مقاومة أشباه الموصلات بشكل كبير عند تسخينها، لأن الحرارة توفر الطاقة اللازمة لتحرير المزيد من الإلكترونات وجعلها تشارك في التوصيل."
    },
    {
        title: "سلوك الثنائي (الدايود)",
        description: "يسمح الثنائي للتيار بالمرور في اتجاه واحد فقط (الانحياز الأمامي) ويمنعه تقريبًا في الاتجاه المعاكس (الانحياز العكسي). هذه الخاصية هي أساس استخدامه في تقويم التيار."
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
          <AlertTitle className="font-bold">ملاحظة عملية</AlertTitle>
          <AlertDescription>
           التجارب العملية تساعد على ترسيخ الفهم النظري. مشاهدة كيف يتصرف الثنائي أو كيف تتغير مقاومة الثرمستور (مقاومة حرارية من شبه موصل) يؤكد المفاهيم التي تمت دراستها.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
