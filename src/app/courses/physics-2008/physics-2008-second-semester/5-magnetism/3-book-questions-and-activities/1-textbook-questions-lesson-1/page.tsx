'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function TextbookQuestionsLesson1Page() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">أسئلة الكتاب وكتاب الأنشطة</p>
                        <h1 className="text-3xl font-bold mt-1">حل أسئلة الكتاب (الدرس الأول)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            حل وتفسير أسئلة الكتاب المدرسي للدرس الأول: المجال المغناطيسي الناتج عن تيار.
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

                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/6f10ae89-80ae-4957-918c-64668dbd9c20/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>ملاحظات الحصة</CardTitle>
                                <CardDescription>أهم النقاط التي تم توضيحها خلال حل الأسئلة.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>تحليل أسئلة الكتاب المفاهيمية.</li>
                                    <li>خطوات حل المسائل الحسابية.</li>
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
                                    <FileText className="me-3" /> تحميل إجابات الدرس (PDF)
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
