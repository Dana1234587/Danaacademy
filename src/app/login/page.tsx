
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useStore } from '@/store/app-store';
import { findStudentByUsername } from '@/services/studentService';
import { findRegisteredDeviceByStudentId, addPendingDevice, registerDevice } from '@/services/deviceService';

// This is a simplified device ID generator. A real-world app should use a more robust
// fingerprinting library like FingerprintJS.
const getDeviceId = () => {
  const userAgent = navigator.userAgent;
  const platform = navigator.platform;
  const random = Math.random().toString(36).substring(2);
  return `${userAgent}-${platform}-${random}`;
};

const getOS = () => {
    const userAgent = window.navigator.userAgent;
    if (userAgent.indexOf("Win") != -1) return "Windows";
    if (userAgent.indexOf("Mac") != -1) return "macOS";
    if (userAgent.indexOf("Linux") != -1) return "Linux";
    if (userAgent.indexOf("Android") != -1) return "Android";
    if (userAgent.indexOf("like Mac") != -1) return "iOS";
    return "Unknown";
}


export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const setCurrentUser = useStore((state) => state.setCurrentUser);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        // --- Admin Login ---
        if (username === 'admin' && password === 'password') {
            toast({
              title: 'أهلاً بعودتك دكتورة دانا',
              description: 'يتم توجيهك إلى لوحة التحكم.',
            });
            setCurrentUser({ username: 'admin', role: 'admin', enrolledCourseIds: ['tawjihi-2007-supplementary', 'tawjihi-2008'] });
            router.push('/admin');
            return;
        }

        // --- Student Login ---
        const student = await findStudentByUsername(username);
        
        if (student && student.password === password) {
            const deviceId = getDeviceId();
            const os = getOS();
            const registeredDevice = await findRegisteredDeviceByStudentId(student.id);

            if (!registeredDevice) {
                // First time login for this student, approve device automatically
                await registerDevice({
                    studentId: student.id,
                    studentName: student.studentName,
                    deviceId: deviceId,
                    ipAddress: '192.168.1.1', // Mock IP
                    deviceType: os === 'Android' || os === 'iOS' ? 'Mobile' : 'Desktop',
                    os: os,
                    course: student.course,
                });
                
                toast({
                  title: `أهلاً بك ${student.studentName}`,
                  description: 'تم تسجيل دخولك وتسجيل هذا الجهاز بنجاح.',
                });
                setCurrentUser({ username: student.username, role: 'student', enrolledCourseIds: [student.courseId] });
                router.push('/physics');

            } else if (registeredDevice.deviceId === deviceId) {
                 // A more robust check might be needed in a real app
                 toast({
                  title: `أهلاً بك مجددًا ${student.studentName}`,
                  description: 'تم تسجيل دخولك بنجاح.',
                });
                setCurrentUser({ username: student.username, role: 'student', enrolledCourseIds: [student.courseId] });
                router.push('/physics');
            } else {
                // New device detected, add to pending and show message
                await addPendingDevice({
                     studentId: student.id,
                     studentName: student.studentName,
                     deviceId: deviceId,
                     ipAddress: '82.114.120.50', // Mock IP
                     deviceType: os === 'Android' || os === 'iOS' ? 'Mobile' : 'Desktop',
                     os: os,
                     course: student.course,
                });
                toast({
                  variant: 'destructive',
                  title: 'جهاز جديد مكتشف',
                  description: 'تم ربط هذا الحساب بجهاز آخر. تم إرسال طلب للموافقة على هذا الجهاز.',
                  duration: 5000,
                });
            }
        } else {
            toast({
              variant: 'destructive',
              title: 'فشل تسجيل الدخول',
              description: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
            });
        }
    } catch (error) {
         toast({
              variant: 'destructive',
              title: 'حدث خطأ',
              description: 'حدث خطأ غير متوقع أثناء تسجيل الدخول.',
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <MarketingLayout>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-muted min-h-[calc(100vh-19rem)]">
        <div className="w-full max-w-md space-y-8">
          <Card className="shadow-2xl">
            <CardHeader className="text-center">
              <Link href="/" className="inline-block">
                <Logo className="h-20 w-auto mx-auto mb-4" />
              </Link>
              <CardTitle className="text-3xl font-bold text-primary">تسجيل الدخول</CardTitle>
              <CardDescription>
                أدخل بياناتك للدخول إلى حسابك في الأكاديمية
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleLogin}>
                <div className="space-y-2">
                  <Label htmlFor="username">اسم المستخدم</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="اسم المستخدم الخاص بك" 
                    required 
                    className="bg-background/80" 
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <span className="text-sm text-muted-foreground">
                      هل نسيت كلمة المرور؟ تواصل معنا
                    </span>
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    required  
                    className="bg-background/80" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Loader2 className="me-2 h-4 w-4 animate-spin" />
                      جاري التحقق...
                    </>
                  ) : (
                    'تسجيل الدخول'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}
