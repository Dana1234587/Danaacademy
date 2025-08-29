
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
    questionText: 'ما هي صيغة الزخم الزاوي (L) لجسم جاسئ يدور حول محور ثابت؟',
    options: ['$L = mv$', '$L = I\\alpha$', '$L = I\\omega$', '$L = \\frac{1}{2}I\\omega^2$'],
    correctAnswerIndex: 2,
    explanation: 'الزخم الزاوي (L) لجسم جاسئ هو حاصل ضرب عزم قصوره الذاتي (I) في سرعته الزاوية (ω). هذا هو المفهوم الموازي للزخم الخطي $p=mv$.'
  },
  {
    questionText: 'ما هي وحدة قياس الزخم الزاوي في النظام الدولي للوحدات (SI)؟',
    options: ['$kg \\cdot m/s$', '$kg \\cdot m^2/s$', '$N \\cdot m$', '$J/s$'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $L = I\\omega$, وحدة I هي $kg \\cdot m^2$ ووحدة ω هي $rad/s$ (والراديان ليس له وحدة أساسية). إذن، وحدة L هي $kg \\cdot m^2/s$. وهي تكافئ أيضًا $J \\cdot s$.'
  },
  {
    questionText: 'قرص مصمت كتلته 4 كجم ونصف قطره 1 م يدور بسرعة زاوية 5 راد/ث. ما مقدار زخمه الزاوي؟ ($I_{قرص} = \\frac{1}{2}MR^2$)',
    options: ['$5 kg \\cdot m^2/s$', '$10 kg \\cdot m^2/s$', '$20 kg \\cdot m^2/s$', '$40 kg \\cdot m^2/s$'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نحسب عزم القصور الذاتي: $I = \\frac{1}{2}(4)(1)^2 = 2 kg \\cdot m^2$. \n ثانيًا، نحسب الزخم الزاوي: $L = I\\omega = (2 kg \\cdot m^2)(5 rad/s) = 10 kg \\cdot m^2/s$.'
  },
  {
    questionText: 'ما هي الصيغة الدورانية لقانون نيوتن الثاني بدلالة الزخم الزاوي؟',
    options: ['$\\Sigma \\tau = I\\alpha$', '$\\Sigma \\tau = \\frac{\\Delta L}{\\Delta t}$', '$\\Sigma F = \\frac{\\Delta L}{\\Delta t}$', '$\\Sigma L = I\\alpha$'],
    correctAnswerIndex: 1,
    explanation: 'تمامًا كما أن القوة المحصلة هي المعدل الزمني للتغير في الزخم الخطي، فإن العزم المحصل هو المعدل الزمني للتغير في الزخم الزاوي. $\\Sigma \\tau = \\frac{\\Delta L}{\\Delta t}$.'
  },
  {
    questionText: 'الزخم الزاوي هو كمية متجهة. ما هو اتجاهه؟',
    options: ['بنفس اتجاه السرعة الخطية', 'بنفس اتجاه متجه الموضع', 'بنفس اتجاه السرعة الزاوية', 'دائمًا نحو مركز الدوران'],
    correctAnswerIndex: 2,
    explanation: 'الزخم الزاوي كمية متجهة، واتجاهه هو نفس اتجاه متجه السرعة الزاوية (ω)، والذي يتم تحديده باستخدام قاعدة اليد اليمنى (اتجاه محور الدوران).'
  },
];

export default function AngularMomentumQuizPage() {
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
