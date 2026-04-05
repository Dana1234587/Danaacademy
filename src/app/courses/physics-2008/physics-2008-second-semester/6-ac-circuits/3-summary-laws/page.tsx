'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function Session3Page() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الأول: التيار المتردد</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (3): ملخص قوانين الدارات التيار المتردد</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            مراجعة شاملة لجميع القوانين المتعلقة بالتيار المتردد، من القيم اللحظية إلى الفعالة والقدرة لغايات الربط والحفظ.
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

                        {/* Replace with actual video URL when available */}
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/d216ca8f-50a4-42f5-884f-fc438450781a/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>تجميع وترتيب قوانين التيار المتردد.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>قوانين التردد والزمن الدوري.</li>
                                    <li>معادلات القيم اللحظية الجيبية.</li>
                                    <li>قوانين القيم الفعالة (الجهد والتيار).</li>
                                    <li>قانون أوم في حال التيار المتردد وقانون القدرة المتوسطة.</li>
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
                                                                <Button variant="ghost" className="w-full justify-start text-primary" asChild>
                                    <a href="https://drive.google.com/file/d/18R-jbSbF2H7gRRi_6YYFSYblhtYHv53Y/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                                        <FileText className="me-3" /> تحميل دوسية الدرس الأول
                                    </a>
                                </Button>
<Button variant="ghost" className="w-full justify-start">
                                    <FileText className="me-3" /> ورقة عمل الدرس (قريباً)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> ملخص القوانين
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>خريطة ذهنية للقوانين</DialogTitle>
                                        </DialogHeader>
                                        <SummaryPage />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BrainCircuit className="me-3" /> اختبار قصير للمراجعة
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>اختبار شامل للقوانين</DialogTitle>
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
