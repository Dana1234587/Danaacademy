
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
    questionText: 'ما هي الوظيفة الرئيسية للثنائي في دارة مقوم نصف الموجة؟',
    options: ['تضخيم الجهد', 'تخزين الطاقة', 'السماح بمرور الأنصاف الموجبة فقط من الموجة ومنع الأنصاف السالبة', 'عكس قطبية الموجة'],
    correctAnswerIndex: 2,
    explanation: 'يعمل الثنائي كصمام أحادي الاتجاه. في مقوم نصف الموجة، يتم توجيهه بحيث يسمح بمرور التيار خلال نصف دورة (مثلاً، الموجبة) ويمنعه خلال النصف الآخر (السالبة)، محولاً التيار المتردد إلى تيار نابض في اتجاه واحد.'
  },
  {
    questionText: 'في الترانزستور الذي يعمل كمكبر، تيار القاعدة الصغير يتحكم في...',
    options: ['جهد الباعث الكبير', 'مقاومة القاعدة الكبيرة', 'تيار الجامع الكبير', 'مواسعة الجامع الكبيرة'],
    correctAnswerIndex: 2,
    explanation: 'هذا هو مبدأ التضخيم في الترانزستور. تغير طفيف في تيار القاعدة ($I_B$) يسبب تغيرًا كبيرًا متناسبًا في تيار الجامع ($I_C$).'
  },
  {
    questionText: 'عندما يعمل الترانزستور كمفتاح في حالة "ON" (إشباع)، تكون مقاومته بين الجامع والباعث...',
    options: ['صغيرة جدًا (تقترب من الصفر)', 'كبيرة جدًا (تقترب من اللانهاية)', 'تعتمد على جهد القاعدة', 'تساوي مقاومة القاعدة'],
    correctAnswerIndex: 0,
    explanation: 'في حالة الإشباع، يسمح الترانزستور بمرور أقصى تيار ممكن بين الجامع والباعث، ويتصرف كأنه مفتاح مغلق، أي أن مقاومته تكون صغيرة جدًا.'
  },
  {
    questionText: 'ما هي البوابة المنطقية التي يمكن بناؤها باستخدام ترانزستور واحد ومقاومتين، حيث يكون الخرج عكس الدخل؟',
    options: ['بوابة AND', 'بوابة OR', 'بوابة NOT (العاكس)', 'بوابة XOR'],
    correctAnswerIndex: 2,
    explanation: 'يمكن بناء بوابة NOT (العاكس) بسهولة باستخدام ترانزستور واحد. عندما يكون الدخل عاليًا (1)، يعمل الترانزستور ويوصل الخرج بالأرضي (0). وعندما يكون الدخل منخفضًا (0)، لا يعمل الترانزستور ويكون الخرج عاليًا (1).'
  },
  {
    questionText: 'ما هو العنصر الأساسي الذي مكن من تصنيع الدارات المتكاملة (ICs) والمعالجات الدقيقة؟',
    options: ['المقاومات', 'المكثفات', 'الترانزستورات', 'المحولات'],
    correctAnswerIndex: 2,
    explanation: 'الترانزستور هو حجر الزاوية في الإلكترونيات الحديثة. القدرة على تصغير الترانزستورات ودمج الملايين (أو المليارات) منها على شريحة واحدة من السيليكون هي التي أدت إلى ثورة الدارات المتكاملة والمعالجات.'
  },
];

export default function TechnologicalApplicationsQuizPage() {
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
