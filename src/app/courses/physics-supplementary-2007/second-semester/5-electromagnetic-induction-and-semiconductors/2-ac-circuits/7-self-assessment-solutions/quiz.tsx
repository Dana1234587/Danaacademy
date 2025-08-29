
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
    questionText: 'في دارة تيار متردد، إذا كانت القيمة العظمى للجهد 200 فولت، فما القيمة الفعالة للجهد؟',
    options: ['200 فولت', '141.4 فولت', '100 فولت', '282.8 فولت'],
    correctAnswerIndex: 1,
    explanation: 'القيمة الفعالة للجهد $V_{rms} = V_{max} / \\sqrt{2} = 200 / \\sqrt{2} \\approx 141.4$ فولت.'
  },
  {
    questionText: 'ما هي وحدة قياس المفاعلة الحثية؟',
    options: ['هنري', 'فاراد', 'أوم', 'واط'],
    correctAnswerIndex: 2,
    explanation: 'المفاعلة الحثية ($X_L$) تمثل ممانعة المحث للتيار المتردد، وتقاس بوحدة الأوم ($\\Omega$).'
  },
  {
    questionText: 'في دارة RLC، إذا كانت $X_L > X_C$, فإن الجهد الكلي...',
    options: ['يسبق التيار', 'يتأخر عن التيار', 'يكون في نفس طور التيار', 'يساوي صفر'],
    correctAnswerIndex: 0,
    explanation: 'عندما تكون $X_L > X_C$، تكون للدارة خصائص حثية، وفي الدارات الحثية يسبق الجهد التيار.'
  },
  {
    questionText: 'ما هو تردد الرنين لدارة LC إذا كانت L=2H و C=8μF؟',
    options: ['12.5 Hz', '25 Hz', '39.8 Hz', '50 Hz'],
    correctAnswerIndex: 2,
    explanation: 'تردد الرنين $f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{2 \\times 8 \\times 10^{-6}}} = \\frac{1}{2\\pi\\sqrt{16 \\times 10^{-6}}} = \\frac{1}{2\\pi \\times 4 \\times 10^{-3}} = \\frac{1000}{8\\pi} \\approx 39.8$ هرتز.'
  },
  {
    questionText: 'في دارة رنين، تكون القدرة المتوسطة المستهلكة...',
    options: ['صفراً', 'أكبر ما يمكن', 'أصغر ما يمكن', 'سالبة'],
    correctAnswerIndex: 1,
    explanation: 'عند الرنين، يكون التيار في الدارة أكبر ما يمكن ($I_{max} = V/R$). وبما أن القدرة المتوسطة $P_{avg} = I_{rms}^2 R$, فإن القدرة المستهلكة تكون أكبر ما يمكن أيضًا.'
  },
];

export default function SelfAssessmentSolutionsQuizPage() {
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
