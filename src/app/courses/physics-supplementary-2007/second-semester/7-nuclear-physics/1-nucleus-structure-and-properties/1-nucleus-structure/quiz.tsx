
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

export default function NucleusStructureQuizPage() {
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
                    <SmartTextRenderer as="p" text={q.explanation} className="text-muted-foreground" />
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
