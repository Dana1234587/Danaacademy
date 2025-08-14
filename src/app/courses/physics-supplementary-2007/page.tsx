
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { useStore } from '@/store/app-store';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, ChevronsRight, FileText, Folder, Book, Atom, ClipboardCheck } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';

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
          subItems: [
            { 
              label: 'الدرس الأول: الزخم الخطي والدفع', 
              icon: Folder, 
              path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse',
              subItems: [
                { label: 'مفهوم الزخم الخطي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/1-linear-momentum-concept', content: true },
                { label: 'العلاقة مع طاقة الحركة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-relation-with-kinetic-energy', content: true },
                { label: 'أسئلة قدرات عليا', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/3-advanced-questions', content: true },
                { label: 'أسئلة الرسم البياني', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/4-graph-questions', content: true },
                { label: 'التغير ومعدل التغير', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/5-change-and-rate-of-change', content: true },
                { label: 'شرح قانون نيوتن الثاني', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/6-newtons-second-law-explanation', content: true },
                { label: 'أسئلة على قانون نيوتن الثاني', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/7-newtons-second-law-questions', content: true },
                { label: 'شرح مبرهنة (الزخم-الدفع)', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/8-momentum-impulse-relation-explanation', content: true },
                { label: 'أسئلة على مبرهنة (الزخم-الدفع)', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/9-momentum-impulse-relation-questions', content: true },
                { label: 'منحنى (القوة-الزمن)', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/10-force-time-curve', content: true },
                { label: 'محاكاة حفظ الزخم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/11-momentum-conservation-simulation', content: true },
                { label: 'شرح حفظ الزخم ج1', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-explanation-p1', content: true },
                { label: 'شرح حفظ الزخم ج2', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/13-momentum-conservation-explanation-p2', content: true },
                { label: 'ورقة عمل حفظ الزخم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/14-momentum-conservation-worksheet', content: true },
              ]
            },
            { 
              label: 'الدرس الثاني: التصادمات', 
              icon: Folder, 
              path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions',
              subItems: [
                { label: 'التصادمات ج1', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/1-collisions-p1', content: true },
                { label: 'التصادمات ج2', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/2-collisions-p2', content: true },
                { label: 'التصادمات ج3', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/3-collisions-p3', content: true },
                { label: 'البندول القذفي ومهد نيوتن', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/4-ballistic-pendulum-and-newtons-cradle', content: true },
              ]
            },
          ]
        },
        {
          label: 'الوحدة الثانية: الحركة الدورانية',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion',
          subItems: [
            {
              label: 'الدرس الأول: العزم والاتزان السكوني',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium',
              subItems: [
                { label: 'التأسيس', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/1-foundations', content: true },
                { label: 'عزم القوة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/2-torque', content: true },
                { label: 'أسئلة فكر', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/3-conceptual-questions', content: true },
                { label: 'أسئلة على العزم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/4-torque-questions', content: true },
                { label: 'عزم الازدواج', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/5-couple-torque', content: true },
                { label: 'مركز الكتلة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/6-center-of-mass', content: true },
                { label: 'شرح وأسئلة الاتزان', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/7-equilibrium-explanation-and-questions', content: true },
                { label: 'أسئلة على الاتزان', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/8-equilibrium-questions', content: true },
              ]
            },
            {
              label: 'الدرس الثاني: ديناميكا الحركة الدورانية',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics',
              subItems: [
                { label: 'تجربة استهلالية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/1-introductory-experiment', content: true },
                { label: 'شرح ديناميكا الحركة الدورانية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/2-rotational-dynamics-explanation', content: true },
                { label: 'أسئلة ديناميكا الحركة الدورانية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/3-rotational-dynamics-questions', content: true },
                { label: 'قانون نيوتن الثاني في الحركة الدورانية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/4-newtons-second-law-for-rotation', content: true },
              ]
            },
            {
              label: 'الدرس الثالث: الزخم الزاوي',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum',
              subItems: [
                { label: 'طاقة الحركة الدورانية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/1-rotational-kinetic-energy', content: true },
                { label: 'الزخم الزاوي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/2-angular-momentum', content: true },
                { label: 'حفظ الزخم الزاوي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/3-angular-momentum-conservation', content: true },
                { label: 'أسئلة قدرات عليا', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/4-advanced-questions', content: true },
              ]
            }
          ]
        },
        {
          label: 'الوحدة الثالثة: التيار الكهربائي',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester/3-electric-current',
          subItems: [
             {
              label: 'الدرس الأول: المقاومة والقوة الدافعة',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf',
              subItems: [
                { label: 'مفهوم التيار', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/1-current-concept', content: true },
                { label: 'المقاومة الكهربائية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/2-electrical-resistance', content: true },
                { label: 'المقاومية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/3-resistivity', content: true },
                { label: 'أسئلة متقدمة على المقاومية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/4-resistivity-advanced-questions', content: true },
                { label: 'قانون أوم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/5-ohms-law', content: true },
                { label: 'القوة الدافعة الكهربائية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/6-electromotive-force', content: true },
                { label: 'تغيرات الجهد ج1', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/7-voltage-changes-p1', content: true },
                { label: 'تغيرات الجهد ج2', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/8-voltage-changes-p2', content: true },
              ]
            },
            {
              label: 'الدرس الثاني: القدرة والدارات البسيطة',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits',
              subItems: [
                  { label: 'القدرة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/1-power', content: true },
                  { label: 'إعادة القدرة والطاقة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/2-power-energy-redo', content: true },
                  { label: 'أسئلة كتاب القدرة والطاقة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/3-power-energy-book-questions', content: true },
                  { label: 'أسئلة قدرة وطاقة فلسطين', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/4-power-energy-palestine-questions', content: true },
              ]
            },
            {
              label: 'الدرس الثالث: توصيل المقاومات وكيرشوف',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff',
              subItems: [
                { label: 'توصيل المقاومات', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/1-resistor-connections', content: true },
                { label: 'توصيل المقاومات متقدم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/2-resistor-connections-advanced', content: true },
                { label: 'الدارات البسيطة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/3-simple-circuits', content: true },
                { label: 'أمثلة إضافية على الدارات', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/4-simple-circuits-extra-examples', content: true },
                { label: 'قاعدة كيرشوف الأولى', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/5-kirchhoffs-first-rule', content: true },
                { label: 'قاعدة كيرشوف الثانية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/6-kirchhoffs-second-rule', content: true },
                { label: 'قواعد كيرشوف', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/7-kirchhoffs-rules', content: true },
                { label: 'أمثلة إضافية كيرشوف 1', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/8-kirchhoffs-extra-examples-1', content: true },
                { label: 'أمثلة إضافية كيرشوف 2', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/9-kirchhoffs-extra-examples-2', content: true },
              ]
            }
          ]
        },
         {
          label: 'الوحدة الرابعة: المجال المغناطيسي',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field',
          subItems: [
            {
              label: 'الدرس الأول: المجال من تيار كهربائي',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current',
              subItems: [
                { label: 'مفهوم المجال المغناطيسي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/1-magnetic-field-concept', content: true },
                { label: 'قانون بيو-سافار', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/2-biot-savart-law', content: true },
                { label: 'المجال من سلك طويل', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/3-field-from-long-wire', content: true },
                { label: 'المجال من حلقة دائرية', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/4-field-from-circular-loop', content: true },
                { label: 'المجال من ملف لولبي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/5-field-from-solenoid', content: true },
                { label: 'نقطة انعدام المجال المغناطيسي', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/6-zero-magnetic-field-point', content: true },
              ]
            },
            {
              label: 'الدرس الثاني: القوة المغناطيسية',
              icon: Folder,
              path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force',
              subItems: [
                 { label: 'القوة على شحنة متحركة', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/1-force-on-moving-charge', content: true },
                 { label: 'حركة شحنة في مجال منتظم', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/2-charge-motion-in-uniform-field', content: true },
                 { label: 'القوة على موصل', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/3-force-on-conductor', content: true },
                 { label: 'القوة بين موصلين متوازيين', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/4-force-between-parallel-conductors', content: true },
                 { label: 'عزم الازدواج والتطبيقات', icon: FileText, path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/5-couple-torque-and-applications', content: true },
              ]
            }
          ]
        },
      ]
    }
  ]
};

const contentTypes = [
    { label: 'شرح المادة', icon: FileText, folder: 'concepts' },
    { label: 'اختبارات قصيرة', icon: ClipboardCheck, folder: 'quizzes' },
    { label: 'محاكاة', icon: Atom, folder: 'simulations' },
];


function CourseContentList() {
    const pathname = usePathname();
    const renderMenuItems = (items: any[], level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const currentPath = item.path;
      const isCollapsible = item.subItems && item.subItems.length > 0;
      
      const isActive = isCollapsible 
        ? pathname.startsWith(currentPath)
        : pathname === currentPath;

      const buttonContent = (
        <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
                <item.icon className="h-5 w-5 text-primary" />
                <span className="text-lg">{item.label}</span>
            </div>
            {(isCollapsible || item.content) && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
        </div>
      );
      
      const itemKey = `${parentPath}-${item.label}-${index}`;
      
      const buttonClasses = cn(
        "flex w-full items-center gap-2 overflow-hidden rounded-md p-3 text-left text-base outline-none ring-primary transition-colors hover:bg-muted focus-visible:ring-2",
        isActive && 'bg-muted font-semibold'
      );

      return (
        <Collapsible key={itemKey} asChild defaultOpen={pathname.startsWith(currentPath)}>
          <div className="w-full">
                {isCollapsible || item.content ? (
                     <CollapsibleTrigger className={buttonClasses}>{buttonContent}</CollapsibleTrigger>
                ) : (
                    <Link href={currentPath} className={buttonClasses}>{buttonContent}</Link>
                )}

                {(isCollapsible) && (
                <CollapsibleContent>
                    <div className={cn("ms-7 ps-4 border-s-2 border-primary/20 space-y-2 py-2")}>
                    {renderMenuItems(item.subItems, level + 1, currentPath)}
                    </div>
                </CollapsibleContent>
                )}
            
                {item.content && (
                <CollapsibleContent>
                    <div className={cn("ms-7 ps-4 border-s-2 border-primary/20 space-y-2 py-2")}>
                    {contentTypes.map((contentType) => {
                        const contentPath = `${item.path}/${contentType.folder}`;
                        return (
                            <Link href={contentPath} key={contentType.folder} className="flex items-center gap-2 text-muted-foreground hover:text-primary p-2 rounded-md transition-colors data-[active=true]:text-primary data-[active=true]:font-medium" data-active={pathname === contentPath}>
                                <contentType.icon className="h-4 w-4"/>
                                <span>{contentType.label}</span>
                            </Link>
                        )
                    })}
                    </div>
                </CollapsibleContent>
                )}
          </div>
        </Collapsible>
      );
    });
  };

  return <div className="space-y-2">{renderMenuItems(courseStructure.subItems)}</div>;
}


export default function PhysicsSupplementary2007Page() {
  const currentUser = useStore((state) => state.currentUser);

  return (
    <MarketingLayout>
       <div className="p-4 sm:p-6 lg:p-8 container mx-auto">
            <div className="bg-primary/5 text-center p-8 rounded-xl border border-primary/10 shadow-sm mb-8">
                <h1 className="text-4xl font-bold text-primary">
                    مرحبًا بك يا {currentUser?.studentName || 'طالبنا العزيز'} في دورة فيزياء التكميلي - جيل 2007
                </h1>
                <p className="mt-2 text-lg text-muted-foreground">
                    نتمنى لك رحلة تعليمية ممتعة ومفيدة!
                </p>
            </div>
            
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="w-6 h-6 text-primary" />
                        محتويات الدورة
                    </CardTitle>
                    <CardDescription>
                        استخدم القائمة أدناه للتنقل بين وحدات ودروس الدورة.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                   <CourseContentList />
                </CardContent>
            </Card>

      </div>
    </MarketingLayout>
  );
}
