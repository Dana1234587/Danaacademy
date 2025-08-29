
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ClipboardCheck } from 'lucide-react';
import { QuizClient } from './QuizClient';
import { unit3QuizQuestions } from './quiz-data';

export default function Unit3QuizPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4 max-w-3xl mx-auto">
          <div>
            <p className="text-sm text-primary font-medium">الوحدة الثالثة: التيار الكهربائي</p>
            <h1 className="text-3xl font-bold mt-1 flex items-center gap-3">
                <ClipboardCheck className="w-8 h-8" />
                اختبار الوحدة الثالثة
            </h1>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
            <QuizClient questions={unit3QuizQuestions} />
        </div>
      </div>
    </MainLayout>
  );
}
