
'use client';

import { useStore } from '@/store/app-store';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Folder, FileText, Settings2 } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Progress } from '@/components/ui/progress';
import Link from 'next/link';
import { DashboardHeader } from '@/components/dashboard-header';

const courseStructure = {
  id: 'tawjihi-2007-supplementary',
  label: 'التكميلي (جيل 2007)',
  icon: Folder,
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
                { label: 'مفهوم الزخم الخطي', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/1-linear-momentum-concept' },
                { label: 'العلاقة مع طاقة الحركة', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-relation-with-kinetic-energy' },
                { label: 'أسئلة قدرات عليا', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/3-advanced-questions' },
                { label: 'أسئلة الرسم البياني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/4-graph-questions' },
                { label: 'التغير ومعدل التغير', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/5-change-and-rate-of-change' },
                { label: 'شرح قانون نيوتن الثاني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/6-newtons-second-law-explanation' },
                { label: 'أسئلة على قانون نيوتن الثاني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/7-newtons-second-law-questions' },
                { label: 'شرح مبرهنة (الزخم-الدفع)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/8-momentum-impulse-relation-explanation' },
                { label: 'أسئلة على مبرهنة (الزخم-الدفع)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/9-momentum-impulse-relation-questions' },
                { label: 'منحنى (القوة-الزمن)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/10-force-time-curve' },
                { label: 'محاكاة حفظ الزخم', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/11-momentum-conservation-simulation' },
                { label: 'شرح حفظ الزخم ج1', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-explanation-p1' },
                { label: 'شرح حفظ الزخم ج2', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/13-momentum-conservation-explanation-p2' },
                { label: 'ورقة عمل حفظ الزخم', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/14-momentum-conservation-worksheet' },
              ]
            },
            { 
              title: 'الدرس الثاني: التصادمات', 
              topics: [
                { label: 'التصادمات ج1', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/1-collisions-p1' },
                { label: 'التصادمات ج2', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/2-collisions-p2' },
                { label: 'التصادمات ج3', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/3-collisions-p3' },
                { label: 'البندول القذفي ومهد نيوتن', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/4-ballistic-pendulum-and-newtons-cradle' },
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
                { label: 'التأسيس', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/1-foundations' },
                { label: 'عزم القوة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/2-torque' },
                { label: 'أسئلة فكر', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/3-conceptual-questions' },
                { label: 'أسئلة على العزم', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/4-torque-questions' },
                { label: 'عزم الازدواج', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/5-couple-torque' },
                { label: 'مركز الكتلة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/6-center-of-mass' },
                { label: 'شرح وأسئلة الاتزان', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/7-equilibrium-explanation-and-questions' },
                { label: 'أسئلة على الاتزان', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/8-equilibrium-questions' },
              ]
            },
            {
              title: 'الدرس الثاني: ديناميكا الحركة الدورانية',
              topics: [
                { label: 'تجربة استهلالية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/1-introductory-experiment' },
                { label: 'شرح ديناميكا الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/2-rotational-dynamics-explanation' },
                { label: 'أسئلة ديناميكا الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/3-rotational-dynamics-questions' },
                { label: 'قانون نيوتن الثاني في الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/4-newtons-second-law-for-rotation' },
              ]
            },
            {
              title: 'الدرس الثالث: الزخم الزاوي',
              topics: [
                { label: 'طاقة الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/1-rotational-kinetic-energy' },
                { label: 'الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/2-angular-momentum' },
                { label: 'حفظ الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/3-angular-momentum-conservation' },
                { label: 'أسئلة قدرات عليا', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/4-advanced-questions' },
              ]
            }
          ]
        },
        { 
          label: 'الوحدة الثالثة: التيار الكهربائي', 
          icon: Folder, 
          path: '/courses/physics-supplementary-2007/first-semester/3-electric-current', 
          lessons: [
            { 
              title: 'الدرس الأول: المقاومة والقوة الدافعة الكهربائية', 
              topics: [
                { label: 'مفهوم التيار الكهربائي', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/1-current-concept' },
                { label: 'المقاومة الكهربائية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/2-electrical-resistance' },
                { label: 'المقاومية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/3-resistivity' },
                { label: 'أسئلة قدرات عليا على المقاومية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/4-resistivity-advanced-questions' },
                { label: 'قانون أوم', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/5-ohms-law' },
                { label: 'القوة الدافعة الكهربائية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/6-electromotive-force' },
                { label: 'تغيرات الجهد ج1', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/7-voltage-changes-p1' },
                { label: 'تغيرات الجهد ج2', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/8-voltage-changes-p2' },
              ]
            },
            { 
              title: 'الدرس الثاني: القدرة والدارات البسيطة', 
              topics: [
                { label: 'القدرة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/1-power' },
                { label: 'إعادة شرح القدرة والطاقة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/2-power-energy-redo' },
                { label: 'أسئلة الكتاب على القدرة والطاقة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/3-power-energy-book-questions' },
                { label: 'أسئلة فلسطين على القدرة والطاقة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/4-power-energy-palestine-questions' },
              ]
            },
            { 
              title: 'الدرس الثالث: توصيل المقاومات وقاعدتا كيرشوف', 
              topics: [
                { label: 'توصيل المقاومات', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/1-resistor-connections' },
                { label: 'توصيل المقاومات (قدرات عليا)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/2-resistor-connections-advanced' },
                { label: 'الدارة البسيطة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/3-simple-circuits' },
                { label: 'أمثلة إضافية على الدارة البسيطة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/4-simple-circuits-extra-examples' },
                { label: 'قاعدة كيرشوف الأولى', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/5-kirchhoffs-first-rule' },
                { label: 'قاعدة كيرشوف الثانية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/6-kirchhoffs-second-rule' },
                { label: 'قاعدتا كيرشوف', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/7-kirchhoffs-rules' },
                { label: 'أمثلة إضافية على كيرشوف 1', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/8-kirchhoffs-extra-examples-1' },
                { label: 'أمثلة إضافية على كيرشوف 2', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/9-kirchhoffs-extra-examples-2' },
              ]
            }
          ]
        },
        {
          label: 'الوحدة الرابعة: المجال المغناطيسي',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field',
          lessons: [
            {
              title: 'الدرس الأول: المجال المغناطيسي الناتج عن تيار',
              topics: [
                { label: 'مفهوم المجال المغناطيسي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/1-magnetic-field-concept' },
                { label: 'قانون بايوت-سافارت', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/2-biot-savart-law' },
                { label: 'المجال من سلك طويل', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/3-field-from-long-wire' },
                { label: 'المجال من حلقة دائرية', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/4-field-from-circular-loop' },
                { label: 'المجال من ملف لولبي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/5-field-from-solenoid' },
                { label: 'نقطة انعدام المجال المغناطيسي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/6-zero-magnetic-field-point' },
              ]
            },
            {
              title: 'الدرس الثاني: القوة المغناطيسية',
              topics: [
                { label: 'القوة على شحنة متحركة', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/1-force-on-moving-charge' },
                { label: 'حركة شحنة في مجال منتظم', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/2-charge-motion-in-uniform-field' },
                { label: 'القوة على موصل', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/3-force-on-conductor' },
                { label: 'القوة بين موصلين متوازيين', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/4-force-between-parallel-conductors' },
                { label: 'عزم الازدواج وتطبيقاته', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/5-couple-torque-and-applications' },
              ]
            }
          ]
        },
      ]
    }
  ]
};

function LessonContent({ lesson }: { lesson: any }) {
    return (
        <Collapsible defaultOpen={false} className="mb-4">
            <Card className="border-primary/20">
                <CollapsibleTrigger className="w-full text-start group">
                    <CardHeader className="flex flex-row items-center justify-between p-4 bg-muted/60 hover:bg-muted/80 transition-colors rounded-t-lg">
                        <div className="flex flex-col items-start gap-2 flex-1">
                            <CardTitle className="text-lg font-semibold text-foreground">{lesson.title}</CardTitle>
                            <div className="flex items-center w-full gap-2 text-xs text-muted-foreground">
                                <Progress value={0} className="w-1/3 h-2" />
                                <span>0% مكتمل</span>
                            </div>
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
                                      href={`${topic.path}/concepts`} 
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
    <div className="flex flex-col min-h-screen">
      <DashboardHeader />
      <main className="flex-1">
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

            <div className="mt-16">
              <h2 className="text-3xl font-bold mb-6 text-center text-foreground/80 border-b-2 border-primary/20 pb-4">الفصل الثاني</h2>
              <p className="text-muted-foreground text-center text-lg">سيتم اضافه المحتوى لاحقا</p>
            </div>

        </div>
      </main>
    </div>
  );
}

