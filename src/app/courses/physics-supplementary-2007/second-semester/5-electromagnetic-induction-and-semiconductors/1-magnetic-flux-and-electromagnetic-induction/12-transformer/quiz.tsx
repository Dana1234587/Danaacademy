
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
    questionText: 'ما هو المبدأ الفيزيائي الأساسي الذي يعمل عليه المحول الكهربائي؟',
    options: ['الحث الذاتي', 'الحث المتبادل', 'قانون أوم', 'قوة لورنتز'],
    correctAnswerIndex: 1,
    explanation: 'يعمل المحول على مبدأ الحث المتبادل، حيث يؤدي تغير التدفق المغناطيسي الناتج عن التيار المتغير في الملف الابتدائي إلى توليد قوة دافعة حثية في الملف الثانوي.'
  },
  {
    questionText: 'محول مثالي رافع للجهد. أي من العبارات التالية صحيح؟',
    options: ['عدد لفات الثانوي أكبر من الابتدائي، والتيار الثانوي أكبر من الابتدائي.', 'عدد لفات الثانوي أكبر من الابتدائي، والتيار الثانوي أصغر من الابتدائي.', 'عدد لفات الثانوي أصغر من الابتدائي، والتيار الثانوي أكبر من الابتدائي.', 'عدد لفات الثانوي أصغر من الابتدائي، والتيار الثانوي أصغر من الابتدائي.'],
    correctAnswerIndex: 1,
    explanation: 'في المحول الرافع للجهد، يكون عدد لفات الملف الثانوي (Ns) أكبر من عدد لفات الملف الابتدائي (Np). في المحول المثالي، تكون القدرة محفوظة (Pp = Ps)، وبما أن الجهد يرتفع، يجب أن ينخفض التيار للحفاظ على القدرة ثابتة (Vs > Vp implies Is < Ip).'
  },
  {
    questionText: 'محول مثالي عدد لفات ملفه الابتدائي 200 لفة والثانوي 800 لفة. إذا كان جهد الدخل 120 فولت، فما جهد الخرج؟',
    options: ['30 فولت', '120 فولت', '480 فولت', '24000 فولت'],
    correctAnswerIndex: 2,
    explanation: 'نستخدم معادلة المحول المثالي: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p}$. \n $V_s = V_p \\times \\frac{N_s}{N_p} = 120V \\times \\frac{800}{200} = 120V \\times 4 = 480$ فولت.'
  },
  {
    questionText: 'لماذا لا تعمل المحولات الكهربائية بالتيار المستمر؟',
    options: ['لأن التيار المستمر لا يولد مجالًا مغناطيسيًا.', 'لأن مقاومة الملفات تكون عالية جدًا للتيار المستمر.', 'لأن التيار المستمر لا يولد تدفقًا مغناطيسيًا متغيرًا.', 'لأن المحولات مصممة فقط للجهود العالية.'],
    correctAnswerIndex: 2,
    explanation: 'الحث الكهرومغناطيسي يحدث فقط عند وجود تغير في التدفق المغناطيسي. التيار المستمر يولد مجالًا مغناطيسيًا ثابتًا، وبالتالي تدفقًا ثابتًا. بدون تغير في التدفق، لا تتولد قوة دافعة حثية في الملف الثانوي.'
  },
  {
    questionText: 'محول كفاءته 90%. إذا كانت القدرة الداخلة إليه 200 واط، فما مقدار القدرة الخارجة منه؟',
    options: ['180 واط', '200 واط', '222 واط', '90 واط'],
    correctAnswerIndex: 0,
    explanation: 'الكفاءة ($\\eta$) = $\\frac{P_{out}}{P_{in}}$. \n $P_{out} = \\eta \\times P_{in} = 0.90 \\times 200W = 180$ واط.'
  },
];

export default function TransformerQuizPage() {
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
