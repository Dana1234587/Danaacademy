
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
    questionText: 'قرص مصمت عزم قصوره الذاتي $4 kg \\cdot m^2$ يدور بسرعة زاوية $5 rad/s$. ما طاقته الحركية الدورانية؟',
    options: ['20 J', '50 J', '100 J', '10 J'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم القانون $K = \\frac{1}{2}I\\omega^2$. \n $K = \\frac{1}{2}(4)(5)^2 = 2 \\times 25 = 50$ جول.'
  },
  {
    questionText: 'عجلة دوارة طاقتها الحركية الدورانية 100 جول وعزم قصورها الذاتي $8 kg \\cdot m^2$. ما سرعتها الزاوية؟',
    options: ['5 rad/s', '25 rad/s', '12.5 rad/s', '2.5 rad/s'],
    correctAnswerIndex: 0,
    explanation: 'من القانون $K = \\frac{1}{2}I\\omega^2$, نعيد ترتيبه لنجد $\\omega$. \n $\\omega^2 = \\frac{2K}{I} = \\frac{2 \\times 100}{8} = 25$. \n $\\omega = \\sqrt{25} = 5$ rad/s.'
  },
  {
    questionText: 'إذا كانت الطاقة الحركية الدورانية لجسم هي 64 جول عندما يدور بسرعة زاوية 4 rad/s، فما عزم قصوره الذاتي؟',
    options: ['$4 kg \\cdot m^2$', '$8 kg \\cdot m^2$', '$16 kg \\cdot m^2$', '$32 kg \\cdot m^2$'],
    correctAnswerIndex: 1,
    explanation: 'من القانون $K = \\frac{1}{2}I\\omega^2$, نعيد ترتيبه لنجد I. \n $I = \\frac{2K}{\\omega^2} = \\frac{2 \\times 64}{4^2} = \\frac{128}{16} = 8 kg \\cdot m^2$.'
  },
  {
    questionText: 'جسم يدور بسرعة زاوية $\\omega$. إذا تضاعفت سرعته الزاوية لتصبح $2\\omega$ مع بقاء عزم القصور الذاتي ثابتًا، فإن طاقته الحركية الدورانية...',
    options: ['تتضاعف', 'تزداد أربع مرات', 'تبقى ثابتة', 'تقل إلى النصف'],
    correctAnswerIndex: 1,
    explanation: 'الطاقة الحركية الدورانية $K$ تتناسب طرديًا مع مربع السرعة الزاوية ($\\omega^2$). فإذا تضاعفت $\\omega$, فإن الطاقة الجديدة تصبح $K\' = \\frac{1}{2}I(2\\omega)^2 = 4 (\\frac{1}{2}I\\omega^2) = 4K$.'
  },
  {
    questionText: 'جسمان A و B لهما نفس السرعة الزاوية. إذا كان عزم القصور الذاتي للجسم A ضعف عزم القصور الذاتي للجسم B ($I_A = 2I_B$)، فما العلاقة بين طاقتيهما الحركية؟',
    options: ['$K_A = 2K_B$', '$K_A = K_B/2$', '$K_A = 4K_B$', '$K_A = K_B$'],
    correctAnswerIndex: 0,
    explanation: 'الطاقة الحركية الدورانية $K = \\frac{1}{2}I\\omega^2$. بما أن $\\omega$ ثابتة، فإن K تتناسب طرديًا مع I. \n بما أن $I_A = 2I_B$, فإن $K_A = 2K_B$.'
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
