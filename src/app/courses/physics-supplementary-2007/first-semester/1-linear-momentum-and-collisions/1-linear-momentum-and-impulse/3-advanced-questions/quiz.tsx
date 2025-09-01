
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
    questionText: 'سيارة وشاحنة لهما نفس الزخم الخطي. إذا كانت كتلة الشاحنة أكبر من كتلة السيارة، فأيهما يمتلك طاقة حركية أكبر؟',
    options: ['السيارة', 'الشاحنة', 'لهما نفس الطاقة الحركية', 'لا يمكن التحديد'],
    correctAnswerIndex: 0,
    explanation: 'من العلاقة $K = \\frac{p^2}{2m}$, نرى أنه عند ثبات الزخم (p)، فإن الطاقة الحركية (K) تتناسب عكسيًا مع الكتلة (m). بما أن كتلة السيارة أقل، فإن طاقتها الحركية ستكون أكبر.'
  },
  {
    questionText: 'جسمان A و B لهما نفس الطاقة الحركية. إذا كانت كتلة الجسم A أربعة أضعاف كتلة الجسم B، فما النسبة بين زخميهما ($p_A / p_B$)؟',
    options: ['1/2', '2', '1/4', '4'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $p = \\sqrt{2mK}$, نرى أنه عند ثبات الطاقة الحركية (K)، فإن الزخم (p) يتناسب طرديًا مع الجذر التربيعي للكتلة ($\\sqrt{m}$). إذن $\\frac{p_A}{p_B} = \\sqrt{\\frac{m_A}{m_B}} = \\sqrt{\\frac{4m_B}{m_B}} = \\sqrt{4} = 2$.'
  },
  {
    questionText: 'إذا تضاعف زخم جسم ما، فإن طاقته الحركية...',
    options: ['تقل إلى النصف', 'تتضاعف', 'تزداد أربع مرات', 'تبقى ثابتة'],
    correctAnswerIndex: 2,
    explanation: 'من العلاقة $K = \\frac{p^2}{2m}$, نرى أن الطاقة الحركية تتناسب طرديًا مع مربع الزخم. فإذا أصبح الزخم الجديد $p\' = 2p$, فإن الطاقة الحركية الجديدة $K\' = \\frac{(2p)^2}{2m} = 4 \\frac{p^2}{2m} = 4K$.'
  },
  {
    questionText: 'إذا تضاعفت الطاقة الحركية لجسم، فإن زخمه الخطي...',
    options: ['يقل إلى النصف', 'يتضاعف', 'يزداد بمقدار $\\sqrt{2}$', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'من العلاقة $p = \\sqrt{2mK}$, نرى أن الزخم يتناسب طرديًا مع الجذر التربيعي للطاقة الحركية. فإذا أصبحت الطاقة الحركية الجديدة $K\' = 2K$, فإن الزخم الجديد $p\' = \\sqrt{2m(2K)} = \\sqrt{2} \\sqrt{2mK} = \\sqrt{2} p$.'
  },
  {
    questionText: 'رصاصة وكرة بولينج لهما نفس الطاقة الحركية. أيهما أصعب إيقافه؟',
    options: ['الرصاصة', 'كرة البولينج', 'لهما نفس صعوبة الإيقاف', 'يعتمد على المادة المصنوعين منها'],
    correctAnswerIndex: 1,
    explanation: 'صعوبة الإيقاف تتعلق بالدفع اللازم، والذي يساوي التغير في الزخم. من العلاقة $p=\\sqrt{2mK}$، عند ثبات K، يكون زخم الجسم ذي الكتلة الأكبر هو الأكبر. بما أن كتلة كرة البولينج أكبر بكثير، فإن زخمها أكبر، وبالتالي تحتاج لدفع أكبر لإيقافها.'
  },
];

export default function AdvancedQuestionsQuizPage() {
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
