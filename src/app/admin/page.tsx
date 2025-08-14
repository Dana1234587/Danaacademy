
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe, List, Home, Book, Users } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';


// Mock Data
const pendingDevices = [
    { id: '1', studentName: 'أحمد علي', deviceId: 'a1b2-c3d4-e5f6', ipAddress: '82.114.120.50', deviceType: 'Desktop', course: 'فيزياء تكميلي 2007' },
    { id: '2', studentName: 'فاطمة محمد', deviceId: 'g7h8-i9j0-k1l2', ipAddress: '95.211.80.15', deviceType: 'Mobile', course: 'فيزياء توجيهي 2008' },
];

const registeredDevices = [
    { id: 'd1', studentName: 'خالد يوسف', deviceId: 'z9y8-x7w6-v5u4', ipAddress: '192.168.1.10', deviceType: 'Desktop', course: 'فيزياء توجيهي 2008' },
    { id: 'd2', studentName: 'سارة عبدالله', deviceId: 't3s2-r1q0-p9o8', ipAddress: '10.0.0.5', deviceType: 'Mobile', course: 'فيزياء تكميلي 2007' },
];

const students = [
    { id: 's1', studentName: 'أحمد علي', username: 'ahmad.ali', course: 'فيزياء تكميلي 2007' },
    { id: 's2', studentName: 'فاطمة محمد', username: 'fatima.mohd', course: 'فيزياء توجيهي 2008' },
    { id: 's3', studentName: 'خالد يوسف', username: 'khaled.yousef', course: 'فيزياء توجيهي 2008' },
];

const availableCourses = [
    { id: 'physics-supplementary-2007', name: 'فيزياء تكميلي 2007' },
    { id: 'physics-2008', name: 'فيزياء توجيهي 2008' },
];


export default function AdminPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentUsername, setNewStudentUsername] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [selectedCourse, setSelectedCourse] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStudent, setSearchedStudent] = useState<{id: string, studentName: string, username: string} | null>(null);

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading({ ...isLoading, create: true });
        setTimeout(() => {
            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${newStudentName} في دورة ${availableCourses.find(c => c.id === selectedCourse)?.name}.`,
            });
            // Here you would add the new student to the students list
            setNewStudentName('');
            setNewStudentUsername('');
            setNewStudentPassword('');
            setSelectedCourse('');
            setIsLoading({ ...isLoading, create: false });
        }, 1000);
    };

    const handleApproveDevice = (id: string, name: string) => {
        setIsLoading({ ...isLoading, [id]: true });
        setTimeout(() => {
            toast({
                title: 'تمت الموافقة',
                description: `تمت الموافقة على الجهاز الجديد للطالب ${name}.`,
            });
            // Here you would remove the item from the pending list and add to registered
            setIsLoading({ ...isLoading, [id]: false });
        }, 1000);
    };
    
    const handleSearchStudent = () => {
        const found = students.find(s => s.studentName.includes(searchQuery) || s.username.includes(searchQuery));
        setSearchedStudent(found || null);
    };

    const handleResetPassword = (name: string) => {
        setIsLoading({ ...isLoading, reset: true });
        setTimeout(() => {
             toast({
                title: 'تم إعادة تعيين كلمة المرور',
                description: `كلمة المرور الجديدة للطالب ${name} هي "newpass123".`,
            });
            setIsLoading({ ...isLoading, reset: false });
        }, 1000);
    };


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
                                <CardDescription>أدخلي بيانات الطالب والدورة لإنشاء حسابه.</CardDescription>
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
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="student-password">كلمة المرور</Label>
                                        <Input id="student-password" type="password" value={newStudentPassword} onChange={(e) => setNewStudentPassword(e.target.value)} placeholder="••••••••" required />
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
                                <CardDescription>جميع حسابات الطلاب المسجلة في النظام.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>اسم الطالب</TableHead>
                                            <TableHead>اسم المستخدم</TableHead>
                                            <TableHead>الدورة المسجل بها</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {students.map((student) => (
                                            <TableRow key={student.id}>
                                                <TableCell className="font-medium">{student.studentName}</TableCell>
                                                <TableCell>{student.username}</TableCell>
                                                <TableCell>{student.course}</TableCell>
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
                                                    <span>{device.deviceType === 'Desktop' ? 'جهاز مكتبي' : 'هاتف محمول'}</span>
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
                                            </div>
                                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-muted-foreground border-t pt-4">
                                                <div className="flex items-center gap-2">
                                                    {device.deviceType === 'Desktop' ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                                    <span>{device.deviceType === 'Desktop' ? 'جهاز مكتبي' : 'هاتف محمول'}</span>
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
                                <CardTitle>استعادة كلمة المرور</CardTitle>
                                <CardDescription>ابحثي عن الطالب لإعادة تعيين كلمة المرور الخاصة به.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex gap-2">
                                    <Input 
                                        placeholder="ابحثي بالاسم أو اسم المستخدم..." 
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                    <Button onClick={handleSearchStudent}><Search className="me-2"/>بحث</Button>
                                </div>
                                {searchedStudent && (
                                    <div className="flex items-center justify-between p-4 bg-muted rounded-lg mt-4">
                                       <div>
                                           <p className="font-bold">{searchedStudent.studentName}</p>
                                           <p className="text-sm text-muted-foreground">{searchedStudent.username}</p>
                                       </div>
                                       <Button onClick={() => handleResetPassword(searchedStudent.studentName)} disabled={isLoading['reset']} variant="destructive">
                                          {isLoading['reset'] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <KeyRound className="me-2" />}
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
