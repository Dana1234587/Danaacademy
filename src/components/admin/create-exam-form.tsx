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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, PlusCircle } from 'lucide-react';
import { QuestionForm } from './question-form';

const examFormSchema = z.object({
  title: z.string().min(5, { message: 'يجب أن يكون عنوان الامتحان 5 أحرف على الأقل.' }),
  description: z.string().optional(),
  duration: z.coerce.number().min(1, { message: 'يجب أن تكون مدة الامتحان دقيقة واحدة على الأقل.' }),
  courseId: z.string({ required_error: 'الرجاء اختيار الدورة.' }),
  questions: z.array(
    z.object({
      text: z.string().min(10, { message: 'نص السؤال قصير جدًا.' }),
      imageUrl: z.string().url().optional().or(z.literal('')),
      options: z.array(z.string().min(1, { message: 'لا يمكن ترك الخيار فارغًا.' })).length(4, { message: 'يجب أن يكون هناك 4 خيارات.' }),
      correctAnswerIndex: z.coerce.number().min(0).max(3),
      explanation: z.string().optional(),
    })
  ).min(1, { message: 'يجب إضافة سؤال واحد على الأقل.' }),
});

type ExamFormValues = z.infer<typeof examFormSchema>;

export function CreateExamForm() {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ExamFormValues>({
    resolver: zodResolver(examFormSchema),
    defaultValues: {
      title: '',
      description: '',
      duration: 60,
      courseId: '',
      questions: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'questions',
  });

  const onSubmit = async (data: ExamFormValues) => {
    setIsLoading(true);
    console.log(data);
    // Here we will call a server action to save the exam to Firestore
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>معلومات الامتحان الأساسية</CardTitle>
            <CardDescription>أدخل التفاصيل الرئيسية للامتحان.</CardDescription>
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
          </CardContent>
        </Card>

        <Card>
            <CardHeader>
                <CardTitle>أسئلة الامتحان</CardTitle>
                <CardDescription>أضف أسئلة الامتحان وحدد الإجابات الصحيحة.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
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
                        options: ['', '', '', ''], 
                        correctAnswerIndex: 0, 
                        explanation: '' 
                    })}
                    >
                    <PlusCircle className="me-2 h-4 w-4" />
                    إضافة سؤال جديد
                </Button>
                {form.formState.errors.questions && (
                    <p className="text-sm font-medium text-destructive">{form.formState.errors.questions.message}</p>
                )}
            </CardContent>
             <CardFooter>
                <Button type="submit" disabled={isLoading} size="lg">
                    {isLoading ? <Loader2 className="me-2 h-4 w-4 animate-spin" /> : null}
                    حفظ الامتحان
                </Button>
            </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
