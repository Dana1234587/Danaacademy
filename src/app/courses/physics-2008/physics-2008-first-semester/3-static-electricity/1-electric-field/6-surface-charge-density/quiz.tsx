
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
    questionText: 'ما هي وحدة قياس الكثافة السطحية للشحنة في النظام الدولي؟',
    options: ['$C/m$', '$C \\cdot m^2$', '$C/m^2$', '$C/m^3$'],
    correctAnswerIndex: 2,
    explanation: 'الكثافة السطحية هي الشحنة (بالكولوم) مقسومة على المساحة (بالمتر المربع)، لذا وحدتها هي $C/m^2$.'
  },
  {
    questionText: 'موصل كروي نصف قطره r يحمل شحنة Q. إذا زادت شحنته إلى 2Q، ماذا يحدث للكثافة السطحية للشحنة؟',
    options: ['تقل إلى النصف', 'تتضاعف', 'تزداد أربع مرات', 'تبقى ثابتة'],
    correctAnswerIndex: 1,
    explanation: 'الكثافة السطحية $\\sigma = Q/A$. بما أنها تتناسب طرديًا مع الشحنة Q، فإن مضاعفة الشحنة تؤدي إلى مضاعفة الكثافة السطحية.'
  },
  {
    questionText: 'موصل كروي نصف قطره r يحمل شحنة Q. إذا زاد نصف قطره إلى 2r مع بقاء الشحنة ثابتة، ماذا يحدث للكثافة السطحية للشحنة؟',
    options: ['تقل إلى النصف', 'تقل إلى الربع', 'تبقى ثابتة', 'تزداد إلى الضعف'],
    correctAnswerIndex: 1,
    explanation: 'المساحة السطحية للكرة $A = 4\\pi r^2$. الكثافة $\\sigma = Q / (4\\pi r^2)$. عندما يصبح نصف القطر $2r$, تصبح المساحة الجديدة $A\' = 4\\pi (2r)^2 = 16\\pi r^2 = 4A$. إذن، الكثافة الجديدة $\\sigma\' = Q/A\' = Q/(4A) = \\sigma/4$. تقل إلى الربع.'
  },
  {
    questionText: 'شحنة مقدارها $40 nC$ موزعة بانتظام على سطح كرة نصف قطرها 10 سم. ما مقدار الكثافة السطحية للشحنة؟',
    options: ['$\\approx 3.18 \\times 10^{-7} C/m^2$', '$\\approx 0.318 C/m^2$', '$\\approx 12.56 C/m^2$', '$\\approx 4 \\times 10^{-8} C/m^2$'],
    correctAnswerIndex: 0,
    explanation: 'أولاً، نحول الوحدات: $Q = 40 \\times 10^{-9} C$ و $r = 0.1 m$. \n ثانياً، نحسب المساحة: $A = 4\\pi r^2 = 4\\pi (0.1)^2 = 0.04\\pi m^2$. \n ثالثاً، نحسب الكثافة: $\\sigma = Q/A = (40 \\times 10^{-9}) / (0.04\\pi) = 1000 \\times 10^{-9} / \\pi \\approx 318 \\times 10^{-9} C/m^2 \\approx 3.18 \\times 10^{-7} C/m^2$.'
  },
  {
    questionText: 'في الموصلات المشحونة، أين تتوزع الشحنة الزائدة؟',
    options: ['في مركز الموصل', 'بشكل منتظم في جميع أنحاء حجمه', 'على السطح الخارجي للموصل', 'لا يمكن تحديد ذلك'],
    correctAnswerIndex: 2,
    explanation: 'بسبب التنافر بين الشحنات المتشابهة، فإن الشحنة الزائدة في أي موصل تستقر دائمًا على سطحه الخارجي، حيث تكون المسافات بينها أكبر ما يمكن.'
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
          <Card key={qIndex} className={\`border-2 \${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg\`}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={\`السؤال \${qIndex + 1}: \${q.questionText}\`} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={\`q\${qIndex}-o\${oIndex}\`} className={\`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent \${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}\`}>
                    <RadioGroupItem value={oIndex.toString()} id={\`q\${qIndex}-o\${oIndex}\`} disabled={isSubmitted} />
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
