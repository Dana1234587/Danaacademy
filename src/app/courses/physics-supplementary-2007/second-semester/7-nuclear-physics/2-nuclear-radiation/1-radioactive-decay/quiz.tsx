
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
    questionText: 'ما هي النواة الناتجة عن اضمحلال ألفا لنواة الراديوم-226 ($^{226}_{88}Ra$)?',
    options: ['$^{222}_{86}Rn$', '$^{226}_{89}Ac$', '$^{222}_{87}Fr$', '$^{226}_{87}Fr$'],
    correctAnswerIndex: 0,
    explanation: 'في اضمحلال ألفا، يقل العدد الكتلي بمقدار 4 والعدد الذري بمقدار 2. \n $A\' = 226 - 4 = 222$. \n $Z\' = 88 - 2 = 86$. \n العنصر الذي عدده الذري 86 هو الرادون (Rn). إذن، النواة الناتجة هي $^{222}_{86}Rn$.'
  },
  {
    questionText: 'عندما تخضع نواة الصوديوم-24 ($^{24}_{11}Na$) لاضمحلال بيتا السالبة، ماذا تنتج؟',
    options: ['$^{24}_{12}Mg$', '$^{24}_{10}Ne$', '$^{20}_{9}F$', '$^{23}_{11}Na$'],
    correctAnswerIndex: 0,
    explanation: 'في اضمحلال بيتا السالبة، يتحول نيوترون إلى بروتون. العدد الكتلي يبقى ثابتًا (24) ويزداد العدد الذري بمقدار 1 (11+1=12). العنصر الذي عدده الذري 12 هو المغنيسيوم (Mg). إذن، النواة الناتجة هي $^{24}_{12}Mg$.'
  },
  {
    questionText: 'ما هو الجسيم المنبعث إلى جانب البوزيترون في اضمحلال بيتا الموجبة؟',
    options: ['إلكترون', 'بروتون', 'ضديد النيوترينو', 'النيوترينو'],
    correctAnswerIndex: 3,
    explanation: 'للحفاظ على عدد اللبتونات، يرافق انبعاث البوزيترون (لبتون مضاد) انبعاث نيوترينو (لبتون). بينما يرافق انبعاث الإلكترون (لبتون) انبعاث ضديد النيوترينو (لبتون مضاد).'
  },
  {
    questionText: 'أي نوع من الاضمحلال لا يغير العدد الذري أو العدد الكتلي للنواة الأم؟',
    options: ['اضمحلال ألفا', 'اضمحلال بيتا السالبة', 'اضمحلال بيتا الموجبة', 'اضمحلال غاما'],
    correctAnswerIndex: 3,
    explanation: 'اضمحلال غاما هو مجرد انبعاث فوتون عالي الطاقة عندما تنتقل النواة من حالة إثارة إلى حالة أكثر استقرارًا. لا يتغير عدد البروتونات أو النيوترونات، وبالتالي يبقى العدد الذري والكتلي كما هو.'
  },
  {
    questionText: 'نواة لديها فائض من البروتونات (تقع تحت نطاق الاستقرار). أي من العمليات التالية من غير المرجح أن تحدث لها لتصل إلى الاستقرار؟',
    options: ['اضمحلال بيتا الموجبة ($\\beta^+$)', 'الأسر الإلكتروني', 'اضمحلال ألفا', 'اضمحلال بيتا السالبة ($\\beta^-$)'],
    correctAnswerIndex: 3,
    explanation: 'اضمحلال بيتا السالبة يحدث للأنوية التي لديها فائض من النيوترونات، حيث يحول نيوترونًا إلى بروتون، مما يزيد من عدد البروتونات ويبعد النواة أكثر عن نطاق الاستقرار في هذه الحالة.'
  },
];

export default function RadioactiveDecayQuizPage() {
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
