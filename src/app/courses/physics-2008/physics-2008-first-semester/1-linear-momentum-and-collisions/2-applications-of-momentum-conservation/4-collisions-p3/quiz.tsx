
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
    questionText: 'في أي نوع من أنواع التصادمات يكون الزخم الخطي محفوظًا بينما الطاقة الحركية غير محفوظة؟',
    options: ['المرن فقط', 'غير المرن وعديم المرونة', 'عديم المرونة فقط', 'لا يوجد'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الخطي محفوظ في جميع أنواع التصادمات في نظام معزول. الطاقة الحركية تكون غير محفوظة (تتحول جزئيًا إلى أشكال أخرى) في كل من التصادم غير المرن وعديم المرونة.'
  },
  {
    questionText: 'كرة كتلتها $2 kg$ تتحرك بسرعة $3 m/s$ تصطدم بكرة أخرى ساكنة كتلتها $1 kg$. إذا كان التصادم مرنًا، ما هي سرعة الكرة الثانية بعد التصادم؟',
    options: ['$2 m/s$', '$3 m/s$', '$4 m/s$', '$5 m/s$'],
    correctAnswerIndex: 2,
    explanation: 'باستخدام قانوني حفظ الزخم والطاقة للتصادم المرن، يمكن استخدام الصيغة المختصرة لسرعة الجسم الثاني: $v_{2f} = \\frac{2m_1}{m_1+m_2}v_{1i} = \\frac{2(2)}{2+1}(3) = \\frac{4}{3}(3) = 4 m/s$.'
  },
  {
    questionText: 'في التصادم عديم المرونة، ماذا يحدث للأجسام المتصادمة؟',
    options: ['ترتد عن بعضها بنفس السرعة', 'تتبادل سرعاتها', 'تلتحم وتتحرك كجسم واحد', 'تتوقف تمامًا'],
    correctAnswerIndex: 2,
    explanation: 'الخاصية المميزة للتصادم عديم المرونة هي أن الأجسام تلتحم معًا بعد التصادم وتتحرك بسرعة نهائية مشتركة.'
  },
  {
    questionText: 'سيارة كتلتها 1000 kg تتحرك بسرعة 20 m/s تصطدم بسيارة أخرى ساكنة وتلتحمان. إذا كانت سرعتهما المشتركة 8 m/s، فما كتلة السيارة الثانية؟',
    options: ['$1000 kg$', '$1250 kg$', '$1500 kg$', '$2000 kg$'],
    correctAnswerIndex: 2,
    explanation: 'نطبق حفظ الزخم للتصادم عديم المرونة: $m_1 v_1 = (m_1+m_2)v_f$. \n $(1000)(20) = (1000+m_2)(8)$. \n $20000 = 8000 + 8m_2$. \n $12000 = 8m_2 \\implies m_2 = 1500 kg$.'
  },
  {
    questionText: 'أي من العبارات التالية تصف الفقد في الطاقة الحركية بشكل صحيح؟',
    options: ['يحدث فقط في التصادمات المرنة', 'يكون أكبر ما يمكن في التصادمات المرنة', 'يحدث في التصادمات غير المرنة وعديمة المرونة', 'لا يحدث أبدًا إذا كان الزخم محفوظًا'],
    correctAnswerIndex: 2,
    explanation: 'الفقد في الطاقة الحركية هو السمة المميزة للتصادمات غير المرنة وعديمة المرونة، حيث يتحول جزء من الطاقة الحركية إلى حرارة وصوت وتشوه. في التصادم المرن، لا يوجد فقد في الطاقة الحركية.'
  },
];

export default function CollisionsP3QuizPage() {
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

    