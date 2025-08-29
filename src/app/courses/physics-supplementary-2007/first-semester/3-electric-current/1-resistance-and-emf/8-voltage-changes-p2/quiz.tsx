
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
    questionText: 'عند الانتقال عبر بطارية من قطبها الموجب إلى قطبها السالب في حالة شحن (التيار يدخل القطب الموجب)، فإن التغير في الجهد الكهربائي يكون:',
    options: ['$+\\varepsilon + Ir$', '$-\\varepsilon - Ir$', '$+\\varepsilon - Ir$', '$-\\varepsilon + Ir$'],
    correctAnswerIndex: 1,
    explanation: 'عند عبور البطارية عكس اتجاه قوتها الدافعة (من موجب إلى سالب)، يقل الجهد بمقدار $\\varepsilon$. وعند عبور مقاومتها الداخلية عكس اتجاه التيار، يقل الجهد أيضًا بمقدار Ir. المحصلة هي انخفاض مقداره $\\varepsilon + Ir$.'
  },
  {
    questionText: 'ماذا يعني أن تكون نقطة في دارة "مؤرضة"؟',
    options: ['أنها النقطة الأعلى جهدًا', 'أنها النقطة الأدنى جهدًا', 'أن جهدها يساوي صفر فولت', 'أنها غير متصلة بالدارة'],
    correctAnswerIndex: 2,
    explanation: 'التأريض هو توصيل نقطة في الدارة بالأرض، والتي نعتبر جهدها مرجعيًا ويساوي صفر فولت. يتم قياس جهد جميع النقاط الأخرى في الدارة بالنسبة لهذه النقطة.'
  },
  {
    questionText: 'في دارة كهربائية، إذا كان جهد النقطة a هو 5 فولت وجهد النقطة b هو -3 فولت، فإن فرق الجهد $V_{ab}$ يساوي:',
    options: ['2 فولت', '8 فولت', '-8 فولت', '-2 فولت'],
    correctAnswerIndex: 1,
    explanation: 'فرق الجهد $V_{ab}$ يُعرّف بأنه $V_a - V_b$. إذن، $V_{ab} = 5V - (-3V) = 8V$.'
  },
  {
    questionText: 'بطارية قوتها الدافعة 6 فولت ومقاومتها الداخلية 0.5 أوم، يتم شحنها بتيار 2 أمبير. ما فرق الجهد بين قطبيها؟',
    options: ['5 فولت', '6 فولت', '7 فولت', '12 فولت'],
    correctAnswerIndex: 2,
    explanation: 'في حالة الشحن، نستخدم العلاقة $V = \\varepsilon + Ir$. بالتعويض: $V = 6V + (2A \\times 0.5\\Omega) = 6V + 1V = 7V$.'
  },
  {
    questionText: 'لتحليل دارة كهربائية تحتوي على عدة بطاريات ومقاومات، أي من القوانين التالية يعتبر الأساس؟',
    options: ['قانون أوم فقط', 'قوانين توصيل المقاومات فقط', 'قاعدتا كيرشوف', 'قانون كولوم'],
    correctAnswerIndex: 2,
    explanation: 'بينما قانون أوم وقوانين التوصيل مفيدة، فإن قاعدتي كيرشوف (قاعدة الوصلة وقاعدة العروة) هما القانونان الأساسيان اللذان يمكن من خلالهما حل أي دارة كهربائية، مهما كانت درجة تعقيدها.'
  },
];

export default function VoltageChangesP2QuizPage() {
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
