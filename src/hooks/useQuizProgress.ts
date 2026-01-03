'use client';

import { useStore } from '@/store/app-store';
import { usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';

/**
 * Hook لإرسال نتائج الـ Quiz إلى نظام تتبع التقدم
 */
export function useQuizProgress() {
    const currentUser = useStore((s) => s.currentUser);
    const pathname = usePathname();

    // استخراج IDs من الـ URL تلقائياً
    const extractedIds = useMemo(() => {
        const parts = pathname.split('/').filter(Boolean);
        const coursesIndex = parts.indexOf('courses');

        if (coursesIndex === -1) return { courseId: '', unitId: '', lessonId: '' };

        const courseId = parts[coursesIndex + 1] || '';
        const unitId = parts[coursesIndex + 3] || '';
        const lessonId = parts.slice(coursesIndex + 1).join('/'); // المسار الكامل كـ ID

        return { courseId, unitId, lessonId };
    }, [pathname]);

    /**
     * إرسال نتائج الاختبار
     */
    const submitQuizResult = useCallback(async (correctAnswers: number, totalQuestions: number) => {
        if (!currentUser || !extractedIds.lessonId || !extractedIds.courseId) {
            console.log('⏭️ Skipping quiz progress submission:', {
                reason: !currentUser ? 'no user' : !extractedIds.lessonId ? 'no lessonId' : 'no courseId'
            });
            return { success: false, progress: 0 };
        }

        const progressData = {
            studentId: currentUser.uid,
            lessonId: extractedIds.lessonId,
            courseId: extractedIds.courseId,
            correctAnswers,
            totalQuestions,
            unitId: extractedIds.unitId
        };

        console.log('📊 Submitting quiz result:', progressData);

        try {
            const response = await fetch('/api/progress/quiz', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(progressData)
            });

            const result = await response.json();
            console.log('✅ Quiz progress saved:', result);

            // تسجيل نشاط حل الأسئلة
            fetch('/api/activity/log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    studentId: currentUser.uid,
                    type: 'quiz_complete',
                    details: {
                        lessonId: extractedIds.lessonId,
                        courseId: extractedIds.courseId,
                        unitId: extractedIds.unitId,
                        correctAnswers,
                        totalQuestions,
                        percentage: totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0
                    }
                })
            }).catch(console.error);

            return result;
        } catch (error) {
            console.error('❌ Quiz progress save error:', error);
            return { success: false, progress: 0 };
        }
    }, [currentUser, extractedIds]);

    return {
        submitQuizResult,
        isLoggedIn: !!currentUser,
        lessonId: extractedIds.lessonId,
        courseId: extractedIds.courseId
    };
}
