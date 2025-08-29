
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
    questionText: 'ما هي الصيغة الرياضية لقانون أوم؟',
    options: ['$V = I/R$', '$V = IR$', '$I = VR$', '$R = VI$'],
    correctAnswerIndex: 1,
    explanation: 'قانون أوم ينص على أن فرق الجهد (V) عبر طرفي موصل يتناسب طرديًا مع شدة التيار (I) المار فيه عند ثبوت درجة الحرارة. ثابت التناسب هو المقاومة (R)، والصيغة هي $V = IR$.'
  },
  {
    questionText: 'مقاوم كهربائي قيمته 20 أوم، يمر به تيار شدته 0.5 أمبير. ما فرق الجهد بين طرفيه؟',
    options: ['10 فولت', '40 فولت', '20.5 فولت', '100 فولت'],
    correctAnswerIndex: 0,
    explanation: 'بتطبيق قانون أوم: $V = IR = (0.5 A) \\times (20 \\Omega) = 10 V$.'
  },
  {
    questionText: 'ما الذي يميز الموصلات الأومية؟',
    options: ['تتغير مقاومتها بتغير التيار', 'تبقى مقاومتها ثابتة بغض النظر عن فرق الجهد أو التيار', 'تزداد مقاومتها مع انخفاض درجة الحرارة', 'لا توصل الكهرباء إلا في اتجاه واحد'],
    correctAnswerIndex: 1,
    explanation: 'الموصل الأومي هو الذي يتبع قانون أوم، أي أن مقاومته تبقى ثابتة عند تغير فرق الجهد المطبق عليه أو التيار المار فيه (بشرط ثبات درجة الحرارة).'
  },
  {
    questionText: 'وحدة الأوم ($\\Omega$) تكافئ أيًا من الوحدات التالية؟',
    options: ['أمبير / فولت', 'فولت / أمبير', 'كولوم / فولت', 'جول / أمبير'],
    correctAnswerIndex: 1,
    explanation: 'من قانون أوم $R = V/I$. لذلك، وحدة المقاومة (أوم) تكافئ وحدة فرق الجهد (فولت) مقسومة على وحدة التيار (أمبير).'
  },
  {
    questionText: 'إذا تضاعف فرق الجهد عبر طرفي مقاومة أومية، فإن التيار المار فيها...',
    options: ['يقل إلى النصف', 'يبقى ثابتًا', 'يتضاعف', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'في المقاومة الأومية، المقاومة R ثابتة. من قانون أوم $I = V/R$, يتناسب التيار (I) طرديًا مع فرق الجهد (V). فإذا تضاعف الجهد، يتضاعف التيار.'
  },
];

export default function ElectricalResistanceQuizPage() {
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
