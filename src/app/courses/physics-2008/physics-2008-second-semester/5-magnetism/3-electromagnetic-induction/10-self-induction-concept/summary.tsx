import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Activity, Power, Layers } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

export default function SummaryPage() {
    return (
        <div className="space-y-6">
            <Alert className="bg-primary/10 border-primary">
                <Activity className="h-5 w-5 text-primary" />
                <AlertTitle className="text-primary font-bold text-lg mb-2">1. ظاهرة الحث الذاتي (Self-Induction)</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    هي ظاهرة تولّد قوة دافعة كهربائية حثية في ملف (محث) نتيجة <strong>تغير التيار المار في الملف نفسه</strong>، مما يسبب تغيراً في التدفق المغناطيسي الذي يخترق نفس الملف.
                </AlertDescription>
            </Alert>

            <Card className="border-2 border-muted">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2 text-foreground">
                        <Power className="text-primary" />
                        سلوك التيار عند التحكم بالدارة
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="bg-emerald-50 dark:bg-emerald-900/20 p-4 rounded-lg border border-emerald-200 dark:border-emerald-800">
                            <h4 className="font-bold text-emerald-800 dark:text-emerald-400 mb-2">في لحظة إغلاق الدارة</h4>
                            <p className="text-foreground">
                                ينمو التيار <span className="font-semibold text-emerald-600 dark:text-emerald-300">تدريجياً</span> (لا يصل لقيمته العظمى فوراً) بسبب تولد <strong>قوة دافعة حثية عكسية</strong> تقاوم الزيادة في التيار حسب قانون لنز.
                            </p>
                        </div>
                        <div className="bg-rose-50 dark:bg-rose-900/20 p-4 rounded-lg border border-rose-200 dark:border-rose-800">
                            <h4 className="font-bold text-rose-800 dark:text-rose-400 mb-2">في لحظة فتح الدارة</h4>
                            <p className="text-foreground">
                                يتلاشى التيار <span className="font-semibold text-rose-600 dark:text-rose-300">تدريجياً</span> (لا يصل للصفر فوراً) بسبب تولد <strong>قوة دافعة حثية طردية</strong> تقاوم النقصان في التيار وتحافظ عليه قدر الإمكان.
                            </p>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="border-2 border-muted">
                <CardHeader className="bg-muted/30 pb-4">
                    <CardTitle className="text-xl flex items-center gap-2">
                        <Layers className="text-primary" />
                        2. المحث ومعامل الحث الذاتي (<InlineMath math="L" />)
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-4 space-y-4 text-base leading-relaxed text-right">
                    <p className="font-medium text-foreground">
                        <strong>التعريف:</strong> ممانعة المحث للتغير في مقدار التيار المار فيه. وهو يقاس بوحدة <strong>الهنري (H)</strong>.
                    </p>
                    <div className="bg-accent/50 p-4 rounded-lg flex flex-col items-center">
                        <p className="text-sm text-muted-foreground mb-2">القانون العام للقوة الدافعة الحثية الذاتية:</p>
                        <BlockMath math="\varepsilon_L = -L \frac{\Delta I}{\Delta t}" />
                        {/* English law statements */}
                        <Card className="mt-4 border-2 border-gray-300/20">
                          <CardHeader className="bg-gray-100/30 pb-4">
                            <CardTitle className="text-lg flex items-center gap-2" dir="ltr">Self-Induction Laws (LTR)</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-2" dir="ltr">
                            <p>ε_L = -L \frac{ΔI}{Δt}</p>
                            <p>L = \frac{μ N^2 A}{ℓ}</p>
                            <p>L·I = N·Φ_B</p>
                          </CardContent>
                        </Card>
                    </div>
                </CardContent>
            </Card>

            <Alert>
                <Layers className="h-5 w-5" />
                <AlertTitle className="font-bold mb-2">3. محاثة الملف اللولبي (<InlineMath math="L" />)</AlertTitle>
                <AlertDescription className="text-base leading-relaxed text-right">
                    <p className="mb-2">يعتمد معامل الحث الذاتي لملف لولبي على أبعاده الهندسية والمادة داخله:</p>
                    <ul className="list-disc list-inside space-y-1 mb-4">
                        <li>عدد اللفات (<InlineMath math="N" />).</li>
                        <li>مساحة المقطع العرضي (<InlineMath math="A" />).</li>
                        <li>طول الملف (<InlineMath math="\ell" />).</li>
                        <li>النفاذية المغناطيسية لمادة القلب (<InlineMath math="\mu" />).</li>
                    </ul>
                    <div className="bg-background/50 border p-3 rounded-lg flex flex-col items-center max-w-sm mx-auto">
                        <BlockMath math="L = \frac{\mu N^2 A}{\ell}" />
                        <span className="text-sm font-semibold text-muted-foreground mt-2 inline-block w-full text-center">ودائماً تذكر علاقة الربط:</span>
                        <BlockMath math="L \cdot I = N \cdot \Phi_B" />
                    </div>
                </AlertDescription>
            </Alert>
        </div>
    );
}
