
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { getStudentSubmissions, type Submission } from '@/app/my-exams/actions';
import { ExamClient } from './exam-client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { headers } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

// Helper function to get user session from cookies
async function getUser() {
  const sessionCookie = headers().get('cookie')?.split('; ').find(row => row.startsWith('session='))?.split('=')[1];
  if (!sessionCookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

export default async function ExamPage({ params, searchParams }: { params: { examId: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { examId } = params;
  const isReviewMode = searchParams.review === 'true';

  const user = await getUser();

  if (!user) {
    return (
      <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
        <Card className="max-w-md mx-auto border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2 text-destructive">
              <ServerCrash className="w-8 h-8" />
              <span>خطأ في المصادقة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">يجب تسجيل الدخول لعرض هذه الصفحة.</p>
            <Button asChild className="mt-6 w-full">
              <Link href="/login">الذهاب إلى صفحة تسجيل الدخول</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              <Link href={user.role === 'admin' ? '/admin/exams' : '/my-exams'}>العودة إلى قائمة الامتحانات</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  let submission: Submission | null = null;
  if (isReviewMode && user.role === 'student') {
    const submissions = await getStudentSubmissions(user.uid);
    submission = submissions.find(s => s.examId === examId) || null;
     if (!submission) {
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

  return <ExamClient exam={exam} submission={submission} />;
}
