
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
    questionText: 'في أي نوع من التصادمات يكون الزخم الخطي محفوظًا بينما الطاقة الحركية غير محفوظة؟',
    options: ['التصادم المرن', 'التصادم غير المرن', 'جميع أنواع التصادمات', 'لا يوجد نوع كهذا'],
    correctAnswerIndex: 1,
    explanation: 'التصادمات غير المرنة (بما في ذلك عديمة المرونة) هي التي يتم فيها حفظ الزخم الخطي الكلي للنظام، ولكن جزءًا من الطاقة الحركية يُفقد على شكل حرارة أو صوت أو تشوه.'
  },
  {
    questionText: 'ما هي السمة المميزة للتصادم عديم المرونة تمامًا؟',
    options: ['ترتد الأجسام عن بعضها البعض بطاقة كاملة', 'تتبادل الأجسام سرعاتها', 'يلتحم الجسمان ويتحركان معًا كجسم واحد', 'تختفي الطاقة الحركية تمامًا'],
    correctAnswerIndex: 2,
    explanation: 'التعريف الأساسي للتصادم عديم المرونة هو أن الأجسام المتصادمة تلتصق ببعضها البعض وتتحرك بسرعة نهائية مشتركة.'
  },
  {
    questionText: 'في التصادم المرن تمامًا بين جسمين في نظام معزول، أي الكميات التالية تكون محفوظة؟',
    options: ['الزخم الخطي فقط', 'الطاقة الحركية فقط', 'الزخم الخطي والطاقة الحركية معًا', 'لا الزخم ولا الطاقة الحركية'],
    correctAnswerIndex: 2,
    explanation: 'التصادم المرن هو تصادم مثالي يتم فيه حفظ كل من الزخم الخطي الكلي والطاقة الحركية الكلية للنظام.'
  },
  {
    questionText: 'سيارة كتلتها $1000 kg$ تتحرك بسرعة $10 m/s$ تصطدم بشاحنة ساكنة كتلتها $3000 kg$ وتلتحمان معًا. ما سرعتهما المشتركة بعد التصادم؟',
    options: ['$2.5 m/s$', '$3.3 m/s$', '$5 m/s$', '$7.5 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق قانون حفظ الزخم: $p_i = p_f$. $m_1 v_1 + m_2 v_2 = (m_1+m_2)v_f$. $(1000)(10) + (3000)(0) = (1000+3000)v_f$. $10000 = 4000 v_f \\Rightarrow v_f = 10000 / 4000 = 2.5 m/s$.'
  },
  {
    questionText: 'أي العبارات التالية تصف بشكل صحيح الطاقة الحركية المفقودة؟',
    options: ['تكون أكبر ما يمكن في التصادم المرن', 'تكون صفرًا في التصادم غير المرن', 'تكون أكبر ما يمكن في التصادم عديم المرونة', 'تكون دائمًا موجبة'],
    correctAnswerIndex: 2,
    explanation: 'التصادم عديم المرونة يشهد أكبر قدر من فقدان الطاقة الحركية (على شكل حرارة، صوت، تشوه دائم)، بينما في التصادم المرن لا يوجد فقدان للطاقة الحركية.'
  },
];

export default function CollisionsP1QuizPage() {
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
