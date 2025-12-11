

'use client';

import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription as FormDescriptionComponent } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon, Loader2, PlusCircle, Sparkles } from 'lucide-react';
import { QuestionForm } from '@/components/admin/question-form';
import { updateExamAction, generateQuestionAction } from '@/app/admin/exams/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import type { ExamWithQuestions } from '@/app/exam/[examId]/actions';

const availableCourses = [
    { id: 'tawjihi-2007-supplementary', name: 'فيزياء تكميلي 2007' },
    { id: 'tawjihi-2008-first-semester', name: 'فيزياء توجيهي 2008 - فصل أول' },
    { id: 'tawjihi-2008-foundation', name: 'دورة التأسيس توجيهي 2008' },
];

const questionOptionSchema = z.object({
  text: z.string().min(1, { message: 'لا يمكن ترك الخيار فارغًا.' }),
  imageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
});

const questionSchema = z.object({
      text: z.string().min(10, { message: 'نص السؤال قصير جدًا.' }),
      imageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
      options: z.array(questionOptionSchema).length(4, { message: 'يجب أن يكون هناك 4 خيارات.' }),
      correctAnswerIndex: z.coerce.number().min(0).max(3),
      explanation: z.string().optional(),
      explanationImageUrl: z.string().url({ message: "الرجاء إدخال رابط صالح أو ترك الحقل فارغًا." }).optional().or(z.literal('')),
});

const examFormSchema = z.object({
  title: z.string().min(5, { message: 'يجب أن يكون عنوان الامتحان 5 أحرف على الأقل.' }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: 'يجب أن تكون مدة الامتحان دقيقة واحدة على الأقل.' }),
  attemptsAllowed: z.coerce.number().min(1, { message: 'يجب أن يكون عدد المحاولات 1 على الأقل.' }),
  courseId: z.string({ required_error: 'الرجاء اختيار الدورة.' }).min(1, { message: 'الرجاء اختيار الدورة.' }),
  startDate: z.date().optional(),
  endDate: z.date().optional(),
  questions: z.array(questionSchema).min(1, { message: 'يجب إضافة سؤال واحد على الأقل.' }),
}).refine(data => {
    if (data.endDate && !data.startDate) {
        return false;
    }
    if (data.startDate && data.endDate && data.endDate <= data.startDate) {
        return false;
    }
    return true;
}, {
    message: 'تاريخ الانتهاء يجب أن يكون بعد تاريخ البدء.',
    path: ['endDate'],
});


export type ExamFormValues = z.infer<typeof examFormSchema>;

function AiQuestionGenerator({ onQuestionGenerated }: { onQuestionGenerated: (question: any) => void }) {
    const [topic, setTopic] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        const result = await generateQuestionAction(topic);
        setIsLoading(false);

        if (result.success && result.question) {
             const newQuestion = {
                text: result.question.text,
                imageUrl: '',
                options: result.question.options.map(opt => ({ text: opt, imageUrl: '' })),
                correctAnswerIndex: result.question.correctAnswerIndex,
                explanation: result.question.explanation,
                explanationImageUrl: ''
            };
            onQuestionGenerated(newQuestion);
            toast({ title: 'نجاح', description: 'تم إنشاء السؤال وإضافته إلى نهاية القائمة.' });
        } else {
            toast({ variant: 'destructive', title: 'فشل إنشاء السؤال', description: result.error });
        }
    };

    return (
        <div className="border border-dashed p-4 rounded-lg bg-primary/5 space-y-4">
            <p className="font-semibold text-primary flex items-center gap-2"><Sparkles className="w-5 h-5"/> إنشاء سؤال باستخدام الذكاء الاصطناعي</p>
            <Input
                placeholder="اكتب موضوع السؤال هنا (مثال: حفظ الزخم في التصادمات المرنة)"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={isLoading}
            />
            <Button type="button" onClick={handleGenerate} disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="animate-spin me-2" /> : <Sparkles className="w-4 h-4 me-2" />}
                إنشاء السؤال
            </Button>
        </div>
    );
}

