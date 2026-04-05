'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import WatermarkedVideoPlayer from '@/components/video-player/WatermarkedVideoPlayer';

export default function SessionPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الأول: الطبيعة الجسيمية للضوء</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (2): اشعاع الجسم الاسود</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            تفاصيل الحصة سيتم إضافتها لاحقاً.
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

                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/8311678b-d79d-4456-9f47-62afdc8475d6/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                                <CardDescription>أهم أفكار الأسئلة في هذا الدرس.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>سيتم إضافة الملخص لاحقاً.</li>
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
                                <Button variant="ghost" className="w-full justify-start" disabled>
                                    <FileText className="me-3" /> ورقة عمل الدرس (قريباً)
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" disabled>
                                    <BarChart className="me-3" /> ملخص القوانين (قريباً)
                                </Button>
                                <Button variant="ghost" className="w-full justify-start" disabled>
                                    <BrainCircuit className="me-3" /> اختبار قصير (قريباً)
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
