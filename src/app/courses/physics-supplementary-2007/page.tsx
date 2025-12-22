

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

const courseId = 'tawjihi-2007-supplementary';

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
    },
    {
      label: 'الفصل الثاني',
      icon: Folder,
      path: '/courses/physics-supplementary-2007/second-semester',
      subItems: [
        {
          label: 'الوحدة الخامسة: الحث الكهرومغناطيسي وأشباه الموصلات',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors',
          lessons: [
            {
              title: 'الدرس الأول: التدفق المغناطيسي والحث الكهرومغناطيسي',
              topics: [
                { label: 'حصة رقم (1): مفهوم التدفق المغناطيسي', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/1-magnetic-flux-concept' },
                { label: 'حصة رقم (2): التدفق المغناطيسي حل اسئلة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/2-magnetic-flux-questions' },
                { label: 'حصة رقم (3): مفهوم الحث الكهرومغناطيسي', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/3-electromagnetic-induction-concept' },
                { label: 'حصة رقم (4): قانون فارادي في الحث', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/4-faraday-law-of-induction' },
                { label: 'حصة رقم (5): الرسم البياني', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/5-graphical-representation' },
                { label: 'حصة رقم (6): القوة الدافعه الحثية في موصل', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/6-motional-emf-in-conductor' },
                { label: 'حصة رقم (7): حل ورقة العمل', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/7-worksheet-solutions' },
                { label: 'حصة رقم (8): قانون لنز الجزء الاول', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/8-lenz-law-part1' },
                { label: 'حصة رقم (9): قانون لنز الجزء الثاني', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/9-lenz-law-part2' },
                { label: 'حصة رقم (10): الحث الذاتي شرح', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/10-self-inductance-explanation' },
                { label: 'حصة رقم (11): الحث الذاتي حل اسئلة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/11-self-inductance-questions' },
                { label: 'حصة رقم (12): المحول الكهربائي', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/12-transformer' },
                { label: 'حصة رقم (13): المحول الكهربائي حل ورقة عمل', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/13-transformer-worksheet' },
                { label: 'حصة رقم (14): حل أسئلة اختبر نفسك', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/1-magnetic-flux-and-electromagnetic-induction/14-self-assessment-solutions' },
              ]
            },
            {
              title: 'الدرس الثاني: دارات التيار المتردد',
              topics: [
                { label: 'حصة رقم (15): فرق الجهد المتردد', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/1-alternating-voltage' },
                { label: 'حصة رقم (16): دارات التيار المتردد', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/2-ac-circuits' },
                { label: 'حصة رقم (17): حل اسئلة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/3-questions' },
                { label: 'حصة رقم (18): دارات التيار المتردد ملخص قوانين الدرس', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/4-ac-circuits-summary' },
                { label: 'حصة رقم (19): المعاوقة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/5-impedance' },
                { label: 'حصة رقم (20): دارة rlc', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/6-rlc-circuit' },
                { label: 'حصة رقم (21): حل أسئلة اختبر نفسك', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/2-ac-circuits/7-self-assessment-solutions' },
              ]
            },
            {
              title: 'الدرس الثالث: اشباه الموصلات',
              topics: [
                { label: 'حصة رقم (22): الاشابة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/3-semiconductors/1-doping' },
                { label: 'حصة رقم (23): الثنائي والترانزستور', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/3-semiconductors/2-diode-and-transistor' },
                { label: 'حصة رقم (24): التطبيقات التكنولوجية', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/3-semiconductors/3-technological-applications' },
              ]
            },
            {
              title: 'الإثراء والتوسع',
              icon: Award,
              topics: [
                { label: 'مواضيع متقدمة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/4-enrichment-and-expansion' }
              ]
            },
            { 
              title: 'امتحان الوحدة الخامسة',
              isQuiz: true,
              topics: [
                { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/second-semester/5-electromagnetic-induction-and-semiconductors/5-unit-quiz' },
              ]
            }
          ]
        },
        {
          label: 'الوحدة السادسة: الفيزياء الحديثة',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics',
          lessons: [
            {
              title: 'الدرس الأول: الطبيعة الجسيمية للضوء',
              topics: [
                { label: 'حصة رقم (1): مبدأ تكمية الطاقة', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/1-energy-quantization' },
                { label: 'حصة رقم (2): اشعاع الجسم الاسود', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/2-black-body-radiation' },
                { label: 'حصة رقم (3): الظاهرة الكهروضوئية 1', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/3-photoelectric-effect-1' },
                { label: 'حصة رقم (4): الظاهرة الكهروضوئية 2', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/4-photoelectric-effect-2' },
                { label: 'حصة رقم (5): الظاهرة الكهروضوئية 3', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/5-photoelectric-effect-3' },
                { label: 'حصة رقم (6): ظاهرة كومبتون', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/1-particle-nature-of-light/6-compton-effect' },
              ]
            },
            {
              title: 'الدرس الثاني: التركيب الذري',
              topics: [
                  { label: 'حصة رقم (7): فرضيات بور', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/2-atomic-structure/1-bohr-hypotheses' },
                  { label: 'حصة رقم (8): الاطياف الذرية', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/2-atomic-structure/2-atomic-spectra' },
                  { label: 'حصة رقم (9): دي بروي', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/2-atomic-structure/3-de-broglie' },
              ]
            },
            {
              title: 'حل أسئلة الفصل',
              topics: [
                { label: 'حصة رقم (10): حل أسئلة الفصل', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/3-chapter-questions' }
              ]
            },
            {
              title: 'الإثراء والتوسع',
              icon: Award,
              topics: [
                { label: 'مواضيع متقدمة', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/4-enrichment-and-expansion' }
              ]
            },
            { 
              title: 'اختبار وحدة الفيزياء الحديثة',
              isQuiz: true,
              topics: [
                { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/second-semester/6-modern-physics/5-unit-quiz' },
              ]
            }
          ]
        },
        {
          label: 'الوحدة السابعة: الفيزياء النووية',
          icon: Folder,
          path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics',
          lessons: [
            {
              title: 'الدرس الأول: تركيب النواة وخصائصها',
              topics: [
                { label: 'حصة رقم (1): بنية النواة', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/1-nucleus-structure-and-properties/1-nucleus-structure' },
                { label: 'حصة رقم (2): قوانين متعلقة بشكل النواة', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/1-nucleus-structure-and-properties/2-nucleus-shape-laws' },
                { label: 'حصة رقم (3): نطاق الاستقرار', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/1-nucleus-structure-and-properties/3-stability-band' },
                { label: 'حصة رقم (4): طاقة الربط النووية', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/1-nucleus-structure-and-properties/4-nuclear-binding-energy' },
                { label: 'حصة رقم (5): حل أسئلة الدرس الأول', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/1-nucleus-structure-and-properties/5-lesson1-questions' },
              ]
            },
            {
              title: 'الدرس الثاني: الاشعاع النووي',
              topics: [
                { label: 'حصة رقم (6): الاضمحلال الاشعاعي', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/2-nuclear-radiation/1-radioactive-decay' },
                { label: 'حصة رقم (7): اضمحلال غاما', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/2-nuclear-radiation/2-gamma-decay' },
                { label: 'حصة رقم (8): النشاطية الاشعاعية', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/2-nuclear-radiation/3-radioactivity' },
              ]
            },
            {
              title: 'الدرس الثالث: التفاعلات النووية',
              topics: [
                { label: 'حصة رقم (9): الاشعاع النووي الصناعي', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/3-nuclear-reactions/1-artificial-nuclear-radiation' },
              ]
            },
            {
              title: 'حل أسئلة الفصل',
              topics: [
                { label: 'حصة رقم (10): حل أسئلة الفصل', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/4-chapter-questions' }
              ]
            },
            {
              title: 'الإثراء والتوسع',
              icon: Award,
              topics: [
                { label: 'مواضيع متقدمة', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/5-enrichment-and-expansion' }
              ]
            },
            { 
              title: 'امتحان الوحدة السابعة',
              isQuiz: true,
              topics: [
                { label: 'أسئلة اختبار الوحدة', path: '/courses/physics-supplementary-2007/second-semester/7-nuclear-physics/6-unit-quiz' },
              ]
            }
          ]
        },
      ]
    }
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

    if (lesson.icon) { // This is for "الإثراء والتوسع"
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


export default function PhysicsSupplementary2007Page() {
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
                            عذرًا، ليس لديك الصلاحية للوصول إلى هذه الدورة.
                        </p>
                        <p className="mt-2 text-sm">
                            يرجى التأكد من تسجيلك في دورة "فيزياء التكميلي - جيل 2007".
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
                      {welcomeMessage} في دورة فيزياء التكميلي - جيل 2007
                    </h1>
                    <p className="mt-2 text-base md:text-lg text-muted-foreground">
                        نتمنى لك رحلة تعليمية ممتعة ومفيدة!
                    </p>
                  </div>
                   <Button asChild variant="outline" className="flex-shrink-0">
                      <Link href="/" className="flex items-center gap-2">
                          <Home className="h-4 w-4" />
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
        </main>
      </div>
    </SidebarProvider>
  );
}

