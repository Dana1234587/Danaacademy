
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
                        {
                            title: 'الدرس الأول: المجال المغناطيسي الناتج عن تيار',
                            topics: [
                                { label: 'حصة رقم (1): مفهوم المجال المغناطيسي', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/1-magnetic-field-concept' },
                                { label: 'حصة رقم (2): قانون بيو-سافار', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/2-biot-savart-law' },
                                { label: 'حصة رقم (3): المجال المغناطيسي الناشئ عن مرور تيار في سلك طويل', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/3-field-from-long-wire' },
                                { label: 'حصة رقم (4): المجال المغناطيسي الناشئ عن حلقة دائرية', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/4-field-from-circular-loop' },
                                { label: 'حصة رقم (5): المجال المغناطيسي الناشئ عن مرور تيار في ملف لولبي', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/5-field-from-solenoid' },
                                { label: 'حصة رقم (6): نقطة انعدام المجال المغناطيسي', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/1-magnetic-field-from-current/6-zero-field-point' },
                            ]
                        },
                        {
                            title: 'الدرس الثاني: القوة المغناطيسية',
                            topics: [
                                { label: 'حصة رقم (1): القوة المغناطيسية المؤثرة في شحنة متحركة', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/2-magnetic-force/1-force-on-moving-charge' },
                                { label: 'حصة رقم (2): حركة جسيم مشحون في مجال مغناطيسي منتظم', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/2-magnetic-force/2-charged-particle-motion' },
                                { label: 'حصة رقم (3): القوة المغناطيسية المؤثرة في موصل', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/2-magnetic-force/3-force-on-conductor' },
                                { label: 'حصة رقم (4): عزم الازدواج وتطبيقات تكنولوجية', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/2-magnetic-force/4-torque-and-applications' },
                                { label: 'حصة رقم (5): القوة المغناطيسية المتبادلة بين موصلين متوازيين', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/2-magnetic-force/5-mutual-force' },
                            ]
                        },
                        {
                            title: 'الدرس الثالث: الحث الكهرومغناطيسي',
                            topics: [
                                { label: 'حصة رقم (1): مفهوم التدفق المغناطيسي (شرح)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/1-magnetic-flux-concept' },
                                { label: 'حصة رقم (2): مفهوم التدفق المغناطيسي (حل أسئلة)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/2-magnetic-flux-questions' },
                                { label: 'حصة رقم (3): مفهوم الحث الكهرومغناطيسي', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/3-electromagnetic-induction-concept' },
                                { label: 'حصة رقم (4): قانون فاراداي في الحث الكهرومغناطيسي', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/4-faradays-law' },
                                { label: 'حصة رقم (5): حل أسئلة الرسم البياني', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/5-graph-questions' },
                                { label: 'حصة رقم (6): القوة الدافعة الكهربائية الحثية المتولدة في موصل متحرك', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/6-emf-in-moving-conductor' },
                                { label: 'حصة رقم (7): حل ورقة العمل', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/7-worksheet-solutions' },
                                { label: 'حصة رقم (8): قانون لنز (شرح)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/8-lenz-law-p1' },
                                { label: 'حصة رقم (9): قانون لنز (حل أسئلة)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/9-lenz-law-p2' },
                                { label: 'حصة رقم (10): الحث الذاتي (شرح)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/10-self-induction-concept' },
                                { label: 'حصة رقم (11): الحث الذاتي (حل أسئلة)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-electromagnetic-induction/11-self-induction-questions' },
                            ]
                        }
                    ]
                },
                {
                    label: 'أسئلة الكتاب وكتاب الأنشطة',
                    icon: FileText,
                    path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-book-questions-and-activities',
                    lessons: [
                        {
                            title: 'حل أسئلة الكتاب والأنشطة',
                            topics: [
                                { label: 'حل أسئلة الكتاب (الدرس الأول)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-book-questions-and-activities/1-textbook-questions-lesson-1' },
                                { label: 'حل أسئلة الكتاب (الدرس الثاني)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-book-questions-and-activities/2-textbook-questions-lesson-2' },
                                { label: 'حل أسئلة الكتاب (الدرس الثالث)', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-book-questions-and-activities/textbook-questions-lesson-3' },
                                { label: 'حل أسئلة كتاب الأنشطة', path: '/courses/physics-2008/physics-2008-second-semester/5-magnetism/3-book-questions-and-activities/3-activity-book-questions' }
                            ]
                        }
                    ]
                },
                {
                    label: 'الوحدة السادسة: التيار المتردد والدارات الإلكترونية',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits',
                    lessons: [
                      {
                        title: 'الدرس الأول: التيار المتردد',
                        topics: [
                          { label: 'حصة رقم (1): فرق الجهد المتردد', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/1-ac-voltage' },
                          { label: 'حصة رقم (2): دارات التيار المتردد', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/2-ac-circuits' },
                          { label: 'حصة رقم (3): ملخص قوانين الدارات التيار المتردد', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/3-summary-laws' },
                          { label: 'حصة رقم (4): حل أسئلة على دارات التيار المتردد', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/4-questions' },
                          { label: 'حصة رقم (5): المعاوقة', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/5-impedance' },
                          { label: 'حصة رقم (6): دارة RLC', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/6-rlc-circuit' },
                          { label: 'حصة رقم (7): المحول الكهربائي (شرح وحل أسئلة)', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/7-transformer' },
                          { label: 'حصة رقم (8): المحول الكهربائي (حل ورقة العمل)', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/8-transformer-worksheet' }
                        ]
                      },
                      {
                        title: 'الدرس الثاني: الدارات الإلكترونية',
                        topics: [
                          { label: 'حصة رقم (1): الإشابة', path: '/courses/physics-2008/physics-2008-second-semester/6-ac-circuits/9-doping' }
                        ]
                      }
                    ]
                },
                {
                    label: 'الوحدة السابعة: الفيزياء الحديثة',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics',
                    lessons: [
                      {
                        title: 'الدرس الأول: الطبيعة الجسيمية للضوء',
                        topics: [
                          { label: 'حصة رقم (1): مبدأ تكمية الطاقة', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/1-energy-quantization' },
                          { label: 'حصة رقم (2): اشعاع الجسم الاسود', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/2-black-body-radiation' },
                          { label: 'حصة رقم (3): الظاهرة الكهروضوئية 1', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/3-photoelectric-effect-1' },
                          { label: 'حصة رقم (4): الظاهرة الكهروضوئية 2', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/4-photoelectric-effect-2' },
                          { label: 'حصة رقم (5): الظاهرة الكهروضوئية 3', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/5-photoelectric-effect-3' },
                          { label: 'حصة رقم (6): ظاهرة كومبتون', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/1-particle-nature-of-light/6-compton-effect' }
                        ]
                      },
                      {
                        title: 'الدرس الثاني: التركيب الذري',
                        topics: [
                          { label: 'حصة رقم (7): فرضيات بور', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/2-atomic-structure/1-bohr-hypotheses' },
                          { label: 'حصة رقم (8): الاطياف الذرية', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/2-atomic-structure/2-atomic-spectra' },
                          { label: 'حصة رقم (9): دي بروي', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/2-atomic-structure/3-de-broglie' }
                        ]
                      },
                      {
                        title: 'حل أسئلة الفصل',
                        topics: [
                          { label: 'حصة رقم (10): حل أسئلة الفصل', path: '/courses/physics-2008/physics-2008-second-semester/7-modern-physics/3-chapter-questions' }
                        ]
                      }
                    ]
                },
                {
                    label: 'الوحدة الثامنة: الفيزياء النووية',
                    icon: Folder,
                    path: '/courses/physics-2008/physics-2008-second-semester/8-nuclear-physics',
                    lessons: [
                    ]
                }
            ]
        }
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
                                    topic={topic}
                                    index={topicIndex}
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
