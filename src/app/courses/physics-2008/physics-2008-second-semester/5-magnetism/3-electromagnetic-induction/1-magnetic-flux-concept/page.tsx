'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function MagneticFluxConceptPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: الحث الكهرومغناطيسي</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (1): مفهوم التدفق المغناطيسي (شرح)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            مقدمة في التدفق المغناطيسي، علاقته بمتجه المساحة، وحالات الزوايا المختلفة.
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

                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/966c94e1-6745-4d00-934b-b756611e423e/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>أهم الأفكار والقوانين التي تم تغطيتها في هذا الفيديو.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>مفهوم التدفق المغناطيسي كحاصل ضرب نقطي.</li>
                                    <li>اتجاه متجه المساحة دائماً عمودي على السطح للخارج.</li>
                                    <li>الزاوية $\theta$ تكون بين متجه المساحة وخطوط المجال المغناطيسي.</li>
                                    <li>حالات انعدام التدفق والتدفقات العظمى (الموجبة والسالبة).</li>
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
                                    <FileText className="me-3" /> ورقة عمل الدرس (PDF)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> ملخص القوانين
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>ملخص: مفهوم التدفق المغناطيسي</DialogTitle>
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
                                            <DialogTitle>اختبار قصير: التدفق المغناطيسي</DialogTitle>
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
