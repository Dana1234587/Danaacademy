'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Variable, Compass, AlertCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Variable className="w-5 h-5" />
                        القانون الأساسي لحساب التدفق
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        نستخدم القانون التالي بشكل رئيسي لحساب التدفق عبر مساحة مغلقة:
                    </p>
                    <div className="bg-background p-4 rounded-lg text-center shadow-inner my-4">
                        <BlockMath math="\Phi_B = B \cdot A \cdot \cos(\theta)" />
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><InlineMath math="B" />: مقدار المجال المغناطيسي (T).</li>
                        <li><InlineMath math="A" />: مقدار المساحة (<InlineMath math="\text{m}^2" />) بالمتر المربع.</li>
                        <li><InlineMath math="\theta" />: الزاوية بين متجه المجال (<InlineMath math="\vec{B}" />) و <strong>متجه المساحة</strong> (<InlineMath math="\vec{A}" />).</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-red-500/20 bg-red-500/5">
                <CardHeader>
                    <CardTitle className="text-xl text-red-600 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        تحويلات هامة للمساحة (تذكر!)
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground mb-4">
                        في أغلب المسائل يجب التأكد من الوحدات القياسية:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground font-semibold">
                        <li>من <InlineMath math="\text{cm}^2" /> إلى <InlineMath math="\text{m}^2" /> نضرب بـ <InlineMath math="10^{-4}" />.</li>
                        <li>من <InlineMath math="\text{mm}^2" /> إلى <InlineMath math="\text{m}^2" /> نضرب بـ <InlineMath math="10^{-6}" />.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-secondary/20">
                <CardHeader>
                    <CardTitle className="text-xl text-secondary-foreground flex items-center gap-2">
                        <Compass className="w-5 h-5" />
                        كيف نحدد الزاوية بدقة في الأسئلة؟
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        أكثر الأخطاء شيوعاً تحدث في تحديد قيمة <InlineMath math="\theta" />. اتبع القاعدة التالية:
                    </p>
                    <div className="space-y-3">
                        <div className="bg-muted p-3 rounded-md border border-border">
                            <strong>الحالة الأولى:</strong> إذا أعطاك السؤال الزاوية بين <strong>المجال ومتجه المساحة (العمودي)</strong> مباشرة.
                            <br />
                            <span className="text-primary mt-1 inline-block">القرار:</span> نستخدمها كما هي في قانون <InlineMath math="\cos(\theta)" />.
                        </div>

                        <div className="bg-muted p-3 rounded-md border border-border">
                            <strong>الحالة الثانية:</strong> إذا أعطاك السؤال الزاوية بين <strong>المجال ومستوى السطح نفسه</strong> (لنسميها <InlineMath math="\alpha" />).
                            <br />
                            <span className="text-destructive mt-1 inline-block">القرار:</span> نطرح الزاوية من 90°. أي أن الزاوية التي سنستخدمها هي <InlineMath math="\theta = 90^\circ - \alpha" />.
                        </div>
                    </div>
                </CardContent>
            </Card>

        </div>
    );
}
