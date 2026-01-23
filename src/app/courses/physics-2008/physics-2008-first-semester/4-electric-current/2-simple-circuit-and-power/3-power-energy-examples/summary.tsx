
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* تعريف القدرة الكهربائية */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ تعريف القدرة الكهربائية (Electric Power)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>التعريف:</strong> "الشغل المبذول في وحدة الزمن."
                        </p>
                    </div>
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border">
                        <BlockMath math="P = \frac{W}{t}" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-center font-bold">الرمز</TableHead>
                                <TableHead className="text-center font-bold">الكمية الفيزيائية</TableHead>
                                <TableHead className="text-center font-bold">الوحدة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="P" /></TableCell>
                                <TableCell className="text-center">القدرة (Power)</TableCell>
                                <TableCell className="text-center">Watt (W)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="W" /></TableCell>
                                <TableCell className="text-center">الشغل (Work)</TableCell>
                                <TableCell className="text-center">Joule (J)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="t" /></TableCell>
                                <TableCell className="text-center">الزمن (Time)</TableCell>
                                <TableCell className="text-center">Second (s)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-right">
                        <p className="text-blue-800">
                            <strong>تعريف الواط (Watt):</strong> جول واحد لكل ثانية = <InlineMath math="1 \, W = 1 \, J/s" />
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* قوانين القدرة المستهلكة في مقاومة خارجية */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">📐 قوانين القدرة المستهلكة في مقاومة خارجية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-300">
                            <BlockMath math="P = I \cdot V" />
                            <p className="text-sm text-blue-600 mt-2">التيار × الجهد</p>
                        </div>
                        <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-300">
                            <BlockMath math="P = I^2 \cdot R" />
                            <p className="text-sm text-blue-600 mt-2">التيار² × المقاومة</p>
                        </div>
                        <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-300">
                            <BlockMath math="P = \frac{V^2}{R}" />
                            <p className="text-sm text-blue-600 mt-2">الجهد² ÷ المقاومة</p>
                        </div>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-center font-bold">الرمز</TableHead>
                                <TableHead className="text-center font-bold">الكمية</TableHead>
                                <TableHead className="text-center font-bold">الوحدة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="P" /></TableCell>
                                <TableCell className="text-center">القدرة</TableCell>
                                <TableCell className="text-center">Watt (W)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="I" /></TableCell>
                                <TableCell className="text-center">التيار</TableCell>
                                <TableCell className="text-center">Ampere (A)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="V" /></TableCell>
                                <TableCell className="text-center">الجهد</TableCell>
                                <TableCell className="text-center">Volt (V)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="R" /></TableCell>
                                <TableCell className="text-center">المقاومة</TableCell>
                                <TableCell className="text-center">Ohm (Ω)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* الطاقة الكهربائية المستهلكة */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">🔋 الطاقة الكهربائية المستهلكة (Electric Energy)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-orange-300">
                        <BlockMath math="E = P \times t" />
                    </div>

                    <div className="bg-orange-100 p-4 rounded-lg border border-orange-200">
                        <p className="font-bold text-orange-800 text-right mb-3">⚠️ مهم جداً: وحدات الطاقة</p>
                        <Table>
                            <TableHeader>
                                <TableRow className="bg-orange-200">
                                    <TableHead className="text-center font-bold">إذا طُلبت الطاقة بـ</TableHead>
                                    <TableHead className="text-center font-bold">القدرة يجب أن تكون بـ</TableHead>
                                    <TableHead className="text-center font-bold">الزمن يجب أن يكون بـ</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow className="bg-white">
                                    <TableCell className="text-center font-bold text-green-700">Joule (J)</TableCell>
                                    <TableCell className="text-center">Watt (W)</TableCell>
                                    <TableCell className="text-center">Second (s)</TableCell>
                                </TableRow>
                                <TableRow className="bg-white">
                                    <TableCell className="text-center font-bold text-purple-700">kWh (كيلو واط ساعة)</TableCell>
                                    <TableCell className="text-center">kW (كيلو واط)</TableCell>
                                    <TableCell className="text-center">hour (h) ساعة</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </div>
                </CardContent>
            </Card>

            {/* تحويلات الوحدات */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">🔄 تحويلات الوحدات</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* تحويلات القدرة */}
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="font-bold text-purple-800 text-right mb-3">تحويلات القدرة:</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4" dir="ltr">
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="1 \, kW = 1000 \, W" />
                                <p className="text-sm text-purple-600 mt-1" dir="rtl">من كيلو واط إلى واط: × 1000</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="1 \, W = 0.001 \, kW" />
                                <p className="text-sm text-purple-600 mt-1" dir="rtl">من واط إلى كيلو واط: ÷ 1000</p>
                            </div>
                        </div>
                    </div>

                    {/* تحويلات الزمن */}
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="font-bold text-purple-800 text-right mb-3">تحويلات الزمن:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="ltr">
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="1 \, h = 60 \, min" />
                                <p className="text-sm text-purple-600 mt-1" dir="rtl">ساعة = 60 دقيقة</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="1 \, min = 60 \, s" />
                                <p className="text-sm text-purple-600 mt-1" dir="rtl">دقيقة = 60 ثانية</p>
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="1 \, h = 3600 \, s" />
                                <p className="text-sm text-purple-600 mt-1" dir="rtl">ساعة = 3600 ثانية</p>
                            </div>
                        </div>
                    </div>

                    {/* تحويل عكسي */}
                    <div className="bg-white p-4 rounded-lg border border-purple-200">
                        <p className="font-bold text-purple-800 text-right mb-3">التحويل العكسي:</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4" dir="ltr">
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="s \to min: \div 60" />
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="min \to h: \div 60" />
                            </div>
                            <div className="bg-purple-100 p-3 rounded text-center">
                                <InlineMath math="s \to h: \div 3600" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* قاعدة ذهبية */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">💎 قواعد ذهبية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-green-200 text-right">
                        <p className="text-green-800">
                            ✅ للحصول على الطاقة بالجول: استخدم القدرة بالواط والزمن بالثواني
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200 text-right">
                        <p className="text-green-800">
                            ✅ للحصول على الطاقة بالكيلو واط ساعة: استخدم القدرة بالكيلو واط والزمن بالساعات
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-green-200 text-right">
                        <p className="text-green-800">
                            ✅ <InlineMath math="1 \, kWh = 3.6 \times 10^6 \, J" />
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
