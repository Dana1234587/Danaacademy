import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Target, Sigma, Calculator, Activity } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6">
            <Alert className="bg-primary/10 border-primary">
                <Target className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary font-bold text-lg mb-2">كيف نحل مسائل الحث الذاتي؟</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    يتطلب حل مسائل الحث الذاتي فهماً للمتغيرات المتعلقة بالملف (عدد اللفات، المساحة، الطول) والمتغيرات المتعلقة بالتيار والزمن، والربط بينها باستخدام ثلاثة قوانين رئيسية.
                </AlertDescription>
            </Alert>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="border-2 border-indigo-500/20">
                    <CardHeader className="bg-indigo-500/10 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2 text-indigo-700 dark:text-indigo-400">
                            <Sigma className="text-indigo-500" />
                            1. المعطيات الهندسية للملف
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3 text-base leading-relaxed text-right text-foreground">
                        <p>إذا أعطاك السؤال (طول الملف <InlineMath math="\ell" />، عدد اللفات <InlineMath math="N" />، مساحة المقطع <InlineMath math="A" />)، فإن أول خطوة غالباً هي حساب معامل الحث الذاتي:</p>
                        <div className="bg-background/50 border p-3 rounded-lg flex justify-center">
                            <BlockMath math="L = \frac{\mu_0 N^2 A}{\ell}" />
                        </div>
                        <p className="text-sm text-muted-foreground mt-2">
                            * تأكد من تحويل الوحدات: الطول بالمتر (m)، والمساحة بالمتر المربع (m²). النفاذية للفراغ <InlineMath math="\mu_0 = 4\pi \times 10^{-7}" />.
                        </p>
                    </CardContent>
                </Card>

                <Card className="border-2 border-fuchsia-500/20">
                    <CardHeader className="bg-fuchsia-500/10 pb-4">
                        <CardTitle className="text-lg flex items-center gap-2 text-fuchsia-700 dark:text-fuchsia-400">
                            <Calculator className="text-fuchsia-500" />
                            2. علاقة الربط لحالة الاستقرار
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-3 text-base leading-relaxed text-right text-foreground">
                        <p>إذا كان التيار ثابتاً (مستقراً) وأردت إيجاد التدفق المغناطيسي الذي يخترق لفة واحدة (<InlineMath math="\Phi_B" />) أو إيجاد المحاثة، استخدم:</p>
                        <div className="bg-background/50 border p-3 rounded-lg flex justify-center">
                            <BlockMath math="L \cdot I = N \cdot \Phi_B" />
                        </div>
                        <p className="text-muted-foreground mt-2 font-semibold">ملاحظات خطيرة:</p>
                        <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                            <li>هذا القانون يطبق عند أي لحظة معينة.</li>
                            <li>التدفق الكلي الذي يخترق الملف بالكامل هو <InlineMath math="N \Phi_B" />.</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-2 border-emerald-500/20">
                <CardHeader className="bg-emerald-500/10 pb-4">
                    <CardTitle className="text-lg flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <Activity className="text-emerald-500 h-5 w-5" />
                        3. قانون القوة الدافعة الحثية الذاتية (التيار المتغير)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <p className="text-foreground">
                        يُستخدم هذا القانون عندما يذكر لك: (تناقص التيار، نمو التيار، جرى فتح الدارة، أو إغلاقها) خلال فترة زمنية <InlineMath math="\Delta t" />:
                    </p>
                    <div className="bg-background/50 border p-4 rounded-lg flex flex-col items-center">
                        <BlockMath math="\varepsilon_L = -L \frac{\Delta I}{\Delta t} = -L \frac{I_2 - I_1}{\Delta t}" />
                    </div>
                    
                    <div className="bg-muted p-4 rounded-lg space-y-3">
                        <h4 className="font-bold text-foreground">إشارات مهمة للتعويض:</h4>
                        <ul className="list-disc list-inside text-foreground space-y-2">
                            <li>إذا <strong>تلاشى</strong> التيار للصفر: يكون <InlineMath math="I_2 = 0" />، وبالتالي <InlineMath math="\Delta I" /> سيكون سالباً، وتكون <InlineMath math="\varepsilon_L" /> <span className="text-emerald-600 font-bold">موجبة</span> (طردية).</li>
                            <li>إذا <strong>نمى</strong> التيار (ازداد): يكون <InlineMath math="\Delta I" /> موجباً، وتكون <InlineMath math="\varepsilon_L" /> <span className="text-rose-600 font-bold">سالبة</span> (عكسية).</li>
                            <li>اذا كان <InlineMath math="\frac{\Delta I}{\Delta t}" /> (معدل تغير التيار) معطى كرقم واحد، انتبه للكلمة: "يتناقص" تعني أن المعدل سالب.</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
