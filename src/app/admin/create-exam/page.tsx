
import { MainLayout } from '@/components/layout/main-layout';
import { CreateExamForm } from '@/components/admin/create-exam-form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CreateExamPage() {
  return (
      <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">إنشاء امتحان جديد</h1>
            <p className="text-muted-foreground mt-2">
              املأ الحقول التالية لإنشاء امتحان جديد للدورة التي تختارها.
            </p>
          </div>
           <Button asChild variant="outline">
              <Link href="/admin/exams">
                <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الامتحانات
              </Link>
          </Button>
        </div>

        <CreateExamForm />
        
      </div>
  );
}
