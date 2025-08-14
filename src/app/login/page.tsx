
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
import { findStudentByUsername } from '@/services/studentService';
import { findRegisteredDevicesByStudentId, addPendingDevice } from '@/services/deviceService';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';

// This function now generates a stable device ID and stores it in localStorage.
const getDeviceId = (): string => {
  const DANA_ACADEMY_DEVICE_ID = 'DANA_ACADEMY_DEVICE_ID';
  let deviceId = localStorage.getItem(DANA_ACADEMY_DEVICE_ID);

  if (!deviceId) {
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const random = Math.random().toString(36).substring(2);
    deviceId = `${userAgent}-${platform}-${random}`;
    localStorage.setItem(DANA_ACADEMY_DEVICE_ID, deviceId);
  }

  return deviceId;
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

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
        // Handle admin and student login differently.
        const isAdminLogin = username.startsWith('admin');
        const email = isAdminLogin ? username : `${username}@dana-academy.com`;

        // --- Admin & Student Login via Firebase Auth ---
        await signInWithEmailAndPassword(auth, email, password);
        const user = auth.currentUser; // Get the currently signed-in user

        if (user && user.email) {
             // --- Admin Login Logic ---
             if (user.email.startsWith('admin')) {
                toast({
                  title: 'أهلاً بعودتك دكتورة دانا',
                  description: 'يتم توجيهك إلى لوحة التحكم.',
                });
                router.push('/admin');
                return; // Important: Exit after admin login
            }
            
            // --- Student Login Logic ---
            const studentUsername = user.email.split('@')[0];
            const student = await findStudentByUsername(studentUsername);

            if (!student) {
                toast({
                    variant: 'destructive',
                    title: 'فشل تسجيل الدخول',
                    description: 'بيانات الطالب غير موجودة في قاعدة البيانات.',
                });
                await auth.signOut(); // Sign out the user if their data isn't in firestore
                setIsLoading(false);
                return;
            }

            const deviceId = getDeviceId();
            const os = getOS();
            const registeredDevices = await findRegisteredDevicesByStudentId(student.id);
            
            const redirectToCoursePage = () => {
                let coursePath = '/'; // Default fallback
                if (student.courseId === 'tawjihi-2007-supplementary') {
                    coursePath = '/courses/physics-supplementary-2007';
                } else if (student.courseId === 'tawjihi-2008') {
                    coursePath = '/courses/physics-2008';
                }
                router.push(coursePath);
            };

            const isDeviceRegistered = registeredDevices.some(device => device.deviceId === deviceId);

            if (registeredDevices.length === 0) {
                // First time login for this student, send for approval.
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
                  description: 'هذا هو أول جهاز لك. تم إرسال طلب للموافقة عليه.',
                  duration: 5000,
                });
                await auth.signOut();

            } else if (isDeviceRegistered) {
                 // Device is already in the approved list
                 toast({
                  title: `أهلاً بك مجددًا ${student.studentName}`,
                  description: 'تم تسجيل دخولك بنجاح.',
                });
                redirectToCoursePage();
            } else {
                // New device detected for a student who already has other registered devices
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
                  description: 'تم ربط هذا الحساب بأجهزة أخرى. تم إرسال طلب للموافقة على هذا الجهاز.',
                  duration: 5000,
                });
                await auth.signOut(); // Sign out until the new device is approved
            }
        }
    } catch (error) {
         toast({
              variant: 'destructive',
              title: 'فشل تسجيل الدخول',
              description: 'اسم المستخدم أو كلمة المرور غير صحيحة.',
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
                  <Label htmlFor="username">اسم المستخدم أو البريد الإلكتروني</Label>
                  <Input 
                    id="username" 
                    type="text" 
                    placeholder="admin@dana-academy.com" 
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
