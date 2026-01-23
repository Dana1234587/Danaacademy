
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* تعريف القوة الدافعة الكهربائية */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ تعريف القوة الدافعة الكهربائية (EMF)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>التعريف:</strong> "الشغل اللازم لنقل وحدة الشحنات الموجبة من القطب السالب إلى القطب الموجب <strong>داخل البطارية</strong>."
                        </p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 text-right">
                        <p className="text-blue-800">
                            <strong>ملاحظة مهمة:</strong> مقدار القوة الدافعة الكهربائية يساوي <strong>أكبر فرق جهد</strong> بين طرفي البطارية (عندما لا يمر تيار في الدارة).
                        </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg border border-green-200 text-right">
                        <p className="text-green-800">
                            <strong>نوع الكمية:</strong> القوة الدافعة الكهربائية كمية <strong>قياسية</strong> (Scalar) - ليس لها اتجاه.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* قانون القوة الدافعة */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">📐 قانون القوة الدافعة الكهربائية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border">
                        <BlockMath math="\varepsilon = \frac{W}{Q}" />
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
                                <TableCell className="text-center"><InlineMath math="\varepsilon" /></TableCell>
                                <TableCell className="text-center">القوة الدافعة الكهربائية (EMF)</TableCell>
                                <TableCell className="text-center">Volt (V)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="W" /></TableCell>
                                <TableCell className="text-center">الشغل (Work)</TableCell>
                                <TableCell className="text-center">Joule (J)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="Q" /></TableCell>
                                <TableCell className="text-center">الشحنة الكهربائية (Charge)</TableCell>
                                <TableCell className="text-center">Coulomb (C)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* فرق الجهد بين طرفي البطارية */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">🔋 فرق الجهد بين طرفي البطارية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-orange-800">
                        عندما يمر تيار كهربائي في الدارة، يكون فرق الجهد بين طرفي البطارية أقل من القوة الدافعة بسبب <strong>المقاومة الداخلية</strong>.
                    </CardDescription>

                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border border-orange-300">
                        <BlockMath math="V = \varepsilon - I \cdot r" />
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
                                <TableCell className="text-center"><InlineMath math="V" /></TableCell>
                                <TableCell className="text-center">فرق الجهد بين طرفي البطارية</TableCell>
                                <TableCell className="text-center">Volt (V)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="\varepsilon" /></TableCell>
                                <TableCell className="text-center">القوة الدافعة الكهربائية (EMF)</TableCell>
                                <TableCell className="text-center">Volt (V)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="I" /></TableCell>
                                <TableCell className="text-center">شدة التيار (Current)</TableCell>
                                <TableCell className="text-center">Ampere (A)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="text-center"><InlineMath math="r" /></TableCell>
                                <TableCell className="text-center">المقاومة الداخلية (Internal Resistance)</TableCell>
                                <TableCell className="text-center">Ohm (Ω)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>

                    {/* رسم توضيحي للبطارية */}
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-center font-bold text-orange-700 mb-3">رسم توضيحي للبطارية</p>
                        <svg viewBox="0 0 350 120" className="w-full h-28">
                            {/* البطارية */}
                            <rect x="100" y="30" width="150" height="60" rx="5" fill="#f1f5f9" stroke="#333" strokeWidth="2" />

                            {/* القطب الموجب */}
                            <rect x="250" y="50" width="20" height="20" fill="#ef4444" stroke="#333" strokeWidth="1" />
                            <text x="260" y="45" textAnchor="middle" fontSize="16" fill="#ef4444" fontWeight="bold">+</text>

                            {/* القطب السالب */}
                            <rect x="80" y="50" width="20" height="20" fill="#3b82f6" stroke="#333" strokeWidth="1" />
                            <text x="90" y="45" textAnchor="middle" fontSize="16" fill="#3b82f6" fontWeight="bold">−</text>

                            {/* ε داخل البطارية */}
                            <text x="175" y="55" textAnchor="middle" fontSize="14" fill="#333">ε</text>

                            {/* المقاومة الداخلية */}
                            <text x="175" y="75" textAnchor="middle" fontSize="12" fill="#666">r (مقاومة داخلية)</text>

                            {/* فرق الجهد V */}
                            <line x1="80" y1="100" x2="270" y2="100" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrowGreen)" markerStart="url(#arrowGreenRev)" />
                            <text x="175" y="115" textAnchor="middle" fontSize="12" fill="#16a34a" fontWeight="bold">V = ε - Ir</text>

                            <defs>
                                <marker id="arrowGreen" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#16a34a" />
                                </marker>
                                <marker id="arrowGreenRev" markerWidth="10" markerHeight="10" refX="0" refY="3" orient="auto">
                                    <path d="M9,0 L9,6 L0,3 z" fill="#16a34a" />
                                </marker>
                            </defs>
                        </svg>
                    </div>
                </CardContent>
            </Card>

            {/* قاعدة ذهبية */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💎 قواعد ذهبية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-white p-3 rounded-lg border border-purple-200 text-right">
                        <p className="text-purple-800">
                            ✅ عندما <strong>لا يمر تيار</strong> (I = 0): فرق الجهد = القوة الدافعة (<InlineMath math="V = \varepsilon" />)
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-200 text-right">
                        <p className="text-purple-800">
                            ✅ عندما <strong>يمر تيار</strong>: فرق الجهد أقل من القوة الدافعة (<InlineMath math="V < \varepsilon" />)
                        </p>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-purple-200 text-right">
                        <p className="text-purple-800">
                            ✅ الهبوط في الجهد بسبب المقاومة الداخلية = <InlineMath math="I \cdot r" />
                        </p>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
