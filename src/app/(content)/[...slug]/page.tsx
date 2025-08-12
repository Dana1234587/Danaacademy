
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText, Atom, ClipboardCheck } from 'lucide-react';
import { notFound } from 'next/navigation';

// A simple map to get details based on the content type segment
const contentTypeDetails: { [key: string]: { icon: React.ElementType; title: string; description: string } } = {
  concepts: {
    icon: FileText,
    title: 'شرح المادة',
    description: 'هنا ستجد الشرح التفصيلي للدرس والفيديوهات التعليمية.'
  },
  quizzes: {
    icon: ClipboardCheck,
    title: 'اختبار قصير',
    description: 'اختبر فهمك للدرس من خلال هذا الاختبار القصير.'
  },
  simulations: {
    icon: Atom,
    title: 'محاكاة تفاعلية',
    description: 'استكشف المفاهيم الفيزيائية من خلال تجارب محاكاة تفاعلية.'
  }
};


export default function ContentPage({ params }: { params: { slug: string[] } }) {
  const slug = params.slug || [];
  const contentType = slug[slug.length - 1];
  const details = contentTypeDetails[contentType];
  
  if (!details) {
    // If the last segment is not a valid content type, show a 404 page.
    // This could be a parent folder page, which we might want to create in the future.
    // For now, we only render the leaf content pages.
    notFound();
  }
  
  const path = slug.slice(0, -1).join(' / ');
  const { icon: Icon, title, description } = details;

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Icon className="w-6 h-6 text-primary" />
              <span>{title}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">هذه صفحة هيكلية للمسار:</p>
            <code className="block bg-muted p-2 rounded-md mt-2 text-foreground font-code" dir="ltr">
              {path}
            </code>
            <p className="mt-4 text-muted-foreground">
              {description} سيتم إضافة المحتوى الفعلي هنا لاحقًا.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
