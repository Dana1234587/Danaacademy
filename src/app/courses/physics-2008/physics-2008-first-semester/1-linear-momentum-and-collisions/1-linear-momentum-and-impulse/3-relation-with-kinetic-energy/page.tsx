
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
    label: 'الحصة السابقة: اسئلة الرسم البياني',
    path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-graph-questions',
  },
  next: null, // This is the last lesson for now
};

export default function RelationWithKineticEnergyPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الأول: الزخم الخطي والدفع</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (3): العلاقة بين الزخم الخطي والطاقة الحركية (شرح)</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة، نستكشف العلاقة الرياضية بين كميتي الزخم وطاقة الحركة، وكيف يمكن استخدام إحداهما لحساب الأخرى.
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
            
            <WatermarkedVideoPlayer src="https://iframe.mediadelivery.net/embed/480623/8f0be481-b442-4750-a813-4d7e1a88d03f?autoplay=false&loop=false&muted=false&preload=true" />
            
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>الفرق بين الزخم الخطي (كمية متجهة) وطاقة الحركة (كمية قياسية).</li>
                        <li>اشتقاق الصيغ الرياضية التي تربط بين الزخم وطاقة الحركة.</li>
                        <li>متى يكون لجسمين نفس الزخم ولكن طاقة حركة مختلفة، والعكس.</li>
                        <li>أمثلة حسابية لتوضيح العلاقة وتطبيقها.</li>
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
                  <Link href="https://drive.google.com/file/d/1vN5VdXB2dY5W0yO_j_VzC5vT2kF4dZgS/view?usp=sharing" target="_blank" rel="noopener noreferrer">
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
                            <DialogTitle>ملخص قوانين: العلاقة مع طاقة الحركة</DialogTitle>
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
                            <DialogTitle>اختبار قصير: العلاقة مع طاقة الحركة</DialogTitle>
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
