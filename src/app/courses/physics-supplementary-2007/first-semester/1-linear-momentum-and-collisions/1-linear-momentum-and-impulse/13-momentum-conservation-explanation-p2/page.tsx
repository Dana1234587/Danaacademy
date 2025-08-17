
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function MomentumConservationP2Page() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الأول: الزخم الخطي والدفع</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (13): حفظ الزخم الخطي (شرح الجزء الثاني)</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة، سنواصل شرح مبدأ حفظ الزخم الخطي مع التركيز على التطبيقات والمسائل.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* عرض الفيديو بطريقة نموذجية */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src="https://iframe.mediadelivery.net/embed/480623/f86cf281-5973-494b-b0e0-6e6f0fca7508?autoplay=false&loop=false&muted=false&preload=true"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                ></iframe>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                    <CardDescription>أهم الأفكار والقوانين التي تم تغطيتها في هذا الفيديو.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>تطبيق قانون حفظ الزخم على الانفجارات والارتداد.</li>
                        <li>حل مسائل تصادمات باستخدام مبدأ حفظ الزخم.</li>
                        <li>مقارنة بين حفظ الزخم وحفظ الطاقة الميكانيكية.</li>
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
                  <FileText className="me-3"/> ورقة عمل الدرس (PDF)
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="me-3"/> ملخص القوانين
                </Button>
                 <Button variant="ghost" className="w-full justify-start">
                  <BrainCircuit className="me-3"/> اختبار قصير للمراجعة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
