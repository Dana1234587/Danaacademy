
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe, List, Home, Users, Edit, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { getStudents, addStudent as addStudentService, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, type Student } from '@/services/studentService';
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

const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008', name: 'فيزياء توجيهي 2008' },
];


export default function AdminPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    
    // State to hold data from services
    const [students, setStudents] = useState<Student[]>([]);
    const [pendingDevices, setPendingDevices] = useState<PendingDevice[]>([]);
    const [registeredDevices, setRegisteredDevices] = useState<RegisteredDevice[]>([]);

    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentUsername, setNewStudentUsername] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStudent, setSearchedStudent] = useState<Student | null>(null);

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setIsLoading({ page: true });
        try {
            const [studentsData, pendingDevicesData, registeredDevicesData] = await Promise.all([
                getStudents(),
                getPendingDevices(),
                getRegisteredDevices()
            ]);
            setStudents(studentsData);
            setPendingDevices(pendingDevicesData);
            setRegisteredDevices(registeredDevicesData);
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل تحميل البيانات', description: 'لم نتمكن من جلب البيانات من الخادم. تأكدي من صلاحيات الوصول إلى قاعدة البيانات.' });
        } finally {
            setIsLoading({ page: false });
        }
    };

    const handleCreateAccount = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading({ ...isLoading, create: true });
        try {
            const courseDetails = availableCourses.find(c => c.id === selectedCourse);
            if (!courseDetails) {
                 toast({ variant: 'destructive', title: 'خطأ', description: 'الرجاء اختيار دورة صحيحة.' });
                 setIsLoading({ ...isLoading, create: false });
                 return;
            }
            
            const newStudentData: Omit<Student, 'id'> = {
                studentName: newStudentName,
                username: newStudentUsername,
                password: newStudentPassword,
                course: courseDetails.name,
                courseId: courseDetails.id,
            };
            
            await addStudentService(newStudentData);
            
            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${newStudentName}.`,
            });
            
            // Reset form and refetch data
            setNewStudentName('');
            setNewStudentUsername('');
            setNewStudentPassword('');
            setSelectedCourse('');
            fetchData();

        } catch (error: any) {
            let description = 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.';
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
                case 'permission-denied':
                case 'PERMISSION_DENIED':
                    description = 'فشل الوصول إلى قاعدة البيانات. يرجى التأكد من أن قواعد الأمان في Firebase تسمح بالكتابة للمستخدمين المسجلين.';
                    break;
            }
            toast({ variant: 'destructive', title: 'فشل إنشاء الحساب', description });
        } finally {
            setIsLoading({ ...isLoading, create: false });
        }
    };

    const handleApproveDevice = async (id: string, studentName: string) => {
        setIsLoading({ ...isLoading, [id]: true });
        try {
            await approveDeviceService(id);
            toast({
                title: 'تمت الموافقة',
                description: `تمت الموافقة على الجهاز الجديد للطالب ${studentName}.`,
            });
            fetchData(); // Refetch all data
        } catch (error) {
             toast({ variant: 'destructive', title: 'فشلت الموافقة', description: 'حدث خطأ أثناء محاولة الموافقة على الجهاز.' });
        } finally {
             setIsLoading({ ...isLoading, [id]: false });
        }
    };

    const handleDeleteStudent = async (studentId: string) => {
        setIsLoading({ ...isLoading, [`delete-${studentId}`]: true });
        try {
            await deleteStudentService(studentId);
            toast({
                title: 'تم الحذف من قاعدة البيانات',
                description: `تم حذف بيانات الطالب. يجب حذف المستخدم من نظام المصادقة يدويًا من لوحة تحكم Firebase.`,
            });
            fetchData();
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: 'لم نتمكن من حذف الطالب.' });
        } finally {
            setIsLoading({ ...isLoading, [`delete-${studentId}`]: false });
        }
    };
    
    const handleDeleteDevice = async (deviceId: string) => {
         setIsLoading({ ...isLoading, [`delete-device-${deviceId}`]: true });
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
            setIsLoading({ ...isLoading, [`delete-device-${deviceId}`]: false });
        }
    };

    const handleSearchStudent = () => {
        if (!searchQuery.trim()) {
            setSearchedStudent(null);
            return;
        }
        const found = students.find(s => s.studentName.includes(searchQuery) || s.username.includes(searchQuery));
        setSearchedStudent(found || null);
    };

    const handleResetPassword = async (studentId: string, studentName: string) => {
        const newPassword = Math.random().toString(36).slice(-8); // Generate random password
        setIsLoading({ ...isLoading, [`reset-${studentId}`]: true });
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
            setIsLoading({ ...isLoading, [`reset-${studentId}`]: false });
        }
    };

    if (isLoading['page'] && !Object.keys(isLoading).some(k => k !== 'page')) {
        return <MainLayout><div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin"/></div></MainLayout>
    }

    return (
        <MainLayout>
            <div className="p-4 sm:p-6 lg:p-8">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
                        <p className="text-muted-foreground">مرحباً دكتورة دانا، هنا يمكنك إدارة الأكاديمية.</p>
                    </div>
                     <Button asChild variant="outline">
                        <Link href="/">
                            <Home className="me-2" /> العودة للرئيسية
                        </Link>
                    </Button>
                </div>

                <Tabs defaultValue="create-student">
                    <TabsList className="grid w-full grid-cols-5">
                        <TabsTrigger value="create-student"><UserPlus className="me-2" /> إنشاء حساب طالب</TabsTrigger>
                        <TabsTrigger value="student-accounts"><Users className="me-2" /> حسابات الطلاب</TabsTrigger>
                        <TabsTrigger value="approve-devices"><MonitorCheck className="me-2" /> الموافقة على الأجهزة</TabsTrigger>
                        <TabsTrigger value="registered-devices"><List className="me-2" /> الأجهزة المسجلة</TabsTrigger>
                        <TabsTrigger value="reset-password"><KeyRound className="me-2" /> إعادة تعيين كلمة المرور</TabsTrigger>
                    </TabsList>

                    <TabsContent value="create-student">
                        <Card>
                            <CardHeader>
                                <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                                <CardDescription>أدخلي بيانات الطالب والدورة لإنشاء حسابه في نظام المصادقة وقاعدة البيانات.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleCreateAccount} className="space-y-4">
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
                                        <Label htmlFor="course-select">الدورة المسجل بها</Label>
                                        <Select onValueChange={setSelectedCourse} value={selectedCourse} required>
                                            <SelectTrigger id="course-select">
                                                <SelectValue placeholder="اختاري الدورة" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {availableCourses.map(course => (
                                                    <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
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
                                <CardDescription>جميع حسابات الطلاب المسجلة في قاعدة البيانات.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>اسم الطالب</TableHead>
                                            <TableHead>اسم المستخدم</TableHead>
                                            <TableHead>كلمة المرور</TableHead>
                                            <TableHead>الدورة المسجل بها</TableHead>
                                            <TableHead>الإجراءات</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">{student.studentName}</TableCell>
                                                <TableCell>{student.username}</TableCell>
                                                <TableCell>{student.password}</TableCell>
                                                <TableCell>{student.course}</TableCell>
                                                <TableCell className="flex gap-2">
                                                  <Button variant="outline" size="icon" disabled><Edit className="w-4 h-4" /></Button>
                                                  <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                      <Button variant="destructive" size="icon" disabled={isLoading[`delete-${student.id}`]}>
                                                        {isLoading[`delete-${student.id}`] ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                                      </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                      <AlertDialogHeader>
                                                        <AlertDialogTitle>هل أنت متأكد؟</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                          هذا الإجراء سيحذف بيانات الطالب من قاعدة البيانات وجهازه المسجل. سيبقى حساب المصادقة الخاص به ويتطلب الحذف اليدوي من Firebase.
                                                        </AlertDialogDescription>
                                                      </AlertDialogHeader>
                                                      <AlertDialogFooter>
                                                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                        <AlertDialogAction onClick={() => handleDeleteStudent(student.id)}>حذف</AlertDialogAction>
                                                      </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                  </AlertDialog>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
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
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-lg">{device.studentName}</p>
                                                    <p className="text-sm text-primary">{device.course}</p>
                                                </div>
                                                <Button onClick={() => handleApproveDevice(device.id, device.studentName)} disabled={isLoading[device.id]} variant="secondary">
                                                    {isLoading[device.id] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <MonitorCheck className="me-2" />}
                                                    الموافقة على الجهاز
                                                </Button>
                                            </div>
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground border-t pt-4">
                                                <div className="flex items-center gap-2">
                                                    {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                    <span>{device.os}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    <span dir="ltr">{device.ipAddress}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Fingerprint className="w-4 h-4" />
                                                    <span className="truncate" dir="ltr">{device.deviceId}</span>
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
                            <CardContent className="space-y-4">
                                {registeredDevices.length > 0 ? (
                                    registeredDevices.map(device => (
                                       <div key={device.id} className="p-4 bg-muted/50 rounded-lg border">
                                            <div className="flex items-start justify-between">
                                                <div>
                                                    <p className="font-bold text-lg">{device.studentName}</p>
                                                    <p className="text-sm text-primary">{device.course}</p>
                                                </div>
                                                <Button onClick={() => handleDeleteDevice(device.id)} variant="destructive" size="sm" disabled={isLoading[`delete-device-${device.id}`]}>
                                                     {isLoading[`delete-device-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Trash2 className="me-2" />}
                                                    حذف الجهاز
                                                </Button>
                                            </div>
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground border-t pt-4">
                                                <div className="flex items-center gap-2">
                                                    {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                    <span>{device.os}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Globe className="w-4 h-4" />
                                                    <span dir="ltr">{device.ipAddress}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Fingerprint className="w-4 h-4" />
                                                    <span className="truncate" dir="ltr">{device.deviceId}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))
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
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="ابحثي بالاسم أو اسم المستخدم..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSearchStudent()}
                                    />
                                    <Button onClick={handleSearchStudent}><Search className="me-2"/>بحث</Button>
                                </div>
                                {searchedStudent && (
                                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg mt-4">
                                       <div>
                                           <p className="font-bold">{searchedStudent.studentName}</p>
                                           <p className="text-sm text-muted-foreground">{searchedStudent.username}</p>
                                       </div>
                                       <Button onClick={() => handleResetPassword(searchedStudent.id, searchedStudent.studentName)} disabled={isLoading[`reset-${searchedStudent.id}`]} variant="destructive">
                                          {isLoading[`reset-${searchedStudent.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <KeyRound className="me-2" />}
                                          إعادة تعيين كلمة المرور
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

