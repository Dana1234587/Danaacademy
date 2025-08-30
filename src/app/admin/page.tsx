
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe, List, Home, Users, Edit, Trash2, Check, Plus, RefreshCw, Info, AlertTriangle } from 'lucide-react';
import { useState, useEffect, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, addStudent, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, updateStudent as updateStudentService, type Student } from '@/services/studentService';
import { getPendingDevices, getRegisteredDevices, approveDevice as approveDeviceService, deleteRegisteredDevice, type PendingDevice, type RegisteredDevice } from '@/services/deviceService';
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


const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008', name: 'فيزياء توجيهي 2008' },
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
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);

    // Edit Student State
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [editStudentName, setEditStudentName] = useState('');
    const [editPhone1, setEditPhone1] = useState('');
    const [editPhone2, setEditPhone2] = useState('');
    const [editSelectedCourses, setEditSelectedCourses] = useState<string[]>([]);


    // Group registered devices by student
    const groupedRegisteredDevices = useMemo(() => {
        return registeredDevices.reduce((acc, device) => {
            (acc[device.studentId] = acc[device.studentId] || []).push(device);
            return acc;
        }, {} as Record<string, RegisteredDevice[]>);
    }, [registeredDevices]);

    const devicesForSearchedStudent = useMemo(() => {
        if (!searchedStudent) return [];
        return registeredDevices.filter(device => device.studentId === searchedStudent.id);
    }, [searchedStudent, registeredDevices]);


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
                : `حدث خطأ غير متوقع: ${error.message}`;
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

    const handleSearchStudent = () => {
        if (!searchQuery.trim()) {
            setSearchedStudent(null);
            return;
        }
        const found = students.find(s => s.studentName.includes(searchQuery) || s.username.includes(searchQuery));
        setSearchedStudent(found || null);
        if (!found) {
            toast({ variant: 'destructive', title: 'غير موجود', description: 'لم يتم العثور على طالب بهذا الاسم أو اسم المستخدم.' });
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
        const updatedData = {
            studentName: editStudentName,
            phone1: editPhone1,
            phone2: editPhone2,
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

    if (!currentUser) {
       return <MainLayout><div className="p-8 text-center">الرجاء تسجيل الدخول للوصول لهذه الصفحة.</div></MainLayout>
    }
    
    if (currentUser.role !== 'admin') {
        return <MainLayout><div className="p-8 text-center text-destructive">ليس لديك الصلاحيات الكافية للوصول لهذه الصفحة.</div></MainLayout>
    }

    if (isLoading['page'] && students.length === 0) {
        return <MainLayout><div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin"/></div></MainLayout>
    }

    return (
        <MainLayout>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                    <div>
                        <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
                        <p className="text-muted-foreground">مرحباً دكتورة دانا، هنا يمكنك إدارة الأكاديمية.</p>
                    </div>
                     <div className="flex gap-2">
                        <Button onClick={fetchData} variant="secondary" disabled={isLoading['page']}>
                            {isLoading['page'] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <RefreshCw className="me-2 h-4 w-4" />}
                            تحديث البيانات
                        </Button>
                         <Button asChild variant="outline">
                            <Link href="/">
                                <Home className="me-2 h-4 w-4" /> العودة للرئيسية
                            </Link>
                        </Button>
                    </div>
                </div>

                <Tabs defaultValue="create-student">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
                        <TabsTrigger value="create-student"><UserPlus className="me-2" /> إنشاء حساب</TabsTrigger>
                        <TabsTrigger value="student-accounts"><Users className="me-2" /> الطلاب</TabsTrigger>
                        <TabsTrigger value="approve-devices"><MonitorCheck className="me-2" /> الموافقة</TabsTrigger>
                        <TabsTrigger value="registered-devices"><List className="me-2" /> الأجهزة</TabsTrigger>
                        <TabsTrigger value="search-student"><Search className="me-2" /> بحث عن طالب</TabsTrigger>
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
                                        <div className="space-y-2">
                                            <Label htmlFor="student-phone1">رقم الهاتف 1 (اختياري)</Label>
                                            <Input id="student-phone1" type="tel" value={newStudentPhone1} onChange={(e) => setNewStudentPhone1(e.target.value)} placeholder="رقم هاتف الطالب أو ولي الأمر" />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="student-phone2">رقم الهاتف 2 (اختياري)</Label>
                                            <Input id="student-phone2" type="tel" value={newStudentPhone2} onChange={(e) => setNewStudentPhone2(e.target.value)} placeholder="رقم هاتف إضافي" />
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
                                <CardTitle>قائمة حسابات الطلاب</CardTitle>
                                <CardDescription>هنا يتم عرض جميع حسابات الطلاب المسجلة في قاعدة البيانات.</CardDescription>
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
                                                <TableHead>كلمة المرور (للعرض)</TableHead>
                                                <TableHead>الدورات</TableHead>
                                                <TableHead>هاتف 1</TableHead>
                                                <TableHead>هاتف 2</TableHead>
                                                <TableHead>الإجراءات</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {students.length > 0 ? (
                                                students.map((student) => (
                                                    <TableRow key={student.id}>
                                                        <TableCell className="font-medium whitespace-nowrap">{student.studentName}</TableCell>
                                                        <TableCell className="whitespace-nowrap">{student.username}</TableCell>
                                                        <TableCell>{student.password}</TableCell>
                                                        <TableCell className="whitespace-nowrap">{student.courses?.join(', ') || 'N/A'}</TableCell>
                                                        <TableCell>{student.phone1 || '-'}</TableCell>
                                                        <TableCell>{student.phone2 || '-'}</TableCell>
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
                                                    <TableCell colSpan={7} className="text-center text-muted-foreground h-24">
                                                        لا يوجد طلاب مسجلون حاليًا.
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
                                <CardTitle>طلبات الأجهزة المعلقة</CardTitle>
                                <CardDescription>الطلاب الذين يحاولون تسجيل الدخول من جهاز جديد.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                {pendingDevices.length > 0 ? (
                                    pendingDevices.map(device => (
                                        <div key={device.id} className="p-4 bg-muted rounded-lg border">
                                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4">
                                                <div>
                                                    <p className="font-bold text-lg">{device.studentName}</p>
                                                    <p className="text-sm text-primary">{device.courses.join(', ')}</p>
                                                </div>
                                                <div className="flex flex-col sm:flex-row gap-2 flex-wrap">
                                                    <Button onClick={() => handleApproveDevice(device.id, device.studentName, 'replace')} disabled={isLoading[`replace-${device.id}`]} variant="secondary">
                                                        {isLoading[`replace-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Check className="me-2" />}
                                                        موافقة واستبدال
                                                    </Button>
                                                    <Button onClick={() => handleApproveDevice(device.id, device.studentName, 'add')} disabled={isLoading[`add-${device.id}`]} variant="outline">
                                                        {isLoading[`add-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Plus className="me-2" />}
                                                        موافقة وإضافة
                                                    </Button>
                                                </div>
                                            </div>
                                            <div className="mt-4 space-y-2 text-sm text-muted-foreground border-t pt-4">
                                                <div className="flex items-center gap-2">
                                                    {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                    <span>{device.os}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    <span dir="ltr">{device.ipAddress}</span>
                                                </div>
                                                <div className="flex items-start gap-2">
                                                    <Fingerprint className="w-4 h-4 mt-1 flex-shrink-0" />
                                                    <span className="break-all" dir="ltr">{device.deviceId}</span>
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
                                <CardTitle>الأجهزة المسجلة</CardTitle>
                                <CardDescription>قائمة بجميع الأجهزة المعتمدة حاليًا للطلاب.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                {Object.keys(groupedRegisteredDevices).length > 0 ? (
                                    Object.entries(groupedRegisteredDevices).map(([studentId, devices]) => {
                                        const student = students.find(s => s.id === studentId);
                                        return (
                                            <div key={studentId} className="p-4 bg-muted/50 rounded-lg border">
                                                <div className="pb-4 border-b">
                                                    <p className="font-bold text-lg">{student?.studentName || 'طالب غير معروف'}</p>
                                                    <p className="text-sm text-primary">{student?.courses?.join(', ')}</p>
                                                </div>
                                                <div className="space-y-4 pt-4">
                                                    {devices.map(device => (
                                                        <div key={device.id} className="flex items-start justify-between gap-4">
                                                            <div className="flex-1 space-y-2 text-sm text-muted-foreground">
                                                                <div className="flex items-center gap-2">
                                                                    {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                                    <span>{device.os}</span>
                                                                </div>
                                                                <div className="flex items-center gap-2">
                                                                    <Globe className="w-4 h-4" />
                                                                    <span dir="ltr">{device.ipAddress}</span>
                                                                </div>
                                                                <div className="flex items-start gap-2">
                                                                    <Fingerprint className="w-4 h-4 mt-1 flex-shrink-0" />
                                                                    <span className="break-all" dir="ltr">{device.deviceId}</span>
                                                                </div>
                                                            </div>
                                                            <Button onClick={() => handleDeleteDevice(device.id)} variant="destructive" size="icon" disabled={isLoading[`delete-device-${device.id}`]}>
                                                                {isLoading[`delete-device-${device.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                            </Button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )
                                    })
                                ) : (
                                    <p className="text-muted-foreground text-center py-8">لا توجد أجهزة مسجلة حاليًا.</p>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="search-student">
                        <Card>
                            <CardHeader>
                                <CardTitle>بحث عن أجهزة طالب</CardTitle>
                                <CardDescription>ابحثي عن الطالب لعرض جميع أجهزته المسجلة، مع إمكانية إلغاء أي جهاز.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                 <div className="flex flex-col sm:flex-row gap-2 mt-4">
                                    <Input 
                                        placeholder="ابحثي بالاسم أو اسم المستخدم..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchStudent()}
                                    />
                                    <Button onClick={handleSearchStudent}><Search className="me-2"/>بحث</Button>
                                </div>

                                {searchedStudent && (
                                     <div className="p-4 bg-muted/50 rounded-lg border mt-6">
                                        <div className="pb-4 border-b">
                                            <p className="font-bold text-lg">{searchedStudent?.studentName}</p>
                                            <p className="text-sm text-primary">{searchedStudent?.courses?.join(', ')}</p>
                                        </div>
                                        <div className="space-y-4 pt-4">
                                            {devicesForSearchedStudent.length > 0 ? (
                                                devicesForSearchedStudent.map(device => (
                                                    <div key={device.id} className="flex items-start justify-between gap-4">
                                                        <div className="flex-1 space-y-2 text-sm text-muted-foreground">
                                                            <div className="flex items-center gap-2">
                                                                {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                                <span>{device.os}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <Globe className="w-4 h-4" />
                                                                <span dir="ltr">{device.ipAddress}</span>
                                                            </div>
                                                            <div className="flex items-start gap-2">
                                                                <Fingerprint className="w-4 h-4 mt-1 flex-shrink-0" />
                                                                <span className="break-all" dir="ltr">{device.deviceId}</span>
                                                            </div>
                                                        </div>
                                                        <Button onClick={() => handleDeleteDevice(device.id)} variant="destructive" size="icon" disabled={isLoading[`delete-device-${device.id}`]}>
                                                            {isLoading[`delete-device-${device.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                        </Button>
                                                    </div>
                                                ))
                                            ) : (
                                                <p className="text-muted-foreground text-center py-4">لا توجد أجهزة مسجلة لهذا الطالب.</p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>

                </Tabs>
            </div>
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
        </MainLayout>
    );
}
