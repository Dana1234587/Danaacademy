
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Award, Loader2, ServerCrash, Eye, BarChart2 } from 'lucide-react';
import Link from 'next/link';
import { getStudentSubmissions, type Submission } from '../my-exams/actions'; 
import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/app-store';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

function PerformanceChart({ data }: { data: Submission[] }) {
    const chartData = data.map(sub => ({
        name: sub.examTitle.length > 20 ? `${sub.examTitle.substring(0, 20)}...` : sub.examTitle,
        score: sub.score,
        total: sub.totalQuestions,
        percentage: (sub.score / sub.totalQuestions) * 100
    }));

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData} margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{fontSize: 10}} angle={-20} textAnchor="end" height={50} />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip
                    formatter={(value: number, name: string, props) => [`${props.payload.score}/${props.payload.total} (${value.toFixed(1)}%)`, 'النتيجة']}
                    labelFormatter={(label: string) => `امتحان: ${label}`}
                    contentStyle={{ borderRadius: '0.5rem', direction: 'rtl' }}
                />
                <Legend formatter={() => 'أداؤك في الامتحان'}/>
                <Bar dataKey="percentage" name="النسبة المئوية" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={40} />
            </BarChart>
        </ResponsiveContainer>
    );
}


export default function MyPerformancePage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));

  const fetchData = useCallback(async () => {
    if (!currentUser) return;
    setIsLoading(true);
    setError(null);
    try {
      const studentSubmissions = await getStudentSubmissions(currentUser.uid);
      setSubmissions(studentSubmissions.sort((a,b) => a.submittedAt.getTime() - b.submittedAt.getTime()));

    } catch (error) {
      console.error("Error fetching submissions:", error);
      setError("فشل تحميل بيانات الأداء. الرجاء المحاولة مرة أخرى.");
    } finally {
      setIsLoading(false);
    }
  }, [currentUser]);

  useEffect(() => {
    if(currentUser) { 
        fetchData();
    } else {
        setIsLoading(false);
    }
  }, [fetchData, currentUser]);
  
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
            <h1 className="text-3xl font-bold flex items-center gap-3"><BarChart2 className="w-8 h-8 text-primary"/> تحليلات أدائي</h1>
            <p className="text-muted-foreground mt-2">
              هنا يمكنك تتبع أدائك في الامتحانات المختلفة ومراجعة إجاباتك.
            </p>
        </div>

        {isLoading ? (
            <div className="text-center py-12 text-muted-foreground flex items-center justify-center gap-2">
                <Loader2 className="h-8 w-8 animate-spin"/>
                <p className="text-xl">جاري تحميل بيانات الأداء...</p>
            </div>
        ) : error ? (
             <div className="text-center py-12 text-destructive flex flex-col items-center justify-center gap-4">
                 <ServerCrash className="w-12 h-12" />
                <p className="text-lg">{error}</p>
                <Button onClick={fetchData}>حاول مرة أخرى</Button>
            </div>
        ) : submissions.length === 0 ? (
            <Card>
                <CardContent className="p-12 text-center text-muted-foreground">
                    <p className="text-xl">لم تقم بتقديم أي امتحانات بعد.</p>
                    <Button asChild className="mt-4">
                        <Link href="/my-exams">اذهب إلى قائمة الامتحانات</Link>
                    </Button>
                </CardContent>
            </Card>
        ) : (
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>مخطط الأداء</CardTitle>
                        <CardDescription>عرض بياني لنتائجك في الامتحانات بالنسبة المئوية.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <PerformanceChart data={submissions} />
                    </CardContent>
                </Card>

                <Card>
                     <CardHeader>
                        <CardTitle>سجل الامتحانات</CardTitle>
                        <CardDescription>قائمة بجميع الامتحانات التي قمت بتقديمها.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {submissions.map(sub => (
                               <div key={sub.id} className="flex flex-wrap items-center justify-between gap-4 p-4 border rounded-lg hover:bg-muted/50">
                                   <div>
                                       <h3 className="font-bold text-lg">{sub.examTitle}</h3>
                                       <p className="text-sm text-muted-foreground">
                                           تم التقديم في: {format(sub.submittedAt, 'd MMMM yyyy, h:mm a', { locale: ar })}
                                       </p>
                                   </div>
                                   <div className="flex items-center gap-6">
                                        <div className="text-center">
                                            <p className="text-xs text-muted-foreground">النتيجة</p>
                                            <p className="text-xl font-bold text-primary">{sub.score}/{sub.totalQuestions}</p>
                                        </div>
                                        <Button asChild>
                                            <Link href={`/exam/${sub.examId}?review=true`}>
                                                <Eye className="me-2 h-4 w-4" />
                                                مراجعة الامتحان
                                            </Link>
                                        </Button>
                                   </div>
                               </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        )}
      </div>
    </MarketingLayout>
  );
}
