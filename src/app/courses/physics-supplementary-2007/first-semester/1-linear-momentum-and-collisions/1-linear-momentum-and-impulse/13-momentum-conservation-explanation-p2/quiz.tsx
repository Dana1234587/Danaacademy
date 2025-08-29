
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
    questionText: 'مدفع ساكن كتلته $1000 kg$ يطلق قذيفة كتلتها $10 kg$ بسرعة أفقية $200 m/s$. ما هي سرعة ارتداد المدفع؟',
    options: ['$1 m/s$', '$2 m/s$', '$10 m/s$', '$20 m/s$'],
    correctAnswerIndex: 1,
    explanation: 'باستخدام حفظ الزخم، الزخم الابتدائي = 0. \n$p_i = p_f \\Rightarrow 0 = m_c v_c + m_p v_p$. \n$0 = (1000) v_c + (10)(200)$. \n$1000 v_c = -2000 \\Rightarrow v_c = -2 m/s$. الإشارة السالبة تعني الارتداد في الاتجاه المعاكس، والمقدار هو 2 m/s.'
  },
  {
    questionText: 'عربة كتلتها $m$ تتحرك بسرعة $v$ على سطح أفقي أملس. إذا سقطت عليها قطعة من المعجون كتلتها $m$ رأسيًا والتصقت بها، فما هي سرعة العربة الجديدة؟',
    options: ['$v$', '$2v$', '$v/2$', '$v/4$'],
    correctAnswerIndex: 2,
    explanation: 'حفظ الزخم ينطبق على المكون الأفقي للحركة فقط. الزخم الأفقي الابتدائي = $mv$. الزخم الأفقي النهائي = $(m+m)v_f = 2mv_f$. \n $mv = 2mv_f \\Rightarrow v_f = v/2$.'
  },
  {
    questionText: 'في أي من الحالات التالية يكون الزخم الخطي للنظام محفوظًا ولكن الطاقة الميكانيكية الكلية غير محفوظة؟',
    options: ['كرة ترتد ارتدادًا مرنًا عن جدار', 'قمر صناعي يدور حول الأرض في مدار دائري', 'سيارتان تتصادمان وتلتحمان معًا', 'بندول بسيط يتأرجح دون احتكاك'],
    correctAnswerIndex: 2,
    explanation: 'التصادم الذي تلتحم فيه الأجسام هو تصادم عديم المرونة. في هذا النوع من التصادمات، يكون الزخم الخطي محفوظًا، ولكن جزءًا كبيرًا من الطاقة الميكانيكية (الحركية) يتحول إلى حرارة وصوت، لذا فهي غير محفوظة.'
  },
  {
    questionText: 'يقف صياد كتلته $80 kg$ في قارب ساكن كتلته $120 kg$. إذا أطلق الصياد سهمًا كتلته $0.5 kg$ بسرعة أفقية $40 m/s$, فما مقدار سرعة القارب بعد إطلاق السهم مباشرة؟',
    options: ['$0.1 m/s$', '$0.2 m/s$', '$0.4 m/s$', '$1 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'الزخم الابتدائي للنظام (الصياد + القارب + السهم) = 0. \n الزخم النهائي = $(m_{hunter}+m_{boat})v_{boat} + m_{arrow}v_{arrow} = 0$. \n $(80+120)v_{boat} + (0.5)(40) = 0$. \n $200v_{boat} = -20 \\Rightarrow v_{boat} = -0.1 m/s$. المقدار هو 0.1 m/s.'
  },
  {
    questionText: 'ما الفرق الأساسي بين الانفجار والتصادم عديم المرونة؟',
    options: ['الانفجار لا يحفظ الزخم', 'التصادم عديم المرونة لا يحفظ الزخم', 'في الانفجار تزداد الطاقة الحركية، وفي التصادم عديم المرونة تقل', 'في الانفجار تقل الطاقة الحركية، وفي التصادم عديم المرونة تزداد'],
    correctAnswerIndex: 2,
    explanation: 'في كليهما، الزخم الخطي محفوظ (إذا كان النظام معزولًا). لكن في الانفجار، الطاقة الكيميائية الكامنة تتحول إلى طاقة حركية، لذا تزداد الطاقة الحركية للنظام. أما في التصادم عديم المرونة، فإن جزءًا من الطاقة الحركية يتحول إلى أشكال أخرى، لذا تقل الطاقة الحركية للنظام.'
  },
];

export default function MomentumConservationP2QuizPage() {
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
