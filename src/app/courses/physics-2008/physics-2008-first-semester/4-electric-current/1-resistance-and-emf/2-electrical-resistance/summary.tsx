
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* القانون الأول - أوم */}
            <Card className="shadow-md border-2 border-blue-200 bg-blue-50/50">
                <CardHeader className="bg-blue-100/50">
                    <CardTitle className="text-blue-700 text-xl text-right">📐 القانون الأول: قانون أوم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-200">
                        <BlockMath math="R = \frac{V}{I}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-blue-800">
                        <strong>حيث:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li><InlineMath math="R" /> = المقاومة الكهربائية (بالأوم Ω)</li>
                            <li><InlineMath math="V" /> = فرق الجهد (بالفولت V)</li>
                            <li><InlineMath math="I" /> = شدة التيار (بالأمبير A)</li>
                        </ul>
                    </CardDescription>
                    <div className="bg-blue-100 p-3 rounded-lg text-right border border-blue-200">
                        <p className="text-blue-800">
                            <strong>💡 المقاومة الأومية:</strong> بزيادة فرق الجهد يزداد التيار بنسبة ثابتة، والمقاومة تبقى ثابتة.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* القانون الثاني - الأبعاد */}
            <Card className="shadow-md border-2 border-green-200 bg-green-50/50">
                <CardHeader className="bg-green-100/50">
                    <CardTitle className="text-green-700 text-xl text-right">📏 القانون الثاني: قانون الأبعاد الهندسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-green-200">
                        <BlockMath math="R = \rho \frac{L}{A}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-green-800">
                        <strong>حيث:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li><InlineMath math="R" /> = المقاومة (بالأوم Ω)</li>
                            <li><InlineMath math="\rho" /> = المقاومية (رو) (بالأوم·متر Ω·m)</li>
                            <li><InlineMath math="L" /> = طول الموصل (بالمتر m)</li>
                            <li><InlineMath math="A" /> = مساحة المقطع العرضي (بالمتر المربع m²)</li>
                        </ul>
                    </CardDescription>
                </CardContent>
            </Card>

            {/* مساحة الدائرة */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">⭕ مساحة المقطع الدائري</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-3 rounded-lg text-center border border-orange-200">
                        <BlockMath math="A = \pi r^2" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-orange-800">
                        <strong>حيث:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li><InlineMath math="A" /> = مساحة المقطع (m²)</li>
                            <li><InlineMath math="r" /> = نصف القطر (m)</li>
                            <li><InlineMath math="\pi \approx 3.14" /></li>
                        </ul>
                    </CardDescription>
                    <div className="bg-orange-100 p-3 rounded-lg text-right border border-orange-200">
                        <p className="text-orange-800">
                            <strong>⚠️ تذكر:</strong> إذا أعطيت القطر (d)، فإن نصف القطر <InlineMath math="r = \frac{d}{2}" />
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* تعريف الأوم */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">Ω تعريف الأوم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-3 rounded-lg text-center border border-purple-200">
                        <BlockMath math="1 \Omega = \frac{1 V}{1 A}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-purple-800">
                        <strong>الأوم الواحد:</strong> هو مقاومة موصل يمر فيه تيار شدته 1 أمبير عندما يكون فرق الجهد بين طرفيه 1 فولت.
                    </CardDescription>
                </CardContent>
            </Card>

            {/* العلاقات */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">📊 تأثير العوامل على المقاومة</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-red-50 p-4 rounded-lg border border-red-200 text-center">
                            <p className="font-bold text-red-700 mb-2">L (الطول) ↑</p>
                            <p className="text-red-600">R ↑ تزداد</p>
                            <p className="text-sm text-red-500 mt-1">(L في البسط = علاقة طردية)</p>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-center">
                            <p className="font-bold text-green-700 mb-2">A (المساحة) ↑</p>
                            <p className="text-green-600">R ↓ تنقص</p>
                            <p className="text-sm text-green-500 mt-1">(A في المقام = علاقة عكسية)</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
