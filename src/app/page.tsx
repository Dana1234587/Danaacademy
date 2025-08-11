

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import Link from 'next/link';
import { FlippableCard } from '@/components/flippable-card';
import { ImageSwiper } from '@/components/image-swiper';
import { AchievementCard } from '@/components/achievement-card';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
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
    src: 'https://i.ibb.co/9hbdB5d/Untitled-design-14.png',
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
    {
      name: "ليان ابو طربوش",
      title: "طالبة توجيهي 2024",
      image: "https://i.ibb.co/hFvWxR4/1212.png",
      review: "الشرح كان أكثر من رائع! أستاذة دانا حولت المفاهيم المعقدة إلى أفكار بسيطة وممتعة. بفضلها، أصبحت الفيزياء المادة المفضلة عندي."
    },
    {
      name: "محمد الهاشمي",
      title: "طالبة توجيهي 2024",
      image: "",
      review: "لم أتوقع أبدًا أن أتمكن من حل مسائل الفيزياء بهذه السهولة. الاختبارات الدورية والمتابعة المستمرة ساعدتني على تطوير مستواي بشكل كبير."
    },
    {
      name: "نور الحسن",
      title: "طالبة توجيهي 2024",
      image: "",
      review: "أكثر ما يميز الأكاديمية هو استخدام المحاكاة. رؤية التجارب عمليًا أمامي جعلتني أفهم القوانين الفيزيائية بشكل أعمق وأكثر واقعية. شكرًا أستاذة دانا."
    }
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
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
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
                    </div>
                    <div className="flex justify-center">
                         <Image
                            src="https://i.ibb.co/SXn1vhJP/NEW-NEW.png"
                            alt="About Dana Academy"
                            width={376}
                            height={220}
                            className=""
                            data-ai-hint="teacher classroom"
                          />
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
        <Section className="bg-muted z-10 relative">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        الدورات المتاحة
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        انضم إلى دوراتنا المصممة بعناية لمساعدتك على إتقان مفاهيم الفيزياء وتحقيق أفضل النتائج.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 justify-center sm:grid-cols-1 lg:grid-cols-1">
                  <Card className="group max-w-3xl mx-auto w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-full overflow-hidden">
                        <Image
                            src="https://i.ibb.co/tynPpNn/Screenshot-2025-08-10-002837.png"
                            alt="فيزياء التوجيهي الاردني"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            data-ai-hint="physics textbook"
                          />
                      </div>
                      <div className="flex flex-col justify-between p-6">
                        <CardHeader className="p-0">
                            <CardTitle className="text-2xl font-bold text-primary">فيزياء التوجيهي الاردني</CardTitle>
                        </CardHeader>
                        <CardContent className="p-0 mt-4 space-y-4">
                            <p className="text-muted-foreground">
                                دورة شاملة لمنهج الفيزياء للتوجيهي الأردني، تغطي جميع الوحدات والمفاهيم الأساسية مع شرح مبسط وتمارين مكثفة.
                            </p>
                            <Button asChild className="w-full mt-4 animate-pulse-slow" size="lg">
                                <Link href="/physics" className="flex items-center gap-2">
                                    <span>عرض الدورة</span>
                                    <ArrowLeft className="h-5 w-5" />
                                </Link>
                            </Button>
                        </CardContent>
                      </div>
                    </div>
                  </Card>
                </div>
            </div>
        </Section>

        {/* Why Dana Academy Section */}
        <Section className="bg-background z-10 relative">
            <div className="container px-4 md:px-6">
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
        
        {/* Student Achievements Section */}
        <Section className="bg-background">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        إنجازات طلابنا
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        نفخر بطلابنا ونتائجهم المتميزة التي هي شهادة على نجاح أساليبنا التعليمية.
                    </p>
                </div>
                <div className="mt-12 grid gap-x-8 gap-y-24 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 justify-center">
                    {studentAchievements.map((student, index) => (
                        <AchievementCard key={index} student={student} />
                    ))}
                </div>
            </div>
        </Section>

        {/* Testimonials Section */}
        <Section className="bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-6">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                آراء طلابنا
              </h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                شهادات طلابنا هي مصدر فخرنا وأكبر دليل على نجاحنا.
              </p>
            </div>
            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="bg-background border-primary/20 border-dashed border-2 flex flex-col">
                  <CardHeader className="flex flex-row items-center gap-4 pb-4">
                    <Avatar>
                      <AvatarImage src={testimonial.image || `https://placehold.co/100x100.png`} alt={testimonial.name} data-ai-hint="student avatar" />
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-lg font-bold">{testimonial.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </CardHeader>
                  <CardContent className="p-6 flex-grow flex flex-col">
                    <div className="relative w-full aspect-[16/9] rounded-md overflow-hidden mb-4">
                      <Image
                        src="https://i.ibb.co/hFvWxR4r/1212.png"
                        alt={`Review from ${testimonial.name}`}
                        layout="fill"
                        objectFit="contain"
                        data-ai-hint="student review screenshot"
                      />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </Section>

        {/* Memorable Moments Section */}
        <Section className="bg-muted">
            <div className="container px-4 md:px-6">
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
