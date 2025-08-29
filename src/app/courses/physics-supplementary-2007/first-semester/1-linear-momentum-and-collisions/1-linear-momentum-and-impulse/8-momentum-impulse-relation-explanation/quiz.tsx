
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
    questionText: 'ما هي مبرهنة (الزخم الخطي - الدفع)؟',
    options: ['الدفع يساوي الزخم الخطي الابتدائي', 'القوة تساوي التغير في الدفع', 'الدفع يساوي التغير في الزخم الخطي', 'الدفع يساوي طاقة الحركة'],
    correctAnswerIndex: 2,
    explanation: 'مبرهنة (الزخم-الدفع) تنص على أن الدفع المؤثر على جسم يساوي تمامًا التغير في الزخم الخطي لذلك الجسم. ($I = \\Delta p$).'
  },
  {
    questionText: 'لاعب بيسبول يضرب كرة كتلتها $0.15 kg$. إذا كانت سرعة الكرة قبل الضرب $40 m/s$ وبعد الضرب $50 m/s$ في الاتجاه المعاكس، فما مقدار الدفع الذي أثر به المضرب على الكرة؟',
    options: ['$1.5 Ns$', '$13.5 Ns$', '$9.0 Ns$', '$15 Ns$'],
    correctAnswerIndex: 1,
    explanation: 'لنعتبر الاتجاه الابتدائي موجبًا. $v_i = 40 m/s$, $v_f = -50 m/s$. الدفع $I = \\Delta p = m(v_f - v_i) = 0.15(-50 - 40) = 0.15(-90) = -13.5 Ns$. المقدار هو 13.5 Ns.'
  },
  {
    questionText: 'إذا أثرت قوة مقدارها $50 N$ على جسم لمدة $0.2 s$, فما مقدار التغير في زخم الجسم؟',
    options: ['$10 kg \\cdot m/s$', '$250 kg \\cdot m/s$', '$50.2 kg \\cdot m/s$', '$5 kg \\cdot m/s$'],
    correctAnswerIndex: 0,
    explanation: 'من مبرهنة (الزخم-الدفع)، التغير في الزخم يساوي الدفع. والدفع يساوي القوة ضرب الزمن. $\\Delta p = I = F \\Delta t = 50 N \\times 0.2 s = 10 Ns = 10 kg \\cdot m/s$.'
  },
  {
    questionText: 'لماذا يقوم لاعب الملاكمة بسحب رأسه إلى الخلف عند تلقي لكمة؟',
    options: ['لزيادة قوة اللكمة', 'لزيادة التغير في زخم رأسه', 'لزيادة زمن التلامس وتقليل القوة المؤثرة', 'لتقليل زمن التلامس وزيادة القوة المؤثرة'],
    correctAnswerIndex: 2,
    explanation: 'سحب الرأس إلى الخلف يزيد من الزمن الذي تستغرقه اللكمة لتأثيرها ($\\Delta t$). بما أن التغير في الزخم ($\\Delta p$) ثابت، فإن زيادة الزمن تؤدي إلى تقليل القوة المؤثرة ($F = \\frac{\\Delta p}{\\Delta t}$)، مما يقلل من أثر اللكمة.'
  },
  {
    questionText: 'وحدة الدفع (Impulse) هي $N \\cdot s$. أي من الوحدات التالية تكافئها؟',
    options: ['$kg \\cdot m/s^2$', '$J/m$', '$kg \\cdot m/s$', '$W \\cdot s$'],
    correctAnswerIndex: 2,
    explanation: 'بما أن الدفع يساوي التغير في الزخم الخطي ($I = \\Delta p$)، فإن وحدتيهما متكافئتان. وحدة الزخم هي وحدة الكتلة (kg) ضرب وحدة السرعة (m/s)، أي $kg \\cdot m/s$.'
  },
];

export default function MomentumImpulseRelationQuizPage() {
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
