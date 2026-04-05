'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 sm:p-6 bg-card text-card-foreground rounded-lg border border-border/50 text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">مفهوم التيار والجهد المتردد</h2>
            
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">1. تعريف التيار المتردد (AC)</h3>
                    <p className="text-muted-foreground leading-relaxed">
                        التيار المتردد هو تيار يتغير مقداره واتجاهه دورياً مع الزمن. ويُمثل بيانياً على شكل موجة جيبية.
                    </p>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">2. المعادلات اللحظية</h3>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li>
                            <strong>معادلة الجهد اللحظي (<InlineMath math="v" />):</strong>
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="v = V_{max} \sin(\omega t)" />
                            </div>
                        </li>
                        <li>
                            <strong>معادلة التيار اللحظي (<InlineMath math="i" />):</strong>
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="i = I_{max} \sin(\omega t)" />
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">3. المصطلحات الأساسية</h3>
                    <ul className="list-disc list-inside space-y-3 text-muted-foreground">
                        <li>
                            <span dir="ltr" className="inline-block px-1 font-semibold text-foreground"><InlineMath math="V_{max}" /></span> و <span dir="ltr" className="inline-block px-1 font-semibold text-foreground"><InlineMath math="I_{max}" /></span>: 
                            <strong> القيمة العظمى (السعة)</strong>، وهي أعلى قيمة يصل إليها الجهد أو التيار.
                        </li>
                        <li>
                            <strong>الزمن الدوري (<InlineMath math="T" />):</strong> زمن دورة كاملة واحدة، ويُقاس بالثانية (s).
                        </li>
                        <li>
                            <strong>التردد (<InlineMath math="f" />):</strong> عدد الدورات الكاملة في الثانية الواحدة.
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="f = \frac{1}{T}" />
                            </div>
                        </li>
                        <li>
                            <strong>التردد الزاوي (<InlineMath math="\omega" />):</strong> السرعة الزاوية التي يدور بها الملف المولد للتيار المتردد.
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="\omega = 2\pi f = \frac{2\pi}{T}" />
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