export function EditExamForm({ examData }: { examData: ExamWithQuestions }) {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      ...examData,
      questions: examData.questions.map(q => ({
          ...q,
          options: q.options.map(opt => ({
              text: opt.text || '', // handle case where text is missing
              imageUrl: opt.imageUrl || ''
          }))
      }))
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = async (data: ExamFormValues) => {
    setIsLoading(true);
    const result = await updateExamAction(examData.id, data);
    setIsLoading(false);

    if(result.success) {
      toast({
        title: 'نجاح!',
        description: `تم تحديث الامتحان "${data.title}" بنجاح.`,
      });
      router.push('/admin/exams');
    } else {
      toast({
        variant: 'destructive',
        title: 'فشل تحديث الامتحان',
        description: result.error || 'حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى.',
        duration: 9000
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الامتحان الأساسية</CardTitle>
            <CardDescription>عدّل التفاصيل الرئيسية للامتحان.</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>عنوان الامتحان</FormLabel>
                  <FormControl>
                    <Input placeholder="مثال: اختبار الوحدة الأولى - الزخم الخطي" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="md:col-span-2">
                  <FormLabel>وصف الامتحان (اختياري)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="أدخل أي تعليمات أو ملاحظات للطلاب هنا..." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="courseId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>الدورة المستهدفة</FormLabel>
                   <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="اختر الدورة" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                       {availableCourses.map(course => (
                            <SelectItem key={course.id} value={course.id}>{course.name}</SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>مدة الامتحان (بالدقائق)</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="attemptsAllowed"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>عدد المحاولات المسموح بها</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                   <FormDescriptionComponent>
                    كم مرة يمكن للطالب تقديم هذا الامتحان.
                  </FormDescriptionComponent>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div/> {/* Empty div for grid layout */}

            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ ووقت البدء (اختياري)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="ms-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP p")
                          ) : (
                            <span>اختر تاريخًا ووقتًا</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                       <div className="p-3 border-t border-border">
                        <Label className="text-sm">الوقت</Label>
                        <Input
                          type="time"
                          defaultValue={field.value ? format(field.value, "HH:mm") : ""}
                          onChange={(e) => {
                            const time = e.target.value;
                            const [hours, minutes] = time.split(':').map(Number);
                            const newDate = field.value ? new Date(field.value) : new Date();
                            newDate.setHours(hours, minutes);
                            field.onChange(newDate);
                          }}
                        />
                       </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>تاريخ ووقت الانتهاء (اختياري)</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="ms-2 h-4 w-4" />
                          {field.value ? (
                            format(field.value, "PPP p")
                          ) : (
                            <span>اختر تاريخًا ووقتًا</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                       <div className="p-3 border-t border-border">
                        <Label className="text-sm">الوقت</Label>
                        <Input
                          type="time"
                          defaultValue={field.value ? format(field.value, "HH:mm") : ""}
                          onChange={(e) => {
                            const time = e.target.value;
                            const [hours, minutes] = time.split(':').map(Number);
                            const newDate = field.value ? new Date(field.value) : new Date();
                            newDate.setHours(hours, minutes);
                            field.onChange(newDate);
                          }}
                        />
                       </div>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>أسئلة الامتحان</CardTitle>
                <CardDescription>أضف أو عدّل أسئلة الامتحان وحدد الإجابات الصحيحة.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <AiQuestionGenerator onQuestionGenerated={(q) => append(q)} />
                {fields.map((field, index) => (
                    <QuestionForm key={field.id} form={form} index={index} remove={remove} />
                ))}
                
                <Button
                    type="button"
                    variant="outline"
                    className="w-full border-dashed"
                    onClick={() => append({ 
                        text: '', 
                        imageUrl: '', 
                        options: [
                          { text: '', imageUrl: '' },
                          { text: '', imageUrl: '' },
                          { text: '', imageUrl: '' },
                          { text: '', imageUrl: '' }
                        ], 
                        correctAnswerIndex: 0, 
                        explanation: '',
                        explanationImageUrl: '',
                    })}
                    >
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة سؤال جديد
                </Button>
                {form.formState.errors.questions && (
                     <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.root?.message || form.formState.errors.questions.message}</p>
                )}
            </CardContent>
             <CardFooter>
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : null}
                    حفظ التعديلات
                </Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
