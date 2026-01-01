'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Check, Plus, X, Loader2 } from 'lucide-react';
import { type PendingDevice } from '@/services/deviceService';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PendingDevicesTabProps {
    pendingDevices: (PendingDevice & { id: string })[];
    onApproveDevice: (id: string, studentName: string, mode: 'replace' | 'add') => Promise<void>;
    onRejectDevice: (id: string) => Promise<void>;
    isLoading: Record<string, boolean>;
}

export function PendingDevicesTab({
    pendingDevices,
    onApproveDevice,
    onRejectDevice,
    isLoading
}: PendingDevicesTabProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDevices = useMemo(() => {
        if (!searchQuery) return pendingDevices;
        return pendingDevices.filter(device =>
            device.studentName.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [pendingDevices, searchQuery]);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>طلبات الأجهزة المعلقة ({pendingDevices.length})</CardTitle>
                        <CardDescription>الطلاب الذين يحاولون تسجيل الدخول من جهاز جديد.</CardDescription>
                    </div>
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="بحث باسم الطالب..."
                            className="ps-10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-4">
                {filteredDevices.length > 0 ? (
                    filteredDevices.map(device => (
                        <div key={device.id} className="p-4 bg-muted rounded-lg border">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between flex-wrap gap-4">
                                <div>
                                    <p className="font-bold text-lg">{device.studentName}</p>
                                    <p className="text-sm text-primary">{device.courses.join(', ')}</p>
                                </div>
                                <div className="flex flex-row gap-2 flex-wrap">
                                    <Button
                                        onClick={() => onApproveDevice(device.id, device.studentName, 'replace')}
                                        disabled={isLoading[`replace-${device.id}`]}
                                        variant="secondary"
                                    >
                                        {isLoading[`replace-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Check className="me-2" />}
                                        موافقة واستبدال
                                    </Button>
                                    <Button
                                        onClick={() => onApproveDevice(device.id, device.studentName, 'add')}
                                        disabled={isLoading[`add-${device.id}`]}
                                        variant="outline"
                                    >
                                        {isLoading[`add-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <Plus className="me-2" />}
                                        موافقة وإضافة
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button variant="destructive" disabled={isLoading[`reject-${device.id}`]}>
                                                {isLoading[`reject-${device.id}`] ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : <X className="me-2" />}
                                                رفض
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogHeader>
                                                <AlertDialogTitle>هل أنت متأكد من رفض هذا الجهاز؟</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    سيؤدي هذا الإجراء إلى حذف طلب الموافقة لهذا الجهاز بشكل نهائي.
                                                </AlertDialogDescription>
                                            </AlertDialogHeader>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => onRejectDevice(device.id)} className="bg-destructive hover:bg-destructive/90">
                                                    نعم، قم بالرفض
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </div>
                            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 text-sm text-muted-foreground border-t pt-4">
                                <div className="flex items-center gap-2 font-mono text-xs">
                                    <p className="font-sans font-semibold">OS:</p> <span>{device.deviceInfo?.os || 'N/A'} {device.deviceInfo?.osVersion}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs">
                                    <p className="font-sans font-semibold">Browser:</p> <span>{device.deviceInfo?.browser} {device.deviceInfo?.browserVersion}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs">
                                    <p className="font-sans font-semibold">Device:</p> <span>{device.deviceInfo?.deviceVendor || ''} {device.deviceInfo?.deviceModel || device.deviceInfo?.deviceType || 'Unknown'}</span>
                                </div>
                                <div className="flex items-center gap-2 font-mono text-xs">
                                    <p className="font-sans font-semibold">IP:</p> <span>{device.ipAddress}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-8 text-green-600">
                        <Check className="mx-auto h-12 w-12 mb-2" />
                        <p>لا توجد طلبات أجهزة معلقة حاليًا.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
