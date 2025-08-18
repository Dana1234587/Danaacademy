
"use client";

import Link from 'next/link';
import {
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarSeparator,
} from '@/components/ui/sidebar';
import {
  ChevronsRight,
  Folder,
  Atom,
  ClipboardCheck,
  FileText,
  Lightbulb,
  Languages,
  Book,
  LogOut,
  User,
  Shield,
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/logo';
import { useStore } from '@/store/app-store';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';


const allCourses = [
  {
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
                    { label: 'حصة رقم (1): مفهوم الزخم الخطي', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/1-linear-momentum-concept' },
                    { label: 'حصة رقم (2): العلاقة مع طاقة الحركة', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/2-relation-with-kinetic-energy' },
                    { label: 'حصة رقم (3): حل أسئلة تميز (قدرات عليا)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/3-advanced-questions' },
                    { label: 'حصة رقم (4): أسئلة الرسم البياني', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/4-graph-questions' },
                    { label: 'حصة رقم (5): التغير ومعدل التغير', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/5-change-and-rate-of-change' },
                    { label: 'حصة رقم (6): قانون نيوتن الثاني بدلالة الزخم الخطي (شرح)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/6-newtons-second-law-explanation' },
                    { label: 'حصة رقم (7): قانون نيوتن الثاني (حل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/7-newtons-second-law-questions' },
                    { label: 'حصة رقم (8): العلاقة بين الزخم الخطي والدفع (شرح)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/8-momentum-impulse-relation-explanation' },
                    { label: 'حصة رقم (9): العلاقة بين الزخم الخطي والدفع (حل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/9-momentum-impulse-relation-questions' },
                    { label: 'حصة رقم (10): منحنى (القوة-الزمن)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/10-force-time-curve' },
                    { label: 'حصة رقم (11): حفظ الزخم الخطي (برنامج محاكاة)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/11-momentum-conservation-simulation' },
                    { label: 'حصة رقم (12): حفظ الزخم الخطي (شرح الجزء الأول)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/12-momentum-conservation-explanation-p1' },
                    { label: 'حصة رقم (13): حفظ الزخم الخطي (شرح الجزء الثاني)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/13-momentum-conservation-explanation-p2' },
                    { label: 'حصة رقم (14): حل ورقة عمل حفظ الزخم الخطي', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/1-linear-momentum-and-impulse/14-momentum-conservation-worksheet' },
                ]
                },
                { 
                title: 'الدرس الثاني: التصادمات', 
                topics: [
                    { label: 'حصة رقم (15): التصادمات (الجزء الأول)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/1-collisions-p1' },
                    { label: 'حصة رقم (16): التصادمات (الجزء الثاني)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/2-collisions-p2' },
                    { label: 'حصة رقم (17): التصادمات (الجزء الثالث)', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/3-collisions-p3' },
                    { label: 'حصة رقم (18): البندول القذفي وكرات نيوتن', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/2-collisions/4-ballistic-pendulum-and-newtons-cradle' },
                ]
                },
                 { 
                  title: 'اختبار الوحدة الأولى', 
                  isQuiz: true,
                  topics: [
                    { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/first-semester/1-linear-momentum-and-collisions/3-unit-quiz' },
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
                    { label: 'حصة رقم (1): تأسيس', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/1-foundations' },
                    { label: 'حصة رقم (2): العزم (شرح وأسئلة مفاهيمية)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/2-torque' },
                    { label: 'حصة رقم (3): العزم (حل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/3-conceptual-questions' },
                    { label: 'حصة رقم (4): عزم الازدواج', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/4-torque-questions' },
                    { label: 'حصة رقم (5): مركز الكتلة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/5-couple-torque' },
                    { label: 'حصة رقم (6): الاتزان (شرح وحل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/6-center-of-mass' },
                    { label: 'حصة رقم (7): الاتزان (حل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/1-torque-and-static-equilibrium/7-equilibrium-explanation-and-questions' },
                ]
                },
                {
                title: 'الدرس الثاني: ديناميكا الحركة الدورانية',
                topics: [
                    { label: 'حصة رقم (8): التجربة الاستهلالية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/1-introductory-experiment' },
                    { label: 'حصة رقم (9): ديناميكا الحركة الدورانية (شرح)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/2-rotational-dynamics-explanation' },
                    { label: 'حصة رقم (10): ديناميكا الحركة الدورانية (حل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/3-rotational-dynamics-questions' },
                    { label: 'حصة رقم (11): القانون الثاني لنيوتن في الحركة الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/2-rotational-dynamics/4-newtons-second-law-for-rotation' },
                ]
                },
                {
                title: 'الدرس الثالث: الزخم الزاوي',
                topics: [
                    { label: 'حصة رقم (12): الطاقة الحركية الدورانية', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/1-rotational-kinetic-energy' },
                    { label: 'حصة رقم (13): الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/2-angular-momentum' },
                    { label: 'حصة رقم (14): حفظ الزخم الزاوي', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/3-angular-momentum-conservation' },
                    { label: 'حصة رقم (15): أسئلة تميز', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/3-angular-momentum/4-advanced-questions' },
                ]
                },
                { 
                title: 'اختبار الوحدة الثانية', 
                isQuiz: true,
                topics: [
                    { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/first-semester/2-rotational-motion/4-unit-quiz' },
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
                    { label: 'حصة رقم (1): مفهوم التيار الكهربائي (شرح وحل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/1-current-concept' },
                    { label: 'حصة رقم (2): المقاومة الكهربائية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/2-electrical-resistance' },
                    { label: 'حصة رقم (3): المقاومية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/3-resistivity' },
                    { label: 'حصة رقم (4): المقاومة والمقاومية - حل أسئلة تميز', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/4-resistivity-advanced-questions' },
                    { label: 'حصة رقم (5): قانون أوم', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/5-ohms-law' },
                    { label: 'حصة رقم (6): القوة الدافعة الكهربائية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/6-electromotive-force' },
                    { label: 'حصة رقم (7): تغيرات الجهد الكهربائي (الجزء الأول)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/7-voltage-changes-p1' },
                    { label: 'حصة رقم (8): تغيرات الجهد الكهربائي (الجزء الثاني)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/1-resistance-and-emf/8-voltage-changes-p2' },
                ]
                },
                { 
                title: 'الدرس الثاني: القدرة والدارات البسيطة', 
                topics: [
                    { label: 'حصة رقم (9): القدرة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/1-power' },
                    { label: 'حصة رقم (10): القدرة والطاقة (حصة إضافية معادة)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/2-power-energy-redo' },
                    { label: 'حصة رقم (11): القدرة والطاقة (حل أسئلة الكتاب)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/3-power-energy-book-questions' },
                    { label: 'حصة رقم (12): القدرة والطاقة (حل أسئلة إضافية - فلسطين)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/2-power-and-simple-circuits/4-power-energy-palestine-questions' },
                ]
                },
                { 
                title: 'الدرس الثالث: توصيل المقاومات وقاعدتا كيرشوف', 
                topics: [
                    { label: 'حصة رقم (13): توصيل المقاومات (شرح وحل أسئلة)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/1-resistor-connections' },
                    { label: 'حصة رقم (14): أسئلة تميز على توصيل المقاومات', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/2-resistor-connections-advanced' },
                    { label: 'حصة رقم (15): الدارات الكهربائية البسيطة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/3-simple-circuits' },
                    { label: 'حصة رقم (16): الدارات البسيطة (حل أمثلة إضافية)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/4-simple-circuits-extra-examples' },
                    { label: 'حصة رقم (17): قاعدة كيرشوف الأولى', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/5-kirchhoffs-first-rule' },
                    { label: 'حصة رقم (18): قاعدة كيرشوف الثانية', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/6-kirchhoffs-second-rule' },
                    { label: 'حصة رقم (19): قاعدتا كيرشوف', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/7-kirchhoffs-rules' },
                    { label: 'حصة رقم (20): كيرشوف (حل أمثلة إضافية 1)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/8-kirchhoffs-extra-examples-1' },
                    { label: 'حصة رقم (21): كيرشوف (حل أمثلة إضافية 2)', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/3-resistor-connections-and-kirchhoff/9-kirchhoffs-extra-examples-2' },
                ]
                },
                { 
                title: 'اختبار الوحدة الثالثة', 
                isQuiz: true,
                topics: [
                    { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/first-semester/3-electric-current/4-unit-quiz' },
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
                    { label: 'حصة رقم (1): مفهوم المجال المغناطيسي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/1-magnetic-field-concept' },
                    { label: 'حصة رقم (2): قانون بيو-سافار', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/2-biot-savart-law' },
                    { label: 'حصة رقم (3): المجال المغناطيسي الناشئ عن مرور تيار في سلك طويل', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/3-field-from-long-wire' },
                    { label: 'حصة رقم (4): المجال المغناطيسي الناشئ عن حلقة دائرية', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/4-field-from-circular-loop' },
                    { label: 'حصة رقم (5): المجال المغناطيسي الناشئ عن مرور تيار في ملف لولبي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/5-field-from-solenoid' },
                    { label: 'حصة رقم (6): نقطة انعدام المجال المغناطيسي', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/1-field-from-current/6-zero-magnetic-field-point' },
                ]
                },
                {
                title: 'الدرس الثاني: القوة المغناطيسية',
                topics: [
                    { label: 'حصة رقم (7): القوة المغناطيسية المؤثرة في شحنة متحركة', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/1-force-on-moving-charge' },
                    { label: 'حصة رقم (8): حركة شحنة في مجال مغناطيسي منتظم', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/2-charge-motion-in-uniform-field' },
                    { label: 'حصة رقم (9): القوة المغناطيسية المؤثرة في موصل', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/3-force-on-conductor' },
                    { label: 'حصة رقم (10): القوة المغناطيسية بين موصلين متوازيين', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/4-force-between-parallel-conductors' },
                    { label: 'حصة رقم (11): عزم الازدواج وتطبيقات تكنولوجية', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/2-magnetic-force/5-couple-torque-and-applications' },
                ]
                },
                { 
                title: 'اختبار الوحدة الرابعة', 
                isQuiz: true,
                topics: [
                    { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/first-semester/4-magnetic-field/3-unit-quiz' },
                ]
                }
            ]
            },
        ]
        }
    ]
  },
  {
    id: 'tawjihi-2008',
    label: 'التوجيهي (جيل 2008)',
    icon: Book,
    path: '/courses/physics-2008',
     subItems: [
      {
        label: 'الفصل الأول',
        icon: Folder,
        path: '/courses/physics-2008/first-semester',
        subItems: [
          { 
            label: 'الزخم الخطي والتصادمات', 
            icon: Folder, 
            path: '/courses/physics-2008/first-semester/momentum', 
            subItems: [
              { label: 'الزخم الخطي والدفع', icon: FileText, path: '/app/(content)/courses/physics-2008/first-semester/momentum/linear-momentum-and-impulse', content: true },
              { label: 'التصادمات', icon: FileText, path: '/app/(content)/courses/physics-2008/first-semester/momentum/collisions', content: true },
            ]
          },
        ]
      },
    ]
  },
];


const contentTypes = [
    { label: 'شرح المادة', icon: FileText, folder: 'concepts' },
    { label: 'اختبارات قصيرة', icon: ClipboardCheck, folder: 'quizzes' },
    { label: 'محاكاة', icon: Atom, folder: 'simulations' },
];


function SidebarNavMenu() {
  const pathname = usePathname();
  const currentUser = useStore((state) => state.currentUser);
  
  const accessibleCourses = currentUser?.role === 'admin' 
    ? allCourses 
    : allCourses.filter(course => currentUser?.enrolledCourseIds.includes(course.id));

  const renderMenuItems = (items: any[], level = 0, parentPath = '') => {
    return items.map((item, index) => {
      const currentPath = item.path;
      const isCollapsible = item.subItems && item.subItems.length > 0;
      
      const isActive = isCollapsible 
        ? pathname.startsWith(currentPath)
        : pathname === currentPath;

      const buttonContent = (
        <>
          <div className="flex items-center gap-2">
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </div>
          {(isCollapsible || item.content) && <ChevronsRight className="h-4 w-4 text-muted-foreground transition-transform duration-200 group-data-[state=open]:rotate-90" />}
        </>
      );
      
      const itemKey = `${parentPath}-${item.label}-${index}`;
      
      const button = (
        <SidebarMenuButton
          className={cn(isCollapsible && "justify-between", item.content && "justify-between")}
          isActive={isActive && !isCollapsible && !item.content}
          variant={level > 0 ? 'ghost' : 'default'}
        >
          {buttonContent}
        </SidebarMenuButton>
      );

      return (
        <Collapsible key={itemKey} asChild>
          <div>
            <SidebarMenuItem>
              {isCollapsible || item.content ? (
                <CollapsibleTrigger asChild>{button}</CollapsibleTrigger>
              ) : (
                <Link href={currentPath}>{button}</Link>
              )}
            </SidebarMenuItem>

            {(isCollapsible) && (
              <CollapsibleContent>
                <div className={cn("ms-7 border-s border-border")}>
                  {renderMenuItems(item.subItems, level + 1, currentPath)}
                </div>
              </CollapsibleContent>
            )}
            
            {item.content && (
              <CollapsibleContent>
                  <div className={cn("ms-7 border-s border-border")}>
                  {contentTypes.map((contentType) => {
                    const contentPath = `${item.path}/${contentType.folder}`;
                    return (
                      <SidebarMenuItem key={contentType.folder} className="ms-4">
                          <Link href={contentPath}>
                              <SidebarMenuButton variant="ghost" isActive={pathname === contentPath}>
                                  <contentType.icon className="h-4 w-4"/>
                                  <span>{contentType.label}</span>
                              </SidebarMenuButton>
                          </Link>
                      </SidebarMenuItem>
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

  return <SidebarMenu>{renderMenuItems(accessibleCourses)}</SidebarMenu>;
}


export function SidebarNav() {
  const { currentUser, logout } = useStore((state) => ({ currentUser: state.currentUser, logout: state.logout }));
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      logout(); // Clear user state in Zustand
      router.push('/login');
    } catch (error) {
      console.error("Error signing out: ", error);
      // Still attempt to log out locally even if firebase fails
      logout();
      router.push('/login');
    }
  }

  return (
    <>
      <SidebarHeader>
        <Link href="/" className="flex items-center gap-2">
          <Logo className="h-[3.92rem] w-[8.96rem] rounded-md object-contain" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        
      </SidebarContent>
      <SidebarSeparator />
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/quiz">
                <SidebarMenuButton>
                    <Lightbulb />
                    مولد الاختبارات
                </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
           <SidebarMenuItem>
            <Button onClick={handleLogout} variant="ghost" className="w-full justify-start gap-2">
                <LogOut />
                تسجيل الخروج
            </Button>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </>
  );
}
