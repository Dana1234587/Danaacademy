
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
    questionText: 'إذا كان المتجه $\\vec{A} = 3\\hat{i} + 4\\hat{j}$، فما هو مقدار هذا المتجه؟',
    options: ['3', '4', '5', '7'],
    correctAnswerIndex: 2,
    explanation: 'مقدار المتجه يحسب باستخدام نظرية فيثاغورس: $|\\vec{A}| = \\sqrt{A_x^2 + A_y^2} = \\sqrt{3^2 + 4^2} = \\sqrt{9 + 16} = \\sqrt{25} = 5$.'
  },
  {
    questionText: 'في مثلث قائم الزاوية، إذا كانت الزاوية $\\theta = 30^\\circ$ والوتر يساوي 10، فما طول الضلع المقابل للزاوية $\\theta$؟',
    options: ['5', '8.66', '10', '20'],
    correctAnswerIndex: 0,
    explanation: 'باستخدام تعريف الجيب (sin): $sin(\\theta) = \\frac{\\text{المقابل}}{\\text{الوتر}}$. إذن، المقابل = الوتر × $sin(\\theta) = 10 \\times sin(30^\\circ) = 10 \\times 0.5 = 5$.'
  },
  {
    questionText: 'ما هي نتيجة الضرب النقطي (القياسي) لمتجهين متعامدين؟',
    options: ['صفر', '1', '-1', 'تعتمد على مقداريهما'],
    correctAnswerIndex: 0,
    explanation: 'الضرب النقطي يُعرّف بـ $\\vec{A} \\cdot \\vec{B} = |A||B|cos(\\theta)$. إذا كان المتجهان متعامدين، فإن الزاوية بينهما $\\theta = 90^\\circ$ و $cos(90^\\circ) = 0$. بالتالي، نتيجة الضرب تساوي صفرًا.'
  },
  {
    questionText: 'قوة مقدارها 20 نيوتن تميل بزاوية $60^\\circ$ عن المحور الأفقي. ما مقدار مركبتها الأفقية (السينيّة)؟',
    options: ['20 نيوتن', '17.3 نيوتن', '10 نيوتن', '8.6 نيوتن'],
    correctAnswerIndex: 2,
    explanation: 'المركبة الأفقية تُحسب باستخدام جيب التمام (cos): $F_x = F \\times cos(\\theta) = 20 \\times cos(60^\\circ) = 20 \\times 0.5 = 10$ نيوتن.'
  },
  {
    questionText: 'ما هو اتجاه المتجه الناتج عن الضرب المتجهي (التقاطعي) $\\hat{i} \\times \\hat{j}$؟',
    options: ['$\\hat{i}$', '$\\hat{j}$', '$\\hat{k}$', '$-\\hat{k}$'],
    correctAnswerIndex: 2,
    explanation: 'باستخدام قاعدة اليد اليمنى لنظام الإحداثيات الثلاثي الأبعاد، فإن حاصل الضرب المتجهي لمتجه وحدة باتجاه المحور السيني ($\hat{i}$) ومتجه وحدة باتجاه المحور الصادي ($\hat{j}$) هو متجه وحدة باتجاه المحور العيني ($\hat{k}$).'
  },
];

export default function FoundationsQuizPage() {
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
