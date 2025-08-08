"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { generateQuizAction } from "./actions";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  subtopic: z.string().min(3, { message: "يجب أن يكون الموضوع من 3 أحرف على الأقل." }),
  difficulty: z.enum(["سهل", "متوسط", "صعب"], {
    required_error: "الرجاء اختيار مستوى الصعوبة.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function QuizForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [quizResult, setQuizResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subtopic: "",
      difficulty: "متوسط",
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setQuizResult(null);

    const result = await generateQuizAction(values);

    setIsLoading(false);

    if (result.success && result.data) {
      setQuizResult(result.data.quiz);
    } else {
      toast({
        variant: "destructive",
        title: "حدث خطأ",
        description: result.error || "فشل إنشاء الاختبار. الرجاء المحاولة مرة أخرى.",
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="subtopic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>الموضوع الفرعي للفيزياء</FormLabel>
                <FormControl>
                  <Input placeholder="مثال: قوانين نيوتن للحركة" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="difficulty"
            render={({ field }) => (
              <FormItem>
                <FormLabel>مستوى الصعوبة</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="اختر مستوى الصعوبة" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="سهل">سهل</SelectItem>
                    <SelectItem value="متوسط">متوسط</SelectItem>
                    <SelectItem value="صعب">صعب</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading ? (
              <>
                <Loader2 className="me-2 h-4 w-4 animate-spin" />
                جاري الإنشاء...
              </>
            ) : (
              "أنشئ الاختبار"
            )}
          </Button>
        </form>
      </Form>
      {quizResult && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>الاختبار الذي تم إنشاؤه</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none dark:prose-invert whitespace-pre-wrap font-body">
            {quizResult}
          </CardContent>
        </Card>
      )}
    </>
  );
}
