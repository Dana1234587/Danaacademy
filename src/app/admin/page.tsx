
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe, List, Home, Users, Edit, Trash2, Check, Plus, RefreshCw, Info, AlertTriangle, ClipboardCheck, ClipboardList, BarChart3, BarChart2, Laptop, X, PieChart, Clock, TrendingUp, Video, HelpCircle, Eye } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, addStudent, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, updateStudent as updateStudentService, type Student } from '@/services/studentService';
import { getPendingDevices, getAllRegisteredDevices, approveDevice, rejectPendingDevice, deleteRegisteredDevice, type PendingDevice, type RegisteredDevice } from '@/services/deviceService';
import { getAllStudentsProgress, getStudentFullProgress, type LessonProgress } from '@/services/progressService';
import { format, formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';

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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog"
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useStore } from '@/store/app-store';
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';


const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008-first-semester', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'tawjihi-2008-foundation', name: 'دورة التأسيس توجيهي 2008' },
    { id: 'tawjihi-2008-palestine', name: 'فيزياء التوجيهي - فلسطين 2008' },
    { id: 'astrophysics', name: 'فيزياء الثاني عشر - قطر' },
    { id: 'physics-101', name: 'فيزياء الجامعة 101' },
];



export default function AdminPage() {
    const { toast } = useToast();
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

    // State to hold data from services
    const [students, setStudents] = useState<Student[]>([]);
    const [pendingDevices, setPendingDevices] = useState<(PendingDevice & { id: string })[]>([]);
    const [registeredDevices, setRegisteredDevices] = useState<RegisteredDevice[]>([]);

    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentUsername, setNewStudentUsername] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [newStudentPhone1, setNewStudentPhone1] = useState('');
    const [newStudentPhone2, setNewStudentPhone2] = useState('');
    const [newStudentGender, setNewStudentGender] = useState<'male' | 'female'>('male');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);

    // Filters and Search
    const [studentSearchQuery, setStudentSearchQuery] = useState('');
    const [deviceSearchQuery, setDeviceSearchQuery] = useState('');
    const [pendingDeviceSearchQuery, setPendingDeviceSearchQuery] = useState('');
    const [studentCourseFilter, setStudentCourseFilter] = useState('all');


    // Edit Student State
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [editStudentName, setEditStudentName] = useState('');
    const [editPhone1, setEditPhone1] = useState('');
    const [editPhone2, setEditPhone2] = useState('');
    const [editSelectedCourses, setEditSelectedCourses] = useState<string[]>([]);
    const [editStudentGender, setEditStudentGender] = useState<'male' | 'female'>('male');

    // Devices Modal State
    const [devicesModalStudent, setDevicesModalStudent] = useState<Student | null>(null);

    // Progress Tracking State
    const [allProgress, setAllProgress] = useState<LessonProgress[]>([]);
    const [progressSearchQuery, setProgressSearchQuery] = useState('');
    const [progressModalStudent, setProgressModalStudent] = useState<Student | null>(null);
    const [studentDetailProgress, setStudentDetailProgress] = useState<LessonProgress[]>([]);
    const [isLoadingStudentProgress, setIsLoadingStudentProgress] = useState(false);


    const filteredStudents = useMemo(() => {
        return students.filter((student) => {
            const matchesSearch = student.studentName.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                student.username.toLowerCase().includes(studentSearchQuery.toLowerCase());
            const matchesCourse = studentCourseFilter === 'all' || student.courseIds?.includes(studentCourseFilter);
            return matchesSearch && matchesCourse;
        });
    }, [students, studentSearchQuery, studentCourseFilter]);

    const filteredRegisteredDevices = useMemo(() => {
        if (!deviceSearchQuery) return registeredDevices;
        return registeredDevices.filter(device =>
            device.studentName?.toLowerCase().includes(deviceSearchQuery.toLowerCase())
        );
    }, [registeredDevices, deviceSearchQuery]);

    const filteredPendingDevices = useMemo(() => {
        if (!pendingDeviceSearchQuery) return pendingDevices;
        return pendingDevices.filter(device =>
            device.studentName.toLowerCase().includes(pendingDeviceSearchQuery.toLowerCase())
        );
    }, [pendingDevices, pendingDeviceSearchQuery]);

    const courseEnrollmentStats = useMemo(() => {
        const stats = availableCourses.map(course => ({
            ...course,
            count: students.filter(student => student.courseIds?.includes(course.id)).length
        }));
        return stats;
    }, [students]);


    const fetchData = useCallback(async () => {
        setIsLoading(prev => ({ ...prev, page: true }));
        try {
            const [studentsData, pendingDevicesData, registeredDevicesData, progressData] = await Promise.all([
                getStudents(),
                getPendingDevices(),
                getAllRegisteredDevices(),
                getAllStudentsProgress()
            ]);
            setStudents(studentsData);
            setPendingDevices(pendingDevicesData);
            setRegisteredDevices(registeredDevicesData);
            setAllProgress(progressData);

        } catch (error: any) {
            console.error("Error fetching data:", error);
            const errorMessage = error.code === 'permission-denied'
                ? 'فشل جلب البيانات. تأكدي من أن قواعد الأمان في Firestore صحيحة وأن حسابك يملك صلاحيات المسؤول.'
                : `حدث خطأ غير متوقع: ${'\'\'\''}${error.message}${'\'\'\''}`;
            toast({
                variant: 'destructive',
                title: 'فشل تحميل البيانات',
                description: errorMessage,
                duration: 9000,
            });
        } finally {
            setIsLoading(prev => ({ ...prev, page: false }));
        }
    }, [toast]);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            fetchData();
        }
    }, [fetchData, currentUser]);

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCourses.length === 0) {
            toast({ variant: 'destructive', title: 'خطأ', description: 'الرجاء اختيار دورة واحدة على الأقل للطالب.' });
            return;
        }
        setIsLoading(prev => ({ ...prev, create: true }));

        const studentEmail = `${newStudentUsername}@dana-academy.com`;

        // Create a secondary Firebase app instance to create users without signing out the admin
        const secondaryAppName = `secondary-app-${Date.now()}`;
        const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
        const secondaryAuth = getAuth(secondaryApp);

        try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, studentEmail, newStudentPassword);
            const user = userCredential.user;

            const coursesDetails = availableCourses.filter(c => selectedCourses.includes(c.id));

            await addStudent({
                id: user.uid,
                studentName: newStudentName,
                username: newStudentUsername,
                email: studentEmail,
                password: newStudentPassword,
                phone1: newStudentPhone1,
                phone2: newStudentPhone2,
                gender: newStudentGender,
                courses: coursesDetails.map(c => c.name),
                courseIds: coursesDetails.map(c => c.id),
            });

            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${newStudentName}.`,
            });

            // Clear form and refetch data
            setNewStudentName('');
            setNewStudentUsername('');
            setNewStudentPassword('');
            setNewStudentPhone1('');
            setNewStudentPhone2('');
            setSelectedCourses([]);
            fetchData(); // Refresh the list

        } catch (error: any) {
            let description = 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.';
            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        description = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
                        break;
                    case 'auth/weak-password':
                        description = 'كلمة المرور ضعيفة جدًا. يجب أن تتكون من 6 أحرف على الأقل.';
                        break;
                    case 'auth/invalid-email':
                        description = 'صيغة اسم المستخدم غير صالحة. الرجاء استخدام حروف إنجليزية وأرقام فقط بدون مسافات أو رموز.';
                        break;
                    default:
                        description = `Firebase Error: ${error.message}`;
                }
            } else if (error.message) {
                description = error.message;
            }
            toast({
                variant: 'destructive',
                title: 'فشل إنشاء الحساب',
                description,
                duration: 9000
            });
        } finally {
            setIsLoading(prev => ({ ...prev, create: false }));
            // Clean up the secondary app instance
            try {
                await deleteApp(secondaryApp);
            } catch (err) {
                console.error("Error deleting secondary app", err);
            }
        }
    };


    const handleApproveDevice = async (id: string, studentName: string, mode: 'replace' | 'add') => {
        const loadingKey = `${mode}-${id}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        try {
            await approveDevice(id, mode);
            toast({
                title: 'تمت الموافقة',
                description: `تمت الموافقة على الجهاز الجديد للطالب ${studentName} بنجاح.`,
            });
            fetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشلت الموافقة', description: error.message || 'حدث خطأ أثناء محاولة الموافقة على الجهاز.' });
        } finally {
            setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    };

    const handleRejectDevice = async (id: string) => {
        const loadingKey = `reject-${id}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        try {
            await rejectPendingDevice(id);
            toast({
                title: 'تم الرفض',
                description: `تم رفض الجهاز وحذفه من قائمة الطلبات المعلقة.`,
            });
            fetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل الرفض', description: error.message || 'حدث خطأ أثناء محاولة رفض الجهاز.' });
        } finally {
            setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    }


    const handleDeleteStudent = async (studentId: string) => {
        setIsLoading(prev => ({ ...prev, [`delete-${studentId}`]: true }));
        try {
            await deleteStudentService(studentId);
            toast({
                title: 'تم الحذف بنجاح',
                description: `تم حذف الطالب من المصادقة وقاعدة البيانات بنجاح.`,
            });
            fetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: `حدث خطأ: ${error.message}` });
        } finally {
            setIsLoading(prev => ({ ...prev, [`delete-${studentId}`]: false }));
        }
    };

    const handleDeleteDevice = async (deviceId: string) => {
        setIsLoading(prev => ({ ...prev, [`delete-device-${deviceId}`]: true }));
        try {
            await deleteRegisteredDevice(deviceId);
            toast({
                title: 'تم الحذف',
                description: `تم حذف الجهاز المسجل بنجاح.`,
            });
            fetchData(); // Refetch all data to update the UI
            // If the modal is open, we might want to close it or update its content
            if (devicesModalStudent) {
                // To refresh the modal content, we re-set the student, which will trigger a re-render of the modal
                setDevicesModalStudent(prev => prev ? { ...prev } : null);
            }
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: 'لم نتمكن من حذف الجهاز.' });
        } finally {
            setIsLoading(prev => ({ ...prev, [`delete-device-${deviceId}`]: false }));
        }
    };

    const handleResetPassword = async (studentId: string, studentName: string) => {
        const newPassword = Math.random().toString(36).slice(-8);
        setIsLoading(prev => ({ ...prev, [`reset-${studentId}`]: true }));
        try {
            await resetStudentPasswordService(studentId, newPassword);
            toast({
                title: 'تم تحديث كلمة المرور بنجاح',
                description: `كلمة المرور الجديدة للطالب ${studentName} هي: ${newPassword}. تم تحديثها في المصادقة وقاعدة البيانات.`,
                duration: 15000
            });
            fetchData();
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل إعادة التعيين', description: 'لم نتمكن من إعادة تعيين كلمة المرور.' });
        } finally {
            setIsLoading(prev => ({ ...prev, [`reset-${studentId}`]: false }));
        }
    };

    const openEditDialog = (student: Student) => {
        setEditingStudent(student);
        setEditStudentName(student.studentName);
        setEditPhone1(student.phone1 || '');
        setEditPhone2(student.phone2 || '');
        setEditStudentGender(student.gender || 'male');
        setEditSelectedCourses(student.courseIds || []);
        setIsEditDialogOpen(true);
    };

    const handleUpdateStudent = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingStudent) return;
        if (editSelectedCourses.length === 0) {
            toast({ variant: 'destructive', title: 'خطأ', description: 'الرجاء اختيار دورة واحدة على الأقل للطالب.' });
            return;
        }
        setIsLoading(prev => ({ ...prev, [`update-${editingStudent.id}`]: true }));

        const coursesDetails = availableCourses.filter(c => editSelectedCourses.includes(c.id));
        const updatedData: Partial<Student> = {
            studentName: editStudentName,
            phone1: editPhone1,
            phone2: editPhone2,
            gender: editStudentGender,
            courses: coursesDetails.map(c => c.name),
            courseIds: coursesDetails.map(c => c.id),
        };

        try {
            await updateStudentService(editingStudent.id, updatedData);
            toast({
                title: 'تم تحديث البيانات',
                description: `تم تحديث بيانات الطالب ${editStudentName} بنجاح.`,
            });
            fetchData();
            setIsEditDialogOpen(false);
            setEditingStudent(null);
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل التحديث', description: `حدث خطأ: ${error.message}` });
        } finally {
            setIsLoading(prev => ({ ...prev, [`update-${editingStudent?.id}`]: false }));
        }
    };

    // Calculate student progress summary for display
    const studentProgressSummary = useMemo(() => {
        const summaryMap = new Map<string, {
            studentId: string;
            studentName: string;
            courses: string[];
            totalLessons: number;
            completedLessons: number;
            videoAverage: number;
            quizAverage: number;
            overallAverage: number;
            lastActivity: Date | null;
        }>();

        // Group progress by studentId
        allProgress.forEach(progress => {
            const student = students.find(s => s.id === progress.studentId);
            if (!student) return;

            const existing = summaryMap.get(progress.studentId);
            if (existing) {
                existing.totalLessons += 1;
                existing.completedLessons += progress.isCompleted ? 1 : 0;
                existing.videoAverage += progress.videoProgress?.percentage || 0;
                existing.quizAverage += progress.quizProgress?.percentage || 0;
                existing.overallAverage += progress.overallProgress || 0;
                if (progress.updatedAt && (!existing.lastActivity || progress.updatedAt > existing.lastActivity)) {
                    existing.lastActivity = progress.updatedAt;
                }
            } else {
                summaryMap.set(progress.studentId, {
                    studentId: progress.studentId,
                    studentName: student.studentName,
                    courses: student.courses || [],
                    totalLessons: 1,
                    completedLessons: progress.isCompleted ? 1 : 0,
                    videoAverage: progress.videoProgress?.percentage || 0,
                    quizAverage: progress.quizProgress?.percentage || 0,
                    overallAverage: progress.overallProgress || 0,
                    lastActivity: progress.updatedAt,
                });
            }
        });

        // Calculate averages
        const result = Array.from(summaryMap.values()).map(summary => ({
            ...summary,
            videoAverage: summary.totalLessons > 0 ? Math.round(summary.videoAverage / summary.totalLessons) : 0,
            quizAverage: summary.totalLessons > 0 ? Math.round(summary.quizAverage / summary.totalLessons) : 0,
            overallAverage: summary.totalLessons > 0 ? Math.round(summary.overallAverage / summary.totalLessons) : 0,
        }));

        // Sort by last activity
        result.sort((a, b) => {
            if (!a.lastActivity) return 1;
            if (!b.lastActivity) return -1;
            const aTime = a.lastActivity instanceof Date ? a.lastActivity.getTime() : new Date(a.lastActivity).getTime();
            const bTime = b.lastActivity instanceof Date ? b.lastActivity.getTime() : new Date(b.lastActivity).getTime();
            return bTime - aTime;
        });

        return result;
    }, [allProgress, students]);

    // Filter progress summary by search
    const filteredProgressSummary = useMemo(() => {
        if (!progressSearchQuery) return studentProgressSummary;
        return studentProgressSummary.filter(s =>
            s.studentName.toLowerCase().includes(progressSearchQuery.toLowerCase())
        );
    }, [studentProgressSummary, progressSearchQuery]);

    // View student progress details
    const viewStudentProgress = async (student: Student, studentIdFromSummary?: string) => {
        setProgressModalStudent(student);
        setIsLoadingStudentProgress(true);
        try {
            // استخدام الـ studentId من الـ summary إذا كان متاحاً
            const targetStudentId = studentIdFromSummary || student.id;

            // فلترة البيانات المحلية أولاً (أسرع)
            const localProgress = allProgress.filter(p => p.studentId === targetStudentId);

            if (localProgress.length > 0) {
                setStudentDetailProgress(localProgress);
            } else {
                // إذا لم توجد بيانات محلية، نجرب الـ API
                const progress = await getStudentFullProgress(targetStudentId);
                setStudentDetailProgress(progress);
            }
        } catch (error) {
            console.error('Error loading student progress:', error);
            toast({ variant: 'destructive', title: 'خطأ', description: 'فشل تحميل تقدم الطالب' });
        } finally {
            setIsLoadingStudentProgress(false);
        }
    };

    return (
        <>
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
                    <p className="text-muted-foreground">مرحباً دكتورة دانا، هنا يمكنك إدارة الطلاب والأجهزة.</p>
                </div>
                <Button onClick={fetchData} variant="secondary" disabled={isLoading['page']}>
                    {isLoading['page'] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <RefreshCw className="me-2 h-4 w-4" />}
                    تحديث البيانات
                </Button>
            </div>

            <Tabs defaultValue="create-student">
                <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
                    <TabsTrigger value="create-student"><UserPlus className="me-2" /> إنشاء حساب</TabsTrigger>
                    <TabsTrigger value="student-accounts"><Users className="me-2" /> الطلاب</TabsTrigger>
                    <TabsTrigger value="student-progress"><TrendingUp className="me-2" /> تقدم الطلاب</TabsTrigger>
                    <TabsTrigger value="approve-devices"><MonitorCheck className="me-2" /> الموافقة</TabsTrigger>
                    <TabsTrigger value="registered-devices"><Fingerprint className="me-2" /> الأجهزة المسجلة</TabsTrigger>
                </TabsList>


                <TabsContent value="create-student">
                    <Card>
                        <CardHeader>
                            <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                            <CardDescription>أدخلي بيانات الطالب والدورات لإنشاء حسابه في نظام المصادقة وقاعدة البيانات.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleCreateAccount} className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="student-name">اسم الطالب الكامل</Label>
                                        <Input id="student-name" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)} placeholder="مثال: محمد عبدالله" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="student-username">اسم المستخدم (باللغة الإنجليزية)</Label>
                                        <Input id="student-username" value={newStudentUsername} onChange={(e) => setNewStudentUsername(e.target.value)} placeholder="مثال: mohammed123" required />
                                        <p className="text-xs text-muted-foreground">استخدم حروف إنجليزية وأرقام فقط، بدون مسافات أو رموز.</p>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="student-password">كلمة المرور</Label>
                                        <Input id="student-password" type="password" value={newStudentPassword} onChange={(e) => setNewStudentPassword(e.target.value)} placeholder="6 أحرف على الأقل" required />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>الجنس</Label>
                                        <Select onValueChange={(value: 'male' | 'female') => setNewStudentGender(value)} defaultValue={newStudentGender}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="اختر الجنس" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="male">ذكر</SelectItem>
                                                <SelectItem value="female">أنثى</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="student-phone1">رقم الهاتف 1 (اختياري)</Label>
                                        <Input id="student-phone1" type="tel" value={newStudentPhone1} onChange={(e) => setNewStudentPhone1(e.target.value)} placeholder="رقم هاتف الطالب أو ولي الأمر" />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="student-phone2">رقم الهاتف 2 (اختياري)</Label>
                                        <Input id="student-phone2" type="tel" value={newStudentPhone2} onChange={(e) => setNewStudentPhone2(e.target.value)} placeholder="رقم هاتف إضافي" />
                                    </div>
                                    <div className="space-y-3 md:col-span-2">
                                        <Label>الدورات المسجل بها</Label>
                                        <div className="space-y-2 rounded-md border p-4">
                                            {availableCourses.map(course => (
                                                <div key={course.id} className="flex items-center space-x-2 space-x-reverse">
                                                    <Checkbox
                                                        id={course.id}
                                                        checked={selectedCourses.includes(course.id)}
                                                        onCheckedChange={(checked) => {
                                                            return checked
                                                                ? setSelectedCourses([...selectedCourses, course.id])
                                                                : setSelectedCourses(selectedCourses.filter(id => id !== course.id))
                                                        }}
                                                    />
                                                    <label
                                                        htmlFor={course.id}
                                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                    >
                                                        {course.name}
                                                    </label>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <Button type="submit" className="w-full" disabled={isLoading['create']}>
                                    {isLoading['create'] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <UserPlus className="me-2" />}
                                    إنشاء الحساب
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="student-accounts">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle>قائمة حسابات الطلاب ({filteredStudents.length} / {students.length})</CardTitle>
                                    <CardDescription>هنا يتم عرض جميع حسابات الطلاب المسجلة في قاعدة البيانات.</CardDescription>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                                    <Select value={studentCourseFilter} onValueChange={setStudentCourseFilter}>
                                        <SelectTrigger className="w-full sm:w-[220px]">
                                            <SelectValue placeholder="فلترة حسب الدورة" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">جميع الدورات</SelectItem>
                                            {availableCourses.map(course => (
                                                <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <div className="relative w-full sm:w-64">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            placeholder="بحث بالاسم أو اسم المستخدم..."
                                            className="ps-10"
                                            value={studentSearchQuery}
                                            onChange={(e) => setStudentSearchQuery(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>ملاحظة هامة</AlertTitle>
                                <AlertDescription>
                                    حذف الطالب من هنا سيحذف بياناته من قاعدة البيانات وأجهزته المسجلة وحسابه في نظام المصادقة.
                                </AlertDescription>
                            </Alert>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                {courseEnrollmentStats.map(course => (
                                    <div key={course.id} className="p-4 border rounded-lg bg-muted/50 flex items-center justify-between">
                                        <p className="font-semibold text-primary text-sm">{course.name}</p>
                                        <div className="flex items-center gap-2">
                                            <Users className="w-4 h-4 text-muted-foreground" />
                                            <span className="text-lg font-bold">{course.count}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 overflow-x-auto">
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
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-medium whitespace-nowrap">{student.studentName}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.username}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.courses?.join(', ') || 'N/A'}</TableCell>
                                                    <TableCell>
                                                        <Button variant="link" className="p-0 h-auto" onClick={() => setDevicesModalStudent(student)}>
                                                            {registeredDevices.filter(d => d.studentId === student.id).length}
                                                        </Button>
                                                    </TableCell>
                                                    <TableCell className="flex gap-2">
                                                        <Button variant="outline" size="icon" onClick={() => openEditDialog(student)}><Edit className="w-4 h-4" /></Button>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button
                                                                    variant="destructive"
                                                                    size="icon"
                                                                    disabled={isLoading[`delete-${student.id}`]}>
                                                                    {isLoading[`delete-${student.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>هل أنت متأكد تمامًا؟</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        هذا الإجراء سيحذف بيانات الطالب "{student.studentName}" وأجهزته المسجلة وحسابه في نظام المصادقة نهائيًا. لا يمكن التراجع عن هذا الإجراء.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDeleteStudent(student.id)} className="bg-destructive hover:bg-destructive/90">
                                                                        نعم، قم بالحذف
                                                                    </AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                                    لا يوجد طلاب يطابقون بحثك أو الفلتر المطبق.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="student-progress">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle>تقدم الطلاب ({filteredProgressSummary.length})</CardTitle>
                                    <CardDescription>متابعة تقدم الطلاب في مشاهدة الفيديوهات وحل الأسئلة</CardDescription>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="بحث باسم الطالب..."
                                        className="ps-10"
                                        value={progressSearchQuery}
                                        onChange={(e) => setProgressSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {filteredProgressSummary.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>اسم الطالب</TableHead>
                                                <TableHead>الدورات</TableHead>
                                                <TableHead className="text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <Video className="w-4 h-4" />
                                                        الفيديو
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-center">
                                                    <div className="flex items-center justify-center gap-1">
                                                        <HelpCircle className="w-4 h-4" />
                                                        الأسئلة
                                                    </div>
                                                </TableHead>
                                                <TableHead className="text-center">التقدم الكلي</TableHead>
                                                <TableHead>الدروس المكتملة</TableHead>
                                                <TableHead>آخر نشاط</TableHead>
                                                <TableHead>تفاصيل</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredProgressSummary.map((summary) => (
                                                <TableRow key={summary.studentId}>
                                                    <TableCell className="font-medium">{summary.studentName}</TableCell>
                                                    <TableCell className="text-sm text-muted-foreground max-w-[150px] truncate">
                                                        {summary.courses.join(', ') || 'N/A'}
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-blue-500 rounded-full transition-all"
                                                                    style={{ width: `${summary.videoAverage}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-medium">{summary.videoAverage}%</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className="h-full bg-green-500 rounded-full transition-all"
                                                                    style={{ width: `${summary.quizAverage}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-medium">{summary.quizAverage}%</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full transition-all ${summary.overallAverage >= 80 ? 'bg-emerald-500' :
                                                                        summary.overallAverage >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                                                        }`}
                                                                    style={{ width: `${summary.overallAverage}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-bold">{summary.overallAverage}%</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <span className="font-medium">{summary.completedLessons}</span>
                                                        <span className="text-muted-foreground">/{summary.totalLessons}</span>
                                                    </TableCell>
                                                    <TableCell>
                                                        {summary.lastActivity ? (
                                                            <span className="flex items-center gap-2 text-xs text-muted-foreground">
                                                                <Clock className="w-3 h-3" />
                                                                {formatDistanceToNow(summary.lastActivity, { addSuffix: true, locale: ar })}
                                                            </span>
                                                        ) : (
                                                            <span className="text-muted-foreground">-</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => {
                                                                const student = students.find(s => s.id === summary.studentId);
                                                                if (student) viewStudentProgress(student, summary.studentId);
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
                </TabsContent>

                <TabsContent value="approve-devices">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle>طلبات الأجهزة المعلقة ({pendingDevices.length})</CardTitle>
                                    <CardDescription>الطلاب الذين يحاولون تسجيل الدخول من جهاز جديد.</CardDescription>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="بحث باسم الطالب..."
                                        className="ps-10"
                                        value={pendingDeviceSearchQuery}
                                        onChange={(e) => setPendingDeviceSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {filteredPendingDevices.length > 0 ? (
                                filteredPendingDevices.map(device => (
                                    <div key={device.id} className="p-4 bg-muted rounded-lg border">
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4">
                                            <div>
                                                <p className="font-bold text-lg">{device.studentName}</p>
                                                <p className="text-sm text-primary">{device.courses.join(', ')}</p>
                                            </div>
                                            <div className="flex flex-row gap-2 flex-wrap">
                                                <Button onClick={() => handleApproveDevice(device.id, device.studentName, 'replace')} disabled={isLoading[`replace-${device.id}`]} variant="secondary">
                                                    {isLoading[`replace-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Check className="me-2" />}
                                                    موافقة واستبدال
                                                </Button>
                                                <Button onClick={() => handleApproveDevice(device.id, device.studentName, 'add')} disabled={isLoading[`add-${device.id}`]} variant="outline">
                                                    {isLoading[`add-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Plus className="me-2" />}
                                                    موافقة وإضافة
                                                </Button>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="destructive" disabled={isLoading[`reject-${device.id}`]}>
                                                            {isLoading[`reject-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <X className="me-2" />}
                                                            رفض
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>هل أنت متأكد من رفض هذا الجهاز؟</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                سيؤدي هذا الإجراء إلى حذف طلب الموافقة لهذا الجهاز بشكل نهائي.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => handleRejectDevice(device.id)} className="bg-destructive hover:bg-destructive/90">
                                                                نعم، قم بالرفض
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </div>
                                        </div>
                                        <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground border-t pt-4">
                                            <div className="flex items-center gap-2 font-mono text-xs">
                                                <p className="font-sans font-semibold">OS:</p> <span>{device.deviceInfo?.os || 'N/A'} {device.deviceInfo?.osVersion}</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-mono text-xs">
                                                <p className="font-sans font-semibold">Browser:</p> <span>{device.deviceInfo?.browser} {device.deviceInfo?.browserVersion}</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-mono text-xs">
                                                <p className="font-sans font-semibold">Device:</p> <span>{device.deviceInfo?.deviceVendor || ''} {device.deviceInfo?.deviceModel || device.deviceInfo?.deviceType || 'Unknown'}</span>
                                            </div>
                                            <div className="flex items-center gap-2 font-mono text-xs">
                                                <p className="font-sans font-semibold">IP:</p> <span>{device.ipAddress}</span>
                                            </div>
                                            <div className="flex items-start gap-2 sm:col-span-2 font-mono text-xs">
                                                <p className="font-sans font-semibold flex-shrink-0">ID:</p>
                                                <span className="break-all">{device.deviceId}</span>
                                            </div>
                                            <div className="flex items-start gap-2 sm:col-span-2 font-mono text-xs">
                                                <p className="font-sans font-semibold flex-shrink-0">UA:</p>
                                                <span className="break-all">{device.deviceInfo?.ua}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-muted-foreground text-center py-8">لا توجد طلبات معلقة حاليًا.</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="registered-devices">
                    <Card>
                        <CardHeader>
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle>الأجهزة المسجلة ({registeredDevices.length})</CardTitle>
                                    <CardDescription>هنا يتم عرض جميع الأجهزة المسجلة لكل طالب. الأجهزة مرتبة حسب آخر ظهور.</CardDescription>
                                </div>
                                <div className="relative w-full sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                    <Input
                                        placeholder="بحث باسم الطالب..."
                                        className="ps-10"
                                        value={deviceSearchQuery}
                                        onChange={(e) => setDeviceSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {filteredRegisteredDevices.length > 0 ? (
                                <div className="overflow-x-auto">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>اسم الطالب</TableHead>
                                                <TableHead>الجهاز</TableHead>
                                                <TableHead>آخر ظهور</TableHead>
                                                <TableHead>الإجراءات</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {filteredRegisteredDevices.map(device => (
                                                <TableRow key={device.id}>
                                                    <TableCell className="font-medium">{device.studentName}</TableCell>
                                                    <TableCell>
                                                        <div className="flex items-center gap-2 text-xs">
                                                            <span>{device.deviceInfo?.os || 'OS'} / {device.deviceInfo?.browser || 'Browser'}</span>
                                                        </div>
                                                        <div className="font-mono text-xs text-muted-foreground break-all">{device.deviceId}</div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {device.lastSeenAt ? (
                                                            <span className="flex items-center gap-2 text-xs">
                                                                <Clock className="w-3 h-3" />
                                                                {formatDistanceToNow(new Date(device.lastSeenAt), { addSuffix: true, locale: ar })}
                                                            </span>
                                                        ) : (
                                                            <span>غير معروف</span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        <AlertDialog>
                                                            <AlertDialogTrigger asChild>
                                                                <Button variant="destructive" size="icon" disabled={isLoading[`delete-device-${device.id}`]}>
                                                                    {isLoading[`delete-device-${device.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                                </Button>
                                                            </AlertDialogTrigger>
                                                            <AlertDialogContent>
                                                                <AlertDialogHeader>
                                                                    <AlertDialogTitle>هل أنت متأكد من حذف الجهاز؟</AlertDialogTitle>
                                                                    <AlertDialogDescription>
                                                                        هذا الإجراء سيحذف الجهاز المسجل نهائيًا. سيضطر الطالب إلى إعادة تسجيله والموافقة عليه مرة أخرى.
                                                                    </AlertDialogDescription>
                                                                </AlertDialogHeader>
                                                                <AlertDialogFooter>
                                                                    <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                                    <AlertDialogAction onClick={() => handleDeleteDevice(device.id)} className="bg-destructive hover:bg-destructive/90">نعم، قم بالحذف</AlertDialogAction>
                                                                </AlertDialogFooter>
                                                            </AlertDialogContent>
                                                        </AlertDialog>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            ) : (
                                <p className="text-muted-foreground text-center py-8">
                                    {deviceSearchQuery ? "لا يوجد طلاب يطابقون بحثك." : "لا توجد أجهزة مسجلة حاليًا."}
                                </p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>

            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent>
                    <form onSubmit={handleUpdateStudent}>
                        <DialogHeader>
                            <DialogTitle>تعديل بيانات الطالب: {editingStudent?.studentName}</DialogTitle>
                            <DialogDescription>
                                يمكنك تعديل بيانات الطالب هنا. اسم المستخدم وكلمة المرور لا يمكن تغييرهما من هنا.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-student-name" className="text-right">الاسم</Label>
                                <Input id="edit-student-name" value={editStudentName} onChange={(e) => setEditStudentName(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-phone1" className="text-right">هاتف 1</Label>
                                <Input id="edit-phone1" value={editPhone1} onChange={(e) => setEditPhone1(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-phone2" className="text-right">هاتف 2</Label>
                                <Input id="edit-phone2" value={editPhone2} onChange={(e) => setEditPhone2(e.target.value)} className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="edit-gender" className="text-right">الجنس</Label>
                                <div className="col-span-3">
                                    <Select onValueChange={(value: 'male' | 'female') => setEditStudentGender(value)} value={editStudentGender}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="اختر الجنس" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="male">ذكر</SelectItem>
                                            <SelectItem value="female">أنثى</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                            <div className="col-span-4 space-y-3">
                                <Label>الدورات المسجل بها</Label>
                                <div className="space-y-2 rounded-md border p-4">
                                    {availableCourses.map(course => (
                                        <div key={`edit-${course.id}`} className="flex items-center space-x-2 space-x-reverse">
                                            <Checkbox
                                                id={`edit-${course.id}`}
                                                checked={editSelectedCourses.includes(course.id)}
                                                onCheckedChange={(checked) => {
                                                    return checked
                                                        ? setEditSelectedCourses([...editSelectedCourses, course.id])
                                                        : setEditSelectedCourses(editSelectedCourses.filter(id => id !== course.id))
                                                }}
                                            />
                                            <label
                                                htmlFor={`edit-${course.id}`}
                                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                            >
                                                {course.name}
                                            </label>
                                        </div>
                                    ))}
                                </div>
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

            <Dialog open={!!devicesModalStudent} onOpenChange={(isOpen) => !isOpen && setDevicesModalStudent(null)}>
                <DialogContent className="max-w-3xl">
                    <DialogHeader>
                        <DialogTitle>الأجهزة المسجلة للطالب: {devicesModalStudent?.studentName}</DialogTitle>
                    </DialogHeader>
                    <ScrollArea className="mt-4 max-h-[60vh] h-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>الجهاز</TableHead>
                                    <TableHead>آخر ظهور</TableHead>
                                    <TableHead>الإجراء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {registeredDevices.filter(d => d.studentId === devicesModalStudent?.id).map(device => (
                                    <TableRow key={device.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span>{device.deviceInfo?.os || 'OS'} / {device.deviceInfo?.browser || 'Browser'}</span>
                                            </div>
                                            <div className="font-mono text-xs text-muted-foreground break-all">{device.deviceId}</div>
                                        </TableCell>
                                        <TableCell>
                                            {device.lastSeenAt ? (
                                                <span className="text-xs">{formatDistanceToNow(new Date(device.lastSeenAt), { addSuffix: true, locale: ar })}</span>
                                            ) : (
                                                <span>غير معروف</span>
                                            )}
                                        </TableCell>
                                        <TableCell>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button variant="destructive" size="icon" disabled={isLoading[`delete-device-${device.id}`]}>
                                                        {isLoading[`delete-device-${device.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>هل أنت متأكد من حذف الجهاز؟</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            هذا الإجراء سيحذف الجهاز المسجل للطالب {devicesModalStudent?.studentName} نهائيًا. سيضطر الطالب إلى إعادة تسجيله والموافقة عليه مرة أخرى.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteDevice(device.id)} className="bg-destructive hover:bg-destructive/90">نعم، قم بالحذف</AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        {registeredDevices.filter(d => d.studentId === devicesModalStudent?.id).length === 0 && (
                            <p className="text-center py-8 text-muted-foreground">لا توجد أجهزة مسجلة لهذا الطالب.</p>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            {/* Student Progress Details Modal */}
            <Dialog open={!!progressModalStudent} onOpenChange={(isOpen) => !isOpen && setProgressModalStudent(null)}>
                <DialogContent className="max-w-4xl">
                    <DialogHeader>
                        <DialogTitle>تفاصيل تقدم الطالب: {progressModalStudent?.studentName}</DialogTitle>
                        <DialogDescription>
                            عرض تفصيلي لتقدم الطالب في كل درس
                        </DialogDescription>
                    </DialogHeader>
                    <div className="mt-4 max-h-[60vh] overflow-auto">
                        {isLoadingStudentProgress ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : studentDetailProgress.length > 0 ? (
                            <div className="overflow-x-auto min-w-full">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="min-w-[200px]">اسم الدرس</TableHead>
                                            <TableHead className="min-w-[120px]">الدورة</TableHead>
                                            <TableHead className="text-center min-w-[120px]">
                                                <div className="flex items-center justify-center gap-1">
                                                    <Video className="w-4 h-4" />
                                                    الفيديو
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-center min-w-[100px]">
                                                <div className="flex items-center justify-center gap-1">
                                                    <HelpCircle className="w-4 h-4" />
                                                    الأسئلة
                                                </div>
                                            </TableHead>
                                            <TableHead className="text-center min-w-[100px]">التقدم الكلي</TableHead>
                                            <TableHead className="min-w-[80px]">الحالة</TableHead>
                                            <TableHead className="min-w-[100px]">آخر تحديث</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {studentDetailProgress.map((progress, idx) => {
                                            // استخراج اسم الدرس بشكل مقروء من المسار
                                            const pathParts = progress.lessonId?.split('/') || [];
                                            const lessonName = pathParts[pathParts.length - 1]?.replace(/-/g, ' ') || progress.lessonId;
                                            const unitName = pathParts.length > 1 ? pathParts[pathParts.length - 2]?.replace(/-/g, ' ') : '';

                                            return (
                                                <TableRow key={idx}>
                                                    <TableCell className="font-medium">
                                                        <div className="flex flex-col">
                                                            <span className="text-sm font-semibold capitalize">{lessonName}</span>
                                                            {unitName && <span className="text-xs text-muted-foreground capitalize">{unitName}</span>}
                                                        </div>
                                                    </TableCell>
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
                                                        <div className="flex flex-col items-center gap-1">
                                                            <div className="flex items-center gap-2">
                                                                <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                                                                    <div
                                                                        className="h-full bg-green-500 rounded-full"
                                                                        style={{ width: `${progress.quizProgress?.percentage || 0}%` }}
                                                                    />
                                                                </div>
                                                                <span className="text-sm font-medium w-12">{progress.quizProgress?.percentage || 0}%</span>
                                                            </div>
                                                            <span className="text-xs text-muted-foreground">
                                                                {progress.quizProgress?.correctAnswers || 0} / {progress.quizProgress?.totalQuestions || 0} صحيح
                                                            </span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell className="text-center">
                                                        <div className="flex items-center justify-center gap-2">
                                                            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                                <div
                                                                    className={`h-full rounded-full ${progress.overallProgress >= 80 ? 'bg-emerald-500' :
                                                                        progress.overallProgress >= 50 ? 'bg-amber-500' : 'bg-red-500'
                                                                        }`}
                                                                    style={{ width: `${progress.overallProgress}%` }}
                                                                />
                                                            </div>
                                                            <span className="text-sm font-bold">{progress.overallProgress}%</span>
                                                        </div>
                                                    </TableCell>
                                                    <TableCell>
                                                        {progress.isCompleted ? (
                                                            <span className="inline-flex items-center gap-1 text-xs bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300 px-2 py-1 rounded-full">
                                                                <Check className="w-3 h-3" />
                                                                مكتمل
                                                            </span>
                                                        ) : (
                                                            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300 px-2 py-1 rounded-full">
                                                                <Clock className="w-3 h-3" />
                                                                قيد التقدم
                                                            </span>
                                                        )}
                                                    </TableCell>
                                                    <TableCell>
                                                        {progress.updatedAt ? (
                                                            <span className="text-xs text-muted-foreground">
                                                                {formatDistanceToNow(progress.updatedAt, { addSuffix: true, locale: ar })}
                                                            </span>
                                                        ) : '-'}
                                                    </TableCell>
                                                </TableRow>
                                            );
                                        })}
                                    </TableBody>
                                </Table>
                            </div>
                        ) : (
                            <div className="text-center py-12 text-muted-foreground">
                                <TrendingUp className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>لا يوجد تقدم مسجل لهذا الطالب بعد.</p>
                            </div>
                        )}
                    </ScrollArea>
                </DialogContent>
            </Dialog>
        </>
    );
}





