
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "تحليل البندول القذفي",
        formula: "",
        description: "يتم تحليل حركة البندول القذفي على مرحلتين:\n1. مرحلة التصادم: تصادم عديم المرونة، نطبق فيه مبدأ حفظ الزخم الخطي لإيجاد السرعة المشتركة بعد التصادم. ($p_i = p_f$)\n2. مرحلة الارتفاع: حركة بندول، نطبق فيها مبدأ حفظ الطاقة الميكانيكية لربط السرعة بعد التصادم بأقصى ارتفاع يصل إليه النظام. ($K_f = U_g$)"
    },
    {
        title: "مهد نيوتن",
        formula: "",
        description: "مثال على التصادمات المرنة تقريبًا. عندما تصطدم كرة واحدة، ترتد كرة واحدة من الطرف الآخر بنفس السرعة تقريبًا. هذا هو الحل الوحيد الذي يحقق حفظ الزخم الخطي وحفظ الطاقة الحركية معًا."
    },
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
               {law.formula && (
                <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                    <BlockMath math={law.formula} />
                </div>
                )}
                <CardDescription className="text-right">
                    {law.description}
                </CardDescription>
            </CardContent>
          </Card>
        ))}
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           لا تخلط بين المبدأين! حفظ الزخم يُطبق **خلال** التصادم. حفظ الطاقة الميكانيكية يُطبق **بعد** التصادم أثناء حركة النظام كبندول. لا تكون الطاقة الحركية محفوظة خلال التصادم في البندول القذفي.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
