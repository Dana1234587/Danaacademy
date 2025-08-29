
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');
    const renderPart = (part: string, index: number) => {
        if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
        return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
    };
    return (
        <Wrapper className="leading-relaxed">
            {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block my-1 text-right">
                    {line.split('$').map(renderPart)}
                </span>
            ))}
        </Wrapper>
    );
};

const quizQuestions = [
  {
    questionText: 'في تجربة لتوضيح خصائص الثنائي، عند توصيله في حالة انحياز أمامي بمصباح، ماذا نلاحظ؟',
    options: ['لا يضيء المصباح', 'يضيء المصباح بشكل خافت', 'يضيء المصباح بشكل طبيعي', 'ينفجر المصباح'],
    correctAnswerIndex: 2,
    explanation: 'في الانحياز الأمامي، تكون مقاومة الثنائي صغيرة جدًا ويسمح بمرور التيار، مما يؤدي إلى إضاءة المصباح بشكل طبيعي (بافتراض أن المصدر مناسب).'
  },
  {
    questionText: 'عند عكس أقطاب البطارية في التجربة السابقة (توصيل الثنائي في انحياز عكسي)، ماذا يحدث لإضاءة المصباح؟',
    options: ['تزداد شدتها', 'تبقى كما هي', 'ينطفئ المصباح أو تكون إضاءته ضعيفة جدًا', 'يعكس المصباح لونه'],
    correctAnswerIndex: 2,
    explanation: 'في الانحياز العكسي، تكون مقاومة الثنائي كبيرة جدًا، مما يمنع مرور التيار تقريبًا. نتيجة لذلك، ينطفئ المصباح أو تكون إضاءته غير ملحوظة.'
  },
  {
    questionText: 'عند تسخين مقاومة مصنوعة من شبه موصل (مثل الثرمستور) موصولة في دارة، ماذا يحدث للتيار المار في الدارة؟',
    options: ['يقل', 'يزداد', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'تسخين شبه الموصل يقلل من مقاومته بشكل كبير. وفقًا لقانون أوم ($I=V/R$), وبما أن المقاومة R تقل، فإن التيار I المار في الدارة سيزداد.'
  },
  {
    questionText: 'ما هي النتيجة الرئيسية التي يمكن استنتاجها من تجربة الثنائي؟',
    options: ['أن الثنائيات ملونة', 'أن الثنائيات توصل الكهرباء في اتجاه واحد فقط', 'أن الثنائيات لا توصل الكهرباء أبدًا', 'أن الثنائيات تعمل فقط في درجات الحرارة العالية'],
    correctAnswerIndex: 1,
    explanation: 'التجربة توضح بشكل عملي الخاصية الأساسية للثنائي وهي عمله كصمام أحادي الاتجاه للتيار الكهربائي.'
  },
  {
    questionText: 'مقارنة بين سلك نحاسي وثرمستور (شبه موصل) عند نفس درجة الحرارة. إذا قمنا بتسخينهما معًا، فإن مقاومة النحاس... ومقاومة الثرمستور...',
    options: ['تزداد، تزداد', 'تقل، تقل', 'تزداد، تقل', 'تقل، تزداد'],
    correctAnswerIndex: 2,
    explanation: 'تختلف استجابة الفلزات وأشباه الموصلات للحرارة. مقاومة الفلزات (مثل النحاس) تزداد مع زيادة الحرارة بسبب زيادة اهتزاز الذرات. بينما مقاومة أشباه الموصلات تقل مع زيادة الحرارة بسبب تحرر المزيد من حاملات الشحنة.'
  },
];

export default function IntroductoryExperimentQuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const newAnswers = [...selectedAnswers];
    newAnswers[questionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };
  
  const calculateScore = () => {
    return selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswerIndex).length;
  }

  return (
    <div className="p-4 bg-muted/40">
       <div className="max-w-4xl mx-auto">
      <div className="space-y-8">
        {quizQuestions.map((q, qIndex) => (
          <Card key={qIndex} className={`border-2 ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg`}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={`q${qIndex}-o${oIndex}`} className={`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent ${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}`}>
                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} disabled={isSubmitted} />
                    <SmartTextRenderer as="span" text={option} />
                     {isSubmitted && selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto"/>}
                    {isSubmitted && oIndex === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500 ms-auto"/>}
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
             {isSubmitted && (
                 <CardFooter className="flex flex-col items-start bg-muted/50 p-4 mt-4 rounded-b-lg">
                    <p className="font-bold text-foreground">الشرح:</p>
                    <SmartTextRenderer as="p" text={q.explanation} />
                 </CardFooter>
            )}
          </Card>
        ))}
      </div>
      
      <div className="mt-8 text-center">
        {!isSubmitted ? (
            <Button onClick={handleSubmit} size="lg" className="w-full max-w-xs mx-auto">إظهار النتائج</Button>
        ) : (
            <Card className="max-w-sm mx-auto p-6">
                <CardTitle className="text-2xl mb-4">نتيجتك النهائية</CardTitle>
                <p className="text-3xl font-bold text-primary">
                    {calculateScore()} / {quizQuestions.length}
                </p>
                <Button onClick={() => { setIsSubmitted(false); setSelectedAnswers(new Array(quizQuestions.length).fill(null)); }} variant="outline" className="mt-6">
                    إعادة الاختبار
                </Button>
            </Card>
        )}
      </div>
      </div>
    </div>
  );
}
