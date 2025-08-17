
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function ConceptualQuestionsPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الأول: العزم والاتزان السكوني</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (3): العزم (حل أسئلة)</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              تطبيق عملي على مفهوم العزم من خلال حل مجموعة متنوعة من المسائل الحسابية.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg" style={{ paddingBottom: '56.25%' }}>
                <iframe
                    src="https://iframe.mediadelivery.net/embed/480623/3b4e13f1-77f2-49c5-8df1-5d492e238406?autoplay=false&loop=false&muted=false&preload=true"
                    className="absolute top-0 left-0 w-full h-full border-0"
                    loading="lazy"
                    allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
                    allowFullScreen={true}
                ></iframe>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>حل مسائل لحساب العزم المحصل.</li>
                        <li>مسائل على إيجاد القوة أو ذراعها من العزم.</li>
                        <li>تطبيقات متنوعة على العزم.</li>
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
