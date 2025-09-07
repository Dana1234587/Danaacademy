
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe, List, Home, Users, Edit, Trash2, Check, Plus, RefreshCw, Info, AlertTriangle, ClipboardCheck, ClipboardList, BarChart3, BarChart2, Laptop, X } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, addStudent, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, updateStudent as updateStudentService, type Student } from '@/services/studentService';
import { getPendingDevices, getRegisteredDevices, approveDevice as approveDeviceService, rejectPendingDeviceService, deleteRegisteredDevice, type PendingDevice, type RegisteredDevice } from '@/services/deviceService';
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


const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008-first-semester', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'tawjihi-2008-foundation', name: 'دورة التأسيس توجيهي 2008' },
];


export default function AdminPage() {
    const { toast } = useToast();
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    
    // State to hold data from services
    const [students, setStudents] = useState<Student[]>([]);
    const [pendingDevices, setPendingDevices] = useState<PendingDevice[]>([]);
    const [registeredDevices, setRegisteredDevices] = useState<RegisteredDevice[]>([]);

    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentUsername, setNewStudentUsername] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [newStudentPhone1, setNewStudentPhone1] = useState('');
    const [newStudentPhone2, setNewStudentPhone2] = useState('');
    const [newStudentGender, setNewStudentGender] = useState<'male' | 'female'>('male');
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [studentSearchQuery, setStudentSearchQuery] = useState('');
    const [deviceSearchQuery, setDeviceSearchQuery] = useState('');
    const [pendingDeviceSearchQuery, setPendingDeviceSearchQuery] = useState('');

    // Edit Student State
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [editStudentName, setEditStudentName] = useState('');
    const [editPhone1, setEditPhone1] = useState('');
    const [editPhone2, setEditPhone2] = useState('');
    const [editSelectedCourses, setEditSelectedCourses] = useState<string[]>([]);
    const [editStudentGender, setEditStudentGender] = useState<'male' | 'female'>('male');


    // Group registered devices by student
    const groupedRegisteredDevices = useMemo(() => {
        const studentMap = new Map(students.map(s => [s.id, s.studentName]));
        return registeredDevices.reduce((acc, device) => {
            const studentName = studentMap.get(device.studentId) || device.studentName;
            (acc[studentName] = acc[studentName] || []).push(device);
            return acc;
        }, {} as Record<string, RegisteredDevice[]>);
    }, [registeredDevices, students]);

    const filteredStudents = useMemo(() => {
        if (!studentSearchQuery) return students;
        return students.filter(
            (student) =>
                student.studentName.toLowerCase().includes(studentSearchQuery.toLowerCase()) ||
                student.username.toLowerCase().includes(studentSearchQuery.toLowerCase())
        );
    }, [students, studentSearchQuery]);

    const filteredDeviceEntries = useMemo(() => {
        if (!deviceSearchQuery) return Object.entries(groupedRegisteredDevices);
        return Object.entries(groupedRegisteredDevices).filter(([studentName]) => 
            studentName.toLowerCase().includes(deviceSearchQuery.toLowerCase())
        );
    }, [groupedRegisteredDevices, deviceSearchQuery]);
    
    const filteredPendingDevices = useMemo(() => {
        if (!pendingDeviceSearchQuery) return pendingDevices;
        return pendingDevices.filter(device =>
            device.studentName.toLowerCase().includes(pendingDeviceSearchQuery.toLowerCase())
        );
    }, [pendingDevices, pendingDeviceSearchQuery]);


    const fetchData = useCallback(async () => {
        setIsLoading(prev => ({ ...prev, page: true }));
        try {
            const [studentsData, pendingDevicesData, registeredDevicesData] = await Promise.all([
                getStudents(),
                getPendingDevices(),
                getRegisteredDevices()
            ]);
            setStudents(studentsData);
            setPendingDevices(pendingDevicesData);
            setRegisteredDevices(registeredDevicesData);
        } catch (error: any) {
            console.error("Error fetching data:", error);
            const errorMessage = error.code === 'permission-denied' 
                ? 'فشل جلب البيانات. تأكدي من أن قواعد الأمان في Firestore صحيحة وأن حسابك يملك صلاحيات المسؤول.'
                : `حدث خطأ غير متوقع: ${'error.message'}`;
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
            await approveDeviceService(id, mode);
            toast({
                title: 'تمت الموافقة',
                description: `تمت الموافقة على الجهاز الجديد للطالب ${studentName} بنجاح.`,
            });
            fetchData();
        } catch (error) {
             toast({ variant: 'destructive', title: 'فشلت الموافقة', description: 'حدث خطأ أثناء محاولة الموافقة على الجهاز.' });
        } finally {
             setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    };
    
    const handleRejectDevice = async (id: string) => {
        const loadingKey = `reject-${id}`;
        setIsLoading(prev => ({ ...prev, [loadingKey]: true }));
        try {
            await rejectPendingDeviceService(id);
            toast({
                title: 'تم الرفض',
                description: `تم رفض الجهاز وحذفه من قائمة الطلبات المعلقة.`,
            });
            fetchData();
        } catch(error) {
             toast({ variant: 'destructive', title: 'فشل الرفض', description: 'حدث خطأ أثناء محاولة رفض الجهاز.' });
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
            fetchData();
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
        } catch(error) {
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
            setIsLoading(prev => ({ ...prev, [`update-${editingStudent.id}`]: false }));
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
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4">
                    <TabsTrigger value="create-student"><UserPlus className="me-2" /> إنشاء حساب</TabsTrigger>
                    <TabsTrigger value="student-accounts"><Users className="me-2" /> الطلاب</TabsTrigger>
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
                                    <CardTitle>قائمة حسابات الطلاب</CardTitle>
                                    <CardDescription>هنا يتم عرض جميع حسابات الطلاب المسجلة في قاعدة البيانات.</CardDescription>
                                </div>
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
                        </CardHeader>
                        <CardContent>
                            <Alert>
                                <Info className="h-4 w-4" />
                                <AlertTitle>ملاحظة هامة</AlertTitle>
                                <AlertDescription>
                                    حذف الطالب من هنا سيحذف بياناته من قاعدة البيانات وجهازه المسجل وحسابه في نظام المصادقة.
                                </AlertDescription>
                            </Alert>
                            <div className="mt-4 overflow-x-auto">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>اسم الطالب</TableHead>
                                            <TableHead>اسم المستخدم</TableHead>
                                            <TableHead>كلمة المرور</TableHead>
                                            <TableHead>الجنس</TableHead>
                                            <TableHead>الدورات</TableHead>
                                            <TableHead>هاتف 1</TableHead>
                                            <TableHead>هاتف 2</TableHead>
                                            <TableHead>المتصفح</TableHead>
                                            <TableHead>الإجراءات</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredStudents.length > 0 ? (
                                            filteredStudents.map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-medium whitespace-nowrap">{student.studentName}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.username}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.password || 'N/A'}</TableCell>
                                                     <TableCell>{student.gender === 'female' ? 'أنثى' : 'ذكر'}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.courses?.join(', ') || 'N/A'}</TableCell>
                                                    <TableCell>{student.phone1 || '-'}</TableCell>
                                                    <TableCell>{student.phone2 || '-'}</TableCell>
                                                    <TableCell>{student.browser ? `${student.browser.name} على ${student.browser.os}` : 'غير معروف'}</TableCell>
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
                                                <TableCell colSpan={8} className="text-center text-muted-foreground h-24">
                                                    لا يوجد طلاب يطابقون بحثك.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="approve-devices">
                    <Card>
                        <CardHeader>
                             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                                <div>
                                    <CardTitle>طلبات الأجهزة المعلقة</CardTitle>
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
                                                          {isLoading[`reject-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin"/> : <X className="me-2" />}
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
                                            <div className="flex items-center gap-2">
                                                {device.deviceInfo?.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                <span className='font-semibold'>{device.deviceInfo?.deviceType || 'غير معروف'} - </span>
                                                <span>{device.deviceInfo?.os || 'نظام غير معروف'}</span>
                                            </div>
                                             <div className="flex items-center gap-2">
                                                <Laptop className="w-4 h-4" />
                                                <span>{device.deviceInfo?.browser || 'متصفح غير معروف'}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Globe className="w-4 h-4" />
                                                <span dir="ltr">{device.ipAddress}</span>
                                            </div>
                                            <div className="flex items-start gap-2 sm:col-span-2">
                                                <Fingerprint className="w-4 h-4 mt-1 flex-shrink-0" />
                                                <span className="break-all text-xs" dir="ltr">{device.deviceId}</span>
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
                                    <CardTitle>الأجهزة المسجلة</CardTitle>
                                    <CardDescription>هنا يتم عرض جميع الأجهزة المسجلة لكل طالب.</CardDescription>
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
                             {filteredDeviceEntries.length > 0 ? (
                                filteredDeviceEntries.map(([studentName, devices]) => (
                                    <div key={studentName} className="p-4 bg-muted rounded-lg border">
                                        <h3 className="font-bold text-lg mb-4 pb-2 border-b">{studentName}</h3>
                                        <div className="space-y-4">
                                            {devices.map(device => (
                                                <div key={device.id} className="flex items-start justify-between gap-4">
                                                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground">
                                                        <div className="flex items-center gap-2">
                                                            {device.deviceInfo?.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                            <span className='font-semibold'>{device.deviceInfo?.deviceType || 'غير معروف'} - </span>
                                                            <span>{device.deviceInfo?.os || 'نظام غير معروف'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Laptop className="w-4 h-4" />
                                                            <span>{device.deviceInfo?.browser || 'متصفح غير معروف'}</span>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Globe className="w-4 h-4" />
                                                            <span dir="ltr">{device.ipAddress}</span>
                                                        </div>
                                                        <div className="flex items-start gap-2 sm:col-span-2">
                                                            <Fingerprint className="w-4 h-4 mt-1 flex-shrink-0" />
                                                            <span className="break-all text-xs" dir="ltr">{device.deviceId}</span>
                                                        </div>
                                                    </div>
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
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))
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
        </>
    );
}
