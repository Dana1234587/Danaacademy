
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash, AlertTriangle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { getExams, type Exam } from '@/app/admin/exams/actions'; 
import { useState, useEffect, useCallback } from 'react';
import { notFound } from 'next/navigation';

export default function ExamPage({ params }: { params: { examId: string } }) {
  const [exam, setExam] = useState<Exam | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchExamDetails = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
        // This is not ideal as it fetches all exams.
        // In a real scenario, we would have a getExamById function.
        const allExams = await getExams();
        const currentExam = allExams.find(e => e.id === params.examId);
        
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
      notFound();
  }

  return (
    <MainLayout>
        <div className="p-4 sm:p-6 lg:p-8">
            <h1 className="text-3xl font-bold">{exam.title}</h1>
            <p className="text-muted-foreground mt-2">{exam.description || 'لا يوجد وصف'}</p>
            
            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>جاهز للبدء؟</CardTitle>
                    <CardDescription>
                        سيتم عرض واجهة الامتحان هنا.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                     <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 p-4" role="alert">
                        <p className="font-bold flex items-center gap-2"><AlertTriangle/>تحت الإنشاء</p>
                        <p>واجهة أداء الامتحان الفعلية قيد التطوير حاليًا. شكرًا لصبرك!</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </MainLayout>
  );
}
