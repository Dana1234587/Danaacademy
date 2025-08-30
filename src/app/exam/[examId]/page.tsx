
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash } from 'lucide-react';
import Link from 'next/link';
import { getExamForStudent, type ExamWithQuestions } from './actions'; 
import { useState, useEffect, useCallback } from 'react';
import { ExamClient } from './exam-client';

export default function ExamPage({ params }: { params: { examId: string } }) {
  const [exam, setExam] = useState<ExamWithQuestions | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExamDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const currentExam = await getExamForStudent(params.examId);
      if (currentExam) {
        setExam(currentExam);
      } else {
        setError("لم يتم العثور على الامتحان المطلوب.");
      }
    } catch (err) {
      console.error("Error fetching exam details:", err);
      setError("حدث خطأ أثناء تحميل تفاصيل الامتحان.");
    } finally {
      setIsLoading(false);
    }
  }, [params.examId]);

  useEffect(() => {
    fetchExamDetails();
  }, [fetchExamDetails]);
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-16 w-16 animate-spin" />
          <p className="ms-4 text-muted-foreground">جاري تحميل الامتحان...</p>
        </div>
      </MainLayout>
    );
  }
  
  if (error) {
     return (
        <MainLayout>
             <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center mt-16">
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
        </MainLayout>
     )
  }

  if (!exam) {
      return null;
  }

  return <ExamClient exam={exam} />;
}
