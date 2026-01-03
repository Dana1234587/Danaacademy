'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, Clock, Activity, UserCheck } from 'lucide-react';
import Link from 'next/link';

interface StudentActivity {
    id: string;
    studentName: string;
    username: string;
    email: string;
    lastLoginAt: string | null;
    lastActivityAt: string | null;
    loginCount: number;
    totalTimeSpent: number;
}

function formatTimeAgo(dateString: string | null): string {
    if (!dateString) return 'لم يسجل دخول بعد';

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMinutes < 5) return 'الآن 🟢';
    if (diffMinutes < 60) return `منذ ${diffMinutes} دقيقة`;
    if (diffHours < 24) return `منذ ${diffHours} ساعة`;
    if (diffDays < 7) return `منذ ${diffDays} يوم`;
    return date.toLocaleDateString('ar-JO');
}

function isOnline(lastActivityAt: string | null): boolean {
    if (!lastActivityAt) return false;
    const date = new Date(lastActivityAt);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    return diffMinutes < 5;
}

function formatDuration(seconds: number): string {
    if (!seconds) return '0 دقيقة';
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    if (hours > 0) {
        return `${hours} ساعة ${minutes > 0 ? `و ${minutes} دقيقة` : ''}`;
    }
    return `${minutes} دقيقة`;
}

export default function StudentsActivityPage() {
    const [students, setStudents] = useState<StudentActivity[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchStudents() {
            try {
                const response = await fetch('/api/admin/students');
                const data = await response.json();
                if (data.success) {
                    // Sort by last activity (most recent first)
                    const sorted = data.students.sort((a: StudentActivity, b: StudentActivity) => {
                        if (!a.lastActivityAt && !b.lastActivityAt) return 0;
                        if (!a.lastActivityAt) return 1;
                        if (!b.lastActivityAt) return -1;
                        return new Date(b.lastActivityAt).getTime() - new Date(a.lastActivityAt).getTime();
                    });
                    setStudents(sorted);
                } else {
                    setError('فشل في جلب بيانات الطلاب');
                }
            } catch (err) {
                setError('خطأ في الاتصال بالسيرفر');
            } finally {
                setLoading(false);
            }
        }

        fetchStudents();
        // Refresh every 30 seconds
        const interval = setInterval(fetchStudents, 30000);
        return () => clearInterval(interval);
    }, []);

    const onlineStudents = students.filter(s => isOnline(s.lastActivityAt));
    const totalLogins = students.reduce((acc, s) => acc + (s.loginCount || 0), 0);
    const totalTime = students.reduce((acc, s) => acc + (s.totalTimeSpent || 0), 0);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center py-10 text-red-500">
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6" dir="rtl">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">نشاط الطلاب</h1>
                <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary">
                    ← العودة للوحة التحكم
                </Link>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="bg-green-500/10 border-green-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <UserCheck className="h-4 w-4 text-green-500" />
                            متصل الآن
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-500">{onlineStudents.length}</div>
                        <p className="text-xs text-muted-foreground">من أصل {students.length} طالب</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Users className="h-4 w-4" />
                            إجمالي الطلاب
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{students.length}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Activity className="h-4 w-4" />
                            مرات الدخول
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalLogins}</div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium flex items-center gap-2">
                            <Clock className="h-4 w-4" />
                            الوقت الكلي
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{formatDuration(totalTime)}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Online Students */}
            {onlineStudents.length > 0 && (
                <Card className="border-green-500/50">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-500">
                            <span className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                            </span>
                            الطلاب المتصلين الآن ({onlineStudents.length})
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            {onlineStudents.map(student => (
                                <Badge key={student.id} variant="secondary" className="bg-green-500/20 text-green-700 dark:text-green-300">
                                    {student.studentName || student.username}
                                </Badge>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            )}

            {/* Students Table */}
            <Card>
                <CardHeader>
                    <CardTitle>جميع الطلاب</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b">
                                    <th className="text-right py-3 px-2">الحالة</th>
                                    <th className="text-right py-3 px-2">اسم الطالب</th>
                                    <th className="text-right py-3 px-2">اسم المستخدم</th>
                                    <th className="text-right py-3 px-2">آخر تسجيل دخول</th>
                                    <th className="text-right py-3 px-2">آخر نشاط</th>
                                    <th className="text-right py-3 px-2">مرات الدخول</th>
                                    <th className="text-right py-3 px-2">الوقت الكلي</th>
                                </tr>
                            </thead>
                            <tbody>
                                {students.map(student => (
                                    <tr key={student.id} className="border-b hover:bg-muted/50">
                                        <td className="py-3 px-2">
                                            {isOnline(student.lastActivityAt) ? (
                                                <span className="relative flex h-3 w-3">
                                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                                    <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                                </span>
                                            ) : (
                                                <span className="inline-flex rounded-full h-3 w-3 bg-gray-300"></span>
                                            )}
                                        </td>
                                        <td className="py-3 px-2 font-medium">{student.studentName || '-'}</td>
                                        <td className="py-3 px-2 text-muted-foreground">{student.username}</td>
                                        <td className="py-3 px-2">{formatTimeAgo(student.lastLoginAt)}</td>
                                        <td className="py-3 px-2">{formatTimeAgo(student.lastActivityAt)}</td>
                                        <td className="py-3 px-2">{student.loginCount || 0}</td>
                                        <td className="py-3 px-2">{formatDuration(student.totalTimeSpent)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
