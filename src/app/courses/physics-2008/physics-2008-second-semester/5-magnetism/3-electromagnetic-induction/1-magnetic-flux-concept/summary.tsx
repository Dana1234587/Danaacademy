'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Lightbulb, BookOpen, AlertCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        تعريف التدفق المغناطيسي (<InlineMath math="\Phi_B" />)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        التدفق المغناطيسي هو مقياس لعدد خطوط المجال المغناطيسي التي تخترق سطحاً ما عمودياً عليه.
                        رياضياً، يُعرّف بأنه <strong>حاصل الضرب النقطي (القياسي)</strong> بين متجه المجال المغناطيسي ومتجه المساحة:
                    </p>
                    <div className="bg-background p-4 rounded-lg text-center shadow-inner my-4">
                        <BlockMath math="\Phi_B = \vec{B} \cdot \vec{A}" />
                        <BlockMath math="\Phi_B = B A \cos(\theta)" />
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><InlineMath math="\Phi_B" /> : التدفق المغناطيسي (Magnetic Flux).</li>
                        <li><InlineMath math="\vec{B}" /> : متجه المجال المغناطيسي (يقاس بالتسلا T).</li>
                        <li><InlineMath math="\vec{A}" /> : متجه المساحة، وهو متجه مقداره يساوي مساحة السطح، <strong>واتجاهه دائماً عمودي على السطح نحو الخارج</strong>.</li>
                        <li><strong>وحدة القياس:</strong> يقاس التدفق بوحدة <strong>الويبر (Weber - Wb)</strong>، وتكافئ (<InlineMath math="\text{T} \cdot \text{m}^2" />).</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-500/5">
                <CardHeader>
                    <CardTitle className="text-xl text-yellow-600 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        تنبيه هام جداً: الزاوية <InlineMath math="\theta" />
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground leading-relaxed font-semibold">
                        الزاوية <InlineMath math="\theta" /> في القانون هي الزاوية المحصورة بين <strong>اتجاه خطوط المجال المغناطيسي (<InlineMath math="\vec{B}" />) ومتجه المساحة (العمودي على السطح <InlineMath math="\vec{A}" />)</strong>، وليست الزاوية مع السطح نفسه!
                    </p>
                </CardContent>
            </Card>

            <Card className="border-primary/20">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Lightbulb className="w-5 h-5" />
                        حالات التدفق المغناطيسي
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">1. التدفق المغناطيسي يساوي صفراً (انعدام التدفق)</h3>
                        <p className="text-muted-foreground mb-2">
                            يحدث هذا عندما تكون <strong>خطوط المجال المغناطيسي موازية لمستوى السطح</strong>.
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>بما أن الخطوط موازية للسطح، فهي لا تخترقه.</li>
                            <li>تكون الخطوط <strong>عمودية على متجه المساحة</strong> (<InlineMath math="\vec{A}" />).</li>
                            <li>الزاوية <InlineMath math="\theta = 90^\circ" />.</li>
                            <li><InlineMath math="\cos(90^\circ) = 0 \implies \Phi_B = 0" />.</li>
                        </ul>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">2. التدفق قيمة عظمى (موجبة)</h3>
                        <p className="text-muted-foreground mb-2">
                            يحدث عندما تكون خطوط المجال <strong>عمودية على مستوى السطح، وخارجة منه</strong> (بنفس اتجاه متجه المساحة).
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>تكون الخطوط <strong>موازية لمتجه المساحة</strong> (<InlineMath math="\vec{A}" />).</li>
                            <li>الزاوية <InlineMath math="\theta = 0^\circ" />.</li>
                            <li><InlineMath math="\cos(0^\circ) = 1 \implies \Phi_B = +BA" /> (قيمة عظمى).</li>
                        </ul>
                    </div>

                    <Separator />

                    <div>
                        <h3 className="font-semibold text-lg text-foreground mb-2">3. التدفق قيمة عظمى (سالبة)</h3>
                        <p className="text-muted-foreground mb-2">
                            يحدث عندما تكون خطوط المجال <strong>عمودية على مستوى السطح، وداخلة فيه</strong> (عكس اتجاه متجه المساحة).
                        </p>
                        <ul className="list-disc list-inside text-muted-foreground space-y-1">
                            <li>تكون الخطوط <strong>عكس اتجاه متجه المساحة</strong> (<InlineMath math="\vec{A}" />).</li>
                            <li>الزاوية <InlineMath math="\theta = 180^\circ" />.</li>
                            <li><InlineMath math="\cos(180^\circ) = -1 \implies \Phi_B = -BA" />.</li>
                            <li>الإشارة السالبة تعني أن خطوط المجال <strong>تخترق السطح نحو الداخل</strong>.</li>
                        </ul>
                    </div>

                </CardContent>
            </Card>

        </div>
    );
}
