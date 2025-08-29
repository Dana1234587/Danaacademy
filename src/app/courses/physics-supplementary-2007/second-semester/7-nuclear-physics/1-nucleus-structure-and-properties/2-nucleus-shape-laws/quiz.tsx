
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
    questionText: 'كيف يتناسب نصف قطر النواة (r) مع العدد الكتلي (A)؟',
    options: ['$r \\propto A^2$', '$r \\propto A$', '$r \\propto \\sqrt{A}$', '$r \\propto A^{1/3}$'],
    correctAnswerIndex: 3,
    explanation: 'نصف قطر النواة (r) يتناسب طرديًا مع الجذر التكعيبي للعدد الكتلي (A). العلاقة هي $r = r_0 A^{1/3}$ حيث $r_0$ ثابت.'
  },
  {
    questionText: 'إذا كان نصف قطر نواة الأكسجين-$16$ ($^{16}_{8}O$) يساوي $3 \\times 10^{-15} m$، فما هو نصف قطر نواة الرصاص-$208$ ($^{208}_{82}Pb$) تقريبًا؟',
    options: ['$3.7 \\times 10^{-15} m$', '$6.9 \\times 10^{-15} m$', '$13 \\times 10^{-15} m$', '$39 \\times 10^{-15} m$'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم نسبة: $\\frac{r_{Pb}}{r_O} = \\frac{r_0 (A_{Pb})^{1/3}}{r_0 (A_O)^{1/3}} = (\\frac{208}{16})^{1/3} = (13)^{1/3} \\approx 2.35$. إذن، $r_{Pb} = 2.35 \\times r_O = 2.35 \\times 3 \\times 10^{-15} \\approx 7.05 \\times 10^{-15} m$. الخيار الأقرب هو $6.9 \\times 10^{-15} m$.'
  },
  {
    questionText: 'لماذا تعتبر كثافة النواة ثابتة تقريبًا لجميع العناصر؟',
    options: ['لأن حجم النواة يتناسب طرديًا مع عددها الذري.', 'لأن كتلة النواة تتناسب طرديًا مع حجمها.', 'لأن جميع النيوكليونات لها نفس الحجم.', 'لأن القوة النووية القوية تضغط النيوكليونات بنفس الشكل.'],
    correctAnswerIndex: 1,
    explanation: 'كثافة النواة ($\\rho$) تساوي الكتلة/الحجم. كتلة النواة تتناسب طرديًا مع العدد الكتلي A، وحجم النواة أيضًا يتناسب طرديًا مع العدد الكتلي A. نتيجة لذلك، عند قسمة الكتلة على الحجم، يتم إلغاء الاعتماد على A، وتبقى الكثافة ثابتة تقريبًا.'
  },
  {
    questionText: 'إذا تضاعف العدد الكتلي لنواة ما، فكم مرة يتضاعف حجمها؟',
    options: ['مرتين', 'أربع مرات', 'ثماني مرات', '1.26 مرة'],
    correctAnswerIndex: 0,
    explanation: 'حجم النواة $V = \\frac{4}{3}\\pi r^3$. وبما أن $r = r_0 A^{1/3}$، فإن $V = \\frac{4}{3}\\pi (r_0 A^{1/3})^3 = (\\frac{4}{3}\\pi r_0^3) A$. هذا يعني أن الحجم (V) يتناسب طرديًا مع العدد الكتلي (A). فإذا تضاعف A، يتضاعف V.'
  },
  {
    questionText: 'وحدة قياس نصف القطر النووي $r_0$ هي:',
    options: ['متر (m)', 'فيرمي (fm)', 'أنجستروم (Å)', 'ليس له وحدة'],
    correctAnswerIndex: 1,
    explanation: 'نصف القطر النووي $r_0$ هو ثابت قيمته تساوي تقريبًا $1.2 \\times 10^{-15} m$. هذه الوحدة تُعرف باسم فيرمي (fm) أو فمتومتر.'
  },
];

export default function NucleusShapeLawsQuizPage() {
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
                    <SmartTextRenderer as="p" text={q.explanation} className="text-muted-foreground" />
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
