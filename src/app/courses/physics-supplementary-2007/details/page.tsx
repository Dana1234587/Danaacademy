
'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, BookOpen, ChevronLeft, Clock, Video, ClipboardCheck, PieChart, Film, Rocket } from 'lucide-react';
import Link from 'next/link';
import { Logo } from '@/components/logo';
import { TestimonialsMap } from '@/components/testimonials-map';
import { AchievementCard } from '@/components/achievement-card';
import { CourseNavBar } from '@/components/course-nav-bar';
import { MarksDistributionChart } from '@/components/marks-distribution-chart';
import { useStore } from '@/store/app-store';


const course = {
  id: 'tawjihi-2007-supplementary',
  title: 'فيزياء التكميلي - جيل 2007',
  description: 'دورة شاملة ومكثفة مصممة خصيصًا لطلاب التكميلي جيل 2007، تركز على شرح مادة الفيزياء للفصلين الأول والثاني بطريقة مبسطة وعميقة تضمن لك تحقيق أفضل النتائج في الامتحان الوزاري.',
  instructor: {
    name: 'دكتورة دانا سالم',
    imageUrl: 'https://i.ibb.co/SXn1vhJP/NEW-NEW.png',
    imageHint: 'instructor portrait',
  },
  coverImageUrl: 'https://i.ibb.co/v6JXwghs/image.png',
  coverImageHint: 'physics textbook',
  price: '50.00 د.أ',
  curriculum: {
    semester1: [
      {
        title: 'الوحدة الأولى: الزخم الخطي والتصادمات',
        videos: 18,
        hours: 14.5,
        exams: 4,
        lessons: [
            { name: 'الدرس الأول: الزخم الخطي والدفع', sessions: [] },
            { name: 'الدرس الثاني: التصادمات', sessions: [] }
        ],
      },
      { 
        title: 'الوحدة الثانية: الحركة الدورانية',
        videos: 15,
        hours: 10,
        exams: 3,
        lessons: [
          { name: 'الدرس الأول: العزم والاتزان السكوني', sessions: [] },
          { name: 'الدرس الثاني: ديناميكا الحركة الدورانية', sessions: [] },
          { name: 'الدرس الثالث: الزخم الزاوي', sessions: [] }
        ] 
      },
      { 
        title: 'الوحدة الثالثة: التيار الكهربائي',
        videos: 21,
        hours: 14,
        exams: 5,
        lessons: [
          { name: 'الدرس الأول: المقاومة والقوة الدافعة الكهربائية', sessions: [] },
          { name: 'الدرس الثاني: القدرة الكهربائية والدارة البسيطة', sessions: [] },
          { name: 'الدرس الثالث: توصيل المقاومات وقاعدتا كيرشوف', sessions: [] }
        ] 
      },
      { 
        title: 'الوحدة الرابعة: المجال المغناطيسي', 
        videos: 11,
        hours: 9,
        exams: 3,
        lessons: [] 
      },
    ],
    semester2: [
      { title: 'الوحدة الخامسة: الحث الكهرومغناطيسي', lessons: [] },
      { title: 'الوحدة السادسة: فيزياء الكم', lessons: [] },
      { title: 'الوحدة السابعة: الفيزياء النووية', lessons: [] },
    ],
  },
};

