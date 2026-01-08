'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    BookOpen, Loader2, Trophy, Flame, Target,
    Video, CheckCircle, TrendingUp, Sparkles, Crown,
    Zap, Award, Star, ChevronLeft, Play, Clock, History, ArrowRight
} from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { useStore } from '@/store/app-store';
import { type LessonProgress } from '@/services/progressService';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

// قائمة الدورات المتاحة - يجب أن تتطابق مع courseId المحفوظ في Firestore
const courses = [
    {
        id: 'physics-2008', // courseId from video player
        name: 'فيزياء 2008 - الفصل الأول',
        gradient: 'from-blue-600 via-blue-500 to-cyan-400',
        icon: '⚡',
        totalLessons: 50
    },
    {
        id: 'physics-supplementary-2007',
        name: 'فيزياء تكميلي 2007',
        gradient: 'from-emerald-600 via-emerald-500 to-teal-400',
        icon: '🧪',
        totalLessons: 40
    },
    {
        id: 'physics-2008-foundation',
        name: 'أساسيات فيزياء 2008',
        gradient: 'from-purple-600 via-purple-500 to-pink-400',
        icon: '📐',
        totalLessons: 20
    },
];

interface CourseSummary {
    courseId: string;
    courseName: string;
    gradient: string;
    icon: string;
    totalLessons: number;
    completedLessons: number;
    averageProgress: number;
    videoAverage: number;
    quizAverage: number;
    lessons: LessonProgress[];
}

// Animated Counter Component
function AnimatedCounter({ value, suffix = '%' }: { value: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 1500;
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
    }, [value]);

    return <span>{count}{suffix}</span>;
}

// Circular Progress Ring
function ProgressRing({
    progress,
    size = 120,
    strokeWidth = 8,
    gradient = 'from-blue-500 to-cyan-400'
}: {
    progress: number;
    size?: number;
    strokeWidth?: number;
    gradient?: string;
}) {
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
                <span className="text-xs text-muted-foreground">مكتمل</span>
            </div>
        </div>
    );
}

// Achievement Badge
function AchievementBadge({
    icon: Icon,
    title,
    value,
    color
}: {
    icon: any;
    title: string;
    value: string;
    color: string;
}) {
    return (
        <motion.div
            whileHover={{ scale: 1.05, y: -5 }}
            className={cn(
                "relative overflow-hidden rounded-2xl p-4 text-white",
                color
            )}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/20 to-transparent" />
            <div className="relative z-10 flex items-center gap-3">
                <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm">
                    <Icon className="w-6 h-6" />
                </div>
                <div>
                    <p className="text-xs opacity-80">{title}</p>
                    <p className="text-xl font-bold">{value}</p>
                </div>
            </div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
        </motion.div>
    );
}

