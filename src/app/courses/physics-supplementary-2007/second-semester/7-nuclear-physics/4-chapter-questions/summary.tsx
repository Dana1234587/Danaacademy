
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
              <CardTitle className="text-primary text-xl text-right">مراجعة شاملة للوحدة السابعة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    هذه الحصة تراجع المفاهيم الأساسية التي تمت تغطيتها في وحدة الفيزياء النووية، بما في ذلك:
                     <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><b>بنية النواة:</b> البروتونات، النيوترونات، النظائر، نصف القطر والكثافة.</li>
                        <li><b>استقرار النواة:</b> القوة النووية القوية، طاقة الربط لكل نيوكليون.</li>
                        <li><b>الاضمحلال الإشعاعي:</b> أنواع اضمحلال ألفا، بيتا، وغاما.</li>
                        <li><b>النشاطية الإشعاعية:</b> قانون الاضمحلال، عمر النصف، وثابت الاضمحلال.</li>
                        <li><b>التفاعلات النووية:</b> الانشطار والاندماج وحفظ الكتلة والطاقة.</li>
                    </ul>
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مفتاح النجاح</AlertTitle>
          <AlertDescription>
           النجاح في هذه الوحدة يعتمد على فهم مبادئ الحفظ (العدد الذري، العدد الكتلي، الكتلة-الطاقة)، والتمييز بين أنواع الإشعاعات المختلفة وخصائصها، والقدرة على تطبيق قوانين النشاطية الإشعاعية لحل المسائل.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
