import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lightbulb, Info, MoveRight, ArrowRight, ArrowLeft } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6">
            <Alert className="bg-primary/10 border-primary">
                <Lightbulb className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary font-bold text-lg mb-2">ما هو قانون لنز (Lenz's Law)؟</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    ينص قانون لنز على أن: <strong>"يكون اتجاه التيار الحثي المتولد في دارة مغلقة بحيث يولد مجالاً مغناطيسياً حثياً يقاوم التغير في التدفق المغناطيسي المسبب له"</strong>.
                    <br /><br />
                    <strong>الوظيفة الأساسية:</strong> يستخدم قانون لنز دائماً لتحديد اتجاه التيار الكهربائي الحثي المتولد في ملف.
                </AlertDescription>
            </Alert>

            <Card className="border-2 border-muted">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <MoveRight className="text-primary" />
                        حالات التطبيق 1: تقريب قطب مغناطيسي
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h4 className="font-bold text-blue-800 dark:text-blue-300 mb-2">عند تقريب القطب الشمالي (N) من ملف:</h4>
                        <ol className="list-decimal list-inside space-y-2 marker:text-blue-600 font-medium">
                            <li><span className="text-foreground">يزداد التدفق المغناطيسي الذي يخترق الملف.</span></li>
                            <li><span className="text-foreground">استجابةً لذلك، يتولد تيار حثي في الملف.</span></li>
                            <li><span className="text-foreground">ينتج هذا التيار مجالاً مغناطيسياً حثياً (<InlineMath math="B_{ind}" />) <strong>معاكساً</strong> لاتجاه المجال الأصلي للمغناطيس.</span></li>
                            <li><span className="text-foreground">يصبح طرف الملف القريب من المغناطيس <strong>قطباً شمالياً (N)</strong> ليحدث قوة <strong>تنافر</strong> تقاوم الزيادة في التدفق.</span></li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-2 border-muted">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <ArrowLeft className="text-primary" />
                        حالات التطبيق 2: إبعاد قطب مغناطيسي
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
                        <h4 className="font-bold text-red-800 dark:text-red-300 mb-2">عند إبعاد القطب الشمالي (N) عن ملف:</h4>
                        <ol className="list-decimal list-inside space-y-2 marker:text-red-600 font-medium">
                            <li><span className="text-foreground">يقل التدفق المغناطيسي الذي يخترق الملف.</span></li>
                            <li><span className="text-foreground">استجابةً لذلك، يتولد تيار حثي يحاول تعويض النقص.</span></li>
                            <li><span className="text-foreground">ينتج التيار مجالاً مغناطيسياً حثياً (<InlineMath math="B_{ind}" />) في <strong>نفس اتجاه</strong> المجال الأصلي للمغناطيس.</span></li>
                            <li><span className="text-foreground">يصبح طرف الملف القريب من المغناطيس <strong>قطباً جنوبياً (S)</strong> ليحدث قوة <strong>تجاذب</strong> تقاوم النقصان وتمنعه من الابتعاد.</span></li>
                        </ol>
                    </div>
                </CardContent>
            </Card>

            <Alert>
                <Info className="h-5 w-5" />
                <AlertTitle className="font-bold mb-2">كيف نحدد اتجاه التيار الحثي؟ (قاعدة اليد اليمنى)</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    بعد أن نحدد نوع القطب المتكون على طرف الملف (شمالي أم جنوبي باستخدام قانون لنز)، نستخدم قاعدة اليد اليمنى للملف اللولبي:
                    <ul className="list-disc list-inside mt-2 space-y-1">
                        <li>نشير بإصبعنا <strong>الإبهام</strong> باتجاه قطب الشمالي المتكون للملف (وهو اتجاه المجال الحثي المتولد <InlineMath math="B_{ind}" />).</li>
                        <li>يشير <strong>انحناء باقي أطراف الأصابع</strong> إلى اتجاه التيار الحثي المتولد في حلقات الملف.</li>
                    </ul>
                </AlertDescription>
            </Alert>
        </div>
    );
}
