
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, Award } from 'lucide-react';
import Link from 'next/link';

export default function EnrichmentPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الوحدة السابعة: الفيزياء النووية</p>
            <h1 className="text-3xl font-bold mt-1 flex items-center gap-3">
                <Award className="w-8 h-8 text-yellow-500" />
                الإثراء والتوسع
            </h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              مواضيع متقدمة ومواد إضافية لتعميق فهمك وتوسيع آفاقك.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-8">
            <Card>
                <CardHeader>
                    <CardTitle>مواضيع متقدمة</CardTitle>
                    <CardDescription>سيتم إضافة محتوى إثرائي هنا قريبًا.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground p-8">
                        <p>قيد التحضير...</p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
