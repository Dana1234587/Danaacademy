
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { getExamForStudent, type ExamWithQuestions } from './actions'; 
import { ExamClient } from './exam-client';
import { getStudentSubmissions } from '@/app/my-exams/actions';
import { headers } from 'next/headers';
import { adminAuth } from '@/lib/firebase-admin';

// Helper function to get user session from server-side
async function getUserSession() {
  const authHeader = headers().get('Authorization');
  if (!authHeader) return null;
  const token = authHeader.split('Bearer ')[1];
  if (!token) return null;
  try {
    const decodedToken = await adminAuth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    console.error("Error verifying auth token:", error);
    return null;
  }
}

export default async function ExamPage({ params, searchParams }: { params: { examId: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const { examId } = params;
  let exam: ExamWithQuestions | null = null;
  let error: string | null = null;
  let submission = null;
  const isReviewMode = searchParams?.review === 'true';
  
  const user = await getUserSession();

  try {
    exam = await getExamForStudent(examId);
    if (!exam) {
      error = "لم يتم العثور على الامتحان المطلوب.";
    } else if (user) {
      const submissions = await getStudentSubmissions(user.uid);
      submission = submissions.find(s => s.examId === examId) || null;

      // Security check: if in review mode, a submission must exist.
      if (isReviewMode && !submission) {
        error = "ليس لديك تقديم سابق لهذا الامتحان لمراجعته.";
        exam = null; // Prevent rendering the exam client
      }
    } else if (isReviewMode) {
        // If not logged in, cannot review.
        error = "يجب تسجيل الدخول لمراجعة الامتحان.";
        exam = null;
    }
  } catch (err) {
    console.error("Error fetching exam details:", err);
    error = "حدث خطأ أثناء تحميل تفاصيل الامتحان. يرجى المحاولة مرة أخرى.";
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
                        <p className="text-lg text-muted-foreground">{error || "لم يتم العثور على الامتحان."}</p>
                        <Button asChild className="mt-6">
                            <Link href="/my-exams">العودة إلى قائمة الامتحانات</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
     )
  }

  return <ExamClient exam={exam} submission={submission} />;
}
