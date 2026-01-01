'use client';

import { AnimatedCounter } from './AnimatedCounter';

interface ProgressRingProps {
    progress: number;
    size?: number;
    strokeWidth?: number;
    label?: string;
}

export function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    label = 'مكتمل'
}: ProgressRingProps) {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (progress / 100) * circumference;

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                {/* Background */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="fill-none stroke-muted/30"
                />
                {/* Progress */}
                <circle
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    className="fill-none stroke-primary transition-all duration-1000 ease-out"
                    style={{
                        strokeDasharray: circumference,
                        strokeDashoffset: offset,
                        strokeLinecap: 'round',
                    }}
                />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold">
                    <AnimatedCounter value={progress} />
                </span>
                <span className="text-xs text-muted-foreground">{label}</span>
            </div>
        </div>
    );
}
