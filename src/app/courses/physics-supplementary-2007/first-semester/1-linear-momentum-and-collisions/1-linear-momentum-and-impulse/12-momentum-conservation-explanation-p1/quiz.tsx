
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
    questionText: 'ما هو الشرط الأساسي لتطبيق قانون حفظ الزخم الخطي؟',
    options: ['أن يكون التصادم مرنًا', 'أن تكون الكتلة ثابتة', 'أن يكون النظام معزولًا (محصلة القوى الخارجية صفر)', 'أن تكون السرعة ثابتة'],
    correctAnswerIndex: 2,
    explanation: 'قانون حفظ الزخم الخطي ينطبق فقط على الأنظمة المعزولة، أي الأنظمة التي تكون فيها محصلة القوى الخارجية المؤثرة عليها تساوي صفرًا.'
  },
  {
    questionText: 'عندما يطلق مدفع قذيفة، فإن القوة التي يؤثر بها المدفع على القذيفة تكون...',
    options: ['أكبر من القوة التي تؤثر بها القذيفة على المدفع', 'أصغر من القوة التي تؤثر بها القذيفة على المدفع', 'مساوية في المقدار ومعاكسة في الاتجاه للقوة التي تؤثر بها القذيفة على المدفع', 'في نفس اتجاه القوة التي تؤثر بها القذيفة على المدفع'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقانون نيوتن الثالث (الفعل ورد الفعل)، القوتان المتبادلتان بين المدفع والقذيفة تكونان متساويتين في المقدار ومتعاكستين في الاتجاه.'
  },
  {
    questionText: 'من أي قانون أساسي يمكن اشتقاق مبدأ حفظ الزخم الخطي؟',
    options: ['قانون نيوتن الأول', 'قانون نيوتن الثاني والثالث', 'قانون حفظ الطاقة', 'قانون الجذب العام'],
    correctAnswerIndex: 1,
    explanation: 'يمكن اشتقاق حفظ الزخم من قانون نيوتن الثاني ($\\Sigma F = \\frac{\\Delta p}{\\Delta t}$)، فعندما تكون $\\Sigma F_{ext} = 0$ فإن $\\Delta p = 0$. كما يمكن اشتقاقه من قانون نيوتن الثالث (الفعل ورد الفعل) عند تصادم جسمين في نظام معزول.'
  },
  {
    questionText: 'جسم كتلته $M$ ساكن، انفجر إلى جزأين، كتلة الأول $m_1$ وسرعته $v_1$. ما هي سرعة الجزء الثاني $v_2$ الذي كتلته $m_2$؟',
    options: ['$v_2 = \\frac{m_1}{m_2} v_1$', '$v_2 = -\\frac{m_2}{m_1} v_1$', '$v_2 = -\\frac{m_1}{m_2} v_1$', '$v_2 = \\frac{m_2}{m_1} v_1$'],
    correctAnswerIndex: 2,
    explanation: 'الزخم الابتدائي للنظام = 0. الزخم النهائي = $m_1 v_1 + m_2 v_2$. \n من حفظ الزخم: $0 = m_1 v_1 + m_2 v_2$. \n إذن، $m_2 v_2 = -m_1 v_1$, وبالتالي $v_2 = -\\frac{m_1}{m_2} v_1$. الإشارة السالبة تدل على أن الجسم الثاني يتحرك في الاتجاه المعاكس للأول.'
  },
  {
    questionText: 'إذا كان التغير في زخم جسم يساوي $\\Delta p$, فإن الدفع المؤثر عليه يساوي...',
    options: ['$\\Delta p$', '$-\\Delta p$', '$2\\Delta p$', '$\\Delta p / 2$'],
    correctAnswerIndex: 0,
    explanation: 'مبرهنة (الدفع - الزخم الخطي) تنص على أن الدفع المؤثر على جسم يساوي تمامًا التغير في زخمه الخطي. $I = \\Delta p$.'
  },
];

export default function MomentumConservationP1QuizPage() {
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
