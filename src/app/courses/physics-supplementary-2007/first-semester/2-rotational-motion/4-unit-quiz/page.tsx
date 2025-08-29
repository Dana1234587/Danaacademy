
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ClipboardCheck } from 'lucide-react';
import { QuizClient } from './QuizClient';
import { unit2QuizQuestions } from './quiz-data';
import { Logo } from '@/components/logo';

export default function Unit2QuizPage() {
  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
        <header className="sticky top-0 z-10 w-full bg-background border-b">
             <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex flex-col">
                     <p className="text-sm text-primary font-medium">الوحدة الثانية: الحركة الدورانية</p>
                    <h1 className="text-2xl font-bold mt-1 flex items-center gap-3">
                        <ClipboardCheck className="w-7 h-7" />
                        اختبار الوحدة الثانية
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/courses/physics-supplementary-2007">
                          <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                    <Logo className="h-12 w-auto hidden sm:block" />
                 </div>
            </div>
        </header>
        <main className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <QuizClient questions={unit2QuizQuestions} />
        </main>
    </div>
  );
}
