
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { CylinderInField, PrismInField } from './diagram';

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
    questionText: 'ما هو مقدار التدفق الكهربائي الكلي عبر أي سطح مغلق لا يحتوي على شحنات كهربائية بداخله؟',
    options: ['يعتمد على شكل السطح', 'يعتمد على شدة المجال الخارجي', 'صفر دائمًا', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقانون غاوس، التدفق الكهربائي الكلي عبر سطح مغلق يساوي مجموع الشحنات المحصورة بداخله مقسومًا على سماحية الفراغ ($\\Phi = Q_{enc}/\\epsilon_0$). إذا كانت الشحنة المحصورة صفرًا، فإن التدفق الكلي يكون صفرًا دائمًا.'
  },
  {
    questionText: 'أسطوانة نصف قطرها r وطولها L موضوعة في مجال كهربائي منتظم E موازٍ لمحورها. ما مقدار التدفق الكهربائي عبر السطح الجانبي المنحني للأسطوانة؟',
    diagram: 'cylinder',
    options: ['$-EA_{base}$', 'صفر', '$E(2\\pi r L)$', '$2EA_{base}$'],
    correctAnswerIndex: 1,
    explanation: 'بالنسبة للسطح الجانبي، يكون متجه المساحة (العمودي على السطح) دائمًا عموديًا على اتجاه المجال الكهربائي E. بالتالي، الزاوية $\\theta$ هي $90^\\circ$ و $\\cos(90^\\circ)=0$. إذن، التدفق عبر السطح الجانبي المنحني يساوي صفرًا.'
  },
  {
    questionText: 'بناءً على الرسم السابق للأسطوانة، إذا كان التدفق عبر القاعدة اليسرى هو $-5 N \\cdot m^2/C$، فما هو التدفق عبر القاعدة اليمنى؟',
    diagram: 'cylinder',
    options: ['$-5 N \\cdot m^2/C$', '$+5 N \\cdot m^2/C$', 'صفر', 'لا يمكن تحديده'],
    correctAnswerIndex: 1,
    explanation: 'التدفق الكلي عبر السطح المغلق هو صفر. $\\Phi_{total} = \\Phi_{left} + \\Phi_{right} + \\Phi_{curved} = 0$. بما أن التدفق عبر السطح المنحني صفر، فإن $\\Phi_{left} + \\Phi_{right} = 0$. إذن، $\\Phi_{right} = -\\Phi_{left} = -(-5) = +5 N \\cdot m^2/C$.'
  },
  {
    questionText: 'موشور ثلاثي قائم موضوع في مجال كهربائي منتظم E يتجه رأسيًا للأسفل كما في الشكل. ما هو التدفق الكهربائي عبر الوجه المائل للموشور؟ (علمًا بأن التدفق عبر القاعدة السفلية هو $\\Phi_{base}$)',
    diagram: 'prism',
    options: ['صفر', '$\\Phi_{base}$', '$-\\Phi_{base}$', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'لا يوجد شحنة داخل الموشور، لذا فالتدفق الكلي صفر. الأوجه الجانبية (الرأسية) موازية للمجال، فالتدفق عبرها صفر. إذن، $\\Phi_{total} = \\Phi_{base} + \\Phi_{top} + \\Phi_{sides} = 0$. $\\Phi_{base} + \\Phi_{top} + 0 = 0$. \n $\\Phi_{top} = -\\Phi_{base}$. التدفق الداخل (عبر الوجه المائل) يساوي سالب التدفق الخارج (عبر القاعدة).'
  },
  {
    questionText: 'نصف كرة مغلق موضوع في مجال كهربائي منتظم. إذا كان التدفق عبر القاعدة الدائرية هو $\\Phi_0$, فما هو التدفق عبر السطح الكروي؟',
    options: ['$\\Phi_0$', '$-\\Phi_0$', '$2\\Phi_0$', 'صفر'],
    correctAnswerIndex: 1,
    explanation: 'بما أن السطح مغلق ولا توجد شحنة بداخله، فإن التدفق الكلي صفر. $\\Phi_{total} = \\Phi_{base} + \\Phi_{hemisphere} = 0$. إذن، $\\Phi_{hemisphere} = -\\Phi_{base} = -\\Phi_0$.'
  },
];

export default function FluxThroughClosedSurfaceQuizPage() {
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
              {q.diagram === 'cylinder' && <CylinderInField />}
              {q.diagram === 'prism' && <PrismInField />}
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
