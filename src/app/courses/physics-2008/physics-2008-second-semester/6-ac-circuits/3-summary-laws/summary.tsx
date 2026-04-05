'use client';

import React from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 sm:p-6 bg-card text-card-foreground rounded-lg border border-border/50 text-right" dir="rtl">
            <h2 className="text-2xl font-bold mb-6 text-primary border-b pb-2">ملخص قوانين التيار المتردد</h2>
            
            <div className="space-y-6">
                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">1. قوانين التردد والزمن</h3>
                    <ul className="list-none space-y-4 text-muted-foreground mr-4">
                        <li className="flex flex-col items-start" dir="ltr">
                            <BlockMath math="\omega = 2\pi f = \frac{2\pi}{T}" />
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">2. القيم اللحظية</h3>
                    <ul className="list-none space-y-4 text-muted-foreground mr-4">
                        <li>
                            <strong className="text-foreground">الجهد اللحظي:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="v = V_{max} \sin(\omega t)" />
                            </div>
                        </li>
                        <li>
                            <strong className="text-foreground">التيار اللحظي:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="i = I_{max} \sin(\omega t)" />
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">3. القيم الفعالة (rms)</h3>
                    <ul className="list-none space-y-4 text-muted-foreground mr-4">
                        <li>
                            <strong className="text-foreground">التيار الفعال:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="I_{rms} = \frac{I_{max}}{\sqrt{2}}" />
                            </div>
                        </li>
                        <li>
                            <strong className="text-foreground">الجهد الفعال:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="V_{rms} = \frac{V_{max}}{\sqrt{2}}" />
                            </div>
                        </li>
                    </ul>
                </section>

                <section>
                    <h3 className="text-lg font-semibold text-primary mb-3">4. القدرة وقانون أوم</h3>
                    <ul className="list-none space-y-4 text-muted-foreground mr-4">
                        <li>
                            <strong className="text-foreground">قانون أوم في التيار المتردد:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="V_{rms} = I_{rms} R" />
                            </div>
                        </li>
                        <li>
                            <strong className="text-foreground">القدرة الكهربائية المستهلكة في المقاومة:</strong>
                            <div className="mt-2" dir="ltr">
                                <BlockMath math="P_{av} = I_{rms}^2 R" />
                            </div>
                        </li>
                    </ul>
                </section>
            </div>
        </div>
    );
}
