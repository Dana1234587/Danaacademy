
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronLeft, CheckCircle, Lock, MessageCircle, Phone } from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/app-store';

const courseId = 'tawjihi-2008-second-semester';

const units = [
    {
        title: 'الوحدة الخامسة: المغناطيسية',
        topics: ['المجال المغناطيسي', 'القوة المغناطيسية', 'الحث الكهرومغناطيسي']
    },
    {
        title: 'الوحدة السادسة: التيار المتردد والدارات الإلكترونية',
        topics: ['التيار المتردد', 'المحولات الكهربائية', 'الدارات الإلكترونية']
    },
    {
        title: 'الوحدة السابعة: الفيزياء الحديثة',
        topics: ['النسبية الخاصة', 'ازدواجية الموجة والجسيم', 'نموذج بور']
    },
    {
        title: 'الوحدة الثامنة: الفيزياء النووية',
        topics: ['النشاط الإشعاعي', 'التفاعلات النووية', 'الطاقة النووية']
    }
];

export default function SecondSemesterDetailsPage() {
    const { currentUser } = useStore();
    const isEnrolled = currentUser?.enrolledCourseIds?.includes(courseId);
    const isAdmin = currentUser?.role === 'admin';

    return (
        <MarketingLayout>
            <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                {/* Header */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">فيزياء توجيهي 2008 - فصل ثاني</h1>
                        <p className="text-muted-foreground mt-2">دورة شاملة للفصل الدراسي الثاني</p>
                    </div>
                    <Button asChild variant="outline">
                        <Link href="/" className="flex items-center gap-2">
                            <ChevronLeft className="h-4 w-4" /> العودة للرئيسية
                        </Link>
                    </Button>
                </div>

                {/* Price Card */}
                <Card className="mb-8 border-primary/30 bg-gradient-to-br from-primary/5 to-primary/10">
                    <CardContent className="p-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div>
                                <h2 className="text-2xl font-bold text-primary">50.00 د.أ</h2>
                                <p className="text-muted-foreground">دفعة واحدة - وصول دائم</p>
                            </div>
                            {isEnrolled || isAdmin ? (
                                <Button asChild size="lg" className="w-full sm:w-auto">
                                    <Link href="/courses/physics-2008/physics-2008-second-semester">
                                        <CheckCircle className="me-2 h-5 w-5" />
                                        الدخول للدورة
                                    </Link>
                                </Button>
                            ) : (
                                <div className="flex flex-col gap-2 w-full sm:w-auto">
                                    <Button asChild size="lg" className="w-full bg-green-600 hover:bg-green-700">
                                        <Link href="https://wa.me/962772929152" target="_blank">
                                            <MessageCircle className="me-2 h-5 w-5" />
                                            تواصل للتسجيل عبر واتساب
                                        </Link>
                                    </Button>
                                    <p className="text-sm text-center text-muted-foreground">
                                        أو اتصل: <a href="tel:+962772929152" className="font-medium">0772929152</a>
                                    </p>
                                </div>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Course Content */}
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-primary" />
                            محتويات الدورة
                        </CardTitle>
                        <CardDescription>
                            4 وحدات تغطي الفصل الدراسي الثاني كاملاً
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {units.map((unit, index) => (
                                <div key={index} className="p-4 rounded-lg bg-muted/50">
                                    <h3 className="font-semibold text-lg mb-2">{unit.title}</h3>
                                    <ul className="space-y-1">
                                        {unit.topics.map((topic, topicIndex) => (
                                            <li key={topicIndex} className="flex items-center gap-2 text-muted-foreground">
                                                <CheckCircle className="w-4 h-4 text-green-500" />
                                                {topic}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Features */}
                <Card>
                    <CardHeader>
                        <CardTitle>مميزات الدورة</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-medium">فيديوهات شرح مفصلة</h4>
                                    <p className="text-sm text-muted-foreground">شرح واضح لكل درس بالأمثلة</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-medium">ملخصات تفاعلية</h4>
                                    <p className="text-sm text-muted-foreground">ملخص لكل حصة مع القوانين الأساسية</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-medium">اختبارات قصيرة</h4>
                                    <p className="text-sm text-muted-foreground">اختبر فهمك بعد كل درس</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <CheckCircle className="w-5 h-5 text-green-500 mt-1" />
                                <div>
                                    <h4 className="font-medium">دعم فني</h4>
                                    <p className="text-sm text-muted-foreground">تواصل مباشر للإجابة على استفساراتك</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </MarketingLayout>
    );
}
