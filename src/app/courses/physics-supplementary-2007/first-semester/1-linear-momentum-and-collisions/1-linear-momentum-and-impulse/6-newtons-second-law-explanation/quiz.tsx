
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
    questionText: 'ما هي الصيغة العامة لقانون نيوتن الثاني بدلالة الزخم الخطي؟',
    options: ['$\\Sigma F = ma$', '$\\Sigma F = \\frac{\\Delta p}{\\Delta t}$', '$\\Sigma F = \\frac{\\Delta E}{\\Delta t}$', '$\\Sigma F = I \\alpha$'],
    correctAnswerIndex: 1,
    explanation: 'الصيغة العامة والأشمل لقانون نيوتن الثاني هي أن محصلة القوى الخارجية المؤثرة على جسم تساوي المعدل الزمني للتغير في زخمه الخطي.'
  },
  {
    questionText: 'متى يمكن اختصار الصيغة العامة $\\Sigma F = \\frac{\\Delta p}{\\Delta t}$ إلى الصيغة الشهيرة $\\Sigma F = ma$؟',
    options: ['فقط عندما تكون السرعة ثابتة', 'فقط عندما تكون الكتلة ثابتة', 'دائمًا يمكن استخدامها', 'فقط في الحركة الدائرية'],
    correctAnswerIndex: 1,
    explanation: 'عندما تكون كتلة الجسم ثابتة، يمكن كتابة $\\Delta p = \\Delta(mv) = m\\Delta v$. بالتعويض في الصيغة العامة، نحصل على $\\Sigma F = m\\frac{\\Delta v}{\\Delta t} = ma$.'
  },
  {
    questionText: 'صاروخ ينطلق إلى الفضاء ويحرق الوقود. لماذا لا يمكن استخدام الصيغة $\\Sigma F = ma$ لوصف حركته بشكل دقيق؟',
    options: ['لأن سرعة الصاروخ متغيرة', 'لأن الصاروخ في الفضاء حيث لا يوجد جاذبية', 'لأن كتلة الصاروخ تتناقص مع الزمن', 'لأن هناك قوة دفع كبيرة جدًا'],
    correctAnswerIndex: 2,
    explanation: 'الصيغة $\\Sigma F = ma$ تفترض أن الكتلة ثابتة. في حالة الصاروخ، كتلته تتغير (تتناقص) باستمرار لأنه يقذف الوقود المحترق. لذلك، يجب استخدام الصيغة العامة $\\Sigma F = \\frac{\\Delta p}{\\Delta t}$ التي تأخذ في الاعتبار تغير الكتلة.'
  },
  {
    questionText: 'إذا كانت القوة المحصلة المؤثرة على جسم تساوي صفرًا، فهذا يعني أن...',
    options: ['الجسم يجب أن يكون ساكنًا', 'سرعة الجسم ثابتة', 'زخم الجسم الخطي ثابت', 'تسارع الجسم ثابت ولا يساوي صفر'],
    correctAnswerIndex: 2,
    explanation: 'إذا كانت $\\Sigma F = 0$, فإن $\\frac{\\Delta p}{\\Delta t} = 0$. هذا يعني أن التغير في الزخم يساوي صفر ($\Delta p = 0$)، وبالتالي فإن الزخم الخطي للجسم يبقى ثابتًا. هذا هو مبدأ حفظ الزخم الخطي.'
  },
  {
    questionText: 'يعمل حزام الأمان في السيارة على زيادة الفترة الزمنية للتصادم. الهدف الرئيسي من ذلك هو:',
    options: ['زيادة التغير الكلي في زخم الراكب', 'تقليل التغير الكلي في زخم الراكب', 'تقليل القوة المتوسطة المؤثرة على الراكب', 'زيادة القوة المتوسطة المؤثرة على الراكب'],
    correctAnswerIndex: 2,
    explanation: 'التغير في الزخم (من سرعة معينة إلى صفر) يبقى ثابتًا للراكب. لكن بزيادة زمن التصادم ($\\Delta t$)، فإن القوة المؤثرة ($F = \\frac{\\Delta p}{\\Delta t}$) تقل بشكل كبير، وهذا هو الهدف من حزام الأمان والوسائد الهوائية لتقليل الإصابات.'
  },
];

export default function NewtonsSecondLawQuizPage() {
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
