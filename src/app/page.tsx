import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { BookOpen } from 'lucide-react';

export default function Home() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="w-6 h-6" />
              <span>مرحباً بك في أكاديمية دانة للفيزياء</span>
            </CardTitle>
            <CardDescription>
              منصة متكاملة لتعلم الفيزياء لطلاب التوجيهي. تصفح الفصول الدراسية، أجرِ اختبارات قصيرة، وجرب المحاكاة التفاعلية.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p>
              استخدم الشريط الجانبي للتنقل بين المواضيع المختلفة. يمكنك البدء باختيار الفصل الدراسي ومن ثم الوحدة التي ترغب في دراستها.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