// Course Progress Card
function CourseCard({
    course,
    isSelected,
    onClick
}: {
    course: CourseSummary;
    isSelected: boolean;
    onClick: () => void;
}) {
    const isCompleted = course.averageProgress >= 80;

    return (
        <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onClick}
            className={cn(
                "relative cursor-pointer overflow-hidden rounded-3xl p-6 transition-all duration-300",
                `bg-gradient-to-br ${course.gradient}`,
                isSelected ? 'ring-4 ring-white/50 shadow-2xl' : 'hover:shadow-xl'
            )}
        >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 text-white">
                <div className="flex items-start justify-between mb-4">
                    <div>
                        <span className="text-4xl mb-2 block">{course.icon}</span>
                        <h3 className="text-xl font-bold">{course.courseName}</h3>
                    </div>
                    {isCompleted && (
                        <div className="bg-white/20 backdrop-blur-sm rounded-full p-2">
                            <Crown className="w-6 h-6 text-yellow-300" />
                        </div>
                    )}
                </div>

                <div className="space-y-3">
                    {/* Progress Bar */}
                    <div className="relative h-3 bg-black/20 rounded-full overflow-hidden">
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${course.averageProgress}%` }}
                            transition={{ duration: 1, ease: 'easeOut' }}
                            className="absolute h-full bg-white/90 rounded-full"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <span className="opacity-80">
                            {course.completedLessons} / {course.totalLessons} دروس
                        </span>
                        <span className="font-bold text-lg">{course.averageProgress}%</span>
                    </div>
                </div>

                <div className="flex gap-4 mt-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2">
                        <Video className="w-4 h-4 opacity-80" />
                        <span className="text-sm">{course.videoAverage}%</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 opacity-80" />
                        <span className="text-sm">{course.quizAverage}%</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

// Lesson Item
function LessonItem({ lesson }: { lesson: LessonProgress }) {
    const lessonName = lesson.lessonId.split('/').pop()?.replace(/-/g, ' ') || 'درس';
    const isCompleted = lesson.isCompleted;

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className={cn(
                "group relative overflow-hidden rounded-2xl border transition-all duration-300",
                isCompleted
                    ? "bg-gradient-to-r from-primary/5 to-primary/10 border-primary/30"
                    : "bg-card border-border hover:border-primary/50"
            )}
        >
            <div className="p-4 flex items-center gap-4">
                {/* Status Icon */}
                <div className={cn(
                    "relative w-12 h-12 rounded-xl flex items-center justify-center transition-colors",
                    isCompleted
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10"
                )}>
                    {isCompleted ? (
                        <CheckCircle className="w-6 h-6" />
                    ) : (
                        <Play className="w-5 h-5" />
                    )}
                    {isCompleted && (
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="absolute -top-1 -right-1 bg-yellow-400 text-yellow-900 rounded-full p-0.5"
                        >
                            <Star className="w-3 h-3 fill-current" />
                        </motion.div>
                    )}
                </div>

                {/* Lesson Info */}
                <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate capitalize">{lessonName}</h4>
                    <p className="text-xs text-muted-foreground truncate">
                        {lesson.unitId?.replace(/-/g, ' ')}
                    </p>
                </div>

                {/* Progress Stats */}
                <div className="flex items-center gap-4 text-sm">
                    <div className="text-center">
                        <div className="flex items-center gap-1 text-blue-500">
                            <Video className="w-3.5 h-3.5" />
                            <span className="font-medium">{lesson.videoProgress?.percentage || 0}%</span>
                        </div>
                    </div>
                    <div className="text-center">
                        <div className="flex items-center gap-1 text-green-500">
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span className="font-medium">{lesson.quizProgress?.percentage || 0}%</span>
                        </div>
                    </div>
                    <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-bold",
                        isCompleted
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground"
                    )}>
                        {lesson.overallProgress || 0}%
                    </div>
                </div>
            </div>

            {/* Progress Line */}
            <div className="h-1 bg-muted/50">
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${lesson.overallProgress || 0}%` }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={cn(
                        "h-full",
                        isCompleted ? "bg-primary" : "bg-gradient-to-r from-blue-500 to-primary"
                    )}
                />
            </div>
        </motion.div>
    );
}

// Activity Log Item
function ActivityItem({ activity }: { activity: any }) {
    const getIcon = () => {
        switch (activity.type) {
            case 'video_watch': return <Video className="w-4 h-4" />;
            case 'quiz_attempt': return <CheckCircle className="w-4 h-4" />;
            case 'lesson_complete': return <Trophy className="w-4 h-4" />;
            case 'login': return <Zap className="w-4 h-4" />;
            default: return <Clock className="w-4 h-4" />;
        }
    };

    const getColor = () => {
        switch (activity.type) {
            case 'video_watch': return 'bg-blue-500';
            case 'quiz_attempt': return 'bg-green-500';
            case 'lesson_complete': return 'bg-yellow-500';
            case 'login': return 'bg-purple-500';
            default: return 'bg-gray-500';
        }
    };

    const getMessage = () => {
        switch (activity.type) {
            case 'video_watch':
                return `شاهدت ${activity.details?.watchedSeconds || 30} ثانية`;
            case 'quiz_attempt':
                return `أجبت ${activity.details?.correctAnswers || 0}/${activity.details?.totalQuestions || 0}`;
            case 'lesson_complete':
                return 'أكملت الدرس ✨';
            case 'login':
                return 'سجلت دخول';
            default:
                return 'نشاط';
        }
    };

    const formatTime = (timestamp: any) => {
        if (!timestamp) return 'الآن';
        const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
        const now = new Date();
        const diff = now.getTime() - date.getTime();
        const minutes = Math.floor(diff / 60000);
        if (minutes < 1) return 'الآن';
        if (minutes < 60) return `منذ ${minutes} دقيقة`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `منذ ${hours} ساعة`;
        return `منذ ${Math.floor(hours / 24)} يوم`;
    };

    return (
        <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
            <div className={cn("p-2 rounded-full text-white", getColor())}>
                {getIcon()}
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                    {activity.details?.lessonId?.split('/').pop()?.replace(/-/g, ' ') || 'نشاط'}
                </p>
                <p className="text-xs text-muted-foreground">{getMessage()}</p>
            </div>
            <span className="text-xs text-muted-foreground">{formatTime(activity.createdAt)}</span>
        </div>
    );
}

