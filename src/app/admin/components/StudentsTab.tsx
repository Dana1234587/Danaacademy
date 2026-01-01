'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
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
} from "@/components/ui/alert-dialog";
import { Search, Edit, Trash2, KeyRound, Loader2, Users, Smartphone } from 'lucide-react';
import { type Student } from '@/services/studentService';
import { type RegisteredDevice } from '@/services/deviceService';
import { availableCourses } from '../constants';

interface StudentsTabProps {
    students: Student[];
    registeredDevices: RegisteredDevice[];
    onDeleteStudent: (studentId: string) => Promise<void>;
    onResetPassword: (studentId: string, studentName: string) => Promise<string | null>;
    onUpdateStudent: (studentId: string, data: Partial<Student>) => Promise<boolean>;
    isLoading: Record<string, boolean>;
}

export function StudentsTab({
    students,
    registeredDevices,
    onDeleteStudent,
    onResetPassword,
    onUpdateStudent,
    isLoading
}: StudentsTabProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCourseFilter, setSelectedCourseFilter] = useState<string>('all');

    // Edit dialog state
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [editName, setEditName] = useState('');
    const [editPhone1, setEditPhone1] = useState('');
    const [editPhone2, setEditPhone2] = useState('');
    const [editGender, setEditGender] = useState<'male' | 'female'>('male');
    const [editSelectedCourses, setEditSelectedCourses] = useState<string[]>([]);

    // Devices modal state
    const [devicesModalStudent, setDevicesModalStudent] = useState<Student | null>(null);

    // Filter students
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesSearch = student.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                student.username.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCourse = selectedCourseFilter === 'all' || student.courseIds?.includes(selectedCourseFilter);
            return matchesSearch && matchesCourse;
        });
    }, [students, searchQuery, selectedCourseFilter]);

    // Enrollment stats
    const courseEnrollmentStats = useMemo(() => {
        return availableCourses.map(course => ({
            ...course,
            count: students.filter(student => student.courseIds?.includes(course.id)).length
        }));
    }, [students]);

    const openEditDialog = (student: Student) => {
        setEditingStudent(student);
        setEditName(student.studentName);
        setEditPhone1(student.phone1 || '');
        setEditPhone2(student.phone2 || '');
        setEditGender(student.gender || 'male');
        setEditSelectedCourses(student.courseIds || []);
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStudent) return;

        const coursesDetails = availableCourses.filter(c => editSelectedCourses.includes(c.id));
        const success = await onUpdateStudent(editingStudent.id, {
            studentName: editName,
            phone1: editPhone1,
            phone2: editPhone2,
            gender: editGender,
            courses: coursesDetails.map(c => c.name),
            courseIds: coursesDetails.map(c => c.id),
        });

        if (success) {
            setEditingStudent(null);
        }
    };

    return (
        <>
            <Card>
                <CardHeader>
                    <div className="flex flex-col gap-4">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div>
                                <CardTitle>قائمة الطلاب ({students.length})</CardTitle>
                                <CardDescription>إدارة حسابات الطلاب وبياناتهم.</CardDescription>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="بحث باسم الطالب..."
                                        className="ps-10"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <Select onValueChange={setSelectedCourseFilter} defaultValue="all">
                                    <SelectTrigger className="w-full sm:w-48">
                                        <SelectValue placeholder="فلترة حسب الدورة" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">كل الدورات</SelectItem>
                                        {availableCourses.map(course => (
                                            <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        {/* Enrollment Stats */}
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                            {courseEnrollmentStats.map(stat => (
                                <div key={stat.id} className="bg-muted/50 rounded-lg p-2 text-center">
                                    <p className="text-xs text-muted-foreground truncate" title={stat.name}>{stat.name}</p>
                                    <p className="text-lg font-bold text-primary">{stat.count}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {filteredStudents.length > 0 ? (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>اسم الطالب</TableHead>
                                        <TableHead>اسم المستخدم</TableHead>
                                        <TableHead>الدورات</TableHead>
                                        <TableHead>الأجهزة المسجلة</TableHead>
                                        <TableHead>الإجراءات</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredStudents.map((student) => (
                                        <TableRow key={student.id}>
                                            <TableCell className="font-medium whitespace-nowrap">{student.studentName}</TableCell>
                                            <TableCell className="whitespace-nowrap">{student.username}</TableCell>
                                            <TableCell className="whitespace-nowrap">{student.courses?.join(', ') || 'N/A'}</TableCell>
                                            <TableCell>
                                                <Button variant="link" className="p-0 h-auto" onClick={() => setDevicesModalStudent(student)}>
                                                    {registeredDevices.filter(d => d.studentId === student.id).length} جهاز
                                                </Button>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex gap-1">
                                                    <Button variant="ghost" size="icon" onClick={() => openEditDialog(student)}>
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" disabled={isLoading[`reset-${student.id}`]}>
                                                                {isLoading[`reset-${student.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <KeyRound className="h-4 w-4" />}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>إعادة تعيين كلمة المرور</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    هل أنت متأكد من إعادة تعيين كلمة مرور الطالب {student.studentName}؟ سيتم إنشاء كلمة مرور جديدة عشوائية.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => onResetPassword(student.id, student.studentName)}>
                                                                    إعادة التعيين
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                    <AlertDialog>
                                                        <AlertDialogTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={isLoading[`delete-${student.id}`]}>
                                                                {isLoading[`delete-${student.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                            </Button>
                                                        </AlertDialogTrigger>
                                                        <AlertDialogContent>
                                                            <AlertDialogHeader>
                                                                <AlertDialogTitle>هل أنت متأكد من حذف هذا الطالب؟</AlertDialogTitle>
                                                                <AlertDialogDescription>
                                                                    سيؤدي هذا الإجراء إلى حذف الطالب "{student.studentName}" من نظام المصادقة وقاعدة البيانات بشكل نهائي. هذا الإجراء لا يمكن التراجع عنه.
                                                                </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                <AlertDialogAction onClick={() => onDeleteStudent(student.id)} className="bg-destructive hover:bg-destructive/90">
                                                                    نعم، قم بالحذف
                                                                </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                        </AlertDialogContent>
                                                    </AlertDialog>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-muted-foreground">
                            <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                            <p>لا يوجد طلاب مطابقين للبحث.</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Edit Student Dialog */}
            <Dialog open={!!editingStudent} onOpenChange={(isOpen) => !isOpen && setEditingStudent(null)}>
                <DialogContent className="max-w-lg">
                    <DialogHeader>
                        <DialogTitle>تعديل بيانات الطالب: {editingStudent?.studentName}</DialogTitle>
                    </DialogHeader>
                    <form onSubmit={handleEditSubmit} className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">اسم الطالب</Label>
                            <Input id="edit-name" value={editName} onChange={(e) => setEditName(e.target.value)} required />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone1">رقم الهاتف 1</Label>
                                <Input id="edit-phone1" value={editPhone1} onChange={(e) => setEditPhone1(e.target.value)} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-phone2">رقم الهاتف 2</Label>
                                <Input id="edit-phone2" value={editPhone2} onChange={(e) => setEditPhone2(e.target.value)} />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>الجنس</Label>
                            <Select value={editGender} onValueChange={(v: 'male' | 'female') => setEditGender(v)}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="male">ذكر</SelectItem>
                                    <SelectItem value="female">أنثى</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label>الدورات</Label>
                            <div className="space-y-2 rounded-md border p-3 max-h-40 overflow-y-auto">
                                {availableCourses.map(course => (
                                    <div key={course.id} className="flex items-center space-x-2 space-x-reverse">
                                        <Checkbox
                                            id={`edit-${course.id}`}
                                            checked={editSelectedCourses.includes(course.id)}
                                            onCheckedChange={(checked) => {
                                                return checked
                                                    ? setEditSelectedCourses([...editSelectedCourses, course.id])
                                                    : setEditSelectedCourses(editSelectedCourses.filter(id => id !== course.id))
                                            }}
                                        />
                                        <label htmlFor={`edit-${course.id}`} className="text-sm font-medium leading-none">
                                            {course.name}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <DialogFooter>
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">إلغاء</Button>
                            </DialogClose>
                            <Button type="submit" disabled={isLoading[`update-${editingStudent?.id}`]}>
                                {isLoading[`update-${editingStudent?.id}`] && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
                                حفظ التغييرات
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Devices Modal */}
            <Dialog open={!!devicesModalStudent} onOpenChange={(isOpen) => !isOpen && setDevicesModalStudent(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>الأجهزة المسجلة للطالب: {devicesModalStudent?.studentName}</DialogTitle>
                    </DialogHeader>
                    <div className="mt-4">
                        {registeredDevices.filter(d => d.studentId === devicesModalStudent?.id).length > 0 ? (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>الجهاز</TableHead>
                                        <TableHead>معرف الجهاز</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {registeredDevices.filter(d => d.studentId === devicesModalStudent?.id).map(device => (
                                        <TableRow key={device.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <Smartphone className="w-4 h-4" />
                                                    <span>{device.deviceInfo?.os || 'OS'} / {device.deviceInfo?.browser || 'Browser'}</span>
                                                </div>
                                            </TableCell>
                                            <TableCell className="font-mono text-xs text-muted-foreground break-all">
                                                {device.deviceId}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        ) : (
                            <p className="text-center py-8 text-muted-foreground">لا توجد أجهزة مسجلة لهذا الطالب.</p>
                        )}
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
