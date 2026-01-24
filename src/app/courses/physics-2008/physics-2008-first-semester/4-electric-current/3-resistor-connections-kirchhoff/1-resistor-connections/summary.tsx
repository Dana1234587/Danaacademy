
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* جدول المقارنة الرئيسي */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">📊 مقارنة بين التوصيل على التوالي والتوازي</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-right font-bold text-foreground">الخاصية</TableHead>
                                <TableHead className="text-center font-bold text-blue-600">التوصيل على التوالي 🔗</TableHead>
                                <TableHead className="text-center font-bold text-green-600">التوصيل على التوازي ⚡</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium text-right">المقاومة المكافئة</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-blue-50 p-2 rounded">
                                        <InlineMath math="R_{eq} = R_1 + R_2 + R_3 + ..." />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-green-50 p-2 rounded">
                                        <InlineMath math="\frac{1}{R_{eq}} = \frac{1}{R_1} + \frac{1}{R_2} + ..." />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">لمقاومتين فقط</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-blue-50 p-2 rounded">
                                        <InlineMath math="R_{eq} = R_1 + R_2" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-green-50 p-2 rounded">
                                        <InlineMath math="R_{eq} = \frac{R_1 \times R_2}{R_1 + R_2}" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-yellow-50">
                                <TableCell className="font-medium text-right">التيار (I)</TableCell>
                                <TableCell className="text-center font-bold text-blue-700">
                                    ثابت في جميع المقاومات
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="I_1 = I_2 = I_3 = I_{total}" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-green-700">
                                    يتوزع عكسياً مع المقاومة
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="I_{total} = I_1 + I_2 + I_3" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-orange-50">
                                <TableCell className="font-medium text-right">الجهد (V)</TableCell>
                                <TableCell className="text-center font-bold text-blue-700">
                                    يتوزع طردياً مع المقاومة
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="V_{total} = V_1 + V_2 + V_3" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-green-700">
                                    ثابت على جميع المقاومات
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="V_1 = V_2 = V_3 = V_{source}" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">خاصية المقاومة المكافئة</TableCell>
                                <TableCell className="text-center text-blue-600">
                                    أكبر من أكبر مقاومة في الدارة
                                </TableCell>
                                <TableCell className="text-center text-green-600">
                                    أصغر من أصغر مقاومة في الدارة
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* التوصيل على التوالي */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">🔗 التوصيل على التوالي (Series)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-center font-bold text-blue-700 mb-3">رسم توضيحي</p>
                        <svg viewBox="0 0 400 80" className="w-full h-20">
                            {/* البطارية */}
                            <line x1="20" y1="40" x2="40" y2="40" stroke="#333" strokeWidth="2" />
                            <line x1="40" y1="25" x2="40" y2="55" stroke="#333" strokeWidth="3" />
                            <line x1="48" y1="32" x2="48" y2="48" stroke="#333" strokeWidth="2" />
                            <text x="44" y="70" textAnchor="middle" fontSize="10" fill="#666">ε</text>

                            {/* مقاومة 1 */}
                            <line x1="48" y1="40" x2="80" y2="40" stroke="#333" strokeWidth="2" />
                            <rect x="80" y="30" width="50" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
                            <text x="105" y="65" textAnchor="middle" fontSize="10" fill="#2563eb">R₁</text>

                            {/* مقاومة 2 */}
                            <line x1="130" y1="40" x2="160" y2="40" stroke="#333" strokeWidth="2" />
                            <rect x="160" y="30" width="50" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
                            <text x="185" y="65" textAnchor="middle" fontSize="10" fill="#2563eb">R₂</text>

                            {/* مقاومة 3 */}
                            <line x1="210" y1="40" x2="240" y2="40" stroke="#333" strokeWidth="2" />
                            <rect x="240" y="30" width="50" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
                            <text x="265" y="65" textAnchor="middle" fontSize="10" fill="#2563eb">R₃</text>

                            {/* سلك عودة */}
                            <line x1="290" y1="40" x2="380" y2="40" stroke="#333" strokeWidth="2" />
                            <line x1="380" y1="40" x2="380" y2="10" stroke="#333" strokeWidth="2" />
                            <line x1="380" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
                            <line x1="20" y1="10" x2="20" y2="40" stroke="#333" strokeWidth="2" />

                            {/* سهم التيار */}
                            <text x="200" y="8" textAnchor="middle" fontSize="10" fill="#dc2626">← I (ثابت)</text>
                        </svg>
                    </div>

                    <div className="bg-blue-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-blue-800">💡 كيف نميز التوالي؟</p>
                        <p className="text-blue-700 mt-1">المقاومات متصلة على خط واحد (مسار واحد للتيار) - لا يوجد تفرع.</p>
                    </div>
                </CardContent>
            </Card>

            {/* التوصيل على التوازي */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">⚡ التوصيل على التوازي (Parallel)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                        <p className="text-center font-bold text-green-700 mb-3">رسم توضيحي</p>
                        <svg viewBox="0 0 300 140" className="w-full h-32">
                            {/* البطارية */}
                            <line x1="20" y1="70" x2="40" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="40" y1="55" x2="40" y2="85" stroke="#333" strokeWidth="3" />
                            <line x1="48" y1="62" x2="48" y2="78" stroke="#333" strokeWidth="2" />
                            <text x="44" y="100" textAnchor="middle" fontSize="10" fill="#666">ε</text>

                            {/* تفرع */}
                            <line x1="48" y1="70" x2="80" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="80" y1="70" x2="80" y2="20" stroke="#333" strokeWidth="2" />
                            <line x1="80" y1="70" x2="80" y2="120" stroke="#333" strokeWidth="2" />

                            {/* فرع علوي */}
                            <line x1="80" y1="20" x2="100" y2="20" stroke="#333" strokeWidth="2" />
                            <rect x="100" y="10" width="40" height="20" fill="none" stroke="#16a34a" strokeWidth="2" />
                            <text x="120" y="45" textAnchor="middle" fontSize="10" fill="#16a34a">R₁</text>
                            <line x1="140" y1="20" x2="200" y2="20" stroke="#333" strokeWidth="2" />

                            {/* فرع وسط */}
                            <line x1="80" y1="70" x2="100" y2="70" stroke="#333" strokeWidth="2" />
                            <rect x="100" y="60" width="40" height="20" fill="none" stroke="#16a34a" strokeWidth="2" />
                            <text x="120" y="95" textAnchor="middle" fontSize="10" fill="#16a34a">R₂</text>
                            <line x1="140" y1="70" x2="200" y2="70" stroke="#333" strokeWidth="2" />

                            {/* فرع سفلي */}
                            <line x1="80" y1="120" x2="100" y2="120" stroke="#333" strokeWidth="2" />
                            <rect x="100" y="110" width="40" height="20" fill="none" stroke="#16a34a" strokeWidth="2" />
                            <text x="120" y="138" textAnchor="middle" fontSize="10" fill="#16a34a">R₃</text>
                            <line x1="140" y1="120" x2="200" y2="120" stroke="#333" strokeWidth="2" />

                            {/* تجميع */}
                            <line x1="200" y1="20" x2="200" y2="120" stroke="#333" strokeWidth="2" />
                            <line x1="200" y1="70" x2="280" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="280" y1="70" x2="280" y2="130" stroke="#333" strokeWidth="2" />
                            <line x1="280" y1="130" x2="20" y2="130" stroke="#333" strokeWidth="2" />
                            <line x1="20" y1="130" x2="20" y2="70" stroke="#333" strokeWidth="2" />
                        </svg>
                    </div>

                    <div className="bg-green-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-green-800">💡 كيف نميز التوازي؟</p>
                        <p className="text-green-700 mt-1">المقاومات متصلة من نفس النقطتين (التيار يتفرع).</p>
                    </div>
                </CardContent>
            </Card>

            {/* n مقاومات متماثلة */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💎 حالة خاصة: n مقاومات متماثلة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                            <p className="font-bold text-blue-700 mb-2">على التوالي</p>
                            <div dir="ltr" className="bg-blue-100 p-2 rounded">
                                <BlockMath math="R_{eq} = n \times R" />
                            </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-purple-200 text-center">
                            <p className="font-bold text-green-700 mb-2">على التوازي</p>
                            <div dir="ltr" className="bg-green-100 p-2 rounded">
                                <BlockMath math="R_{eq} = \frac{R}{n}" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
