
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Loader2, ServerCrash, Clock, Calendar, HelpCircle, Check, PlayCircle, Eye, Repeat } from 'lucide-react';
import Link from 'next/link';
import { getExams, type Exam, getStudentSubmissions, type Submission } from './actions'; 
import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/app-store';
import { format, isBefore, isAfter, formatDistanceToNowStrict } from 'date-fns';
import { ar } from 'date-fns/locale';

function ExamCard({ exam, submissions }: { exam: Exam, submissions: Submission[] }) {
    const now = new Date();
    const studentSubmissions = submissions.filter(s => s.examId === exam.id);
    const submissionCount = studentSubmissions.length;
    const attemptsAllowed = exam.attemptsAllowed || 1;
    const hasAttemptsLeft = submissionCount < attemptsAllowed;
    const latestSubmission = studentSubmissions.sort((a,b) => b.submittedAt.getTime() - a.submittedAt.getTime())[0];

    let status: 'upcoming' | 'active' | 'finished' | 'completed' = 'finished';
    let statusText = 'مكتمل';
    let actionButton = <Button variant="outline" disabled>انتهى</Button>;
    
    if (exam.startDate && isBefore(now, exam.startDate)) {
        status = 'upcoming';
        statusText = `قادم بعد ${formatDistanceToNowStrict(exam.startDate, { locale: ar, addSuffix: false })}`;
        actionButton = <Button variant="secondary" disabled>لم يبدأ بعد</Button>;
    } else if (exam.endDate && isAfter(now, exam.endDate)) {
        status = 'finished';
        statusText = 'منتهي';
        actionButton = <Button variant="outline" disabled>فاتك الامتحان</Button>;
    } else if (hasAttemptsLeft) {
        status = 'active';
        statusText = 'متاح الآن';
        actionButton = <Button asChild><Link href={`/exam/${exam.id}`}><PlayCircle className="me-2"/> ابدأ الامتحان</Link></Button>;
    } else { // No attempts left
        status = 'completed';
        statusText = `اكتمل (${submissionCount}/${attemptsAllowed})`;
         actionButton = <Button variant="outline" disabled>لا يوجد محاولات متبقية</Button>;
    }

    return (
        <Card className="flex flex-col justify-between">
            <CardHeader>
                <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                     <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        status === 'active' ? 'bg-green-100 text-green-700' : 
                        status === 'upcoming' ? 'bg-blue-100 text-blue-700' :
                        status === 'completed' ? 'bg-purple-100 text-purple-700' :
                        'bg-red-100 text-red-700'
                     }`}>
                        {statusText}
                    </span>
                </div>
                <CardDescription>{exam.courseId === 'tawjihi-2007-supplementary' ? 'فيزياء تكميلي 2007' : 'فيزياء توجيهي 2008'}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4" />
                    <span>{exam.questionCount} سؤال</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{exam.duration} دقيقة</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Repeat className="w-4 h-4" />
                    <span>{attemptsAllowed} محاولة</span>
                </div>
                 <div className="flex items-center gap-2">
                    <Check className="w-4 h-4" />
                    <span>{submissionCount} محاولة مقدمة</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                     <Calendar className="w-4 h-4" />
                     <span className="font-bold">تاريخ البدء:</span>
                    <span>{exam.startDate ? format(exam.startDate, 'd MMM yyyy, h:mm a', { locale: ar }) : 'متاح دائمًا'}</span>
                </div>
                 <div className="flex items-center gap-2 col-span-2">
                     <Calendar className="w-4 h-4" />
                     <span className="font-bold">تاريخ الانتهاء:</span>
                    <span>{exam.endDate ? format(exam.endDate, 'd MMM yyyy, h:mm a', { locale: ar }) : 'لا يوجد'}</span>
                </div>
            </CardContent>
            <CardFooter className="flex justify-between">
                 {actionButton}
                 {latestSubmission && (
                    <Button asChild variant="secondary" size="sm">
                        <Link href={`/exam/${exam.id}?review=true`}>
                           <Eye className="me-2 h-4 w-4" />
                           مراجعة آخر محاولة
                        </Link>
                    </Button>
                 )}
            </CardFooter>
        </Card>
    )
}

export default function MyExamsPage() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));

  const fetchExams = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);
    try {
      const [allExams, studentSubmissions] = await Promise.all([
          getExams(),
          getStudentSubmissions(currentUser.uid)
      ]);
      
      const studentExams = allExams.filter(exam => currentUser.enrolledCourseIds.includes(exam.courseId));
      setExams(studentExams);
      setSubmissions(studentSubmissions);

    } catch (error) {
      console.error("Error fetching exams:", error);
      setError("فشل تحميل قائمة الامتحانات. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if(currentUser) { // Only fetch if user is logged in
        fetchExams();
    } else {
        setIsLoading(false);
    }
  }, [fetchExams, currentUser]);
  
  if (!currentUser && !isLoading) {
    return (
        <MarketingLayout>
            <div className="p-8 text-center text-lg">الرجاء تسجيل الدخول لعرض هذه الصفحة.</div>
        </MarketingLayout>
    )
  }

  return (
    <MarketingLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3"><Award className="w-8 h-8 text-primary"/> امتحاناتي</h1>
            <p className="text-muted-foreground mt-2">
            هنا يمكنك عرض جميع الامتحانات المتاحة لك، والبدء في حلها، ومراجعة نتائجك.
            </p>
        </div>

        {isLoading ? (
            <div className="text-center py-12 text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-5 w-5 animate-spin"/>
                <p>جاري تحميل الامتحانات...</p>
            </div>
        ) : error ? (
             <div className="text-center py-12 text-destructive flex flex-col items-center justify-center gap-4">
                 <ServerCrash className="w-12 h-12" />
                <p className="text-lg">{error}</p>
                <Button onClick={fetchExams}>حاول مرة أخرى</Button>
            </div>
        ) : exams.length === 0 ? (
            <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                    <p>لا توجد امتحانات متاحة لك في الوقت الحالي.</p>
                </CardContent>
            </Card>
        ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map(exam => (
                    <ExamCard key={exam.id} exam={exam} submissions={submissions} />
                ))}
            </div>
        )}
      </div>
    </MarketingLayout>
  );
}
