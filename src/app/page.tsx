
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, Atom, Rocket, BrainCircuit, Lightbulb, Beaker, Orbit } from 'lucide-react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

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
                <path d="M0 50C144 100 288 100 432 75C576 50 720 0 864 0C1008 0 1152 50 1296 75C1440 100 1440 100 1440 100V100H0V50Z" fill="#efede9"></path>
            </svg>
        </div>

        <Section className="bg-[#efede9]">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6 text-center md:text-start">
                        <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">
                            عن دانا أكاديمي؟
                        </h2>
                        <p className="text-lg text-muted-foreground">
                            هنا نص تعريفي عن الأكاديمية، رؤيتها، ورسالتها. يمكن شرح النهج التعليمي المبتكر وكيف تساهم المنصة في تبسيط العلوم وجعلها ممتعة للطلاب من جميع المستويات.
                        </p>
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
      </div>
    </MarketingLayout>
  );
}
