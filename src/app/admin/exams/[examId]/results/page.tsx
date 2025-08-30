
'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, ServerCrash, ChevronLeft, BarChart, Users, CheckCircle, Percent } from 'lucide-react';
import Link from 'next/link';
import { getExamSubmissions, type Submission, getExamDetails, type Exam } from '@/app/admin/exams/actions';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function ExamResultsPage() {
    const params = useParams();
    const examId = params.examId as string;

    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [exam, setExam] = useState<Exam | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            const [submissionsData, examData] = await Promise.all([
                getExamSubmissions(examId),
                getExamDetails(examId)
            ]);
            
            setExam(examData);
            setSubmissions(submissionsData);

        } catch (err) {
            console.error(err);
            setError("فشل تحميل بيانات النتائج. الرجاء المحاولة مرة أخرى.");
        } finally {
            setIsLoading(false);
        }
    }, [examId]);

    useEffect(() => {
        if (examId) {
            fetchData();
        }
    }, [examId, fetchData]);

    const chartData = useMemo(() => {
        if (submissions.length === 0 || !exam) return [];
        const scoreGroups = [0, 0, 0, 0, 0]; // 0-20, 21-40, 41-60, 61-80, 81-100
        submissions.forEach(sub => {
            const percentage = (sub.score / exam.questionCount) * 100;
            if (percentage <= 20) scoreGroups[0]++;
            else if (percentage <= 40) scoreGroups[1]++;
            else if (percentage <= 60) scoreGroups[2]++;
            else if (percentage <= 80) scoreGroups[3]++;
            else scoreGroups[4]++;
        });
        return [
            { name: '0-20%', 'عدد الطلاب': scoreGroups[0] },
            { name: '21-40%', 'عدد الطلاب': scoreGroups[1] },
            { name: '41-60%', 'عدد الطلاب': scoreGroups[2] },
            { name: '61-80%', 'عدد الطلاب': scoreGroups[3] },
            { name: '81-100%', 'عدد الطلاب': scoreGroups[4] },
        ];
    }, [submissions, exam]);
    
    const averageScore = useMemo(() => {
        if(submissions.length === 0 || !exam) return 0;
        const totalScore = submissions.reduce((acc, sub) => acc + sub.score, 0);
        return ((totalScore / submissions.length) / exam.questionCount) * 100;
    }, [submissions, exam]);


    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-16 w-16 animate-spin text-primary" />
            </div>
        );
    }
    
    if (error) {
         return (
            <div className="p-8 text-center text-lg text-destructive flex flex-col items-center gap-4">
                <ServerCrash className="w-12 h-12" />
                <p>{error}</p>
                 <Button onClick={fetchData} variant="outline">حاول مرة أخرى</Button>
            </div>
        )
    }

    if (!exam) {
        return (
             <div className="p-8 text-center text-lg text-muted-foreground">
                لم يتم العثور على الامتحان المطلوب.
             </div>
        )
    }
    
    return (
        <div className="p-4 sm:p-6 lg:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">نتائج وتحليلات: {exam.title}</h1>
                    <p className="text-muted-foreground mt-2">
                        عرض مفصل لأداء الطلاب في هذا الامتحان.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/admin/exams">
                        <ChevronLeft className="me-2 h-4 w-4" />
                        العودة إلى قائمة الامتحانات
                    </Link>
                </Button>
            </div>
            
             {submissions.length === 0 ? (
                <Card>
                    <CardContent className="p-12 text-center text-muted-foreground">
                        <p className="text-xl">لم يقم أي طالب بتقديم هذا الامتحان بعد.</p>
                    </CardContent>
                </Card>
            ) : (
                <div className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card>
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">إجمالي المتقدمين</CardTitle>
                                <Users className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{submissions.length}</div>
                                <p className="text-xs text-muted-foreground">طالب/طالبة</p>
                            </CardContent>
                        </Card>
                        <Card>
                             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">متوسط العلامات</CardTitle>
                                <Percent className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{averageScore.toFixed(1)}%</div>
                                <p className="text-xs text-muted-foreground">متوسط أداء جميع الطلاب</p>
                            </CardContent>
                        </Card>
                         <Card>
                             <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-sm font-medium">عدد الأسئلة</CardTitle>
                                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <div className="text-2xl font-bold">{exam.questionCount}</div>
                                <p className="text-xs text-muted-foreground">سؤال في هذا الامتحان</p>
                            </CardContent>
                        </Card>
                    </div>

                    <Card>
                        <CardHeader>
                            <CardTitle>توزيع العلامات</CardTitle>
                            <CardDescription>عرض بياني لعدد الطلاب في كل فئة من فئات العلامات.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <ResponsiveContainer width="100%" height={300}>
                                <RechartsBarChart data={chartData}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="name" />
                                    <YAxis allowDecimals={false} />
                                    <Tooltip contentStyle={{ borderRadius: "0.5rem" }} />
                                    <Bar dataKey="عدد الطلاب" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                                </RechartsBarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>نتائج الطلاب التفصيلية</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <div className="overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>اسم الطالب</TableHead>
                                            <TableHead>النتيجة</TableHead>
                                            <TableHead>النسبة المئوية</TableHead>
                                            <TableHead>تاريخ التقديم</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {submissions.map(sub => (
                                            <TableRow key={sub.id}>
                                                <TableCell className="font-medium">{sub.studentName}</TableCell>
                                                <TableCell>{sub.score} / {sub.totalQuestions}</TableCell>
                                                <TableCell>{((sub.score / sub.totalQuestions) * 100).toFixed(1)}%</TableCell>
                                                <TableCell>{format(sub.submittedAt, 'd MMMM yyyy, h:mm a', { locale: ar })}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
