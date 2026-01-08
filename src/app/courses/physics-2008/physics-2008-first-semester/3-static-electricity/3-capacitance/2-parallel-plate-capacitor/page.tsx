
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function ParallelPlateCapacitorPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: المواسعة الكهربائية</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (2): المواسع ذو صفيحتين متوازيتين</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            في هذه الحصة، نشتق قانون مواسعة المواسع ذو الصفيحتين المتوازيتين وندرس تأثير تغيير الأبعاد الهندسية.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/courses/physics-2008/physics-2008-first-semester">
                            <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* Video Player */}
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/cd2d9b2a-191e-40c1-9990-0438d879afb4/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>اشتقاق قانون مواسعة المواسع ذو الصفيحتين المتوازيتين.</li>
                                    <li>العوامل المؤثرة على المواسعة (المساحة، المسافة، نوع الوسط).</li>
                                    <li>تغيير الأبعاد والمواسع متصل بالبطارية (V ثابت).</li>
                                    <li>تغيير الأبعاد والمواسع مفصول عن البطارية (Q ثابت).</li>
                                    <li>حسابات الطاقة والشحنة والجهد في كلتا الحالتين.</li>
                                </ul>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar: Related Content */}
                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>موارد إضافية</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="ghost" className="w-full justify-start">
                                    <FileText className="me-3" /> ورقة عمل الدرس (PDF)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> ملخص القوانين
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-3xl h-auto max-h-[85vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>ملخص: المواسع ذو صفيحتين متوازيتين</DialogTitle>
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
                                    <DialogContent className="max-w-4xl h-5/6 overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>اختبار قصير: المواسع ذو صفيحتين متوازيتين</DialogTitle>
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
