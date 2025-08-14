
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/logo';
import Link from 'next/link';

export default function LoginPage() {
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
              <form className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email">البريد الإلكتروني أو اسم المستخدم</Label>
                  <Input id="email" type="email" placeholder="example@email.com" required className="bg-background/80" />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">كلمة المرور</Label>
                    <Link href="#" className="text-sm text-primary hover:underline">
                      هل نسيت كلمة المرور؟
                    </Link>
                  </div>
                  <Input id="password" type="password" required  className="bg-background/80" />
                </div>
                <Button type="submit" className="w-full" size="lg">
                  تسجيل الدخول
                </Button>
              </form>
               <div className="mt-6 relative">
                  <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t"></span>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-card px-2 text-muted-foreground">
                          أو
                      </span>
                  </div>
              </div>
               <div className="mt-6 text-center text-sm text-muted-foreground">
                ليس لديك حساب؟{' '}
                <Link href="#" className="font-semibold text-primary hover:underline">
                  أنشئ حسابًا جديدًا
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MarketingLayout>
  );
}
