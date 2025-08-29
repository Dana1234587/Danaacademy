
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
    questionText: 'أثرت قوة أفقية مقدارها $200 N$ على عربة ساكنة كتلتها $40 kg$ لمدة $5 s$. ما مقدار سرعة العربة النهائية؟',
    options: ['$5 m/s$', '$10 m/s$', '$25 m/s$', '$100 m/s$'],
    correctAnswerIndex: 2,
    explanation: 'نحسب الدفع أولاً: $I = F \\Delta t = 200 N \\times 5 s = 1000 Ns$. \n الدفع يساوي التغير في الزخم: $I = \\Delta p = m(v_f - v_i)$. \n بما أن العربة كانت ساكنة، $v_i = 0$. \n $1000 = 40(v_f - 0) \\Rightarrow v_f = 1000 / 40 = 25 m/s$.'
  },
  {
    questionText: 'ركل لاعب كرة قدم كرة كتلتها $0.5 kg$ فغير سرعتها من $10 m/s$ إلى $30 m/s$ بنفس الاتجاه. إذا كان زمن التلامس $0.05 s$, فما مقدار القوة المتوسطة التي أثر بها على الكرة؟',
    options: ['$100 N$', '$200 N$', '$400 N$', '$800 N$'],
    correctAnswerIndex: 1,
    explanation: 'نحسب التغير في الزخم: $\\Delta p = m(v_f - v_i) = 0.5(30 - 10) = 0.5(20) = 10 kg \\cdot m/s$. \n القوة المتوسطة $F = \\frac{\\Delta p}{\\Delta t} = \\frac{10}{0.05} = 200 N$.'
  },
  {
    questionText: 'سقط جسم من ارتفاع معين. إذا كان زخمه لحظة اصطدامه بالأرض هو $p$, وارتد بزخم مقداره $0.8p$, فما مقدار الدفع الذي أثرت به الأرض على الجسم؟',
    options: ['$0.2p$', '$p$', '$1.8p$', '$0.8p$'],
    correctAnswerIndex: 2,
    explanation: 'لنعتبر اتجاه السقوط (للأسفل) هو السالب. إذن $p_i = -p$. وارتد الجسم للأعلى، إذن $p_f = +0.8p$. \n الدفع $I = \\Delta p = p_f - p_i = (0.8p) - (-p) = 1.8p$.'
  },
  {
    questionText: 'جسم كتلته $2 kg$ يتحرك بسرعة $5 m/s$. ما مقدار الدفع اللازم لإيقافه تمامًا؟',
    options: ['$2.5 Ns$', '$5 Ns$', '$7 Ns$', '$10 Ns$'],
    correctAnswerIndex: 3,
    explanation: 'لإيقاف الجسم، يجب أن يكون زخمه النهائي صفرًا ($p_f = 0$). \n الدفع اللازم $I = \\Delta p = p_f - p_i = 0 - (m v_i) = -(2 kg \\times 5 m/s) = -10 Ns$. \n المقدار هو 10 Ns.'
  },
  {
    questionText: 'تؤثر قوتان على جسم كما في الشكل. إذا كان الجسم ساكنًا في البداية، فما زخمه بعد $4$ ثوان؟',
    diagram: 'Two forces, 10N right and 4N left, acting on a body.',
    options: ['$6 Ns$', '$14 Ns$', '$24 Ns$', '$56 Ns$'],
    correctAnswerIndex: 2,
    explanation: 'القوة المحصلة $\\Sigma F = 10 N - 4 N = 6 N$ (باتجاه اليمين). \n الدفع $I = \\Sigma F \\times \\Delta t = 6 N \\times 4 s = 24 Ns$. \n بما أن الجسم بدأ من السكون، فإن زخمه النهائي يساوي الدفع. $p_f = I = 24 kg \\cdot m/s$.'
  },
];

export default function MomentumImpulseQuestionsQuizPage() {
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
              {q.diagram && <p className="text-sm text-muted-foreground italic mt-2 text-center bg-slate-100 p-2 rounded-md">{q.diagram}</p>}
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
