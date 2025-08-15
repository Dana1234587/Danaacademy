












import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Rocket } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { FlippableCard } from '@/components/flippable-card';
import { ImageSwiper } from '@/components/image-swiper';
import { AchievementCard } from '@/components/achievement-card';
import { TestimonialsMap } from '@/components/testimonials-map';
import { CourseCard } from '@/components/course-card';


function Section({ children, className, id }: { children: React.ReactNode, className?: string, id?: string }) {
  return <section id={id} className={`py-12 md:py-20 px-4 md:px-0 ${className}`}>{children}</section>;
}

const memorableMoments = [
  {
    src: 'https://i.ibb.co/pvCjpbbV/Untitled-design-7.png',
  },
  {
    src: 'https://i.ibb.co/PGBMrzDc/Untitled-design-10.png',
  },
  {
    src: 'https://i.ibb.co/ycJdhpcX/Untitled-design-11.png',
  },
  {
    src: 'https://i.ibb.co/0yKRLnSZ/Untitled-design-12.png',
  },
  {
    src: 'https://i.ibb.co/pj5LgGpY/Untitled-design-13.png',
  },
  {
    src: 'https://i.ibb.co/pr6pvCpy/Untitled-design-20.png',
  }
];

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
  { id: 1, image: "https://i.ibb.co/7J6F87zM/image.png", reviewScreenshot: "https://i.ibb.co/2QqmbJP/image.png", position: { top: '10%', left: '15%' } },
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

const courses = [
  {
    title: 'فيزياء التكميلي - جيل 2007',
    description: 'تفاصيل الدورة حصص مسجله لمادة الفيزياء التوجيهي كاملا للفصل الاول والفصل الثاني',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/v6JXwghs/image.png',
    imageHint: 'physics textbook',
    curriculum: 'الأردن',
    link: '/courses/physics-supplementary-2007',
    detailsLink: '/courses/physics-supplementary-2007/details',
  },
  {
    title: 'فيزياء التوجيهي - جيل 2008',
    description: 'فصل أول',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/HTYrz1mb/image.png',
    imageHint: 'physics textbook 2008',
    curriculum: 'الأردن',
    link: '/courses/physics-2008',
    detailsLink: '/courses/physics-2008/details',
  },
    {
    title: 'دورة التأسيس توجيهي الأردن لجيل 2008',
    description: 'دورة تأسيسية شاملة لجيل 2008 لمساعدتهم على الاستعداد الأمثل لمادة الفيزياء في التوجيهي.',
    price: '50.00 د.أ',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'physics foundation',
    curriculum: 'الأردن',
    detailsLink: '/courses/physics-2008-foundation/details',
  },
  {
    title: 'فيزياء التوجيهي - جيل 2008',
    description: 'فصل أول',
    price: '60.00 د.أ',
    imageUrl: 'https://i.ibb.co/TDd0GqQB/image.jpg',
    imageHint: 'physics textbook palestine',
    curriculum: 'فلسطين',
    detailsLink: '/courses/physics-2008-palestine/details',
  },
  {
    title: 'الفيزياء الفلكية والكون',
    description: 'انطلق في رحلة عبر النجوم والمجرات لاستكشاف أسرار الكون ونشأته وتطوره.',
    price: '80.00 د.أ',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'astronomy space',
    curriculum: 'الأردن',
    detailsLink: '/courses/astrophysics/details',
  },
  {
    title: 'الفيزياء النووية والإشعاع',
    description: 'تعمق في بنية الذرة والظواهر النووية، وتعرف على تطبيقاتها في الطاقة والطب.',
    price: '70.00 د.أ',
    imageUrl: 'https://placehold.co/600x400.png',
    imageHint: 'nuclear physics',
    curriculum: 'فلسطين',
    detailsLink: '/courses/nuclear-physics/details',
  },
];


