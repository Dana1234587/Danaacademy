
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function ElectricCurrentConceptPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الأول: المقاومة والقوة الدافعة الكهربائية</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (1): مفهوم التيار الكهربائي</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            في هذه الحصة، نتعرف على مفهوم التيار الكهربائي وقانونه، والتيار الاصطلاحي واتجاهه، وتعريف الأمبير.
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
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/placeholder/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>تعريف التيار الكهربائي: معدل تدفق الشحنة خلال مقطع الموصل.</li>
                                    <li>قانون التيار: I = Q/t (الشحنة على الزمن).</li>
                                    <li>التيار المتوسط (DC): ثابت بالمقدار والاتجاه.</li>
                                    <li>التيار الاصطلاحي: من القطب الموجب للسالب خارج البطارية.</li>
                                    <li>تعريف الأمبير: 1A = 1C/1s.</li>
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
                                            <DialogTitle>ملخص: مفهوم التيار الكهربائي</DialogTitle>
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
                                            <DialogTitle>اختبار قصير: مفهوم التيار الكهربائي</DialogTitle>
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
