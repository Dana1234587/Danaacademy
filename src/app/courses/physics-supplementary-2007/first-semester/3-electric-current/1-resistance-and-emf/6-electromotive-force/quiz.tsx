
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
    questionText: 'ما هو تعريف القوة الدافعة الكهربائية ($\\varepsilon$) للبطارية؟',
    options: ['الشغل المبذول لنقل شحنة داخل البطارية فقط', 'فرق الجهد بين قطبي البطارية عندما لا يمر تيار', 'القدرة التي تنتجها البطارية', 'مقاومة البطارية للتيار'],
    correctAnswerIndex: 1,
    explanation: 'القوة الدافعة الكهربائية (EMF) تمثل فرق الجهد بين قطبي مصدر الجهد (البطارية) في دائرة مفتوحة، أي عندما لا يمر تيار كهربائي.'
  },
  {
    questionText: 'بطارية قوتها الدافعة 12 فولت ومقاومتها الداخلية 1 أوم، وصلت بمقاومة خارجية 5 أوم. ما فرق الجهد بين قطبي البطارية؟',
    options: ['12 فولت', '10 فولت', '2 فولت', '7 فولت'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نحسب التيار الكلي: $I = \\varepsilon / (R+r) = 12 / (5+1) = 2 A$. \n ثانياً، نحسب فرق الجهد الطرفي: $V = \\varepsilon - Ir = 12 - (2 \\times 1) = 10$ فولت.'
  },
  {
    questionText: 'متى يكون فرق الجهد بين قطبي البطارية (V) أكبر من قوتها الدافعة الكهربائية ($\\varepsilon$)?',
    options: ['عندما تكون البطارية في حالة تفريغ', 'عندما تكون الدائرة مفتوحة', 'عندما تكون البطارية في حالة شحن', 'هذا غير ممكن أبدًا'],
    correctAnswerIndex: 2,
    explanation: 'يحدث هذا عندما يتم شحن البطارية بواسطة مصدر جهد خارجي. في هذه الحالة، يكون التيار داخلًا إلى القطب الموجب، وتصبح العلاقة $V = \\varepsilon + Ir$.'
  },
  {
    questionText: 'ماذا يمثل الهبوط في الجهد ($Ir$) داخل البطارية؟',
    options: ['الطاقة المكتسبة بواسطة الشحنات', 'الطاقة المفقودة على شكل حرارة بسبب المقاومة الداخلية', 'الجهد المتاح للدائرة الخارجية', 'القدرة الكلية للبطارية'],
    correctAnswerIndex: 1,
    explanation: 'المقاومة الداخلية (r) للبطارية تسبب فقدان جزء من الطاقة على شكل حرارة أثناء مرور التيار. هذا الفقد في الطاقة يظهر على شكل هبوط في الجهد مقداره $Ir$.'
  },
  {
    questionText: 'بطارية قوتها الدافعة $\\varepsilon$ ومقاومتها الداخلية $r$. عند أي شرط يكون فرق الجهد بين قطبيها يساوي صفرًا؟',
    options: ['عندما تكون المقاومة الخارجية صفرًا (دارة قصر)', 'عندما تكون المقاومة الخارجية لا نهائية (دائرة مفتوحة)', 'عندما تتساوى المقاومة الخارجية مع الداخلية', 'لا يمكن أن يساوي صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'يحدث هذا في حالة دارة القصر (short circuit)، حيث تكون المقاومة الخارجية $R=0$. التيار يصبح $I = \\varepsilon/r$. فرق الجهد الطرفي $V = \\varepsilon - Ir = \\varepsilon - (\\varepsilon/r)r = \\varepsilon - \\varepsilon = 0$.'
  },
];

export default function ElectromotiveForceQuizPage() {
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

