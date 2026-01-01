'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { FileText, Play, CheckCircle2, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useStore } from '@/store/app-store';

interface TopicProgressItemProps {
    topic: {
        label: string;
        path: string;
    };
    index: number;
}

// Mini circular progress component
function CircularProgress({
    progress,
    size = 28,
    strokeWidth = 3
}: {
    progress: number;
    size?: number;
    strokeWidth?: number;
}) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const getColor = () => {
        if (progress >= 80) return '#22c55e'; // Green
        if (progress >= 50) return '#3b82f6'; // Blue
        if (progress > 0) return '#f97316'; // Orange
        return '#d1d5db'; // Gray
    };

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg
                width={size}
                height={size}
                className="transform -rotate-90"
            >
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    className="text-muted/30"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    fill="none"
                    stroke={getColor()}
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                />
            </svg>
            {/* Center content */}
            <div className="absolute inset-0 flex items-center justify-center">
                {progress >= 80 ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500" />
                ) : progress > 0 ? (
                    <span className="text-[9px] font-bold text-foreground/70">{Math.round(progress)}</span>
                ) : (
                    <Play className="w-2.5 h-2.5 text-muted-foreground/50" />
                )}
            </div>
        </div>
    );
}

export function TopicProgressItem({ topic, index }: TopicProgressItemProps) {
    const currentUser = useStore((s) => s.currentUser);
    const [progress, setProgress] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(false);

    // Extract lessonId from path - must match video player format
    // Video player uses: parts.slice(coursesIndex + 1).join('/')
    // Example: /courses/physics-2008/physics-2008-first-semester/... -> physics-2008/physics-2008-first-semester/...
    const lessonId = topic.path.replace(/^\/courses\//, '').replace(/^\//, '');

    useEffect(() => {
        async function fetchProgress() {
            if (!currentUser?.uid) {
                return;
            }

            setIsLoading(true);
            try {
                const response = await fetch(`/api/progress/lesson?studentId=${encodeURIComponent(currentUser.uid)}&lessonId=${encodeURIComponent(lessonId)}`);
                const data = await response.json();

                if (data.success && data.progress) {
                    setProgress(data.progress.overallProgress || 0);
                }
            } catch (error) {
                console.error('Error fetching topic progress:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProgress();
    }, [currentUser?.uid, lessonId]);

    const isCompleted = progress >= 80;
    const inProgress = progress > 0 && progress < 80;

    return (
        <Link
            href={topic.path}
            className={cn(
                "group flex items-center gap-3 p-3 rounded-lg transition-all duration-200",
                "hover:bg-primary/5 hover:shadow-sm",
                "border border-transparent hover:border-primary/20",
                isCompleted && "bg-green-50/50 dark:bg-green-950/20 border-green-200/50",
                inProgress && "bg-orange-50/30 dark:bg-orange-950/10"
            )}
        >
            {/* Progress indicator */}
            <div className="flex-shrink-0">
                {isLoading ? (
                    <div className="w-7 h-7 flex items-center justify-center">
                        <Loader2 className="w-4 h-4 animate-spin text-muted-foreground/50" />
                    </div>
                ) : (
                    <CircularProgress progress={progress} />
                )}
            </div>

            {/* Topic number badge */}
            <div className={cn(
                "flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold",
                isCompleted
                    ? "bg-green-500 text-white"
                    : inProgress
                        ? "bg-orange-500 text-white"
                        : "bg-muted text-muted-foreground"
            )}>
                {index + 1}
            </div>

            {/* Topic label */}
            <span className={cn(
                "flex-1 text-sm transition-colors",
                isCompleted
                    ? "text-green-700 dark:text-green-400 font-medium"
                    : "text-foreground/80 group-hover:text-primary"
            )}>
                {topic.label}
            </span>

            {/* Status icon */}
            {isCompleted && (
                <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
            )}
            {inProgress && !isCompleted && (
                <div className="text-xs text-orange-600 dark:text-orange-400 font-medium flex-shrink-0">
                    {Math.round(progress)}%
                </div>
            )}
        </Link>
    );
}

// Summary component for lesson header - calculates from topic progress
export function LessonProgressSummary({
    topicPaths,
}: {
    topicPaths: string[];
}) {
    const currentUser = useStore((s) => s.currentUser);
    const [averageProgress, setAverageProgress] = useState(0);
    const [completedCount, setCompletedCount] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const totalTopics = topicPaths.length;

    useEffect(() => {
        async function fetchAllProgress() {
            if (!currentUser?.uid || topicPaths.length === 0) {
                setIsLoading(false);
                return;
            }

            try {
                let totalProgress = 0;
                let completed = 0;

                // Fetch progress for all topics in parallel
                const promises = topicPaths.map(async (path) => {
                    const lessonId = path.replace(/^\/courses\//, '').replace(/^\//, '');
                    const res = await fetch(
                        `/api/progress/lesson?studentId=${encodeURIComponent(currentUser.uid)}&lessonId=${encodeURIComponent(lessonId)}`
                    );
                    const data = await res.json();
                    return data.success && data.progress ? data.progress.overallProgress || 0 : 0;
                });

                const results = await Promise.all(promises);

                results.forEach((progress) => {
                    totalProgress += progress;
                    if (progress >= 80) completed++;
                });

                const avg = totalTopics > 0 ? Math.round(totalProgress / totalTopics) : 0;
                setAverageProgress(avg);
                setCompletedCount(completed);
            } catch (error) {
                console.error('Error fetching lesson progress:', error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchAllProgress();
    }, [currentUser?.uid, topicPaths, totalTopics]);

    const getProgressColor = () => {
        if (averageProgress >= 80) return 'bg-green-500';
        if (averageProgress >= 50) return 'bg-blue-500';
        if (averageProgress > 0) return 'bg-orange-500';
        return 'bg-muted-foreground/30';
    };

    return (
        <div className="flex items-center gap-3">
            {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin text-muted-foreground" />
            ) : (
                <>
                    {/* Progress bar */}
                    <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                            className={cn("h-full rounded-full transition-all duration-500", getProgressColor())}
                            style={{ width: `${averageProgress}%` }}
                        />
                    </div>
                    {/* Progress text */}
                    <span className="text-sm font-medium text-muted-foreground">
                        {averageProgress > 0 ? (
                            <span className={cn(
                                averageProgress >= 80 ? 'text-green-600' :
                                    averageProgress >= 50 ? 'text-blue-600' : 'text-orange-600'
                            )}>
                                {averageProgress}%
                            </span>
                        ) : null}
                        {' '}
                        {completedCount > 0 ? `(${completedCount}/${totalTopics})` : `${totalTopics} حصص`}
                    </span>
                </>
            )}
        </div>
    );
}


