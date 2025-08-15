
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
import type { RegisterDeviceInput } from '@/ai/flows/register-device.types';
import { auth, db } from '@/lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useStore } from '@/store/app-store';
import { doc, getDoc } from 'firebase/firestore';


// This function now generates a stable device ID and stores it in localStorage.
const getDeviceId = (): string => {
  const DANA_ACADEMY_DEVICE_ID = 'DANA_ACADEMY_DEVICE_ID';
  let deviceId = localStorage.getItem(DANA_ACADEMY_DEVICE_ID);

  if (!deviceId) {
    // A more robust device ID generation
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    let renderer = '';
    if (gl && 'getParameter' in gl && 'RENDERER' in gl) {
        renderer = gl.getParameter(gl.RENDERER);
    }
    
    const userAgent = navigator.userAgent;
    const platform = navigator.platform;
    const random = Math.random().toString(36).substring(2);
    
    deviceId = `${userAgent}-${platform}-${renderer}-${random}`;
    // Simple hash function to shorten it and make it less identifiable
    let hash = 0;
    for (let i = 0; i < deviceId.length; i++) {
        const char = deviceId.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    
    deviceId = `dana-device-${hash.toString(16)}`;
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
            // It's an admin login attempt
            const adminDocRef = doc(db, 'admins', user.uid);
            const adminDocSnap = await getDoc(adminDocRef);

            if (adminDocSnap.exists()) {
                toast({
                    title: 'أهلاً بعودتك دكتورة دانا',
                    description: 'يتم توجيهك إلى لوحة التحكم.',
                });
                // The onAuthStateChanged listener in app-store will handle setting the user.
                router.push('/admin');
            } else {
                 toast({
                    variant: 'destructive',
                    title: 'فشل تسجيل الدخول',
                    description: 'بيانات الاعتماد للمسؤول غير صحيحة.',
                });
                await auth.signOut();
            }
        } else {
             // It's a student login attempt
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

            const deviceId = getDeviceId();
            const os = getOS();
            
            const redirectToCoursePage = () => {
                let coursePath = '/';
                if (student.courseIds?.includes('tawjihi-2007-supplementary')) {
                    coursePath = '/courses/physics-supplementary-2007';
                } else if (student.courseIds?.includes('tawjihi-2008')) {
                    coursePath = '/courses/physics-2008';
                }
                router.push(coursePath);
            };

            const registrationInput: RegisterDeviceInput = {
                studentId: user.uid,
                studentName: student.studentName,
                deviceId: deviceId,
                os: os,
                deviceType: os === 'Android' || os === 'iOS' ? 'Mobile' : 'Desktop',
                courses: student.courses,
                ipAddress: 'Fetching...'
            };
            
            const result = await registerDevice(registrationInput);
            
            if (result.status === 'registered' || result.status === 'already-exists') {
                 redirectToCoursePage();
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
