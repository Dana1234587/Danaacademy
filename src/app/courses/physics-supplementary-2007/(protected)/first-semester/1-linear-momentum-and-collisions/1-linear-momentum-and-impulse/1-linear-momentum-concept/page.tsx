
import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Youtube } from 'lucide-react';

// This is a placeholder for the actual lesson content page.
// In a real application, you would fetch lesson data based on the slug.
export default function LessonPage() {

  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="w-8 h-8 text-red-600" />
              <span>شرح درس: مفهوم الزخم الخطي</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-lg text-muted-foreground">
              هنا سيتم عرض فيديو الحصة.
            </p>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
              <p className="text-muted-foreground">مشغل الفيديو</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
