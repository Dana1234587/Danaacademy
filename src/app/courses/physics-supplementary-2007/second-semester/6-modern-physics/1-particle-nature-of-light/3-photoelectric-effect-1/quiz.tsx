
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
    questionText: 'ما هو تعريف الظاهرة الكهروضوئية؟',
    options: ['انبعاث الضوء عند تسخين الفلزات.', 'انبعاث الإلكترونات من سطح فلز عند سقوط إشعاع كهرومغناطيسي عليه.', 'تغير مقاومة الفلز بتغير الضوء الساقط.', 'انبعاث البروتونات من النواة.'],
    correctAnswerIndex: 1,
    explanation: 'الظاهرة الكهروضوئية هي ظاهرة انبعاث الإلكترونات (تسمى الإلكترونات الضوئية) من سطح مادة (عادة فلز) عندما يسقط عليها إشعاع كهرومغناطيسي بتردد مناسب.'
  },
  {
    questionText: 'ما هو "اقتران الشغل" (Work Function) لفلز؟',
    options: ['الطاقة الحركية للإلكترونات المتحررة.', 'طاقة الفوتون الساقط.', 'أقل طاقة لازمة لتحرير إلكترون من سطح الفلز.', 'عدد الإلكترونات المتحررة في الثانية.'],
    correctAnswerIndex: 2,
    explanation: 'اقتران الشغل ($\\phi$ أو $W_0$) هو خاصية مميزة للفلز، ويمثل الحد الأدنى من الطاقة التي يجب أن يكتسبها إلكترون ليتمكن من التحرر من سطح الفلز والتغلب على قوى الجذب التي تربطه به.'
  },
  {
    questionText: 'إذا كانت طاقة الفوتون الساقط على فلز أقل من اقتران الشغل لهذا الفلز، ماذا يحدث؟',
    options: ['تتحرر إلكترونات بطاقة حركية منخفضة.', 'تتحرر إلكترونات ولكنها تعود للسطح فورًا.', 'لا تتحرر أي إلكترونات على الإطلاق.', 'يتحرر عدد قليل من الإلكترونات.'],
    correctAnswerIndex: 2,
    explanation: 'لكي تحدث الظاهرة الكهروضوئية، يجب أن تكون طاقة الفوتون الساقط ($E=hf$) أكبر من أو تساوي اقتران الشغل ($\\phi$). إذا كانت الطاقة أقل، فلن يتمكن الفوتون من تحرير أي إلكترون، بغض النظر عن شدة الضوء.'
  },
  {
    questionText: 'ما هو "تردد العتبة" (Threshold Frequency)؟',
    options: ['التردد الذي تكون عنده طاقة الفوتون أكبر ما يمكن.', 'أقل تردد للإشعاع الساقط يمكنه تحرير إلكترونات من سطح الفلز.', 'التردد الذي يتوقف عنده انبعاث الإلكترونات.', 'تردد اهتزاز الفلز.'],
    correctAnswerIndex: 1,
    explanation: 'تردد العتبة ($f_0$) هو الحد الأدنى لتردد الفوتون الساقط اللازم لحدوث الانبعاث الكهروضوئي. طاقة هذا الفوتون تساوي تمامًا اقتران الشغل: $\\phi = hf_0$.'
  },
  {
    questionText: 'وفقًا لتفسير أينشتاين، زيادة شدة الضوء الساقط (زيادة عدد الفوتونات) على سطح فلز يؤدي إلى...',
    options: ['زيادة الطاقة الحركية للإلكترونات المتحررة.', 'زيادة عدد الإلكترونات المتحررة في الثانية.', 'زيادة اقتران الشغل للفلز.', 'زيادة تردد العتبة.'],
    correctAnswerIndex: 1,
    explanation: 'زيادة شدة الضوء تعني زيادة عدد الفوتونات الساقطة في الثانية. وبما أن كل فوتون يتفاعل مع إلكترون واحد، فإن هذا يؤدي إلى زيادة عدد الإلكترونات المتحررة في الثانية (أي زيادة التيار الكهروضوئي)، لكنه لا يغير من الطاقة الحركية لكل إلكترون على حدة.'
  },
];

export default function PhotoelectricEffect1QuizPage() {
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
