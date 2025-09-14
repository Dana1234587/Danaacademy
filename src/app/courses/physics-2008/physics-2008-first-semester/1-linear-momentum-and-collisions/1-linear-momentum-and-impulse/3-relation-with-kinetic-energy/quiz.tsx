
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
    questionText: 'أي من العلاقات التالية تربط بين طاقة الحركة (K) والزخم الخطي (p) بشكل صحيح؟',
    options: ['$K = \\frac{p^2}{2m}$', '$K = \\frac{2m}{p^2}$', '$K = p \\cdot m$', '$K = \\frac{p}{2m}$'],
    correctAnswerIndex: 0,
    explanation: 'نبدأ من تعريف طاقة الحركة $K = \\frac{1}{2}mv^2$. وبما أن $p = mv$ فإن $v = p/m$. بالتعويض، نحصل على $K = \\frac{1}{2}m(\\frac{p}{m})^2 = \\frac{1}{2}m\\frac{p^2}{m^2} = \\frac{p^2}{2m}$.'
  },
  {
    questionText: 'جسمان لهما نفس طاقة الحركة. إذا كانت كتلة الجسم الأول أربعة أضعاف كتلة الجسم الثاني، فإن زخم الجسم الأول يساوي...',
    options: ['ضعف زخم الثاني', 'نصف زخم الثاني', 'ربع زخم الثاني', 'أربعة أضعاف زخم الثاني'],
    correctAnswerIndex: 0,
    explanation: 'لدينا $K_1 = K_2$. باستخدام العلاقة $p = \\sqrt{2mK}$, فإن $\\frac{p_1}{p_2} = \\frac{\\sqrt{2m_1K_1}}{\\sqrt{2m_2K_2}} = \\sqrt{\\frac{m_1}{m_2}}$. بما أن $m_1 = 4m_2$, فإن $\\frac{p_1}{p_2} = \\sqrt{\\frac{4m_2}{m_2}} = \\sqrt{4} = 2$. إذن $p_1 = 2p_2$.'
  },
  {
    questionText: 'عندما يسقط جسم سقوطًا حرًا، فإن زخمه الخطي...',
    options: ['يزداد وطاقة حركته تزداد', 'يبقى ثابتًا وطاقة حركته تزداد', 'يزداد وطاقة حركته تبقى ثابتة', 'يقل وطاقة حركته تزداد'],
    correctAnswerIndex: 0,
    explanation: 'أثناء السقوط الحر، تزداد سرعة الجسم بسبب تسارع الجاذبية. بما أن الزخم ($p=mv$) وطاقة الحركة ($K=\\frac{1}{2}mv^2$) يعتمدان على السرعة، فكلاهما يزداد.'
  },
  {
    questionText: 'إذا كان زخم جسم يساوي $10 kg \\cdot m/s$ وطاقة حركته $25 J$, فما كتلته؟',
    options: ['$5 kg$', '$0.5 kg$', '$2 kg$', '$2.5 kg$'],
    correctAnswerIndex: 2,
    explanation: 'باستخدام العلاقة $K = \\frac{p^2}{2m}$, يمكننا إعادة ترتيبها لإيجاد الكتلة: $m = \\frac{p^2}{2K}$. بالتعويض: $m = \\frac{(10)^2}{2 \\times 25} = \\frac{100}{50} = 2 kg$.'
  },
  {
    questionText: 'شاحنة وسيارة صغيرتان تتحركان بنفس السرعة. أي منهما يمتلك زخمًا خطيًا أكبر وطاقة حركة أكبر؟',
    options: ['السيارة لهما زخم وطاقة حركة أكبر', 'الشاحنة لها زخم وطاقة حركة أكبر', 'لهما نفس الزخم، لكن الشاحنة طاقتها أكبر', 'الشاحنة لها زخم أكبر، لكن لهما نفس طاقة الحركة'],
    correctAnswerIndex: 1,
    explanation: 'الشاحنة لها كتلة أكبر بكثير من السيارة. بما أن $p=mv$ و $K=\\frac{1}{2}mv^2$, وكلاهما يتناسب طرديًا مع الكتلة، فإن الشاحنة ستمتلك زخمًا خطيًا أكبر وطاقة حركة أكبر عند نفس السرعة.'
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
