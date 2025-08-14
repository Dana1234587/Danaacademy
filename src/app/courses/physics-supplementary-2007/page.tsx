
'use client';

import { MainLayout } from '@/components/layout/main-layout';
import { useStore } from '@/store/app-store';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Book, Atom, ClipboardCheck, Settings2, Folder, FileText } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';

const courseStructure = {
  id: 'tawjihi-2007-supplementary',
  label: 'التكميلي (جيل 2007)',
  icon: Book,
  path: '/courses/physics-supplementary-2007',
  subItems: [
    {
      label: 'الفصل الأول',
      icon: Folder,
      path: '/courses/physics-supplementary-2007/first-semester',
      subItems: [
        { 
          label: 'الوحدة الأولى: الزخم الخطي والتصادمات', 
          icon: Folder, 
          path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions', 
          lessons: [
            { 
              title: 'الدرس الأول: الزخم الخطي والدفع', 
              topics: [
                { label: 'مفهوم الزخم الخطي', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/1-linear-momentum-concept', content: true },
                { label: 'العلاقة مع طاقة الحركة', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-relation-with-kinetic-energy', content: true },
                { label: 'أسئلة قدرات عليا', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/3-advanced-questions', content: true },
                { label: 'أسئلة الرسم البياني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/4-graph-questions', content: true },
                { label: 'التغير ومعدل التغير', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/5-change-and-rate-of-change', content: true },
                { label: 'شرح قانون نيوتن الثاني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/6-newtons-second-law-explanation', content: true },
                { label: 'أسئلة على قانون نيوتن الثاني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/7-newtons-second-law-questions', content: true },
                { label: 'شرح مبرهنة (الزخم-الدفع)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/8-momentum-impulse-relation-explanation', content: true },
                { label: 'أسئلة على مبرهنة (الزخم-الدفع)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/9-momentum-impulse-relation-questions', content: true },
                { label: 'منحنى (القوة-الزمن)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/10-force-time-curve', content: true },
                { label: 'محاكاة حفظ الزخم', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/11-momentum-conservation-simulation', content: true },
                { label: 'شرح حفظ الزخم ج1', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-explanation-p1', content: true },
                { label: 'شرح حفظ الزخم ج2', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/13-momentum-conservation-explanation-p2', content: true },
                { label: 'ورقة عمل حفظ الزخم', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/14-momentum-conservation-worksheet', content: true },
              ]
            },
            { 
              title: 'الدرس الثاني: التصادمات', 
              topics: [
                { label: 'التصادمات ج1', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/1-collisions-p1', content: true },
                { label: 'التصادمات ج2', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/2-collisions-p2', content: true },
                { label: 'التصادمات ج3', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/3-collisions-p3', content: true },
                { label: 'البندول القذفي ومهد نيوتن', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/4-ballistic-pendulum-and-newtons-cradle', content: true },
              ]
            },
          ]
        },
        {
          label: 'الوحدة الثانية: الحركة الدورانية',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion',
          lessons: [
            {
              title: 'الدرس الأول: العزم والاتزان السكوني',
              topics: [
                { label: 'التأسيس', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/1-foundations', content: true },
                { label: 'عزم القوة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/2-torque', content: true },
                { label: 'أسئلة فكر', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/3-conceptual-questions', content: true },
                { label: 'أسئلة على العزم', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/4-torque-questions', content: true },
                { label: 'عزم الازدواج', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/5-couple-torque', content: true },
                { label: 'مركز الكتلة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/6-center-of-mass', content: true },
                { label: 'شرح وأسئلة الاتزان', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/7-equilibrium-explanation-and-questions', content: true },
                { label: 'أسئلة على الاتزان', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/8-equilibrium-questions', content: true },
              ]
            },
            {
              title: 'الدرس الثاني: ديناميكا الحركة الدورانية',
              topics: [
                { label: 'تجربة استهلالية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/1-introductory-experiment', content: true },
                { label: 'شرح ديناميكا الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/2-rotational-dynamics-explanation', content: true },
                { label: 'أسئلة ديناميكا الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/3-rotational-dynamics-questions', content: true },
                { label: 'قانون نيوتن الثاني في الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/4-newtons-second-law-for-rotation', content: true },
              ]
            },
            {
              title: 'الدرس الثالث: الزخم الزاوي',
              topics: [
                { label: 'طاقة الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/1-rotational-kinetic-energy', content: true },
                { label: 'الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/2-angular-momentum', content: true },
                { label: 'حفظ الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/3-angular-momentum-conservation', content: true },
                { label: 'أسئلة قدرات عليا', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/4-advanced-questions', content: true },
              ]
            }
          ]
        },
        // More Units here
      ]
    }
  ]
};

function LessonContent({ lesson }: { lesson: any }) {
    return (
        <Collapsible defaultOpen={false} className="mb-4">
            <Card className="border-primary/20">
                <CollapsibleTrigger className="w-full text-start">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/60 hover:bg-muted/80 transition-colors rounded-t-lg">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <CardTitle className="text-lg font-semibold text-foreground">{lesson.title}</CardTitle>
                            <div className="flex items-center w-full gap-2 text-xs text-muted-foreground">
                                <Progress value={0} className="w-1/3 h-2" />
                                <span>0% مكتمل</span>
                            </div>
                        </div>
                        <Settings2 className="w-5 h-5 text-muted-foreground" />
                    </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <CardContent className="p-4 md:p-6">
                        <ul className="space-y-3">
                            {lesson.topics.map((topic: any, topicIndex: number) => (
                                <li key={topicIndex}>
                                    <Link 
                                      href={`/${topic.path.split('/').slice(1, -1).join('/')}/${topic.path.split('/').pop()}/concepts`} 
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


export default function PhysicsSupplementary2007Page() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <MainLayout>
       <div className="p-4 sm:p-6 lg:p-8 container mx-auto">
            <div className="bg-primary/5 text-center p-8 rounded-xl border border-primary/10 shadow-sm mb-8">
                <h1 className="text-4xl font-bold text-primary">
                    مرحبًا بك يا {currentUser?.username || 'طالبنا العزيز'} في دورة فيزياء التكميلي - جيل 2007
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    نتمنى لك رحلة تعليمية ممتعة ومفيدة!
                </p>
            </div>
            
            <div className="space-y-12">
                {courseStructure.subItems.map((semester, semIndex) => (
                    <div key={semIndex}>
                        <h2 className="text-3xl font-bold mb-6 text-center text-foreground/80 border-b-2 border-primary/20 pb-4">{semester.label}</h2>
                        <div className="space-y-8">
                            {semester.subItems.map((unit, unitIndex) => (
                                <div key={unitIndex}>
                                    <h3 className="text-2xl font-bold mb-4 text-primary">{unit.label}</h3>
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
    </MainLayout>
  );
}

    