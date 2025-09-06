
'use client';
import * as React from 'react';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { ExamClient } from './exam-client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServerCrash, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

// This is now a Client Component to handle loading/error states client-side
export default function ExamPage() {
  const params = useParams();
  const examId = params.examId as string;
  const [examData, setExamData] = React.useState<ExamWithQuestions | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!examId) return;

    const fetchExam = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getExamForStudent(examId);
        if (!data) {
          setError("لم يتم العثور على الامتحان المطلوب.");
        } else {
          setExamData(data);
        }
      } catch (err) {
        console.error("Failed to load exam page data:", err);
        setError("فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchExam();
  }, [examId]);

  if (isLoading) {
     return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
     );
  }

  if (error || !examData) {
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
                <p className="text-lg text-center text-muted-foreground">{error || 'حدث خطأ غير متوقع.'}</p>
                 <Button asChild className="mt-6 w-full">
                    <Link href="/">العودة إلى الرئيسية</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
      )
    }

  // Pass the fetched data to the main Client Component
  return <ExamClient exam={examData} />;
}
