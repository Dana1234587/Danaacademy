'use client';

import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import WatermarkedVideoPlayer from '@/components/watermarked-video-player';
import { LessonProgressBar } from '@/components/lesson-progress-bar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStore } from '@/store/app-store';

interface LessonVideoPlayerProps {
    src: string;
    lessonId?: string;
    courseId?: string;
    showProgress?: boolean;
}

/**
 * مكوّن يجمع بين مشغل الفيديو وشريط التقدم للحصة
 * يتتبع تقدم المشاهدة تلقائياً ويعرض شريط التقدم
 * يستخرج lessonId و courseId تلقائياً من URL إذا لم يتم تمريرها
 */
export function LessonVideoPlayer({
    src,
    lessonId: propLessonId,
    courseId: propCourseId,
    showProgress = true,
}: LessonVideoPlayerProps) {
    const pathname = usePathname();
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
    const [progress, setProgress] = useState({
        videoProgress: 0,
        quizProgress: 0,
        overallProgress: 0,
        isCompleted: false,
    });
    const [isLoading, setIsLoading] = useState(true);

    // استخراج lessonId و courseId من URL
    const { lessonId, courseId } = React.useMemo(() => {
        if (propLessonId && propCourseId) {
            return { lessonId: propLessonId, courseId: propCourseId };
        }

        // مثال: /courses/physics-supplementary-2007/first-semester/1-linear-momentum/1-impulse/1-concept
        const parts = pathname.split('/').filter(Boolean);
        const coursesIndex = parts.indexOf('courses');

        if (coursesIndex === -1 || parts.length < coursesIndex + 2) {
            return { lessonId: '', courseId: '' };
        }

        const extractedCourseId = parts[coursesIndex + 1] || '';
        // آخر جزء من المسار هو الـ lessonId
        const extractedLessonId = parts.slice(coursesIndex + 2).join('-');

        return {
            lessonId: propLessonId || extractedLessonId,
            courseId: propCourseId || extractedCourseId,
        };
    }, [pathname, propLessonId, propCourseId]);

    // جلب تقدم الطالب للحصة
    useEffect(() => {
        if (!currentUser?.uid || !lessonId) {
            setIsLoading(false);
            return;
        }

        async function fetchProgress() {
            try {
                const response = await fetch(`/api/progress/${encodeURIComponent(lessonId)}?studentId=${currentUser?.uid}`);
                if (response.ok) {
                    const data = await response.json();
                    if (data.progress) {
                        setProgress({
                            videoProgress: data.progress.videoProgress?.percentage || 0,
                            quizProgress: data.progress.quizProgress?.percentage || 0,
                            overallProgress: data.progress.overallProgress || 0,
                            isCompleted: data.progress.isCompleted || false,
                        });
                    }
                }
            } catch (error) {
                console.error('Error fetching lesson progress:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProgress();
    }, [currentUser?.uid, lessonId]);

    return (
        <div className="space-y-4">
            {/* مشغل الفيديو */}
            <WatermarkedVideoPlayer src={src} />

            {/* شريط التقدم */}
            {showProgress && currentUser && lessonId && (
                <Card className="bg-gradient-to-br from-background to-muted/50">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-base flex items-center gap-2">
                            📊 تقدمك في هذه الحصة
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {isLoading ? (
                            <div className="flex items-center justify-center py-4">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                            </div>
                        ) : (
                            <LessonProgressBar
                                videoProgress={progress.videoProgress}
                                quizProgress={progress.quizProgress}
                                overallProgress={progress.overallProgress}
                                isCompleted={progress.isCompleted}
                                size="md"
                            />
                        )}
                    </CardContent>
                </Card>
            )}
        </div>
    );
}

export default LessonVideoPlayer;

