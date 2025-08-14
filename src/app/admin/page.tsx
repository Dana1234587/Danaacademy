
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { UserPlus, KeyRound, MonitorCheck, Loader2, Search, Smartphone, Monitor, Fingerprint, Globe } from 'lucide-react';
import { useState } from 'react';

// Mock Data
const pendingDevices = [
    { id: '1', studentName: 'أحمد علي', deviceId: 'a1b2-c3d4-e5f6', ipAddress: '82.114.120.50', deviceType: 'Desktop' },
    { id: '2', studentName: 'فاطمة محمد', deviceId: 'g7h8-i9j0-k1l2', ipAddress: '95.211.80.15', deviceType: 'Mobile' },
];

const students = [
    { id: 's1', studentName: 'أحمد علي', username: 'student1' },
    { id: 's2', studentName: 'فاطمة محمد', username: 'student2' },
    { id: 's3', studentName: 'خالد يوسف', username: 'student3' },
];

export default function AdminPage() {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});
    const [newStudentName, setNewStudentName] = useState('');
    const [newStudentUsername, setNewStudentUsername] = useState('');
    const [newStudentPassword, setNewStudentPassword] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchedStudent, setSearchedStudent] = useState<{id: string, studentName: string, username: string} | null>(null);

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading({ ...isLoading, create: true });
        setTimeout(() => {
            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${newStudentName}.`,
            });
            setNewStudentName('');
            setNewStudentUsername('');
            setNewStudentPassword('');
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
            // Here you would remove the item from the pending list
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
                <div className="mb-8">
                    <h1 className="text-3xl font-bold">لوحة تحكم المسؤول</h1>
                    <p className="text-muted-foreground">مرحباً دكتورة دانا، هنا يمكنك إدارة الأكاديمية.</p>
                </div>

                <Tabs defaultValue="create-student">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="create-student"><UserPlus className="me-2" /> إنشاء حساب طالب</TabsTrigger>
                        <TabsTrigger value="approve-devices"><MonitorCheck className="me-2" /> الموافقة على الأجهزة</TabsTrigger>
                        <TabsTrigger value="reset-password"><KeyRound className="me-2" /> إعادة تعيين كلمة المرور</TabsTrigger>
                    </TabsList>

                    <TabsContent value="create-student">
                        <Card>
                            <CardHeader>
                                <CardTitle>إنشاء حساب طالب جديد</CardTitle>
                                <CardDescription>أدخلي بيانات الطالب لإنشاء حسابه.</CardDescription>
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
                                    <Button type="submit" className="w-full" disabled={isLoading['create']}>
                                        {isLoading['create'] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <UserPlus className="me-2" />}
                                        إنشاء الحساب
                                    </Button>
                                </form>
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
                                            <div className="flex items-center justify-between">
                                                <p className="font-bold text-lg">{device.studentName}</p>
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
