
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
    questionText: 'ما هي نسبة نصف قطر نواة البولونيوم-216 ($^{216}Po$) إلى نصف قطر نواة الحديد-56 ($^{56}Fe$)?',
    options: ['$\\approx 1.57$', '$\\approx 3.86$', '$\\approx 0.26$', '$\\approx 0.64$'],
    correctAnswerIndex: 0,
    explanation: 'العلاقة هي $r \\propto A^{1/3}$. النسبة هي $(\\frac{A_{Po}}{A_{Fe}})^{1/3} = (\\frac{216}{56})^{1/3} \\approx (3.857)^{1/3} \\approx 1.57$.'
  },
  {
    questionText: 'إذا كانت طاقة الربط لكل نيوكليون لنواة X هي 7.5 MeV ولنواة Y هي 8.0 MeV، فأي نواة أكثر استقرارًا؟',
    options: ['النواة X', 'النواة Y', 'لهما نفس الاستقرار', 'لا يمكن التحديد'],
    correctAnswerIndex: 1,
    explanation: 'النواة الأكثر استقرارًا هي التي تمتلك طاقة ربط أعلى لكل نيوكليون. بما أن 8.0 > 7.5، فإن النواة Y هي الأكثر استقرارًا.'
  },
  {
    questionText: 'أي من الأنوية التالية من المرجح أن تكون غير مستقرة؟',
    options: ['$^4_2He$', '$^{12}_6C$', '$^{56}_{26}Fe$', '$^{238}_{92}U$'],
    correctAnswerIndex: 3,
    explanation: 'الأنوية التي عددها الذري أكبر من 83 (مثل اليورانيوم) تكون دائمًا غير مستقرة وتخضع للاضمحلال الإشعاعي. الهيليوم والكربون والحديد هي أمثلة على أنوية مستقرة.'
  },
  {
    questionText: 'كتلة نواة الديوتيريوم ($^2_1H$) هي $2.014102 u$. إذا كانت كتلة البروتون $1.007825 u$ وكتلة النيوترون $1.008665 u$, فما مقدار فرق الكتلة؟',
    options: ['0.002388 u', '0.002224 u', '2.016490 u', 'لا يوجد فرق في الكتلة'],
    correctAnswerIndex: 0,
    explanation: 'كتلة المكونات = $m_p + m_n = 1.007825 + 1.008665 = 2.016490 u$. \n فرق الكتلة $\\Delta m = (m_p + m_n) - m_{nuc} = 2.016490 - 2.014102 = 0.002388 u$.'
  },
  {
    questionText: 'إذا كانت كثافة النواة ثابتة تقريبًا، فهذا يعني أن...',
    options: ['جميع الأنوية لها نفس الكتلة', 'جميع الأنوية لها نفس الحجم', 'النيوكليونات مرصوصة معًا بنفس الطريقة في جميع الأنوية', 'القوة النووية تزداد مع المسافة'],
    correctAnswerIndex: 2,
    explanation: 'ثبات الكثافة يعني أن نسبة الكتلة إلى الحجم ثابتة. بما أن الكتلة والحجم كلاهما يتناسبان مع A، فهذا يشير إلى أن النيوكليونات تحتفظ بمسافات بينية ثابتة تقريبًا بغض النظر عن حجم النواة.'
  },
];

export default function Lesson1QuestionsQuizPage() {
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