export default function MyProgressPage() {
    const [courseSummaries, setCourseSummaries] = useState<CourseSummary[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [activityStats, setActivityStats] = useState<any>(null);
    const [viewingStudentName, setViewingStudentName] = useState<string | null>(null);
    const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
    const searchParams = useSearchParams();

    // للـ Admin: إمكانية عرض تقدم طالب معين باستخدام ?studentId=xxx
    const viewingStudentId = searchParams.get('studentId');
    const isAdminViewingStudent = currentUser?.role === 'admin' && viewingStudentId;
    const targetStudentId = isAdminViewingStudent ? viewingStudentId : currentUser?.uid;

    const fetchData = useCallback(async () => {
        if (!targetStudentId) return;
        setIsLoading(true);

        try {
            const summaries: CourseSummary[] = [];

            // استخدام fetch بدلاً من server actions
            for (const course of courses) {
                try {
                    const res = await fetch(
                        `/api/progress/course?studentId=${encodeURIComponent(targetStudentId)}&courseId=${encodeURIComponent(course.id)}`
                    );
                    const data = await res.json();

                    if (data.success) {
                        summaries.push({
                            courseId: course.id,
                            courseName: course.name,
                            gradient: course.gradient,
                            icon: course.icon,
                            ...data.summary,
                            totalLessons: data.summary.totalLessons || course.totalLessons,
                            lessons: data.lessons || [],
                        });
                    } else {
                        // Fallback with default values
                        summaries.push({
                            courseId: course.id,
                            courseName: course.name,
                            gradient: course.gradient,
                            icon: course.icon,
                            totalLessons: course.totalLessons,
                            completedLessons: 0,
                            averageProgress: 0,
                            videoAverage: 0,
                            quizAverage: 0,
                            lessons: [],
                        });
                    }
                } catch (err) {
                    console.error(`Error fetching ${course.id}:`, err);
                    summaries.push({
                        courseId: course.id,
                        courseName: course.name,
                        gradient: course.gradient,
                        icon: course.icon,
                        totalLessons: course.totalLessons,
                        completedLessons: 0,
                        averageProgress: 0,
                        videoAverage: 0,
                        quizAverage: 0,
                        lessons: [],
                    });
                }
            }

            setCourseSummaries(summaries);

            // Fetch activities
            try {
                const actRes = await fetch(`/api/admin/students/${targetStudentId}/activities?limit=10&includeStats=true`);
                const actData = await actRes.json();
                if (actData.success) {
                    setActivities(actData.activities || []);
                    setActivityStats(actData.stats || null);
                    // اسم الطالب للـ Admin
                    if (isAdminViewingStudent && actData.studentName) {
                        setViewingStudentName(actData.studentName);
                    }
                }
            } catch (e) {
                console.error('Error fetching activities:', e);
            }
        } catch (error) {
            console.error('Error fetching progress:', error);
        } finally {
            setIsLoading(false);
        }
    }, [targetStudentId, isAdminViewingStudent]);

    useEffect(() => {
        if (targetStudentId) {
            fetchData();
        } else {
            setIsLoading(false);
        }
    }, [fetchData, targetStudentId]);

    if (!currentUser && !isLoading) {
        return (
            <MarketingLayout>
                <div className="min-h-[60vh] flex items-center justify-center">
                    <Card className="max-w-md text-center p-8">
                        <Sparkles className="w-16 h-16 mx-auto mb-4 text-primary" />
                        <h2 className="text-2xl font-bold mb-2">مرحباً بك!</h2>
                        <p className="text-muted-foreground mb-6">سجل دخولك لتتبع تقدمك في الدورات</p>
                        <Button asChild size="lg">
                            <Link href="/login">تسجيل الدخول</Link>
                        </Button>
                    </Card>
                </div>
            </MarketingLayout>
        );
    }

    const selectedCourseData = selectedCourse
        ? courseSummaries.find(c => c.courseId === selectedCourse)
        : null;

    const totalProgress = courseSummaries.length > 0
        ? Math.round(courseSummaries.reduce((sum, c) => sum + c.averageProgress, 0) / courseSummaries.length)
        : 0;

    const totalCompleted = courseSummaries.reduce((sum, c) => sum + c.completedLessons, 0);
    const streak = activityStats?.lessonsCompleted || 0;
    const totalHours = activityStats?.totalVideoTime ? Math.round(activityStats.totalVideoTime / 3600) : 0;

    return (
        <MarketingLayout>
            <div className="min-h-screen">
                {/* Hero Section */}
                <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-background py-12 px-4">
                    <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />

                    <div className="relative container mx-auto">
                        {/* زر العودة للـ Admin */}
                        {isAdminViewingStudent && (
                            <div className="mb-6">
                                <Button asChild variant="outline" size="sm">
                                    <Link href="/admin" className="gap-2">
                                        <ArrowRight className="w-4 h-4" />
                                        العودة للوحة التحكم
                                    </Link>
                                </Button>
                            </div>
                        )}

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-center mb-8"
                        >
                            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
                                <Sparkles className="w-4 h-4" />
                                <span className="text-sm font-medium">
                                    {isAdminViewingStudent ? 'تفاصيل تقدم الطالب' : 'لوحة التقدم الخاصة بك'}
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold mb-4">
                                {isAdminViewingStudent ? (
                                    <>تقدم <span className="text-primary">{viewingStudentName || 'الطالب'}</span> 📊</>
                                ) : (
                                    <>مرحباً، <span className="text-primary">{currentUser?.username || 'طالب'}</span>! 👋</>
                                )}
                            </h1>
                            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                                {isAdminViewingStudent
                                    ? 'عرض تفصيلي لتقدم الطالب في جميع الدورات'
                                    : 'تابع تقدمك في الدورات واستمر في رحلة التعلم'
                                }
                            </p>
                        </motion.div>

                        {isLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                            </div>
                        ) : (
                            <>
                                {/* Stats Overview */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
                                >
                                    <AchievementBadge
                                        icon={Target}
                                        title="التقدم الكلي"
                                        value={`${totalProgress}%`}
                                        color="bg-gradient-to-br from-blue-600 to-cyan-500"
                                    />
                                    <AchievementBadge
                                        icon={Trophy}
                                        title="دروس مكتملة"
                                        value={totalCompleted.toString()}
                                        color="bg-gradient-to-br from-amber-500 to-orange-500"
                                    />
                                    <AchievementBadge
                                        icon={Flame}
                                        title="أيام متتالية"
                                        value={`${streak} 🔥`}
                                        color="bg-gradient-to-br from-red-500 to-pink-500"
                                    />
                                    <AchievementBadge
                                        icon={Clock}
                                        title="ساعات التعلم"
                                        value={totalHours > 0 ? `${totalHours}+` : '0'}
                                        color="bg-gradient-to-br from-purple-600 to-indigo-500"
                                    />
                                </motion.div>

                                {/* Course Cards */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="grid md:grid-cols-3 gap-6 mb-8"
                                >
                                    {courseSummaries.map((course) => (
                                        <CourseCard
                                            key={course.courseId}
                                            course={course}
                                            isSelected={selectedCourse === course.courseId}
                                            onClick={() => setSelectedCourse(
                                                selectedCourse === course.courseId ? null : course.courseId
                                            )}
                                        />
                                    ))}
                                </motion.div>

                                {/* Activity Log */}
                                {activities.length > 0 && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="mb-8"
                                    >
                                        <Card className="overflow-hidden">
                                            <CardHeader className="bg-muted/50">
                                                <CardTitle className="flex items-center gap-2">
                                                    <History className="w-5 h-5" />
                                                    آخر النشاطات
                                                </CardTitle>
                                                <CardDescription>
                                                    سجل نشاطك الأخير في المنصة
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="p-4">
                                                <div className="space-y-2">
                                                    {activities.slice(0, 5).map((activity, index) => (
                                                        <motion.div
                                                            key={activity.id || index}
                                                            initial={{ opacity: 0, x: -20 }}
                                                            animate={{ opacity: 1, x: 0 }}
                                                            transition={{ delay: index * 0.05 }}
                                                        >
                                                            <ActivityItem activity={activity} />
                                                        </motion.div>
                                                    ))}
                                                </div>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                )}
                            </>
                        )}
                    </div>
                </div>

                {/* Selected Course Details */}
                <AnimatePresence>
                    {selectedCourseData && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="container mx-auto px-4 py-8"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => setSelectedCourse(null)}
                                    >
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                    <div>
                                        <h2 className="text-2xl font-bold flex items-center gap-2">
                                            <span>{selectedCourseData.icon}</span>
                                            {selectedCourseData.courseName}
                                        </h2>
                                        <p className="text-muted-foreground">
                                            {selectedCourseData.lessons.length} دروس بدأتها
                                        </p>
                                    </div>
                                </div>
                                <ProgressRing progress={selectedCourseData.averageProgress} size={80} strokeWidth={6} />
                            </div>

                            {selectedCourseData.lessons.length === 0 ? (
                                <Card className="text-center py-12">
                                    <BookOpen className="w-16 h-16 mx-auto mb-4 text-muted-foreground/50" />
                                    <h3 className="text-xl font-semibold mb-2">ابدأ رحلتك! 🚀</h3>
                                    <p className="text-muted-foreground mb-6">لم تبدأ أي درس في هذه الدورة بعد</p>
                                    <Button asChild size="lg">
                                        <Link href={`/courses/${selectedCourseData.courseId}`}>
                                            ابدأ الدورة الآن
                                        </Link>
                                    </Button>
                                </Card>
                            ) : (
                                <div className="space-y-3">
                                    {selectedCourseData.lessons
                                        .sort((a, b) => (b.overallProgress || 0) - (a.overallProgress || 0))
                                        .map((lesson, index) => (
                                            <motion.div
                                                key={lesson.lessonId}
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.05 }}
                                            >
                                                <LessonItem lesson={lesson} />
                                            </motion.div>
                                        ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Empty State */}
                {!isLoading && courseSummaries.every(c => c.totalLessons === 0) && (
                    <div className="container mx-auto px-4 py-12">
                        <Card className="max-w-lg mx-auto text-center py-12">
                            <div className="relative inline-block mb-6">
                                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                                    <BookOpen className="w-12 h-12 text-primary" />
                                </div>
                                <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                                    className="absolute inset-0"
                                >
                                    <Sparkles className="w-6 h-6 text-yellow-500 absolute -top-1 right-0" />
                                </motion.div>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">ابدأ رحلة التعلم! 🎯</h3>
                            <p className="text-muted-foreground mb-6">
                                شاهد الفيديوهات وحل الأسئلة لتتبع تقدمك هنا
                            </p>
                            <Button asChild size="lg" className="gap-2">
                                <Link href="/courses">
                                    <Sparkles className="w-4 h-4" />
                                    استكشف الدورات
                                </Link>
                            </Button>
                        </Card>
                    </div>
                )}
            </div>
        </MarketingLayout>
    );
}
