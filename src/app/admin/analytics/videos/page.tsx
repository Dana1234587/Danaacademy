'use client';

import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BarChart2, Users, BookOpen, Clock, TrendingUp, Loader2, Flame, PieChart as PieChartIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend,
    LineChart,
    Line,
    Area,
    AreaChart,
} from 'recharts';

interface VideoAnalyticsData {
    studentId: string;
    studentName: string;
    lessonId: string;
    lessonName: string;
    courseId: string;
    watchedSeconds: number;
    totalSeconds: number;
    percentage: number;
    lastPosition: number;
    updatedAt: Date | null;
}

interface HeatmapData {
    lessonId: string;
    lessonName: string;
    totalStudents: number;
    avgPercentage: number;
    completionRate: number;
    totalWatchTime: number;
}

interface Summary {
    totalStudents: number;
    totalLessons: number;
    avgProgress: number;
    totalWatchTime: number;
}

const COLORS = ['#22c55e', '#84cc16', '#eab308', '#f97316', '#ef4444'];
const CHART_COLORS = ['#8b5cf6', '#06b6d4', '#10b981', '#f59e0b', '#ec4899', '#6366f1'];

function formatTime(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)} ث`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} د ${Math.round(seconds % 60)} ث`;
    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    return `${hours} س ${mins} د`;
}

