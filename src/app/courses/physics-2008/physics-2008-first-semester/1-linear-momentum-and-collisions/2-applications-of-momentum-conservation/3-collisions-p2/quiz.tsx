
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
    questionText: 'سيارة كتلتها $800 kg$ تتحرك بسرعة $15 m/s$ شرقًا، تصطدم بسيارة أخرى كتلتها $1200 kg$ ساكنة وتلتحمان معًا. ما سرعتهما المشتركة بعد التصادم؟',
    options: ['$6 m/s$ شرقًا', '$9 m/s$ شرقًا', '$15 m/s$ شرقًا', '$7.5 m/s$ شرقًا'],
    correctAnswerIndex: 0,
    explanation: 'هذا تصادم عديم المرونة، لذا نطبق حفظ الزخم: $\\Sigma p_i = \\Sigma p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = (m_1+m_2)v_f$. \n $(800)(+15) + (1200)(0) = (800+1200)v_f$. \n $12000 = 2000v_f \\Rightarrow v_f = 6 m/s$ شرقًا.'
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
    questionText: 'جسم كتلته $m_1$ يتحرك بسرعة $v_1$ يصطدم بجسم آخر ساكن كتلته $m_2$ فيصطدمان تصادمًا غير مرن (لا يلتحمان). إذا كانت سرعة الجسم الأول بعد التصادم هي $v_{1f}$، فما هي سرعة الجسم الثاني $v_{2f}$ بدلالة الرموز؟',
    options: ['$v_{2f} = \\frac{m_1(v_1 - v_{1f})}{m_2}$', '$v_{2f} = \\frac{m_1 v_1}{m_2}$', '$v_{2f} = \\frac{(m_1+m_2)v_1}{m_2}$', '$v_{2f} = v_1 - v_{1f}$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق قانون حفظ الزخم الخطي، وهو صالح لجميع أنواع التصادمات. \n الزخم الابتدائي: $\\Sigma p_i = m_1 v_1 + m_2(0) = m_1 v_1$. \n الزخم النهائي: $\\Sigma p_f = m_1 v_{1f} + m_2 v_{2f}$. \n بمساواة الزخم الابتدائي بالنهائي: $m_1 v_1 = m_1 v_{1f} + m_2 v_{2f}$. \n نعيد ترتيب المعادلة لإيجاد $v_{2f}$: $m_2 v_{2f} = m_1 v_1 - m_1 v_{1f} \\Rightarrow v_{2f} = \\frac{m_1(v_1 - v_{1f})}{m_2}$.'
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
          <Card key={qIndex} className={'border-2 ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg'}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={'السؤال ${qIndex + 1}: ${q.questionText}'} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={'q${qIndex}-o${oIndex}'} className={'p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent ${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}'}>
                    <RadioGroupItem value={oIndex.toString()} id={'q${qIndex}-o${oIndex}'} disabled={isSubmitted} />
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
