
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, Atom, Rocket, BrainCircuit, Lightbulb, Beaker, Orbit, ArrowLeft, Users, Laptop, Bot } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
}

const Icon = ({ component: Component, className, style }: { component: React.ElementType, className?: string, style?: React.CSSProperties }) => (
    <Component className={cn("absolute text-primary/10", className)} style={style} />
);

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative h-[600px] flex items-center justify-center text-center bg-white overflow-hidden">
            {/* Floating Icons Background */}
            <div className="absolute inset-0 z-0">
                <Icon component={Atom} className="top-[10%] left-[5%] w-16 h-16 animate-float" style={{ animationDuration: '8s' }} />
                <Icon component={Rocket} className="top-[20%] right-[10%] w-20 h-20 animate-float" style={{ animationDuration: '10s' }} />
                <Icon component={BrainCircuit} className="bottom-[15%] left-[15%] w-24 h-24 animate-float" style={{ animationDuration: '12s' }} />
                <Icon component={Lightbulb} className="top-[60%] left-[30%] w-12 h-12 animate-float" style={{ animationDuration: '7s' }} />
                <Icon component={Beaker} className="bottom-[10%] right-[25%] w-16 h-16 animate-float" style={{ animationDuration: '9s' }} />
                <Icon component={Orbit} className="top-[40%] right-[40%] w-14 h-14 animate-float" style={{ animationDuration: '11s' }} />
                 <Icon component={Atom} className="bottom-[5%] right-[5%] w-16 h-16 animate-float" style={{ animationDuration: '8s' }} />
                <Icon component={Rocket} className="bottom-[20%] left-[10%] w-20 h-20 animate-float" style={{ animationDuration: '10s' }} />
                <Icon component={BrainCircuit} className="top-[15%] right-[15%] w-24 h-24 animate-float" style={{ animationDuration: '12s' }} />
            </div>

            <div className="z-10 flex flex-col items-center space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                    أهلاً وسهلاً بكم في موقع دانا أكاديمي
                </h1>
                <p className="text-xl md:text-2xl text-primary/80">
                    تدريس الفيزياء فنّ وإبداع
                </p>
                <Button size="lg" className="gap-2 text-lg">
                    <PlayCircle />
                    شاهد الفيديو التعريفي
                </Button>
            </div>
        </div>

        {/* Wavy Separator */}
        <div className="bg-white">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                <path d="M0 50C144 100 288 100 432 75C576 50 720 0 864 0C1008 0 1152 50 1296 75C1440 100 1440 100 1440 100V100H0V50Z" fill="#F5F5F5"></path>
            </svg>
        </div>

        <Section className="bg-muted">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center md:text-start">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                            عن دانا أكاديمي؟
                        </h2>
                        <div className="text-lg text-muted-foreground space-y-4">
                           <p>✨ أهلاً بك في دانا أكاديمي – حيث تتحول الفيزياء إلى رحلة من الفن والإبداع ✨</p>
                           <p>في دانا أكاديمي نؤمن أن الفيزياء ليست مجرد معادلات جامدة، بل هي لغة الكون التي تروي لنا أروع القصص. هنا ستجد الشرح المبسط، الأمثلة الملهمة، والتجارب الممتعة التي تجعل التعلم مغامرة شيقة.</p>
                           <p>سواء كنت طالباً تطمح للتفوق أو محباً للعلم يبحث عن الإلهام، ستجد في أكاديميتنا ما يفتح آفاقك نحو فهم أعمق وإبداع أكبر.</p>
                           <p>🚀 استعد… فالفيزياء هنا ليست مادة تُدرس، بل فن نعيشه!</p>
                        </div>
                        <div className="flex gap-4 items-center justify-center md:justify-start">
                            <Button variant="ghost" className="gap-2 text-primary">
                                <PlayCircle className="w-5 h-5"/>
                                شاهد الفيديو
                            </Button>
                        </div>
                    </div>
                    <div className="flex justify-center">
                         <Image
                            src="https://placehold.co/600x400.png"
                            alt="About Dana Academy"
                            width={550}
                            height={400}
                            className="rounded-xl shadow-lg"
                            data-ai-hint="teacher classroom"
                          />
                    </div>
                </div>
            </div>
        </Section>

        {/* Wavy Separator to White */}
        <div className="bg-muted">
            <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
                <path d="M0 0C144 0 288 0 432 25C576 50 720 100 864 100C1008 100 1152 50 1296 25C1440 0 1440 0 1440 0V100H0V0Z" fill="#FFFFFF"></path>
            </svg>
        </div>


        {/* Courses Section */}
        <Section className="bg-white">
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
                  <Card className="max-w-3xl mx-auto w-full overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="grid md:grid-cols-2">
                      <div className="relative h-64 md:h-full">
                        <Image
                            src="https://placehold.co/600x400.png"
                            alt="فيزياء التوجيهي الاردني"
                            layout="fill"
                            objectFit="cover"
                            data-ai-hint="physics textbook"
                          />
                      </div>
                      <div className="flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-2xl font-bold text-primary">فيزياء التوجيهي الاردني</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <p className="text-muted-foreground">
                                دورة شاملة لمنهج الفيزياء للتوجيهي الأردني، تغطي جميع الوحدات والمفاهيم الأساسية مع شرح مبسط وتمارين مكثفة.
                            </p>
                            <Button asChild className="w-full mt-4" size="lg">
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
        <Section className="bg-white">
            <div className="container px-4 md:px-6">
                <div className="flex flex-col items-center text-center space-y-6">
                    <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                        لماذا دانا أكاديمي؟
                    </h2>
                    <p className="max-w-[700px] text-muted-foreground md:text-xl">
                        لأننا نؤمن أن الفيزياء تصبح ممتعة ومفهومة عندما نقدمها بأسلوب مبتكر يجمع بين البساطة والتكنولوجيا والإبداع.
                    </p>
                </div>
                <div className="mt-12 grid gap-8 md:grid-cols-3">
                    <Card className="flex flex-col items-center text-center p-6">
                        <div className="mb-4 p-4 bg-accent rounded-full">
                            <Users className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">🌀 شرح مبسط مرتبط بالحياة اليومية</h3>
                        <p className="text-muted-foreground">
                            نفكك المفاهيم الصعبة ونربطها بمواقف وأمثلة من واقعك، لتشعر أن الفيزياء جزء من حياتك وليست مجرد مادة دراسية.
                        </p>
                    </Card>
                    <Card className="flex flex-col items-center text-center p-6">
                        <div className="mb-4 p-4 bg-accent rounded-full">
                            <Laptop className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">🖥️ تعليم تفاعلي باستخدام برامج المحاكاة</h3>
                        <p className="text-muted-foreground">
                            نحوّل القوانين والتجارب إلى نماذج حيّة عبر برامج محاكاة متطورة، لترى الفيزياء أمامك كما لو كنت في مختبر حقيقي.
                        </p>
                    </Card>
                    <Card className="flex flex-col items-center text-center p-6">
                        <div className="mb-4 p-4 bg-accent rounded-full">
                            <Bot className="h-8 w-8 text-primary" />
                        </div>
                        <h3 className="text-xl font-bold mb-2">🤖 اختبارات ذكية مدعومة بالذكاء الاصطناعي</h3>
                        <p className="text-muted-foreground">
                            اختبارات تغطي المنهج كاملًا، تعطيك ملاحظات فورية وخطط تعلم شخصية لتحسين مستواك خطوة بخطوة.
                        </p>
                    </Card>
                </div>
            </div>
        </Section>
      </div>
    </MarketingLayout>
  );
}
