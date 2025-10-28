
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';

export default function FoundationsPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الثاني: ديناميكا الحركة الدورانية</p>
            <h1 className="text-3xl font-bold mt-1">حصة رقم (1): حصة تأسيس</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              نضع الأساسات الرياضية والفيزيائية اللازمة لفهم وحدة الحركة الدورانية.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-2008/physics-2008-first-semester">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <WatermarkedVideoPlayer src="https://iframe.mediadelivery.net/embed/480623/f21a008d-e252-46cd-8939-83eb6fd39530?autoplay=false&loop=false&muted=false&preload=true" />
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>موارد إضافية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="me-3"/> ورقة عمل الدرس (PDF)
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
