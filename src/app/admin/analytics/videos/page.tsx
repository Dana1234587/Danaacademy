
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart2 } from 'lucide-react';

export default function VideoAnalyticsPage() {
  return (
      <div className="p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold flex items-center gap-3">
                <BarChart2 className="w-8 h-8 text-primary"/>
                تحليلات تفاعل الطلاب
            </h1>
            <p className="mt-2 text-muted-foreground">
                هنا يمكنك عرض تحليلات تفصيلية لتفاعل الطلاب مع الفيديوهات التعليمية.
            </p>
          </div>
          <Card>
              <CardHeader>
                  <CardTitle>خريطة التفاعل الحرارية للفيديوهات</CardTitle>
                  <CardDescription>سيتم عرض بيانات تفاعل الطلاب مع الفيديوهات هنا قريبًا.</CardDescription>
              </CardHeader>
              <CardContent>
                  <p className="text-muted-foreground text-center py-12">قيد التطوير...</p>
              </CardContent>
          </Card>
      </div>
  );
}
