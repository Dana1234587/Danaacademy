
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Loader2, RefreshCw, ClipboardList, Clock, Calendar as CalendarIcon, Eye, BarChart2, Edit, Trash2, ToggleLeft, ToggleRight, AlertTriangle, LayoutTemplate } from 'lucide-react';
import Link from 'next/link';
import { getExams, type Exam, toggleExamStatusAction, deleteExamAction } from './actions';
import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const courseIdToNameMap: { [key: string]: string } = {
    'tawjihi-2007-supplementary': 'فيزياء تكميلي 2007',
    'tawjihi-2008-first-semester': 'فيزياء توجيهي 2008 - فصل أول',
    'tawjihi-2008-foundation': 'دورة التأسيس 2008'
};


function ExamCard({ exam, onStatusChange, onDelete }: { exam: Exam, onStatusChange: () => void, onDelete: () => void }) {
    const { toast } = useToast();
    const [isLoadingToggle, setIsLoadingToggle] = useState(false);
    const [isLoadingDelete, setIsLoadingDelete] = useState(false);

    const handleToggleStatus = async () => {
        setIsLoadingToggle(true);
        const result = await toggleExamStatusAction(exam.id, exam.status);
        if (result.success) {
            toast({ title: 'نجاح', description: 'تم تغيير حالة الامتحان بنجاح.' });
            onStatusChange();
        } else {
            toast({ variant: 'destructive', title: 'فشل', description: result.error });
        }
        setIsLoadingToggle(false);
    };

    const handleDelete = async () => {
        setIsLoadingDelete(true);
        const result = await deleteExamAction(exam.id);
        if (result.success) {
            toast({ title: 'نجاح', description: 'تم حذف الامتحان بنجاح.' });
            onDelete();
        } else {
            toast({ variant: 'destructive', title: 'فشل', description: result.error });
        }
        setIsLoadingDelete(false);
    }

    const formattedStartDate = exam.startDate ? format(exam.startDate, 'd MMMM yyyy, h:mm a', { locale: ar }) : 'غير محدد';
    const courseName = courseIdToNameMap[exam.courseId] || exam.courseId;

    return (
        <Card className="flex flex-col hover:shadow-lg transition-shadow relative overflow-hidden">
            <CardHeader>
                <div className="flex justify-between items-start gap-2">
                    <CardTitle className="text-xl">{exam.title}</CardTitle>
                    <Badge variant={exam.status === 'active' ? 'default' : 'destructive'} className="whitespace-nowrap">
                      {exam.status === 'active' ? 'فعّال' : 'غير فعّال'}
                    </Badge>
                </div>
                <CardDescription>{exam.description || 'لا يوجد وصف'}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm text-muted-foreground flex-grow">
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
                    <span>{courseName}</span>
                </div>
                <div className="flex items-center gap-2 col-span-2">
                     <CalendarIcon className="w-4 h-4" />
                     <span className="font-bold">تاريخ البدء:</span>
                    <span>{formattedStartDate}</span>
                </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-between flex-wrap gap-2">
                 <Button asChild variant="outline" size="sm">
                    <Link href={`/admin/exams/${exam.id}/results`}>
                        <BarChart2 className="me-2 h-4 w-4" />
                        النتائج
                    </Link>
                </Button>
                 <Button asChild variant="secondary" size="sm">
                    <Link href={`/admin/edit-exam/${exam.id}`}>
                        <Edit className="me-2 h-4 w-4" />
                        تعديل
                    </Link>
                </Button>
                 <Button asChild variant="secondary" size="sm">
                    <Link href={`/exam/${exam.id}`}>
                        <Eye className="me-2 h-4 w-4" />
                        معاينة
                    </Link>
                </Button>
            </CardFooter>
            <CardFooter className="border-t pt-4 flex justify-between flex-wrap gap-2">
                 <Button onClick={handleToggleStatus} size="sm" variant={exam.status === 'active' ? 'outline' : 'default'} disabled={isLoadingToggle}>
                     {isLoadingToggle ? <Loader2 className="w-4 h-4 animate-spin"/> : (exam.status === 'active' ? <ToggleLeft className="me-2"/> : <ToggleRight className="me-2"/>)}
                     {exam.status === 'active' ? 'إلغاء التفعيل' : 'تفعيل'}
                 </Button>
                 <AlertDialog>
                    <AlertDialogTrigger asChild>
                         <Button variant="destructive" size="sm" disabled={isLoadingDelete}>
                             {isLoadingDelete ? <Loader2 className="w-4 h-4 animate-spin"/> : <Trash2 className="me-2"/>}
                             حذف
                         </Button>
                    </AlertDialogTrigger>
                     <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                سيؤدي هذا الإجراء إلى حذف الامتحان <span className="font-bold text-destructive">"{exam.title}"</span> وجميع الأسئلة والنتائج المرتبطة به بشكل نهائي. لا يمكن التراجع عن هذا الإجراء.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                                نعم، قم بالحذف
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </CardFooter>
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
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div>
            <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
            <p className="text-muted-foreground mt-2">
                من هنا يمكنك إنشاء اختبارات جديدة، عرض الاختبارات السابقة، وإدارتها.
            </p>
            </div>
            <div className="flex gap-2">
                <Button asChild>
                    <Link href="/admin/create-exam">
                        <Plus className="me-2 h-4 w-4" /> إنشاء امتحان جديد
                    </Link>
                </Button>
                 <Button asChild variant="outline">
                    <Link href="/admin/create-from-template">
                        <LayoutTemplate className="me-2 h-4 w-4" /> إنشاء من قالب
                    </Link>
                </Button>
                 <Button asChild variant="secondary">
                    <Link href="/admin/exams/performance">
                        <BarChart2 className="me-2 h-4 w-4" /> تحليلات الأداء
                    </Link>
                </Button>
                <Button onClick={fetchExams} variant="outline" disabled={isLoading}>
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
             <div className="text-center py-16 text-muted-foreground border-2 border-dashed rounded-lg">
                <h3 className="text-2xl font-semibold text-foreground">لا توجد اختبارات حاليًا</h3>
                <p className="mt-2">انقر على "إنشاء امتحان جديد" للبدء.</p>
                <Button asChild className="mt-6">
                    <Link href="/admin/create-exam">
                        <Plus className="me-2 h-4 w-4" /> إنشاء امتحان جديد
                    </Link>
                </Button>
            </div>
        ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {exams.map(exam => <ExamCard key={exam.id} exam={exam} onStatusChange={fetchExams} onDelete={fetchExams} />)}
            </div>
        )}
    </div>
  );
}
