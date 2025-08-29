
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
    questionText: 'في دارة RLC على التوالي، إذا كانت $X_L > X_C$، فإن الدارة لها خصائص...',
    options: ['مقاومية', 'حثية', 'مواسعية', 'رنينية'],
    correctAnswerIndex: 1,
    explanation: 'عندما تكون المفاعلة الحثية أكبر من المفاعلة المواسعية، يكون للدارة طابع حثي، مما يعني أن الجهد الكلي يسبق التيار الكلي بزاوية طور موجبة.'
  },
  {
    questionText: 'ما هي المعاوقة الكلية لدارة RLC على التوالي تحتوي على مقاومة 30 أوم، مفاعلة حثية 80 أوم، ومفاعلة مواسعية 40 أوم؟',
    options: ['50 أوم', '150 أوم', '90 أوم', '30 أوم'],
    correctAnswerIndex: 0,
    explanation: 'المعاوقة $Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{30^2 + (80 - 40)^2} = \\sqrt{900 + 40^2} = \\sqrt{900 + 1600} = \\sqrt{2500} = 50$ أوم.'
  },
  {
    questionText: 'بناءً على السؤال السابق، ما هي زاوية الطور ($\\phi$) للدارة؟',
    options: ['$36.9^\\circ$', '$53.1^\\circ$', '$60^\\circ$', '$45^\\circ$'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم العلاقة $\\tan(\\phi) = \\frac{X_L - X_C}{R} = \\frac{80 - 40}{30} = \\frac{40}{30} = \\frac{4}{3}$. \n $\\phi = \\arctan(\\frac{4}{3}) \\approx 53.1^\\circ$.'
  },
  {
    questionText: 'في حالة الرنين في دارة RLC، أي من العبارات التالية صحيح؟',
    options: ['المعاوقة تكون في قيمتها العظمى.', 'التيار يكون في قيمته الدنيا.', 'زاوية الطور تساوي 90 درجة.', 'المفاعلة الحثية تساوي المفاعلة المواسعية.'],
    correctAnswerIndex: 3,
    explanation: 'تحدث حالة الرنين عندما تتساوى المفاعلة الحثية مع المفاعلة المواسعية ($X_L = X_C$). عند هذه النقطة، تلغي المفاعلتان بعضهما البعض، وتصبح المعاوقة الكلية مساوية للمقاومة فقط ($Z=R$)، ويكون التيار في قيمته العظمى.'
  },
  {
    questionText: 'ما هو تردد الرنين لدارة تحتوي على محث 20 mH ومواسع 50 μF؟',
    options: ['159 هرتز', '1000 هرتز', '50 هرتز', '100 هرتز'],
    correctAnswerIndex: 0,
    explanation: 'تردد الرنين يُعطى بالعلاقة $\\omega_0 = 1 / \\sqrt{LC}$, و $f_0 = \\omega_0 / (2\\pi)$. \n $LC = (20 \\times 10^{-3}) \\times (50 \\times 10^{-6}) = 1000 \\times 10^{-9} = 10^{-6}$. \n $\\omega_0 = 1 / \\sqrt{10^{-6}} = 1000$ راد/ث. \n $f_0 = 1000 / (2\\pi) \\approx 159$ هرتز.'
  },
];

export default function QuestionsQuizPage() {
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
