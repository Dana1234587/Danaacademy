
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

function WavySeparator() {
  return (
    <div className="w-full">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
        <path d="M1440 29.8947C1336.87 10.0449 1111.2 -32.3084 899.021 34.4695C728.986 89.1033 511.281 98.2429 299.999 54.4695C142.025 21.6593 0 29.8947 0 29.8947V120H1440V29.8947Z" fill="hsl(var(--background))"/>
      </svg>
    </div>
  )
}

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
}


export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <div className="relative h-[600px] flex items-center justify-center text-center text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image 
                    src="https://placehold.co/1920x1080.png"
                    alt="Physics background"
                    layout="fill"
                    objectFit="cover"
                    className="opacity-20"
                    data-ai-hint="physics doodles background"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-primary/40"></div>
            </div>

            <div className="relative z-10 p-4 space-y-6">
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                أهلاً وسهلاً بكم في موقع دانا أكاديمي
                </h1>
                <p className="text-xl md:text-2xl font-light">
                التدريس فن وإبداع
                </p>
                <div className="flex justify-center">
                  <Button variant="secondary" size="lg" className="gap-2 rounded-full shadow-lg">
                      <PlayCircle className="w-6 h-6"/>
                      شاهد الفيديو التعريفي
                  </Button>
                </div>
            </div>
        </div>

        <WavySeparator />

        <Section>
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
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <Users className="w-5 h-5"/>
                                <span>+10,000 طالب سعيد</span>
                            </div>
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
