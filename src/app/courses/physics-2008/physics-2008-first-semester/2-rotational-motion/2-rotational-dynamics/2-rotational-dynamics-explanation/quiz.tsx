
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
    questionText: 'ما هي وحدة قياس السرعة الزاوية في النظام الدولي؟',
    options: ['m/s', 'rad/s', 'rad/s²', 'Hz'],
    correctAnswerIndex: 1,
    explanation: 'السرعة الزاوية (ω) هي المعدل الزمني للتغير في الإزاحة الزاوية، وتقاس بوحدة راديان لكل ثانية (rad/s) في النظام الدولي.'
  },
  {
    questionText: 'عجلة تدور من السكون وتصل إلى سرعة زاوية 20 rad/s خلال 5 ثوانٍ. ما مقدار تسارعها الزاوي المتوسط؟',
    options: ['4 rad/s²', '5 rad/s²', '10 rad/s²', '100 rad/s²'],
    correctAnswerIndex: 0,
    explanation: 'التسارع الزاوي المتوسط: $α_{avg} = \\frac{\\Delta ω}{\\Delta t} = \\frac{ω_f - ω_i}{t} = \\frac{20 - 0}{5} = 4$ rad/s².'
  },
  {
    questionText: 'إذا كانت الإزاحة الزاوية لجسم ما تتغير وفق المعادلة $θ(t) = At^2 + Bt$. ما هي السرعة الزاوية اللحظية $ω(t)$؟',
    options: ['$ω(t) = 2At + B$', '$ω(t) = At$', '$ω(t) = 2A$', '$ω(t) = At^2$'],
    correctAnswerIndex: 0,
    explanation: 'السرعة الزاوية اللحظية هي مشتقة الإزاحة الزاوية بالنسبة للزمن. \n $ω(t) = \\frac{dθ}{dt} = \\frac{d}{dt}(At^2 + Bt) = 2At + B$.'
  },
  {
    questionText: 'جسم يدور بسرعة زاوية ابتدائية $10 rad/s$ وبتسارع زاوي ثابت $2 rad/s²$. ما سرعته الزاوية بعد 4 ثوانٍ؟',
    options: ['18 rad/s', '20 rad/s', '12 rad/s', '8 rad/s'],
    correctAnswerIndex: 0,
    explanation: 'باستخدام معادلة الحركة الدورانية الأولى: $ω_f = ω_i + αt$. \n $ω_f = 10 + (2)(4) = 10 + 8 = 18$ rad/s.'
  },
  {
    questionText: 'ما هي الإزاحة الزاوية لعجلة دارت 5 دورات كاملة؟',
    options: ['5 rad', '5$\\pi$ rad', '10$\\pi$ rad', '2.5 rad'],
    correctAnswerIndex: 2,
    explanation: 'كل دورة كاملة تعادل $2\\pi$ راديان. \n الإزاحة الزاوية = عدد الدورات × $2\\pi = 5 \\times 2\\pi = 10\\pi$ راديان.'
  },
];

export default function RotationalDynamicsExplanationQuizPage() {
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
