
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
    questionText: 'من خلال الرسم البياني (V-I) لموصل أومي، ماذا يمثل ميل الخط المستقيم؟',
    options: ['المقاومة (R)', 'مقلوب المقاومة (1/R)', 'القدرة (P)', 'المقاومية ($\\rho$)'],
    correctAnswerIndex: 0,
    explanation: 'الميل = $\\Delta V / \\Delta I$. وفقًا لقانون أوم، $V=IR$, فإن $R = V/I$. لذلك، ميل منحنى (V-I) يمثل المقاومة R.'
  },
  {
    questionText: 'مصباح كهربائي مكتوب عليه "60W, 120V". ما مقدار مقاومة المصباح أثناء تشغيله؟',
    options: ['0.5 $\\Omega$', '2 $\\Omega$', '120 $\\Omega$', '240 $\\Omega$'],
    correctAnswerIndex: 3,
    explanation: 'نستخدم صيغة القدرة $P = V^2 / R$. نعيد ترتيبها لإيجاد المقاومة: $R = V^2 / P = (120)^2 / 60 = 14400 / 60 = 240 \\Omega$.'
  },
  {
    questionText: 'سلك مقاومته R. إذا تم توصيله بفرق جهد V، فمر به تيار I. إذا تم توصيل نفس السلك بفرق جهد 2V، فإن مقاومته تصبح:',
    options: ['R/2', 'R', '2R', '4R'],
    correctAnswerIndex: 1,
    explanation: 'مقاومة السلك هي خاصية ثابتة (بافتراض ثبات درجة الحرارة)، ولا تعتمد على فرق الجهد المطبق أو التيار المار فيه. لذلك، تبقى المقاومة R.'
  },
  {
    questionText: 'في دارة كهربائية، إذا قلت المقاومة الكلية إلى النصف مع بقاء فرق الجهد ثابتًا، فإن التيار الكلي...',
    options: ['يقل إلى النصف', 'يبقى ثابتًا', 'يتضاعف', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقانون أوم، $I = V/R$. التيار يتناسب عكسيًا مع المقاومة. إذا قلت المقاومة إلى النصف، فإن التيار يتضاعف.'
  },
  {
    questionText: 'ما الشرط الأساسي الذي يجب توافره لتطبيق قانون أوم على موصل؟',
    options: ['أن يكون فرق الجهد عاليًا', 'أن يكون التيار منخفضًا', 'ثبات درجة حرارة الموصل', 'أن يكون الموصل طويلاً'],
    correctAnswerIndex: 2,
    explanation: 'قانون أوم ينطبق على الموصلات الفلزية بشرط أساسي وهو ثبات درجة حرارتها، لأن المقاومة تتغير مع تغير درجة الحرارة.'
  },
];

export default function OhmsLawQuizPage() {
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

    