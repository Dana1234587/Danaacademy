
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
    questionText: 'ما هي صيغة الطاقة (U) المخزنة في المجال المغناطيسي لمحث؟',
    options: ['$U = \\frac{1}{2}LI^2$', '$U = \\frac{1}{2}CV^2$', '$U = I^2R$', '$U = LI$'],
    correctAnswerIndex: 0,
    explanation: 'الطاقة المخزنة في المجال المغناطيسي لمحث محاثته L ويمر به تيار I تُعطى بالعلاقة $U = \\frac{1}{2}LI^2$. لاحظ التشابه مع الطاقة الحركية $K=\\frac{1}{2}mv^2$.'
  },
  {
    questionText: 'محث محاثته 2 هنري، يمر به تيار مستقر شدته 3 أمبير. ما مقدار الطاقة المخزنة فيه؟',
    options: ['3 جول', '6 جول', '9 جول', '18 جول'],
    correctAnswerIndex: 2,
    explanation: 'نستخدم القانون $U = \\frac{1}{2}LI^2 = \\frac{1}{2}(2 H)(3 A)^2 = 1 \\times 9 = 9$ جول.'
  },
  {
    questionText: 'في دارة RL، بعد فترة طويلة جدًا من غلق المفتاح، كيف يتصرف المحث؟',
    options: ['كدائرة مفتوحة (مقاومة لا نهائية)', 'كمقاومة قيمتها L', 'كسلك عديم المقاومة', 'كمصدر جهد'],
    correctAnswerIndex: 2,
    explanation: 'بعد فترة طويلة، يستقر التيار في الدارة ويصبح ثابتًا ($\\Delta I / \\Delta t = 0$). عندما يكون معدل تغير التيار صفرًا، تكون القوة الدافعة الحثية الذاتية في المحث صفرًا ($\\varepsilon_L = 0$)، ويتصرف المحث كأنه سلك عادي عديم المقاومة.'
  },
  {
    questionText: 'في دارة RL، ما هو الثابت الزمني ($\\tau$) للدارة؟',
    options: ['$\\tau = R/L$', '$\\tau = L/R$', '$\\tau = LR$', '$\\tau = 1 / (LR)$'],
    correctAnswerIndex: 1,
    explanation: 'الثابت الزمني لدارة RL هو مقياس لمدى سرعة استجابة الدارة للتغيرات، ويُعرّف بأنه $\\tau = L/R$. كلما زادت المحاثة أو قلت المقاومة، زاد الثابت الزمني واستغرق التيار وقتًا أطول للوصول إلى قيمته النهائية.'
  },
  {
    questionText: 'إذا تضاعفت محاثة محث، فإن الطاقة المخزنة فيه لنفس التيار...',
    options: ['تقل إلى النصف', 'تبقى ثابتة', 'تتضاعف', 'تزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'من العلاقة $U = \\frac{1}{2}LI^2$, نرى أن الطاقة (U) تتناسب طرديًا مع المحاثة (L) عند ثبات التيار. لذلك، إذا تضاعفت L، تتضاعف U.'
  },
];

export default function SelfInductanceQuestionsQuizPage() {
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
