'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function LenzLawP1Page() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: الحث الكهرومغناطيسي</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (8): قانون لنز (شرح)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            مفهوم قانون لنز وتحديد اتجاه التيار الحثي عند تقريب أو إبعاد مغناطيس عن ملف.
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
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/b0f8ea8e-1be8-411c-b798-e5e47c4c6891/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>تطبيق قانون لنز في تحديد اتجاه التيار الحثي.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>قانون لنز ينص على أن التيار الحثي <span className="text-primary font-bold">يقاوم</span> التغير في التدفق الذي أحدثه.</li>
                                    <li>عند <span className="font-semibold text-secondary-foreground">تقريب قطب مغناطيسي</span>، ينشأ قطب مشابه ليحدث تنافر ويقاوم الزيادة في التدفق.</li>
                                    <li>عند <span className="font-semibold text-secondary-foreground">إبعاد قطب مغناطيسي</span>، ينشأ قطب مخالف ليحدث تجاذب ويقاوم النقصان في التدفق.</li>
                                    <li>استخدام قاعدة اليد اليمنى لمعرفة اتجاه التيار الحثي بناءً على الأقطاب المتكونة.</li>
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
                                    <FileText className="me-3" /> ورقة عمل: قانون لنز (PDF)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> ملخص: قانون لنز (الجزء الأول)
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>خلاصة الحصة والتطبيقات المفاهيمية</DialogTitle>
                                        </DialogHeader>
                                        <SummaryPage />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BrainCircuit className="me-3" /> اختبار المهارات المفاهيمية
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>اختبار قصير: اتجاهات وتطبيقات لنز</DialogTitle>
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
