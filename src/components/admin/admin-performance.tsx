

'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Loader2 } from 'lucide-react';
import { getExams, getAllSubmissions, type Exam, type Submission } from '@/app/admin/exams/actions';
import { getStudents, type Student } from '@/services/studentService';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008', name: 'فيزياء توجيهي 2008' },
];

export function AdminPerformance() {
    const [selectedCourse, setSelectedCourse] = useState<string>('tawjihi-2007-supplementary');
    const [students, setStudents] = useState<Student[]>([]);
    const [exams, setExams] = useState<Exam[]>([]);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [allStudents, allExams, allSubmissions] = await Promise.all([
                getStudents(),
                getExams(),
                getAllSubmissions()
            ]);

            setStudents(allStudents);
            setExams(allExams);
            setSubmissions(allSubmissions);

        } catch (error) {
            console.error("Failed to fetch performance data:", error);
        } finally {
            setIsLoading(false);
        }
    }, []);
    
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const filteredData = useMemo(() => {
        if (isLoading) return { courseStudents: [], courseExams: [], studentPerformance: [] };

        const courseStudents = students.filter(s => s.courseIds && s.courseIds.includes(selectedCourse));
        const courseExams = exams.filter(e => e.courseId === selectedCourse);
        const courseExamIds = new Set(courseExams.map(e => e.id));
        
        const studentPerformance = courseStudents.map(student => {
            const studentSubmissions = submissions.filter(sub => sub.studentId === student.id && courseExamIds.has(sub.examId));
            const totalScore = studentSubmissions.reduce((acc, sub) => acc + sub.score, 0);
            const totalQuestions = studentSubmissions.reduce((acc, sub) => acc + sub.totalQuestions, 0);
            const averagePercentage = totalQuestions > 0 ? (totalScore / totalQuestions) * 100 : 0;
            
            return {
                ...student,
                examCount: studentSubmissions.length,
                averagePercentage: averagePercentage
            };
        });
        
        return { courseStudents, courseExams, studentPerformance };

    }, [selectedCourse, students, exams, submissions, isLoading]);

    const overallCourseAverage = useMemo(() => {
        const { studentPerformance } = filteredData;
        if (studentPerformance.length === 0) return 0;
        const validPerformances = studentPerformance.filter(p => p.examCount > 0);
        if (validPerformances.length === 0) return 0;
        const totalPercentage = validPerformances.reduce((acc, p) => acc + p.averagePercentage, 0);
        return totalPercentage / validPerformances.length;
    }, [filteredData]);


    if (isLoading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="w-8 h-8 animate-spin" /></div>;
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>أداء الطلاب حسب الدورة</CardTitle>
                <CardDescription>اختر دورة لعرض تحليلات أداء الطلاب المسجلين فيها.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <Select onValueChange={setSelectedCourse} defaultValue={selectedCourse}>
                    <SelectTrigger className="w-full md:w-1/3">
                        <SelectValue placeholder="اختر دورة..." />
                    </SelectTrigger>
                    <SelectContent>
                        {availableCourses.map(course => (
                            <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <Card>
                        <CardHeader>
                            <CardTitle>معدل الأداء العام للدورة</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center justify-center h-48">
                            <div className="text-center">
                                <p className="text-5xl font-bold text-primary">{overallCourseAverage.toFixed(1)}%</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>توزيع الطلاب حسب المعدل</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ResponsiveContainer width="100%" height={200}>
                                <BarChart data={filteredData.studentPerformance}>
                                    <CartesianGrid strokeDasharray="3 3" />
                                    <XAxis dataKey="studentName" fontSize={10} interval={0} angle={-30} textAnchor="end" height={60} />
                                    <YAxis domain={[0, 100]} tickFormatter={(val) => `${val}%`} />
                                    <Tooltip formatter={(value) => [`${(value as number).toFixed(1)}%`, "المعدل"]}/>
                                    <Bar dataKey="averagePercentage" fill="hsl(var(--primary))" name="المعدل" />
                                </BarChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>
                </div>

                <div>
                    <h4 className="text-lg font-bold mb-2">تفاصيل أداء الطلاب</h4>
                    <div className="border rounded-lg overflow-hidden">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>اسم الطالب</TableHead>
                                    <TableHead>عدد الامتحانات المقدمة</TableHead>
                                    <TableHead>المعدل العام</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredData.studentPerformance.length > 0 ? (
                                    filteredData.studentPerformance.map(student => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium">{student.studentName}</TableCell>
                                            <TableCell>{student.examCount}</TableCell>
                                            <TableCell>{student.averagePercentage.toFixed(1)}%</TableCell>
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell colSpan={3} className="text-center h-24">
                                            لا يوجد طلاب أو بيانات أداء لهذه الدورة.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>

            </CardContent>
        </Card>
    )
}
