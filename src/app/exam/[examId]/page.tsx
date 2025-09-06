
import * as React from 'react';
import { getExamForStudent, type ExamWithQuestions } from './actions';
import { ExamClient } from './exam-client';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ServerCrash } from 'lucide-react';
import Link from 'next/link';

// This is now a Server Component
export default async function ExamPage({ params }: { params: { examId: string } }) {
  const { examId } = params;
  
  try {
    const examData = await getExamForStudent(examId);

    if (!examData) {
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
                <p className="text-lg text-center text-muted-foreground">لم يتم العثور على الامتحان المطلوب.</p>
                 <Button asChild className="mt-6 w-full">
                    <Link href="/">العودة إلى الرئيسية</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
      )
    }

    // Pass the fetched data to the Client Component
    return <ExamClient exam={examData} />;

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
                <p className="text-lg text-center text-muted-foreground">فشل تحميل بيانات الامتحان. يرجى المحاولة مرة أخرى لاحقًا.</p>
                 <Button asChild className="mt-6 w-full">
                    <Link href="/">العودة إلى الرئيسية</Link>
                </Button>
                </CardContent>
            </Card>
        </div>
     );
  }
}
