
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
    questionText: 'في الموصل الكروي المشحون والمعزول، يكون الجهد الكهربائي في أي نقطة بداخله...',
    options: ['صفرًا', 'متغيرًا ويزداد كلما اقتربنا من المركز', 'ثابتًا ويساوي الجهد على السطح', 'لا نهائيًا'],
    correctAnswerIndex: 2,
    explanation: 'بما أن المجال الكهربائي داخل الموصل يساوي صفرًا، فإن الشغل اللازم لنقل شحنة بين أي نقطتين داخل الموصل يساوي صفرًا. هذا يعني أن فرق الجهد بين أي نقطتين يساوي صفر، أي أن جميع النقاط داخل الموصل وعلى سطحه لها نفس الجهد.'
  },
  {
    questionText: 'كرة موصلة نصف قطرها 10 سم وشحنتها $2 nC$. ما مقدار الجهد الكهربائي عند نقطة تبعد 5 سم عن مركزها؟',
    options: ['360 فولت', '90 فولت', '180 فولت', 'صفر'],
    correctAnswerIndex: 2,
    explanation: 'النقطة تقع داخل الموصل. الجهد في أي نقطة داخل الموصل يساوي الجهد على سطحه. \n $V_{سطح} = k \\frac{q}{R} = (9 \\times 10^9) \\frac{2 \\times 10^{-9}}{0.10} = 180$ فولت.'
  },
  {
    questionText: 'كرة موصلة نصف قطرها R. عند أي مسافة من المركز يكون المجال الكهربائي صفرًا بينما الجهد الكهربائي غير صفري؟',
    options: ['عند $r > R$', 'عند $r = R$', 'عند $r < R$', 'لا توجد مثل هذه المنطقة'],
    correctAnswerIndex: 2,
    explanation: 'في المنطقة الداخلية للموصل ($r<R$), يكون المجال الكهربائي صفرًا دائمًا، بينما يكون الجهد ثابتًا ويساوي قيمة غير صفرية (قيمة الجهد على السطح).'
  },
  {
    questionText: 'ماذا يحدث لجهد موصل كروي معزول عند زيادة شحنته؟',
    options: ['يقل', 'يبقى ثابتًا', 'يزداد', 'يصبح سالبًا'],
    correctAnswerIndex: 2,
    explanation: 'الجهد على سطح الموصل (وداخله) يُعطى بالعلاقة $V = kq/R$. بما أن الجهد يتناسب طرديًا مع الشحنة q، فإن زيادة الشحنة تؤدي إلى زيادة الجهد.'
  },
  {
    questionText: 'الجهد الكهربائي على سطح كرة موصلة هو 50 فولت. ما هو الشغل اللازم لنقل بروتون من مركز الكرة إلى سطحها؟',
    options: ['50 جول', '8 \\times 10^{-18} جول', 'صفر', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'جميع النقاط داخل وعلى سطح الموصل لها نفس الجهد (50 فولت). بما أن فرق الجهد بين المركز والسطح يساوي صفرًا، فإن الشغل المبذول لنقل أي شحنة بينهما يساوي صفرًا ($W = q\\Delta V = q \\times 0 = 0$).'
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
