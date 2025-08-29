
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
    questionText: 'ما هي طبيعة أشعة غاما؟',
    options: ['جسيمات موجبة الشحنة', 'جسيمات سالبة الشحنة', 'فوتونات عالية الطاقة', 'نيوترونات سريعة'],
    correctAnswerIndex: 2,
    explanation: 'أشعة غاما هي إشعاع كهرومغناطيسي، أي أنها تتكون من فوتونات، ولكنها تمتلك طاقة عالية جدًا وترددًا عاليًا.'
  },
  {
    questionText: 'عندما تبعث نواة جسيم غاما، ماذا يحدث لعددها الذري (Z) وعددها الكتلي (A)؟',
    options: ['Z يقل بـ 1، A يبقى ثابتًا', 'Z و A يبقيان ثابتين', 'A يقل بـ 1، Z يبقى ثابتًا', 'Z و A يقلان'],
    correctAnswerIndex: 1,
    explanation: 'اضمحلال غاما هو مجرد انتقال النواة من مستوى طاقة مثار إلى مستوى طاقة أقل. لا يتغير عدد البروتونات أو النيوترونات، لذا يبقى كل من العدد الذري والعدد الكتلي ثابتًا.'
  },
  {
    questionText: 'لماذا يحدث اضمحلال غاما عادة بعد اضمحلال ألفا أو بيتا؟',
    options: ['لأن اضمحلال ألفا وبيتا يستهلكان طاقة.', 'لأن النواة الوليدة غالبًا ما تُترك في حالة إثارة.', 'لأن أشعة غاما تساعد على طرد جسيمات ألفا وبيتا.', 'لأنها الطريقة الوحيدة لتغيير العدد الذري.'],
    correctAnswerIndex: 1,
    explanation: 'غالبًا ما يترك اضمحلال ألفا أو بيتا النواة الناتجة (الوليدة) في حالة طاقة مثارة. تتخلص النواة من هذه الطاقة الزائدة عن طريق إطلاق فوتون غاما للوصول إلى حالتها الأرضية الأكثر استقرارًا.'
  },
  {
    questionText: 'أي من أنواع الإشعاع التالية يمتلك أكبر قدرة على النفاذ عبر المواد؟',
    options: ['أشعة ألفا', 'أشعة بيتا', 'أشعة غاما', 'النيوترونات'],
    correctAnswerIndex: 2,
    explanation: 'بسبب عدم امتلاكها لشحنة أو كتلة سكون، تتفاعل أشعة غاما بشكل ضعيف مع المادة، مما يمنحها قدرة اختراق عالية جدًا. يمكنها اختراق عدة سنتيمترات من الرصاص.'
  },
  {
    questionText: 'نواة اليورانيوم-238 تضمحل إلى ثوريوم-234 باعثة جسيم ألفا. إذا كانت نواة الثوريوم الناتجة في حالة إثارة، فما هو الإشعاع التالي الذي ستصدره على الأرجح؟',
    options: ['جسيم ألفا آخر', 'جسيم بيتا', 'فوتون غاما', 'بوزيترون'],
    correctAnswerIndex: 2,
    explanation: 'بما أن نواة الثوريوم في حالة إثارة، فإنها ستنتقل إلى حالتها الأرضية عن طريق إطلاق طاقتها الزائدة على شكل فوتون غاما.'
  },
];

export default function GammaDecayQuizPage() {
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
