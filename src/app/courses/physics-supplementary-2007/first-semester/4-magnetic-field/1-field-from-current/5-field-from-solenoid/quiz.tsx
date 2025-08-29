
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
    questionText: 'ما هي صيغة المجال المغناطيسي (B) داخل ملف لولبي طويل عدد لفاته لوحدة الأطوال هو n ويمر به تيار (I)؟',
    options: ['$B = \\mu_0 n I L$', '$B = \\mu_0 n I$', '$B = \\frac{\\mu_0 I}{2\\pi r}$', '$B = \\frac{\\mu_0 N I}{L}$'],
    correctAnswerIndex: 1,
    explanation: 'المجال المغناطيسي داخل ملف لولبي طويل ومنتظم يُعطى بالعلاقة $B = \\mu_0 n I$, حيث n هي عدد اللفات لكل وحدة طول ($n=N/L$). الخيار الرابع صحيح أيضاً وهو مكافئ للخيار الثاني.'
  },
  {
    questionText: 'ملف لولبي طوله 50 سم وعدد لفاته 1000 لفة، يمر به تيار 5 أمبير. ما مقدار المجال المغناطيسي في داخله؟',
    options: ['$4\\pi \\times 10^{-3} T$', '$2\\pi \\times 10^{-3} T$', '$4\\pi \\times 10^{-4} T$', '$2\\pi \\times 10^{-4} T$'],
    correctAnswerIndex: 0,
    explanation: 'أولاً، نحسب عدد اللفات لوحدة الطول: $n = N/L = 1000 / 0.5 m = 2000$ لفة/متر. \nثانياً، نطبق القانون: $B = \\mu_0 n I = (4\\pi \\times 10^{-7}) \\times 2000 \\times 5 = 4\\pi \\times 10^{-7} \\times 10000 = 4\\pi \\times 10^{-3} T$.'
  },
  {
    questionText: 'أين يكون المجال المغناطيسي لملف لولبي مثالي (طويل جداً) منتظمًا تقريبًا؟',
    options: ['عند الأطراف فقط', 'خارج الملف فقط', 'في كل مكان داخل وخارج الملف', 'في داخله بعيدًا عن الأطراف'],
    correctAnswerIndex: 3,
    explanation: 'يتميز الملف اللولبي الطويل بأن المجال المغناطيسي في داخله يكون منتظمًا (ثابت في المقدار والاتجاه) تقريبًا، خاصة في المناطق البعيدة عن الأطراف. أما خارجه، فالمجال يكون ضعيفًا جدًا ويمكن إهماله.'
  },
  {
    questionText: 'كيف يمكن زيادة شدة المجال المغناطيسي داخل ملف لولبي؟',
    options: ['تقليل عدد اللفات', 'تقليل شدة التيار', 'زيادة طول الملف مع إبقاء عدد اللفات ثابتًا', 'وضع قلب من الحديد داخله'],
    correctAnswerIndex: 3,
    explanation: 'لوضع قلب من مادة ذات نفاذية مغناطيسية عالية (مثل الحديد) داخل الملف اللولبي يزيد من شدة المجال المغناطيسي بشكل كبير. القانون يصبح $B = \\mu n I$ حيث $\\mu > \\mu_0$. زيادة التيار أو عدد اللفات لوحدة الطول يزيد المجال أيضًا، لكن وضع قلب حديدي هو الأكثر فعالية.'
  },
  {
    questionText: 'اتجاه المجال المغناطيسي داخل ملف لولبي يحدد باستخدام...',
    options: ['قاعدة اليد اليمنى (للتيار المستقيم)', 'قاعدة اليد اليمنى (للملفات)', 'قاعدة اليد اليسرى', 'لا توجد قاعدة لتحديده'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم نفس قاعدة اليد اليمنى للملف الدائري: نلف أصابع اليد اليمنى مع اتجاه التيار في لفات الملف، فيشير الإبهام إلى اتجاه المجال المغناطيسي داخل الملف (نحو القطب الشمالي للمغناطيس الكهربائي المتكون).'
  },
];

export default function FieldFromSolenoidQuizPage() {
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
