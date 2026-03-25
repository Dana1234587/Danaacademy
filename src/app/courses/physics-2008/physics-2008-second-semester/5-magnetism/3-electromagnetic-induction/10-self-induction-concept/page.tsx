'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function SelfInductionConceptPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: الحث الكهرومغناطيسي</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (10): الحث الذاتي (شرح)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            مفهوم ظاهرة الحث الذاتي، معامل المحاثة الذاتية، وسلوك التيار عند إغلاق وفتح الدارة.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/courses/physics-2008/physics-2008-second-semester">
                            <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/88eb487b-ff6e-4786-917e-496976096c5b/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>تأثير الحث الذاتي على مرور التيار في المحث.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>الحث الذاتي ينشأ بسبب <span className="font-bold text-foreground">تغير التيار المار في الملف نفسه</span> مما يؤدي لتولد قوة دافعة كهربائية حثية ذاتية.</li>
                                    <li>عند غلق الدارة: ينمو التيار <span className="text-secondary-foreground font-bold">تدريجياً</span> بسبب تولد قوة دافعة حثية <span className="text-red-500 font-bold">عكسية</span> تقاوم نمو التيار.</li>
                                    <li>عند فتح الدارة: يتلاشى التيار <span className="text-secondary-foreground font-bold">تدريجياً</span> بسبب قوة دافعة <span className="text-primary font-bold">طردية</span> تقاوم التلاشي.</li>
                                    <li>محاثة الملف (L) تعتمد على أبعاده الهندسية: <span dir="ltr">{'L = \\frac{\\mu N^2 A}{\\ell}'}</span></li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>موارد إضافية</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="ghost" className="w-full justify-start">
                                    <FileText className="me-3" /> ورقة عمل: الحث الذاتي (PDF)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> ملخص: الحث الذاتي وقوانينه
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>خلاصة الحصة وقوانين الحث الذاتي</DialogTitle>
                                        </DialogHeader>
                                        <SummaryPage />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BrainCircuit className="me-3" /> اختبار المفاهيم الأساسية
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>اختبار (حل ومفاهيم): الحث الذاتي (القسم 1)</DialogTitle>
                                        </DialogHeader>
                                        <QuizPage />
                                    </DialogContent>
                                </Dialog>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
