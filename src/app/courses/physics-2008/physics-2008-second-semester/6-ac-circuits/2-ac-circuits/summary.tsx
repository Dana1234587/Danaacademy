'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 sm:p-6 bg-card text-card-foreground rounded-lg border border-border/50 text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">القيم الفعالة والقدرة المتوسطة</h2>
            
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">1. القيم الفعالة (rms)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        القيم الفعالة هي القيم التي تقيسها أجهزة القياس العملية (مثل الأميتر والفولتميتر)، وتمثل قيمة التيار المستمر الذي يولد نفس القدرة الحرارية في مقاومة معينة.
                    </p>
                    <ul className="list-disc list-inside space-y-4 text-muted-foreground">
                        <li>
                            <strong>التيار الفعال (<InlineMath math="I_{rms}" />):</strong>
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="I_{rms} = \frac{I_{max}}{\sqrt{2}} \approx 0.707 I_{max}" />
                            </div>
                        </li>
                        <li>
                            <strong>الجهد الفعال (<InlineMath math="V_{rms}" />):</strong>
                            <div className="mt-2 mr-6" dir="ltr">
                                <BlockMath math="V_{rms} = \frac{V_{max}}{\sqrt{2}} \approx 0.707 V_{max}" />
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">2. القدرة المتوسطة (<InlineMath math="P_{av}" />)</h3>
                    <p className="text-muted-foreground leading-relaxed mb-4">
                        تُحسب القدرة المتوسطة المستهلكة في المقاومة باستخدام <strong>التيار الفعال والمقاومة فقط</strong> حسب القانون التالي:
                    </p>
                    <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                        <div className="flex justify-center" dir="ltr">
                            <BlockMath math="P_{av} = I_{rms}^2 R" />
                        </div>
                    </div>
                    <p className="text-sm text-amber-600 dark:text-amber-400 mt-3 flex items-center">
                        <span className="font-bold ml-2">ملاحظة هامة:</span>
                        القدرة تستهلك في المقاومة الأومية فقط، ولا نستخدم القيمة العظمى للحساب، بل الفعالة دائماً.
                    </p>
                </section>
            </div>
        </div>
    );
}
