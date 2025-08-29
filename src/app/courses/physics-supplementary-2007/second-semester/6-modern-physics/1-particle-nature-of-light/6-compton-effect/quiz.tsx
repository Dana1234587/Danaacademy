
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
    questionText: 'ظاهرة كومبتون هي دليل قوي على...',
    options: ['الطبيعة الموجية للضوء.', 'أن الإلكترونات تتصرف كموجات.', 'الطبيعة الجسيمية للإشعاع الكهرومغناطيسي (الفوتونات).', 'أن طاقة الذرة مكمّاة.'],
    correctAnswerIndex: 2,
    explanation: 'تُفسر ظاهرة كومبتون على أنها تصادم مرن بين جسيمين: فوتون ساقط وإلكترون حر. نجاح هذا التفسير، الذي يعتمد على مبادئ حفظ الزخم والطاقة للجسيمات، هو دليل قوي على أن الفوتونات تمتلك زخمًا وتتصرف كجسيمات.'
  },
  {
    questionText: 'في تأثير كومبتون، ماذا يحدث للطول الموجي للفوتون المشتت مقارنة بالفوتون الساقط؟',
    options: ['يقل دائمًا.', 'يزداد دائمًا.', 'يبقى كما هو.', 'قد يزداد أو يقل.'],
    correctAnswerIndex: 1,
    explanation: 'الفوتون الساقط يعطي جزءًا من طاقته وزخمه للإلكترون. نقصان طاقة الفوتون يعني نقصان تردده وزيادة طوله الموجي. لذلك، يكون الطول الموجي للفوتون المشتت ($\lambda\'$) دائمًا أكبر من الطول الموجي للفوتون الساقط ($\\lambda$).'
  },
  {
    questionText: 'متى يكون التغير في الطول الموجي ($\\Delta\\lambda$) في تأثير كومبتون أكبر ما يمكن؟',
    options: ['عندما تكون زاوية التشتت 0 درجة.', 'عندما تكون زاوية التشتت 45 درجة.', 'عندما تكون زاوية التشتت 90 درجة.', 'عندما تكون زاوية التشتت 180 درجة.'],
    correctAnswerIndex: 3,
    explanation: 'التغير في الطول الموجي يُعطى بالعلاقة $\\Delta\\lambda = \\frac{h}{m_e c}(1 - \\cos\\theta)$. يكون هذا التغير أكبر ما يمكن عندما تكون قيمة $(1 - \\cos\\theta)$ أكبر ما يمكن. هذا يحدث عندما تكون $\\cos\\theta = -1$, أي عند زاوية $\\theta = 180^\\circ$ (التشتت الخلفي).'
  },
  {
    questionText: 'إذا تشتت فوتون بزاوية 90 درجة في تأثير كومبتون، فإن التغير في طوله الموجي يساوي...',
    options: ['صفر', 'طول موجة كومبتون (h/mₑc)', 'ضعف طول موجة كومبتون', 'نصف طول موجة كومبتون'],
    correctAnswerIndex: 1,
    explanation: 'عند زاوية $\\theta=90^\\circ$, فإن $\\cos(90^\\circ)=0$. بالتعويض في معادلة كومبتون: $\\Delta\\lambda = \\frac{h}{m_e c}(1 - 0) = \\frac{h}{m_e c}$. هذه القيمة تُعرف باسم "طول موجة كومبتون للإلكترون".'
  },
  {
    questionText: 'في تأثير كومبتون، أي من الكميات التالية غير محفوظة للنظام (فوتون + إلكترون)؟',
    options: ['الطاقة الكلية', 'الزخم الخطي الكلي', 'الطول الموجي للفوتون', 'الشحنة الكلية'],
    correctAnswerIndex: 2,
    explanation: 'يُعامل التصادم على أنه تصادم مرن، وبالتالي فإن الطاقة الكلية والزخم الخطي الكلي للنظام محفوظان. الشحنة الكلية محفوظة أيضًا. لكن الطول الموجي للفوتون يتغير لأنه يفقد طاقة، وبالتالي فهو غير محفوظ.'
  },
];

export default function ComptonEffectQuizPage() {
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
