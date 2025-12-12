
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
    questionText: 'بروتون دخل مجالًا كهربائيًا منتظمًا بسرعة ابتدائية صفر. اتجاه تسارعه يكون...',
    options: ['بنفس اتجاه المجال', 'عكس اتجاه المجال', 'عموديًا على المجال', 'صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'القوة الكهربائية على البروتون (شحنة موجبة) تكون بنفس اتجاه المجال الكهربائي. وبما أن $F=ma$, فإن التسارع يكون أيضًا بنفس اتجاه القوة والمجال.'
  },
  {
    questionText: 'إلكترون دخل مجالًا كهربائيًا منتظمًا بسرعة ابتدائية $v_i$ في نفس اتجاه المجال. ماذا يحدث لسرعته؟',
    options: ['تزداد (يتسارع)', 'تقل (يتباطأ)', 'تبقى ثابتة', 'يتحرك في مسار دائري'],
    correctAnswerIndex: 1,
    explanation: 'القوة الكهربائية على الإلكترون (شحنة سالبة) تكون عكس اتجاه المجال. بما أن سرعته الابتدائية في نفس اتجاه المجال، فإن اتجاه الحركة يكون عكس اتجاه القوة، وبالتالي يتباطأ الإلكترون.'
  },
  {
    questionText: 'إلكترون يتسارع من السكون في مجال كهربائي منتظم شدته $1000 N/C$. ما مقدار تسارعه؟ (كتلة الإلكترون $9.11 \\times 10^{-31} kg$, شحنة الإلكترون $1.6 \\times 10^{-19} C$)',
    options: ['$\\approx 1.76 \\times 10^{14} m/s^2$', '$\\approx 5.7 \\times 10^{-12} m/s^2$', '$\\approx 9.11 \\times 10^{3} m/s^2$', '$\\approx 1.6 \\times 10^{10} m/s^2$'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم القانون $a = qE/m$. \n $a = (1.6 \\times 10^{-19} C)(1000 N/C) / (9.11 \\times 10^{-31} kg) \\approx 1.76 \\times 10^{14} m/s^2$.'
  },
  {
    questionText: 'جسيم مشحون يتحرك في مجال كهربائي منتظم. أي من الكميات التالية تبقى ثابتة دائمًا؟',
    options: ['سرعته', 'طاقته الحركية', 'زخمه الخطي', 'تسارعه'],
    correctAnswerIndex: 3,
    explanation: 'في مجال كهربائي منتظم (E ثابت)، تكون القوة الكهربائية ($F=qE$) ثابتة. وبما أن القوة ثابتة والكتلة ثابتة، فإن التسارع ($a=F/m$) يكون ثابتًا أيضًا.'
  },
  {
    questionText: 'دخل إلكترون مجالاً كهربائياً منتظماً شدته $200 N/C$ بسرعة ابتدائية $3.52 \\times 10^5 m/s$ بعكس اتجاه المجال. ما الزمن اللازم ليتوقف الإلكترون لحظياً؟\n(شحنة الإلكترون $1.6 \\times 10^{-19} C$, كتلته $9.11 \\times 10^{-31} kg$)',
    options: ['$1 \\times 10^{-8} s$', '$2 \\times 10^{-8} s$', '$1 \\times 10^{-9} s$', '$2 \\times 10^{-9} s$'],
    correctAnswerIndex: 3,
    explanation: 'أولاً، نحسب التسارع: $a = \\frac{qE}{m} = \\frac{(1.6 \\times 10^{-19})(200)}{9.11 \\times 10^{-31}} \\approx 3.51 \\times 10^{13} m/s^2$. بما أن الإلكترون يتحرك عكس المجال، فإن القوة والتسارع يكونان مع اتجاه الحركة. لكن السؤال يذكر أن السرعة عكس المجال. لنعتبر اتجاه المجال هو الموجب، فالسرعة سالبة $v_i = -3.52 \\times 10^5 m/s$ والقوة على الإلكترون سالبة أيضاً. التسارع سيكون سالب. المعادلة الصحيحة هي $v_f = v_i + at$. نحن نريد $v_f = 0$. $0 = v_i + at \\implies t = -v_i/a$. بما أن كلاهما سالب، الزمن موجب. $t = (3.52 \\times 10^5) / (3.51 \\times 10^{13}) \\approx 1 \\times 10^{-8} s$. هناك خطأ في الحسابات، لنعدها: $t=v_i/a = (3.52e5) / (3.51e13) = 1.002 e-8 s$. يبدو أن الخيار الأول هو الصحيح. لحظة، اتجاه الحركة عكس اتجاه المجال. القوة على الإلكترون عكس اتجاه المجال. إذن القوة بنفس اتجاه الحركة. يجب أن يتسارع! السؤال فيه تناقض. لنفترض أن السؤال هو: "دخل بسرعة... مع اتجاه المجال". عندها القوة ستكون عكس الحركة (تباطؤ). $t = |v_i/a| = (3.52e5) / (3.51e13) \\approx 1e-8 s$. الخيار (أ).  \n\n **تصحيح الفهم:** السؤال صحيح. السرعة الابتدائية عكس اتجاه المجال. القوة على الإلكترون (سالب الشحنة) تكون عكس اتجاه المجال. إذن القوة بنفس اتجاه السرعة الابتدائية. هذا يعني أن الإلكترون **يتسارع** ولن يتوقف أبدًا. لا بد أن السؤال يقصد أن السرعة **مع** اتجاه المجال. في هذه الحالة، القوة ستكون عكس السرعة (تباطؤ). التسارع $a = -3.51 \\times 10^{13} m/s^2$. الزمن للتوقف: $t = (v_f - v_i)/a = (0 - 3.52 \\times 10^5) / (-3.51 \\times 10^{13}) \\approx 1 \\times 10^{-8} s$.'
  },
];


// Correction for the last question to make physical sense
quizQuestions[4] = {
    questionText: 'دخل إلكترون مجالاً كهربائياً منتظماً شدته $200 N/C$ بسرعة ابتدائية $7.0 \\times 10^5 m/s$ **مع** اتجاه المجال. ما الزمن اللازم ليتوقف الإلكترون لحظياً؟\n(شحنة الإلكترون $e=1.6 \\times 10^{-19} C$, كتلته $m_e=9.11 \\times 10^{-31} kg$)',
    options: ['$1 \\times 10^{-8} s$', '$2 \\times 10^{-8} s$', '$1 \\times 10^{-9} s$', '$2 \\times 10^{-9} s$'],
    correctAnswerIndex: 1,
    explanation: 'بما أن الإلكترون يتحرك مع اتجاه المجال، فإن القوة الكهربائية عليه ستكون عكس اتجاه حركته (لأن شحنته سالبة)، مما يسبب تباطؤه.\n1. نحسب التسارع (التباطؤ): $a = \\frac{F}{m} = \\frac{-qE}{m} = \\frac{-(1.6 \\times 10^{-19})(200)}{9.11 \\times 10^{-31}} \\approx -3.51 \\times 10^{13} m/s^2$.\n2. نستخدم معادلة الحركة $v_f = v_i + at$ لإيجاد الزمن عندما $v_f=0$.\n$0 = (7.0 \\times 10^5) + (-3.51 \\times 10^{13})t$.\n$t = \\frac{-7.0 \\times 10^5}{-3.51 \\times 10^{13}} \\approx 1.99 \\times 10^{-8} s \\approx 2 \\times 10^{-8} s$.'
};


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

