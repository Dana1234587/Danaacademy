'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Zap, AlertTriangle, Lightbulb } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        ظاهرة الحث الكهرومغناطيسي
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                        هي ظاهرة توليد <strong>قوة دافعة كهربائية حثيّة</strong> (وبالتالي <strong>تيار حثّي</strong> في حال كانت الدارة مغلقة) نتيجة <strong>تغير التدفق المغناطيسي</strong> الذي يخترق الدارة أو الملف الكهربائي.
                    </p>
                </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardHeader>
                    <CardTitle className="text-xl text-yellow-600 flex items-center gap-2">
                        <AlertTriangle className="w-5 h-5" />
                        الشرط الأساسي: (التغير)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed font-medium">
                        السر لتوليد التيار الحثّي يكمن في كلمة واحدة: <span className="text-primary font-bold px-1 text-lg">التغيّر</span> (<InlineMath math="\Delta \Phi" />).
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>لا يهم مقدار التدفق المغناطيسي الذي يخترق الملف (حتى لو كان كبيراً جداً).</li>
                        <li>المهم هو <strong>هل هذا التدفق يتغير مع الزمن أم لا؟</strong></li>
                        <li><strong>إذا كان التدفق المغناطيسي ثابتاً:</strong> فإن مقدار <strong>التغير</strong> في التدفق (<InlineMath math="\Delta \Phi" />) يساوي <strong>صفراً</strong>، وبالتالي <strong>تنعدم القوة الدافعة الحثّية وينعدم التيار الحثّي.</strong></li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-secondary/20">
                <CardHeader>
                    <CardTitle className="text-xl text-secondary-foreground flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        كيف نجعل التدفق (<InlineMath math="\Delta \Phi" />) يتغيّر؟
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        بما أن قانون التدفق هو <InlineMath math="\Phi_B = B A \cos(\theta)" />، يمكن إحداث تغير في التدفق عن طريق تغيير أيّ من المتغيرات الثلاثة:
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <div className="bg-muted p-3 rounded text-center border">
                            <h4 className="font-bold text-foreground mb-1">تغيير المجال <InlineMath math="(B)" /></h4>
                            <span className="text-sm">زيادة أو إنقاص المجال المغناطيسي</span>
                        </div>
                        <div className="bg-muted p-3 rounded text-center border">
                            <h4 className="font-bold text-foreground mb-1">تغيير المساحة <InlineMath math="(A)" /></h4>
                            <span className="text-sm">توسيع الملف أو تغيير شكله أو سحبه من المجال</span>
                        </div>
                        <div className="bg-muted p-3 rounded text-center border">
                            <h4 className="font-bold text-foreground mb-1">تغيير الزاوية <InlineMath math="(\theta)" /></h4>
                            <span className="text-sm">عن طريق دوران الملف وتغيير التوجيه</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
