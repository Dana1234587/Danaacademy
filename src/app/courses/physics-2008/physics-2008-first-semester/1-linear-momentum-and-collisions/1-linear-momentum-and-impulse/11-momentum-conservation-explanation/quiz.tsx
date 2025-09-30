
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
    questionText: 'في نظام معزول يتكون من جسمين A و B، إذا كان التغير في الزخم الخطي للجسم A يساوي $-12 \\text{ kg} \\cdot \\text{m/s}$، فما التغير في الزخم الخطي للجسم B؟',
    options: ['$-12 \\text{ kg} \\cdot \\text{m/s}$', '$+12 \\text{ kg} \\cdot \\text{m/s}$', '$0$', 'لا يمكن تحديده'],
    correctAnswerIndex: 1,
    explanation: 'في نظام معزول، الزخم الكلي محفوظ. هذا يعني أن التغير في زخم الجسم الأول يساوي في المقدار ويعاكس في الاتجاه التغير في زخم الجسم الثاني ($\\Delta p_A = -\\Delta p_B$). لذلك، $\\Delta p_B = -(-12) = +12 \\text{ kg} \\cdot \\text{m/s}$.'
  },
  {
    questionText: 'جسمان A و B يصطدمان في نظام معزول. إذا كان مجموع زخميهما قبل التصادم مباشرة يساوي $50 \\text{ kg} \\cdot \\text{m/s}$ باتجاه محور السينات الموجب، فما مجموع زخميهما بعد التصادم مباشرة؟',
    options: ['$-50 \\text{ kg} \\cdot \\text{m/s}$', '$0$', '$50 \\text{ kg} \\cdot \\text{m/s}$', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لمبدأ حفظ الزخم الخطي في نظام معزول، فإن الزخم الكلي للنظام قبل التصادم يساوي الزخم الكلي للنظام بعد التصادم. بما أن الزخم الابتدائي هو 50، فيجب أن يكون الزخم النهائي 50 أيضًا.'
  },
  {
    questionText: 'جسم كتلته $2 kg$ يتحرك بسرعة $3 m/s$ يصطدم بجسم آخر كتلته $4 kg$ يتحرك بالاتجاه المعاكس بسرعة $1.5 m/s$. ما هو مقدار التغير في الزخم الخطي للنظام بأكمله بعد التصادم؟',
    options: ['$0 \\text{ kg} \\cdot \\text{m/s}$', '$6 \\text{ kg} \\cdot \\text{m/s}$', '$12 \\text{ kg} \\cdot \\text{m/s}$', 'لا يمكن تحديده بدون معرفة سرعات ما بعد التصادم'],
    correctAnswerIndex: 0,
    explanation: 'بما أن التصادم يحدث في نظام معزول (لا توجد قوى خارجية مؤثرة)، فإن الزخم الخطي الكلي للنظام يكون محفوظًا. حفظ الزخم يعني أن الزخم الكلي قبل التصادم يساوي الزخم الكلي بعد التصادم. وبالتالي، فإن التغير في الزخم الكلي للنظام يساوي صفرًا دائمًا. $\\Delta p_{system} = p_{final} - p_{initial} = 0$.'
  },
  {
    questionText: 'إذا كان التغير في زخم جسم يساوي $\\Delta p$, فإن الدفع المؤثر عليه يساوي...',
    options: ['$\\Delta p$', '$-\\Delta p$', '$2\\Delta p$', '$\\Delta p / 2$'],
    correctAnswerIndex: 0,
    explanation: 'مبرهنة (الدفع - الزخم الخطي) تنص على أن الدفع المؤثر على جسم يساوي تمامًا التغير في زخمه الخطي. $I = \\Delta p$.'
  },
];

export default function MomentumConservationExplanationQuizPage() {
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
