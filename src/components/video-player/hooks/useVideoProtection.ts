'use client';

import { useEffect, useCallback, useState } from 'react';

interface UseVideoProtectionParams {
    isFullscreen: boolean;
    onPlayPause: () => void;
    onMuteToggle: () => void;
    onSkip: (seconds: number) => void;
    onFullscreenToggle: () => void;
}

export function useVideoProtection({
    isFullscreen,
    onPlayPause,
    onMuteToggle,
    onSkip,
    onFullscreenToggle
}: UseVideoProtectionParams) {
    const [protectionWarning, setProtectionWarning] = useState(false);

    // Show warning temporarily
    const showWarning = useCallback(() => {
        setProtectionWarning(true);
        setTimeout(() => setProtectionWarning(false), 2000);
    }, []);

    // Prevent right-click
    const handleContextMenu = useCallback((e: React.MouseEvent | React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation();
        showWarning();
        return false;
    }, [showWarning]);

    // Prevent drag
    const handleDragStart = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        return false;
    }, []);

    // Keyboard controls + DevTools prevention
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Video controls
            if (e.key === ' ' || e.key === 'k') {
                e.preventDefault();
                onPlayPause();
                return;
            }
            if (e.key === 'm') {
                e.preventDefault();
                onMuteToggle();
                return;
            }
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                onSkip(-10);
                return;
            }
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                onSkip(10);
                return;
            }
            if (e.key === 'f') {
                e.preventDefault();
                onFullscreenToggle();
                return;
            }
            if (e.key === 'Escape' && isFullscreen) {
                onFullscreenToggle();
                return;
            }

            // Block DevTools keys
            const blockedKeys = [
                { key: 'F12', ctrl: false, shift: false },
                { key: 'I', ctrl: true, shift: true },
                { key: 'J', ctrl: true, shift: true },
                { key: 'C', ctrl: true, shift: true },
                { key: 'U', ctrl: true, shift: false },
                { key: 'S', ctrl: true, shift: false },
            ];

            for (const blocked of blockedKeys) {
                const keyMatch = e.key.toUpperCase() === blocked.key.toUpperCase();
                const ctrlMatch = blocked.ctrl ? (e.ctrlKey || e.metaKey) : true;
                const shiftMatch = blocked.shift ? e.shiftKey : !e.shiftKey;

                if (keyMatch && ctrlMatch && shiftMatch) {
                    e.preventDefault();
                    e.stopPropagation();
                    showWarning();
                    return false;
                }
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);
        return () => document.removeEventListener('keydown', handleKeyDown, true);
    }, [isFullscreen, onPlayPause, onMuteToggle, onSkip, onFullscreenToggle, showWarning]);

    return {
        protectionWarning,
        handleContextMenu,
        handleDragStart,
    };
}