function formatTimeShort(seconds: number): string {
    if (seconds < 60) return `${Math.round(seconds)}ث`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}د`;
    return `${Math.floor(seconds / 3600)}س`;
}

function getHeatColor(percentage: number): string {
    if (percentage >= 80) return 'bg-green-500';
    if (percentage >= 60) return 'bg-lime-500';
    if (percentage >= 40) return 'bg-yellow-500';
    if (percentage >= 20) return 'bg-orange-500';
    return 'bg-red-500';
}

function getProgressBadge(percentage: number) {
    if (percentage >= 80) return <Badge className="bg-green-500">ممتاز</Badge>;
    if (percentage >= 60) return <Badge className="bg-lime-500">جيد جداً</Badge>;
    if (percentage >= 40) return <Badge className="bg-yellow-500">متوسط</Badge>;
    if (percentage >= 20) return <Badge className="bg-orange-500">ضعيف</Badge>;
    return <Badge className="bg-red-500">بداية</Badge>;
}

function getProgressCategory(percentage: number): string {
    if (percentage >= 80) return 'ممتاز (80%+)';
    if (percentage >= 60) return 'جيد جداً (60-79%)';
    if (percentage >= 40) return 'متوسط (40-59%)';
    if (percentage >= 20) return 'ضعيف (20-39%)';
    return 'بداية (0-19%)';
}

export default function VideoAnalyticsPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [analytics, setAnalytics] = useState<VideoAnalyticsData[]>([]);
    const [heatmap, setHeatmap] = useState<HeatmapData[]>([]);
    const [summary, setSummary] = useState<Summary>({ totalStudents: 0, totalLessons: 0, avgProgress: 0, totalWatchTime: 0 });

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/admin/analytics/videos');
            if (!response.ok) throw new Error('فشل في جلب البيانات');

            const data = await response.json();
            setAnalytics(data.analytics || []);
            setHeatmap(data.heatmap || []);
            setSummary(data.summary || { totalStudents: 0, totalLessons: 0, avgProgress: 0, totalWatchTime: 0 });
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    // بيانات الرسم البياني الدائري - توزيع التقدم
    const getPieData = () => {
        const categories: Record<string, number> = {
            'ممتاز (80%+)': 0,
            'جيد جداً (60-79%)': 0,
            'متوسط (40-59%)': 0,
            'ضعيف (20-39%)': 0,
            'بداية (0-19%)': 0,
        };

        analytics.forEach(record => {
            const category = getProgressCategory(record.percentage);
            categories[category]++;
        });

        return Object.entries(categories)
            .filter(([_, value]) => value > 0)
            .map(([name, value]) => ({ name, value }));
    };

    // بيانات الرسم البياني الشريطي - أفضل الدروس
    const getBarData = () => {
        return heatmap.slice(0, 6).map(lesson => ({
            name: lesson.lessonName.length > 15 ? lesson.lessonName.substring(0, 15) + '...' : lesson.lessonName,
            progress: lesson.avgPercentage,
            students: lesson.totalStudents,
            watchTime: Math.round(lesson.totalWatchTime / 60), // بالدقائق
        }));
    };

    // بيانات الرسم البياني الخطي - وقت المشاهدة لكل درس
    const getLineData = () => {
        return heatmap.map((lesson, index) => ({
            name: `درس ${index + 1}`,
            fullName: lesson.lessonName,
            watchTime: Math.round(lesson.totalWatchTime / 60),
            students: lesson.totalStudents,
        }));
    };

    if (loading) {
        return (
            <div className="p-8 flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="mr-2">جاري تحميل التحليلات...</span>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8">
                <Card className="border-red-500">
                    <CardContent className="pt-6">
                        <p className="text-red-500 text-center">خطأ: {error}</p>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const pieData = getPieData();
    const barData = getBarData();
    const lineData = getLineData();

    return (
        <div className="p-4 sm:p-6 lg:p-8 space-y-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold flex items-center gap-3">
                    <BarChart2 className="w-8 h-8 text-primary" />
                    تحليلات تفاعل الطلاب
                </h1>
                <p className="mt-2 text-muted-foreground">
                    عرض تحليلات تفصيلية لتفاعل الطلاب مع الفيديوهات التعليمية
                </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-blue-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-blue-500/20">
                                <Users className="w-6 h-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">الطلاب النشطين</p>
                                <p className="text-2xl font-bold">{summary.totalStudents}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-green-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-green-500/20">
                                <BookOpen className="w-6 h-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">الدروس المتابعة</p>
                                <p className="text-2xl font-bold">{summary.totalLessons}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-purple-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-purple-500/20">
                                <TrendingUp className="w-6 h-6 text-purple-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">متوسط التقدم</p>
                                <p className="text-2xl font-bold">{summary.avgProgress}%</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-500/10 to-orange-600/5 border-orange-500/20">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-full bg-orange-500/20">
                                <Clock className="w-6 h-6 text-orange-500" />
                            </div>
                            <div>
                                <p className="text-sm text-muted-foreground">إجمالي المشاهدة</p>
                                <p className="text-2xl font-bold">{formatTime(summary.totalWatchTime)}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Bar Chart - Progress per Lesson */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <BarChart2 className="w-5 h-5 text-primary" />
                            تقدم الطلاب حسب الدرس
                        </CardTitle>
                        <CardDescription>متوسط نسبة الإكمال لكل درس</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {barData.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">لا توجد بيانات</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={barData} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                                    <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
                                    <Tooltip
                                        formatter={(value: number) => [`${value}%`, 'التقدم']}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Bar dataKey="progress" fill="#8b5cf6" radius={[0, 4, 4, 0]}>
                                        {barData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={CHART_COLORS[index % CHART_COLORS.length]} />
                                        ))}
                                    </Bar>
                                </BarChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>

                {/* Pie Chart - Progress Distribution */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <PieChartIcon className="w-5 h-5 text-primary" />
                            توزيع مستويات التقدم
                        </CardTitle>
                        <CardDescription>تصنيف الطلاب حسب نسبة الإنجاز</CardDescription>
                    </CardHeader>
                    <CardContent>
                        {pieData.length === 0 ? (
                            <p className="text-muted-foreground text-center py-8">لا توجد بيانات</p>
                        ) : (
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={pieData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                        label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                                    >
                                        {pieData.map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        formatter={(value: number) => [`${value} طالب`, 'العدد']}
                                        contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Area Chart - Watch Time Trend */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-primary" />
                        وقت المشاهدة لكل درس
                    </CardTitle>
                    <CardDescription>إجمالي دقائق المشاهدة من جميع الطلاب</CardDescription>
                </CardHeader>
                <CardContent>
                    {lineData.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">لا توجد بيانات</p>
                    ) : (
                        <ResponsiveContainer width="100%" height={250}>
                            <AreaChart data={lineData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorWatchTime" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                                <YAxis tickFormatter={(v) => `${v}د`} />
                                <Tooltip
                                    formatter={(value: number, name: string) => [
                                        name === 'watchTime' ? `${value} دقيقة` : value,
                                        name === 'watchTime' ? 'وقت المشاهدة' : 'عدد الطلاب'
                                    ]}
                                    labelFormatter={(label, payload) => payload?.[0]?.payload?.fullName || label}
                                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="watchTime"
                                    stroke="#8b5cf6"
                                    fillOpacity={1}
                                    fill="url(#colorWatchTime)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    )}
                </CardContent>
            </Card>

            {/* Heatmap */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-orange-500" />
                        خريطة التفاعل الحرارية للدروس
                    </CardTitle>
                    <CardDescription>
                        تعرض مستوى تفاعل الطلاب مع كل درس - اللون الأخضر يعني تفاعل عالي
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {heatmap.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">لا توجد بيانات بعد</p>
                    ) : (
                        <div className="space-y-3">
                            {heatmap.map((lesson, index) => (
                                <div key={lesson.lessonId} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-sm font-medium">
                                        {index + 1}
                                    </div>

                                    <div className="flex-grow min-w-0">
                                        <p className="font-medium truncate">{lesson.lessonName}</p>
                                        <p className="text-xs text-muted-foreground">
                                            {lesson.totalStudents} طالب • {formatTime(lesson.totalWatchTime)} مشاهدة
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="flex-shrink-0 w-32">
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full ${getHeatColor(lesson.avgPercentage)} transition-all`}
                                                style={{ width: `${lesson.avgPercentage}%` }}
                                            />
                                        </div>
                                        <p className="text-xs text-center mt-1">{lesson.avgPercentage}%</p>
                                    </div>

                                    {getProgressBadge(lesson.avgPercentage)}
                                </div>
                            ))}
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Detailed Table */}
            <Card>
                <CardHeader>
                    <CardTitle>تفاصيل مشاهدة الطلاب</CardTitle>
                    <CardDescription>جدول تفصيلي لكل طالب ودرس</CardDescription>
                </CardHeader>
                <CardContent>
                    {analytics.length === 0 ? (
                        <p className="text-muted-foreground text-center py-8">لا توجد بيانات بعد</p>
                    ) : (
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead className="text-right">الطالب</TableHead>
                                        <TableHead className="text-right">الدرس</TableHead>
                                        <TableHead className="text-right">المشاهدة</TableHead>
                                        <TableHead className="text-right">النسبة</TableHead>
                                        <TableHead className="text-right">الحالة</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {analytics.slice(0, 20).map((record, index) => (
                                        <TableRow key={`${record.studentId}-${record.lessonId}-${index}`}>
                                            <TableCell className="font-medium">{record.studentName}</TableCell>
                                            <TableCell className="max-w-[200px] truncate">{record.lessonName}</TableCell>
                                            <TableCell>{formatTime(record.watchedSeconds)}</TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                                                        <div
                                                            className={`h-full ${getHeatColor(record.percentage)}`}
                                                            style={{ width: `${record.percentage}%` }}
                                                        />
                                                    </div>
                                                    <span className="text-sm">{record.percentage}%</span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{getProgressBadge(record.percentage)}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                            {analytics.length > 20 && (
                                <p className="text-center text-sm text-muted-foreground mt-4">
                                    يتم عرض أول 20 سجل من {analytics.length}
                                </p>
                            )}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
