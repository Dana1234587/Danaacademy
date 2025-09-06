
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import { getExamForStudent, getStudentSubmissions, type ExamWithQuestions } from './actions'; 
import { ExamClient } from './exam-client';
import { useStore } from '@/store/app-store';

export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const searchParams = useSearchParams();
  const { currentUser, isLoading: isUserLoading } = useStore();

  const [exam, setExam] = useState<ExamWithQuestions | null>(null);
  const [submission, setSubmission] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const isReviewMode = searchParams.get('review') === 'true';

  const fetchData = useCallback(async () => {
    // Don't fetch data until the user's auth state is resolved.
    if (isUserLoading) {
        return;
    }

    setIsLoading(true);
    setError(null);

    if (isReviewMode && !currentUser) {
        setError("يجب تسجيل الدخول لمراجعة الامتحان.");
        setIsLoading(false);
        return;
    }

    try {
        const fetchedExam = await getExamForStudent(examId);
        if (!fetchedExam) {
            setError("لم يتم العثور على الامتحان المطلوب.");
            setExam(null);
        } else {
            setExam(fetchedExam);
            if (isReviewMode && currentUser) {
                const submissions = await getStudentSubmissions(currentUser.uid);
                const specificSubmission = submissions.find(s => s.examId === examId);
                
                if (specificSubmission) {
                    setSubmission(specificSubmission);
                } else {
                    setError("ليس لديك تقديم سابق لهذا الامتحان لمراجعته.");
                    setExam(null); // Prevent rendering the exam client
                }
            }
        }
    } catch (err) {
      console.error("Error fetching exam details:", err);
      setError("حدث خطأ أثناء تحميل تفاصيل الامتحان. يرجى المحاولة مرة أخرى.");
    } finally {
        setIsLoading(false);
    }
  }, [examId, isReviewMode, currentUser, isUserLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (isLoading || isUserLoading) {
     return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
           <Loader2 className="w-12 h-12 animate-spin text-primary" />
        </div>
     )
  }
  
  if (error) {
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
                        <p className="text-lg text-muted-foreground">{error}</p>
                        <Button asChild className="mt-6">
                            <Link href="/my-exams">العودة إلى قائمة الامتحانات</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
     )
  }

  if (!exam) {
    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
             <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center">
                <Card className="max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                             <ServerCrash className="w-8 h-8" />
                            <span>خطأ</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">لم يتم العثور على الامتحان المطلوب.</p>
                         <Button asChild className="mt-6">
                            <Link href="/my-exams">العودة إلى قائمة الامتحانات</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
  }

  return <ExamClient exam={exam} submission={submission} />;
}
