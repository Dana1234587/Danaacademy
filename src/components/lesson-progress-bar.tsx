'use client';

import React from 'react';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Video, CheckCircle, TrendingUp } from 'lucide-react';

interface LessonProgressBarProps {
    videoProgress: number;
    quizProgress: number;
    overallProgress: number;
    isCompleted?: boolean;
    showDetails?: boolean;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
}

export function LessonProgressBar({
    videoProgress = 0,
    quizProgress = 0,
    overallProgress = 0,
    isCompleted = false,
    showDetails = true,
    size = 'md',
    className,
}: LessonProgressBarProps) {
    const sizeClasses = {
        sm: 'text-xs gap-1',
        md: 'text-sm gap-2',
        lg: 'text-base gap-3',
    };

    const progressHeight = {
        sm: 'h-1.5',
        md: 'h-2',
        lg: 'h-3',
    };

    return (
        <div className={cn('w-full', sizeClasses[size], className)}>
            {showDetails ? (
                <div className="space-y-2">
                    {/* تقدم الفيديو */}
                    <div className="flex items-center gap-2">
                        <Video className={cn('text-blue-500', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
                        <span className="text-muted-foreground min-w-[60px]">الفيديو</span>
                        <div className="flex-1">
                            <Progress
                                value={videoProgress}
                                className={cn(progressHeight[size], '[&>div]:bg-blue-500')}
                            />
                        </div>
                        <span className="min-w-[40px] text-end font-medium">{videoProgress}%</span>
                    </div>

                    {/* تقدم الأسئلة */}
                    <div className="flex items-center gap-2">
                        <CheckCircle className={cn('text-green-500', size === 'sm' ? 'w-3 h-3' : 'w-4 h-4')} />
                        <span className="text-muted-foreground min-w-[60px]">الأسئلة</span>
                        <div className="flex-1">
                            <Progress
                                value={quizProgress}
                                className={cn(progressHeight[size], '[&>div]:bg-green-500')}
                            />
                        </div>
                        <span className="min-w-[40px] text-end font-medium">{quizProgress}%</span>
                    </div>

                    {/* الخط الفاصل */}
                    <hr className="border-border/50" />

                    {/* التقدم الكلي */}
                    <div className="flex items-center gap-2">
                        <TrendingUp className={cn(
                            isCompleted ? 'text-primary' : 'text-orange-500',
                            size === 'sm' ? 'w-3 h-3' : 'w-4 h-4'
                        )} />
                        <span className="text-foreground font-medium min-w-[60px]">الإجمالي</span>
                        <div className="flex-1">
                            <Progress
                                value={overallProgress}
                                className={cn(
                                    progressHeight[size],
                                    isCompleted ? '[&>div]:bg-primary' : '[&>div]:bg-orange-500'
                                )}
                            />
                        </div>
                        <span className={cn(
                            "min-w-[40px] text-end font-bold",
                            isCompleted ? 'text-primary' : 'text-orange-500'
                        )}>
                            {overallProgress}%
                        </span>
                    </div>

                    {/* شارة الإكمال */}
                    {isCompleted && (
                        <div className="flex items-center justify-center gap-2 text-primary bg-primary/10 rounded-lg py-2 mt-2">
                            <CheckCircle className="w-4 h-4" />
                            <span className="font-medium">مكتمل!</span>
                        </div>
                    )}
                </div>
            ) : (
                /* عرض مختصر - شريط واحد */
                <div className="flex items-center gap-2">
                    <div className="flex-1">
                        <Progress
                            value={overallProgress}
                            className={cn(
                                progressHeight[size],
                                isCompleted ? '[&>div]:bg-primary' : '[&>div]:bg-orange-500'
                            )}
                        />
                    </div>
                    <span className={cn(
                        "text-xs font-medium",
                        isCompleted ? 'text-primary' : 'text-muted-foreground'
                    )}>
                        {overallProgress}%
                    </span>
                </div>
            )}
        </div>
    );
}

/**
 * شريط تقدم دائري صغير - للعرض في قوائم الدروس
 */
interface CircularProgressProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    className?: string;
}

export function CircularProgress({
    progress,
    size = 40,
    strokeWidth = 4,
    className,
}: CircularProgressProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    const isCompleted = progress >= 80;
    const color = isCompleted ? 'stroke-primary' : progress > 0 ? 'stroke-orange-500' : 'stroke-muted';

    return (
        <div className={cn('relative inline-flex items-center justify-center', className)}>
            <svg width={size} height={size} className="transform -rotate-90">
                {/* Background circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    stroke="currentColor"
                    strokeWidth={strokeWidth}
                    fill="none"
                    className="text-muted"
                />
                {/* Progress circle */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    fill="none"
                    strokeLinecap="round"
                    className={color}
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        transition: 'stroke-dashoffset 0.5s ease',
                    }}
                />
            </svg>
            <span className="absolute text-xs font-medium">
                {progress}%
            </span>
        </div>
    );
}
