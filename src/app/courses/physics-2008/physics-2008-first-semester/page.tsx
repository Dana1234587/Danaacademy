

'use client';

import { useStore } from '@/store/app-store';
import { MainLayout } from '@/components/layout/main-layout';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Physics2008FirstSemesterPage() {
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

  const welcomeMessage = currentUser?.gender === 'female'
    ? `مرحبًا بكِ يا ${currentUser?.username || 'طالبتنا العزيزة'}`
    : `مرحبًا بك يا ${currentUser?.username || 'طالبنا العزيز'}`;

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">
                {welcomeMessage} في دورة فيزياء - جيل 2008 (الفصل الأول)
            </h1>
            <Button asChild variant="outline">
                <Link href="/">
                    العودة للرئيسية
                </Link>
            </Button>
        </div>
        <p className="mt-4 text-muted-foreground">
          سيتم إضافة محتوى الدورة هنا قريبًا. نتمنى لك رحلة تعليمية ممتعة ومفيدة!
        </p>
      </div>
    </MainLayout>
  );
}
