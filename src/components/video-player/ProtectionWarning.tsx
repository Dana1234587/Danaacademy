'use client';

import { Shield, X } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProtectionWarningProps {
    show: boolean;
}

export function ProtectionWarning({ show }: ProtectionWarningProps) {
    if (!show) return null;

    return (
        <div
            className={cn(
                "absolute top-4 right-4 z-50",
                "bg-red-600/90 backdrop-blur-sm",
                "text-white text-xs md:text-sm",
                "px-3 py-2 rounded-lg",
                "flex items-center gap-2",
                "animate-pulse"
            )}
        >
            <Shield className="w-4 h-4" />
            <span>محتوى محمي</span>
        </div>
    );
}
