
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
    questionText: 'ما هو النص الأساسي لقانون غاوس؟',
    options: ['المجال الكهربائي داخل أي موصل يساوي صفر.', 'التدفق الكهربائي الكلي عبر أي سطح مغلق يتناسب طرديًا مع الشحنة الكلية المحصورة داخل ذلك السطح.', 'القوة الكهربائية بين شحنتين تتناسب عكسيًا مع مربع المسافة بينهما.', 'الطاقة الكهربائية محفوظة في دارة مغلقة.'],
    correctAnswerIndex: 1,
    explanation: 'قانون غاوس يربط بين التدفق الكهربائي عبر سطح مغلق والشحنة الصافية الموجودة بداخله. الصيغة هي $\\Phi_E = \\frac{Q_{enc}}{\\epsilon_0}$.'
  },
  {
    questionText: 'ما مقدار التدفق الكهربائي الكلي عبر سطح كروي يحيط بشحنة نقطية مقدارها $+8.85 \\times 10^{-9} C$? (اعتبر $\\epsilon_0 = 8.85 \\times 10^{-12} C^2/N \\cdot m^2$)',
    options: ['$1000 N \\cdot m^2/C$', '$1 N \\cdot m^2/C$', '$0.001 N \\cdot m^2/C$', 'صفر'],
    correctAnswerIndex: 0,
    explanation: 'باستخدام قانون غاوس: $\\Phi_E = \\frac{Q_{enc}}{\\epsilon_0} = \\frac{8.85 \\times 10^{-9}}{8.85 \\times 10^{-12}} = 1 \\times 10^3 = 1000 N \\cdot m^2/C$.'
  },
  {
    questionText: 'إذا تم وضع شحنة نقطية خارج سطح مغلق، فما هو التدفق الكهربائي الكلي عبر هذا السطح؟',
    options: ['موجب', 'سالب', 'يعتمد على شكل السطح', 'صفر'],
    correctAnswerIndex: 3,
    explanation: 'قانون غاوس يهتم فقط بالشحنة المحصورة داخل السطح ($Q_{enc}$). بما أن الشحنة خارج السطح، فإن $Q_{enc} = 0$, وبالتالي التدفق الكلي يساوي صفرًا. (عدد الخطوط التي تدخل السطح تساوي عدد الخطوط التي تخرج منه).'
  },
  {
    questionText: 'إذا تضاعف نصف قطر سطح غاوس الكروي الذي يحيط بشحنة نقطية، فإن التدفق الكهربائي الكلي عبر السطح...',
    options: ['يتضاعف', 'يقل إلى النصف', 'يبقى كما هو', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقانون غاوس، يعتمد التدفق الكهربائي الكلي فقط على مقدار الشحنة المحصورة داخل السطح، ولا يعتمد على شكل السطح أو حجمه أو نصف قطره. بما أن الشحنة المحصورة لم تتغير، يبقى التدفق كما هو.'
  },
  {
    questionText: 'سطح غاوس مغلق يحتوي على شحنتين: $q_1 = +3nC$ و $q_2 = -5nC$. ما هو التدفق الكهربائي الكلي عبر السطح؟',
    options: ['موجب', 'سالب', 'صفر', 'لا يمكن تحديده'],
    correctAnswerIndex: 1,
    explanation: 'الشحنة الكلية المحصورة هي $Q_{enc} = q_1 + q_2 = +3nC - 5nC = -2nC$. بما أن الشحنة الكلية المحصورة سالبة، فإن التدفق الكهربائي الكلي يكون سالبًا (صافي عدد الخطوط التي تدخل السطح أكبر من التي تخرج منه).'
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

