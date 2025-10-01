
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
    questionText: 'في نظام معزول يتكون من جسمين متصادمين، أي كمية فيزيائية تبقى محفوظة دائمًا؟',
    options: ['الطاقة الحركية الكلية', 'الزخم الخطي الكلي', 'سرعة كل جسم', 'طاقة كل جسم الحركية'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الخطي الكلي لنظام معزول (لا تؤثر عليه قوى خارجية محصلة) يبقى محفوظًا دائمًا، بغض النظر عن نوع التصادم (مرن أو غير مرن).'
  },
  {
    questionText: 'عربة كتلتها $4 kg$ تتحرك بسرعة $5 m/s$ شرقًا، فتصطدم بعربة أخرى ساكنة كتلتها $6 kg$ وتلتحمان معًا. ما سرعتهما المشتركة بعد التصادم؟',
    options: ['$2 m/s$ شرقًا', '$3 m/s$ شرقًا', '$4 m/s$ شرقًا', '$5 m/s$ شرقًا'],
    correctAnswerIndex: 0,
    explanation: 'هذا تصادم عديم المرونة. نطبق حفظ الزخم: $\\Sigma p_i = \\Sigma p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = (m_1+m_2)v_f$. \n $(4)(+5) + (6)(0) = (4+6)v_f$. \n $20 = 10v_f \\Rightarrow v_f = 2 m/s$ شرقًا.'
  },
  {
    questionText: 'مدفع ساكن كتلته $1000 kg$ يطلق قذيفة كتلتها $5 kg$ بسرعة أفقية $400 m/s$. ما هي سرعة ارتداد المدفع؟',
    options: ['$1 m/s$', '$2 m/s$', '$4 m/s$', '$5 m/s$'],
    correctAnswerIndex: 1,
    explanation: 'باستخدام حفظ الزخم، الزخم الابتدائي للنظام = 0. \n $p_i = p_f \\Rightarrow 0 = m_{cannon} v_{cannon} + m_{shell} v_{shell}$. \n $0 = (1000) v_{cannon} + (5)(400)$. \n $1000 v_{cannon} = -2000 \\Rightarrow v_{cannon} = -2 m/s$. المقدار هو 2 m/s.'
  },
  {
    questionText: 'كرة كتلتها $2 kg$ تتحرك بسرعة $6 m/s$ تصطدم بكرة أخرى ساكنة كتلتها $4 kg$. إذا ارتدت الكرة الأولى بسرعة $2 m/s$ في الاتجاه المعاكس، فما سرعة الكرة الثانية بعد التصادم؟',
    options: ['$4 m/s$', '$6 m/s$', '$8 m/s$', '$2 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق حفظ الزخم، مع اعتبار الاتجاه الابتدائي موجبًا: $\\Sigma p_i = \\Sigma p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$. \n $(2)(+6) + (4)(0) = (2)(-2) + (4)v_{2f}$. \n $12 = -4 + 4v_{2f}$. \n $16 = 4v_{2f} \\Rightarrow v_{2f} = 4 m/s$.'
  },
  {
    questionText: 'اصطدمت سيارة كتلتها $1500 kg$ تسير بسرعة $20 m/s$ بسيارة أخرى كتلتها $2500 kg$ تسير بنفس الاتجاه بسرعة $10 m/s$. إذا التحمتا معًا، فما سرعتهما النهائية؟',
    options: ['$13.75 m/s$', '$15 m/s$', '$16.25 m/s$', '$17.5 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق حفظ الزخم: $\\Sigma p_i = \\Sigma p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = (m_1+m_2)v_f$. \n $(1500)(20) + (2500)(10) = (1500+2500)v_f$. \n $30000 + 25000 = 4000v_f$. \n $55000 = 4000v_f \\Rightarrow v_f = 55000 / 4000 = 13.75 m/s$.'
  },
];

export default function MomentumConservationQuestionsQuizPage() {
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
