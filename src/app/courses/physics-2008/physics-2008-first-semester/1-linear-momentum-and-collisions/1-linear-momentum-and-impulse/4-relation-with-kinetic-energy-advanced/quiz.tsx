
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
    questionText: 'بروتون وجسيم ألفا لهما نفس الزخم الخطي. أيهما يمتلك طاقة حركية أكبر؟ (علماً أن كتلة جسيم ألفا تساوي 4 أضعاف كتلة البروتون تقريبًا).',
    options: ['البروتون', 'جسيم ألفا', 'لهما نفس الطاقة الحركية', 'لا يمكن التحديد'],
    correctAnswerIndex: 0,
    explanation: 'من العلاقة $K = p^2/(2m)$, عند ثبات الزخم (p)، تتناسب الطاقة الحركية (K) عكسيًا مع الكتلة (m). بما أن كتلة البروتون أقل، فإن طاقته الحركية أكبر.'
  },
  {
    questionText: 'إذا تضاعفت الطاقة الحركية لجسم ما، فإن زخمه الخطي...',
    options: ['يتضاعف', 'يزداد بمقدار $\\sqrt{2}$', 'يزداد أربع مرات', 'يبقى ثابتًا'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $p = \\sqrt{2mK}$, يتناسب الزخم (p) طرديًا مع الجذر التربيعي للطاقة الحركية ($\\sqrt{K}$). فإذا أصبحت الطاقة $2K$, يصبح الزخم الجديد $\\sqrt{2}p$.'
  },
  {
    questionText: 'جسمان A و B لهما نفس الكتلة. إذا كان زخم الجسم A ثلاثة أضعاف زخم الجسم B، فما النسبة بين طاقتيهما الحركية ($K_A / K_B$)?',
    options: ['3', '9', '$\\sqrt{3}$', '1/3'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $K = p^2/(2m)$, عند ثبات الكتلة، تتناسب الطاقة الحركية (K) طرديًا مع مربع الزخم ($p^2$). إذا كان $p_A = 3p_B$, فإن $K_A = (3p_B)^2 / (2m) = 9 (p_B^2 / 2m) = 9K_B$. إذن، النسبة هي 9.'
  },
  {
    questionText: 'سيارة وشاحنة لهما نفس الطاقة الحركية. أيهما أصعب في الإيقاف؟',
    options: ['السيارة', 'الشاحنة', 'لهما نفس صعوبة الإيقاف', 'يعتمد على نوع الإطارات'],
    correctAnswerIndex: 1,
    explanation: 'صعوبة الإيقاف تتعلق بالدفع اللازم، والذي يساوي التغير في الزخم. من العلاقة $p=\\sqrt{2mK}$، عند ثبات الطاقة K، يكون زخم الجسم ذي الكتلة الأكبر هو الأكبر. بما أن كتلة الشاحنة أكبر، فإن زخمها أكبر، وبالتالي تحتاج لدفع أكبر لإيقافها.'
  },
  {
    questionText: 'كرة A كتلتها m وطاقتها الحركية K. كرة B كتلتها 2m وطاقتها الحركية 2K. ما العلاقة بين زخميهما؟',
    options: ['$p_B = p_A$', '$p_B = \\sqrt{2} p_A$', '$p_B = 2 p_A$', '$p_B = 4 p_A$'],
    correctAnswerIndex: 2,
    explanation: 'لدينا $p_A = \\sqrt{2mK}$. و $p_B = \\sqrt{2(2m)(2K)} = \\sqrt{4(2mK)} = 2\\sqrt{2mK} = 2p_A$.'
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

  if (quizQuestions.length === 0) {
      return <div className="text-center p-8 text-muted-foreground">سيتم إضافة أسئلة الاختبار قريبًا.</div>
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
                {q.options.map((option: string, oIndex: number) => (
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
