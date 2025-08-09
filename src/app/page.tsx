
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FlippableCard } from '@/components/flippable-card';
import { FloatingIcons } from '@/components/floating-icons';
import { Logo } from '@/components/logo';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
}

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative bg-background flex items-center justify-center text-center overflow-hidden py-20">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="z-10 flex flex-col items-center md:items-start text-center md:text-start space-y-6 animate-fade-in-up">
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                            أهلاً وسهلاً بكم في موقع دانا أكاديمي
                        </h1>
                        <p className="text-xl md:text-2xl text-primary/80">
                            تدريس الفيزياء فنّ وإبداع
                        </p>
                    </div>
                     <div className="grid grid-cols-2 gap-4 items-center">
                        <Image 
                            src="https://placehold.co/400x400.png" 
                            alt="صورة مربعة" 
                            width={400} 
                            height={400} 
                            className="rounded-lg shadow-lg"
                            data-ai-hint="education physics"
                        />
                        <Image 
                            src="https://placehold.co/300x450.png" 
                            alt="صورة مستطيلة" 
                            width={300} 
                            height={450} 
                            className="rounded-lg shadow-lg"
                            data-ai-hint="science teacher"
                        />
                    </div>
                </div>
            </div>
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
                    <div className="space-y-6 text-center md:text-start">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                            دانا أكاديمي ..  حين تتحول دراسة الفيزياء الى رحلة من الفنّ والإبداع
                        </h2>
                        <div className="text-lg text-muted-foreground space-y-4">
                           <p>✨ أهلاً بك في دانا أكاديمي – حيث تتحول الفيزياء إلى رحلة من الفن والإبداع ✨</p>
                           <p>في دانا أكاديمي نؤمن أن الفيزياء ليست مجرد معادلات جامدة، بل هي لغة الكون التي تروي لنا أروع القصص. هنا ستجد الشرح المبسط، الأمثلة الملهمة، والتجارب الممتعة التي تجعل التعلم مغامرة شيقة.</p>
                           <p>سواء كنت طالباً تطمح للتفوق أو محباً للعلم يبحث عن الإلهام، ستجد في أكاديميتنا ما يفتح آفاقك نحو فهم أعمق وإبداع أكبر.</p>
                           <p>🚀 استعد… فالفيزياء هنا ليست مادة تُدرس، بل فن نعيشه!</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center md:justify-start">
                            <Logo className="h-28 w-64 rounded-md object-contain" />
                        </div>
                    </div>
                    <div className="flex justify-center">
                         <Image
                            src="https://i.ibb.co/SXn1vhJP/NEW-NEW.png"
                            alt="About Dana Academy"
                            width={726}
                            height={528}
                            className="scale-120"
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
                            src="https://placehold.co/600x400.png"
                            alt="فيزياء التوجيهي الاردني"
                            layout="fill"
                            objectFit="cover"
                            className="group-hover:scale-110 transition-transform duration-500"
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
                            title: "🌀 شرح مبسط مرتبط بالحياة اليومية",
                        }}
                        backContent={{
                            description: "نفكك المفاهيم الصعبة ونربطها بمواقف وأمثلة من واقعك، لتشعر أن الفيزياء جزء من حياتك وليست مجرد مادة دراسية."
                        }}
                    />
                    <FlippableCard
                        cardId="simulation"
                        frontContent={{
                            title: "🖥️ تعليم تفاعلي باستخدام برامج المحاكاة",
                        }}
                        backContent={{
                            description: "نحوّل القوانين والتجارب إلى نماذج حيّة عبر برامج محاكاة متطورة، لترى الفيزياء أمامك كما لو كنت في مختبر حقيقي."
                        }}
                    />
                    <FlippableCard
                        cardId="ai"
                        frontContent={{
                            title: "🤖 اختبارات ذكية مدعومة بالذكاء الاصطناعي",
                        }}
                        backContent={{
                            description: "اختبارات تغطي المنهج كاملًا، تعطيك ملاحظات فورية وخطط تعلم شخصية لتحسين مستواك خطوة بخطوة."
                        }}
                    />
                </div>
            </div>
        </Section>
      </div>
    </MarketingLayout>
  );
}
