'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function SelfInductionQuestionsPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: الحث الكهرومغناطيسي</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (11): الحث الذاتي (حل أسئلة)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            تطبيق القوانين وحل مسائل حسابية متنوعة على ظاهرة الحث الذاتي والمحثات.
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
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/be3241d4-37e8-45be-9e0a-920d181e8e82/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>استراتيجيات حل أسئلة الحث الذاتي.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>قانون القوة الدافعة الحثية الذاتية: استخدام <span dir="ltr">{'\\varepsilon_L = -L \\frac{\\Delta I}{\\Delta t}'}</span> لربط معدل التغير في التيار مع الجهد المتولد.</li>
                                    <li>حساب المحاثة هندسياً للملف اللولبي عن طريق القانون: <span dir="ltr">{'L = \\frac{\\mu N^2 A}{\\ell}'}</span>.</li>
                                    <li>معرفة علاقة الربط <span dir="ltr">{'LI = N \\Phi_B'}</span> لحساب التدفق الكلي أو عدد اللفات أو المحاثة عند ثبات التيار المستقر.</li>
                                    <li>التمييز بين التغير في التيار (<span dir="ltr">{'\\Delta I'}</span>) والتغير في وقت التلاشي أو النمو (<span dir="ltr">{'\\Delta t'}</span>).</li>
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
                                    <FileText className="me-3" /> أسئلة الحث الذاتي المحلولة (PDF)
                                </Button>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BarChart className="me-3" /> استراتيجية الحل والقوانين
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>الدليل الرياضي لحل مسائل الحث الذاتي</DialogTitle>
                                        </DialogHeader>
                                        <SummaryPage />
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button variant="ghost" className="w-full justify-start">
                                            <BrainCircuit className="me-3" /> اختبار مهارات الحل
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                                        <DialogHeader>
                                            <DialogTitle>اختبار (حل ومفاهيم): الحث الذاتي (القسم 2)</DialogTitle>
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
