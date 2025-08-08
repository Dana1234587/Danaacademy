
import { MarketingLayout } from '@/components/layout/marketing-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Atom, BookOpen, BrainCircuit, Rocket } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <MarketingLayout>
      <div className="flex flex-col">
        {/* Hero Section */}
        <section className="bg-background py-20 sm:py-28 lg:py-32">
          <div className="container px-4 md:px-6 grid gap-10 md:grid-cols-2 md:items-center">
            <div className="space-y-6 text-center md:text-start">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-primary">
                أكاديمية دانة: مستقبلك يبدأ من هنا
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed mx-auto md:mx-0">
                منصتك الأولى لتعلم الفيزياء وكل المواد العلمية. شروحات مبسطة وتجارب تفاعلية تفتح لك آفاق المعرفة.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <Button asChild size="lg">
                  <Link href="#courses">استكشف الدورات المتاحة</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="#">إنشاء حساب مجاني</Link>
                </Button>
              </div>
            </div>
            <div className="flex justify-center">
              <Image
                src="https://placehold.co/600x400.png"
                alt="Science and Learning Illustration"
                width={600}
                height={400}
                className="rounded-xl shadow-2xl"
                data-ai-hint="science abstract"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16 sm:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">لماذا تختار أكاديمية دانة؟</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
                نحن نوفر لك كل ما تحتاجه للنجاح في رحلتك التعليمية.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <BookOpen className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">محتوى شامل ومنظم</h3>
                  <p className="text-muted-foreground">
                    دروس مفصلة تغطي كامل المناهج الدراسية، مرتبة بشكل يسهل عليك المتابعة والمراجعة.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <Atom className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">محاكاة تفاعلية</h3>
                  <p className="text-muted-foreground">
                    فهم أعمق للمفاهيم المعقدة من خلال تجارب ومحاكاة تفاعلية ممتعة.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 space-y-4 text-center">
                  <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto">
                    <BrainCircuit className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">اختبارات بالذكاء الاصطناعي</h3>
                  <p className="text-muted-foreground">
                    أنشئ اختبارات مخصصة لتقييم فهمك وتعزيز معرفتك في أي موضوع.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="py-16 sm:py-24 lg:py-32 bg-background">
          <div className="container px-4 md:px-6">
            <div className="space-y-4 text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl text-primary">استكشف دوراتنا</h2>
              <p className="max-w-[700px] mx-auto text-muted-foreground md:text-xl/relaxed">
                ابدأ رحلتك في عالم المعرفة مع دوراتنا المصممة بعناية.
              </p>
            </div>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <Image 
                  src="https://placehold.co/600x400.png"
                  alt="Physics Course"
                  width={600}
                  height={400}
                  className="w-full h-48 object-cover"
                  data-ai-hint="physics textbook"
                />
                <CardHeader>
                  <CardTitle>فيزياء التوجيهي الأردني</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    دورة شاملة تغطي الفصلين الدراسيين مع شروحات وتمارين مكثفة.
                  </p>
                  <Button asChild className="w-full">
                    <Link href="/physics">عرض تفاصيل الدورة</Link>
                  </Button>
                </CardContent>
              </Card>
              {/* Add more course cards here in the future */}
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-primary text-primary-foreground">
          <div className="container text-center px-4 py-16 md:px-6">
            <Rocket className="w-12 h-12 mx-auto mb-4" />
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">
              هل أنت مستعد لتبدأ رحلتك؟
            </h2>
            <p className="max-w-[600px] mx-auto mt-4 mb-8 text-primary-foreground/80 md:text-xl/relaxed">
              انضم إلى آلاف الطلاب الذين اختاروا أكاديمية دانة لتحقيق التميز.
            </p>
            <Button asChild size="lg" variant="secondary">
              <Link href="#">سجل الآن مجاناً</Link>
            </Button>
          </div>
        </section>
      </div>
    </MarketingLayout>
  );
}