export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-background w-full">
            {/* The user requested to remove the image here. */}
        </div>

        {/* Wavy Separator */}
        <div className="relative bg-transparent -mt-1 z-10">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block relative z-10">
                <defs>
                    <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{stopColor: 'hsl(var(--muted))'}} />
                        <stop offset="100%" style={{stopColor: 'hsl(var(--background))'}} />
                    </linearGradient>
                </defs>
                <path d="M0 50C144 100 288 100 432 75C576 50 720 0 864 0C1008 0 1152 50 1296 75C1440 100 1440 100 1440 100V100H0V50Z" fill="hsl(var(--background))"></path>
                <path className="animate-wave" d="M0 50C144 100 288 100 432 75C576 50 720 0 864 0C1008 0 1152 50 1296 75C1440 100 1440 100 1440 100V100H0V50Z" fill="url(#wave-gradient)" opacity="0.3"></path>
            </svg>
        </div>

        <Section className="bg-background z-10 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center md:text-start p-2">
                        <h2 className="text-3xl sm:text-4xl font-bold" style={{color: '#776391'}}>
                           مرحباً بك في دانا أكاديمي!
                        </h2>
                        <h3 className="text-2xl sm:text-3xl font-bold text-slate-700">
                           حين تتحول دراسة الفيزياء الى رحلة من الفنّ والإبداع
                        </h3>
                        <div className="text-lg text-slate-700 space-y-4">
                           <p className="font-normal">في دانا أكاديمي نؤمن أن الفيزياء ليست مجرد معادلات جامدة، بل هي لغة الكون التي تروي لنا أروع القصص. هنا ستجد الشرح المبسط، الأمثلة الملهمة، والتجارب الممتعة التي تجعل التعلم مغامرة شيقة.</p>
                           <p className="font-normal">سواء كنت طالباً تطمح للتفوق أو محباً للعلم يبحث عن الإلهام، ستجد في أكاديميتنا ما يفتح آفاقك نحو فهم أعمق وإبداع أكبر.</p>
                           <p className="font-bold">🚀 استعد… فالفيزياء هنا ليست مادة تُدرس، بل فن نعيشه!</p>
                        </div>
                        <div className="mt-8 flex justify-center md:justify-start">
                           <Button asChild className="animate-pulse-slow hover:animate-none hover:-translate-y-1 transition-transform" size="lg">
                                <Link href="#courses-section" className="flex items-center gap-2">
                                    <Rocket className="h-5 w-5" />
                                    <span>ابدأ رحلتك الآن</span>
                                </Link>
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-center items-center">
                        <div className="relative group w-full max-w-[376px] h-auto aspect-square">
                            <Image
                                src="https://i.ibb.co/SXn1vhJP/NEW-NEW.png"
                                alt="About Dana Academy"
                                width={376}
                                height={376}
                                className="rounded-xl object-cover w-full h-full"
                                data-ai-hint="teacher classroom"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </Section>

        {/* Wavy Separator to White */}
        <div className="bg-background z-10 relative">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                <path d="M0 0C144 0 288 0 432 25C576 50 720 100 864 100C1008 100 1152 50 1296 25C1440 0 1440 0 1440 0V100H0V0Z" fill="hsl(var(--muted))"></path>
            </svg>
        </div>


        {/* Courses Section */}
        <Section id="courses-section" className="bg-muted z-10 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        الدورات المتاحة
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        انضم إلى دوراتنا المصممة بعناية لمساعدتك على إتقان مفاهيم الفيزياء وتحقيق أفضل النتائج.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 justify-center">
                  {courses.map((course, index) => (
                    <div key={index} className="flex justify-center">
                      <CourseCard course={course} />
                    </div>
                  ))}
                </div>
            </div>
        </Section>

        {/* Why Dana Academy Section */}
        <Section className="bg-background z-10 relative">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6 animate-fade-in-up animation-delay-300">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        لماذا دانا أكاديمي؟
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        لأننا نؤمن أن الفيزياء تصبح ممتعة ومفهومة عندما نقدمها بأسلوب مبتكر يجمع بين البساطة والتكنولوجيا والإبداع.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <FlippableCard
                        cardId="everyday"
                        frontContent={{
                            title: "شرح مبسط مرتبط بالحياة اليومية",
                            imageUrl: "https://i.ibb.co/gFFDYFbj/ICON3.png",
                            imageHint: "atom"
                        }}
                        backContent={{
                            description: "نفكك المفاهيم الصعبة ونربطها بمواقف وأمثلة من واقعك، لتشعر أن الفيزياء جزء من حياتك وليست مجرد مادة دراسية."
                        }}
                    />
                    <FlippableCard
                        cardId="simulation"
                        frontContent={{
                            title: "تعليم تفاعلي باستخدام برامج المحاكاة",
                             imageUrl: "https://i.ibb.co/FLscDsbC/ICON1.png",
                            imageHint: "simulation"
                        }}
                        backContent={{
                            description: "نحوّل القوانين والتجارب إلى نماذج حيّة عبر برامج محاكاة متطورة، لترى الفيزياء أمامك كما لو كنت في مختبر حقيقي."
                        }}
                    />
                    <FlippableCard
                        cardId="ai"
                        frontContent={{
                            title: "اختبارات ذكية مدعومة بالذكاء الاصطناعي",
                             imageUrl: "https://i.ibb.co/39xKXsSR/ICON2.png",
                            imageHint: "robot brain"
                        }}
                        backContent={{
                            description: "اختبارات تغطي المنهج كاملًا، تعطيك ملاحظات فورية وخطط تعلم شخصية لتحسين مستواك خطوة بخطوة."
                        }}
                    />
                </div>
            </div>
        </Section>
        
        {/* Testimonials Section */}
        <Section className="bg-white">
          <div className="container mx-auto px-4 md:px-6">
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
            <div className="mt-12 hidden md:block">
              <TestimonialsMap testimonials={testimonials} />
            </div>
             <div className="mt-12 md:hidden">
              <p className="text-center text-muted-foreground">عرض الخريطة التفاعلية متاح على شاشات سطح المكتب.</p>
            </div>
          </div>
        </Section>

        {/* Student Achievements Section */}
        <Section className="bg-background">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        إنجازات طلابنا
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        نفخر بطلابنا ونتائجهم المتميزة التي هي شهادة على نجاح أساليبنا التعليمية.
                    </p>
                </div>
                <div className="mt-12 grid gap-x-8 gap-y-24 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
                    {studentAchievements.map((student, index) => (
                        <AchievementCard key={index} student={student} />
                    ))}
                </div>
            </div>
        </Section>

        {/* Memorable Moments Section */}
        <Section className="bg-muted">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        ألبوم الصور
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        لقطات من ورشات العمل والفعاليات التي جمعتنا بطلابنا.
                    </p>
                </div>
                <div className="mt-12">
                   <ImageSwiper images={memorableMoments} />
                </div>
            </div>
        </Section>
        
      </div>
    </MarketingLayout>
  );
}
