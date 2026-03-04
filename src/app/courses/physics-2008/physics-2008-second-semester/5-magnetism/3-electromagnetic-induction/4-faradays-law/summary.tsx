'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { TrendingDown, Replace, Zap } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        نص قانون فاراداي رياضياً
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        وفقاً لقانون فاراداي في الحث الكهرومغناطيسي، فإن القوة الدافعة الكهربائية الحثية المتولدة في ملف تتناسب طردياً مع المعدل الزمني للتغير في التدفق المغناطيسي الذي يخترق الملف.
                    </p>
                    <div className="bg-background p-4 rounded-lg text-center shadow-inner my-4">
                        <BlockMath math="\varepsilon = -N \frac{\Delta \Phi}{\Delta t}" />
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><InlineMath math="\varepsilon" />: القوة الدافعة الكهربائية الحثية (بوحدة الفولت V).</li>
                        <li><InlineMath math="N" />: عدد لفات الملف.</li>
                        <li><InlineMath math="\Delta \Phi" />: التغير في التدفق المغناطيسي (<InlineMath math="\Phi_f - \Phi_i" />).</li>
                        <li><InlineMath math="\Delta t" />: الفترة الزمنية لحدوث التغير.</li>
                        <li><strong>الإشارة السالبة:</strong> تمثل قانون لنز للدلالة على أن القوة الدافعة تقاوم السبب الذي وُلدها (وهو التغير في التدفق).</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-secondary/20 bg-secondary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-secondary-foreground flex items-center gap-2">
                        <Replace className="w-5 h-5" />
                        مصطلحات هامة جداً (الفرق الدقيق)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="p-3 border rounded-md">
                            <h4 className="font-bold text-foreground">1. التغير في التدفق المغناطيسي</h4>
                            <p className="text-muted-foreground mt-1">الرمز: <InlineMath math="\Delta \Phi" /></p>
                            <p className="text-muted-foreground">وحدته: اليبر (<InlineMath math="\text{Wb}" />)</p>
                            <p className="text-sm mt-2">مقدار الفرق بين التدفق النهائي والابتدائي بصرف النظر عن الزمن.</p>
                        </div>
                        <div className="p-3 border rounded-md">
                            <h4 className="font-bold text-foreground">2. المعدل الزمني للتغير في التدفق</h4>
                            <p className="text-muted-foreground mt-1">الرمز: <InlineMath math="\frac{\Delta \Phi}{\Delta t}" /></p>
                            <p className="text-muted-foreground">وحدته: اليبر لكل ثانية (<InlineMath math="\text{Wb/s}" />)</p>
                            <p className="text-sm mt-2">سرعة حدوث هذا التغير خلال فترة زمنية معينة. <strong>وهذا المقدار هو ما تتناسب معه القوة الدافعة الحثية طردياً.</strong></p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <TrendingDown className="w-5 h-5" />
                        حالات التغير الخاصة (مفاتيح الحل)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6 text-muted-foreground">
                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">1. "انعدم المجال" أو "أُبعد الملف عن المجال"</h3>
                        <p className="mb-2">هذا يعني أن التدفق النهائي قد أصبح صفراً.</p>
                        <div className="bg-muted p-2 rounded text-center">
                            <InlineMath math="\Phi_f = 0 \implies \Delta \Phi = 0 - \Phi_i = -\Phi_i" />
                        </div>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">2. "انعكس اتجاه المجال" أو "قُلب الملف"</h3>
                        <p className="mb-2">هذا يعني أن الزاوية القديمة انقلبت بمقدار $180^\circ$. إذا كان التدفق الابتدائي $\Phi_i$， فإن التدفق النهائي $\Phi_f = -\Phi_i$.</p>
                        <div className="bg-muted p-2 rounded text-center">
                            <InlineMath math="\Delta \Phi = -\Phi_i - \Phi_i = -2\Phi_i" />
                        </div>
                        <p className="mt-2 text-sm text-center font-bold text-primary">أي أن التغير في التدفق يساوي ضعف القيمة الابتدائية (ولكن بإشارة سالبة).</p>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
