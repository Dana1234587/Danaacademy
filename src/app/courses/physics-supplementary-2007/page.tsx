
import { MainLayout } from '@/components/layout/main-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Image from 'next/image';
import { CheckCircle, BookOpen, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

const course = {
  title: 'فيزياء التكميلي - جيل 2007',
  description: 'دورة شاملة ومكثفة مصممة خصيصًا لطلاب التكميلي جيل 2007، تركز على شرح مادة الفيزياء للفصلين الأول والثاني بطريقة مبسطة وعميقة تضمن لك تحقيق أفضل النتائج في الامتحان الوزاري.',
  imageUrl: 'https://i.ibb.co/v6JXwghs/image.png',
  imageHint: 'physics textbook',
  price: '50.00 د.أ',
  whatYouWillLearn: [
    'فهم شامل لجميع مفاهيم الفيزياء المطلوبة في التوجيهي.',
    'حل مسائل وتمارين متنوعة تغطي كافة أفكار المنهج.',
    'الاستعداد الأمثل للاختبار الوزاري من خلال نماذج وأسئلة سنوات سابقة.',
    'اكتساب القدرة على التحليل والتفكير النقدي في حل المشكلات الفيزيائية.',
    'شرح وحل أسئلة الكتاب كاملة بالإضافة لأسئلة وزارية وأسئلة إثرائية.',
  ],
  curriculum: {
    semester1: [
      'الوحدة الأولى: الزخم الخطي والتصادمات',
      'الوحدة الثانية: الحركة الدورانية',
      'الوحدة الثالثة: التيار والدارات الكهربائية',
      'الوحدة الرابعة: المجال المغناطيسي',
    ],
    semester2: [
      'الوحدة الخامسة: الحث الكهرومغناطيسي',
      'الوحدة السادسة: فيزياء الكم',
      'الوحدة السابعة: الفيزياء النووية',
    ]
  }
};

export default function PhysicsSupplementary2007Page() {
  return (
    <MainLayout>
      <div className="container mx-auto max-w-5xl p-4 sm:p-6 lg:p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          {/* Left Column: Image & Price */}
          <div className="flex flex-col gap-6 sticky top-24">
            <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg border-2 border-primary">
              <Image
                src={course.imageUrl}
                alt={course.title}
                fill
                className="object-cover"
                data-ai-hint={course.imageHint}
              />
            </div>
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
                <p className="text-3xl font-bold text-primary">{course.price}</p>
                <Button size="lg" className="text-lg">
                    انضم للدورة الآن
                    <ChevronLeft className="w-5 h-5 me-2" />
                </Button>
            </div>
             <Button variant="outline" asChild>
                <Link href="/">
                    <ChevronLeft className="w-4 h-4 me-2" />
                    العودة إلى الصفحة الرئيسية
                </Link>
            </Button>
          </div>

          {/* Right Column: Course Details */}
          <div className="flex flex-col gap-8">
            <Card className="bg-background/80 backdrop-blur-sm">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-primary">{course.title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="text-lg text-muted-foreground">{course.description}</p>
                </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <CheckCircle className="w-6 h-6 text-primary" />
                  <span>ماذا ستتعلم في هذه الدورة؟</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {course.whatYouWillLearn.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                      <span className="text-muted-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                   <BookOpen className="w-6 h-6 text-primary" />
                   <span>محتويات الدورة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible defaultValue="item-0">
                  <AccordionItem value="item-0">
                    <AccordionTrigger className="text-lg font-semibold">الفصل الأول</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 list-disc pe-4 mt-2">
                        {course.curriculum.semester1.map((topic, index) => (
                          <li key={index} className="text-muted-foreground">{topic}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-semibold">الفصل الثاني</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 list-disc pe-4 mt-2">
                        {course.curriculum.semester2.map((topic, index) => (
                          <li key={index} className="text-muted-foreground">{topic}</li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
