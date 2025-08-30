
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Home, Loader2, RefreshCw, ClipboardList, Clock, CalendarIcon } from 'lucide-react';
import Link from 'next/link';
import { getExams, type Exam } from './actions';
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

function ExamCard({ exam }: { exam: Exam }) {
    const formattedStartDate = exam.startDate ? format(exam.startDate, 'd MMMM yyyy, h:mm a', { locale: ar }) : 'غير محدد';
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl">{exam.title}</CardTitle>
                <CardDescription>{exam.description || 'لا يوجد وصف'}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <ClipboardList className="w-4 h-4" />
                    <span>{exam.questionCount} سؤال</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} دقيقة</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                    <span className="font-bold">الدورة:</span>
                    <span>{exam.courseId === 'tawjihi-2007-supplementary' ? 'تكميلي 2007' : 'توجيهي 2008'}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                     <CalendarIcon className="w-4 h-4" />
                     <span className="font-bold">تاريخ البدء:</span>
                    <span>{formattedStartDate}</span>
                </div>
            </CardContent>
        </Card>
    )
}

export default function ExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchExams = useCallback(async () => {
    setIsLoading(true);
    try {
      const examsData = await getExams();
      setExams(examsData);
    } catch(error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchExams();
  }, [fetchExams]);

  return (
    <MarketingLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
            <p className="text-muted-foreground mt-2">
              من هنا يمكنك إنشاء اختبارات جديدة، عرض الاختبارات السابقة، وإدارتها.
            </p>
          </div>
          <div className="flex gap-2">
             <Button asChild variant="outline">
                <Link href="/">
                    <Home className="me-2 h-4 w-4" />
                    العودة للرئيسية
                </Link>
             </Button>
             <Button asChild>
                <Link href="/admin/create-exam">
                    <Plus className="me-2 h-4 w-4" /> إنشاء امتحان جديد
                </Link>
            </Button>
             <Button onClick={fetchExams} variant="secondary" disabled={isLoading}>
                {isLoading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <RefreshCw className="me-2 h-4 w-4" />}
                تحديث
            </Button>
          </div>
        </div>
        
        {isLoading ? (
            <div className="text-center py-12 text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin"/>
                <p>جاري تحميل الاختبارات...</p>
            </div>
        ) : exams.length === 0 ? (
            <Card>
                <CardHeader>
                    <CardTitle>الاختبارات الحالية</CardTitle>
                    <CardDescription>قائمة بجميع الاختبارات التي تم إنشاؤها.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-12 text-muted-foreground">
                        <p>لا توجد اختبارات حاليًا.</p>
                        <p>انقر على "إنشاء امتحان جديد" للبدء.</p>
                    </div>
                </CardContent>
            </Card>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map(exam => <ExamCard key={exam.id} exam={exam} />)}
            </div>
        )}
      </div>
    </MarketingLayout>
  );
}
