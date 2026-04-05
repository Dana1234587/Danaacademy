'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function TextbookQuestionsLesson3Page() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الوحدة الخامسة: المغناطيسية</p>
                        <h1 className="text-3xl font-bold mt-1">حل أسئلة الكتاب (الدرس الثالث: الحث الكهرومغناطيسي)</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            حل مفصل لأسئلة المراجعة وأسئلة التفكير لدرس الحث الكهرومغناطيسي من الكتاب المدرسي.
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
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/b03f3930-1bf6-4e46-858f-da64f1eb87d3/playlist.m3u8" />
                    </div>

                    <div className="lg:col-span-1 space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>موارد إضافية</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="ghost" className="w-full justify-start">
                                    <FileText className="me-3" /> تحميل إجابات أسئلة الدرس الثالث (PDF)
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
