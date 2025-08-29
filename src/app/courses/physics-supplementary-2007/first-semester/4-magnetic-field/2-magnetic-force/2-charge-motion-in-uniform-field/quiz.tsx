
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
    questionText: 'عندما تدخل شحنة كهربائية عموديًا على مجال مغناطيسي منتظم، فإنها تتحرك في مسار...',
    options: ['مستقيم', 'دائري', 'حلزوني', 'قطع مكافئ'],
    correctAnswerIndex: 1,
    explanation: 'القوة المغناطيسية تكون دائمًا عمودية على السرعة، وهذه هي خاصية القوة المركزية. القوة المركزية الثابتة المقدار تسبب حركة دائرية منتظمة.'
  },
  {
    questionText: 'ما هي صيغة نصف قطر المسار الدائري (r) لشحنة (q) كتلتها (m) تتحرك بسرعة (v) في مجال مغناطيسي (B)؟',
    options: ['$r = \\frac{mv}{qB}$', '$r = \\frac{qB}{mv}$', '$r = \\frac{mv^2}{qB}$', '$r = \\frac{qBv}{m}$'],
    correctAnswerIndex: 0,
    explanation: 'نساوي القوة المغناطيسية بالقوة المركزية: $qvB = \\frac{mv^2}{r}$. بإعادة ترتيب المعادلة لحل r، نحصل على $r = \\frac{mv}{qB}$.'
  },
  {
    questionText: 'بروتون وإلكترون دخلا نفس المجال المغناطيسي بنفس السرعة وعموديًا عليه. أي منهما يكون نصف قطر مساره أكبر؟',
    options: ['الإلكترون', 'البروتون', 'لهما نفس نصف القطر', 'يعتمد على اتجاه المجال'],
    correctAnswerIndex: 1,
    explanation: 'نصف القطر $r = mv/qB$. بما أن v, q, B متساوية لكلاهما، فإن نصف القطر يتناسب طرديًا مع الكتلة (m). بما أن كتلة البروتون أكبر بكثير من كتلة الإلكترون، فإن نصف قطر مساره سيكون أكبر.'
  },
  {
    questionText: 'لماذا لا تبذل القوة المغناطيسية شغلاً على شحنة متحركة؟',
    options: ['لأنها قوة ضعيفة', 'لأنها تؤثر فقط على الشحنات السالبة', 'لأنها دائمًا عمودية على اتجاه الإزاحة (السرعة)', 'لأن المجال المغناطيسي لا يحتوي على طاقة'],
    correctAnswerIndex: 2,
    explanation: 'الشغل = $Fd\\cos\\theta$. القوة المغناطيسية دائمًا عمودية على متجه السرعة، وبالتالي عمودية على متجه الإزاحة اللحظية. إذن، الزاوية $\\theta=90^\\circ$ و $\\cos(90^\\circ)=0$, وبالتالي الشغل المبذول صفر. هذا يعني أن القوة المغناطيسية لا تغير مقدار سرعة الشحنة أو طاقتها الحركية، بل تغير اتجاهها فقط.'
  },
  {
    questionText: 'في جهاز منتخب السرعات، تمر الشحنات التي لها سرعة معينة فقط دون انحراف. ما هي العلاقة التي تحدد هذه السرعة؟',
    options: ['$v = E/B$', '$v = B/E$', '$v = EB$', '$v = qB/m$'],
    correctAnswerIndex: 0,
    explanation: 'في منتخب السرعات، يتم تطبيق مجال كهربائي ومجال مغناطيسي متعامدين. لكي تمر الشحنة دون انحراف، يجب أن تكون القوة الكهربائية ($F_e=qE$) مساوية ومعاكسة للقوة المغناطيسية ($F_m=qvB$). $qE = qvB \\Rightarrow v = E/B$.'
  },
];

export default function ChargeMotionInUniformFieldQuizPage() {
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
