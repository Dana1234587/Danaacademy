
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
    questionText: 'جسم ساكن كتلته $5 kg$ ينفجر إلى جزأين، الأول كتلته $2 kg$ ويتحرك بسرعة $6 m/s$. ما مقدار التغير في الطاقة الحركية للنظام؟',
    options: ['36 جول', '54 جول', '60 جول', '12 جول'],
    correctAnswerIndex: 2,
    explanation: 'أولاً، نجد سرعة الجزء الثاني (كتلته $5-2=3kg$) من حفظ الزخم: $p_i=0 \\Rightarrow 0 = m_1v_1 + m_2v_2$. \n $0 = (2)(6) + (3)v_2 \\Rightarrow v_2 = -4 m/s$. \nالطاقة الحركية الابتدائية $K_i=0$. \nالطاقة الحركية النهائية $K_f = \\frac{1}{2}m_1v_1^2 + \\frac{1}{2}m_2v_2^2 = \\frac{1}{2}(2)(6^2) + \\frac{1}{2}(3)(-4)^2 = 36 + 24 = 60$ جول. \nالتغير في الطاقة $\\Delta K = K_f - K_i = 60 - 0 = 60$ جول.'
  },
  {
    questionText: 'تتحرك عربة كتلتها $10 kg$ بسرعة $2 m/s$ شرقًا، فتصطدم بعربة أخرى ساكنة كتلتها $10 kg$. إذا تحركت العربة الثانية بعد التصادم بسرعة $2 m/s$ شرقًا، فما سرعة العربة الأولى بعد التصادم؟',
    options: ['$0 m/s$', '$1 m/s$ شرقًا', '$2 m/s$ غربًا', '$4 m/s$ شرقًا'],
    correctAnswerIndex: 0,
    explanation: 'نطبق حفظ الزخم: $m_1v_{1i} + m_2v_{2i} = m_1v_{1f} + m_2v_{2f}$.\n$(10)(2) + (10)(0) = (10)v_{1f} + (10)(2)$.\n$20 = 10v_{1f} + 20 \\Rightarrow 10v_{1f} = 0 \\Rightarrow v_{1f}=0 m/s$. (حدث تبادل كامل للسرعات لأن الكتل متساوية).'
  },
   {
    questionText: 'جسم كتلته $2 kg$ يتحرك بسرعة $3 m/s$ يصطدم بجسم آخر كتلته $4 kg$ يتحرك بالاتجاه المعاكس بسرعة $1.5 m/s$. ما هو مقدار التغير في الزخم الخطي للنظام بأكمله بعد التصادم؟',
    options: ['$0 \\text{ kg} \\cdot \\text{m/s}$', '$6 \\text{ kg} \\cdot \\text{m/s}$', '$12 \\text{ kg} \\cdot \\text{m/s}$', 'لا يمكن تحديده بدون معرفة سرعات ما بعد التصادم'],
    correctAnswerIndex: 0,
    explanation: 'بما أن التصادم يحدث في نظام معزول (لا توجد قوى خارجية مؤثرة)، فإن الزخم الخطي الكلي للنظام يكون محفوظًا. حفظ الزخم يعني أن الزخم الكلي قبل التصادم يساوي الزخم الكلي بعد التصادم. وبالتالي، فإن التغير في الزخم الكلي للنظام يساوي صفرًا دائمًا. $\\Delta p_{system} = p_{final} - p_{initial} = 0$.'
  },
  {
    questionText: 'جسم ساكن كتلته $M$ ينفجر إلى جزأين $m_1$ و $m_2$. ما هي العلاقة بين سرعتيهما $v_1$ و $v_2$؟',
    options: ['$\\frac{v_1}{v_2} = \\frac{m_1}{m_2}$', '$\\frac{v_1}{v_2} = -\\frac{m_2}{m_1}$', '$\\frac{v_1}{v_2} = \\frac{m_2}{m_1}$', '$\\frac{v_1}{v_2} = -\\frac{m_1}{m_2}$'],
    correctAnswerIndex: 1,
    explanation: 'من حفظ الزخم، الزخم الابتدائي صفر. $0 = m_1v_1 + m_2v_2$. \n إذن $m_1v_1 = -m_2v_2$. \n بقسمة الطرفين على $m_1$ وعلى $v_2$ نحصل على: $\\frac{v_1}{v_2} = -\\frac{m_2}{m_1}$. الإشارة السالبة تعني أنهما يتحركان في اتجاهين متعاكسين، والعلاقة تظهر أن الجسم ذا الكتلة الأكبر تكون سرعته أقل.'
  },
];

export default function QuizPage() {
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
