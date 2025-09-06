
'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { getStudentSubmissions, type Submission } from '@/app/my-exams/actions';
import { ExamClient } from './exam-client';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/app-store';

export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const searchParams = useSearchParams();
  const isReviewMode = searchParams.get('review') === 'true';
  const { currentUser, isLoading: isUserLoading } = useStore();

  const [examData, setExamData] = useState<ExamWithQuestions | null>(null);
  const [submissionData, setSubmissionData] = useState<Submission | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExamData = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    if (!currentUser) {
        setError("يجب تسجيل الدخول لعرض هذه الصفحة.");
        setIsLoading(false);
        return;
    }
    
    try {
        const exam = await getExamForStudent(examId);
        if (!exam) {
            setError("لم يتم العثور على الامتحان المطلوب.");
            setIsLoading(false);
            return;
        }
        setExamData(exam);

        if (isReviewMode && currentUser.role === 'student') {
            const submissions = await getStudentSubmissions(currentUser.uid);
            const submission = submissions.find(s => s.examId === examId) || null;
            if (!submission) {
                setError("ليس لديك تقديم سابق لهذا الامتحان لمراجعته.");
            }
            setSubmissionData(submission);
        }
    } catch (e: any) {
        setError("فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى.");
        console.error(e);
    } finally {
        setIsLoading(false);
    }
  }, [examId, currentUser, isReviewMode]);

  useEffect(() => {
    // We wait for the user to be loaded from the store before fetching any data
    if (!isUserLoading) {
      loadExamData();
    }
  }, [isUserLoading, loadExamData]);

  if (isLoading || isUserLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <ServerCrash className="w-8 h-8" />
              <span>خطأ</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">{error}</p>
            <Button asChild className="mt-6 w-full">
              <Link href={currentUser?.role === 'admin' ? '/admin/exams' : '/my-exams'}>العودة إلى قائمة الامتحانات</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!examData) {
    return null; // Should be covered by error state, but as a fallback
  }

  return <ExamClient exam={examData} submission={submissionData} />;
}
