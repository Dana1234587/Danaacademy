
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* تعريف الدارة البسيطة */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ الدارة الكهربائية البسيطة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>التعريف:</strong> دارة كهربائية <strong>لا يتفرع فيها التيار</strong> داخل البطارية (التيار نفسه يمر في جميع عناصر الدارة).
                        </p>
                    </div>

                    {/* رسم دارة بسيطة */}
                    <div className="bg-white p-4 rounded-lg border">
                        <p className="text-center font-bold text-primary mb-3">رسم دارة بسيطة</p>
                        <svg viewBox="0 0 350 120" className="w-full h-28">
                            {/* البطارية */}
                            <line x1="30" y1="60" x2="50" y2="60" stroke="#333" strokeWidth="2" />
                            <line x1="50" y1="40" x2="50" y2="80" stroke="#333" strokeWidth="3" />
                            <line x1="58" y1="48" x2="58" y2="72" stroke="#333" strokeWidth="2" />
                            <text x="54" y="95" textAnchor="middle" fontSize="10" fill="#666">ε, r</text>

                            {/* مقاومة خارجية */}
                            <line x1="58" y1="60" x2="130" y2="60" stroke="#333" strokeWidth="2" />
                            <rect x="130" y="50" width="60" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
                            <text x="160" y="85" textAnchor="middle" fontSize="10" fill="#2563eb">R (خارجية)</text>

                            {/* سلك عودة */}
                            <line x1="190" y1="60" x2="320" y2="60" stroke="#333" strokeWidth="2" />
                            <line x1="320" y1="60" x2="320" y2="20" stroke="#333" strokeWidth="2" />
                            <line x1="320" y1="20" x2="30" y2="20" stroke="#333" strokeWidth="2" />
                            <line x1="30" y1="20" x2="30" y2="60" stroke="#333" strokeWidth="2" />

                            {/* سهم التيار */}
                            <text x="175" y="15" textAnchor="middle" fontSize="10" fill="#dc2626">← I</text>
                        </svg>
                    </div>
                </CardContent>
            </Card>

            {/* معادلة الدارة البسيطة */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">📐 معادلة الدارة البسيطة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-300">
                        <BlockMath math="\varepsilon = I \cdot r + I \cdot R" />
                        <p className="text-sm text-blue-600 mt-2" dir="rtl">القوة الدافعة = جهد المقاومة الداخلية + جهد المقاومات الخارجية</p>
                    </div>

                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-blue-300">
                        <BlockMath math="I = \frac{\sum \varepsilon}{\sum r + R_{eq}}" />
                        <p className="text-sm text-blue-600 mt-2" dir="rtl">التيار = مجموع القوى الدافعة ÷ (مجموع المقاومات الداخلية + المقاومة المكافئة الخارجية)</p>
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
                                <TableCell className="text-center"><InlineMath math="\varepsilon" /></TableCell>
                                <TableCell className="text-center">القوة الدافعة (EMF)</TableCell>
                                <TableCell className="text-center">Volt (V)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="r" /></TableCell>
                                <TableCell className="text-center">المقاومة الداخلية</TableCell>
                                <TableCell className="text-center">Ohm (Ω)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="R" /></TableCell>
                                <TableCell className="text-center">المقاومة الخارجية</TableCell>
                                <TableCell className="text-center">Ohm (Ω)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* ملاحظات مهمة */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">⚠️ ملاحظات مهمة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-orange-200 text-right">
                        <p className="text-orange-800">
                            ✅ <strong>المقاومات الداخلية</strong> دائماً <strong>تُجمع</strong> بغض النظر عن اتجاهات القوى الدافعة.
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-orange-200 text-right">
                        <p className="text-orange-800">
                            ✅ <strong>المقاومات الخارجية</strong> نجد <strong>المكافئة</strong> حسب نوع التوصيل (توالي/توازي).
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-orange-200 text-right">
                        <p className="text-orange-800">
                            ✅ <strong>اتجاه القوة الدافعة:</strong> إذا كانت معاكسة للتيار ← تُطرح من مجموع ε.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* قراءة الفولتميتر */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">🔍 قراءة الفولتميتر</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-purple-100">
                                <TableHead className="text-center font-bold">موقع الفولتميتر</TableHead>
                                <TableHead className="text-center font-bold">القراءة</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center font-medium">على مقاومة</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="V = I \cdot R" /></div>
                                    <p className="text-sm text-purple-600" dir="rtl">(قانون أوم)</p>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center font-medium">على بطارية (يمر فيها تيار)</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="V = \varepsilon - I \cdot r" /></div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center font-medium">على بطارية مثالية <br />(r = 0 أو I = 0)</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="V = \varepsilon" /></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* القدرة الكهربائية */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">⚡ القدرة الكهربائية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-green-100">
                                <TableHead className="text-center font-bold">نوع القدرة</TableHead>
                                <TableHead className="text-center font-bold">القانون</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="text-center font-medium">قدرة مقاومة خارجية</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="P = I^2 R = \frac{V^2}{R} = IV" /></div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center font-medium">قدرة مستهلكة داخل البطارية</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="P_{int} = I^2 r" /></div>
                                </TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center font-medium">قدرة تنتجها البطارية (الكلية)</TableCell>
                                <TableCell className="text-center">
                                    <div dir="ltr"><InlineMath math="P_{total} = I \cdot \varepsilon" /></div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
