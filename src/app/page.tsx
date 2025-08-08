
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Atom, BookOpen, BrainCircuit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        <section className="bg-background py-12 sm:py-24 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-8 md:grid-cols-2 md:items-center">
            <div className="space-y-4 text-center md:text-start">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                أكاديمية دانة: طريقك لإتقان الفيزياء
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto md:mx-0">
                شروحات مبسطة، محاكاة تفاعلية، واختبارات ذكية مصممة خصيصاً لمساعدتك على التفوق في منهج التوجيهي الأردني.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="/physics">استكشف دورة الفيزياء</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#">إنشاء حساب</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Physics Illustration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="physics abstract"
              />
            </div>
          </div>
        </section>
        
        <section id="features" className="py-12 sm:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">لماذا تختار أكاديمية دانة؟</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
                نحن نوفر لك كل ما تحتاجه للنجاح في رحلتك التعليمية.
              </p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">محتوى شامل ومنظم</h3>
                  <p className="text-muted-foreground">
                    دروس مفصلة تغطي كامل المنهاج الدراسي، مرتبة بشكل يسهل عليك المتابعة والمراجعة.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <Atom className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">محاكاة تفاعلية</h3>
                  <p className="text-muted-foreground">
                    فهم أعمق للمفاهيم الفيزيائية المعقدة من خلال تجارب ومحاكاة تفاعلية ممتعة.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="p-3 rounded-full bg-primary/10 w-fit">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">اختبارات بالذكاء الاصطناعي</h3>
                  <p className="text-muted-foreground">
                    أنشئ اختبارات قصيرة مخصصة لتقييم فهمك وتعزيز معرفتك في أي موضوع فرعي.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
