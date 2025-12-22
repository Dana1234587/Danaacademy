
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
    questionText: 'عندما يتسارع جسيم مشحون من السكون عبر فرق جهد $\\Delta V$, فإن طاقته الحركية النهائية تتناسب طرديًا مع...',
    options: ['كتلته فقط', 'شحنته فقط', 'كل من شحنته وفرق الجهد', 'مربع سرعته فقط'],
    correctAnswerIndex: 2,
    explanation: 'التغير في الطاقة الحركية يساوي الشغل المبذول بواسطة القوة الكهربائية: $\\Delta KE = W = q \\Delta V$. بما أن الجسيم بدأ من السكون، فإن $KE_f = q \\Delta V$. إذن، الطاقة الحركية النهائية تعتمد على الشحنة وفرق الجهد.'
  },
  {
    questionText: 'بروتون وإلكترون يتسارعان من السكون عبر نفس فرق الجهد الكهربائي. أي العبارات التالية صحيحة؟',
    options: ['يكتسبان نفس الطاقة الحركية ونفس السرعة النهائية.', 'يكتسبان نفس الطاقة الحركية، لكن سرعة الإلكترون أكبر.', 'يكتسب البروتون طاقة حركية أكبر وسرعة أكبر.', 'يكتسب الإلكترون طاقة حركية أكبر وسرعة أكبر.'],
    correctAnswerIndex: 1,
    explanation: 'بما أن لهما نفس مقدار الشحنة (e) ويعبران نفس فرق الجهد ($\\Delta V$), فإنهما يكتسبان نفس الطاقة الحركية ($KE = e \\Delta V$). لكن، بما أن $KE = \\frac{1}{2}mv^2$ وكتلة الإلكترون أقل بكثير، فيجب أن تكون سرعته أكبر بكثير ليحقق نفس الطاقة الحركية.'
  },
  {
    questionText: 'جسيم ألفا ($q=+2e, m=4u$) ونواة ديوتيريوم ($q=+e, m=2u$) يتسارعان من السكون عبر نفس فرق الجهد. ما النسبة بين سرعتيهما النهائيتين ($v_\\alpha / v_D$)?',
    options: ['1', '$1/\\sqrt{2}$', '$\\sqrt{2}$', '2'],
    correctAnswerIndex: 1,
    explanation: 'سرعة الجسيم تُعطى بالعلاقة $v = \\sqrt{\\frac{2q\\Delta V}{m}}$. النسبة بين السرعتين هي: $\\frac{v_\\alpha}{v_D} = \\frac{\\sqrt{2(2e)\\Delta V / (4u)}}{\\sqrt{2(e)\\Delta V / (2u)}} = \\sqrt{\\frac{2e/4u}{e/2u}} = \\sqrt{\\frac{1/2}{1/2}} = 1$. هناك خطأ، لنعد الحساب. $\\sqrt{\\frac{q_\\alpha/m_\\alpha}{q_D/m_D}} = \\sqrt{\\frac{(2e/4u)}{(e/2u)}} = \\sqrt{\\frac{1/2}{1/2}}=1$. الإجابة يجب أن تكون 1. سأغير الخيارات. \nتصحيح: $\\frac{v_\\alpha}{v_D} = \\sqrt{\\frac{q_\\alpha/m_\\alpha}{q_D/m_D}} = \\sqrt{\\frac{2e/4m_p}{e/2m_p}} = \\sqrt{\\frac{1/2}{1/2}}=1$. \nالخيار الصحيح هو $\\frac{1}{\\sqrt{2}}$. $v = \\sqrt{2qV/m}$. $v_\\alpha = \\sqrt{2(2e)V/4m} = \\sqrt{eV/m}$. $v_D = \\sqrt{2(e)V/2m} = \\sqrt{eV/m}$. النسبة 1. سأغير السؤال: بروتون وجسيم ألفا. $v_p = \\sqrt{2eV/m_p}$. $v_\\alpha = \\sqrt{2(2e)V/4m_p} = \\sqrt{eV/m_p}$. النسبة $v_\\alpha / v_p = \\sqrt{(eV/m_p)} / \\sqrt{(2eV/m_p)} = 1/\\sqrt{2}$.'
  },
  {
    questionText: 'إلكترون يتسارع من السكون عبر فرق جهد مقداره 500 فولت. ما مقدار سرعته النهائية؟ (كتلة الإلكترون $9.11 \\times 10^{-31} kg$, شحنته $1.6 \\times 10^{-19} C$)',
    options: ['$1.33 \\times 10^7 m/s$', '$1.76 \\times 10^{14} m/s$', '$5.9 \\times 10^5 m/s$', '$8.4 \\times 10^6 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'أولاً، نحسب الطاقة الحركية المكتسبة: $KE = q\\Delta V = (1.6 \\times 10^{-19} C)(500 V) = 8 \\times 10^{-17} J$. \n ثانياً، نحسب السرعة من الطاقة الحركية: $v = \\sqrt{\\frac{2KE}{m}} = \\sqrt{\\frac{2 \\times (8 \\times 10^{-17})}{9.11 \\times 10^{-31}}} \\approx \\sqrt{1.76 \\times 10^{14}} \\approx 1.33 \\times 10^7 m/s$.'
  },
  {
    questionText: 'بروتون يتسارع من السكون في مجال كهربائي منتظم. إذا تضاعف فرق الجهد الذي عبره، فإن طاقته الحركية النهائية... وسرعته النهائية...',
    options: ['تتضاعف، تتضاعف', 'تتضاعف، تزداد بمقدار $\\sqrt{2}$', 'تزداد 4 مرات، تتضاعف', 'تبقى ثابتة، تبقى ثابتة'],
    correctAnswerIndex: 1,
    explanation: '$KE = q\\Delta V$, لذا عند مضاعفة $\\Delta V$، تتضاعف KE. \n $v = \\sqrt{2q\\Delta V/m}$, لذا عند مضاعفة $\\Delta V$, فإن v تزداد بمعامل $\\sqrt{2}$.'
  }
];

quizQuestions[2] = {
    ...quizQuestions[2],
    questionText: 'بروتون ($q=+e, m=m_p$) وجسيم ألفا ($q=+2e, m=4m_p$) يتسارعان من السكون عبر نفس فرق الجهد. ما النسبة بين سرعتيهما النهائيتين ($v_\\alpha / v_p$)?',
    options: ['1', '$1/\\sqrt{2}$', '$\\sqrt{2}$', '1/2'],
    correctAnswerIndex: 1,
    explanation: 'سرعة الجسيم تُعطى بالعلاقة $v = \\sqrt{\\frac{2q\\Delta V}{m}}$. \n $v_p = \\sqrt{2e\\Delta V / m_p}$. \n $v_\\alpha = \\sqrt{2(2e)\\Delta V / (4m_p)} = \\sqrt{e\\Delta V/m_p}$. \n النسبة: $\\frac{v_\\alpha}{v_p} = \\frac{\\sqrt{e\\Delta V/m_p}}{\\sqrt{2e\\Delta V / m_p}} = \\frac{1}{\\sqrt{2}}$.'
}


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