const studentAchievements = [
  { name: 'أحمد الحوراني', year: '2007', physicsScore: '192/200', average: '95.90', imageUrl: 'https://i.ibb.co/DDw977GL/Untitled-design-2.jpg', imageHint: 'student portrait' },
  { name: 'هاشم لافي', year: '2007', physicsScore: '196/200', average: '98.05', imageUrl: 'https://i.ibb.co/MxRFns1r/photo-2025-08-11-16-50-40.jpg', imageHint: 'student smiling' },
  { name: 'منى ابو نوير', year: '2007', physicsScore: '196/200', average: '97.25', imageUrl: 'https://i.ibb.co/svSrQPXD/Untitled-design-16.png', imageHint: 'graduate student' },
  { name: 'روان عكور', year: '2007', physicsScore: '192/200', average: '98.15', imageUrl: 'https://i.ibb.co/9kvYH9xP/Untitled-design-17.png', imageHint: 'female student' },
  { name: 'ندى عريقات', year: '2007', physicsScore: '192/200', average: '97.6', imageUrl: 'https://i.ibb.co/fYnrTLVs/Untitled-design-18.png', imageHint: 'male student' },
  { name: 'جود الصفدي', year: '2007', physicsScore: '200/200', average: '99.75', imageUrl: 'https://i.ibb.co/pr6pvCpy/Untitled-design-20.png', imageHint: 'happy student' },
  { name: 'عبدالعزيز تهتموني', year: '2007', physicsScore: '188/200', average: '97.1', imageUrl: 'https://i.ibb.co/fYcvVP3G/Untitled-design-19.png', imageHint: 'student thinking' },
  { name: 'سجى السويطي', year: '2007', physicsScore: '180/200', average: '89.95', imageUrl: 'https://i.ibb.co/mVnC4pyR/Untitled-design-21.png', imageHint: 'student writing' },
  { name: 'حمزة اكريم', year: '2007', physicsScore: '196/200', average: '98.15', imageUrl: 'https://i.ibb.co/sJRp9tMR/Untitled-design-22.png', imageHint: 'student reading' },
];

const testimonials = [
  { id: 1, image: "https://i.ibb.co/7J6F87z/image.png", reviewScreenshot: "https://i.ibb.co/2QqmbJP/image.png", position: { top: '10%', left: '15%' } },
  { id: 2, image: "https://i.ibb.co/DHWmf5vN/10.png", reviewScreenshot: "https://i.ibb.co/B26nXwxS/1.png", position: { top: '30%', left: '30%' } },
  { id: 3, image: "https://i.ibb.co/fGXQFykf/2.png", reviewScreenshot: "https://i.ibb.co/bjkbrnLb/image.png", position: { top: '50%', left: '10%' } },
  { id: 4, image: "https://i.ibb.co/PZWjb1QC/image.png", reviewScreenshot: "https://i.ibb.co/JL4vfhp/3.png", position: { top: '70%', left: '25%' } },
  { id: 5, image: "https://i.ibb.co/7t0BhthL/5.png", reviewScreenshot: "https://i.ibb.co/6c5NbCF8/image.png", position: { top: '15%', left: '80%' } },
  { id: 6, image: "https://i.ibb.co/WN2nc6LQ/cropped-circle-image-11.png", reviewScreenshot: "https://i.ibb.co/5gfBYpy6/Untitled-design-30.png", position: { top: '45%', left: '90%' } },
  { id: 7, image: "https://i.ibb.co/ZztB0w2m/cropped-circle-image-12.png", reviewScreenshot: "https://i.ibb.co/3YPMPKBY/Untitled-design-4.jpg", position: { top: '85%', left: '85%' } },
  { id: 8, image: "https://i.ibb.co/0pV97dn1/cropped-circle-image-14.png", reviewScreenshot: "https://i.ibb.co/QFTWKnPw/Untitled-design-32.png", position: { top: '65%', left: '70%' } },
  { id: 9, image: "https://i.ibb.co/cp2tYFd/cropped-circle-image-15.png", reviewScreenshot: "https://i.ibb.co/Hpg6r4sj/Untitled-design-31.png", position: { top: '35%', left: '55%' } },
  { id: 10, image: "https://i.ibb.co/FC2WbTC/cropped-circle-image-18.png", reviewScreenshot: "https://i.ibb.co/ns1rrF1c/Untitled-design-33.png", position: { top: '90%', left: '50%' } },
];

