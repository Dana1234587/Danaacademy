

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
import { registerDevice } from '@/ai/flows/register-device';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useStore } from '@/store/app-store';
import { doc, getDoc } from 'firebase/firestore';
import UAParser from 'ua-parser-js';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

const getDeviceId = async (): Promise<string> => {
  const fp = await FingerprintJS.load();
  const result = await fp.get();
  return result.visitorId;
};

const getDeviceInfo = () => {
  const parser = new UAParser();
  const result = parser.getResult();

  return {
    ua: result.ua,
    os: result.os.name,
    osVersion: result.os.version,
    browser: result.browser.name,
    browserVersion: result.browser.version,
    deviceType: result.device.type || 'desktop',
    deviceVendor: result.device.vendor,
    deviceModel: result.device.model,
  };
}

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { setCurrentUser } = useStore((state) => ({ setCurrentUser: state.setCurrentUser }));

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const isAdminLogin = username.includes('@');
    const email = isAdminLogin ? username : `${username}@dana-academy.com`;

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (isAdminLogin) {
        const adminDocRef = doc(db, 'admins', user.uid);
        const adminDocSnap = await getDoc(adminDocRef);

        if (adminDocSnap.exists()) {
          // Manually set the user in state to ensure immediate UI update
          setCurrentUser({
            uid: user.uid,
            username: 'Admin',
            email: user.email || '',
            role: 'admin',
            enrolledCourseIds: [
              'tawjihi-2007-supplementary',
              'tawjihi-2008-first-semester',
              'tawjihi-2008-foundation',
              'tawjihi-2008-palestine',
              'astrophysics',
              'physics-101'
            ]
          });

          toast({
            title: 'أهلاً بعودتك دكتورة دانا',
            description: 'يتم توجيهك إلى الصفحة الرئيسية.',
          });
          router.push('/');
        } else {
          toast({
            variant: 'destructive',
            title: 'فشل تسجيل الدخول',
            description: 'بيانات الاعتماد للمسؤول غير صحيحة.',
          });
          await auth.signOut();
        }
      } else {
        const studentDocRef = doc(db, 'students', user.uid);
        const studentDocSnap = await getDoc(studentDocRef);
        const student = studentDocSnap.data();

        if (!student) {
          toast({
            variant: 'destructive',
            title: 'فشل تسجيل الدخول',
            description: 'بيانات الطالب غير موجودة في قاعدة البيانات.',
          });
          await auth.signOut();
          setIsLoading(false);
          return;
        }

        const deviceId = await getDeviceId();
        const deviceInfo = getDeviceInfo();

        const registrationInput = {
          studentId: user.uid,
          studentName: student.studentName,
          deviceId: deviceId,
          deviceInfo: deviceInfo,
          courses: student.courses,
        };

        const result = await registerDevice(registrationInput);

        if (result.status === 'registered' || result.status === 'already-exists') {
          router.push('/');
        } else if (result.status === 'pending') {
          toast({
            variant: 'destructive',
            title: 'جهاز جديد مكتشف',
            description: result.message,
            duration: 5000,
          });
          await auth.signOut();
        } else {
          toast({
            variant: 'destructive',
            title: 'حدث خطأ',
            description: result.message,
            duration: 5000,
          });
          await auth.signOut();
        }
      }
    } catch (error: any) {
      let description = 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.';
      if (error.code === 'auth/invalid-credential') {
        description = 'بيانات الاعتماد التي أدخلتها غير صالحة. يرجى التحقق من اسم المستخدم وكلمة المرور.';
      } else if (error.message) {
        description = error.message;
      }
      toast({
        variant: 'destructive',
        title: 'فشل تسجيل الدخول',
        description: description,
        duration: 9000,
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
                    placeholder="example@domain.com or student_username"
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
