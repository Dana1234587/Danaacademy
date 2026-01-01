'use client';

import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';
import { addStudent, deleteStudent as deleteStudentService, resetStudentPassword as resetStudentPasswordService, updateStudent as updateStudentService, type Student } from '@/services/studentService';
import { approveDevice, rejectPendingDevice, deleteRegisteredDevice } from '@/services/deviceService';
import { initializeApp, deleteApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { firebaseConfig } from '@/lib/firebase';
import { availableCourses } from '../constants';

export function useStudentActions(refetchData: () => Promise<void>) {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState<Record<string, boolean>>({});

    const setLoadingState = (key: string, value: boolean) => {
        setIsLoading(prev => ({ ...prev, [key]: value }));
    };

    // إنشاء حساب طالب جديد
    const handleCreateAccount = async (
        studentName: string,
        username: string,
        password: string,
        phone1: string,
        phone2: string,
        gender: 'male' | 'female',
        selectedCourses: string[]
    ): Promise<boolean> => {
        if (selectedCourses.length === 0) {
            toast({ variant: 'destructive', title: 'خطأ', description: 'الرجاء اختيار دورة واحدة على الأقل للطالب.' });
            return false;
        }
        setLoadingState('create', true);

        const studentEmail = `${username}@dana-academy.com`;
        const secondaryAppName = `secondary-app-${Date.now()}`;
        const secondaryApp = initializeApp(firebaseConfig, secondaryAppName);
        const secondaryAuth = getAuth(secondaryApp);

        try {
            const userCredential = await createUserWithEmailAndPassword(secondaryAuth, studentEmail, password);
            const user = userCredential.user;

            const coursesDetails = availableCourses.filter(c => selectedCourses.includes(c.id));

            await addStudent({
                id: user.uid,
                studentName,
                username,
                email: studentEmail,
                password,
                phone1,
                phone2,
                gender,
                courses: coursesDetails.map(c => c.name),
                courseIds: coursesDetails.map(c => c.id),
            });

            toast({
                title: 'تم إنشاء الحساب بنجاح',
                description: `تم إنشاء حساب للطالب ${studentName}.`,
            });

            await refetchData();
            return true;
        } catch (error: any) {
            let description = 'حدث خطأ غير متوقع. الرجاء المحاولة مرة أخرى.';
            if (error.code) {
                switch (error.code) {
                    case 'auth/email-already-in-use':
                        description = 'اسم المستخدم هذا موجود بالفعل. الرجاء اختيار اسم آخر.';
                        break;
                    case 'auth/weak-password':
                        description = 'كلمة المرور ضعيفة جدًا. يجب أن تتكون من 6 أحرف على الأقل.';
                        break;
                    case 'auth/invalid-email':
                        description = 'صيغة اسم المستخدم غير صالحة.';
                        break;
                    default:
                        description = `Firebase Error: ${error.message}`;
                }
            }
            toast({ variant: 'destructive', title: 'فشل إنشاء الحساب', description, duration: 9000 });
            return false;
        } finally {
            setLoadingState('create', false);
            try { await deleteApp(secondaryApp); } catch (err) { console.error("Error deleting secondary app", err); }
        }
    };

    // حذف طالب
    const handleDeleteStudent = async (studentId: string): Promise<void> => {
        setLoadingState(`delete-${studentId}`, true);
        try {
            await deleteStudentService(studentId);
            toast({
                title: 'تم الحذف بنجاح',
                description: `تم حذف الطالب من المصادقة وقاعدة البيانات بنجاح.`,
            });
            await refetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: `حدث خطأ: ${error.message}` });
        } finally {
            setLoadingState(`delete-${studentId}`, false);
        }
    };

    // إعادة تعيين كلمة المرور
    const handleResetPassword = async (studentId: string, studentName: string): Promise<string | null> => {
        const newPassword = Math.random().toString(36).slice(-8);
        setLoadingState(`reset-${studentId}`, true);
        try {
            await resetStudentPasswordService(studentId, newPassword);
            toast({
                title: 'تم تحديث كلمة المرور بنجاح',
                description: `كلمة المرور الجديدة للطالب ${studentName} هي: ${newPassword}`,
                duration: 15000
            });
            await refetchData();
            return newPassword;
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل إعادة التعيين', description: 'لم نتمكن من إعادة تعيين كلمة المرور.' });
            return null;
        } finally {
            setLoadingState(`reset-${studentId}`, false);
        }
    };

    // تحديث بيانات طالب
    const handleUpdateStudent = async (studentId: string, data: Partial<Student>): Promise<boolean> => {
        setLoadingState(`update-${studentId}`, true);
        try {
            await updateStudentService(studentId, data);
            toast({
                title: 'تم تحديث البيانات',
                description: `تم تحديث بيانات الطالب بنجاح.`,
            });
            await refetchData();
            return true;
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل التحديث', description: `حدث خطأ: ${error.message}` });
            return false;
        } finally {
            setLoadingState(`update-${studentId}`, false);
        }
    };

    // الموافقة على جهاز
    const handleApproveDevice = async (id: string, studentName: string, mode: 'replace' | 'add'): Promise<void> => {
        const loadingKey = `${mode}-${id}`;
        setLoadingState(loadingKey, true);
        try {
            await approveDevice(id, mode);
            toast({
                title: 'تمت الموافقة',
                description: `تمت الموافقة على الجهاز الجديد للطالب ${studentName} بنجاح.`,
            });
            await refetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشلت الموافقة', description: error.message || 'حدث خطأ.' });
        } finally {
            setLoadingState(loadingKey, false);
        }
    };

    // رفض جهاز
    const handleRejectDevice = async (id: string): Promise<void> => {
        const loadingKey = `reject-${id}`;
        setLoadingState(loadingKey, true);
        try {
            await rejectPendingDevice(id);
            toast({
                title: 'تم الرفض',
                description: `تم رفض الجهاز وحذفه من قائمة الطلبات المعلقة.`,
            });
            await refetchData();
        } catch (error: any) {
            toast({ variant: 'destructive', title: 'فشل الرفض', description: error.message || 'حدث خطأ.' });
        } finally {
            setLoadingState(loadingKey, false);
        }
    };

    // حذف جهاز مسجل
    const handleDeleteDevice = async (deviceId: string): Promise<void> => {
        setLoadingState(`delete-device-${deviceId}`, true);
        try {
            await deleteRegisteredDevice(deviceId);
            toast({
                title: 'تم الحذف',
                description: `تم حذف الجهاز المسجل بنجاح.`,
            });
            await refetchData();
        } catch (error) {
            toast({ variant: 'destructive', title: 'فشل الحذف', description: 'لم نتمكن من حذف الجهاز.' });
        } finally {
            setLoadingState(`delete-device-${deviceId}`, false);
        }
    };

    return {
        isLoading,
        handleCreateAccount,
        handleDeleteStudent,
        handleResetPassword,
        handleUpdateStudent,
        handleApproveDevice,
        handleRejectDevice,
        handleDeleteDevice,
    };
}
