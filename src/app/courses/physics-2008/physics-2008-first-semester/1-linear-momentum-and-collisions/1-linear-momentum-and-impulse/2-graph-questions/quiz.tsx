
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { MomentumMassGraph, MomentumVelocityGraph } from './diagram';

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
    questionText: 'يمثل الرسم البياني الأول العلاقة بين الزخم والسرعة لجسمين A و B. أي العبارات التالية صحيحة؟',
    graph: 'p-v',
    options: ['كتلة الجسم A أكبر من كتلة الجسم B', 'كتلة الجسم B أكبر من كتلة الجسم A', 'الجسمان لهما نفس الكتلة', 'سرعة الجسم A أكبر من سرعة الجسم B'],
    correctAnswerIndex: 0,
    explanation: 'ميل منحنى (الزخم-السرعة) يمثل الكتلة. بما أن ميل الخط A أكبر من ميل الخط B، فإن كتلة الجسم A أكبر من كتلة الجسم B.'
  },
  {
    questionText: 'في منحنى (الزخم الخطي - الكتلة) لمجموعة أجسام تتحرك بنفس السرعة، ماذا يمثل ميل الخط المستقيم؟',
    graph: 'p-m',
    options: ['الكتلة', 'السرعة', 'الطاقة الحركية', 'مقلوب السرعة'],
    correctAnswerIndex: 1,
    explanation: 'الميل هو $\\frac{\\Delta p}{\\Delta m}$. من العلاقة $p=mv$, إذا كانت v ثابتة، فإن $\\Delta p = v \\Delta m$. إذن، الميل = $v$.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني الأول، إذا كانت سرعة الجسم A تساوي 2 m/s، فما مقدار زخمه؟',
    graph: 'p-v',
    options: ['$4 kg \\cdot m/s$', '$6 kg \\cdot m/s$', '$8 kg \\cdot m/s$', '$10 kg \\cdot m/s$'],
    correctAnswerIndex: 2,
    explanation: 'أولاً، نجد كتلة الجسم A من الميل: $m_A = \\frac{\\Delta p}{\\Delta v} = \\frac{12-0}{3-0} = 4 kg$. \n ثانياً، نحسب الزخم عند السرعة المطلوبة: $p = m_A v = 4 kg \\times 2 m/s = 8 kg \\cdot m/s$.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني الثاني، ما هي السرعة التي تتحرك بها الأجسام؟',
    graph: 'p-m',
    options: ['$2 m/s$', '$3 m/s$', '$4 m/s$', '$6 m/s$'],
    correctAnswerIndex: 1,
    explanation: 'ميل منحنى (الزخم-الكتلة) يمثل السرعة. نأخذ أي نقطة لحساب الميل: $v = \\text{الميل} = \\frac{\\Delta p}{\\Delta m} = \\frac{12-0}{4-0} = 3 m/s$.'
  },
  {
    questionText: 'إذا تم رسم العلاقة بين السرعة (v) على المحور الصادي والزخم (p) على المحور السيني، فإن ميل الخط المستقيم يمثل:',
    options: ['الكتلة (m)', 'مقلوب الكتلة ($\\frac{1}{m}$)', 'الطاقة الحركية (K)', 'السرعة (v)'],
    correctAnswerIndex: 1,
    explanation: 'الميل هو $\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta v}{\\Delta p}$. بما أن $p=mv$, فإن $v = p/m$. إذن، $\\Delta v = (1/m) \\Delta p$. الميل = $1/m$.'
  },
];

export default function GraphQuestionsQuizPage() {
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
              {q.graph === 'p-v' && <MomentumVelocityGraph />}
              {q.graph === 'p-m' && <MomentumMassGraph />}
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
