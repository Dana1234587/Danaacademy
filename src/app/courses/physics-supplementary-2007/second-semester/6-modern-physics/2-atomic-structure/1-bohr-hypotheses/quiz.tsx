
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
    questionText: 'وفقًا لنموذج بور، لماذا لا يشع الإلكترون طاقة أثناء دورانه حول النواة في مدار مستقر؟',
    options: ['لأن سرعته ثابتة', 'لأن زخمه الزاوي مكمّى ويوجد في مدار مسموح به', 'لأن القوة الكهربائية تلغي القوة المغناطيسية', 'لأنه لا يمتلك طاقة'],
    correctAnswerIndex: 1,
    explanation: 'افترض بور أن الإلكترون لا يشع طاقة طالما أنه في أحد المدارات المستقرة المسموح بها، والتي يتم تحديدها بشرط تكمية الزخم الزاوي.'
  },
  {
    questionText: 'ما هي طاقة المستوى الثاني (n=2) في ذرة الهيدروجين؟',
    options: ['-13.6 eV', '-3.4 eV', '-1.51 eV', '-6.8 eV'],
    correctAnswerIndex: 1,
    explanation: 'باستخدام قانون طاقة المستوى $E_n = -13.6 / n^2$ eV. للمستوى الثاني n=2: \n $E_2 = -13.6 / 2^2 = -13.6 / 4 = -3.4$ إلكترون فولت.'
  },
  {
    questionText: 'كيف يتناسب نصف قطر مدار بور (r) مع عدد الكم الرئيسي (n)؟',
    options: ['$r \\propto n$', '$r \\propto 1/n$', '$r \\propto n^2$', '$r \\propto 1/n^2$'],
    correctAnswerIndex: 2,
    explanation: 'نصف قطر مدار بور يتناسب طرديًا مع مربع عدد الكم الرئيسي، وفقًا للعلاقة $r_n = n^2 r_1$.'
  },
  {
    questionText: 'ماذا يحدث للإلكترون في ذرة الهيدروجين عندما يمتص فوتونًا؟',
    options: ['ينتقل إلى مستوى طاقة أدنى', 'يبقى في نفس المستوى', 'يتحرر من الذرة دائمًا', 'ينتقل إلى مستوى طاقة أعلى إذا كانت طاقة الفوتون تساوي فرق الطاقة بين المستويين'],
    correctAnswerIndex: 3,
    explanation: 'لكي يمتص الإلكترون فوتونًا وينتقل لمستوى أعلى، يجب أن تكون طاقة الفوتون مساوية تمامًا للفرق في الطاقة بين المستوى الابتدائي والمستوى النهائي.'
  },
  {
    questionText: 'ما هي طاقة التأين لذرة الهيدروجين (الطاقة اللازمة لتحرير الإلكترون من المستوى الأرضي)؟',
    options: ['3.4 eV', '10.2 eV', '0 eV', '13.6 eV'],
    correctAnswerIndex: 3,
    explanation: 'طاقة التأين هي الطاقة اللازمة لنقل الإلكترون من مستواه الأرضي (n=1، طاقته -13.6 eV) إلى ما لا نهاية (n=∞، طاقته 0 eV). فرق الطاقة هو $0 - (-13.6) = 13.6$ إلكترون فولت.'
  },
];

export default function BohrHypothesesQuizPage() {
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
