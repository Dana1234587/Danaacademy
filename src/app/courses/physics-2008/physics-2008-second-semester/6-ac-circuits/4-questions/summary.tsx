'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 sm:p-6 bg-card text-card-foreground rounded-lg border border-border/50 text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">خطوات وأفكار حل المسائل</h2>
            
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">النمط الأول: قراءة الرسم البياني</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        عند إعطاء رسم بياني لموجة الجهد أو التيار:
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>أعلى نقطة في المنحنى تمثل القيمة العظمى <InlineMath math="V_{max}" /> أو <InlineMath math="I_{max}" />.</li>
                        <li>الزمن اللازم لإكمال دورة واحدة (قمة وقاع) يمثل الزمن الدوري <InlineMath math="T" />.</li>
                        <li>يتم حساب التردد <InlineMath math="f = 1/T" /> والتردد الزاوي <InlineMath math="\omega = 2\pi f" />.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">النمط الثاني: استخراج المعطيات من المعادلة الجيبية</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        إذا أُعطيت معادلة مثل: <InlineMath math="i = 10 \sin(100\pi t)" />:
                    </p>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li>بمقارنتها بالصيغة القياسية <InlineMath math="i = I_{max} \sin(\omega t)" /> نستنتج أن:</li>
                        <li><InlineMath math="I_{max} = 10 \text{ A}" /></li>
                        <li><InlineMath math="\omega = 100\pi \text{ rad/s}" /></li>
                        <li>لحساب القيم الفعالة: <InlineMath math="I_{rms} = \frac{10}{\sqrt{2}}" /></li>
                        <li>لحساب القدرة المتوسطة عند معرفة <InlineMath math="R" />: نستعمل <InlineMath math="P_{av} = I_{rms}^2 R" /> وليس القيمة العظمى.</li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">النمط الثالث: الحسابات المباشرة</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        عند التعامل مع أجهزة القياس أو الأحمال (المقاومات):
                    </p>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li>إذا ذُكر في السؤال "جهد المصدر 220 فولت"، فهذا يعني تلقائياً الجهد الفعال <InlineMath math="V_{rms} = 220 \text{ V}" />، ما لم يُذكر صراحة أنه القيمة العظمى.</li>
                        <li>يمكن التحويل بين الجهد والتيار الفعال باستخدام قانون أوم: <InlineMath math="V_{rms} = I_{rms} R" />.</li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
