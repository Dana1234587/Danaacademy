
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
import { getStudents, addStudent as addStudentService, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, type Student, type NewStudentData } from '@/services/studentService';
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useStore } from '@/store/app-store';

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

    // Group registered devices by student
    const groupedRegisteredDevices = useMemo(() => {
        return registeredDevices.reduce((acc, device) => {
            (acc[device.studentId] = acc[device.studentId] || []).push(device);
            return acc;
        }, {} as Record<string, RegisteredDevice[]>);
    }, [registeredDevices]);

    // Fetch data on component mount
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
            toast({ title: 'تم تحديث البيانات', description: 'تم جلب أحدث البيانات من الخادم بنجاح.' });
        } catch (error: any) {
            toast({ 
                variant: 'destructive', 
                title: 'فشل تحميل البيانات', 
                description: `لم نتمكن من جلب البيانات. قد يكون السبب مشكلة في قواعد الأمان في Firebase. الخطأ: ${error.message}` 
            });
        } finally {
            setIsLoading(prev => ({ ...prev, page: false }));
        }
    }, [toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedCourses.length === 0) {
            toast({ variant: 'destructive', title: 'خطأ', description: 'الرجاء اختيار دورة واحدة على الأقل للطالب.' });
            return;
        }
        setIsLoading(prev => ({ ...prev, create: true }));

        const studentEmail = `${newStudentUsername}@dana-academy.com`;
        const adminEmail = currentUser?.email;
        const adminPassword = prompt("للتأكيد، يرجى إدخال كلمة المرور الخاصة بك كمسؤول:");

        if (!adminEmail || !adminPassword) {
            toast({ variant: "destructive", title: "فشل الإنشاء", description: "لا يمكن إكمال العملية بدون بيانات اعتماد المسؤول." });
            setIsLoading(prev => ({ ...prev, create: false }));
            return;
        }

        try {
            // Step 1: Create the student user in Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, studentEmail, newStudentPassword);
            const user = userCredential.user;

            // Step 2: Add student data to Firestore
            const coursesDetails = availableCourses.filter(c => selectedCourses.includes(c.id));
            const newStudentData: NewStudentData = {
                studentName: newStudentName,
                username: newStudentUsername,
                password: newStudentPassword,
                phone1: newStudentPhone1,
                phone2: newStudentPhone2,
                courses: coursesDetails.map(c => c.name),
                courseIds: coursesDetails.map(c => c.id),
            };
            
            await addStudentService(user.uid, newStudentData);
            
            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${newStudentName}.`,
            });
            
            // Reset form and refetch data
            setNewStudentName('');
            setNewStudentUsername('');
            setNewStudentPassword('');
            setNewStudentPhone1('');
            setNewStudentPhone2('');
            setSelectedCourses([]);
            fetchData();

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
                        description = `Firebase Auth Error: ${error.message}`;
                }
            } else if (error.message.includes('PERMISSION_DENIED') || error.message.includes('permission-denied')) {
                description = 'فشل الوصول إلى قاعدة البيانات. يرجى التأكد من أن قواعد الأمان في Firebase صحيحة وتسمح للمسؤول بإنشاء الحسابات.';
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
            // IMPORTANT: Re-authenticate the admin to restore their session
            await signInWithEmailAndPassword(auth, adminEmail, adminPassword);
            setIsLoading(prev => ({ ...prev, create: false }));
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
            fetchData(); // Refetch all data
        } catch (error) {
             toast({ variant: 'destructive', title: 'فشلت الموافقة', description: 'حدث خطأ أثناء محاولة الموافقة على الجهاز.' });
        } finally {
             setIsLoading(prev => ({ ...prev, [loadingKey]: false }));
        }
    };

    const handleDeleteStudent = async (studentId: string, studentName: string) => {
        const confirmation = prompt(`هل أنت متأكد من حذف الطالب "${studentName}"؟ هذا الإجراء لا يمكن التراجع عنه. اكتب "حذف" للتأكيد.`);
        if (confirmation !== 'حذف') {
            toast({ title: 'تم الإلغاء', description: 'لم يتم حذف الطالب.' });
            return;
        }

        setIsLoading(prev => ({ ...prev, [`delete-${studentId}`]: true }));
        try {
            await deleteStudentService(studentId);
            toast({
                title: 'تم الحذف من قاعدة البيانات',
                description: `تم حذف بيانات الطالب. إن كان له حساب مصادقة، فيجب حذفه يدويًا من لوحة تحكم Firebase.`,
            });
            fetchData();
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: 'لم نتمكن من حذف الطالب.' });
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
        const newPassword = Math.random().toString(36).slice(-8); // Generate random password
        setIsLoading(prev => ({ ...prev, [`reset-${studentId}`]: true }));
        try {
            await resetStudentPasswordService(studentId, newPassword);
            toast({
                title: 'تم تحديث كلمة المرور في قاعدة البيانات',
                description: `كلمة المرور الجديدة (للعرض) للطالب ${studentName} هي: ${newPassword}`,
                duration: 9000
            });
            fetchData(); // Refetch students to show new password
        } catch(error) {
            toast({ variant: 'destructive', title: 'فشل إعادة التعيين', description: 'لم نتمكن من إعادة تعيين كلمة المرور.' });
        } finally {
            setIsLoading(prev => ({ ...prev, [`reset-${studentId}`]: false }));
        }
    };

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
                        <TabsTrigger value="reset-password"><KeyRound className="me-2" /> إعادة تعيين</TabsTrigger>
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
                                        هذه القائمة تعرض الطلاب المسجلين في قاعدة بيانات التطبيق (Firestore) فقط. أي مستخدم يتم إضافته يدويًا من خلال لوحة تحكم Firebase Authentication لن يظهر هنا، حيث يجب إنشاؤه من خلال قسم "إنشاء حساب" لضمان مزامنة البيانات.
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
                                            {students.map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell className="font-medium whitespace-nowrap">{student.studentName}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.username}</TableCell>
                                                    <TableCell>{student.password}</TableCell>
                                                    <TableCell className="whitespace-nowrap">{student.courses?.join(', ') || 'N/A'}</TableCell>
                                                    <TableCell>{student.phone1 || '-'}</TableCell>
                                                    <TableCell>{student.phone2 || '-'}</TableCell>
                                                    <TableCell className="flex gap-2">
                                                      <Button variant="outline" size="icon" disabled><Edit className="w-4 h-4" /></Button>
                                                      <Button 
                                                        variant="destructive" 
                                                        size="icon" 
                                                        onClick={() => handleDeleteStudent(student.id, student.studentName)}
                                                        disabled={isLoading[`delete-${student.id}`]}>
                                                            {isLoading[`delete-${student.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                      </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
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

                    <TabsContent value="reset-password">
                        <Card>
                            <CardHeader>
                                <CardTitle>إعادة تعيين كلمة المرور (للعرض فقط)</CardTitle>
                                <CardDescription>ابحثي عن الطالب لإنشاء كلمة مرور جديدة وتخزينها في قاعدة البيانات للمساعدة عند الحاجة.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <Alert variant="destructive">
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>ملاحظة هامة</AlertTitle>
                                    <AlertDescription>
                                       هذه العملية تقوم فقط بتغيير كلمة المرور المعروضة في قاعدة البيانات. هي **لا تغير** كلمة المرور الفعلية التي يستخدمها الطالب لتسجيل الدخول. لتغييرها بشكل فعلي، يجب استخدام لوحة تحكم Firebase.
                                    </AlertDescription>
                                </Alert>
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
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted rounded-lg mt-4 gap-4">
                                       <div>
                                           <p className="font-bold">{searchedStudent.studentName}</p>
                                           <p className="text-sm text-muted-foreground">{searchedStudent.username}</p>
                                       </div>
                                       <Button onClick={() => handleResetPassword(searchedStudent.id, searchedStudent.studentName)} disabled={isLoading[`reset-${searchedStudent.id}`]} variant="destructive">
                                          {isLoading[`reset-${searchedStudent.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <KeyRound className="me-2" />}
                                          إعادة تعيين
                                       </Button>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </MainLayout>
    );
}
