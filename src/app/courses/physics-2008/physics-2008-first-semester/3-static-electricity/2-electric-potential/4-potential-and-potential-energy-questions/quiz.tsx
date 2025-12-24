
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
    questionText: 'الجهد الكهربائي عند نقطة ما هو $20V$. ما مقدار الشغل اللازم لنقل بروتون ($q=1.6 \\times 10^{-19} C$) من اللانهاية إلى تلك النقطة؟',
    options: ['$3.2 \\times 10^{-18} J$', '$20 J$', '$1.6 \\times 10^{-19} J$', '$8.0 \\times 10^{-21} J$'],
    correctAnswerIndex: 0,
    explanation: 'الشغل المبذول بواسطة قوة خارجية لنقل شحنة يساوي التغير في طاقة وضعها. $W_{ext} = \\Delta PE = q \\Delta V = q(V_f - V_i)$. بافتراض أن الجهد في اللانهاية صفر ($V_i=0$), فإن $W_{ext} = qV_f = (1.6 \\times 10^{-19})(20) = 3.2 \\times 10^{-18} J$.'
  },
  {
    questionText: 'نقطتان A و B في مجال كهربائي. إذا كان الشغل اللازم لنقل شحنة $2\\mu C$ من A إلى B هو $10\\mu J$, فما فرق الجهد $V_{BA} = V_B - V_A$؟',
    options: ['$5V$', '$-5V$', '$20V$', '$0.2V$'],
    correctAnswerIndex: 0,
    explanation: 'لدينا $W_{A \\to B} = q(V_B - V_A) = qV_{BA}$. \n $10 \\times 10^{-6} J = (2 \\times 10^{-6} C) \\times V_{BA}$. \n $V_{BA} = (10 \\times 10^{-6}) / (2 \\times 10^{-6}) = 5V$.'
  },
  {
    questionText: 'عند تحريك إلكترون من نقطة جهدها $50V$ إلى نقطة جهدها $80V$, فإن طاقة وضعه الكهربائية...',
    options: ['تزداد بمقدار $30 eV$', 'تقل بمقدار $30 eV$', 'تبقى ثابتة', 'تزداد بمقدار $130 eV$'],
    correctAnswerIndex: 1,
    explanation: 'التغير في طاقة الوضع $\\Delta PE = q \\Delta V = q(V_f - V_i)$. \n شحنة الإلكترون $q = -e$. \n $\\Delta PE = (-e)(80V - 50V) = -e(30V) = -30 eV$. الإشارة السالبة تعني أن طاقة الوضع تقل.'
  },
  {
    questionText: 'بروتون انطلق من السكون من عند اللوح الموجب في مجال كهربائي منتظم فرق الجهد بين لوحيه 100 فولت. ما طاقته الحركية لحظة وصوله اللوح السالب؟',
    options: ['$100 J$', '$1.6 \\times 10^{-19} J$', '$100 eV$', '$160 eV$'],
    correctAnswerIndex: 2,
    explanation: 'التغير في الطاقة الحركية يساوي سالب التغير في طاقة الوضع. \n $\\Delta KE = -\\Delta PE = -q\\Delta V = -e(V_{final} - V_{initial})$. \n بافتراض جهد اللوح الموجب $100V$ والسالب $0V$, فإن $\\Delta V = 0 - 100 = -100V$. \n $\\Delta KE = -e(-100V) = 100 eV$.'
  },
  {
    questionText: 'إذا تحركت شحنة من نقطة A إلى B ثم إلى C, وكان فرق الجهد بين A و C هو 10 فولت, فإن الشغل المبذول لنقل الشحنة...',
    options: ['يعتمد على المسار الذي سلكته الشحنة', 'يساوي صفرًا دائمًا', 'يعتمد فقط على نقطتي البداية والنهاية', 'يساوي 10 جول دائمًا'],
    correctAnswerIndex: 2,
    explanation: 'القوة الكهربائية هي قوة محافظة، وهذا يعني أن الشغل المبذول بواسطتها لا يعتمد على المسار، بل يعتمد فقط على نقطتي البداية والنهاية (أي على فرق الجهد بينهما).'
  }
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
