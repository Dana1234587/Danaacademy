'use client';

import { useRef, useEffect } from 'react';

interface UseVideoProgressParams {
    isPlaying: boolean;
    currentUser: { uid: string } | null;
    lessonId: string;
    courseId: string;
    unitId: string;
    duration: number;
    currentVideoTime: number;
}

export function useVideoProgress({
    isPlaying,
    currentUser,
    lessonId,
    courseId,
    unitId,
    duration,
    currentVideoTime
}: UseVideoProgressParams) {
    const watchedSecondsRef = useRef(0);
    const lastSaveTimeRef = useRef(0);
    const durationRef = useRef(duration);
    const currentVideoTimeRef = useRef(currentVideoTime);

    // Update refs when values change
    useEffect(() => {
        durationRef.current = duration;
    }, [duration]);

    useEffect(() => {
        currentVideoTimeRef.current = currentVideoTime;
    }, [currentVideoTime]);

    // Progress tracking effect
    useEffect(() => {
        if (!isPlaying || !currentUser || !lessonId || !courseId) {
            return;
        }

        const interval = setInterval(() => {
            watchedSecondsRef.current += 1;

            // Save progress every 30 seconds
            if (watchedSecondsRef.current - lastSaveTimeRef.current >= 30) {
                lastSaveTimeRef.current = watchedSecondsRef.current;

                const progressData = {
                    studentId: currentUser.uid,
                    lessonId,
                    courseId,
                    watchedSeconds: watchedSecondsRef.current,
                    totalSeconds: durationRef.current,
                    currentPosition: currentVideoTimeRef.current,
                    unitId
                };

                // Use API instead of server action
                fetch('/api/progress/video', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(progressData)
                })
                    .then(res => res.json())
                    .then(result => {
                        // Log activity
                        fetch('/api/activity/log', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                studentId: currentUser.uid,
                                type: 'video_watch',
                                details: {
                                    lessonId,
                                    courseId,
                                    unitId,
                                    watchedSeconds: 30,
                                    totalSeconds: durationRef.current,
                                    videoPercentage: result.progress || 0
                                }
                            })
                        }).catch(console.error);
                    })
                    .catch(console.error);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [isPlaying, currentUser, lessonId, courseId, unitId]);

    // Send progress on page unload
    useEffect(() => {
        const handleBeforeUnload = () => {
            if (currentUser && lessonId && courseId && watchedSecondsRef.current > 0) {
                const data = JSON.stringify({
                    studentId: currentUser.uid,
                    lessonId,
                    courseId,
                    watchedSeconds: watchedSecondsRef.current,
                    totalSeconds: duration,
                    currentPosition: currentVideoTime,
                    unitId,
                });
                navigator.sendBeacon('/api/progress/video', data);
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, [currentUser, lessonId, courseId, duration, currentVideoTime, unitId]);

    return {
        watchedSeconds: watchedSecondsRef.current,
    };
}
