'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Lock, Unlock, Users, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008-first-semester', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'tawjihi-2008-second-semester', name: 'فيزياء توجيهي 2008 - فصل ثاني' },
    { id: 'tawjihi-2008-palestine', name: 'فيزياء التوجيهي - فلسطين 2008' },
    { id: 'astrophysics', name: 'فيزياء الثاني عشر - قطر' },
    { id: 'physics-101', name: 'فيزياء الجامعة 101' },
];

export function SubscriptionManager() {
    const [blockedCounts, setBlockedCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState<string | null>(null);
    const [confirmDialog, setConfirmDialog] = useState<{
        open: boolean;
        courseId: string;
        courseName: string;
        action: 'block' | 'unblock';
    } | null>(null);
    const { toast } = useToast();

    // جلب عدد المحظورين لكل كورس
    const fetchBlockedCounts = async () => {
        try {
            const res = await fetch('/api/admin/subscriptions');
            const data = await res.json();
            if (data.success) {
                setBlockedCounts(data.counts || {});
            }
        } catch (error) {
            console.error('Error fetching blocked counts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBlockedCounts();
    }, []);

    // تنفيذ الحظر أو الإلغاء
    const handleAction = async () => {
        if (!confirmDialog) return;

        const { courseId, courseName, action } = confirmDialog;
        setActionLoading(courseId);
        setConfirmDialog(null);

        try {
            const res = await fetch('/api/admin/subscriptions', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ courseId, action }),
            });

            const data = await res.json();

            if (data.success) {
                toast({
                    title: action === 'block' ? '✅ تم الحظر' : '✅ تم إلغاء الحظر',
                    description: data.message,
                });
                fetchBlockedCounts();
            } else {
                throw new Error(data.error);
            }
        } catch (error: any) {
            toast({
                title: '❌ خطأ',
                description: error?.message || 'حدث خطأ غير متوقع',
                variant: 'destructive',
            });
        } finally {
            setActionLoading(null);
        }
    };

    if (loading) {
        return (
            <Card>
                <CardContent className="flex items-center justify-center py-8">
                    <Loader2 className="w-8 h-8 animate-spin text-muted-foreground" />
                </CardContent>
            </Card>
        );
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        إدارة اشتراكات الكورسات
                    </CardTitle>
                    <CardDescription>
                        احظر أو ألغِ حظر كورس لكل الطلاب المسجلين فيه. الطلاب المحظورون سيشاهدون رسالة &quot;انتهت صلاحية التسجيل&quot;.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {availableCourses.map((course) => {
                            const blockedCount = blockedCounts[course.id] || 0;
                            const isBlocked = blockedCount > 0;
                            const isLoading = actionLoading === course.id;

                            return (
                                <div
                                    key={course.id}
                                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-full ${isBlocked ? 'bg-destructive/10' : 'bg-primary/10'}`}>
                                            {isBlocked ? (
                                                <Lock className="w-5 h-5 text-destructive" />
                                            ) : (
                                                <CheckCircle className="w-5 h-5 text-primary" />
                                            )}
                                        </div>
                                        <div>
                                            <p className="font-medium">{course.name}</p>
                                            <p className="text-sm text-muted-foreground">
                                                {isBlocked ? (
                                                    <span className="text-destructive">
                                                        {blockedCount} طالب محظور
                                                    </span>
                                                ) : (
                                                    'جميع الطلاب يستطيعون الوصول'
                                                )}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        {isBlocked && (
                                            <Badge variant="destructive" className="me-2">
                                                محظور
                                            </Badge>
                                        )}

                                        <Button
                                            variant={isBlocked ? 'outline' : 'destructive'}
                                            size="sm"
                                            disabled={isLoading}
                                            onClick={() =>
                                                setConfirmDialog({
                                                    open: true,
                                                    courseId: course.id,
                                                    courseName: course.name,
                                                    action: isBlocked ? 'unblock' : 'block',
                                                })
                                            }
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin me-2" />
                                            ) : isBlocked ? (
                                                <Unlock className="w-4 h-4 me-2" />
                                            ) : (
                                                <Lock className="w-4 h-4 me-2" />
                                            )}
                                            {isBlocked ? 'إلغاء الحظر' : 'حظر الكل'}
                                        </Button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>

            {/* نافذة التأكيد */}
            <AlertDialog open={confirmDialog?.open} onOpenChange={(open) => !open && setConfirmDialog(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle className="flex items-center gap-2">
                            <AlertTriangle className="w-5 h-5 text-amber-500" />
                            {confirmDialog?.action === 'block' ? 'تأكيد الحظر' : 'تأكيد إلغاء الحظر'}
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                            {confirmDialog?.action === 'block' ? (
                                <>
                                    هل أنت متأكد من حظر كورس <strong>{confirmDialog?.courseName}</strong> عن جميع طلابه؟
                                    <br />
                                    الطلاب المحظورون سيشاهدون رسالة &quot;انتهت صلاحية التسجيل&quot; بدلاً من المحتوى.
                                </>
                            ) : (
                                <>
                                    هل أنت متأكد من إلغاء حظر كورس <strong>{confirmDialog?.courseName}</strong>؟
                                    <br />
                                    جميع الطلاب سيتمكنون من الوصول للمحتوى مرة أخرى.
                                </>
                            )}
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>إلغاء</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleAction}
                            className={confirmDialog?.action === 'block' ? 'bg-destructive hover:bg-destructive/90' : ''}
                        >
                            {confirmDialog?.action === 'block' ? 'نعم، احظر الكل' : 'نعم، ألغِ الحظر'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
