
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
    questionText: 'محول مثالي يتصل ملفه الابتدائي بمصدر جهد متردد 240 فولت، ويتصل ملفه الثانوي بجهاز مقاومته 12 أوم. إذا كانت نسبة عدد اللفات الثانوية إلى الابتدائية هي 1:4، فما مقدار التيار في الملف الابتدائي؟',
    options: ['0.5 أمبير', '1.25 أمبير', '5 أمبير', '20 أمبير'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نجد جهد الخرج: $\\frac{V_s}{V_p} = \\frac{N_s}{N_p} \\Rightarrow V_s = 240V \\times \\frac{1}{4} = 60V$. \n ثانياً، نجد تيار الخرج: $I_s = V_s / R_s = 60V / 12\\Omega = 5A$. \n ثالثاً، نجد تيار الدخل من معادلة المحول المثالي: $\\frac{I_p}{I_s} = \\frac{N_s}{N_p} \\Rightarrow I_p = I_s \\times \\frac{N_s}{N_p} = 5A \\times \\frac{1}{4} = 1.25A$.'
  },
  {
    questionText: 'إذا كانت قدرة الملف الثانوي لمحول 180 واط وقدرة الملف الابتدائي 200 واط، فما هي كفاءة المحول؟',
    options: ['80%', '90%', '111%', '10%'],
    correctAnswerIndex: 1,
    explanation: 'الكفاءة $\\eta = \\frac{P_{out}}{P_{in}} \\times 100\\% = \\frac{180W}{200W} \\times 100\\% = 0.9 \\times 100\\% = 90\\%$.'
  },
  {
    questionText: 'محول خافض للجهد، النسبة بين عدد لفاته 5:1. إذا كان تيار الملف الابتدائي 2 أمبير، فما هو تيار الملف الثانوي في حالة المحول المثالي؟',
    options: ['0.4 أمبير', '2 أمبير', '5 أمبير', '10 أمبير'],
    correctAnswerIndex: 3,
    explanation: 'لدينا $\\frac{N_p}{N_s} = \\frac{5}{1}$. في المحول المثالي، $\\frac{I_s}{I_p} = \\frac{N_p}{N_s}$. \n إذن، $I_s = I_p \\times \\frac{N_p}{N_s} = 2A \\times \\frac{5}{1} = 10A$.'
  },
  {
    questionText: 'ما هو السبب الرئيسي لاستخدام محولات رافعة للجهد عند محطات توليد الكهرباء؟',
    options: ['لزيادة التيار المنقول عبر الأسلاك.', 'لتقليل الفقد في القدرة أثناء النقل عبر الأسلاك.', 'لجعل الكهرباء أكثر أمانًا.', 'لأن الأجهزة المنزلية تعمل على جهد عالٍ.'],
    correctAnswerIndex: 1,
    explanation: 'يتم رفع الجهد بشكل كبير لتقليل التيار ($P=VI$). القدرة المفقودة في أسلاك النقل على شكل حرارة هي $P_{loss} = I^2R$. بتقليل التيار، يقل الفقد في القدرة بشكل كبير (حسب مربع التيار)، مما يزيد من كفاءة نقل الطاقة لمسافات طويلة.'
  },
  {
    questionText: 'جرس باب يعمل على جهد 12 فولت وتيار 0.5 أمبير، يتم تشغيله من مصدر 240 فولت باستخدام محول مثالي. ما هو التيار الذي يسحبه المحول من المصدر؟',
    options: ['10 أمبير', '2.5 أمبير', '0.5 أمبير', '0.025 أمبير'],
    correctAnswerIndex: 3,
    explanation: 'أولاً، نحسب قدرة الجرس (القدرة الخارجة): $P_s = V_s I_s = 12V \\times 0.5A = 6W$. \n في المحول المثالي، القدرة الداخلة تساوي الخارجة، $P_p = P_s = 6W$. \n الآن نحسب التيار المسحوب من المصدر: $I_p = P_p / V_p = 6W / 240V = 0.025A$.'
  },
];

export default function TransformerWorksheetQuizPage() {
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
