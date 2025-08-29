
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "حزم الطاقة",
        description: "في المواد الصلبة، تنقسم مستويات الطاقة إلى حزم. حزمة التكافؤ (Valence Band) مملوءة بالإلكترونات، وحزمة التوصيل (Conduction Band) فارغة أو شبه فارغة. تفصل بينهما فجوة طاقة ممنوعة (Energy Gap)."
    },
    {
        title: "شبه الموصل من النوع السالب (n-type)",
        description: "يتم إشابته بذرات مانحة (خماسية التكافؤ مثل الفسفور). تكون حاملات الشحنة الأغلبية هي الإلكترونات الحرة في حزمة التوصيل."
    },
    {
        title: "شبه الموصل من النوع الموجب (p-type)",
        description: "يتم إشابته بذرات متقبلة (ثلاثية التكافؤ مثل البورون). تكون حاملات الشحنة الأغلبية هي الفجوات (Holes) في حزمة التكافؤ."
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
          <AlertTitle className="font-bold">الإشابة (Doping)</AlertTitle>
          <AlertDescription>
           الإشابة هي عملية إضافة شوائب بشكل متعمد إلى شبه موصل نقي لزيادة موصليته الكهربائية بشكل كبير والتحكم في نوع حاملات الشحنة الأغلبية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
