
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "القوة النووية القوية",
        description: "هي القوة الأساسية التي تربط البروتونات والنيوترونات معًا داخل النواة. خصائصها:\n• أقوى قوة في الطبيعة.\n• قصيرة المدى جدًا (تعمل فقط داخل النواة).\n• لا تعتمد على الشحنة (تؤثر بين بروتون-بروتون، نيوترون-نيوترون، وبروتون-نيوترون بنفس المقدار)."
    },
    {
        title: "نطاق الاستقرار",
        description: "هو منطقة على الرسم البياني لعدد النيوترونات (N) مقابل عدد البروتونات (Z) تحتوي على جميع الأنوية المستقرة. الأنوية الواقعة خارج هذا النطاق تكون غير مستقرة وتخضع للاضمحلال الإشعاعي."
    },
    {
        title: "نسبة N/Z",
        description: "للأنوية الخفيفة المستقرة، تكون النسبة N/Z ≈ 1. للأنوية الثقيلة، تزداد النسبة إلى حوالي 1.5 للتغلب على التنافر الكهرومغناطيسي المتزايد بين البروتونات."
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
          <AlertTitle className="font-bold">مسارات الاستقرار</AlertTitle>
          <AlertDescription>
           - **فوق النطاق (فائض نيوترونات):** اضمحلال بيتا السالبة (n → p + e⁻).<br/>
           - **تحت النطاق (فائض بروتونات):** اضمحلال بيتا الموجبة (p → n + e⁺) أو الأسر الإلكتروني.<br/>
           - **الأنوية الثقيلة جدًا (Z>83):** اضمحلال ألفا.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
