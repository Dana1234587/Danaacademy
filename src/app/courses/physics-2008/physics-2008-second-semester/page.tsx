
'use client';

import { useStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileText, Lock, ChevronDown } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MainLayout } from '@/components/layout/main-layout';
import { Loader2 } from 'lucide-react';
import { TopicProgressItem, LessonProgressSummary } from '@/components/topic-progress-item';

const courseId = 'tawjihi-2008-second-semester';

const courseStructure = {
    id: 'tawjihi-2008-second-semester',
    label: 'فيزياء توجيهي 2008 - فصل ثاني',
    icon: Folder,
    path: '/courses/physics-2008/physics-2008-second-semester',
    subItems: [
        {
            label: 'الفصل الثاني',
            icon: Folder,
            path: '/courses/physics-2008/physics-2008-second-semester',
            subItems: [
                {
                    label: 'الوحدة الخامسة: المغناطيسية',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism',
                    lessons: [
                        // سيتم إضافة الدروس لاحقاً
                    ]
                },
                {
                    label: 'الوحدة السادسة: التيار المتردد والدارات الإلكترونية',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/6-ac-and-electronics',
                    lessons: [
                        // سيتم إضافة الدروس لاحقاً
                    ]
                },
                {
                    label: 'الوحدة السابعة: الفيزياء الحديثة',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics',
                    lessons: [
                        // سيتم إضافة الدروس لاحقاً
                    ]
                },
                {
                    label: 'الوحدة الثامنة: الفيزياء النووية',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/8-nuclear-physics',
                    lessons: [
                        // سيتم إضافة الدروس لاحقاً
                    ]
                }
            ]
        },
    ]
};

function LessonContent({ lesson }: { lesson: any }) {
    const Icon = lesson.icon || FileText;

    const topicPaths = lesson.topics?.map((t: any) => t.path) || [];

    if (!lesson.topics || lesson.topics.length === 0) {
        return (
            <Card className="border-muted">
                <CardHeader className="p-4 bg-muted/40">
                    <CardTitle className="text-lg font-bold text-muted-foreground flex items-center gap-2">
                        <Lock className="w-4 h-4" />
                        {lesson.title}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">قريباً...</p>
                </CardHeader>
            </Card>
        );
    }

    return (
        <Collapsible defaultOpen={true} className="mb-4">
            <Card className="border-primary/20 overflow-hidden">
                <CollapsibleTrigger className="w-full text-start group">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-muted/80 to-muted/40 hover:from-muted hover:to-muted/60 transition-all rounded-t-lg">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="flex flex-col items-start gap-2 flex-1">
                                <CardTitle className="text-lg font-bold text-foreground">{lesson.title}</CardTitle>
                                <LessonProgressSummary topicPaths={topicPaths} />
                            </div>
                            {lesson.dossierUrl && (
                                <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                    <Link href={lesson.dossierUrl} target="_blank">
                                        <FileText className="me-2 h-4 w-4" />
                                        دوسية الدرس
                                    </Link>
                                </Button>
                            )}
                        </div>
                        <ChevronDown className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 ms-2" />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 md:p-6 bg-card">
                        <div className="space-y-2">
                            {lesson.topics?.map((topic: any, topicIndex: number) => (
                                <TopicProgressItem
                                    key={topicIndex}
                                    path={topic.path}
                                    label={topic.label}
                                />
                            ))}
                        </div>
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

function UnitContent({ unit }: { unit: any }) {
    const hasLessons = unit.lessons && unit.lessons.length > 0;

    return (
        <Collapsible defaultOpen={hasLessons} className="mb-6">
            <Card className="border-2 border-primary/30 overflow-hidden shadow-lg">
                <CollapsibleTrigger className="w-full text-start group">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 transition-all">
                        <div className="flex items-center gap-4 flex-1">
                            <div className="p-3 rounded-xl bg-primary/10">
                                <Folder className="w-6 h-6 text-primary" />
                            </div>
                            <div className="flex flex-col items-start gap-1 flex-1">
                                <CardTitle className="text-xl font-bold text-foreground">{unit.label}</CardTitle>
                                {hasLessons ? (
                                    <p className="text-sm text-muted-foreground">{unit.lessons.length} دروس</p>
                                ) : (
                                    <p className="text-sm text-orange-500 flex items-center gap-1">
                                        <Lock className="w-3 h-3" /> قريباً...
                                    </p>
                                )}
                            </div>
                            {unit.dossierUrl && (
                                <Button asChild variant="outline" size="sm" onClick={(e) => e.stopPropagation()}>
                                    <Link href={unit.dossierUrl} target="_blank">
                                        <FileText className="me-2 h-4 w-4" />
                                        دوسية الوحدة
                                    </Link>
                                </Button>
                            )}
                        </div>
                        <ChevronDown className="w-6 h-6 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180 ms-2" />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 md:p-6 bg-card space-y-4">
                        {hasLessons ? (
                            unit.lessons.map((lesson: any, lessonIndex: number) => (
                                <LessonContent key={lessonIndex} lesson={lesson} />
                            ))
                        ) : (
                            <div className="text-center py-8 text-muted-foreground">
                                <Lock className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>محتوى هذه الوحدة قيد الإعداد</p>
                                <p className="text-sm mt-1">سيتم إضافة الدروس قريباً</p>
                            </div>
                        )}
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

export default function Physics2008SecondSemesterPage() {
    const { currentUser, isLoading } = useStore();

    if (isLoading) {
        return (
            <MainLayout>
                <div className="flex justify-center items-center h-[50vh]">
                    <Loader2 className="h-16 w-16 animate-spin text-primary" />
                </div>
            </MainLayout>
        );
    }

    const isAdmin = currentUser?.role === 'admin';
    const isEnrolledStudent = currentUser?.role === 'student' && currentUser.enrolledCourseIds?.includes(courseId);
    const isAuthorized = isAdmin || isEnrolledStudent;

    if (!isAuthorized) {
        return null; // Layout handles unauthorized
    }

    const semester = courseStructure.subItems[0];
    const units = semester.subItems;

    return (
        <MainLayout>
            <div className="p-4 sm:p-6 lg:p-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10">
                            <Folder className="w-8 h-8 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">{courseStructure.label}</h1>
                            <p className="text-muted-foreground">الفصل الدراسي الثاني - جيل 2008</p>
                        </div>
                    </div>
                </div>

                {/* Units */}
                <div className="space-y-6">
                    {units.map((unit, unitIndex) => (
                        <UnitContent key={unitIndex} unit={unit} />
                    ))}
                </div>
            </div>
        </MainLayout>
    );
}
