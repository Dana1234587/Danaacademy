
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

const navigation = {
  prev: {
    label: 'الحصة السابقة: حفظ الزخم الخطي (حل أسئلة)',
    path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-questions',
  },
  next: null,
};

export default function ProjectileMotionPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الثاني: تطبيقات على حفظ الزخم الخطي</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (14): حفظ الزخم الخطي عند اطلاق قذيفة</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة، نواصل شرح مبدأ حفظ الزخم الخطي مع التركيز على التطبيقات والمسائل.
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
            
            <WatermarkedVideoPlayer src="https://iframe.mediadelivery.net/embed/480623/f6884b5e-72ef-49ea-b290-8269940aa03f?autoplay=false&loop=false&muted=false&preload=true" />
            
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                    <CardDescription>أهم الأفكار التي نلاحظها من خلال المحاكاة والشرح.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>اشتقاق قانون حفظ الزخم الخطي من قانون نيوتن الثالث (الفعل ورد الفعل).</li>
                        <li>مشاهدة كيف يبقى الزخم الخطي الكلي محفوظًا في التصادمات المختلفة (مرن وغير مرن).</li>
                        <li>ملاحظة كيف تتغير الطاقة الحركية بينما يبقى الزخم محفوظًا في التصادمات غير المرنة.</li>
                        <li>تحليل حالات ارتداد الأجسام والتصادمات في بعد واحد باستخدام مبدأ حفظ الزخم.</li>
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
                <Button variant="ghost" className="w-full justify-start" asChild>
                  <Link href="https://drive.google.com/file/d/16cTtk7HMvfNbsHVAGNltS86iF2l8Ss8X/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <FileText className="me-3"/> ورقة عمل الدرس (PDF)
                  </Link>
                </Button>
                 <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="w-full justify-start">
                          <BarChart className="me-3"/> ملخص القوانين
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>ملخص قوانين: تطبيقات حفظ الزخم</DialogTitle>
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
                            <DialogTitle>اختبار قصير: تطبيقات حفظ الزخم</DialogTitle>
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
