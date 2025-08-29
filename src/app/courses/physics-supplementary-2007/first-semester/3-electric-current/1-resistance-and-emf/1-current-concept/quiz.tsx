
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
    questionText: 'ما هو تعريف التيار الكهربائي؟',
    options: ['كمية الشحنة في الموصل', 'معدل تدفق الشحنة الكهربائية عبر مقطع عرضي من الموصل', 'الطاقة التي تحملها الإلكترونات', 'سرعة حركة الإلكترونات'],
    correctAnswerIndex: 1,
    explanation: 'يُعرّف التيار الكهربائي بأنه المعدل الزمني لتدفق الشحنة الكهربائية عبر مقطع عرضي في الموصل، ويُعطى بالعلاقة $I = \\Delta q / \\Delta t$.'
  },
  {
    questionText: 'ما هو اتجاه التيار الاصطلاحي؟',
    options: ['نفس اتجاه حركة الإلكترونات', 'عكس اتجاه حركة الإلكترونات (مع حركة الشحنات الموجبة الافتراضية)', 'عمودي على اتجاه حركة الإلكترونات', 'لا يوجد اتجاه محدد'],
    correctAnswerIndex: 1,
    explanation: 'تاريخيًا، تم الاتفاق على أن اتجاه التيار الاصطلاحي هو اتجاه حركة الشحنات الموجبة، وهو عكس اتجاه حركة الإلكترونات الفعلية (الشحنات السالبة).'
  },
  {
    questionText: 'إذا مر تيار شدته 2 أمبير في سلك لمدة 30 ثانية، فما كمية الشحنة التي عبرت مقطع السلك؟',
    options: ['15 كولوم', '60 كولوم', '2 كولوم', '0.067 كولوم'],
    correctAnswerIndex: 1,
    explanation: 'من قانون التيار $I = \\Delta q / \\Delta t$, يمكننا حساب الشحنة: $\\Delta q = I \\times \\Delta t = 2 A \\times 30 s = 60 C$.'
  },
  {
    questionText: 'وحدة الأمبير (A) تكافئ أيًا من الوحدات التالية؟',
    options: ['جول / ثانية', 'كولوم / ثانية', 'فولت / متر', 'نيوتن / كولوم'],
    correctAnswerIndex: 1,
    explanation: 'بما أن التيار هو الشحنة مقسومة على الزمن، فإن وحدة الأمبير تكافئ وحدة الكولوم مقسومة على وحدة الثانية (C/s).'
  },
  {
    questionText: 'في الفلزات، حاملات الشحنة المسؤولة عن التيار الكهربائي هي:',
    options: ['البروتونات', 'الأيونات الموجبة', 'الإلكترونات الحرة', 'الأيونات السالبة'],
    correctAnswerIndex: 2,
    explanation: 'تتميز الفلزات بوجود "بحر" من الإلكترونات الحرة التي لا ترتبط بذرة معينة، وحركتها الموجهة هي التي تشكل التيار الكهربائي.'
  },
];

export default function CurrentConceptQuizPage() {
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
