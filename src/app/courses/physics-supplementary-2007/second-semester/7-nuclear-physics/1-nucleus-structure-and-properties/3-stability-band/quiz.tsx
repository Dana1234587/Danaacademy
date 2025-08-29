
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
    questionText: 'أي من القوى الأساسية الأربعة هي المسؤولة عن ربط النيوكليونات معًا داخل النواة؟',
    options: ['القوة الكهرومغناطيسية', 'قوة الجاذبية', 'القوة النووية الضعيفة', 'القوة النووية القوية'],
    correctAnswerIndex: 3,
    explanation: 'القوة النووية القوية هي القوة التي تربط البروتونات والنيوترونات (النيوكليونات) معًا داخل النواة، وهي أقوى قوة معروفة في الطبيعة على المسافات القصيرة جدًا.'
  },
  {
    questionText: 'في الأنوية الخفيفة المستقرة، تكون نسبة عدد النيوترونات إلى عدد البروتونات (N/Z) قريبة من:',
    options: ['2', '1.5', '1', '0.5'],
    correctAnswerIndex: 2,
    explanation: 'بالنسبة للأنوية الخفيفة (Z < 20)، يكون نطاق الاستقرار قريبًا جدًا من الخط الذي يمثل N = Z، أي أن النسبة تكون حوالي 1.'
  },
  {
    questionText: 'عندما يزداد العدد الذري (Z) للأنوية، فإن منحنى نطاق الاستقرار ينحرف فوق الخط N=Z. ما هو التفسير الرئيسي لذلك؟',
    options: ['لأن قوة الجاذبية بين النيوكليونات تزداد.', 'لأن القوة النووية القوية تصبح أضعف.', 'للتغلب على قوة التنافر الكهرومغناطيسي المتزايدة بين البروتونات.', 'لأن النيوترونات تبدأ بالتحلل إلى بروتونات.'],
    correctAnswerIndex: 2,
    explanation: 'مع زيادة عدد البروتونات، تزداد قوة التنافر الكهرومغناطيسي بينها بشكل كبير. للحفاظ على استقرار النواة، يلزم وجود عدد أكبر من النيوترونات لتوفير المزيد من "غراء" القوة النووية القوية دون إضافة المزيد من التنافر.'
  },
  {
    questionText: 'أي من خصائص القوة النووية القوية التالية غير صحيح؟',
    options: ['قوة تجاذب كبيرة جدًا', 'قصيرة المدى جدًا', 'لا تعتمد على الشحنة', 'تؤثر على الإلكترونات والبروتونات'],
    correctAnswerIndex: 3,
    explanation: 'القوة النووية القوية تؤثر فقط على النيوكليونات (البروتونات والنيوترونات) ولا تؤثر على الإلكترونات، التي تنتمي إلى عائلة اللبتونات.'
  },
  {
    questionText: 'نواة غير مستقرة تقع فوق نطاق الاستقرار (لديها فائض من النيوترونات). أي نوع من الاضمحلال من المرجح أن تخضع له لتصل إلى الاستقرار؟',
    options: ['اضمحلال ألفا', 'اضمحلال بيتا السالبة ($\\beta^-$)', 'اضمحلال بيتا الموجبة ($\\beta^+$)', 'الأسر الإلكتروني'],
    correctAnswerIndex: 1,
    explanation: 'الأنوية التي لديها فائض من النيوترونات (تقع فوق نطاق الاستقرار) تصل إلى الاستقرار عن طريق اضمحلال بيتا السالبة، حيث يتحول نيوترون إلى بروتون وإلكترون (جسيم بيتا)، مما يقلل نسبة N/Z.'
  },
];

export default function StabilityBandQuizPage() {
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
                    <SmartTextRenderer as="p" text={q.explanation} className="text-muted-foreground" />
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
