
import * as React from 'react';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { getStudentSubmissions, type Submission } from '@/app/admin/exams/actions'; 
import { ExamClient } from './exam-client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { cookies } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

// Helper function to get user session from cookies on the server
async function getUser() {
  const sessionCookie = cookies().get('session')?.value;
  if (!sessionCookie) return null;

  try {
    const decodedToken = await adminAuth.verifySessionCookie(sessionCookie, true);
    // You might want to fetch more user details from Firestore here if needed
    // For now, we just need the UID to check for submissions.
    return { uid: decodedToken.uid, role: decodedToken.admin ? 'admin' : 'student' };
  } catch (error) {
    console.error("Error verifying session cookie:", error);
    return null;
  }
}

export default async function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  const searchParams = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
  const isReviewMode = searchParams.get('review') === 'true';

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
        submission = submissions.find(s => s.examId === examId) || null;
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

    return <ExamClient exam={exam} submission={submission} />;

  } catch (error) {
     console.error("Failed to load exam page data:", error);
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
                <p className="text-lg text-muted-foreground">فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى.</p>
                <Button asChild className="mt-6 w-full">
                    <Link href="/">العودة إلى الصفحة الرئيسية</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
     )
  }
}
