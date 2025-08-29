
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
    questionText: 'سلكان مستقيمان متوازيان يمر فيهما تياران كهربائيان بنفس الاتجاه. ما نوع القوة المتبادلة بينهما؟',
    options: ['قوة تجاذب', 'قوة تنافر', 'لا توجد قوة بينهما', 'تعتمد على شدة التيار'],
    correctAnswerIndex: 0,
    explanation: 'عندما يمر التياران في نفس الاتجاه، يكون المجال المغناطيسي الناتج عن كل سلك عند موقع السلك الآخر بحيث يسبب قوة تجاذب بينهما وفقًا لقاعدة اليد اليمنى.'
  },
  {
    questionText: 'ما هي صيغة القوة لوحدة الأطوال (F/L) بين سلكين طويلين متوازيين تفصل بينهما مسافة (r) ويمر فيهما تياران (I1) و (I2)؟',
    options: ['$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi r}$', '$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2 r}$', '$\\frac{F}{L} = \\frac{\\mu_0 I_1}{2\\pi r}$', '$\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{r^2}$'],
    correctAnswerIndex: 0,
    explanation: 'يتم اشتقاق هذه العلاقة بدمج قانون المجال المغناطيسي لسلك مستقيم ($B = \\frac{\\mu_0 I}{2\\pi r}$) مع قانون القوة على موصل ($F=ILB$). القوة لوحدة الأطوال هي $\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi r}$.'
  },
  {
    questionText: 'سلكان متوازيان يمر فيهما تياران متساويان ومتعاكسان. أين يكون المجال المغناطيسي المحصل أكبر ما يمكن؟',
    options: ['في نقطة في المنتصف بينهما', 'عند السلك الأول', 'عند السلك الثاني', 'خارج السلكين'],
    correctAnswerIndex: 0,
    explanation: 'عندما يكون التياران متعاكسين، يكون المجالان المغناطيسيان في المنطقة بين السلكين في نفس الاتجاه. وبسبب مبدأ التراكب، يتم جمع المجالين، ويكون المجال المحصل أكبر ما يمكن في المنطقة بينهما (وتحديدًا أكبر كلما اقتربنا من أحد السلكين).'
  },
  {
    questionText: 'إذا تضاعف التيار في كلا السلكين المتوازيين، وتضاعفت المسافة بينهما، فإن القوة المتبادلة بينهما لوحدة الأطوال...',
    options: ['تزداد إلى الضعف', 'تزداد أربع مرات', 'تبقى كما هي', 'تقل إلى النصف'],
    correctAnswerIndex: 0,
    explanation: 'القوة لوحدة الأطوال $F/L \\propto \\frac{I_1 I_2}{r}$. إذا أصبح التياران $2I_1$ و $2I_2$ والمسافة $2r$, فإن القوة الجديدة $(F/L)\' \\propto \\frac{(2I_1)(2I_2)}{2r} = \\frac{4 I_1 I_2}{2r} = 2 (\\frac{I_1 I_2}{r})$. إذن، القوة تزداد إلى الضعف.'
  },
  {
    questionText: 'يُستخدم تعريف الأمبير القياسي بالاعتماد على...',
    options: ['القوة المغناطيسية على شحنة متحركة', 'قانون أوم', 'قانون كيرشوف', 'القوة المتبادلة بين سلكين متوازيين'],
    correctAnswerIndex: 3,
    explanation: 'يُعرَّف الأمبير بأنه شدة التيار الثابت الذي إذا مر في سلكين مستقيمين متوازيين لا نهائيي الطول ومهملي المقطع، وموضوعين في الفراغ على بعد متر واحد من بعضهما، ينتج قوة متبادلة مقدارها $2 \\times 10^{-7}$ نيوتن لكل متر من الطول.'
  },
];

export default function ForceBetweenParallelConductorsQuizPage() {
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
