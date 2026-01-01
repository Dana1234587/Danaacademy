'use client';

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";
import { Search, TrendingUp, Video, HelpCircle, Eye, Loader2 } from 'lucide-react';
import { type LessonProgress, getStudentFullProgress } from '@/services/progressService';
import { type Student } from '@/services/studentService';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
import { availableCourses } from '../constants';

interface ProgressSummary {
    studentId: string;
    studentName: string;
    totalLessons: number;
    completedLessons: number;
    videoAverage: number;
    quizAverage: number;
    lastActivityAt: Date | null;
}

interface ProgressTabProps {
    students: Student[];
    allProgress: LessonProgress[];
}

export function ProgressTab({ students, allProgress }: ProgressTabProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [progressModalStudent, setProgressModalStudent] = useState<Student | null>(null);
    const [studentDetailProgress, setStudentDetailProgress] = useState<LessonProgress[]>([]);
    const [isLoadingProgress, setIsLoadingProgress] = useState(false);

    // Calculate progress summaries per student
    const progressSummaries = useMemo((): ProgressSummary[] => {
        return students.map(student => {
            const studentProgress = allProgress.filter(p => p.studentId === student.id);
            const totalLessons = studentProgress.length;
            const completedLessons = studentProgress.filter(p => p.isCompleted).length;

            const videoSum = studentProgress.reduce((sum, p) => sum + (p.videoProgress?.percentage || 0), 0);
            const quizSum = studentProgress.reduce((sum, p) => sum + (p.quizProgress?.percentage || 0), 0);

            const videoAverage = totalLessons > 0 ? Math.round(videoSum / totalLessons) : 0;
            const quizAverage = totalLessons > 0 ? Math.round(quizSum / totalLessons) : 0;

            const lastActivityAt = studentProgress.length > 0
                ? studentProgress.reduce((latest, p) => {
                    const pDate = p.updatedAt ? new Date(p.updatedAt) : null;
                    return pDate && (!latest || pDate > latest) ? pDate : latest;
                }, null as Date | null)
                : null;

            return {
                studentId: student.id,
                studentName: student.studentName,
                totalLessons,
                completedLessons,
                videoAverage,
                quizAverage,
                lastActivityAt
            };
        }).sort((a, b) => {
            // Sort by activity (most recent first)
            if (!a.lastActivityAt && !b.lastActivityAt) return 0;
            if (!a.lastActivityAt) return 1;
            if (!b.lastActivityAt) return -1;
            return b.lastActivityAt.getTime() - a.lastActivityAt.getTime();
        });
    }, [students, allProgress]);

    const filteredSummaries = useMemo(() => {
        if (!searchQuery) return progressSummaries;
        return progressSummaries.filter(summary =>
            summary.studentName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [progressSummaries, searchQuery]);

    const viewStudentProgress = useCallback(async (student: Student) => {
        setProgressModalStudent(student);
        setIsLoadingProgress(true);
        try {
            const progress = await getStudentFullProgress(student.id);
            setStudentDetailProgress(progress);
        } catch (error) {
            console.error("Error fetching student progress:", error);
        } finally {
            setIsLoadingProgress(false);
        }
    }, []);

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                            <CardTitle>تقدم الطلاب</CardTitle>
                            <CardDescription>عرض تفصيلي لتقدم كل طالب في الدروس.</CardDescription>
                        </div>
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="بحث باسم الطالب..."
                                className="ps-10"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredSummaries.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>اسم الطالب</TableHead>
                                        <TableHead className="text-center">الدروس</TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Video className="w-4 h-4" />
                                                متوسط الفيديو
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <HelpCircle className="w-4 h-4" />
                                                متوسط الأسئلة
                                            </div>
                                        </TableHead>
                                        <TableHead>آخر نشاط</TableHead>
                                        <TableHead>عرض</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredSummaries.map((summary) => (
                                        <TableRow key={summary.studentId}>
                                            <TableCell className="font-medium">{summary.studentName}</TableCell>
                                            <TableCell className="text-center">
                                                <span className="font-medium text-primary">{summary.completedLessons}</span>
                                                <span className="text-muted-foreground">/{summary.totalLessons}</span>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-blue-500 rounded-full"
                                                            style={{ width: `${summary.videoAverage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium w-10">{summary.videoAverage}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-green-500 rounded-full"
                                                            style={{ width: `${summary.quizAverage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium w-10">{summary.quizAverage}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground whitespace-nowrap">
                                                {summary.lastActivityAt
                                                    ? formatDistanceToNow(summary.lastActivityAt, { addSuffix: true, locale: ar })
                                                    : 'لا يوجد نشاط'
                                                }
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    onClick={() => {
                                                        const student = students.find(s => s.id === summary.studentId);
                                                        if (student) viewStudentProgress(student);
                                                    }}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>لا يوجد تقدم مسجل للطلاب بعد.</p>
                            <p className="text-sm mt-2">سيظهر التقدم هنا عندما يبدأ الطلاب بمشاهدة الفيديوهات وحل الأسئلة.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Student Progress Details Modal */}
            <Dialog open={!!progressModalStudent} onOpenChange={(isOpen) => !isOpen && setProgressModalStudent(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>تفاصيل تقدم الطالب: {progressModalStudent?.studentName}</DialogTitle>
                        <DialogDescription>
                            عرض تفصيلي لتقدم الطالب في كل درس
                        </DialogDescription>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh] h-auto">
                        {isLoadingProgress ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : studentDetailProgress.length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>الدرس</TableHead>
                                        <TableHead>الدورة</TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <Video className="w-4 h-4" />
                                                مشاهدة الفيديو
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">
                                            <div className="flex items-center justify-center gap-1">
                                                <HelpCircle className="w-4 h-4" />
                                                حل الأسئلة
                                            </div>
                                        </TableHead>
                                        <TableHead className="text-center">التقدم الكلي</TableHead>
                                        <TableHead>الحالة</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {studentDetailProgress.map((progress, idx) => (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">{progress.lessonId}</TableCell>
                                            <TableCell className="text-sm text-muted-foreground">
                                                {availableCourses.find(c => c.id === progress.courseId)?.name || progress.courseId}
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex flex-col items-center gap-1">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-500 rounded-full"
                                                                style={{ width: `${progress.videoProgress?.percentage || 0}%` }}
                                                            />
                                                        </div>
                                                        <span className="text-sm font-medium w-12">{progress.videoProgress?.percentage || 0}%</span>
                                                    </div>
                                                    <span className="text-xs text-muted-foreground">
                                                        {Math.round((progress.videoProgress?.watchedSeconds || 0) / 60)}د / {Math.round((progress.videoProgress?.totalSeconds || 0) / 60)}د
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center">
                                                <div className="flex items-center justify-center gap-2">
                                                    <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-green-500 rounded-full"
                                                            style={{ width: `${progress.quizProgress?.percentage || 0}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm font-medium w-12">{progress.quizProgress?.percentage || 0}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-center font-bold text-primary">
                                                {progress.overallProgress || 0}%
                                            </TableCell>
                                            <TableCell>
                                                {progress.isCompleted ? (
                                                    <span className="text-green-600 font-medium">مكتمل ✓</span>
                                                ) : progress.overallProgress && progress.overallProgress > 0 ? (
                                                    <span className="text-orange-600 font-medium">جاري</span>
                                                ) : (
                                                    <span className="text-muted-foreground">لم يبدأ</span>
                                                )}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <p>لا يوجد تقدم مسجل لهذا الطالب بعد.</p>
                            </div>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
}
