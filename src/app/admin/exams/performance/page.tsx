

'use client';

import React from 'react';
import { AdminPerformance } from '@/components/admin/admin-performance';
import { Button } from '@/components/ui/button';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';

export default function PerformancePage() {
    return (
        <div className="p-4 sm:p-6 lg:p-8">
             <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <div>
                    <h1 className="text-3xl font-bold">تحليلات الأداء</h1>
                    <p className="text-muted-foreground mt-2">
                        عرض وتحليل أداء الطلاب في الامتحانات حسب الدورة.
                    </p>
                </div>
                 <Button asChild variant="outline">
                    <Link href="/admin/exams">
                        <ChevronLeft className="me-2 h-4 w-4" />
                        العودة إلى إدارة الامتحانات
                    </Link>
                </Button>
            </div>
            <AdminPerformance />
        </div>
    );
}
