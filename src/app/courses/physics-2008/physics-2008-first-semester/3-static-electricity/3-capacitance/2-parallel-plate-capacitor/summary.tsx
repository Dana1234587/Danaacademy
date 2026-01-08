
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* قانون المواسعة */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-primary text-xl text-right">قانون مواسعة المواسع ذو الصفيحتين المتوازيتين</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-primary/5 p-4 rounded-lg text-center">
                        <BlockMath math="C = \varepsilon_0 \frac{A}{d}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed">
                        حيث: ε₀ = سماحية الهواء (الفراغ)، A = مساحة اللوح، d = المسافة بين اللوحين
                    </CardDescription>
                </CardContent>
            </Card>

            {/* العوامل المؤثرة */}
            <Card className="shadow-md">
                <CardHeader>
                    <CardTitle className="text-primary text-xl text-right">العوامل المؤثرة على المواسعة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-gray-100 p-3 rounded-lg text-center text-sm mb-4">
                        <BlockMath math="C = \varepsilon_0 \frac{A}{d}" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="text-right">العامل</TableHead>
                                <TableHead className="text-right">العلاقة مع C</TableHead>
                                <TableHead className="text-right">التفسير من القانون</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">المساحة (A)</TableCell>
                                <TableCell className="text-green-600 font-bold">طردية ↑</TableCell>
                                <TableCell>A في البسط → إذا زادت A تزداد C (بسط مع بسط)</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">المسافة (d)</TableCell>
                                <TableCell className="text-red-600 font-bold">عكسية ↓</TableCell>
                                <TableCell>d في المقام → إذا زادت d تنقص C (بسط مع مقام)</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* متصل بالبطارية */}
            <Card className="shadow-md border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 text-xl text-right">🔋 المواسع متصل بالبطارية (V ثابت)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-blue-800">
                        عندما يكون المواسع متصلاً بالبطارية، يبقى فرق الجهد ثابتاً ومساوياً لجهد البطارية.
                    </CardDescription>
                    <div dir="ltr" className="bg-blue-100 p-3 rounded-lg text-center text-sm">
                        <BlockMath math="C = \varepsilon_0 \frac{A}{d}" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-blue-100">
                                <TableHead className="text-right">التغيير</TableHead>
                                <TableHead className="text-center">C (من القانون)</TableHead>
                                <TableHead className="text-center">V</TableHead>
                                <TableHead className="text-center">Q = CV</TableHead>
                                <TableHead className="text-center">PE = ½CV²</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">زيادة المساحة (A↑)</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ (A بالبسط)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">نقصان المساحة (A↓)</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ (A بالبسط)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">زيادة المسافة (d↑)</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ (d بالمقام)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">نقصان المسافة (d↓)</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ (d بالمقام)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div dir="ltr" className="bg-blue-100 p-3 rounded-lg text-center text-sm">
                        <BlockMath math="Q = CV \quad \text{و} \quad PE = \frac{1}{2}CV^2" />
                    </div>
                </CardContent>
            </Card>

            {/* مفصول عن البطارية */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">🔌 المواسع مفصول عن البطارية (Q ثابت)</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <CardDescription className="text-right leading-relaxed text-orange-800">
                        عندما يكون المواسع مفصولاً عن البطارية، تبقى الشحنة المخزنة عليه ثابتة (لا مكان تذهب إليه).
                    </CardDescription>
                    <div dir="ltr" className="bg-orange-100 p-3 rounded-lg text-center text-sm">
                        <BlockMath math="C = \varepsilon_0 \frac{A}{d}" />
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow className="bg-orange-100">
                                <TableHead className="text-right">التغيير</TableHead>
                                <TableHead className="text-center">C (من القانون)</TableHead>
                                <TableHead className="text-center">Q</TableHead>
                                <TableHead className="text-center">V = Q/C</TableHead>
                                <TableHead className="text-center">PE = ½Q²/C</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <TableRow>
                                <TableCell className="font-medium">زيادة المساحة (A↑)</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ (A بالبسط)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ ينقص</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">نقصان المساحة (A↓)</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ (A بالبسط)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ يزداد</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">زيادة المسافة (d↑)</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ (d بالمقام)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ يزداد</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ تزداد</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell className="font-medium">نقصان المسافة (d↓)</TableCell>
                                <TableCell className="text-center text-green-600 font-bold">↑ (d بالمقام)</TableCell>
                                <TableCell className="text-center">ثابت</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ ينقص</TableCell>
                                <TableCell className="text-center text-red-600 font-bold">↓ تنقص</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <div dir="ltr" className="bg-orange-100 p-3 rounded-lg text-center text-sm">
                        <BlockMath math="V = \frac{Q}{C} \quad \text{و} \quad PE = \frac{1}{2}\frac{Q^2}{C}" />
                    </div>
                </CardContent>
            </Card>

            {/* ملخص سريع */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">💡 قاعدة ذهبية للتذكر</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-right text-purple-800">
                        <li>• <strong>من القانون C = ε₀A/d:</strong> A بالبسط (طردية)، d بالمقام (عكسية)</li>
                        <li>• <strong>متصل بالبطارية:</strong> V ثابت → استخدم PE = ½CV²</li>
                        <li>• <strong>مفصول عن البطارية:</strong> Q ثابت → استخدم PE = ½Q²/C</li>
                        <li>• <strong>إذا C زادت و V ثابت:</strong> PE تزداد (لأن PE ∝ C)</li>
                        <li>• <strong>إذا C زادت و Q ثابت:</strong> PE تنقص (لأن PE ∝ 1/C)</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
