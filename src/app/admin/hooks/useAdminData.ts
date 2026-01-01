'use client';

import { useState, useEffect, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useStore } from '@/store/app-store';
import { getStudents, type Student } from '@/services/studentService';
import { getPendingDevices, getAllRegisteredDevices, type PendingDevice, type RegisteredDevice } from '@/services/deviceService';
import { getAllStudentsProgress, type LessonProgress } from '@/services/progressService';

export interface AdminData {
    students: Student[];
    pendingDevices: (PendingDevice & { id: string })[];
    registeredDevices: RegisteredDevice[];
    allProgress: LessonProgress[];
    isLoading: boolean;
}

export function useAdminData() {
    const { toast } = useToast();
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
    const [isLoading, setIsLoading] = useState(false);

    const [students, setStudents] = useState<Student[]>([]);
    const [pendingDevices, setPendingDevices] = useState<(PendingDevice & { id: string })[]>([]);
    const [registeredDevices, setRegisteredDevices] = useState<RegisteredDevice[]>([]);
    const [allProgress, setAllProgress] = useState<LessonProgress[]>([]);

    const fetchData = useCallback(async () => {
        setIsLoading(true);
        try {
            const [studentsData, pendingDevicesData, registeredDevicesData, progressData] = await Promise.all([
                getStudents(),
                getPendingDevices(),
                getAllRegisteredDevices(),
                getAllStudentsProgress()
            ]);
            setStudents(studentsData);
            setPendingDevices(pendingDevicesData);
            setRegisteredDevices(registeredDevicesData);
            setAllProgress(progressData);

        } catch (error: any) {
            console.error("Error fetching data:", error);
            const errorMessage = error.code === 'permission-denied'
                ? 'فشل جلب البيانات. تأكدي من أن قواعد الأمان في Firestore صحيحة وأن حسابك يملك صلاحيات المسؤول.'
                : `حدث خطأ غير متوقع: ${error.message}`;
            toast({
                variant: 'destructive',
                title: 'فشل تحميل البيانات',
                description: errorMessage,
                duration: 9000,
            });
        } finally {
            setIsLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        if (currentUser?.role === 'admin') {
            fetchData();
        }
    }, [fetchData, currentUser]);

    return {
        students,
        pendingDevices,
        registeredDevices,
        allProgress,
        isLoading,
        refetch: fetchData,
        currentUser,
    };
}
