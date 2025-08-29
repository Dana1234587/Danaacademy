
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Info } from 'lucide-react';

export default function SummaryPage() {
  return (
    <div className="p-4 bg-muted/40 rounded-lg">
       <div className="space-y-6">
          <Card className="shadow-md">
            <CardHeader>
              <CardTitle className="text-primary text-xl text-right">مراجعة شروط الاتزان</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <CardDescription className="text-right">
                    تذكر دائمًا تطبيق الشرطين معًا:
                    <ol className="list-decimal list-inside mt-2 space-y-1">
                        <li><b>الاتزان الانتقالي:</b> $\Sigma F_x = 0$ و $\Sigma F_y = 0$. (مجموع القوى على كل محور يساوي صفر).</li>
                        <li><b>الاتزان الدوراني:</b> $\Sigma \tau = 0$ حول أي محور. (مجموع العزوم يساوي صفر).</li>
                    </ol>
                </CardDescription>
            </CardContent>
          </Card>
         <Alert>
          <Info className="h-4 w-4" />
          <AlertTitle className="font-bold">نقطة مهمة</AlertTitle>
          <AlertDescription>
           في مسائل السلالم، غالبًا ما يكون الحائط "أملس" (لا توجد قوة احتكاك، فقط قوة رد فعل عمودية)، بينما تكون الأرضية "خشنة" (توجد قوة احتكاك وقوة رد فعل عمودية). انتبه جيدًا لهذه التفاصيل في نص السؤال.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
