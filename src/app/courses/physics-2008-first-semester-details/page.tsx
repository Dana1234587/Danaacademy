
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function CourseDetailsPage() {

  return (
    <MarketingLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold">تفاصيل دورة فيزياء التوجيهي - جيل 2008 (الفصل الأول)</h1>
                <p className="text-muted-foreground mt-2">كل ما تحتاج لمعرفته عن دورة الفصل الأول.</p>
            </div>
            <Button asChild variant="outline">
                <Link href="/" className="flex items-center gap-2">
                     <ChevronLeft className="h-4 w-4" /> العودة للرئيسية 
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
                <p>محتوى تفصيلي لدورة فيزياء توجيهي 2008 (فصل أول) سيتم إضافته هنا قريبًا.</p>
            </CardContent>
        </Card>
      </div>
    </MarketingLayout>
  );
}
