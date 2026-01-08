'use client';

import { useStore } from '@/store/app-store';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface SubscriptionGuardProps {
    courseId: string;
    children: React.ReactNode;
}

/**
 * مكوّن للتحقق من صلاحية الطالب للوصول للكورس
 * إذا الطالب محظور عن الكورس، يظهر رسالة "انتهت صلاحية التسجيل"
 */
export function SubscriptionGuard({ courseId, children }: SubscriptionGuardProps) {
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));

    // إذا مفيش مستخدم أو المستخدم admin، نعرض المحتوى
    if (!currentUser || currentUser.role === 'admin') {
        return <>{children}</>;
    }

    // تحقق من قائمة الكورسات المحظورة
    const blockedCourses = currentUser.blockedCourses || [];
    const isBlocked = blockedCourses.includes(courseId);

    if (isBlocked) {
        return (
            <div className="min-h-[60vh] flex items-center justify-center p-4">
                <Card className="max-w-md w-full border-destructive/50 bg-destructive/5">
                    <CardContent className="pt-6">
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center">
                                <Lock className="w-8 h-8 text-destructive" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-destructive mb-2">
                                    انتهت صلاحية التسجيل
                                </h2>
                                <p className="text-muted-foreground">
                                    عذراً، انتهت صلاحية تسجيلك في هذه الدورة.
                                    للتجديد أو الاستفسار، تواصل معنا.
                                </p>
                            </div>
                            <div className="flex flex-col gap-2">
                                <Button asChild>
                                    <Link href="/">
                                        العودة للصفحة الرئيسية
                                    </Link>
                                </Button>
                                <Button variant="outline" asChild>
                                    <a href="https://wa.me/+962XXXXXXXXX" target="_blank" rel="noopener noreferrer">
                                        تواصل معنا
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return <>{children}</>;
}
