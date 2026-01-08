
import { getExamForStudent } from '@/app/exam/[examId]/actions';
import { CreateExamForm } from '@/app/admin/create-exam-form';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { EditExamForm } from './edit-exam-form';
import { notFound } from 'next/navigation';

export default async function EditExamPage({ params }: { params: Promise<{ examId: string }> }) {
  const { examId } = await params;
  const exam = await getExamForStudent(examId);

  if (!exam) {
    notFound();
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">تعديل امتحان: {exam.title}</h1>
          <p className="text-muted-foreground mt-2">
            قم بتعديل تفاصيل وأسئلة الامتحان.
          </p>
        </div>
        <Button asChild variant="outline">
          <Link href="/admin/exams">
            <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الامتحانات
          </Link>
        </Button>
      </div>

      <EditExamForm examData={exam} />

    </div>
  );
}
