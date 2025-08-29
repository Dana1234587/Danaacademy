
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';

const laws = [
    {
        title: "الثنائي (الوصلة p-n)",
        description: "هو عنصر إلكتروني يتكون من قطعة من النوع p موصولة بقطعة من النوع n. يسمح للتيار بالمرور في اتجاه واحد بشكل أساسي."
    },
    {
        title: "الانحياز الأمامي للثنائي",
        description: "يتم توصيل القطب الموجب للبطارية بالجانب p، والقطب السالب بالجانب n. هذا يقلل من منطقة الاستنزاف ويسمح بمرور تيار كبير."
    },
    {
        title: "الانحياز العكسي للثنائي",
        description: "يتم توصيل القطب الموجب للبطارية بالجانب n، والقطب السالب بالجانب p. هذا يزيد من اتساع منطقة الاستنزاف ويمنع مرور التيار (يمر تيار صغير جدًا لا يذكر)."
    },
    {
        title: "الترانزستور",
        description: "هو عنصر إلكتروني يتكون من ثلاث طبقات من أشباه الموصلات (npn أو pnp). يمكن استخدامه كمفتاح إلكتروني أو كمضخم للتيار."
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
          <AlertTitle className="font-bold">ملاحظة هامة</AlertTitle>
          <AlertDescription>
           أهم خاصية للثنائي هي قدرته على تقويم التيار، أي السماح له بالمرور في اتجاه واحد فقط. وأهم خاصية للترانزستور هي قدرته على تضخيم الإشارات الصغيرة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
