
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* تعريف المقاومية */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">ρ تعريف المقاومية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800">
                            <strong>المقاومية (ρ):</strong> هي مقاومة موصل طوله <strong>1 متر</strong> ومساحة مقطعه العرضي <strong>1 متر مربع</strong>.
                        </p>
                    </div>
                    <div dir="ltr" className="bg-white p-3 rounded-lg text-center border">
                        <BlockMath math="\rho = R \times \frac{A}{L}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed">
                        <strong>من قانون:</strong> <InlineMath math="R = \rho \frac{L}{A}" /> نستنتج أن <InlineMath math="\rho = R \times \frac{A}{L}" />
                    </CardDescription>
                </CardContent>
            </Card>

            {/* وحدة المقاومية */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">📐 وحدة قياس المقاومية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-green-200">
                        <BlockMath math="\text{وحدة } \rho = \Omega \cdot m \text{ (أوم . متر)}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-green-800">
                        <strong>اشتقاق الوحدة:</strong>
                        <div dir="ltr" className="mt-2">
                            <InlineMath math="\rho = R \times \frac{A}{L} \Rightarrow \Omega \times \frac{m^2}{m} = \Omega \cdot m" />
                        </div>
                    </CardDescription>
                </CardContent>
            </Card>

            {/* جدول المقارنة */}
            <Card className="shadow-md border-2 border-orange-200">
                <CardHeader className="bg-orange-100/50">
                    <CardTitle className="text-orange-700 text-xl text-right">📊 مقارنة بين المقاومة والمقاومية</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-right font-bold">العامل المؤثر</TableHead>
                                <TableHead className="text-center font-bold text-blue-600">المقاومة (R)</TableHead>
                                <TableHead className="text-center font-bold text-purple-600">المقاومية (ρ)</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium text-right">الطول (L) ↑</TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">تزداد ↑</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">لا تتأثر ━</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">المساحة (A) ↑</TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">تنقص ↓</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">لا تتأثر ━</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">نصف القطر (r) ↑</TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">تنقص ↓</span>
                                    <p className="text-xs text-gray-500 mt-1">(لأن A = πr² تزداد)</p>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">لا تتأثر ━</span>
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-yellow-50">
                                <TableCell className="font-medium text-right">درجة الحرارة (T) ↑</TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">تزداد ↑</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">تزداد ↑</span>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">نوع المادة</TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">تتأثر</span>
                                </TableCell>
                                <TableCell className="text-center">
                                    <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded">تتأثر</span>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* قاعدة ذهبية */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💎 قاعدة ذهبية</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="bg-white p-4 rounded-lg border border-purple-200 text-right space-y-3">
                        <p className="text-purple-800">
                            <strong>موصلان من نفس المادة وعند نفس درجة الحرارة:</strong>
                        </p>
                        <ul className="space-y-2 text-purple-700">
                            <li className="flex items-start gap-2">
                                <span className="text-green-600">✓</span>
                                <span>لهما <strong>نفس المقاومية</strong> (ρ)</span>
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-red-600">✗</span>
                                <span><strong>ليس شرطاً</strong> أن يكون لهما نفس المقاومة (R) - لأن R تعتمد أيضاً على الأبعاد</span>
                            </li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* ملخص سريع */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">💡 للتذكر</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                            <p className="font-bold text-blue-700 mb-2">المقاومية (ρ)</p>
                            <p className="text-sm text-blue-600">خاصية للمادة نفسها</p>
                            <p className="text-xs text-gray-500 mt-1">تعتمد على: نوع المادة + الحرارة</p>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-blue-200 text-center">
                            <p className="font-bold text-blue-700 mb-2">المقاومة (R)</p>
                            <p className="text-sm text-blue-600">خاصية للموصل بالكامل</p>
                            <p className="text-xs text-gray-500 mt-1">تعتمد على: المادة + الحرارة + الأبعاد</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
