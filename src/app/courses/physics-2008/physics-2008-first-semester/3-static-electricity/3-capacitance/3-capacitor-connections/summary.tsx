
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
                                <TableCell className="font-medium text-right">المواسعة المكافئة</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-blue-50 p-2 rounded">
                                        <InlineMath math="\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2} + ..." />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-green-50 p-2 rounded">
                                        <InlineMath math="C_{eq} = C_1 + C_2 + ..." />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">لمواسعين فقط</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-blue-50 p-2 rounded">
                                        <InlineMath math="C_{eq} = \frac{C_1 \times C_2}{C_1 + C_2}" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr" className="bg-green-50 p-2 rounded">
                                        <InlineMath math="C_{eq} = C_1 + C_2" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-yellow-50">
                                <TableCell className="font-medium text-right">الكمية الثابتة</TableCell>
                                <TableCell className="text-center font-bold text-blue-700">
                                    الشحنة (Q) = شحنة المصدر
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="Q_1 = Q_2 = Q_3 = Q_{total}" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-green-700">
                                    الجهد (V) = جهد المصدر
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="V_1 = V_2 = V_3 = V_{source}" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-orange-50">
                                <TableCell className="font-medium text-right">الكمية المتوزعة</TableCell>
                                <TableCell className="text-center font-bold text-blue-700">
                                    الجهد يتوزع
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="V_{total} = V_1 + V_2 + V_3" />
                                    </div>
                                </TableCell>
                                <TableCell className="text-center font-bold text-green-700">
                                    الشحنة تتوزع
                                    <div dir="ltr" className="mt-1">
                                        <InlineMath math="Q_{total} = Q_1 + Q_2 + Q_3" />
                                    </div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">خاصية المواسعة المكافئة</TableCell>
                                <TableCell className="text-center text-blue-600">
                                    أصغر من أصغر مواسعة في الدارة
                                </TableCell>
                                <TableCell className="text-center text-green-600">
                                    أكبر من أكبر مواسعة في الدارة
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
                    <CardDescription className="text-right leading-relaxed text-blue-800">
                        يتم توصيل المواسعات على التوالي عندما يكون الطرف الموجب لمواسع متصلاً بالطرف السالب للمواسع التالي.
                    </CardDescription>

                    {/* رسم توضيحي */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <svg viewBox="0 0 400 80" className="w-full h-20">
                            {/* البطارية */}
                            <line x1="20" y1="40" x2="50" y2="40" stroke="#333" strokeWidth="2" />
                            <line x1="50" y1="25" x2="50" y2="55" stroke="#333" strokeWidth="3" />
                            <line x1="58" y1="32" x2="58" y2="48" stroke="#333" strokeWidth="2" />
                            <text x="54" y="70" textAnchor="middle" fontSize="12" fill="#666">V</text>

                            {/* سلك */}
                            <line x1="58" y1="40" x2="100" y2="40" stroke="#333" strokeWidth="2" />

                            {/* مواسع 1 */}
                            <line x1="100" y1="25" x2="100" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <line x1="115" y1="25" x2="115" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <text x="107" y="70" textAnchor="middle" fontSize="12" fill="#2563eb">C₁</text>

                            {/* سلك */}
                            <line x1="115" y1="40" x2="170" y2="40" stroke="#333" strokeWidth="2" />

                            {/* مواسع 2 */}
                            <line x1="170" y1="25" x2="170" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <line x1="185" y1="25" x2="185" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <text x="177" y="70" textAnchor="middle" fontSize="12" fill="#2563eb">C₂</text>

                            {/* سلك */}
                            <line x1="185" y1="40" x2="240" y2="40" stroke="#333" strokeWidth="2" />

                            {/* مواسع 3 */}
                            <line x1="240" y1="25" x2="240" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <line x1="255" y1="25" x2="255" y2="55" stroke="#2563eb" strokeWidth="2" />
                            <text x="247" y="70" textAnchor="middle" fontSize="12" fill="#2563eb">C₃</text>

                            {/* سلك عودة */}
                            <line x1="255" y1="40" x2="380" y2="40" stroke="#333" strokeWidth="2" />
                            <line x1="380" y1="40" x2="380" y2="10" stroke="#333" strokeWidth="2" />
                            <line x1="380" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
                            <line x1="20" y1="10" x2="20" y2="40" stroke="#333" strokeWidth="2" />
                        </svg>
                    </div>

                    <div dir="ltr" className="bg-blue-100 p-3 rounded-lg text-center">
                        <BlockMath math="\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2} + \frac{1}{C_3}" />
                    </div>

                    <div className="bg-blue-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-blue-800">💡 تذكر: في التوالي الشحنة ثابتة</p>
                        <p className="text-blue-700 mt-1">الشحنة على كل مواسع = الشحنة الكلية = شحنة المصدر</p>
                    </div>
                </CardContent>
            </Card>

            {/* التوصيل على التوازي */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">⚡ التوصيل على التوازي (Parallel)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-green-800">
                        يتم توصيل المواسعات على التوازي عندما تكون جميع الأطراف الموجبة متصلة معاً وجميع الأطراف السالبة متصلة معاً.
                    </CardDescription>

                    {/* رسم توضيحي */}
                    <div className="bg-white p-4 rounded-lg border border-green-200">
                        <svg viewBox="0 0 300 140" className="w-full h-32">
                            {/* البطارية */}
                            <line x1="20" y1="70" x2="50" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="50" y1="55" x2="50" y2="85" stroke="#333" strokeWidth="3" />
                            <line x1="58" y1="62" x2="58" y2="78" stroke="#333" strokeWidth="2" />
                            <text x="54" y="100" textAnchor="middle" fontSize="12" fill="#666">V</text>

                            {/* سلك رئيسي */}
                            <line x1="58" y1="70" x2="100" y2="70" stroke="#333" strokeWidth="2" />

                            {/* تفرع */}
                            <line x1="100" y1="70" x2="100" y2="20" stroke="#333" strokeWidth="2" />
                            <line x1="100" y1="70" x2="100" y2="120" stroke="#333" strokeWidth="2" />

                            {/* فرع علوي */}
                            <line x1="100" y1="20" x2="130" y2="20" stroke="#333" strokeWidth="2" />
                            <line x1="130" y1="10" x2="130" y2="30" stroke="#16a34a" strokeWidth="2" />
                            <line x1="145" y1="10" x2="145" y2="30" stroke="#16a34a" strokeWidth="2" />
                            <text x="137" y="45" textAnchor="middle" fontSize="11" fill="#16a34a">C₁</text>
                            <line x1="145" y1="20" x2="200" y2="20" stroke="#333" strokeWidth="2" />

                            {/* فرع وسط */}
                            <line x1="100" y1="70" x2="130" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="130" y1="60" x2="130" y2="80" stroke="#16a34a" strokeWidth="2" />
                            <line x1="145" y1="60" x2="145" y2="80" stroke="#16a34a" strokeWidth="2" />
                            <text x="137" y="95" textAnchor="middle" fontSize="11" fill="#16a34a">C₂</text>
                            <line x1="145" y1="70" x2="200" y2="70" stroke="#333" strokeWidth="2" />

                            {/* فرع سفلي */}
                            <line x1="100" y1="120" x2="130" y2="120" stroke="#333" strokeWidth="2" />
                            <line x1="130" y1="110" x2="130" y2="130" stroke="#16a34a" strokeWidth="2" />
                            <line x1="145" y1="110" x2="145" y2="130" stroke="#16a34a" strokeWidth="2" />
                            <text x="137" y="138" textAnchor="middle" fontSize="11" fill="#16a34a">C₃</text>
                            <line x1="145" y1="120" x2="200" y2="120" stroke="#333" strokeWidth="2" />

                            {/* تجميع */}
                            <line x1="200" y1="20" x2="200" y2="120" stroke="#333" strokeWidth="2" />
                            <line x1="200" y1="70" x2="280" y2="70" stroke="#333" strokeWidth="2" />
                            <line x1="280" y1="70" x2="280" y2="130" stroke="#333" strokeWidth="2" />
                            <line x1="280" y1="130" x2="20" y2="130" stroke="#333" strokeWidth="2" />
                            <line x1="20" y1="130" x2="20" y2="70" stroke="#333" strokeWidth="2" />
                        </svg>
                    </div>

                    <div dir="ltr" className="bg-green-100 p-3 rounded-lg text-center">
                        <BlockMath math="C_{eq} = C_1 + C_2 + C_3" />
                    </div>

                    <div className="bg-green-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-green-800">💡 تذكر: في التوازي الجهد ثابت</p>
                        <p className="text-green-700 mt-1">الجهد على كل مواسع = الجهد الكلي = جهد المصدر (البطارية)</p>
                    </div>
                </CardContent>
            </Card>

            {/* قواعد ذهبية */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💎 قواعد ذهبية للحل</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* التوالي - خطوات مفصلة */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                        <p className="font-bold text-blue-800 text-right mb-3">🔗 خطوات حل مسائل التوالي:</p>
                        <ol className="space-y-2 text-right text-blue-700 list-decimal list-inside">
                            <li><strong>احسب المواسعة المكافئة:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="\frac{1}{C_{eq}} = \frac{1}{C_1} + \frac{1}{C_2} + ..." /></span></li>
                            <li><strong>احسب الشحنة الكلية من جهد المصدر (البطارية):</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="Q_{total} = C_{eq} \times V_{source}" /></span></li>
                            <li><strong>الشحنة على كل مواسع = الشحنة الكلية:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="Q_1 = Q_2 = Q_3 = Q_{total}" /></span></li>
                            <li><strong>احسب جهد كل مواسع على حدة:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="V_1 = \frac{Q}{C_1}, \quad V_2 = \frac{Q}{C_2}, \quad V_3 = \frac{Q}{C_3}" /></span></li>
                            <li><strong>تحقق:</strong> مجموع الجهود = جهد المصدر: <span dir="ltr" className="inline-block mx-1"><InlineMath math="V_1 + V_2 + V_3 = V_{source}" /></span></li>
                        </ol>
                    </div>

                    {/* التوازي - خطوات مفصلة */}
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <p className="font-bold text-green-800 text-right mb-3">⚡ خطوات حل مسائل التوازي:</p>
                        <ol className="space-y-2 text-right text-green-700 list-decimal list-inside">
                            <li><strong>الجهد ثابت على جميع المواسعات = جهد المصدر:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="V_1 = V_2 = V_3 = V_{source}" /></span></li>
                            <li><strong>احسب شحنة كل مواسع على حدة:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="Q_1 = C_1 \times V, \quad Q_2 = C_2 \times V, \quad Q_3 = C_3 \times V" /></span></li>
                            <li><strong>الشحنة الكلية = مجموع الشحنات:</strong> <span dir="ltr" className="inline-block mx-1"><InlineMath math="Q_{total} = Q_1 + Q_2 + Q_3" /></span></li>
                        </ol>
                    </div>

                    {/* الدارات المركبة */}
                    <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
                        <p className="font-bold text-orange-800 text-right mb-2">🔄 للدارات المركبة:</p>
                        <p className="text-orange-700 text-right">ابدأ من الداخل للخارج، اختصر التوالي والتوازي خطوة بخطوة حتى تصل لمواسعة مكافئة واحدة.</p>
                    </div>

                    {/* الطاقة المخزنة */}
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                        <p className="font-bold text-yellow-800 text-right mb-2">⚡ الطاقة المخزنة في المواسع:</p>
                        <div dir="ltr" className="bg-white p-3 rounded text-center">
                            <BlockMath math="PE = \frac{1}{2}CV^2 = \frac{1}{2}QV = \frac{Q^2}{2C}" />
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
