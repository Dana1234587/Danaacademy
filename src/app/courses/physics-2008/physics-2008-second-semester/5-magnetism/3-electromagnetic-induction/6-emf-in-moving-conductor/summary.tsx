'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Battery, ShieldAlert, ArrowRight } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6 text-right" dir="rtl">

            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-xl text-primary flex items-center gap-2">
                        <Battery className="w-5 h-5" />
                        الموصل كبطارية (القوة الدافعة الحثية)
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-muted-foreground leading-relaxed">
                        عندما يتحرك موصل مستقيم طوله (<InlineMath math="\ell" />) بسرعة ثابتة (<InlineMath math="v" />) داخل مجال مغناطيسي منتظم (<InlineMath math="B" />) بحيث <strong>يقطع خطوط المجال</strong>، تتولد بين طرفيه قوة دافعة كهربائية حثية. ويُعطى مقدارها بالعلاقة:
                    </p>
                    <div className="bg-background p-4 rounded-lg text-center shadow-inner my-4">
                        <BlockMath math="\varepsilon = B \cdot \ell \cdot v \cdot \sin(\theta)" />
                    </div>
                    <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                        <li><InlineMath math="B" />: المجال المغناطيسي المؤثر (T).</li>
                        <li><InlineMath math="\ell" />: طول الموصل (m).</li>
                        <li><InlineMath math="v" />: سرعة تحريك الموصل (m/s).</li>
                        <li><InlineMath math="\theta" />: الزاوية المحصورة بين اتجاه <strong>السرعة</strong> <InlineMath math="\vec{v}" /> واتجاه <strong>المجال المغناطيسي</strong> <InlineMath math="\vec{B}" />.</li>
                    </ul>
                </CardContent>
            </Card>

            <Card className="border-secondary/20">
                <CardHeader>
                    <CardTitle className="text-xl text-secondary-foreground flex items-center gap-2">
                        <ShieldAlert className="w-5 h-5" />
                        الشرط الجوهري للعبور الأسطح
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-muted p-4 rounded-md border border-border space-y-3">
                        <p className="font-semibold text-foreground border-b pb-2">
                            يجب أن "يقطع" الموصل خطوط المجال.
                        </p>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            لتوليد هذه القوة الدافعة، يجب أن <strong>لا تكون حركة الموصل موازية</strong> لخطوط المجال المغناطيسي. إذا تحرك الموصل بموازاة خطوط المجال (أي لا يقطعها)، فإن الزاوية <InlineMath math="\theta = 0" /> أو <InlineMath math="180^\circ" />، وفي كلتا الحالتين <InlineMath math="\sin(0) = 0" />، فتنعدم القوة الدافعة החثية ويمتنع توليد التيار.
                        </p>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-amber-500/20 bg-amber-500/5">
                <CardHeader>
                    <CardTitle className="text-xl text-amber-600 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        القوى وتحديد الأقطاب المتولدة
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-muted-foreground">
                    <p>
                        بمجرد حركة المواصل، تتأثر الشحنات الحرة بداخله بقوة مغناطيسية (<InlineMath math="F = qvB \sin(\theta)" />) تدفعها للتجمع في أحد أطراف الموصل:
                    </p>
                    <ul className="list-disc list-inside text-sm space-y-2">
                        <li>باستخدام <strong>قاعدة اليد اليمنى</strong> للشحنات الموجبة يمكن تحديد الطرف الذي يتجمع فيه الجهد العالي (القطب الموجب كالبطارية).</li>
                        <li>الطرف الآخر يصبح القطب السالب (جهد منخفض).</li>
                        <li>يستمر تجمع الشحنات حتى يتولد مجال كهربائي يعادل بالضبط المجال المغناطيسي <InlineMath math="(q E = qvB)" /> وحينها <InlineMath math="\varepsilon = E \ell = vB\ell" />.</li>
                    </ul>
                </CardContent>
            </Card>

        </div>
    );
}
