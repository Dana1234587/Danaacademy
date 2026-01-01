
'use client';

import { useStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lock, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const courseId = 'tawjihi-2007-supplementary';

export default function ProtectedCourseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { currentUser, isLoading } = useStore((state) => ({
    currentUser: state.currentUser,
    isLoading: state.isLoading
  }));

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader2 className="h-16 w-16 animate-spin" />
      </div>
    );
  }

  // Admin has full access to all courses
  // Students need to be enrolled in the specific course
  const isAdmin = currentUser?.role === 'admin';
  const isEnrolledStudent = currentUser?.role === 'student' && currentUser.enrolledCourseIds?.includes(courseId);
  const isAuthorized = isAdmin || isEnrolledStudent;

  if (!isAuthorized) {
    return (
      <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center mt-16">
        <Card className="max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="flex items-center justify-center gap-2">
              <Lock className="w-8 h-8 text-destructive" />
              <span>محتوى مقيد</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg text-muted-foreground">
              عذرًا، ليس لديك الصلاحية للوصول إلى محتوى هذه الدورة.
            </p>
            <p className="mt-2 text-sm">
              يرجى التأكد من تسجيلك في دورة "فيزياء التكميلي - جيل 2007".
            </p>
            <Button asChild className="mt-6">
              <Link href="/">العودة إلى الصفحة الرئيسية</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return <>{children}</>;
}
