import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, Zap } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
  return (
    <div className="space-y-6">
      <Alert className="bg-primary/10 border-primary">
        <Zap className="h-5 w-5 text-primary" />
        <AlertTitle className="text-primary font-bold text-lg mb-2">فرق الجهد المتردد</AlertTitle>
        <AlertDescription className="text-base leading-relaxed text-right">
          يوضح هذا الدرس مفهوم الجهد المتردد (AC) وكيفية توليده من المولد، مع تعريف القيم العظمى، الزمن الدوري، التردد والزاوية.
        </AlertDescription>
      </Alert>

      <Card className="border-2 border-indigo-500/20">
        <CardHeader className="bg-indigo-500/10 pb-4">
          <CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
            <Activity className="text-indigo-500" />
            تعريف الجهد المتردد
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-4 space-y-3 text-base leading-relaxed text-right text-foreground">
          <p>الجهد اللحظي (v): <InlineMath math="V = V_{max} \sin(\omega t)" /></p>
          <p>القيمة العظمى (V_{max}) هي أقصى قيمة للجهد.</p>
          <p>التردد (f) وعدد الدورات في الثانية: <InlineMath math="f = 1/T" /></p>
          <p>الزاوية الدورانية (\omega): <InlineMath math="\omega = 2\pi f" /></p>
        </CardContent>
      </Card>
    </div>
  );
}
