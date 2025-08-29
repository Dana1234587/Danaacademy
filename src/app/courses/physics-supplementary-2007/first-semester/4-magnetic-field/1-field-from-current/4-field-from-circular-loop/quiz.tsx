
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
    questionText: 'ما هي صيغة المجال المغناطيسي (B) في مركز ملف دائري عدد لفاته N ونصف قطره r ويمر به تيار (I)؟',
    options: ['$B = \\frac{\\mu_0 N I}{2\\pi r}$', '$B = \\frac{\\mu_0 N I}{2 r}$', '$B = \\frac{\\mu_0 I}{2\\pi r}$', '$B = \\frac{\\mu_0 I}{2r}$'],
    correctAnswerIndex: 1,
    explanation: 'المجال المغناطيسي في مركز ملف دائري يُعطى بالعلاقة $B = \\frac{\\mu_0 N I}{2 r}$. لاحظ عدم وجود $\\pi$ في المقام، وهذا هو الفرق الرئيسي عن قانون السلك المستقيم.'
  },
  {
    questionText: 'ملف دائري عدد لفاته 50 لفة ونصف قطره 10 سم، يمر به تيار 2 أمبير. ما مقدار المجال المغناطيسي في مركزه؟',
    options: ['$2\\pi \\times 10^{-4} T$', '$2\\pi \\times 10^{-5} T$', '$\\pi \\times 10^{-4} T$', '$\\pi \\times 10^{-5} T$'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم القانون $B = \\frac{\\mu_0 N I}{2 r}$. \n $B = \\frac{(4\\pi \\times 10^{-7}) \\times 50 \\times 2}{2 \\times 0.10} = \\frac{400\\pi \\times 10^{-7}}{0.20} = 2000\\pi \\times 10^{-7} = 2\\pi \\times 10^{-4} T$.'
  },
  {
    questionText: 'باستخدام قاعدة اليد اليمنى، إذا كانت أصابعك الملتفة تشير إلى اتجاه التيار في حلقة دائرية، فإلى ماذا يشير إبهامك؟',
    options: ['اتجاه القوة المغناطيسية', 'اتجاه المجال المغناطيسي في مركز الحلقة', 'اتجاه التيار', 'لا شيء مما سبق'],
    correctAnswerIndex: 1,
    explanation: 'هذه هي قاعدة اليد اليمنى الثانية لتحديد اتجاه المجال المغناطيسي في مركز ملف دائري أو لولبي. التفاف الأصابع مع التيار، والإبهام يشير إلى اتجاه المجال المغناطيسي داخل الملف.'
  },
  {
    questionText: 'لزيادة المجال المغناطيسي في مركز حلقة دائرية، يمكننا...',
    options: ['زيادة نصف قطر الحلقة', 'تقليل عدد اللفات', 'تقليل شدة التيار', 'زيادة شدة التيار'],
    correctAnswerIndex: 3,
    explanation: 'من القانون $B = \\frac{\\mu_0 N I}{2 r}$, نرى أن المجال (B) يتناسب طرديًا مع عدد اللفات (N) وشدة التيار (I)، وعكسيًا مع نصف القطر (r). لزيادة B، يمكننا زيادة N أو I، أو تقليل r. الخيار الوحيد الصحيح من بين الخيارات هو زيادة شدة التيار.'
  },
  {
    questionText: 'ما الفرق الرئيسي بين قانون المجال المغناطيسي لسلك مستقيم وقانون المجال لحلقة دائرية؟',
    options: ['وجود N في قانون الحلقة', 'وجود $\\pi$ في مقام قانون السلك', 'كلاهما صحيح', 'لا يوجد فرق'],
    correctAnswerIndex: 2,
    explanation: 'كلا الفرقين صحيحان ومهمان. قانون الحلقة يحتوي على عدد اللفات N، بينما قانون السلك لا يحتوي عليه. قانون السلك يحتوي على $\\pi$ في المقام، بينما قانون الحلقة لا يحتوي عليه.'
  },
];

export default function FieldFromCircularLoopQuizPage() {
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
