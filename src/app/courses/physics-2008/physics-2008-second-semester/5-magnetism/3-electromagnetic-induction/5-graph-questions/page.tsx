'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function GraphQuestionsPage() {
    return (
        <div className="min-h-screen bg-muted/40">
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <p className="text-sm text-primary font-medium">الدرس الثالث: الحث الكهرومغناطيسي</p>
                        <h1 className="text-3xl font-bold mt-1">حصة رقم (5): حل أسئلة الرسم البياني</h1>
                        <p className="text-muted-foreground mt-2 max-w-2xl">
                            متابعة وتطبيق على استخراج المعطيات وحل أسئلة الرسومات البيانية الخاصة بالحث.
                        </p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/courses/physics-2008/physics-2008-second-semester">
                            <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    <WatermarkedVideoPlayer src="https://vz-2adfd2e0-f8c.b-cdn.net/4fe2e49b-e1ea-49ca-a99e-2ed9b2fc8df3/playlist.m3u8" />

                    <Card>
                        <CardHeader>
                            <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                            <CardDescription>التركيز على مهارة قراءة الرسم البياني واستخراج الميل.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                                <li>كيفية حساب الميل (Slope) من أي منحنى بياني (تغير التدفق مع الزمن).</li>
                                <li>علاقة الميل الرياضي بالقوة الدافعة الكهربائية الحثية حسب قانون فاراداي.</li>
                                <li>فهم مدلول الإشارة السالبة والموجبة من ميل الخط المستقيم.</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
