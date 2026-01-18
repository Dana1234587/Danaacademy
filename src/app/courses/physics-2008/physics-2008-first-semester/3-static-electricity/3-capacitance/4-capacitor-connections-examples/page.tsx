
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function CapacitorConnectionsExamplesPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: المواسعة الكهربائية</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (4): توصيل المواسعات (حل أمثلة إضافية)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            في هذه الحصة، نتدرب على حل مسائل متنوعة ومتقدمة على توصيل المواسعات بأنواعه المختلفة.
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
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/689f6685-d1aa-4d32-b992-42bc78387b3e/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>حل مسائل على التوصيل المختلط (توالي + توازي).</li>
                                    <li>حساب الجهد على كل مواسع في دارات التوالي.</li>
                                    <li>حساب الشحنة على كل مواسع في دارات التوازي.</li>
                                    <li>حساب الطاقة المخزنة في دارات المواسعات.</li>
                                    <li>تطبيقات عملية ومسائل من امتحانات سابقة.</li>
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
                                    <DialogContent className="max-w-4xl h-auto max-h-[85vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>ملخص: توصيل المواسعات</DialogTitle>
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
                                            <DialogTitle>اختبار قصير: توصيل المواسعات (أمثلة إضافية)</DialogTitle>
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
