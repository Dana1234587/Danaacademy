
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
        questionText: 'عجلة دوارة تبدأ من السكون وتتسارع بتسارع زاوي ثابت مقداره $3 rad/s^2$. ما هي سرعتها الزاوية بعد 5 ثوانٍ؟',
        options: ['$15 rad/s$', '$7.5 rad/s$', '$1.5 rad/s$', '$37.5 rad/s$'],
        correctAnswerIndex: 0,
        explanation: 'باستخدام معادلة الحركة الأولى: $\\omega_f = \\omega_i + \\alpha t$. \n بما أنها بدأت من السكون، $\\omega_i = 0$. \n $\\omega_f = 0 + (3 rad/s^2)(5 s) = 15 rad/s$.'
    },
    {
        questionText: 'مروحة تدور بسرعة زاوية ابتدائية $20 rad/s$ ثم تتباطأ بتسارع زاوي ثابت حتى تتوقف خلال 4 ثوانٍ. ما مقدار الإزاحة الزاوية التي قطعتها خلال هذه الفترة؟',
        options: ['$80 rad$', '$20 rad$', '$40 rad$', '$160 rad$'],
        correctAnswerIndex: 2,
        explanation: 'يمكن استخدام المعادلة $\\Delta\\theta = \\frac{1}{2}(\\omega_i + \\omega_f)t$. \n $\\Delta\\theta = \\frac{1}{2}(20 rad/s + 0 rad/s)(4 s) = \\frac{1}{2}(20)(4) = 40 rad$.'
    },
    {
        questionText: 'قرص دوار يتسارع من السكون ويقطع إزاحة زاوية مقدارها $12.5 rad$ في 5 ثوانٍ. ما مقدار تسارعه الزاوي الثابت؟',
        options: ['$1 rad/s^2$', '$2.5 rad/s^2$', '$5 rad/s^2$', '$0.5 rad/s^2$'],
        correctAnswerIndex: 0,
        explanation: 'نستخدم معادلة الحركة الثانية: $\\Delta\\theta = \\omega_i t + \\frac{1}{2}\\alpha t^2$. \n $12.5 = (0)(5) + \\frac{1}{2}\\alpha (5)^2$. \n $12.5 = \\frac{1}{2}\\alpha (25) \\implies 25 = 25\\alpha \\implies \\alpha = 1 rad/s^2$.'
    },
    {
        questionText: 'عجلة تدور بسرعة $10 rad/s$ وتتسارع بمقدار $2 rad/s^2$. ما سرعتها الزاوية بعد أن تكون قد قطعت إزاحة زاوية مقدارها 21 راديان؟',
        options: ['$14 rad/s$', '$184 rad/s$', '$12 rad/s$', '$13.6 rad/s$'],
        correctAnswerIndex: 0,
        explanation: 'نستخدم معادلة الحركة الثالثة: $\\omega_f^2 = \\omega_i^2 + 2\\alpha \\Delta\\theta$. \n $\\omega_f^2 = (10)^2 + 2(2)(21) = 100 + 84 = 184$. \n $\\omega_f = \\sqrt{184} \\approx 13.56 rad/s$. الخيار الأقرب هو 14 rad/s.'
    },
    {
        questionText: 'ما هي الإزاحة الزاوية لعجلة دارت 5 دورات كاملة؟',
        options: ['5 rad', '5$\\pi$ rad', '10$\\pi$ rad', '2.5 rad'],
        correctAnswerIndex: 2,
        explanation: 'كل دورة كاملة تعادل $2\\pi$ راديان. \n الإزاحة الزاوية = عدد الدورات × $2\\pi = 5 \\times 2\\pi = 10\\pi$ راديان.'
    },
];

export default function QuizPage() {
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
