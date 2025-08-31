
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
import { updateExamAction, generateExamQuestionAction } from '@/app/admin/exams/actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { ExamWithQuestions } from '@/app/exam/[examId]/actions';

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
export type ExamQuestion = z.infer<typeof questionSchema>;

function AiQuestionGenerator({ onAppend }: { onAppend: (question: ExamQuestion) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [rawText, setRawText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!rawText.trim()) {
        toast({ variant: 'destructive', title: 'الرجاء إدخال نص السؤال.' });
        return;
    }
    setIsLoading(true);
    const result = await generateExamQuestionAction(rawText);
    setIsLoading(false);

    if (result.success && result.data) {
        onAppend(result.data);
        setIsOpen(false);
        setRawText('');
         toast({
            title: 'تمت إضافة السؤال بنجاح!',
            description: 'قام الذكاء الاصطناعي بتنسيق السؤال وإضافته إلى نهاية القائمة. الرجاء تحديد الإجابة الصحيحة.',
        });
    } else {
        toast({
            variant: 'destructive',
            title: 'فشل تنسيق السؤال',
            description: result.error || 'حدث خطأ غير متوقع.'
        });
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button type="button" variant="outline" className="w-full">
          <Sparkles className="me-2 h-4 w-4 text-yellow-500" />
           إضافة سؤال بمساعدة الذكاء الاصطناعي (تنسيق LaTeX)
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-2xl">
        <AlertDialogHeader>
          <AlertDialogTitle>مساعد تنسيق الأسئلة بالذكاء الاصطناعي</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              <p>أدخلي نص السؤال والخيارات والشرح هنا. سيقوم الذكاء الاصطناعي بتحويل الصيغ إلى تنسيق LaTeX وتعبئة الحقول تلقائيًا.</p>
              <p className="mt-2 text-xs">مثال للتنسيق: (يمكنك فقط كتابة "سؤال:", "خيارات:", "شرح:")</p>
              <pre className="mt-2 p-2 bg-muted text-xs rounded-md text-start" dir="ltr">{`
السؤال: سيارة كتلتها 1000kg ...
الخيارات:
1) 20,000 kg.m/s
2) 50 kg.m/s
3) ...
4) ...
الشرح: الزخم الخطي (p) = الكتلة...
              `}</pre>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
            <Label htmlFor="ai-topic">نص السؤال والخيارات والشرح</Label>
            <Textarea
                id="ai-topic"
                value={rawText}
                onChange={(e) => setRawText(e.target.value)}
                placeholder="أدخل النص هنا..."
                rows={10}
            />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>إلغاء</AlertDialogCancel>
          <Button onClick={handleGenerate} disabled={isLoading}>
            {isLoading && <Loader2 className="me-2 h-4 w-4 animate-spin" />}
            تنسيق وإضافة السؤال
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
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
                      <SelectItem value="tawjihi-2007-supplementary">فيزياء تكميلي 2007</SelectItem>
                      <SelectItem value="tawjihi-2008">فيزياء توجيهي 2008</SelectItem>
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
                {fields.map((field, index) => (
                    <QuestionForm key={field.id} form={form} index={index} remove={remove} />
                ))}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                   <AiQuestionGenerator onAppend={(q) => append(q)} />
                </div>
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
