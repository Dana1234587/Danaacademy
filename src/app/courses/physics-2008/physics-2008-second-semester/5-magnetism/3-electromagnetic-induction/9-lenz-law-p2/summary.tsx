import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Zap, Activity, ShieldCheck } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6">
            <Alert className="bg-primary/10 border-primary">
                <Zap className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary font-bold text-lg mb-2">تطبيقات قانون لنز بين ملفين متجاورين (مثال 18 الدارج في المنهاج)</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    في هذا الجزء نطبق قانون لنز لفهم كيفية تأثير <span className="font-semibold">تغير التيار</span> في دارة ملف (الملف الابتدائي) على توليد تيار حثي في دارة ملف آخر مجاور له (الملف الثانوي).
                </AlertDescription>
            </Alert>

            <Card className="border-2 border-emerald-500/20">
                <CardHeader className="bg-emerald-500/10 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2 text-emerald-700 dark:text-emerald-400">
                        <Activity className="text-emerald-500" />
                        الحالة الأولى: عند إغلاق دارة الملف الابتدائي
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <ul className="list-disc list-inside space-y-2 text-foreground">
                        <li>عند إغلاق المفتاح أو تقليل مقاومة الدارة (زيادة التيار)، <strong>ينمو التيار تدريجياً</strong> في الملف الابتدائي.</li>
                        <li>زيادة التيار تعني <strong>زيادة في المجال المغناطيسي</strong> الناشئ عنه، وبالتالي زيادة التدفق الذي يخترق الملف الثانوي.</li>
                        <li>حسب قانون لنز: يقاوم الملف الثانوي هذه الزيادة؛ فيتولد فيه تيار حثي.</li>
                        <li>ينتج عن تيار الثانوي الساري مجال مغناطيسي حثي (<InlineMath math="B_{ind}" />) <strong>معاكس في اتجاهه</strong> للمجال المغناطيسي الأصلي القادم من الابتدائي.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-2 border-orange-500/20">
                <CardHeader className="bg-orange-500/10 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2 text-orange-700 dark:text-orange-400">
                        <ShieldCheck className="text-orange-500" />
                        الحالة الثانية: عند فتح دارة الملف الابتدائي
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <ul className="list-disc list-inside space-y-2 text-foreground">
                        <li>عند فتح المفتاح أو زيادة مقاومة الدارة (تقليل التيار)، <strong>يتلاشى التيار تدريجياً</strong> في الملف الابتدائي.</li>
                        <li>نقصان التيار يعني <strong>تناقصاً في المجال المغناطيسي</strong> الناشئ عنه، وبالتالي نقصاناً في التدفق الذي يخترق الملف الثانوي.</li>
                        <li>حسب قانون لنز: يقاوم الملف الثانوي هذا النقص؛ فيتولد فيه تيار حثي.</li>
                        <li>ينتج عن تيار الثانوي الساري مجال مغناطيسي حثي (<InlineMath math="B_{ind}" />) <strong>في نفس اتجاه</strong> المجال المغناطيسي الأصلي القادم من الابتدائي، محاولةً لتعويض النقص.</li>
                    </ul>
                </CardContent>
            </Card>

            <Alert className="bg-muted">
                <AlertTitle className="font-bold mb-2">القاعدة الذهبية لهذه الحالات:</AlertTitle>
                <AlertDescription className="text-base text-right font-medium">
                    زيادة التدفق تُقابلها مقاومة عبر توليد مجال حثي <span className="text-red-500 font-bold">عكس</span> المجال الأصلي.<br />
                    نقصان التدفق يقابله دعم عبر توليد مجال حثي <span className="text-green-600 dark:text-green-400 font-bold">مع</span> المجال الأصلي.
                </AlertDescription>
            </Alert>
        </div>
    );
}
