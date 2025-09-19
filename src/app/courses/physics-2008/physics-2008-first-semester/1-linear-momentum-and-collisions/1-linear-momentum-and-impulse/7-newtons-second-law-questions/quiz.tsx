
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
    questionText: 'سيارة كتلتها $1000 kg$ تتحرك بسرعة $20 m/s$. ضغط السائق على المكابح لمدة $5 s$ فتوقفت السيارة. ما مقدار القوة المتوسطة التي أثرت بها المكابح؟',
    options: ['$2000 N$', '$4000 N$', '$10000 N$', '$50000 N$'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نحسب التغير في الزخم: $\\Delta p = p_f - p_i = m(v_f - v_i) = 1000(0 - 20) = -20000 kg \\cdot m/s$. \nثانياً، نستخدم قانون نيوتن الثاني: $F_{avg} = \\frac{\\Delta p}{\\Delta t} = \\frac{-20000}{5} = -4000 N$. المقدار هو 4000 نيوتن.'
  },
  {
    questionText: 'جسم كتلته $m$ يتغير زخمه من $p$ إلى $3p$ خلال زمن $t$. ما هي القوة المحصلة المؤثرة عليه؟',
    options: ['$p/t$', '$2p/t$', '$3p/t$', '$4p/t$'],
    correctAnswerIndex: 1,
    explanation: 'القوة المحصلة هي المعدل الزمني للتغير في الزخم. \n $\\Sigma F = \\frac{\\Delta p}{\\Delta t} = \\frac{p_f - p_i}{t} = \\frac{3p - p}{t} = \\frac{2p}{t}$.'
  },
  {
    questionText: 'كرة كتلتها $0.5 kg$ اصطدمت بجدار بسرعة $10 m/s$ وارتدت بسرعة $8 m/s$. ما مقدار "التغير في زخمها"؟',
    options: ['$1 kg \\cdot m/s$', '$9 kg \\cdot m/s$', '$18 kg \\cdot m/s$', '$4.5 kg \\cdot m/s$'],
    correctAnswerIndex: 1,
    explanation: 'لنعتبر الاتجاه الابتدائي موجبًا. $v_i = 10 m/s$, $v_f = -8 m/s$. التغير في الزخم $\\Delta p = m(v_f - v_i) = 0.5(-8 - 10) = 0.5(-18) = -9 kg \\cdot m/s$. المقدار هو 9.'
  },
  {
    questionText: 'بناءً على السؤال السابق، إذا كان زمن التصادم $0.02 s$, فما مقدار القوة المتوسطة المؤثرة على الكرة؟',
    options: ['$50 N$', '$450 N$', '$90 N$', '$180 N$'],
    correctAnswerIndex: 1,
    explanation: 'القوة المتوسطة = $\\frac{\\Delta p}{\\Delta t} = \\frac{9 kg \\cdot m/s}{0.02 s} = 450 N$.'
  },
  {
    questionText: 'في الوسادة الهوائية للسيارة، تعمل الوسادة على زيادة زمن التصادم. هذا يؤدي إلى...',
    options: ['زيادة التغير في زخم الراكب وتقليل القوة', 'تقليل التغير في زخم الراكب وتقليل القوة', 'إبقاء التغير في الزخم ثابتًا مع تقليل القوة', 'إبقاء التغير في الزخم ثابتًا مع زيادة القوة'],
    correctAnswerIndex: 2,
    explanation: 'التغير في الزخم (من سرعة معينة إلى صفر) يبقى ثابتًا للراكب. لكن بزيادة زمن التصادم ($\\Delta t$)، فإن القوة المؤثرة ($\\frac{\\Delta p}{\\Delta t}$) تقل بشكل كبير، مما يحمي الراكب.'
  },
];

export default function NewtonsSecondLawQuestionsQuizPage() {
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
