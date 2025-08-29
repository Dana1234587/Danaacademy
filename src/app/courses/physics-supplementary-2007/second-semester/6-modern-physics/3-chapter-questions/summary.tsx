
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
              <CardTitle className="text-primary text-xl text-right">مراجعة شاملة للوحدة السادسة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    هذه الحصة تراجع المفاهيم الأساسية التي تمت تغطيتها في وحدة الفيزياء الحديثة، بما في ذلك:
                     <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><b>تكمية الطاقة:</b> فرضية بلانك، طاقة الفوتون ($E=hf$).</li>
                        <li><b>الظاهرة الكهروضوئية:</b> اقتران الشغل، تردد العتبة، معادلة أينشتاين.</li>
                        <li><b>ظاهرة كومبتون:</b> الطبيعة الجسيمية للفوتون، حفظ الزخم والطاقة.</li>
                        <li><b>نموذج بور:</b> تكمية المدارات والطاقة، متسلسلات الطيف.</li>
                        <li><b>فرضية دي بروي:</b> الطبيعة الموجية للجسيمات ($\\lambda = h/p$).</li>
                    </ul>
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مفتاح النجاح</AlertTitle>
          <AlertDescription>
           النجاح في هذه الوحدة يعتمد على فهم الطبيعة المزدوجة للضوء والمادة، والقدرة على تطبيق مبادئ الحفظ (الطاقة والزخم) في السياق الكمومي، واستيعاب مفهوم تكمية الكميات الفيزيائية.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
