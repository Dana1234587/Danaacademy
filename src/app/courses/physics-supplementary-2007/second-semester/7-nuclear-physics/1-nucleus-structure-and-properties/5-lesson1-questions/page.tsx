
'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronLeft, FileText, BarChart, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

export default function Lesson1QuestionsPage() {
  return (
    <div className="min-h-screen bg-muted/40">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <p className="text-sm text-primary font-medium">الدرس الأول: تركيب النواة وخصائصها</p>
            <h1 className="text-3xl font-bold mt-1">حل أسئلة الدرس الأول</h1>
            <p className="text-muted-foreground mt-2 max-w-2xl">
              في هذه الحصة، نقوم بحل أسئلة متنوعة على الدرس الأول من وحدة الفيزياء النووية.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/courses/physics-supplementary-2007">
              <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Placeholder for video */}
            <div className="relative w-full rounded-lg overflow-hidden shadow-lg bg-slate-200" style={{ paddingTop: '56.25%' }}>
                <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                    <p className="text-muted-foreground">سيتم إضافة الفيديو قريبًا</p>
                </div>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle>نقاط رئيسية من الحصة</CardTitle>
                    <CardDescription>أهم الأفكار والقوانين التي سيتم تغطيتها في هذا الفيديو.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-3 list-disc list-inside text-muted-foreground">
                        <li>حل مسائل على خصائص النواة.</li>
                        <li>حل مسائل على طاقة الربط النووية.</li>
                        <li>مراجعة شاملة لمفاهيم الدرس الأول.</li>
                    </ul>
                </CardContent>
            </Card>
          </div>

          {/* Sidebar: Related Content */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>موارد إضافية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="ghost" className="w-full justify-start">
                  <FileText className="me-3"/> ورقة عمل الدرس (PDF)
                </Button>
                <Button variant="ghost" className="w-full justify-start">
                  <BarChart className="me-3"/> ملخص القوانين
                </Button>
                 <Button variant="ghost" className="w-full justify-start">
                  <BrainCircuit className="me-3"/> اختبار قصير للمراجعة
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
