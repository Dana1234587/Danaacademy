import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { FileText } from 'lucide-react';

export default function ContentPage({ params }: { params: { slug: string[] } }) {
  const path = params.slug.join(' / ');

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-primary" />
              <span>محتوى الصفحة</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-lg">هذه صفحة هيكلية للمسار:</p>
            <code className="block bg-muted p-2 rounded-md mt-2 text-foreground font-code">
              {path}
            </code>
            <p className="mt-4 text-muted-foreground">
              سيتم إضافة المحتوى الفعلي هنا لاحقًا.
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
