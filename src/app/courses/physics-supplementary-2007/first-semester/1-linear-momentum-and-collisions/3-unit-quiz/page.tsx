
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ClipboardCheck, Timer } from 'lucide-react';
import { QuizClient } from './QuizClient';
import { unit1QuizQuestions } from './quiz-data';

export default function Unit1QuizPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الوحدة الأولى: الزخم الخطي والتصادمات</p>
            <h1 className="text-3xl font-bold mt-1 flex items-center gap-3">
                <ClipboardCheck className="w-8 h-8" />
                اختبار الوحدة الأولى
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl flex items-center gap-2">
                <Timer className="w-4 h-4" />
                <span>20 سؤال | 60 دقيقة</span>
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
            <QuizClient questions={unit1QuizQuestions} />
        </div>
      </div>
    </MainLayout>
  );
}

    