
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
    questionText: 'وفقًا لفرضية بلانك، فإن الطاقة التي يمتصها أو يشعها الجسم المهتز تكون...',
    options: ['مستمرة ويمكن أن تأخذ أي قيمة.', 'مكمّاة وتأتي على شكل حزم منفصلة.', 'ثابتة دائمًا.', 'تتناسب عكسيًا مع التردد.'],
    correctAnswerIndex: 1,
    explanation: 'فرضية بلانك كانت ثورية لأنها اقترحت أن الطاقة لا تنبعث بشكل مستمر، بل على شكل كميات منفصلة (كمّات أو كوانتا) تتناسب طاقتها مع تردد الاهتزاز.'
  },
  {
    questionText: 'ما هي صيغة حساب طاقة الفوتون (E) بدلالة تردده (f)؟',
    options: ['$E = h/f$', '$E = hf^2$', '$E = hf$', '$E = f/h$'],
    correctAnswerIndex: 2,
    explanation: 'طاقة الفوتون تتناسب طرديًا مع تردده. ثابت التناسب هو ثابت بلانك (h)، والصيغة هي $E=hf$.'
  },
  {
    questionText: 'فوتون طوله الموجي $500 nm$. ما مقدار طاقته بوحدة الإلكترون فولت (eV)? \n(علماً أن $h = 6.63 \\times 10^{-34} J\\cdot s$, $c = 3 \\times 10^8 m/s$, و $1 eV = 1.6 \\times 10^{-19} J$)',
    options: ['1.24 eV', '2.48 eV', '3.1 eV', '0.62 eV'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم العلاقة $E = hc/\\lambda$. \n $E = (6.63 \\times 10^{-34} \\times 3 \\times 10^8) / (500 \\times 10^{-9}) \\approx 3.98 \\times 10^{-19} J$. \n للتحويل إلى إلكترون فولت: $E(eV) = (3.98 \\times 10^{-19} J) / (1.6 \\times 10^{-19} J/eV) \\approx 2.48$ eV.'
  },
  {
    questionText: 'فوتون A له ضعف طاقة الفوتون B. ما هي العلاقة بين ترددهما؟',
    options: ['$f_A = 2f_B$', '$f_A = f_B/2$', '$f_A = 4f_B$', '$f_A = \\sqrt{2}f_B$'],
    correctAnswerIndex: 0,
    explanation: 'بما أن الطاقة تتناسب طرديًا مع التردد ($E=hf$), فإن الفوتون الذي له ضعف الطاقة يجب أن يكون له ضعف التردد.'
  },
  {
    questionText: 'ما هو "الفوتون"؟',
    options: ['جسيم سالب الشحنة.', 'كمّة (حزمة) من الطاقة الكهرومغناطيسية.', 'موجة ميكانيكية.', 'جسيم له كتلة سكون.'],
    correctAnswerIndex: 1,
    explanation: 'الفوتون هو الجسيم الأولي للضوء وجميع أشكال الإشعاع الكهرومغناطيسي الأخرى. وهو عبارة عن كمّة أو حزمة منفصلة من الطاقة.'
  },
];

export default function EnergyQuantizationQuizPage() {
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
