'use client';

import { useState, useEffect } from 'react';

interface AnimatedCounterProps {
    value: number;
    suffix?: string;
    duration?: number;
}

export function AnimatedCounter({ value, suffix = '%', duration = 1500 }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const steps = 60;
        const stepValue = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += stepValue;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value, duration]);

    return <span>{count}{suffix}</span>;
}