const marksDistributionData = [
  { name: 'الزخم الخطي', 'عدد الدوائر': 6, 'العلامات': 24, fill: "hsl(206, 88%, 60%)" },
  { name: 'الحركة الدورانية', 'عدد الدوائر': 7, 'العلامات': 28, fill: "hsl(145, 68%, 45%)" },
  { name: 'التيارات', 'عدد الدوائر': 6, 'العلامات': 24, fill: "hsl(45, 93%, 54%)" },
  { name: 'المجال المغناطيسي', 'عدد الدوائر': 6, 'العلامات': 24, fill: "hsl(25, 95%, 53%)" },
  { name: 'الحث الكهرومغناطيسي', 'عدد الدوائر': 10, 'العلامات': 40, fill: "hsl(187, 85%, 43%)" },
  { name: 'فيزياء الكم', 'عدد الدوائر': 6, 'العلامات': 24, fill: "hsl(320, 84%, 60%)" },
  { name: 'الفيزياء النووية', 'عدد الدوائر': 9, 'العلامات': 36, fill: "hsl(75, 78%, 44%)" },
];

function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return <section id={id} className={`py-12 md:py-20 scroll-mt-20 ${className}`}>{children}</section>;
}


export default function PhysicsSupplementary2007Page() {
  const { currentUser } = useStore((state) => ({ currentUser: state.currentUser }));
  const isEnrolled = currentUser?.enrolledCourseIds?.includes(course.id);

  return (
    <MarketingLayout>
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-primary/10 via-background to-background pt-12" id="hero">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

            {/* Right Column: Course Info */}
            <div className="lg:col-span-3 text-center lg:text-start">
              <Logo className="h-16 w-auto mx-auto lg:mx-0 mb-4" />
              <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                {course.description}
              </p>
              <div className="mt-6 flex items-center justify-center lg:justify-start gap-4">
                <Image
                  src={course.instructor.imageUrl}
                  alt={course.instructor.name}
                  width={60}
                  height={60}
                  className="rounded-full border-2 border-primary"
                  data-ai-hint={course.instructor.imageHint}
                />
                <div>
                  <p className="font-bold text-foreground">{course.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">مدرّسة الفيزياء</p>
                </div>
              </div>
            </div>

            {/* Left Column: Floating Card */}
            <div className="lg:col-span-2 flex justify-center">
              <Card className="w-full max-w-sm overflow-hidden shadow-2xl transform hover:-translate-y-2 transition-transform duration-300">
                <CardHeader className="p-0">
                  <div className="relative w-full aspect-video">
                    <Image
                      src={course.coverImageUrl}
                      alt={course.title}
                      fill
                      className="object-cover"
                      data-ai-hint={course.coverImageHint}
                    />
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-3xl font-bold text-primary">{course.price}</p>
                    {isEnrolled ? (
                        <Button asChild size="lg">
                            <Link href="/courses/physics-supplementary-2007">
                                <Rocket className="w-4 h-4 ms-2" />
                                الانتقال إلى الدورة
                            </Link>
                        </Button>
                    ) : (
                        <Button size="lg">انضم للدورة الآن</Button>
                    )}
                  </div>
                   <Button variant="outline" className="w-full" asChild>
                      <Link href="/">
                          <ChevronLeft className="w-4 h-4 ms-2" />
                          العودة إلى الصفحة الرئيسية
                      </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <CourseNavBar />

      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8 mt-12">
        {/* Course Curriculum Section */}
        <Section id="curriculum">
           <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                    محتويات الدورة
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    نظرة مفصلة على الوحدات والدروس التي تغطيها الدورة.
                </p>
            </div>

          <div className="space-y-8">
            {/* Semester 1 */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">الفصل الأول</h3>
              <Accordion type="single" collapsible className="w-full">
                {course.curriculum.semester1.map((unit, unitIndex) => (
                  <AccordionItem value={`s1-unit-${unitIndex}`} key={unitIndex} className="bg-muted/50 rounded-lg mb-4">
                    <div className="p-4">
                        <AccordionTrigger className="text-lg font-semibold w-full text-start p-0 hover:no-underline">
                          {unit.title}
                        </AccordionTrigger>
                        {unit.videos && (
                          <div className="flex items-center justify-start gap-6 pt-3 text-sm font-medium text-muted-foreground border-t border-dashed mt-3">
                            <div className="flex items-center gap-2">
                              <Film className="w-5 h-5 text-primary" />
                              <span>{unit.videos} حصة</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="w-5 h-5 text-primary" />
                              <span>{unit.hours} ساعة دراسية</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <ClipboardCheck className="w-5 h-5 text-primary" />
                              <span>{unit.exams} اختبارات</span>
                            </div>
                          </div>
                        )}
                    </div>
                    <AccordionContent className="p-4 bg-background rounded-b-md">
                      {unit.lessons.length > 0 ? (
                        <ul className="space-y-2">
                           {unit.lessons.map((lesson, lessonIndex) => (
                               <li key={lessonIndex} className="flex items-center justify-between text-muted-foreground bg-muted/50 p-3 rounded-md">
                                   <span className="font-medium text-foreground">{lesson.name}</span>
                                   {/* If sessions were available, they would be here */}
                               </li>
                           ))}
                        </ul>
                      ) : (
                        <p className="text-muted-foreground text-center p-4">سيتم إضافة تفاصيل هذه الوحدة قريبًا.</p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Semester 2 */}
            <div>
              <h3 className="text-2xl font-bold mb-4 text-center">الفصل الثاني</h3>
              <Accordion type="single" collapsible className="w-full">
                {course.curriculum.semester2.map((unit, index) => (
                  <AccordionItem value={`s2-unit-${index}`} key={index}>
                    <AccordionTrigger className="text-lg font-semibold bg-muted px-4 rounded-md">
                      {unit.title}
                    </AccordionTrigger>
                    <AccordionContent>
                      <p className="text-muted-foreground text-center p-4">سيتم إضافة تفاصيل هذه الوحدة قريبًا.</p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </Section>
        
        {/* Marks Distribution Section */}
        <Section id="marks-distribution">
           <Card className="bg-primary text-primary-foreground p-6 rounded-2xl">
              <div className="flex flex-col items-center text-center space-y-6 mb-8">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
                  توزيع العلامات بالامتحان الوزاري
                </h2>
                <p className="max-w-[700px] text-primary-foreground/80 md:text-xl">
                  نظرة على الأهمية النسبية لكل وحدة في الامتحان النهائي لمساعدتك على تنظيم دراستك بفعالية.
                </p>
              </div>
              <div className="h-[450px] w-full">
                <MarksDistributionChart data={marksDistributionData} />
              </div>
            </Card>
        </Section>

        {/* Testimonials Section */}
        <Section id="testimonials">
          <div className="flex flex-col items-center text-center space-y-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
              آراء طلابنا
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl">
              شهادات طلابنا هي مصدر فخرنا وأكبر دليل على نجاحنا.
            </p>
             <p className="max-w-[700px] text-muted-foreground md:text-lg italic">
                انقر على صورة أي طالب لعرض رأيه كاملا
              </p>
          </div>
          <div className="mt-12">
            <TestimonialsMap testimonials={testimonials} />
          </div>
        </Section>

        {/* Student Achievements Section */}
        <Section id="achievements">
            <div className="flex flex-col items-center text-center space-y-6">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                    إنجازات طلابنا
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl">
                    نفخر بطلابنا ونتائجهم المتميزة التي هي شهادة على نجاح أساليبنا التعليمية.
                </p>
            </div>
            <div className="mt-12 grid gap-x-8 gap-y-24 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                {studentAchievements.map((student, index) => (
                    <AchievementCard key={index} student={student} />
                ))}
            </div>
        </Section>

      </div>
    </MarketingLayout>
  );
}
