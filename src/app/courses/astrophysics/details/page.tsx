
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, BookOpen } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailsPage() {

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">تفاصيل دورة الفيزياء للثاني عشر علمي وتكنولوجي - الفصل الأول</h1>
                <p className="text-muted-foreground mt-2">كل ما تحتاج لمعرفته عن دورة الفصل الأول للمنهاج القطري.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                     العودة للرئيسية <ArrowRight className="h-4 w-4" />
                </Link>
            </Button>
        </div>

        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-primary" />
                    محتويات الدورة
                </CardTitle>
                <CardDescription>
                    هذه هي الموضوعات التي سيتم تغطيتها في الدورة.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <p>محتوى تفصيلي لدورة الفيزياء للمنهاج القطري سيتم إضافته هنا قريبًا.</p>
            </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
