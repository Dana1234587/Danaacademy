
'use client';

import { useState, useEffect, useCallback } from 'react';
import { useStore } from '@/store/app-store';
import { getExams } from '@/app/my-exams/actions';
import type { Exam } from '@/app/my-exams/actions';
import { isBefore } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, Timer, HelpCircle, Clock, Repeat } from 'lucide-react';
import { Button } from './ui/button';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from '@/components/ui/card';

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
        .filter(([interval, value]) => {
             const keys = Object.keys(timeLeft);
             if (value > 0) return true;
             // Ensure seconds are shown even if they are the last unit and become 0
             if(keys.length === 1 && interval === 'seconds') return true;
             // A bit of a hack to prevent units from disappearing too early
             if(keys.length > 1 && interval !== 'seconds' && timeLeft.seconds > 0) return true;
             const higherIntervals = keys.slice(0, keys.indexOf(interval));
             return higherIntervals.some(key => timeLeft[key as keyof typeof timeLeft] > 0);
        })
        .map(([interval, value]) => {
            const unitMap: { [key: string]: string } = {
                days: 'يوم',
                hours: 'ساعة',
                minutes: 'دقيقة',
                seconds: 'ثانية',
            };
            return (
                <div key={interval} className="flex flex-col items-center p-2 bg-primary/10 rounded-lg min-w-[60px]">
                    <span className="text-3xl font-bold text-primary">{String(value).padStart(2, '0')}</span>
                    <span className="text-xs text-muted-foreground">{unitMap[interval]}</span>
                </div>
            );
        });

    if (!timerComponents.length) {
        return <span className="text-lg font-semibold animate-pulse text-green-600">الامتحان متاح الآن!</span>;
    }

    return (
        <div className="flex justify-center gap-2 sm:gap-4" dir="ltr">
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
                setUpcomingExam(nextExam);
                setIsVisible(true);
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
                <Card className="shadow-2xl border-2 border-primary/20 backdrop-blur-lg bg-background/80">
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                        <div className="flex items-center gap-3">
                            <Bell className="w-6 h-6 text-primary animate-pulse" />
                            <CardTitle>تنبيه لامتحان قادم</CardTitle>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-full"
                            onClick={handleDismiss}
                            >
                            <X className="h-4 w-4" />
                           </Button>
                    </CardHeader>
                    <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex-1 space-y-3 text-center md:text-start">
                            <h3 className="text-xl font-bold text-foreground">مستعد يا {currentUser?.username}؟</h3>
                            <p className="text-lg text-muted-foreground">{upcomingExam.title}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground justify-center md:justify-start pt-2">
                                <div className="flex items-center gap-2">
                                    <HelpCircle className="w-4 h-4 text-primary"/>
                                    <span>{upcomingExam.questionCount} سؤال</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4 text-primary"/>
                                    <span>{upcomingExam.duration} دقيقة</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Repeat className="w-4 h-4 text-primary"/>
                                    <span>{upcomingExam.attemptsAllowed} محاولة</span>
                                </div>
                            </div>
                        </div>
                         <div className="flex-shrink-0">
                           <p className="text-center text-sm text-muted-foreground mb-2">الوقت المتبقي للبدء:</p>
                           <CountdownTimer targetDate={upcomingExam.startDate!} />
                         </div>
                    </CardContent>
                    <CardFooter className="bg-muted/50 p-3 flex justify-center">
                         <Button asChild size="sm" variant="secondary">
                            <Link href="/my-exams">
                            الانتقال إلى صفحة الامتحانات
                            </Link>
                         </Button>
                    </CardFooter>
                </Card>
            </motion.div>
        </AnimatePresence>
    );
}
