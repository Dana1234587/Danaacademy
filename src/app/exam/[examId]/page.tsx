
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { getStudentSubmissions, type Submission } from '@/app/my-exams/actions'; 
import { ExamClient } from './exam-client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/app-store';

export default function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const searchParams = useSearchParams();
  const isReviewMode = searchParams.get('review') === 'true';
  const { currentUser, isLoading: isUserLoading } = useStore();

  const [exam, setExam] = React.useState<ExamWithQuestions | null>(null);
  const [submission, setSubmission] = React.useState<Submission | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (isUserLoading) {
      return; // Wait for user data to be loaded
    }

    if (!currentUser) {
      setError("الرجاء تسجيل الدخول لعرض هذه الصفحة.");
      setIsLoading(false);
      return;
    }

    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const examData = await getExamForStudent(examId);
        if (!examData) {
          setError("لم يتم العثور على الامتحان المطلوب.");
          setIsLoading(false);
          return;
        }

        // Check if student is enrolled (or is an admin)
        if (currentUser.role !== 'admin' && !currentUser.enrolledCourseIds.includes(examData.courseId)) {
            setError("أنت غير مسجل في الدورة الخاصة بهذا الامتحان.");
            setIsLoading(false);
            return;
        }

        setExam(examData);

        if (isReviewMode) {
          const submissions = await getStudentSubmissions(currentUser.uid);
          const latestSubmission = submissions
            .filter(s => s.examId === examId)
            .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())[0] || null;

          if (!latestSubmission && currentUser.role !== 'admin') {
            setError("ليس لديك تقديم سابق لهذا الامتحان لمراجعته.");
          } else if (currentUser.role === 'admin' && !latestSubmission) {
             // Create a dummy submission for admin review preview if none exists
             setSubmission({ 
                id: 'admin_preview', studentId: 'admin', studentName: 'Admin Preview', 
                examId: examData.id, examTitle: examData.title, courseId: examData.courseId,
                score: 0, totalQuestions: examData.questions.length,
                answers: new Array(examData.questions.length).fill(null), 
                submittedAt: new Date()
             });
          } else {
            setSubmission(latestSubmission);
          }
        }
      } catch (err) {
        console.error("Failed to load exam page data:", err);
        setError("فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [examId, isReviewMode, currentUser, isUserLoading]);

  if (isLoading || isUserLoading) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
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
                <p className="text-lg text-center text-muted-foreground">{error}</p>
                <Button asChild className="mt-6 w-full">
                    <Link href={currentUser?.role === 'admin' ? '/admin/exams' : '/my-exams'}>العودة</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
     );
  }

  if (!exam) {
    // This case is handled by the error state, but as a fallback:
    return <div className="min-h-screen flex items-center justify-center">لم يتم العثور على الامتحان.</div>
  }

  return <ExamClient exam={exam} submission={submission} />;
}
