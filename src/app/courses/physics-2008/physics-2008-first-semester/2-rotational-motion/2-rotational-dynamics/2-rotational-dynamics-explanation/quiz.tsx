
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
    questionText: 'ما هي وحدة قياس عزم القصور الذاتي في النظام الدولي للوحدات (SI)؟',
    options: ['$kg \\cdot m/s$', '$kg \\cdot m^2$', '$N \\cdot m$', '$kg/m^3$'],
    correctAnswerIndex: 1,
    explanation: 'عزم القصور الذاتي لجسيم نقطي هو $I = mr^2$. وحدة الكتلة (m) هي kg ووحدة نصف القطر (r) هي m. لذلك، وحدة عزم القصور الذاتي هي $kg \\cdot m^2$.'
  },
  {
    questionText: 'جسيم كتلته 2 كجم يدور في مسار دائري نصف قطره 3 متر. ما هو عزم قصوره الذاتي حول مركز الدائرة؟',
    options: ['$6 kg \\cdot m^2$', '$12 kg \\cdot m^2$', '$18 kg \\cdot m^2$', '$36 kg \\cdot m^2$'],
    correctAnswerIndex: 2,
    explanation: 'باستخدام قانون عزم القصور الذاتي لجسيم نقطي: $I = mr^2 = (2 kg) \\times (3 m)^2 = 2 \\times 9 = 18 kg \\cdot m^2$.'
  },
  {
    questionText: 'ماذا تنص نظرية المحور الموازي؟',
    options: ['جميع المحاور المتوازية لها نفس عزم القصور الذاتي', 'عزم القصور الذاتي حول أي محور يساوي عزم القصور حول محور موازٍ يمر بمركز الكتلة مضافًا إليه $Md^2$', 'عزم القصور الذاتي يكون دائمًا أكبر حول مركز الكتلة', 'لا يمكن حساب عزم القصور الذاتي إلا للمحاور التي تمر بمركز الكتلة'],
    correctAnswerIndex: 1,
    explanation: 'نظرية المحور الموازي تنص على أن $I = I_{cm} + Md^2$, حيث $I$ هو عزم القصور الذاتي حول محور جديد، $I_{cm}$ هو عزم القصور حول محور موازٍ للمحور الجديد ويمر بمركز الكتلة، M هي كتلة الجسم، و d هي المسافة بين المحورين.'
  },
  {
    questionText: 'عزم القصور الذاتي لقضيب رفيع حول محور يمر بمركزه وعمودي عليه هو $\\frac{1}{12}ML^2$. باستخدام نظرية المحور الموازي، ما هو عزم قصوره الذاتي حول محور يمر بأحد طرفيه؟',
    options: ['$\\frac{1}{12}ML^2$', '$\\frac{1}{6}ML^2$', '$\\frac{1}{3}ML^2$', '$\\frac{1}{2}ML^2$'],
    correctAnswerIndex: 2,
    explanation: 'هنا $I_{cm} = \\frac{1}{12}ML^2$. المسافة من مركز الكتلة (المنتصف) إلى الطرف هي $d = L/2$. بتطبيق النظرية: $I = I_{cm} + Md^2 = \\frac{1}{12}ML^2 + M(\\frac{L}{2})^2 = \\frac{1}{12}ML^2 + \\frac{1}{4}ML^2 = (\\frac{1}{12} + \\frac{3}{12})ML^2 = \\frac{4}{12}ML^2 = \\frac{1}{3}ML^2$.'
  },
  {
    questionText: 'عزم القصور الذاتي كمية...',
    options: ['متجهة واتجاهها مع السرعة الزاوية', 'متجهة واتجاهها مع العزم', 'قياسية ودائمًا موجبة', 'قياسية وقد تكون موجبة أو سالبة'],
    correctAnswerIndex: 2,
    explanation: 'عزم القصور الذاتي هو كمية قياسية (ليس له اتجاه) تنتج عن مجموع جداءات الكتل في مربعات أبعاد، وكلاهما موجب. لذلك، قيمة عزم القصور الذاتي تكون دائمًا موجبة.'
  },
];

export default function RotationalDynamicsExplanationQuizPage() {
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
