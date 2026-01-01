'use client';

import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import {
    Play, Pause, Volume2, VolumeX,
    SkipForward, SkipBack, Maximize, Minimize
} from 'lucide-react';

interface VideoControlsProps {
    isPlaying: boolean;
    isMuted: boolean;
    volume: number;
    progress: number;
    duration: number;
    currentTime: number;
    isFullscreen: boolean;
    showControls: boolean;
    isPlayerReady: boolean;
    isMobile: boolean;
    onPlayPause: () => void;
    onMuteToggle: () => void;
    onVolumeChange: (value: number[]) => void;
    onSeek: (value: number[]) => void;
    onSkip: (seconds: number) => void;
    onFullscreenToggle: () => void;
}

// Format seconds to mm:ss
const formatTime = (seconds: number) => {
    if (isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export function VideoControls({
    isPlaying,
    isMuted,
    volume,
    progress,
    duration,
    currentTime,
    isFullscreen,
    showControls,
    isPlayerReady,
    isMobile,
    onPlayPause,
    onMuteToggle,
    onVolumeChange,
    onSeek,
    onSkip,
    onFullscreenToggle
}: VideoControlsProps) {
    return (
        <div
            className={cn(
                "absolute bottom-0 left-0 right-0 transition-opacity duration-300",
                "bg-gradient-to-t from-black/80 via-black/40 to-transparent",
                "p-3 md:p-4",
                showControls ? "opacity-100" : "opacity-0 pointer-events-none"
            )}
        >
            {/* Progress Bar */}
            <div className="mb-2 md:mb-3">
                <Slider
                    value={[progress]}
                    max={100}
                    step={0.1}
                    onValueChange={onSeek}
                    className="cursor-pointer [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-primary [&>span:first-child>span]:bg-primary"
                    disabled={!isPlayerReady}
                />
            </div>

            {/* Controls Row */}
            <div className="flex items-center justify-between gap-2">
                {/* Left: Play controls */}
                <div className="flex items-center gap-1 md:gap-2">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20"
                        onClick={() => onSkip(-10)}
                        disabled={!isPlayerReady}
                    >
                        <SkipBack className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 md:h-12 md:w-12 text-white hover:bg-white/20"
                        onClick={onPlayPause}
                        disabled={!isPlayerReady}
                    >
                        {isPlaying ? (
                            <Pause className="h-5 w-5 md:h-6 md:w-6" />
                        ) : (
                            <Play className="h-5 w-5 md:h-6 md:w-6" />
                        )}
                    </Button>

                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20"
                        onClick={() => onSkip(10)}
                        disabled={!isPlayerReady}
                    >
                        <SkipForward className="h-4 w-4 md:h-5 md:w-5" />
                    </Button>

                    {/* Time display */}
                    <span className="text-xs md:text-sm text-white/90 font-mono mx-2">
                        {formatTime(currentTime)} / {formatTime(duration)}
                    </span>
                </div>

                {/* Right: Volume + Fullscreen */}
                <div className="flex items-center gap-1 md:gap-2">
                    {/* Volume (desktop only) */}
                    {!isMobile && (
                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-white hover:bg-white/20"
                                onClick={onMuteToggle}
                                disabled={!isPlayerReady}
                            >
                                {isMuted ? (
                                    <VolumeX className="h-4 w-4" />
                                ) : (
                                    <Volume2 className="h-4 w-4" />
                                )}
                            </Button>
                            <Slider
                                value={[isMuted ? 0 : volume]}
                                max={100}
                                step={1}
                                onValueChange={onVolumeChange}
                                className="w-20 [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:h-3 [&_[role=slider]]:w-3 [&_[role=slider]]:bg-white [&>span:first-child>span]:bg-white"
                                disabled={!isPlayerReady}
                            />
                        </div>
                    )}

                    {/* Fullscreen */}
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 md:h-10 md:w-10 text-white hover:bg-white/20"
                        onClick={onFullscreenToggle}
                    >
                        {isFullscreen ? (
                            <Minimize className="h-4 w-4 md:h-5 md:w-5" />
                        ) : (
                            <Maximize className="h-4 w-4 md:h-5 md:w-5" />
                        )}
                    </Button>
                </div>
            </div>
        </div>
    );
}
