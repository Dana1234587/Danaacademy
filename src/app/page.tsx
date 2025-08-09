
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { PlayCircle, Atom, Rocket, BrainCircuit, Lightbulb, Beaker, Orbit } from 'lucide-react';
import Image from 'next/image';

function Section({ children, className }: { children: React.ReactNode, className?: string }) {
  return <section className={`py-12 md:py-20 ${className}`}>{children}</section>;
}

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <Section className="bg-white">
            <div className="container px-4 md:px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div className="space-y-4 text-start">
                        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-primary">
                          ✨ أهلاً بك في دانا أكاديمي – حيث تتحول الفيزياء إلى رحلة من الفن والإبداع ✨
                        </h1>
                        <p className="text-lg text-muted-foreground">
                          في دانا أكاديمي نؤمن أن الفيزياء ليست مجرد معادلات جامدة، بل هي لغة الكون التي تروي لنا أروع القصص.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          هنا ستجد الشرح المبسط، الأمثلة الملهمة، والتجارب الممتعة التي تجعل التعلم مغامرة شيقة.
                        </p>
                        <p className="text-lg text-muted-foreground">
                          سواء كنت طالباً تطمح للتفوق أو محباً للعلم يبحث عن الإلهام، ستجد في أكاديميتنا ما يفتح آفاقك نحو فهم أعمق وإبداع أكبر.
                        </p>
                        <p className="text-xl font-semibold text-primary">
                          🚀 استعد… فالفيزياء هنا ليست مادة تُدرس، بل فن نعيشه!
                        </p>
                    </div>
                    <div className="flex justify-center">
                         <Image
                            src="https://placehold.co/600x400.png"
                            alt="Dana Academy Hero Image"
                            width={550}
                            height={400}
                            className="rounded-xl shadow-lg"
                            data-ai-hint="physics learning fun"
                          />
                    </div>
                </div>
            </div>
        </Section>


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
