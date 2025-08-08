import { MainLayout } from '@/components/layout/main-layout';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';
import { QuizForm } from './quiz-form';

export default function QuizGeneratorPage() {
  return (
    <MainLayout>
      <div className="p-4 sm:p-6 lg:p-8 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              <span>مولد الاختبارات بالذكاء الاصطناعي</span>
            </CardTitle>
            <CardDescription>
              أنشئ اختبارات قصيرة مخصصة حول أي موضوع فرعي في الفيزياء. أدخل الموضوع ومستوى الصعوبة المطلوب.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <QuizForm />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
