
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';

const navigation = {
  prev: null, // This is the first lesson
  next: {
    label: 'الحصة التالية: العلاقة مع طاقة الحركة',
    path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-relation-with-kinetic-energy',
  },
};

export default function LinearMomentumConceptPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الأول: الزخم الخطي والدفع</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (1): مفهوم الزخم الخطي</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة، سنتعرف على أحد أهم المفاهيم في الميكانيكا الكلاسيكية، وكيف نصف حركة الأجسام من حولنا.
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
            
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-slate-200" style={{ paddingBottom: '56.25%' }}>
                 <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">سيتم إضافة الفيديو قريبًا</p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>سيتم إضافة النقاط الرئيسية هنا.</li>
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
                <Button variant="ghost" className="w-full justify-start" disabled>
                  <FileText className="me-3"/> ورقة عمل الدرس (قريبًا)
                </Button>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          <BarChart className="me-3"/> ملخص القوانين
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>ملخص قوانين: مفهوم الزخم الخطي</DialogTitle>
                        </DialogHeader>
                        <SummaryPage />
                    </DialogContent>
                 </Dialog>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          <BrainCircuit className="me-3"/> اختبار قصير للمراجعة
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>اختبار قصير: مفهوم الزخم الخطي</DialogTitle>
                        </DialogHeader>
                        <QuizPage />
                    </DialogContent>
                 </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
            {navigation.prev ? (
                <Button asChild variant="outline">
                    <Link href={navigation.prev.path}>
                        <ChevronRight className="me-2 h-4 w-4" />
                        {navigation.prev.label}
                    </Link>
                </Button>
            ) : (
                <div /> // Placeholder for alignment
            )}
            {navigation.next ? (
                <Button asChild>
                    <Link href={navigation.next.path}>
                        {navigation.next.label}
                        <ChevronLeft className="ms-2 h-4 w-4" />
                    </Link>
                </Button>
            ) : (
                <div /> // Placeholder for alignment
            )}
        </div>

      </div>
    </div>
  );
}
