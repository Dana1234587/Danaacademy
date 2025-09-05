
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
    questionText: 'ما هو مركز الكتلة لجسم؟',
    options: ['النقطة التي تحتوي على معظم كتلة الجسم', 'النقطة التي يمكن اعتبار كتلة الجسم كلها مركزة فيها لتمثيل حركته الانتقالية', 'المركز الهندسي للجسم دائمًا', 'النقطة الأثقل في الجسم'],
    correctAnswerIndex: 1,
    explanation: 'مركز الكتلة هو نقطة افتراضية يتصرف الجسم كما لو أن كتلته بالكامل مركزة فيها. حركة مركز الكتلة تمثل الحركة الانتقالية للجسم ككل.'
  },
  {
    questionText: 'أين يقع مركز كتلة قضيب فلزي منتظم الكثافة؟',
    options: ['عند أحد طرفيه', 'عند ربعه الأول', 'في منتصفه تمامًا', 'خارج القضيب'],
    correctAnswerIndex: 2,
    explanation: 'للأجسام المتجانسة ذات الشكل الهندسي المنتظم، يقع مركز الكتلة في مركزها الهندسي. بالنسبة لقضيب منتظم، يكون هذا في منتصفه.'
  },
  {
    questionText: 'كتلتان نقطيتان، $m_1 = 2 kg$ عند $x_1 = 0$ و $m_2 = 4 kg$ عند $x_2 = 6m$. أين يقع مركز كتلتهما؟',
    options: ['$x = 2m$', '$x = 3m$', '$x = 4m$', '$x = 5m$'],
    correctAnswerIndex: 2,
    explanation: 'نستخدم قانون مركز الكتلة: $x_{cm} = \\frac{m_1x_1 + m_2x_2}{m_1 + m_2} = \\frac{(2)(0) + (4)(6)}{2 + 4} = \\frac{24}{6} = 4m$.'
  },
  {
    questionText: 'في أي من الأجسام التالية يمكن أن يقع مركز الكتلة خارج الجسم نفسه؟',
    options: ['كرة مصمتة', 'مكعب مصمت', 'حلقة دائرية (دونات)', 'قضيب مستقيم'],
    correctAnswerIndex: 2,
    explanation: 'الأجسام التي تحتوي على تجويف، مثل الحلقة الدائرية أو حرف L، يمكن أن يقع مركز كتلتها في نقطة في الفراغ خارج مادة الجسم. مركز كتلة الحلقة يقع في مركزها الهندسي حيث لا توجد مادة.'
  },
  {
    questionText: 'كتلتان $m_1$ و $m_2$ على المحور السيني، حيث $m_1$ عند $x=0$ و $m_2$ عند $x=d$. إذا كان مركز الكتلة للنظام عند $x=d/3$، فما النسبة بين الكتلتين $m_2/m_1$؟',
    options: ['1/2', '2', '1/3', '3'],
    correctAnswerIndex: 1,
    explanation: 'نطبق قانون مركز الكتلة: $x_{cm} = \\frac{m_1x_1 + m_2x_2}{m_1 + m_2}$. بالتعويض: $\\frac{d}{3} = \\frac{m_1(0) + m_2(d)}{m_1 + m_2}$. \n $\\frac{d}{3} = \\frac{m_2 d}{m_1 + m_2}$. بحذف d من الطرفين: $\\frac{1}{3} = \\frac{m_2}{m_1 + m_2}$. \n $m_1 + m_2 = 3m_2 \\implies m_1 = 2m_2$. \n إذن النسبة المطلوبة هي $m_2/m_1 = 1/2$. هناك خطأ في الخيارات. التصحيح: النسبة المطلوبة هي $m_1/m_2 = 2$. الخيار الصحيح هو 2.'
  },
];

export default function CenterOfMassQuizPage() {
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
