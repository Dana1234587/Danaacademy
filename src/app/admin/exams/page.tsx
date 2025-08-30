
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import Link from 'next/link';

export default function ExamsPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إدارة الاختبارات</h1>
            <p className="text-muted-foreground mt-2">
              من هنا يمكنك إنشاء اختبارات جديدة، عرض نتائج الاختبارات السابقة، وإدارتها.
            </p>
          </div>
           <Button asChild>
              <Link href="/admin/create-exam">
                <Plus className="me-2 h-4 w-4" /> إنشاء امتحان جديد
              </Link>
          </Button>
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
    </MainLayout>
  );
}
