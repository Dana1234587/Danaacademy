
'use client';

import { useStore } from '@/store/app-store';
import { MainLayout } from '@/components/layout/main-layout';
import { Loader2, Home, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';


const courseLessons = [
    {
        title: 'حصة رقم (1): النظام الدولي للوحدات',
        path: '/courses/physics-2008-foundation/1-international-system-of-units'
    }
    // More lessons will be added here
];

export default function FoundationCoursePage() {
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
      <div className="p-4 sm:p-6 lg:p-8 container mx-auto">
        <div className="bg-primary/5 p-6 md:p-8 rounded-xl border border-primary/10 shadow-sm mb-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex-1">
                <h1 className="text-2xl md:text-4xl font-bold text-primary">
                    {welcomeMessage} في دورة التأسيس لجيل 2008
                </h1>
                <p className="mt-2 text-base md:text-lg text-muted-foreground">
                    هنا سنبني معًا أساسًا قويًا في الفيزياء لننطلق منه نحو التميز في التوجيهي.
                </p>
                </div>
                <Button asChild variant="outline" className="flex-shrink-0">
                    <Link href="/" className="flex items-center gap-2">
                        <Home className="h-4 w-4" />
                        العودة للرئيسية
                    </Link>
                </Button>
            </div>
        </div>

        <div className="space-y-4">
            {courseLessons.map((lesson, index) => (
                 <Card key={index} className="hover:shadow-md hover:border-primary/30 transition-all">
                    <CardContent className="p-0">
                         <Link href={lesson.path} className="flex items-center gap-4 p-4">
                             <div className="bg-primary/10 text-primary p-3 rounded-full">
                                 <FileText className="w-6 h-6" />
                             </div>
                             <span className="text-lg font-semibold text-foreground">{lesson.title}</span>
                         </Link>
                    </CardContent>
                 </Card>
            ))}

            <Card className="border-dashed">
                <CardContent className="p-6 text-center text-muted-foreground">
                    <p>سيتم إضافة المزيد من الحصص قريبًا...</p>
                </CardContent>
            </Card>
        </div>

      </div>
    </MainLayout>
  );
}
