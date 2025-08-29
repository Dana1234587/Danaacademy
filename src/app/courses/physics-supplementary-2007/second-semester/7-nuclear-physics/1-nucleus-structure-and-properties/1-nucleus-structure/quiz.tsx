
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
    questionText: 'ما هي المكونات الأساسية لنواة الذرة؟',
    options: ['بروتونات وإلكترونات', 'بروتونات ونيوترونات', 'نيوترونات وإلكترونات', 'بروتونات فقط'],
    correctAnswerIndex: 1,
    explanation: 'تتكون نواة الذرة من بروتونات موجبة الشحنة ونيوترونات متعادلة الشحنة. الإلكترونات تدور حول النواة.'
  },
  {
    questionText: 'في نواة اليورانيوم-$235$ ($^{235}_{92}U$)، ما هو عدد النيوترونات؟',
    options: ['92', '235', '143', '327'],
    correctAnswerIndex: 2,
    explanation: 'عدد النيوترونات (N) = العدد الكتلي (A) - العدد الذري (Z). هنا $A=235$ و $Z=92$. إذن، $N = 235 - 92 = 143$.'
  },
  {
    questionText: 'ماذا يُطلق على الأنوية التي لها نفس العدد الذري (Z) وتختلف في العدد الكتلي (A)؟',
    options: ['الأيونات', 'النظائر', 'الايزوميرات', 'النيوكليونات'],
    correctAnswerIndex: 1,
    explanation: 'النظائر هي أشكال مختلفة من نفس العنصر الكيميائي، لها نفس عدد البروتونات (العدد الذري) لكنها تختلف في عدد النيوترونات، وبالتالي تختلف في العدد الكتلي.'
  },
  {
    questionText: 'ما الذي يمثله العدد الكتلي (A) في نواة الذرة؟',
    options: ['عدد البروتونات فقط', 'عدد النيوترونات فقط', 'مجموع عدد البروتونات والإلكترونات', 'مجموع عدد البروتونات والنيوترونات'],
    correctAnswerIndex: 3,
    explanation: 'العدد الكتلي (A) هو إجمالي عدد الجسيمات في النواة، أي مجموع عدد البروتونات (Z) وعدد النيوترونات (N).'
  },
  {
    questionText: 'نظير الكربون-$14$ ($^{14}_{6}C$) ونظير الكربون-$12$ ($^{12}_{6}C$) يختلفان في...',
    options: ['عدد البروتونات', 'عدد الإلكترونات في الذرة المتعادلة', 'الخصائص الكيميائية', 'عدد النيوترونات'],
    correctAnswerIndex: 3,
    explanation: 'بما أنهما نظيران لنفس العنصر (الكربون)، فلهما نفس عدد البروتونات (6). الاختلاف يكمن في عدد النيوترونات، حيث يمتلك الكربون-14 (14-6=8) نيوترونات، بينما يمتلك الكربون-12 (12-6=6) نيوترونات.'
  },
];

export default function NucleusStructureQuiz() {
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
    <div className="p-4 sm:p-6 lg:p-8">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle>اختبار قصير: بنية النواة</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {quizQuestions.map((q, qIndex) => (
            <div key={qIndex} className={`p-4 rounded-lg border ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10') : 'border-border'}`}>
              <div className="font-bold mb-4"><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></div>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()}>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="flex items-center space-x-2 space-x-reverse">
                    <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} disabled={isSubmitted} />
                    <Label htmlFor={`q${qIndex}-o${oIndex}`} className="flex-1 cursor-pointer">
                        <SmartTextRenderer as="span" text={option} />
                    </Label>
                    {isSubmitted && selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500"/>}
                    {isSubmitted && oIndex === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500"/>}
                  </div>
                ))}
              </RadioGroup>
              {isSubmitted && (
                 <div className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-md">
                    <p className="font-bold">الشرح:</p>
                    <SmartTextRenderer as="p" text={q.explanation} />
                 </div>
              )}
            </div>
          ))}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-4">
            {!isSubmitted ? (
                <Button onClick={handleSubmit} className="w-full">إظهار النتائج</Button>
            ) : (
                <div className="text-center w-full space-y-4">
                    <p className="text-xl font-bold">
                        نتيجتك: {calculateScore()} / {quizQuestions.length}
                    </p>
                    <Button onClick={() => { setIsSubmitted(false); setSelectedAnswers(new Array(quizQuestions.length).fill(null)); }} variant="outline">
                        إعادة الاختبار
                    </Button>
                </div>
            )}
        </CardFooter>
      </Card>
    </div>
  );
}
