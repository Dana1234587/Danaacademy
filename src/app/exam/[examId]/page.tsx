
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { getExamForStudent, type ExamWithQuestions } from './actions'; 
import { getStudentSubmissions, type Submission } from '@/app/my-exams/actions';
import { ExamClient } from './exam-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import { useStore } from '@/store/app-store';


export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const searchParams = useSearchParams();
  const { currentUser, isLoading: isUserLoading } = useStore();

  const [exam, setExam] = useState<ExamWithQuestions | null>(null);
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const isReviewMode = searchParams.get('review') === 'true';

  const fetchData = useCallback(async () => {
    if (!currentUser) {
      if (!isUserLoading) {
        setError("يجب تسجيل الدخول لعرض هذه الصفحة.");
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    setError(null);
    try {
        const fetchedExam = await getExamForStudent(examId);
        if (!fetchedExam) {
            setError("لم يتم العثور على الامتحان المطلوب.");
            setIsLoading(false);
            return;
        }

        setExam(fetchedExam);

        if (isReviewMode) {
            const submissions = await getStudentSubmissions(currentUser.uid);
            const specificSubmission = submissions.find(s => s.examId === examId);
            if (specificSubmission) {
                setSubmission(specificSubmission);
            } else {
                setError("ليس لديك تقديم سابق لهذا الامتحان لمراجعته.");
            }
        }
    } catch (err) {
        console.error("Error fetching exam data:", err);
        setError("حدث خطأ أثناء تحميل تفاصيل الامتحان. يرجى المحاولة مرة أخرى.");
    } finally {
        setIsLoading(false);
    }
  }, [examId, isReviewMode, currentUser, isUserLoading]);

  useEffect(() => {
    // Only fetch data if user loading is finished
    if (!isUserLoading) {
      fetchData();
    }
  }, [fetchData, isUserLoading]);
  
  if (isLoading || isUserLoading) {
     return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
     );
  }

  if (error || !exam) {
     return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
             <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center">
                <Card className="max-w-md mx-auto border-destructive">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                            <ServerCrash className="w-8 h-8" />
                            <span>حدث خطأ</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">{error || 'لم يتم العثور على الامتحان.'}</p>
                        <Button asChild className="mt-6">
                            <Link href={currentUser?.role === 'admin' ? '/admin/exams' : '/my-exams'}>العودة إلى قائمة الامتحانات</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
     )
  }

  return <ExamClient exam={exam} submission={submission} />;
}
