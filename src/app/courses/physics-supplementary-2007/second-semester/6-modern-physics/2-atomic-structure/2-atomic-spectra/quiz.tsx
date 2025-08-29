
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
    questionText: 'ما هو طيف الانبعاث؟',
    options: ['مجموعة من الأطوال الموجية التي يمتصها الغاز البارد.', 'طيف مستمر يحتوي على جميع الألوان.', 'مجموعة من الخطوط الملونة المنفصلة التي يصدرها غاز مثار.', 'طيف الأشعة السينية فقط.'],
    correctAnswerIndex: 2,
    explanation: 'ينتج طيف الانبعاث الخطي عندما تعود الإلكترونات في ذرات غاز مثار (تم تسخينه أو تفريغ كهربائي فيه) من مستويات طاقة عليا إلى مستويات أدنى، باعثة فوتونات ذات أطوال موجية محددة تظهر كخطوط ملونة.'
  },
  {
    questionText: 'أي من المتسلسلات الطيفية التالية لذرة الهيدروجين تقع في منطقة الضوء المرئي؟',
    options: ['متسلسلة ليمان', 'متسلسلة بالمر', 'متسلسلة باشن', 'متسلسلة براكيت'],
    correctAnswerIndex: 1,
    explanation: 'متسلسلة بالمر تنتج عن انتقالات الإلكترونات إلى المستوى الثاني (n=2) من المستويات الأعلى. طاقات هذه الفوتونات تقع في نطاق الضوء المرئي.'
  },
  {
    questionText: 'ما هو أطول طول موجي في متسلسلة ليمان؟',
    options: ['الانتقال من n=2 إلى n=1', 'الانتقال من n=3 إلى n=1', 'الانتقال من n=∞ إلى n=1', 'الانتقال من n=1 إلى n=2'],
    correctAnswerIndex: 0,
    explanation: 'أطول طول موجي يقابل أقل فرق طاقة. في متسلسلة ليمان، يكون المستوى النهائي دائمًا n=1. أقل فرق طاقة يحدث عند الانتقال من أقرب مستوى وهو n=2.'
  },
  {
    questionText: 'عندما يمر ضوء أبيض عبر غاز بارد، يظهر طيف الامتصاص على شكل...',
    options: ['خطوط ملونة على خلفية سوداء', 'طيف مستمر تمامًا', 'خطوط سوداء على خلفية ملونة مستمرة', 'لون الغاز فقط'],
    correctAnswerIndex: 2,
    explanation: 'يقوم الغاز البارد بامتصاص الفوتونات التي طاقتها تساوي تمامًا فروق الطاقة بين مستوياته. هذه الفوتونات الممتصة تظهر كخطوط سوداء (معتمة) في طيف الضوء الأبيض المستمر.'
  },
  {
    questionText: 'ما مقدار طاقة الفوتون المنبعث عند انتقال إلكترون في ذرة الهيدروجين من المستوى n=3 إلى n=2؟',
    options: ['1.51 eV', '1.89 eV', '3.4 eV', '10.2 eV'],
    correctAnswerIndex: 1,
    explanation: 'طاقة المستوى الثالث $E_3 = -13.6 / 3^2 = -1.51$ eV. طاقة المستوى الثاني $E_2 = -13.6 / 2^2 = -3.4$ eV. طاقة الفوتون المنبعث تساوي فرق الطاقة: $E_{photon} = |E_2 - E_3| = |-3.4 - (-1.51)| = |-1.89| = 1.89$ eV.'
  },
];

export default function AtomicSpectraQuizPage() {
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
