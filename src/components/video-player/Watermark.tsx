'use client';

import { cn } from '@/lib/utils';

interface WatermarkProps {
    username?: string;
    currentTime: string;
    isFullscreen: boolean;
}

export function Watermark({ username, currentTime, isFullscreen }: WatermarkProps) {
    if (!username) return null;

    return (
        <>
            {/* Top watermark */}
            <div
                className={cn(
                    "absolute pointer-events-none select-none",
                    "top-4 left-4 md:top-6 md:left-6",
                    "text-white/[0.25] dark:text-white/[0.2]",
                    "text-xs md:text-sm font-medium",
                    "flex flex-col gap-1"
                )}
            >
                <span className="font-mono">{username}</span>
                <span className="text-[10px] md:text-xs">{currentTime}</span>
            </div>

            {/* Center watermark */}
            <div
                className={cn(
                    "absolute pointer-events-none select-none",
                    "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                    "text-white/[0.08] dark:text-white/[0.06]",
                    isFullscreen ? "text-4xl md:text-6xl" : "text-2xl md:text-4xl",
                    "font-bold text-center",
                    "whitespace-nowrap"
                )}
            >
                Dana Academy
            </div>

            {/* Bottom right watermark */}
            <div
                className={cn(
                    "absolute pointer-events-none select-none",
                    "bottom-20 right-4 md:bottom-24 md:right-6",
                    "text-white/[0.2] dark:text-white/[0.15]",
                    "text-xs font-mono"
                )}
            >
                {username}
            </div>
        </>
    );
}
