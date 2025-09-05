

'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { useStore } from '@/store/app-store';
import { Card, CardContent } from '@/components/ui/card';
import { Loader2 } from 'lucide-react';
import { CourseCard } from '@/components/course-card';

// This data should ideally come from a central place
const allCourses = [
  {
    id: 'tawjihi-2007-supplementary',
    title: 'فيزياء التكميلي - جيل 2007',
    description: 'تفاصيل الدورة حصص مسجله لمادة الفيزياء التوجيهي كاملا للفصل الاول والفصل الثاني',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/Kck1HBsB/image.png',
    imageHint: 'physics textbook',
    curriculum: 'الأردن',
    link: '/courses/physics-supplementary-2007',
    detailsLink: '/courses/physics-supplementary-2007-details',
  },
  {
    id: 'tawjihi-2008-first-semester',
    title: 'فيزياء توجيهي 2008 - فصل أول',
    description: 'دورة شاملة تغطي مادة الفصل الدراسي الأول لجيل 2008، مع شرح مفصل وأسئلة مكثفة.',
    price: '50.00 د.أ',
    imageUrl: 'https://i.ibb.co/Tx4wY4wS/2.png',
    imageHint: 'physics textbook 2008',
    curriculum: 'الأردن',
    link: '/courses/physics-2008/physics-2008-first-semester',
    detailsLink: '/courses/physics-2008-first-semester-details',
  },
  {
    id: 'tawjihi-2008-foundation',
    title: 'دورة التأسيس توجيهي الأردن لجيل 2008',
    description: 'دورة تأسيسية شاملة لجيل 2008 لمساعدتهم على الاستعداد الأمثل لمادة الفيزياء في التوجيهي.',
    price: 'مجاناً',
    imageUrl: 'https://i.ibb.co/3m20cYgV/1.png',
    imageHint: 'physics foundation',
    curriculum: 'الأردن',
    link: '/courses/physics-2008-foundation',
    detailsLink: '/courses/physics-2008-foundation-details',
  },
];

export default function MyCoursesPage() {
  const { currentUser, isLoading } = useStore();

  if (isLoading) {
    return (
      <MarketingLayout>
        <div className="flex justify-center items-center h-[50vh]">
          <Loader2 className="h-16 w-16 animate-spin text-primary" />
        </div>
      </MarketingLayout>
    );
  }

  if (!currentUser) {
    return (
      <MarketingLayout>
        <div className="p-8 text-center text-lg">
          الرجاء تسجيل الدخول لعرض دوراتك.
        </div>
      </MarketingLayout>
    );
  }

  const enrolledCourses = allCourses.filter(course => currentUser.enrolledCourseIds.includes(course.id));

  return (
    <MarketingLayout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">دوراتي المسجلة</h1>
        {enrolledCourses.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {enrolledCourses.map(course => (
              <CourseCard key={course.id} course={course} isEnrolled={true} />
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              <p className="text-xl">أنت غير مسجل في أي دورة حاليًا.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </MarketingLayout>
  );
}
