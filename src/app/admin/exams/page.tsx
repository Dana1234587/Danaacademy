
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Home } from 'lucide-react';
import Link from 'next/link';

export default function ExamsPage() {
  return (
    <MarketingLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
            <p className="text-muted-foreground mt-2">
              من هنا يمكنك إنشاء اختبارات جديدة، عرض نتائج الاختبارات السابقة، وإدارتها.
            </p>
          </div>
          <div className="flex gap-2">
             <Button asChild variant="outline">
                <Link href="/">
                    <Home className="me-2 h-4 w-4" />
                    العودة للرئيسية
                </Link>
             </Button>
             <Button asChild>
                <Link href="/admin/create-exam">
                    <Plus className="me-2 h-4 w-4" /> إنشاء امتحان جديد
                </Link>
            </Button>
          </div>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>الاختبارات الحالية</CardTitle>
            <CardDescription>قائمة بجميع الاختبارات التي تم إنشاؤها.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
                <p>لا توجد اختبارات حاليًا.</p>
                <p>انقر على "إنشاء امتحان جديد" للبدء.</p>
            </div>
          </CardContent>
        </Card>
        
      </div>
    </MarketingLayout>
  );
}
