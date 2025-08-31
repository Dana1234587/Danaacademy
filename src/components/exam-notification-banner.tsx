
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
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';

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
        .filter(([, value]) => value >= 0)
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

    if (!Object.values(timeLeft).some(v => v > 0)) {
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
    const [upcomingExams, setUpcomingExams] = useState<Exam[]>([]);

    useEffect(() => {
      const findUpcomingExams = async () => {
        if (!currentUser || currentUser.role !== 'student') {
            setUpcomingExams([]);
            return;
        }

        try {
            const allExams = await getExams();
            const studentExams = allExams.filter(exam => 
                currentUser.enrolledCourseIds.includes(exam.courseId) &&
                exam.startDate && 
                isBefore(new Date(), exam.startDate)
            );

            const sortedExams = studentExams.sort((a, b) => a.startDate!.getTime() - b.startDate!.getTime());

            setUpcomingExams(sortedExams);
        } catch (error) {
            console.error("Failed to fetch upcoming exams for banner:", error);
            setUpcomingExams([]);
        }
      };

        findUpcomingExams();
    }, [currentUser]);
    
    const handleDismiss = (examId: string) => {
        setUpcomingExams(prevExams => prevExams.filter(exam => exam.id !== examId));
    };

    if (!upcomingExams.length) {
        return null;
    }

    return (
        <div className="fixed top-4 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:w-[95%] md:max-w-4xl z-50 flex flex-col gap-4">
             <AnimatePresence>
                {upcomingExams.map((exam, index) => (
                    <motion.div
                        key={exam.id}
                        initial={{ y: "-100%", opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ x: "100%", opacity: 0 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30, delay: index * 0.1 }}
                        layout
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
                                    onClick={() => handleDismiss(exam.id)}
                                    >
                                    <X className="h-4 w-4" />
                                </Button>
                            </CardHeader>
                            <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6">
                                <div className="flex-1 space-y-3 text-center md:text-start">
                                    <h3 className="text-xl font-bold text-foreground">{exam.title}</h3>
                                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-muted-foreground justify-center md:justify-start pt-2">
                                        <div className="flex items-center gap-2">
                                            <HelpCircle className="w-4 h-4 text-primary"/>
                                            <span>{exam.questionCount} سؤال</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-primary"/>
                                            <span>{exam.duration} دقيقة</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Repeat className="w-4 h-4 text-primary"/>
                                            <span>{exam.attemptsAllowed} محاولة</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-shrink-0">
                                <p className="text-center text-sm text-muted-foreground mb-2">الوقت المتبقي للبدء:</p>
                                <CountdownTimer targetDate={exam.startDate!} />
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
                ))}
            </AnimatePresence>
        </div>
    );
}
