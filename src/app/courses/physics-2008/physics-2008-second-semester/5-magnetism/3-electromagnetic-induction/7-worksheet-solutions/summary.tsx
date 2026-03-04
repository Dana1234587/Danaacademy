'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Notebook, SearchCode, Target } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Notebook className="w-5 h-5" />
                        خلاصة أفكار درس الحث الكهرومغناطيسي
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p className="leading-relaxed font-semibold mb-2">
                        ملخص القوانين الأربعة الأساسية لدرس الحث الكهرومغناطيسي:
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-background border rounded-lg p-3">
                            <h4 className="font-bold text-foreground mb-2 text-sm border-b pb-1">1. التدفق المغناطيسي</h4>
                            <BlockMath math="\Phi_B = B A \cos(\theta)" />
                            <p className="text-xs text-center mt-2">يقاس بوحدة הويبر (<InlineMath math="\text{Wb}" />)</p>
                        </div>

                        <div className="bg-background border rounded-lg p-3">
                            <h4 className="font-bold text-foreground mb-2 text-sm border-b pb-1">2. التغير في التدفق</h4>
                            <BlockMath math="\Delta \Phi = \Phi_f - \Phi_i" />
                            <p className="text-xs text-center mt-2">شرط أساسي لتوليد التيار החثي.</p>
                        </div>

                        <div className="bg-background border rounded-lg p-3">
                            <h4 className="font-bold text-foreground mb-2 text-sm border-b pb-1">3. قانون فاراداي</h4>
                            <BlockMath math="\varepsilon = -N \frac{\Delta \Phi}{\Delta t}" />
                            <p className="text-xs text-center mt-2">المعدل الزمني مضروباً بـ $N$</p>
                        </div>

                        <div className="bg-background border rounded-lg p-3">
                            <h4 className="font-bold text-foreground mb-2 text-sm border-b pb-1">4. الموصل المتحرك</h4>
                            <BlockMath math="\varepsilon = B \ell v \sin(\theta)" />
                            <p className="text-xs text-center mt-2">يقاس بوحدة الفولت (<InlineMath math="\text{V}" />)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-emerald-500/20 bg-emerald-500/5">
                <CardHeader>
                    <CardTitle className="text-xl text-emerald-600 flex items-center gap-2">
                        <Target className="w-5 h-5" />
                        نصائح لتجنب الأخطاء الشائعة
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground leading-relaxed font-medium">
                        <li><strong>تحديد الزاوية:</strong> تأكد हमेशाاً أن الزاوية بين المجال <strong>و العمودي</strong> على السطح، وليس السطح نفسه.</li>
                        <li><strong>علامة الطرح في فاراداي:</strong> لا تنسى إشارة السالب في قانون فاراداي، فهي تؤثر جذرياً على الإجابة خصوصاً في مسائل الرسم البياني والميل وتطبيق قاعدة لنز.</li>
                        <li><strong>انعدام التدفق:</strong> "موازٍ للسطح" يعني <InlineMath math="\theta = 90^\circ" /> إذن التدفق صفر.</li>
                        <li><strong>سرعة الموصل:</strong> يجب أن تكون حركة الموصل قاطعة للمجال. <InlineMath math="\sin(\theta)" /> في الموصل تصفر إذا كانت حركته موازية.</li>
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
