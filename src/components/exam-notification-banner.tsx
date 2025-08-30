
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/app-store';
import { getExams } from '@/app/my-exams/actions';
import type { Exam } from '@/app/my-exams/actions';
import { isBefore } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Timer } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';

// CountdownTimer component extracted for reuse
const CountdownTimer = ({ targetDate }: { targetDate: Date }) => {
    const calculateTimeLeft = useCallback(() => {
        const difference = +targetDate - +new Date();
        let timeLeft: { [key: string]: number } = {};

        if (difference > 0) {
            timeLeft = {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
            };
        }
        return timeLeft;
    }, [targetDate]);

    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

    useEffect(() => {
        const timer = setTimeout(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearTimeout(timer);
    });

    const timerComponents = Object.entries(timeLeft)
        .filter(([interval, value]) => value > 0 || (interval === 'seconds' && Object.keys(timeLeft).length === 1) || Object.keys(timeLeft).length === 0)
        .map(([interval, value]) => {
            const unitMap: { [key: string]: string } = {
                days: 'يوم',
                hours: 'ساعة',
                minutes: 'دقيقة',
                seconds: 'ثانية',
            };
            if(value === 0 && Object.values(timeLeft).some(v => v > 0)) return null;

            return (
                <div key={interval} className="flex flex-col items-center p-2 bg-white/10 rounded-md min-w-[50px]">
                    <span className="text-2xl font-bold">{String(value).padStart(2, '0')}</span>
                    <span className="text-xs">{unitMap[interval]}</span>
                </div>
            );
        });

    if (!timerComponents.length) {
        return <span className="text-lg font-semibold animate-pulse">الامتحان متاح الآن!</span>;
    }

    return (
        <div className="flex justify-center gap-2 sm:gap-3" dir="ltr">
            {timerComponents}
        </div>
    );
};


export function ExamNotificationBanner() {
    const { currentUser } = useStore();
    const [upcomingExam, setUpcomingExam] = useState<Exam | null>(null);
    const [isVisible, setIsVisible] = useState(false);

    const findNextUpcomingExam = useCallback(async () => {
        if (!currentUser || currentUser.role !== 'student') {
            return;
        }

        try {
            const allExams = await getExams();
            const studentExams = allExams.filter(exam => currentUser.enrolledCourseIds.includes(exam.courseId));

            const nextExam = studentExams
                .filter(exam => exam.startDate && isBefore(new Date(), exam.startDate)) // Filter for upcoming exams
                .sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime()) // Sort by start date to get the soonest
                [0]; // Get the very next one

            if (nextExam) {
                 const sessionStorageKey = `examBannerDismissed_${nextExam.id}`;
                 const isDismissed = sessionStorage.getItem(sessionStorageKey);

                 if (!isDismissed) {
                    setUpcomingExam(nextExam);
                    setIsVisible(true);
                 }
            }
        } catch (error) {
            console.error("Failed to fetch upcoming exams for banner:", error);
        }
    }, [currentUser]);

    useEffect(() => {
        findNextUpcomingExam();
    }, [findNextUpcomingExam]);

    const handleDismiss = () => {
        setIsVisible(false);
        if (upcomingExam) {
            sessionStorage.setItem(`examBannerDismissed_${upcomingExam.id}`, 'true');
        }
    }


    if (!isVisible || !upcomingExam) {
        return null;
    }

    return (
        <AnimatePresence>
            <motion.div
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: "-100%", opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="fixed top-28 sm:top-32 left-1/2 -translate-x-1/2 w-[95%] max-w-4xl z-50"
            >
                <div className="bg-gradient-to-tr from-primary via-purple-700 to-pink-500 text-primary-foreground p-4 rounded-xl shadow-2xl border-2 border-primary-foreground/30">
                    <div className="container mx-auto flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <Timer className="w-8 h-8 hidden sm:block animate-pulse-slow" />
                            <div>
                                <p className="font-bold text-base sm:text-lg">امتحان قادم: {upcomingExam.title}</p>
                                <p className="text-xs sm:text-sm text-primary-foreground/80">الوقت المتبقي للبدء:</p>
                            </div>
                        </div>
                        <CountdownTimer targetDate={upcomingExam.startDate!} />
                        <div className="flex flex-col gap-2">
                           <Button asChild size="sm" variant="secondary" className="bg-white/90 text-primary hover:bg-white/100">
                              <Link href="/my-exams">
                                كل الامتحانات
                              </Link>
                           </Button>
                           <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full hover:bg-white/20 self-center"
                            onClick={handleDismiss}
                            >
                            <X className="h-4 w-4" />
                           </Button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
