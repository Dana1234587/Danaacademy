
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
    questionText: 'ما هي القيمة الفعالة (RMS) لجهد متردد قيمته العظمى 100 فولت؟',
    options: ['100 فولت', '141 فولت', '70.7 فولت', '50 فولت'],
    correctAnswerIndex: 2,
    explanation: 'القيمة الفعالة للجهد تُحسب من العلاقة $V_{rms} = V_{max} / \\sqrt{2}$. \n $V_{rms} = 100 / \\sqrt{2} \\approx 70.7$ فولت.'
  },
  {
    questionText: 'أجهزة القياس في دارات التيار المتردد (الأميتر والفولتميتر) تقيس عادةً...',
    options: ['القيمة اللحظية', 'القيمة العظمى', 'القيمة المتوسطة', 'القيمة الفعالة (RMS)'],
    correctAnswerIndex: 3,
    explanation: 'تم تصميم أجهزة القياس القياسية للتيار المتردد لتعرض القيمة الفعالة (RMS)، لأنها القيمة التي تعطي نفس القدرة الحرارية التي يعطيها تيار مستمر بنفس القيمة في مقاومة معينة.'
  },
  {
    questionText: 'لماذا تساوي القيمة المتوسطة للجهد المتردد على مدى دورة كاملة صفرًا؟',
    options: ['لأن الجهد ثابت', 'لأن النصف الموجب من الموجة يلغي تمامًا النصف السالب', 'لأن التردد عالٍ جدًا', 'هذه المعلومة خاطئة، القيمة المتوسطة لا تساوي صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'الموجة الجيبية للجهد المتردد متناظرة حول المحور الأفقي. مساحة الجزء الموجب من الموجة تساوي تمامًا مساحة الجزء السالب، لذا فإن متوسط القيمة على مدى دورة كاملة يكون صفرًا.'
  },
  {
    questionText: 'إذا كانت القيمة الفعالة لتيار متردد هي 5 أمبير، فما هي القيمة العظمى لهذا التيار؟',
    options: ['5 أمبير', '3.54 أمبير', '10 أمبير', '7.07 أمبير'],
    correctAnswerIndex: 3,
    explanation: 'من العلاقة $I_{rms} = I_{max} / \\sqrt{2}$, يمكننا حساب القيمة العظمى: $I_{max} = I_{rms} \\times \\sqrt{2} = 5 \\times \\sqrt{2} \\approx 7.07$ أمبير.'
  },
  {
    questionText: 'ما هو التردد الزاوي ($\\omega$) لجهد متردد تردده (f) يساوي 50 هرتز؟',
    options: ['50 راد/ث', '100 راد/ث', '50$\\pi$ راد/ث', '100$\\pi$ راد/ث'],
    correctAnswerIndex: 3,
    explanation: 'العلاقة بين التردد الزاوي ($\\omega$) والتردد العادي (f) هي $\\omega = 2\\pi f$. \n إذن، $\\omega = 2\\pi \\times 50 = 100\\pi$ راديان/ثانية.'
  },
];

export default function AlternatingVoltageQuizPage() {
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
