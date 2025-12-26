
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
    questionText: 'صفيحتان متوازيتان تفصل بينهما مسافة 2 سم، وفرق الجهد بينهما 100 فولت. ما مقدار المجال الكهربائي المنتظم بينهما؟',
    options: ['$5000 V/m$', '$200 V/m$', '$50 V/m$', '$2 V/m$'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم القانون $E = |\\Delta V| / d$. يجب تحويل المسافة إلى متر: $d = 2 cm = 0.02 m$. \n $E = 100 V / 0.02 m = 5000 V/m$.'
  },
  {
    questionText: 'في مجال كهربائي منتظم بين صفيحتين، الجهد الكهربائي...',
    options: ['ثابت عند جميع النقاط.', 'يزداد كلما تحركنا مع اتجاه المجال.', 'يقل كلما تحركنا مع اتجاه المجال.', 'يساوي صفرًا عند الصفيحة السالبة دائمًا.'],
    correctAnswerIndex: 2,
    explanation: 'خطوط المجال الكهربائي تتجه دائمًا من الجهد الأعلى إلى الجهد الأدنى. لذلك، كلما تحركنا بنفس اتجاه خطوط المجال، يقل الجهد الكهربائي.'
  },
  {
    questionText: 'إذا تضاعف فرق الجهد بين صفيحتين متوازيتين مع بقاء المسافة بينهما ثابتة، فإن المجال الكهربائي بينهما...',
    options: ['يقل إلى النصف', 'يبقى ثابتًا', 'يتضاعف', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'من العلاقة $E = \\Delta V / d$, يتناسب المجال الكهربائي (E) طرديًا مع فرق الجهد ($\\Delta V$). فإذا تضاعف فرق الجهد، يتضاعف المجال.'
  },
  {
    questionText: 'فرق الجهد بين الصفيحتين $V_{ab}$ يُحسب من العلاقة:',
    options: ['جهد الصفيحة السالبة - جهد الصفيحة الموجبة', 'جهد الصفيحة الموجبة - جهد الصفيحة السالبة', 'متوسط الجهدين', 'دائمًا صفر'],
    correctAnswerIndex: 1,
    explanation: 'فرق الجهد هو مقدار موجب يمثل الفرق بين الجهد الأعلى (عند الصفيحة الموجبة) والجهد الأدنى (عند الصفيحة السالبة).'
  },
  {
    questionText: 'مجال كهربائي منتظم شدته 400 N/C بين صفيحتين. ما فرق الجهد بين نقطتين المسافة بينهما 5 سم على خط المجال؟',
    options: ['20 فولت', '80 فولت', '2000 فولت', '8 فولت'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم العلاقة $\\Delta V = E \\times d$. \n $\\Delta V = (400 N/C) \\times (0.05 m) = 20$ فولت.'
  },
];

export default function QuizPage() {
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

