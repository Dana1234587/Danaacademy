
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
    questionText: 'في دارة كهربائية معقدة، لدينا 3 تيارات مجهولة. كم عدد المعادلات المستقلة التي نحتاجها لحل الدارة؟',
    options: ['1', '2', '3', '4'],
    correctAnswerIndex: 2,
    explanation: 'لحل نظام يحتوي على N من المجاهيل، نحتاج إلى N من المعادلات الخطية المستقلة. بما أن لدينا 3 تيارات مجهولة، فنحن بحاجة إلى 3 معادلات.'
  },
  {
    questionText: 'عند تطبيق قاعدتي كيرشوف، ما هي الخطوة الأولى عادة؟',
    options: ['اختيار المسارات المغلقة', 'تحديد الوصلات وافتراض اتجاهات التيارات', 'حل المعادلات رياضيًا', 'حساب المقاومة المكافئة'],
    correctAnswerIndex: 1,
    explanation: 'الخطوة الأولى هي تحديد جميع الوصلات (نقاط التفرع) في الدارة، ثم افتراض اتجاه لكل تيار مجهول في كل فرع. بناءً على هذه الافتراضات، يتم تطبيق القواعد.'
  },
  {
    questionText: 'إذا كانت قيمة تيار مجهول بعد حل المعادلات سالبة، فماذا يعني ذلك؟',
    options: ['أن الحسابات خاطئة', 'أن البطارية فارغة', 'أن الاتجاه الفعلي للتيار هو عكس الاتجاه الذي افترضته', 'أن المقاومة لانهائية'],
    correctAnswerIndex: 2,
    explanation: 'الإشارة السالبة للتيار لا تعني أن الحل خاطئ، بل تشير ببساطة إلى أن الاتجاه الحقيقي للتيار في ذلك الفرع هو عكس الاتجاه الذي تم افتراضه في بداية الحل.'
  },
  {
    questionText: 'ما هو العدد الأقصى لمعادلات الوصلة المستقلة التي يمكن الحصول عليها من دارة تحتوي على N من الوصلات؟',
    options: ['N', 'N-1', 'N+1', '2N'],
    correctAnswerIndex: 1,
    explanation: 'في دارة تحتوي على N وصلة، يمكننا كتابة N معادلة وصلة، ولكن واحدة منها فقط ستكون غير مستقلة (يمكن استنتاجها من المعادلات الأخرى). لذلك، العدد الأقصى للمعادلات المستقلة التي يمكن الحصول عليها من قاعدة الوصلة هو N-1.'
  },
  {
    questionText: 'عند اختيار المسارات المغلقة (العروات) لتطبيق قاعدة كيرشوف الثانية، يجب أن...',
    options: ['تشمل جميع المسارات الممكنة', 'تشمل كل مسار بطارية واحدة فقط', 'تكون المسارات مستقلة وتغطي جميع عناصر الدارة', 'تبدأ وتنتهي عند نفس البطارية'],
    correctAnswerIndex: 2,
    explanation: 'يجب اختيار عدد كافٍ من المسارات المغلقة لتوفير العدد المطلوب من المعادلات. يجب أن يكون كل مسار جديد يحتوي على عنصر واحد على الأقل لم يتم تضمينه في المسارات السابقة لضمان أن تكون المعادلة الناتجة مستقلة.'
  },
];

export default function KirchhoffsRulesQuizPage() {
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
