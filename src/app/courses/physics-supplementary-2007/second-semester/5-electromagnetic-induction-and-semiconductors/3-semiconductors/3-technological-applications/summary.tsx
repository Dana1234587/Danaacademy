
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "تقويم التيار المتردد (Rectification)",
        description: "هي عملية تحويل التيار المتردد (AC) إلى تيار مستمر (DC). أبسط أشكالها هو مقوم نصف الموجة الذي يستخدم ثنائيًا واحدًا للسماح بمرور نصف الدورة فقط."
    },
    {
        title: "الترانزستور كمكبر",
        description: "عندما يعمل الترانزستور في المنطقة الفعالة، فإن تيارًا صغيرًا في القاعدة ($I_B$) يمكنه التحكم في تيار أكبر بكثير يمر بين الجامع والباعث ($I_C$). نسبة التضخيم هي $\\beta = I_C / I_B$."
    },
    {
        title: "الترانزستور كمفتاح",
        description: "يمكن استخدام الترانزستور كمفتاح إلكتروني. في منطقة القطع (لا يوجد تيار قاعدة)، يكون مغلقًا (OFF). في منطقة الإشباع (تيار قاعدة عالٍ)، يكون مفتوحًا (ON) ويسمح بمرور تيار الجامع."
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
          <AlertTitle className="font-bold">البوابات المنطقية</AlertTitle>
          <AlertDescription>
           يمكن استخدام الترانزستورات لبناء البوابات المنطقية الأساسية (مثل NOT, AND, OR) التي تشكل أساس المعالجات الرقمية وأجهزة الكمبيوتر.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
