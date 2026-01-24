
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* قاعدة كيرتشوف الثانية */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ قاعدة كيرتشوف الثانية (قاعدة العروة)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>النص:</strong> "مجموع تغيرات الجهد الجبري حول أي حلقة مغلقة في الدارة = صفر"
                        </p>
                    </div>
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border">
                        <BlockMath math="\sum \Delta V = 0" />
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-right">
                        <p className="text-blue-800">
                            <strong>المبدأ الفيزيائي:</strong> مبدأ حفظ الطاقة - الطاقة المكتسبة = الطاقة المفقودة.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* قواعد تغيرات الجهد */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">📐 قواعد حساب تغيرات الجهد</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-center font-bold">العنصر</TableHead>
                                <TableHead className="text-center font-bold">الاتجاه</TableHead>
                                <TableHead className="text-center font-bold">تغير الجهد</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow className="bg-green-50">
                                <TableCell className="text-center font-medium">البطارية (ε)</TableCell>
                                <TableCell className="text-center">من - إلى + (عكس التيار)</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">
                                    <InlineMath math="+\varepsilon" /> (ارتفاع)
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-red-50">
                                <TableCell className="text-center font-medium">البطارية (ε)</TableCell>
                                <TableCell className="text-center">من + إلى - (مع التيار)</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">
                                    <InlineMath math="-\varepsilon" /> (هبوط)
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-red-50">
                                <TableCell className="text-center font-medium">المقاومة (R)</TableCell>
                                <TableCell className="text-center">مع اتجاه التيار</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">
                                    <InlineMath math="-IR" /> (هبوط)
                                </TableCell>
                            </TableRow>
                            <TableRow className="bg-green-50">
                                <TableCell className="text-center font-medium">المقاومة (R)</TableCell>
                                <TableCell className="text-center">عكس اتجاه التيار</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">
                                    <InlineMath math="+IR" /> (ارتفاع)
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* فرق الجهد بين نقطتين */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">🔍 حساب فرق الجهد بين نقطتين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="bg-white p-4 rounded-lg border border-purple-200 text-right">
                        <p className="text-purple-800 mb-2">
                            <strong>الطريقة:</strong> نتحرك من النقطة الأولى إلى الثانية ونجمع كل تغيرات الجهد.
                        </p>
                        <div dir="ltr" className="bg-purple-100 p-2 rounded text-center">
                            <InlineMath math="V_{AB} = V_A - V_B = \sum \text{(تغيرات الجهد من A إلى B)}" />
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border">
                        <p className="text-center font-bold text-purple-700 mb-3">مثال: فرق الجهد V_AB</p>
                        <svg viewBox="0 0 350 100" className="w-full h-24">
                            {/* النقطة A */}
                            <circle cx="30" cy="50" r="10" fill="#8b5cf6" />
                            <text x="30" y="55" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">A</text>

                            {/* بطارية */}
                            <line x1="40" y1="50" x2="70" y2="50" stroke="#333" strokeWidth="2" />
                            <line x1="70" y1="35" x2="70" y2="65" stroke="#333" strokeWidth="3" />
                            <line x1="78" y1="42" x2="78" y2="58" stroke="#333" strokeWidth="2" />
                            <text x="60" y="75" fontSize="9" fill="#666">-</text>
                            <text x="82" y="75" fontSize="9" fill="#666">+</text>
                            <text x="74" y="25" fontSize="10" fill="#16a34a">ε=10V</text>

                            {/* مقاومة */}
                            <line x1="78" y1="50" x2="120" y2="50" stroke="#333" strokeWidth="2" />
                            <rect x="120" y="40" width="60" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
                            <text x="150" y="75" fontSize="10" fill="#2563eb">R, I=2A</text>
                            <text x="150" y="30" fontSize="9" fill="#dc2626">V=IR=6V</text>

                            {/* سلك */}
                            <line x1="180" y1="50" x2="280" y2="50" stroke="#333" strokeWidth="2" />

                            {/* النقطة B */}
                            <circle cx="290" cy="50" r="10" fill="#8b5cf6" />
                            <text x="290" y="55" textAnchor="middle" fontSize="12" fill="white" fontWeight="bold">B</text>

                            {/* سهم اتجاه السير */}
                            <text x="160" y="95" textAnchor="middle" fontSize="10" fill="#333">→ اتجاه السير</text>
                        </svg>
                        <div className="text-center mt-2 bg-purple-100 p-2 rounded">
                            <p className="text-sm"><InlineMath math="V_{AB} = +\varepsilon - IR = 10 - 6 = 4V" /></p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* ملخص قاعدتي كيرتشوف */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">💎 ملخص قاعدتي كيرتشوف</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-green-100">
                                <TableHead className="text-center font-bold">القاعدة</TableHead>
                                <TableHead className="text-center font-bold">الاسم</TableHead>
                                <TableHead className="text-center font-bold">المبدأ</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center font-medium">الأولى</TableCell>
                                <TableCell className="text-center">قاعدة الوصلة (Junction)</TableCell>
                                <TableCell className="text-center">حفظ الشحنة</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center font-medium">الثانية</TableCell>
                                <TableCell className="text-center">قاعدة العروة (Loop)</TableCell>
                                <TableCell className="text-center">حفظ الطاقة</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
