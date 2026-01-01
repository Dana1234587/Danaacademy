'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Search, Trash2, Loader2, Smartphone } from 'lucide-react';
import { type RegisteredDevice } from '@/services/deviceService';
import { formatDistanceToNow } from 'date-fns';
import { ar } from 'date-fns/locale';
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

interface RegisteredDevicesTabProps {
    registeredDevices: RegisteredDevice[];
    onDeleteDevice: (deviceId: string) => Promise<void>;
    isLoading: Record<string, boolean>;
}

export function RegisteredDevicesTab({
    registeredDevices,
    onDeleteDevice,
    isLoading
}: RegisteredDevicesTabProps) {
    const [searchQuery, setSearchQuery] = useState('');

    const filteredDevices = useMemo(() => {
        if (!searchQuery) return registeredDevices;
        return registeredDevices.filter(device =>
            device.studentName?.toLowerCase().includes(searchQuery.toLowerCase())
        );
    }, [registeredDevices, searchQuery]);

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <CardTitle>الأجهزة المسجلة ({registeredDevices.length})</CardTitle>
                        <CardDescription>قائمة بجميع الأجهزة الموافق عليها حاليًا.</CardDescription>
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
            <CardContent>
                {filteredDevices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>اسم الطالب</TableHead>
                                    <TableHead>الجهاز</TableHead>
                                    <TableHead>آخر ظهور</TableHead>
                                    <TableHead>الإجراء</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredDevices.map(device => {
                                    const lastSeen = device.lastSeenAt
                                        ? formatDistanceToNow(new Date(device.lastSeenAt), { addSuffix: true, locale: ar })
                                        : 'غير معروف';

                                    return (
                                        <TableRow key={device.id}>
                                            <TableCell className="font-medium">{device.studentName}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2 text-xs">
                                                    <span>{device.deviceInfo?.os || 'OS'} / {device.deviceInfo?.browser || 'Browser'}</span>
                                                </div>
                                                <div className="font-mono text-xs text-muted-foreground truncate max-w-[200px]">
                                                    {device.deviceId}
                                                </div>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{lastSeen}</TableCell>
                                            <TableCell>
                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive" disabled={isLoading[`delete-device-${device.id}`]}>
                                                            {isLoading[`delete-device-${device.id}`] ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                                        </Button>
                                                    </AlertDialogTrigger>
                                                    <AlertDialogContent>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>هل أنت متأكد من حذف هذا الجهاز؟</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                هذا الإجراء سيحذف الجهاز المسجل للطالب {device.studentName} نهائيًا. سيضطر الطالب إلى إعادة تسجيله والموافقة عليه مرة أخرى.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>
                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                                                            <AlertDialogAction onClick={() => onDeleteDevice(device.id)} className="bg-destructive hover:bg-destructive/90">
                                                                نعم، قم بالحذف
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className="text-center py-8 text-muted-foreground">
                        <Smartphone className="mx-auto h-12 w-12 mb-2 opacity-50" />
                        <p>لا توجد أجهزة مسجلة.</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
