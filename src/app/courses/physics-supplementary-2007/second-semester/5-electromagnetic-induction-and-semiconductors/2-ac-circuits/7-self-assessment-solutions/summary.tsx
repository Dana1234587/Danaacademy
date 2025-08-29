
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
              <CardTitle className="text-primary text-xl text-right">مراجعة شاملة للدرس الثاني</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    هذه الحصة تراجع المفاهيم الأساسية التي تمت تغطيتها في درس دارات التيار المتردد، بما في ذلك:
                     <ul className="list-disc list-inside mt-2 space-y-1">
                        <li><b>القيم الفعالة:</b> حساب $V_{rms}$ و $I_{rms}$.</li>
                        <li><b>المفاعلة:</b> حساب $X_L$ و $X_C$ وتأثير التردد عليهما.</li>
                        <li><b>المعاوقة:</b> حساب الممانعة الكلية Z لدارة RLC.</li>
                        <li><b>الرنين:</b> شروط وخصائص الدارة عند تردد الرنين.</li>
                     </ul>
                </CardDescription>
            </CardContent>
          </Card>
        
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">مفتاح النجاح</AlertTitle>
          <AlertDescription>
           النجاح في هذا الدرس يعتمد على التمييز بين المقاومة والمفاعلة والمعاوقة، وفهم كيف يتغير سلوك كل من المحث والمواسع مع تغير تردد المصدر، بالإضافة إلى فهم حالة الرنين المميزة.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
