
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import QuizPage from './quiz';
import SummaryPage from './summary';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';
import { LessonVideoPlayer } from '@/components/lesson-video-player';

export default function InternationalSystemOfUnitsPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (1): النظام الدولي للوحدات</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة التأسيسية، سنتعرف على الوحدات الأساسية والمشتقة في النظام الدولي.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-2008-foundation">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الحصص
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">

            <LessonVideoPlayer
              src="https://iframe.mediadelivery.net/embed/490791/ab0a9867-57a2-4a6b-b585-e88055faa967?autoplay=false&loop=false&muted=false&preload=true"
              lessonId="foundation-1-international-system-of-units"
              courseId="physics-2008-foundation"
            />

            <Card>
              <CardHeader>
                <CardTitle>نقاط رئيسية من الحصة</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                  <li>التعرف على الكميات الأساسية في الميكانيكا (الطول، الكتلة، الزمن) ووحداتها.</li>
                  <li>فهم مفهوم الكميات المشتقة وكيفية اشتقاق وحداتها (مثل القوة والطاقة).</li>
                  <li>أهمية تجانس الوحدات للتأكد من صحة المعادلات الفيزيائية.</li>
                  <li>تحليل وحدات بعض القوانين الهامة مثل قانون نيوتن الثاني.</li>
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
                  <Link href="https://drive.google.com/file/d/1Qye8JJ8vCQlyigMpGlwLG-TqHtJPjx-v/view?usp=sharing" target="_blank" rel="noopener noreferrer">
                    <FileText className="me-3" /> ورقة عمل الدرس (PDF)
                  </Link>
                </Button>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <BarChart className="me-3" /> ملخص القوانين
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-xl h-auto max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>ملخص: النظام الدولي للوحدات</DialogTitle>
                    </DialogHeader>
                    <SummaryPage />
                  </DialogContent>
                </Dialog>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <BrainCircuit className="me-3" /> اختبار قصير للمراجعة
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>اختبار قصير: النظام الدولي للوحدات</DialogTitle>
                    </DialogHeader>
                    <QuizPage />
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </div>

      </div>
    </div>
  );
}
