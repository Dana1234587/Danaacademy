'use client';

import React from 'react';
import { UseFormReturn, useFieldArray } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Trash2 } from 'lucide-react';

interface QuestionFormProps {
  form: any; // Ideally, pass the specific form type
  index: number;
  remove: (index: number) => void;
}

export function QuestionForm({ form, index, remove }: QuestionFormProps) {
  return (
    <div className="border p-4 rounded-lg space-y-4 relative bg-muted/50">
        <div className="flex justify-between items-center">
            <Label className="text-lg font-semibold">السؤال {index + 1}</Label>
            <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
                <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
        </div>
      
      <FormField
        control={form.control}
        name={`questions.${index}.text`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>نص السؤال (يدعم LaTeX)</FormLabel>
            <FormControl>
              <Textarea placeholder="اكتب نص السؤال هنا..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name={`questions.${index}.imageUrl`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>رابط صورة (اختياري)</FormLabel>
            <FormControl>
              <Input placeholder="https://example.com/image.png" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

        <div>
            <Label className="mb-2 block">الخيارات (حدد الخيار الصحيح)</Label>
            <FormField
            control={form.control}
            name={`questions.${index}.correctAnswerIndex`}
            render={({ field }) => (
                <RadioGroup onValueChange={field.onChange} value={field.value.toString()} className="space-y-2">
                {[0, 1, 2, 3].map((optionIndex) => (
                    <FormField
                    key={optionIndex}
                    control={form.control}
                    name={`questions.${index}.options.${optionIndex}`}
                    render={({ field: optionField }) => (
                        <FormItem className="flex items-center space-x-3 space-x-reverse space-y-0">
                        <FormControl>
                             <RadioGroupItem value={optionIndex.toString()} />
                        </FormControl>
                        <div className="flex-1">
                             <Input placeholder={`الخيار ${optionIndex + 1}`} {...optionField} />
                             <FormMessage />
                        </div>
                        </FormItem>
                    )}
                    />
                ))}
                </RadioGroup>
            )}
            />
        </div>

      <FormField
        control={form.control}
        name={`questions.${index}.explanation`}
        render={({ field }) => (
          <FormItem>
            <FormLabel>شرح الإجابة (اختياري)</FormLabel>
            <FormControl>
              <Textarea placeholder="اشرح لماذا هذا الخيار هو الصحيح..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
}
