
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
    questionText: 'ما هي المعاوقة (Z)؟',
    options: ['مقاومة المحث فقط', 'مقاومة المواسع فقط', 'المقاومة الكلية للدارة للتيار المتردد', 'التيار الكلي في الدارة'],
    correctAnswerIndex: 2,
    explanation: 'المعاوقة (Impedance) هي المقياس الكلي لممانعة الدارة لمرور التيار المتردد، وهي تشمل تأثير كل من المقاومة (R) والمفاعلة الحثية ($X_L$) والمفاعلة المواسعية ($X_C$).'
  },
  {
    questionText: 'في دارة RLC، إذا كانت المقاومة R = 40 أوم والمفاعلة الكلية ($X_L - X_C$) = 30 أوم، فما مقدار المعاوقة Z؟',
    options: ['70 أوم', '10 أوم', '50 أوم', '1200 أوم'],
    correctAnswerIndex: 2,
    explanation: 'نستخدم نظرية فيثاغورس لحساب المعاوقة: $Z = \\sqrt{R^2 + (X_L - X_C)^2} = \\sqrt{40^2 + 30^2} = \\sqrt{1600 + 900} = \\sqrt{2500} = 50$ أوم.'
  },
  {
    questionText: 'قانون أوم لدارة التيار المتردد يُكتب على الصورة:',
    options: ['$V = I (R + X_L - X_C)$', '$V = I / Z$', '$I = V Z$', '$V = I Z$'],
    correctAnswerIndex: 3,
    explanation: 'تمامًا مثل قانون أوم للتيار المستمر، فإن الجهد في دارة التيار المتردد يساوي حاصل ضرب التيار في الممانعة الكلية، وهي المعاوقة Z. يمكن استخدام القيم العظمى ($V_{max} = I_{max}Z$) أو القيم الفعالة ($V_{rms} = I_{rms}Z$).'
  },
  {
    questionText: 'متى تكون المعاوقة (Z) في دارة RLC في أدنى قيمة لها؟',
    options: ['عندما يكون التردد عاليًا جدًا', 'عندما يكون التردد منخفضًا جدًا', 'عندما تكون الدارة في حالة رنين ($X_L = X_C$)', 'عندما تكون المقاومة صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'المعاوقة $Z = \\sqrt{R^2 + (X_L - X_C)^2}$. تكون هذه القيمة في أدنى حد لها عندما يكون القوس $(X_L - X_C)^2$ يساوي صفرًا، وهو ما يحدث عند حالة الرنين حيث $X_L = X_C$. في هذه الحالة، تصبح المعاوقة مساوية للمقاومة فقط ($Z=R$).'
  },
  {
    questionText: 'في مخطط المعاوقة الطوري، ماذا يمثل وتر المثلث القائم الزاوية؟',
    options: ['المقاومة (R)', 'المفاعلة الحثية ($X_L$)', 'المفاعلة الكلية ($X_L - X_C$)', 'المعاوقة (Z)'],
    correctAnswerIndex: 3,
    explanation: 'في التمثيل الطوري، تُمثل المقاومة R على المحور الأفقي، والمفاعلة الكلية ($X_L-X_C$) على المحور الرأسي. الوتر الناتج عن المجموع المتجهي لهما يمثل المعاوقة الكلية Z.'
  },
];

export default function ImpedanceQuizPage() {
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
