'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface AchievementBadgeProps {
    icon: LucideIcon;
    title: string;
    value: string;
    color: string;
}

export function AchievementBadge({ icon: Icon, title, value, color }: AchievementBadgeProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={cn(
                "relative overflow-hidden rounded-2xl p-4 text-white",
                color
            )}
        >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />

            <div className="relative flex items-center gap-3">
                <div className="p-2 rounded-xl bg-white/20 backdrop-blur-sm">
                    <Icon className="w-5 h-5" />
                </div>
                <div>
                    <p className="text-sm font-medium opacity-90">{title}</p>
                    <p className="text-lg font-bold">{value}</p>
                </div>
            </div>
        </motion.div>
    );
}
