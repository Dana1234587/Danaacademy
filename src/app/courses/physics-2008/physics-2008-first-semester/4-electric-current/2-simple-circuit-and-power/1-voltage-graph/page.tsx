
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function VoltageGraphPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثاني: الدارة البسيطة والقدرة الكهربائية</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (1): التمثيل البياني لتغيرات الجهد الكهربائي</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            في هذه الحصة، ندرس كيفية تمثيل تغيرات الجهد الكهربائي بيانياً في الدارة الكهربائية.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/courses/physics-2008/physics-2008-first-semester">
                            <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 space-y-6">
                        <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/placeholder/playlist.m3u8" />

                        <Card>
                            <CardHeader>
                                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                    <li>تمثيل تغيرات الجهد في الدارة الكهربائية البسيطة.</li>
                                    <li>فهم كيف يتغير الجهد عند المرور بالمقاومات والبطارية.</li>
                                    <li>رسم منحنى الجهد بالنسبة للموقع في الدارة.</li>
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
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
