
import * as React from 'react';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { getStudentSubmissions, type Submission } from '@/app/my-exams/actions'; 
import { ExamClient } from './exam-client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

// Helper function to get user session from cookies on the server
async function getUser() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    return { uid: decodedToken.uid, role: decodedToken.admin ? 'admin' : 'student' };
  } catch (error) {
    // Session cookie is invalid or expired.
    // In a real app, you'd want to handle this more gracefully, e.g., by redirecting to login.
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

export default async function ExamPage({ params, searchParams }: { params: { examId: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { examId } = params;
  const isReviewMode = searchParams?.review === 'true';

  const user = await getUser();

  try {
    const exam = await getExamForStudent(examId);

    if (!exam) {
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
              <p className="text-lg text-muted-foreground">لم يتم العثور على الامتحان المطلوب.</p>
              <Button asChild className="mt-6 w-full">
                <Link href={user?.role === 'admin' ? '/admin/exams' : '/my-exams'}>العودة إلى قائمة الامتحانات</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      );
    }

    let submission: Submission | null = null;
    if (isReviewMode && user) {
        const submissions = await getStudentSubmissions(user.uid);
        // Find the most recent submission for this specific exam
        submission = submissions
            .filter(s => s.examId === examId)
            .sort((a, b) => b.submittedAt.getTime() - a.submittedAt.getTime())[0] || null;

        if (!submission && user.role !== 'admin') {
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
                    <p className="text-lg text-muted-foreground">ليس لديك تقديم سابق لهذا الامتحان لمراجعته.</p>
                     <Button asChild className="mt-6 w-full">
                        <Link href="/my-exams">العودة إلى قائمة الامتحانات</Link>
                    </Button>
                    </CardContent>
                </Card>
            </div>
           )
        }
    }

    // Admins can always preview, even if there's no submission
    if (user?.role === 'admin' && isReviewMode && !submission) {
        // Create a dummy submission for admin review preview
        submission = { 
          id: 'admin_preview', 
          studentId: 'admin', 
          studentName: 'Admin Preview', 
          examId: exam.id, 
          examTitle: exam.title,
          courseId: exam.courseId,
          score: 0, 
          totalQuestions: exam.questions.length,
          answers: new Array(exam.questions.length).fill(null), 
          submittedAt: new Date()
        };
    }


    return <ExamClient exam={exam} submission={submission} />;

  } catch (error) {
     console.error("Failed to load exam page data:", error);
     return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Card className="max-w-md mx-auto border-destructive">
                <CardHeader>
                <CardTitle className="flex items-center justify-center gap-2 text-destructive">
                    <ServerCrash className="w-8 h-8" />
                    <span>خطأ في الخادم</span>
                </CardTitle>
                </CardHeader>
                <CardContent>
                <CardDescription>فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى لاحقًا.</CardDescription>
                <Button asChild className="mt-6 w-full">
                    <Link href="/">العودة إلى الصفحة الرئيسية</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
     )
  }
}
