
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Loader2 } from 'lucide-react';

const courseId = 'tawjihi-2008';

export default function Physics2008Page() {
  const { currentUser, isLoading } = useStore((state) => ({ 
    currentUser: state.currentUser,
    isLoading: state.isLoading 
  }));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const isAuthorized = currentUser?.role === 'admin' || (currentUser?.role === 'student' && currentUser.enrolledCourseIds.includes(courseId));

  if (!isAuthorized) {
    return (
        <MainLayout>
            <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center">
                <Card className="max-w-md mx-auto mt-10">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Lock className="w-8 h-8 text-destructive" />
                            <span>محتوى مقيد</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">
                            عذرًا، ليس لديك الصلاحية للوصول إلى هذه الدورة.
                        </p>
                        <p className="mt-2 text-sm">
                            يرجى التأكد من تسجيلك في دورة "فيزياء توجيهي - جيل 2008".
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/">العودة إلى الصفحة الرئيسية</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
                مرحبًا بك يا {currentUser?.username || 'طالبنا العزيز'} في دورة فيزياء - جيل 2008
            </h1>
            <Button asChild variant="outline">
                <Link href="/">
                    العودة للرئيسية
                </Link>
            </Button>
        </div>
        <p className="mt-4 text-muted-foreground">
          استخدم القائمة الجانبية للتنقل بين وحدات ودروس الدورة. نتمنى لك رحلة تعليمية ممتعة ومفيدة!
        </p>
      </div>
    </MainLayout>
  );
}
