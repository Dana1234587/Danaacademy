

'use client';

import { useStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileText, Settings2, Lock, ClipboardCheck, Award } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard-header';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';
import { MainLayout } from '@/components/layout/main-layout';
import { Loader2 } from 'lucide-react';

const courseId = 'tawjihi-2008-first-semester';

const courseStructure = {
  id: 'tawjihi-2008-first-semester',
  label: 'فيزياء توجيهي 2008 - فصل أول',
  icon: Folder,
  path: '/courses/physics-2008/physics-2008-first-semester',
  subItems: [
    {
      label: 'الفصل الأول',
      icon: Folder,
      path: '/courses/physics-2008/physics-2008-first-semester',
      subItems: [
        { 
          label: 'الوحدة الأولى: الزخم الخطي والتصادمات', 
          icon: Folder, 
          path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions', 
          dossierUrl: 'https://drive.google.com/file/d/1T5ugO6wI0y6f2PCt-mxD03JYwqZzBEEQ/view?usp=sharing',
          lessons: [
            { 
              title: 'الدرس الأول: الزخم الخطي والدفع', 
              topics: [
                { label: 'حصة رقم (1): مفهوم الزخم الخطي', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/1-linear-momentum-concept' },
                { label: 'حصة رقم (2): اسئلة الرسم البياني', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-graph-questions' },
                { label: 'حصة رقم (3): العلاقة بين الزخم الخطي والطاقة الحركية (شرح)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/3-relation-with-kinetic-energy' },
                { label: 'حصة رقم (4): العلاقة بين الزخم والطاقة الحركية (حل اسئلة تميز)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/4-relation-with-kinetic-energy-advanced' },
                { label: 'حصة رقم (5): التغير ومعدل التغير (حصة تأسيس)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/5-change-and-rate-of-change' },
                { label: 'حصة رقم (6): القانون الثاني لنيوتن بدلالة الزخم الخطي (شرح)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/6-newtons-second-law-explanation' },
                { label: 'حصة رقم (7): القانون الثاني لنيوتن بدلالة الزخم الخطي (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/7-newtons-second-law-questions' },
                { label: 'حصة رقم (8): العلاقة بين الزخم الخطي والدفع (شرح)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/8-momentum-impulse-relation-explanation' },
                { label: 'حصة رقم (9): العلاقة بين الزخم الخطي والدفع (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/9-momentum-impulse-relation-questions' },
                { label: 'حصة رقم (10): منحنى (القوة - الزمن)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/10-force-time-curve' },
                { label: 'حصة رقم (11): حفظ الزخم الخطي (شرح)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/11-momentum-conservation-explanation' },
                { label: 'حصة رقم (12): حفظ الزخم الخطي (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-questions' },
              ]
            },
            {
              title: 'الدرس الثاني: تطبيقات على حفظ الزخم الخطي',
              topics: [
                  { label: 'حصة رقم (14): حفظ الزخم الخطي عند اطلاق قذيفة', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/2-applications-of-momentum-conservation/1-projectile-motion' },
                  { label: 'حصة رقم (15): التصادمات (الجزء الأول)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/2-applications-of-momentum-conservation/2-collisions-p1' },
                  { label: 'حصة رقم (16): التصادمات (الجزء الثاني)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/2-applications-of-momentum-conservation/3-collisions-p2' },
                  { label: 'حصة رقم (17): التصادمات (الجزء الثالث)', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/2-applications-of-momentum-conservation/4-collisions-p3' },
                  { label: 'حصة رقم (18): البندول القذفي وكرات نيوتن', path: '/courses/physics-2008/physics-2008-first-semester/1-linear-momentum-and-collisions/2-applications-of-momentum-conservation/5-ballistic-pendulum' },
              ]
            },
          ]
        },
        { 
          label: 'الوحدة الثانية: الحركة الدورانية', 
          icon: Folder, 
          path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion',
          dossierUrl: 'https://drive.google.com/file/d/1Wr7G9xCmcuTWizaor2jMjxMoOinrhU2u/view?usp=sharing',
          lessons: [
            { 
              title: 'الدرس الأول: العزم والاتزان السكوني', 
              topics: [
                { label: 'حصة رقم (1): تأسيس', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/1-foundations' },
                { label: 'حصة رقم (2): العزم (شرح وأسئلة مفاهيمية)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/2-torque' },
                { label: 'حصة رقم (3): العزم (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/3-conceptual-questions' },
                { label: 'حصة رقم (4): عزم الازدواج', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/4-torque-questions' },
                { label: 'حصة رقم (5): مركز الكتلة', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/5-couple-torque' },
                { label: 'حصة رقم (6): الاتزان (شرح وحل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/6-equilibrium' },
                { label: 'حصة رقم (7): الاتزان (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/1-torque-and-static-equilibrium/7-equilibrium-explanation-and-questions' },
              ]
            },
            {
              title: 'الدرس الثاني: ديناميكا الحركة الدورانية',
              topics: [
                { label: 'حصة رقم (1): حصة تأسيس', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/2-rotational-dynamics/1-introductory-experiment' },
                { label: 'حصة رقم (9): ديناميكا الحركة الدورانية (شرح)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/2-rotational-dynamics/2-rotational-dynamics-explanation' },
                { label: 'حصة رقم (10): ديناميكا الحركة الدورانية (حل أسئلة)', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/2-rotational-dynamics/3-rotational-dynamics-questions' },
                { label: 'حصة رقم (11): القانون الثاني لنيوتن في الحركة الدورانية', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/2-rotational-dynamics/4-newtons-second-law-for-rotation' },
              ]
            },
             {
              title: 'الدرس الثالث: الزخم الزاوي',
              topics: [
                { label: 'حصة رقم (12): الطاقة الحركية الدورانية', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/3-angular-momentum/1-rotational-kinetic-energy' },
                { label: 'حصة رقم (13): الزخم الزاوي', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/3-angular-momentum/2-angular-momentum' },
                { label: 'حصة رقم (14): حفظ الزخم الزاوي', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/3-angular-momentum/3-angular-momentum-conservation' },
                { label: 'حصة رقم (15): أسئلة تميز', path: '/courses/physics-2008/physics-2008-first-semester/2-rotational-motion/3-angular-momentum/4-advanced-questions' }
              ]
            }
          ]
        },
        { 
          label: 'الوحدة الثالثة: الكهرباء السكونية', 
          icon: Folder, 
          path: '/courses/physics-2008/physics-2008-first-semester/3-static-electricity', 
          lessons: [
            { 
              title: 'الدرس الأول: المجال الكهربائي', 
              topics: [
                { label: 'حصة رقم (1): خطوط المجال الكهربائي (حصة تأسيس)', path: '/courses/physics-2008/physics-2008-first-semester/3-static-electricity/1-electric-field/1-electric-field-lines' },
                { label: 'حصة رقم (2): التدفق الكهربائي', path: '/courses/physics-2008/physics-2008-first-semester/3-static-electricity/1-electric-field/2-electric-flux' },
              ]
            }
          ]
        }
      ]
    },
  ]
};

function LessonContent({ lesson }: { lesson: any }) {
    const Icon = lesson.icon || FileText;

    if (lesson.isQuiz) {
        return (
             <Card className="border-primary/20 bg-primary/5">
                 <Link 
                    href={lesson.topics[0].path}
                    className="flex items-center justify-between p-4 text-lg font-semibold text-primary hover:bg-primary/10 transition-colors rounded-lg"
                 >
                    <div className="flex items-center gap-3">
                        <ClipboardCheck className="w-6 h-6"/>
                        <span>{lesson.title}</span>
                    </div>
                 </Link>
             </Card>
        )
    }

    if (lesson.icon) { 
        return (
             <Card className="border-yellow-500/30 bg-yellow-500/5">
                 <Link 
                    href={lesson.topics[0].path}
                    className="flex items-center justify-between p-4 text-lg font-semibold text-yellow-600 hover:bg-yellow-500/10 transition-colors rounded-lg"
                 >
                    <div className="flex items-center gap-3">
                        <Icon className="w-6 h-6"/>
                        <span>{lesson.title}</span>
                    </div>
                 </Link>
             </Card>
        )
    }
    
    return (
        <Collapsible defaultOpen={true} className="mb-4">
            <Card className="border-primary/20">
                <CollapsibleTrigger className="w-full text-start group">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/60 hover:bg-muted/80 transition-colors rounded-t-lg">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <CardTitle className="text-lg font-semibold text-foreground">{lesson.title}</CardTitle>
                        </div>
                        <Settings2 className="w-5 h-5 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-90" />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 md:p-6">
                        <ul className="space-y-3">
                            {lesson.topics.map((topic: any, topicIndex: number) => (
                                <li key={topicIndex}>
                                    <Link 
                                      href={`${topic.path}`} 
                                      className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        <FileText className="w-4 h-4 text-primary/50" />
                                        <span>{topic.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </CollapsibleContent>
            </Card>
        </Collapsible>
    );
}

export default function Physics2008FirstSemesterPage() {
  const { currentUser, isLoading } = useStore((state) => ({ 
    currentUser: state.currentUser,
    isLoading: state.isLoading 
  }));

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center h-screen">
          <Loader2 className="h-16 w-16 animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const isAuthorized = currentUser?.role === 'admin' || (currentUser?.role === 'student' && currentUser.enrolledCourseIds.includes(courseId));

  if (!isAuthorized) {
    return (
        <MainLayout>
            <div className="p-4 sm:p-6 lg:p-8 container mx-auto text-center">
                <Card className="max-w-md mx-auto mt-10">
                    <CardHeader>
                        <CardTitle className="flex items-center justify-center gap-2">
                            <Lock className="w-8 h-8 text-destructive" />
                            <span>محتوى مقيد</span>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg text-muted-foreground">
                            عذرًا، ليس لديك الصلاحية للوصول إلى محتوى هذه الدورة.
                        </p>
                        <p className="mt-2 text-sm">
                            يرجى التأكد من تسجيلك في دورة "فيزياء توجيهي 2008 - فصل أول".
                        </p>
                        <Button asChild className="mt-6">
                            <Link href="/">العودة إلى الصفحة الرئيسية</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </MainLayout>
    );
  }

  const welcomeMessage = currentUser?.gender === 'female' 
      ? `مرحبًا بكِ يا ${currentUser?.username || 'طالبتنا العزيزة'}`
      : `مرحبًا بك يا ${currentUser?.username || 'طالبنا العزيز'}`;


  return (
    <SidebarProvider>
      <div className="flex flex-col min-h-screen">
        <DashboardHeader />
        <main className="flex-1">
          <div className="p-4 sm:p-6 lg:p-8 container mx-auto">
            <div className="bg-primary/5 p-6 md:p-8 rounded-xl border border-primary/10 shadow-sm mb-8">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex-1">
                    <h1 className="text-2xl md:text-4xl font-bold text-primary">
                      {welcomeMessage} في دورة {courseStructure.label}
                    </h1>
                    <p className="mt-2 text-base md:text-lg text-muted-foreground">
                        نتمنى لك رحلة تعليمية ممتعة ومفيدة!
                    </p>
                  </div>
                   <Button asChild variant="outline" className="flex-shrink-0">
                      <Link href="/" className="flex items-center gap-2">
                          <Home className="h-4 h-4" />
                          العودة للرئيسية
                      </Link>
                  </Button>
              </div>
            </div>
              
            <div className="space-y-12">
                {courseStructure.subItems.map((semester, semIndex) => (
                    <div key={semIndex}>
                        <h2 className="text-3xl font-bold mb-6 text-center text-foreground/80 border-b-2 border-primary/20 pb-4">{semester.label}</h2>
                        <div className="space-y-8">
                            {semester.subItems.map((unit, unitIndex) => (
                                <div key={unitIndex}>
                                    <div className="flex justify-between items-center mb-4">
                                      <h3 className="text-2xl font-bold text-primary">{unit.label}</h3>
                                      {unit.dossierUrl && (
                                        <Button asChild variant="outline">
                                          <Link href={unit.dossierUrl} target="_blank">
                                            <FileText className="me-2 h-4 w-4" />
                                            تحميل دوسية الوحدة
                                          </Link>
                                        </Button>
                                      )}
                                    </div>
                                    <div className="space-y-4">
                                        {unit.lessons.map((lesson, lessonIndex) => (
                                            <LessonContent key={lessonIndex} lesson={lesson} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}

    