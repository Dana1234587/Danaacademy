
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, Atom, Rocket, BrainCircuit, Lightbulb, Beaker, Orbit } from 'lucide-react';
import Image from 'next/image';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
}

const BackgroundIcon = ({ icon: Icon, className }: { icon: React.ElementType, className?: string }) => {
    return (
        <Icon className={`absolute text-slate-300/80 -z-10 ${className}`} />
    )
}

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative h-[600px] flex items-center justify-center text-center bg-white overflow-hidden">
            <div aria-hidden="true" className="absolute inset-0 z-0">
                <BackgroundIcon icon={Atom} className="w-32 h-32 top-1/4 left-1/4 animate-pulse" />
                <BackgroundIcon icon={Rocket} className="w-24 h-24 top-1/2 right-1/4 -rotate-45 animate-pulse delay-500" />
                <BackgroundIcon icon={BrainCircuit} className="w-48 h-48 bottom-10 left-20 opacity-50" />
                <BackgroundIcon icon={Lightbulb} className="w-20 h-20 top-20 right-48 animate-pulse delay-1000" />
                <BackgroundIcon icon={Beaker} className="w-28 h-28 bottom-24 right-32 rotate-12" />
                <BackgroundIcon icon={Orbit} className="w-36 h-36 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-30" />
            </div>

            <div className="relative z-10 p-4 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-primary">
                  أهلاً وسهلاً بكم في موقع دانا أكاديمي
                </h1>
                <p className="text-xl md:text-2xl font-light text-primary">
                  تدريس الفيزياء فنّ وإبداع
                </p>
                <div className="flex justify-center">
                  <Button variant="secondary" size="lg" className="gap-2 rounded-full shadow-lg">
                      <PlayCircle className="w-6 h-6"/>
                      شاهد الفيديو التعريفي
                  </Button>
                </div>
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
