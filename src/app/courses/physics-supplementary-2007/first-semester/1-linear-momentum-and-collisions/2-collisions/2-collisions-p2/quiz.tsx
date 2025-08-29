
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
    questionText: 'في تصادم مرن بين كرتين متماثلتين في الكتلة، إذا كانت إحداهما متحركة والأخرى ساكنة، فماذا يحدث بعد التصادم؟',
    options: ['تتوقف الكرة الأولى وتتحرك الثانية بنفس سرعة الأولى', 'يلتحمان معًا', 'ترتد الكرة الأولى للخلف', 'تتحركان معًا في نفس الاتجاه'],
    correctAnswerIndex: 0,
    explanation: 'هذه حالة خاصة ومشهورة في التصادمات المرنة. عندما تصطدم كتلة بكتلة أخرى مماثلة لها وساكنة، فإنهما "تتبادلان السرعات". الكرة المتحركة تتوقف، والساكنة تتحرك بنفس سرعة واتجاه الكرة الأولى.'
  },
  {
    questionText: 'كرة كتلتها $2 kg$ تتحرك بسرعة $4 m/s$ تصطدم بكرة أخرى ساكنة كتلتها $2 kg$ تصادمًا عديم المرونة. ما مقدار الطاقة الحركية المفقودة في التصادم؟',
    options: ['$0 J$', '$4 J$', '$8 J$', '$16 J$'],
    correctAnswerIndex: 2,
    explanation: 'أولاً، نجد السرعة النهائية المشتركة $v_f$ من حفظ الزخم: $m_1 v_1 = (m_1+m_2)v_f \\Rightarrow (2)(4)=(4)v_f \\Rightarrow v_f=2 m/s$. الطاقة الابتدائية $K_i = \\frac{1}{2}m_1 v_1^2 = \\frac{1}{2}(2)(4^2) = 16 J$. الطاقة النهائية $K_f = \\frac{1}{2}(m_1+m_2)v_f^2 = \\frac{1}{2}(4)(2^2) = 8 J$. الطاقة المفقودة = $K_i - K_f = 16 - 8 = 8 J$.'
  },
  {
    questionText: 'إذا ارتدت كرة عن جدار في تصادم مرن تمامًا، فإن التغير في زخمها الخطي يكون...',
    options: ['صفرًا', 'ضعف زخمها الابتدائي', 'نصف زخمها الابتدائي', 'يساوي زخمها الابتدائي'],
    correctAnswerIndex: 1,
    explanation: 'في التصادم المرن مع جدار ثابت، ترتد الكرة بنفس مقدار السرعة ولكن في الاتجاه المعاكس. $\\Delta p = p_f - p_i = m(-v) - m(v) = -2mv = -2p_i$. المقدار هو ضعف الزخم الابتدائي.'
  },
  {
    questionText: 'تصادم جسمان تصادمًا غير مرن. أي العبارات التالية صحيحة دائمًا؟',
    options: ['الطاقة الحركية الكلية محفوظة', 'الزخم الخطي الكلي محفوظ', 'سرعة كل جسم تبقى ثابتة', 'يلتحم الجسمان معًا'],
    correctAnswerIndex: 1,
    explanation: 'الخاصية المشتركة لجميع أنواع التصادمات في نظام معزول هي أن الزخم الخطي الكلي يبقى محفوظًا. الطاقة الحركية لا تكون محفوظة في التصادم غير المرن، والالتحام يحدث فقط في التصادم عديم المرونة.'
  },
  {
    questionText: 'ما هي النسبة المئوية للطاقة الحركية المفقودة في تصادم عديم المرونة بين جسمين متساويين في الكتلة، أحدهما متحرك والآخر ساكن؟',
    options: ['0%', '25%', '50%', '100%'],
    correctAnswerIndex: 2,
    explanation: 'كما في السؤال الثاني، $K_i = 16 J$ و $K_f = 8 J$. نسبة الطاقة المفقودة = $\\frac{K_i - K_f}{K_i} = \\frac{16-8}{16} = \\frac{8}{16} = 0.5$. النسبة المئوية هي 50%.'
  },
];

export default function CollisionsP2QuizPage() {
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
