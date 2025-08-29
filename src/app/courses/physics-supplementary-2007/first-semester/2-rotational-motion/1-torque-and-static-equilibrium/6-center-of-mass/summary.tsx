
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

const laws = [
    {
        title: "الشرط الأول للاتزان (الاتزان الانتقالي)",
        formula: "\\Sigma \\vec{F} = 0",
        description: "يجب أن تكون محصلة (المجموع المتجهي) لجميع القوى الخارجية المؤثرة على الجسم تساوي صفرًا. هذا يضمن عدم وجود تسارع خطي."
    },
    {
        title: "الشرط الثاني للاتزان (الاتزان الدوراني)",
        formula: "\\Sigma \\vec{\\tau} = 0",
        description: "يجب أن تكون محصلة (المجموع الجبري) لجميع العزوم الخارجية المؤثرة على الجسم حول أي محور دوران تساوي صفرًا. هذا يضمن عدم وجود تسارع زاوي."
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
          <AlertTitle className="font-bold">استراتيجية حل مسائل الاتزان</AlertTitle>
          <AlertDescription>
           1. ارسم مخطط الجسم الحر موضحًا جميع القوى. <br/>
           2. طبّق شرط الاتزان الانتقالي ($\Sigma F_x = 0$, $\Sigma F_y = 0$). <br/>
           3. اختر محور دوران مناسب (يفضل أن يمر بأكبر عدد من القوى المجهولة) وطبّق شرط الاتزان الدوراني ($\Sigma \tau = 0$). <br/>
           4. حل المعادلات الناتجة لإيجاد المجاهيل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
