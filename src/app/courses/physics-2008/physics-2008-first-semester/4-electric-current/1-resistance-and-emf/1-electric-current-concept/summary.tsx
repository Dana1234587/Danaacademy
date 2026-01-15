
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="p-4 bg-muted/40 rounded-lg space-y-6">

            {/* قانون التيار */}
            <Card className="shadow-md border-2 border-primary/20">
                <CardHeader className="bg-primary/5">
                    <CardTitle className="text-primary text-xl text-right">⚡ قانون التيار الكهربائي</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-4">
                    <div dir="ltr" className="bg-yellow-50 p-4 rounded-lg text-center border border-yellow-200">
                        <BlockMath math="I = \frac{Q}{t}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed">
                        <strong>حيث:</strong>
                        <ul className="mt-2 space-y-1 list-disc list-inside">
                            <li><InlineMath math="I" /> = شدة التيار الكهربائي (بالأمبير A)</li>
                            <li><InlineMath math="Q" /> = كمية الشحنة (بالكولوم C)</li>
                            <li><InlineMath math="t" /> = الزمن (بالثانية s)</li>
                        </ul>
                    </CardDescription>
                    <div className="bg-blue-50 p-3 rounded-lg text-right border border-blue-200">
                        <p className="text-blue-800">
                            <strong>💡 ملاحظة:</strong> التيار المتوسط (DC) ثابت بالمقدار والاتجاه. بزيادة الزمن تزداد الشحنة المتدفقة، لكن التيار يبقى ثابتاً.
                        </p>
                    </div>
                </CardContent>
            </Card>

            {/* تعريف الأمبير */}
            <Card className="shadow-md border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 text-xl text-right">🔌 تعريف الأمبير</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div dir="ltr" className="bg-white p-3 rounded-lg text-center border border-green-200">
                        <BlockMath math="1 \text{ A} = \frac{1 \text{ C}}{1 \text{ s}}" />
                    </div>
                    <CardDescription className="text-right leading-relaxed text-green-800">
                        <strong>الأمبير الواحد:</strong> هو شدة التيار الذي يمر فيه شحنة مقدارها كولوم واحد خلال ثانية واحدة.
                    </CardDescription>
                </CardContent>
            </Card>

            {/* التيار الاصطلاحي */}
            <Card className="shadow-md border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 text-xl text-right">➡️ التيار الاصطلاحي</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* رسم توضيحي */}
                    <div className="bg-white p-4 rounded-lg border border-orange-200">
                        <svg viewBox="0 0 400 120" className="w-full h-28">
                            {/* البطارية */}
                            <rect x="30" y="35" width="50" height="50" fill="none" stroke="#333" strokeWidth="2" rx="5" />
                            <line x1="40" y1="50" x2="40" y2="70" stroke="#e11d48" strokeWidth="3" />
                            <line x1="70" y1="45" x2="70" y2="75" stroke="#333" strokeWidth="2" />
                            <text x="35" y="95" fontSize="12" fill="#e11d48">+</text>
                            <text x="67" y="95" fontSize="12" fill="#333">−</text>
                            <text x="55" y="110" textAnchor="middle" fontSize="10" fill="#666">بطارية</text>

                            {/* سلك علوي */}
                            <line x1="80" y1="45" x2="180" y2="45" stroke="#333" strokeWidth="2" />

                            {/* مقاومة */}
                            <rect x="180" y="30" width="60" height="30" fill="#f5f5f5" stroke="#333" strokeWidth="2" />
                            <text x="210" y="50" textAnchor="middle" fontSize="12" fill="#333">R</text>

                            {/* سلك علوي تكملة */}
                            <line x1="240" y1="45" x2="350" y2="45" stroke="#333" strokeWidth="2" />

                            {/* سلك يمين */}
                            <line x1="350" y1="45" x2="350" y2="75" stroke="#333" strokeWidth="2" />

                            {/* سلك سفلي */}
                            <line x1="350" y1="75" x2="80" y2="75" stroke="#333" strokeWidth="2" />

                            {/* سلك يسار */}
                            <line x1="80" y1="75" x2="80" y2="45" stroke="#333" strokeWidth="2" />

                            {/* سهم التيار الاصطلاحي */}
                            <path d="M 120 35 L 160 35 L 155 30 M 160 35 L 155 40" stroke="#e11d48" strokeWidth="2" fill="none" />
                            <text x="140" y="25" textAnchor="middle" fontSize="11" fill="#e11d48">I (اصطلاحي)</text>

                            {/* سهم التيار الفعلي */}
                            <path d="M 160 85 L 120 85 L 125 80 M 120 85 L 125 90" stroke="#2563eb" strokeWidth="2" fill="none" />
                            <text x="140" y="100" textAnchor="middle" fontSize="10" fill="#2563eb">حركة الإلكترونات</text>
                        </svg>
                    </div>

                    <CardDescription className="text-right leading-relaxed text-orange-800">
                        <strong>اتجاه التيار الاصطلاحي:</strong> من القطب الموجب (+) إلى القطب السالب (−) <strong>خارج البطارية</strong> (في السلك الخارجي).
                        <br /><br />
                        <strong>ملاحظة:</strong> هذا عكس اتجاه حركة الإلكترونات الفعلية التي تتحرك من السالب إلى الموجب.
                    </CardDescription>
                </CardContent>
            </Card>

            {/* تحويلات مهمة */}
            <Card className="shadow-md border-purple-200 bg-purple-50/50">
                <CardHeader>
                    <CardTitle className="text-purple-700 text-xl text-right">🔢 تحويلات مهمة</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-purple-800 font-bold mb-2">الشحنة</p>
                            <div dir="ltr">
                                <InlineMath math="1 \mu C = 10^{-6} C" />
                            </div>
                            <div dir="ltr" className="mt-1">
                                <InlineMath math="1 mC = 10^{-3} C" />
                            </div>
                        </div>
                        <div className="bg-white p-3 rounded-lg border border-purple-200">
                            <p className="text-purple-800 font-bold mb-2">التيار</p>
                            <div dir="ltr">
                                <InlineMath math="1 mA = 10^{-3} A" />
                            </div>
                            <div dir="ltr" className="mt-1">
                                <InlineMath math="1 \mu A = 10^{-6} A" />
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
