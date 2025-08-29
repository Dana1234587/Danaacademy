
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { ForceTimeGraph } from './diagram';

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
    questionText: 'في منحنى (القوة - الزمن)، ماذا تمثل المساحة تحت المنحنى؟',
    options: ['الشغل المبذول', 'التغير في الزخم الخطي (الدفع)', 'القدرة', 'التسارع'],
    correctAnswerIndex: 1,
    explanation: 'المساحة تحت منحنى (القوة - الزمن) تساوي تكامل القوة بالنسبة للزمن، وهو ما يعرف بالدفع (Impulse)، والذي يساوي بدوره التغير في الزخم الخطي ($\\Delta p$).'
  },
  {
    questionText: 'في منحنى (الزخم الخطي - الزمن)، ماذا يمثل ميل الخط المستقيم؟',
    options: ['القوة المحصلة المؤثرة', 'الطاقة الحركية', 'الكتلة', 'الإزاحة'],
    correctAnswerIndex: 0,
    explanation: 'ميل المنحنى هو $\\frac{\\Delta p}{\\Delta t}$. وفقًا للصيغة العامة لقانون نيوتن الثاني، فإن القوة المحصلة تساوي المعدل الزمني للتغير في الزخم الخطي.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني، جسم كتلته $2 kg$ بدأ حركته من السكون. ما سرعته النهائية بعد $4s$؟',
    graph: true,
    options: ['$5 m/s$', '$10 m/s$', '$20 m/s$', '$40 m/s$'],
    correctAnswerIndex: 1,
    explanation: 'الدفع = المساحة تحت المنحنى = مساحة المثلث = $0.5 \\times \\text{القاعدة} \\times \\text{الارتفاع} = 0.5 \\times 4s \\times 10N = 20 Ns$. الدفع يساوي التغير في الزخم: $\\Delta p = m(v_f - v_i)$. إذن $20 = 2(v_f - 0) \\Rightarrow v_f = 10 m/s$.'
  },
  {
    questionText: 'إذا كان منحنى (الزخم - الزمن) لجسم خطًا أفقيًا لا يساوي الصفر، فهذا يعني أن...',
    options: ['الجسم ساكن', 'الجسم يتسارع بانتظام', 'القوة المحصلة على الجسم تساوي صفرًا', 'القوة المحصلة على الجسم ثابتة ولا تساوي صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'خط أفقي يعني أن الميل يساوي صفر. بما أن ميل منحنى (الزخم-الزمن) يمثل القوة المحصلة، فإن القوة المحصلة تساوي صفرًا. وهذا يعني أن الجسم يتحرك بسرعة ثابتة (زخم ثابت).'
  },
  {
    questionText: 'يمثل الرسم البياني علاقة القوة بالزمن لجسم. إذا كان الدفع خلال أول ثانيتين يساوي $I_1$ والدفع خلال الثانيتين التاليتين يساوي $I_2$, فأي علاقة صحيحة؟',
    graph: true,
    options: ['$I_1 > I_2$', '$I_1 < I_2$', '$I_1 = I_2$', 'لا يمكن التحديد'],
    correctAnswerIndex: 1,
    explanation: 'الدفع هو المساحة تحت المنحنى. المساحة تحت المنحنى للفترة الزمنية [0, 2] هي مساحة شبه منحرف أصغر من مساحة شبه المنحرف للفترة [2, 4]. لذلك $I_2 > I_1$.'
  },
];

export default function GraphQuestionsQuizPage() {
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
              {q.graph && <ForceTimeGraph />}
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
