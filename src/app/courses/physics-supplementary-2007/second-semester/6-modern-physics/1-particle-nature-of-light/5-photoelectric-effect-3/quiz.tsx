
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
    questionText: 'في الرسم البياني للطاقة الحركية العظمى ($K_{max}$) مقابل التردد (f)، ماذا يمثل ميل الخط المستقيم؟',
    options: ['اقتران الشغل ($\\phi$)', 'ثابت بلانك (h)', 'شحنة الإلكترون (e)', 'تردد العتبة ($f_0$)'],
    correctAnswerIndex: 1,
    explanation: 'المعادلة هي $K_{max} = hf - \\phi$. هذه معادلة خط مستقيم بصيغة y = mx + c، حيث y هي $K_{max}$ و x هي f. بالمقارنة، نجد أن الميل (m) يساوي ثابت بلانك (h).'
  },
  {
    questionText: 'في الرسم البياني لـ ($K_{max}$) مقابل (f)، ماذا تمثل نقطة تقاطع الخط مع المحور الأفقي (محور التردد)؟',
    options: ['اقتران الشغل ($\\phi$)', 'ثابت بلانك (h)', 'جهد الإيقاف ($V_s$)', 'تردد العتبة ($f_0$)'],
    correctAnswerIndex: 3,
    explanation: 'عند المحور الأفقي، تكون قيمة $K_{max}$ (المحور الرأسي) تساوي صفرًا. من المعادلة $0 = hf - \\phi$, نحصل على $hf = \\phi$. التردد عند هذه النقطة هو تردد العتبة $f_0$.'
  },
  {
    questionText: 'في الرسم البياني لـ ($K_{max}$) مقابل (f)، ماذا يمثل امتداد الخط المستقيم ليتقاطع مع المحور الرأسي (محور الطاقة)؟',
    options: ['سالب اقتران الشغل ($\\phi$)', 'ثابت بلانك (h)', 'جهد الإيقاف ($V_s$)', 'صفر'],
    correctAnswerIndex: 0,
    explanation: 'امتداد الخط يتقاطع مع المحور الرأسي عندما تكون قيمة التردد (f) تساوي صفرًا. بالتعويض في المعادلة $K_{max} = hf - \\phi$, نحصل على $K_{max} = h(0) - \\phi = -\\phi$. إذن، نقطة التقاطع هي سالب اقتران الشغل.'
  },
  {
    questionText: 'إذا كان ميل الخط في الرسم البياني لـ ($K_{max}$) مقابل (f) لفلز ما هو $6.63 \\times 10^{-34} J\\cdot s$, ويقطع محور التردد عند $5 \\times 10^{14} Hz$, فما هو اقتران الشغل لهذا الفلز؟',
    options: ['3.315 eV', '2.07 eV', '5 eV', '1.6 eV'],
    correctAnswerIndex: 1,
    explanation: 'اقتران الشغل $\\phi = hf_0$. \n $\\phi = (6.63 \\times 10^{-34} J\\cdot s) \\times (5 \\times 10^{14} Hz) = 3.315 \\times 10^{-19} J$. \n للتحويل إلى إلكترون فولت: $\\phi(eV) = (3.315 \\times 10^{-19} J) / (1.6 \\times 10^{-19} J/eV) \\approx 2.07$ eV.'
  },
  {
    questionText: 'عند رسم العلاقة بين جهد الإيقاف ($V_s$) والتردد (f)، يكون ميل الخط المستقيم مساويًا لـ:',
    options: ['$h$', '$e$', '$h/e$', '$e/h$'],
    correctAnswerIndex: 2,
    explanation: 'نعلم أن $K_{max} = hf - \\phi$ و $K_{max} = eV_s$. بالمساواة بينهما: $eV_s = hf - \\phi \\implies V_s = (h/e)f - (\\phi/e)$. هذه معادلة خط مستقيم (y=mx+c) حيث y هي $V_s$ و x هي f. إذن، الميل هو $h/e$.'
  },
];

export default function PhotoelectricEffect3QuizPage() {
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
