
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* قاعدة كيرتشوف الأولى */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ قاعدة كيرتشوف الأولى (قاعدة الوصلة)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>النص:</strong> "مجموع التيارات الداخلة إلى وصلة = مجموع التيارات الخارجة منها"
                        </p>
                    </div>
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border">
                        <BlockMath math="\sum I_{in} = \sum I_{out}" />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-right">
                        <p className="text-blue-800">
                            <strong>المبدأ الفيزيائي:</strong> مبدأ حفظ الشحنة الكهربائية - الشحنة لا تفنى ولا تُستحدث.
                        </p>
                    </div>

                    {/* رسم توضيحي */}
                    <div className="bg-white p-4 rounded-lg border">
                        <p className="text-center font-bold text-primary mb-3">رسم توضيحي للوصلة</p>
                        <svg viewBox="0 0 300 150" className="w-full h-36">
                            {/* الوصلة */}
                            <circle cx="150" cy="75" r="8" fill="#3b82f6" />

                            {/* التيارات الداخلة */}
                            <line x1="30" y1="40" x2="142" y2="70" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG)" />
                            <text x="50" y="35" fontSize="12" fill="#16a34a" fontWeight="bold">I₁ = 3A</text>

                            <line x1="30" y1="110" x2="142" y2="80" stroke="#16a34a" strokeWidth="3" markerEnd="url(#arrowG)" />
                            <text x="50" y="125" fontSize="12" fill="#16a34a" fontWeight="bold">I₂ = 2A</text>

                            {/* التيارات الخارجة */}
                            <line x1="158" y1="75" x2="270" y2="40" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowR)" />
                            <text x="220" y="35" fontSize="12" fill="#dc2626" fontWeight="bold">I₃ = ?</text>

                            <line x1="158" y1="75" x2="270" y2="110" stroke="#dc2626" strokeWidth="3" markerEnd="url(#arrowR)" />
                            <text x="220" y="125" fontSize="12" fill="#dc2626" fontWeight="bold">I₄ = 1A</text>

                            <defs>
                                <marker id="arrowG" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
                                </marker>
                                <marker id="arrowR" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#dc2626" />
                                </marker>
                            </defs>
                        </svg>
                        <div className="text-center mt-2">
                            <p className="text-sm">الداخل = الخارج: <InlineMath math="3 + 2 = I_3 + 1" /> → <InlineMath math="I_3 = 4A" /></p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* الفرق بين الدارة البسيطة والمعقدة */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">⚠️ الدارة البسيطة vs المعقدة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-green-300">
                            <p className="font-bold text-green-700 mb-2 text-center">✅ الدارة البسيطة</p>
                            <ul className="text-sm text-green-600 space-y-1 text-right list-disc list-inside">
                                <li>التيار <strong>لا يتفرع</strong> في البطارية</li>
                                <li>يمكن استخدام قانون: <InlineMath math="I = \frac{\sum \varepsilon}{\sum r + R_{eq}}" /></li>
                            </ul>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-red-300">
                            <p className="font-bold text-red-700 mb-2 text-center">❌ الدارة المعقدة</p>
                            <ul className="text-sm text-red-600 space-y-1 text-right list-disc list-inside">
                                <li>التيار <strong>يتفرع</strong> في البطارية</li>
                                <li><strong>ممنوع</strong> استخدام قانون الدارة البسيطة</li>
                                <li>نستخدم قاعدتي كيرتشوف</li>
                            </ul>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ملاحظة مهمة */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💎 ملاحظة مهمة</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-white p-4 rounded-lg border border-purple-200 text-right">
                        <p className="text-purple-800">
                            انتبه لاتجاهات أسهم التيارات! التيار الداخل له اتجاه <strong>نحو الوصلة</strong>، والتيار الخارج له اتجاه <strong>بعيداً عن الوصلة</strong>.
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
