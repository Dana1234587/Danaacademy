
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LayoutTemplate, Loader2, ChevronLeft } from 'lucide-react';
import { createExamFromTemplateAction } from '@/app/admin/exams/actions';
import { useToast } from '@/hooks/use-toast';
import Link from 'next/link';

const templates = [
    { id: 'unit1', name: 'امتحان الوحدة الأولى: الزخم الخطي والتصادمات' },
    { id: 'unit2', name: 'امتحان الوحدة الثانية: الحركة الدورانية' },
    { id: 'unit3', name: 'امتحان الوحدة الثالثة: التيار الكهربائي' },
];

export default function CreateFromTemplatePage() {
    const [isLoading, setIsLoading] = useState<string | null>(null);
    const router = useRouter();
    const { toast } = useToast();

    const handleCreate = async (templateId: string) => {
        setIsLoading(templateId);
        const result = await createExamFromTemplateAction(templateId as any);
        setIsLoading(null);

        if (result.success && result.examId) {
            toast({
                title: 'نجاح!',
                description: `تم إنشاء الامتحان من القالب بنجاح. يتم توجيهك الآن لصفحة التعديل.`,
            });
            router.push(`/admin/edit-exam/${result.examId}`);
        } else {
            toast({
                variant: 'destructive',
                title: 'فشل إنشاء الامتحان',
                description: result.error || 'حدث خطأ غير متوقع.',
            });
        }
    };

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
             <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-3xl font-bold">إنشاء امتحان من قالب</h1>
                    <p className="text-muted-foreground mt-2">
                        اختر أحد قوالب الامتحانات الجاهزة لإنشاء نسخة جديدة منه بسرعة.
                    </p>
                </div>
                <Button asChild variant="outline">
                    <Link href="/admin/exams">
                        <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الامتحانات
                    </Link>
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>قوالب الامتحانات المتاحة</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {templates.map((template) => (
                        <div key={template.id} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center gap-3">
                                <LayoutTemplate className="w-5 h-5 text-primary" />
                                <span className="font-medium">{template.name}</span>
                            </div>
                            <Button onClick={() => handleCreate(template.id)} disabled={!!isLoading}>
                                {isLoading === template.id ? (
                                    <Loader2 className="me-2 h-4 w-4 animate-spin" />
                                ) : null}
                                إنشاء الامتحان
                            </Button>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
    );
}
