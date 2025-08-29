
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
    questionText: 'أي من الظواهر التالية تدعم الطبيعة الجسيمية للضوء (الفوتونات)؟',
    options: ['الحيود', 'التداخل', 'الاستقطاب', 'الظاهرة الكهروضوئية'],
    correctAnswerIndex: 3,
    explanation: 'الحيود والتداخل والاستقطاب هي ظواهر موجية بحتة. الظاهرة الكهروضوئية، التي تعتمد على تفاعل فوتون واحد مع إلكترون واحد، هي دليل قاطع على الطبيعة الجسيمية للضوء.'
  },
  {
    questionText: 'في ظاهرة كومبتون، ماذا يحدث لطاقة الفوتون المشتت مقارنة بطاقة الفوتون الساقط؟',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'يعطي الفوتون الساقط جزءًا من طاقته وزخمه للإلكترون، مما يؤدي إلى أن الفوتون المشتت يخرج بطاقة أقل وتردد أقل وطول موجي أطول.'
  },
  {
    questionText: 'ما هو أقصر طول موجي ممكن في متسلسلة بالمر لذرة الهيدروجين؟',
    options: ['الانتقال من n=3 إلى n=2', 'الانتقال من n=2 إلى n=1', 'الانتقال من n=∞ إلى n=2', 'الانتقال من n=∞ إلى n=1'],
    correctAnswerIndex: 2,
    explanation: 'أقصر طول موجي يقابل أكبر فرق طاقة. في متسلسلة بالمر، يكون المستوى النهائي هو n=2. أكبر فرق طاقة يحدث عند انتقال الإلكترون من أبعد مستوى ممكن (n=∞) إلى المستوى n=2.'
  },
  {
    questionText: 'إذا كانت الطاقة الحركية العظمى لإلكترون متحرر في الظاهرة الكهروضوئية هي 2 eV، وكان اقتران الشغل للفلز 3 eV، فما طاقة الفوتون الساقط؟',
    options: ['1 eV', '2 eV', '3 eV', '5 eV'],
    correctAnswerIndex: 3,
    explanation: 'وفقًا لمعادلة أينشتاين الكهروضوئية: $E_{photon} = W_0 + K_{max}$. \n $E_{photon} = 3 eV + 2 eV = 5 eV$.'
  },
  {
    questionText: 'إذا كان محيط المدار الثالث في نموذج بور لذرة الهيدروجين يساوي $3 \\times 10^{-9} m$, فما هو طول موجة دي بروي المصاحب للإلكترون في هذا المدار؟',
    options: ['$1 \\times 10^{-9} m$', '$3 \\times 10^{-9} m$', '$9 \\times 10^{-9} m$', 'لا يمكن تحديده'],
    correctAnswerIndex: 0,
    explanation: 'شرط استقرار المدار هو $2\\pi r_n = n\\lambda$. بما أن n=3، فإن $3 \\times 10^{-9} = 3\\lambda$. إذن، $\\lambda = 1 \\times 10^{-9} m$.'
  },
];

export default function ChapterQuestionsQuizPage() {
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
