
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
    questionText: 'ما هي الصيغة الرياضية لقانون فارادي في الحث الكهرومغناطيسي؟',
    options: ['$\\varepsilon = -N \\frac{\\Delta t}{\\Delta \\Phi_B}$', '$\\varepsilon = -N B A$', '$\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t}$', '$\\varepsilon = \\frac{\\Delta \\Phi_B}{N \\Delta t}$'],
    correctAnswerIndex: 2,
    explanation: 'قانون فارادي ينص على أن مقدار القوة الدافعة الكهربائية الحثية ($\\varepsilon$) المتولدة في ملف يتناسب طرديًا مع عدد لفات الملف (N) والمعدل الزمني للتغير في التدفق المغناطيسي ($\\Delta\\Phi_B / \\Delta t$). الإشارة السالبة تشير إلى قانون لنز.'
  },
  {
    questionText: 'ملف عدد لفاته 100 لفة، يتغير التدفق المغناطيسي عبره بمقدار 4 وبر خلال 2 ثانية. ما مقدار القوة الدافعة الحثية المتولدة؟',
    options: ['50 فولت', '100 فولت', '200 فولت', '800 فولت'],
    correctAnswerIndex: 2,
    explanation: 'نطبق قانون فارادي: $\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t}$. \n المقدار هو $|\\varepsilon| = 100 \\times \\frac{4 Wb}{2 s} = 100 \\times 2 = 200$ فولت.'
  },
  {
    questionText: 'ماذا تعني الإشارة السالبة في قانون فارادي؟',
    options: ['أن القوة الدافعة تقل دائمًا.', 'أن التيار الحثي يكون سالبًا دائمًا.', 'أن القوة الدافعة الحثية تعاكس التغير في التدفق الذي سببها (قانون لنز).', 'أن المجال المغناطيسي يتناقص.'],
    correctAnswerIndex: 2,
    explanation: 'الإشارة السالبة هي تمثيل رياضي لقانون لنز، والذي ينص على أن اتجاه التيار الحثي (وبالتالي قطبية القوة الدافعة الحثية) يكون دائمًا بحيث يقاوم أو يعاكس التغير في التدفق المغناطيسي الذي أدى إلى توليده.'
  },
  {
    questionText: 'لزيادة القوة الدافعة الحثية المتولدة في مولد كهربائي، أي من الإجراءات التالية هو الأكثر فعالية؟',
    options: ['تقليل سرعة الدوران.', 'تقليل عدد لفات الملف.', 'استخدام مغناطيس أضعف.', 'زيادة سرعة الدوران وزيادة عدد اللفات.'],
    correctAnswerIndex: 3,
    explanation: 'القوة الدافعة الحثية تتناسب طرديًا مع عدد اللفات (N) ومع المعدل الزمني لتغير التدفق. زيادة سرعة الدوران تزيد من معدل تغير التدفق. لذلك، زيادة كل من N وسرعة الدوران تزيد بشكل كبير من القوة الدافعة المتولدة.'
  },
  {
    questionText: 'إذا كان المعدل الزمني للتغير في التدفق المغناطيسي عبر حلقة معدنية ثابتًا، فإن التيار الحثي المار في الحلقة يكون...',
    options: ['ثابتًا', 'متزايدًا', 'متناقصًا', 'صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'إذا كان المعدل الزمني لتغير التدفق ($\\Delta\\Phi_B / \\Delta t$) ثابتًا، فإن القوة الدافعة الحثية ($\\varepsilon$) تكون ثابتة وفقًا لقانون فارادي. وبما أن التيار الحثي $I = \\varepsilon / R$, ومقاومة الحلقة ثابتة، فإن التيار الحثي سيكون ثابتًا أيضًا.'
  },
];

export default function FaradayLawQuizPage() {
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
