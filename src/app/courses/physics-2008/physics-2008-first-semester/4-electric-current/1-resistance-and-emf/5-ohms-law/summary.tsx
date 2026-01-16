
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* نص قانون أوم */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ نص قانون أوم</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200 text-right">
                        <p className="text-lg text-yellow-800 leading-relaxed">
                            <strong>نص القانون:</strong> "يتناسب التيار الكهربائي المار في موصل تناسباً طردياً مع فرق الجهد بين طرفيه، عند <strong>ثبوت درجة حرارة الموصل</strong>."
                        </p>
                    </div>
                    <div dir="ltr" className="bg-white p-4 rounded-lg text-center border">
                        <BlockMath math="I \propto V \quad \text{(at constant T)}" />
                        <BlockMath math="V = I \times R \quad \Rightarrow \quad I = \frac{V}{R}" />
                    </div>
                </CardContent>
            </Card>

            {/* الموصلات الأومية */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">📊 الموصلات الأومية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-blue-800">
                        <strong>الموصل الأومي:</strong> موصل تكون العلاقة بين التيار (I) وفرق الجهد (V) <strong>خطية</strong> (خط مستقيم يمر بنقطة الأصل) عند ثبوت درجة الحرارة.
                    </CardDescription>

                    {/* رسم بياني I-V */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-center font-bold text-blue-700 mb-3">الرسم البياني (I-V) للموصل الأومي</p>
                        <svg viewBox="0 0 350 200" className="w-full h-48">
                            {/* المحاور */}
                            <line x1="50" y1="170" x2="320" y2="170" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />
                            <line x1="50" y1="170" x2="50" y2="20" stroke="#333" strokeWidth="2" markerEnd="url(#arrow)" />

                            {/* تسميات المحاور */}
                            <text x="310" y="190" fontSize="14" fill="#333">V</text>
                            <text x="30" y="30" fontSize="14" fill="#333">I</text>
                            <text x="45" y="180" fontSize="12" fill="#333">0</text>

                            {/* خط أومي - درجة حرارة منخفضة (ميل أكبر) */}
                            <line x1="50" y1="170" x2="280" y2="40" stroke="#2563eb" strokeWidth="3" />
                            <text x="285" y="45" fontSize="11" fill="#2563eb">T₁ (منخفضة)</text>

                            {/* خط أومي - درجة حرارة عالية (ميل أصغر) */}
                            <line x1="50" y1="170" x2="280" y2="90" stroke="#dc2626" strokeWidth="3" />
                            <text x="285" y="95" fontSize="11" fill="#dc2626">T₂ (عالية)</text>

                            {/* سهم */}
                            <defs>
                                <marker id="arrow" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#333" />
                                </marker>
                            </defs>
                        </svg>
                        <div className="text-center mt-2">
                            <p className="text-sm text-blue-600">الميل = <InlineMath math="\frac{1}{R}" /> (مقلوب المقاومة)</p>
                            <p className="text-sm text-red-600 mt-1">↑ الحرارة ← ↑ المقاومة ← ↓ الميل</p>
                        </div>
                    </div>

                    {/* رسم بياني V-I */}
                    <div className="bg-white p-4 rounded-lg border border-blue-200">
                        <p className="text-center font-bold text-blue-700 mb-3">الرسم البياني (V-I) للموصل الأومي</p>
                        <svg viewBox="0 0 350 200" className="w-full h-48">
                            {/* المحاور */}
                            <line x1="50" y1="170" x2="320" y2="170" stroke="#333" strokeWidth="2" markerEnd="url(#arrow2)" />
                            <line x1="50" y1="170" x2="50" y2="20" stroke="#333" strokeWidth="2" markerEnd="url(#arrow2)" />

                            {/* تسميات المحاور */}
                            <text x="310" y="190" fontSize="14" fill="#333">I</text>
                            <text x="30" y="30" fontSize="14" fill="#333">V</text>
                            <text x="45" y="180" fontSize="12" fill="#333">0</text>

                            {/* خط أومي - درجة حرارة عالية (ميل أكبر) */}
                            <line x1="50" y1="170" x2="280" y2="40" stroke="#dc2626" strokeWidth="3" />
                            <text x="285" y="45" fontSize="11" fill="#dc2626">T₂ (عالية)</text>

                            {/* خط أومي - درجة حرارة منخفضة (ميل أصغر) */}
                            <line x1="50" y1="170" x2="280" y2="90" stroke="#2563eb" strokeWidth="3" />
                            <text x="285" y="95" fontSize="11" fill="#2563eb">T₁ (منخفضة)</text>

                            {/* سهم */}
                            <defs>
                                <marker id="arrow2" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto">
                                    <path d="M0,0 L0,6 L9,3 z" fill="#333" />
                                </marker>
                            </defs>
                        </svg>
                        <div className="text-center mt-2">
                            <p className="text-sm text-blue-600">الميل = <InlineMath math="R" /> (المقاومة)</p>
                            <p className="text-sm text-red-600 mt-1">↑ الحرارة ← ↑ المقاومة ← ↑ الميل</p>
                        </div>
                    </div>

                    <div className="bg-blue-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-blue-800">💡 أمثلة على الموصلات الأومية:</p>
                        <p className="text-blue-700 mt-1">الفلزات (المعادن) مثل: النحاس، الألمنيوم، الحديد، الفضة</p>
                    </div>
                </CardContent>
            </Card>

            {/* الموصلات اللاأومية */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">📈 الموصلات اللاأومية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-orange-800">
                        <strong>الموصل اللاأومي:</strong> موصل تكون العلاقة بين التيار (I) وفرق الجهد (V) <strong>غير خطية</strong> (منحني) سواء عند ثبوت درجة الحرارة أو تغيرها.
                    </CardDescription>

                    {/* رسم بياني للموصل اللاأومي */}
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <p className="text-center font-bold text-orange-700 mb-3">الرسم البياني للموصل اللاأومي</p>
                        <svg viewBox="0 0 350 200" className="w-full h-48">
                            {/* المحاور */}
                            <line x1="50" y1="170" x2="320" y2="170" stroke="#333" strokeWidth="2" />
                            <line x1="50" y1="170" x2="50" y2="20" stroke="#333" strokeWidth="2" />

                            {/* تسميات المحاور */}
                            <text x="310" y="190" fontSize="14" fill="#333">V</text>
                            <text x="30" y="30" fontSize="14" fill="#333">I</text>
                            <text x="45" y="180" fontSize="12" fill="#333">0</text>

                            {/* منحني غير خطي */}
                            <path d="M 50 170 Q 100 165 150 140 Q 200 100 250 50 Q 280 30 300 25"
                                stroke="#ea580c" strokeWidth="3" fill="none" />
                            <text x="305" y="30" fontSize="11" fill="#ea580c">منحني</text>
                        </svg>
                        <p className="text-center text-sm text-orange-600 mt-2">العلاقة غير خطية (منحني وليس خط مستقيم)</p>
                    </div>

                    <div className="bg-orange-100 p-3 rounded-lg text-right">
                        <p className="font-bold text-orange-800">💡 أمثلة على الموصلات اللاأومية:</p>
                        <ul className="text-orange-700 mt-2 space-y-1 list-disc list-inside">
                            <li><strong>الدايود (Diode)</strong> - الصمام الثنائي</li>
                            <li><strong>الترانزستور (Transistor)</strong> - المقحل</li>
                            <li><strong>LED</strong> - الصمام الباعث للضوء (الدايود الضوئي)</li>
                        </ul>
                    </div>
                </CardContent>
            </Card>

            {/* جدول المقارنة */}
            <Card className="shadow-md border-2 border-purple-200">
                <CardHeader className="bg-purple-100/50">
                    <CardTitle className="text-purple-700 text-xl text-right">📊 مقارنة: الموصلات الأومية vs اللاأومية</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-muted">
                                <TableHead className="text-right font-bold">الخاصية</TableHead>
                                <TableHead className="text-center font-bold text-blue-600">الموصل الأومي</TableHead>
                                <TableHead className="text-center font-bold text-orange-600">الموصل اللاأومي</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium text-right">شكل الرسم البياني</TableCell>
                                <TableCell className="text-center text-blue-600">خط مستقيم يمر بالأصل</TableCell>
                                <TableCell className="text-center text-orange-600">منحني (غير خطي)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">العلاقة I-V</TableCell>
                                <TableCell className="text-center text-blue-600">خطية (طردية ثابتة)</TableCell>
                                <TableCell className="text-center text-orange-600">غير خطية</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">المقاومة</TableCell>
                                <TableCell className="text-center text-blue-600">ثابتة عند ثبوت الحرارة</TableCell>
                                <TableCell className="text-center text-orange-600">تتغير مع التيار/الجهد</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium text-right">أمثلة</TableCell>
                                <TableCell className="text-center text-blue-600">الفلزات (نحاس، ألمنيوم)</TableCell>
                                <TableCell className="text-center text-orange-600">دايود، ترانزستور، LED</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* قاعدة ذهبية */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">💎 قاعدة ذهبية للرسم البياني</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                            <p className="font-bold text-green-700 mb-2">الرسم I-V</p>
                            <p className="text-sm text-green-600">المحور Y = التيار (I)</p>
                            <p className="text-sm text-green-600">المحور X = الجهد (V)</p>
                            <div dir="ltr" className="mt-2 bg-green-100 p-2 rounded">
                                <InlineMath math="\text{الميل} = \frac{1}{R}" />
                            </div>
                            <p className="text-xs text-red-600 mt-2">↑T ← ↑R ← ↓الميل</p>
                        </div>
                        <div className="bg-white p-4 rounded-lg border border-green-200 text-center">
                            <p className="font-bold text-green-700 mb-2">الرسم V-I</p>
                            <p className="text-sm text-green-600">المحور Y = الجهد (V)</p>
                            <p className="text-sm text-green-600">المحور X = التيار (I)</p>
                            <div dir="ltr" className="mt-2 bg-green-100 p-2 rounded">
                                <InlineMath math="\text{الميل} = R" />
                            </div>
                            <p className="text-xs text-red-600 mt-2">↑T ← ↑R ← ↑الميل</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
