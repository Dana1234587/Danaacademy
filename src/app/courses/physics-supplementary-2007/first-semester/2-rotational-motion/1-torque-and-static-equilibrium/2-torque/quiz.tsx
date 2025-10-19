
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
    questionText: 'ما هو التعريف الفيزيائي للعزم؟',
    options: ['مقدرة القوة على إحداث حركة انتقالية', 'مقدرة القوة على إحداث حركة دورانية', 'معدل التغير في الزخم', 'الشغل المبذول بواسطة قوة'],
    correctAnswerIndex: 1,
    explanation: 'العزم (Torque) هو مقياس لمقدرة قوة على إحداث دوران لجسم حول محور معين.'
  },
  {
    questionText: 'في أي من الحالات التالية يكون العزم الناتج عن قوة F حول محور دوران O يساوي صفرًا؟',
    options: ['عندما تكون القوة عمودية على ذراعها', 'عندما تكون الزاوية بين القوة وذراعها 45 درجة', 'عندما يمر خط عمل القوة بمحور الدوران', 'عندما تكون القوة كبيرة جدًا'],
    correctAnswerIndex: 2,
    explanation: 'ينعدم العزم ($τ = rFsinθ$) عندما يكون ذراع القوة $r=0$ أو عندما تكون الزاوية $θ=0$ أو $180$ درجة. كلتا الحالتين تعنيان أن خط عمل القوة يمر عبر محور الدوران.'
  },
  {
    questionText: 'قوة مقدارها 10 نيوتن تؤثر عموديًا على نهاية قضيب طوله 2 متر. ما مقدار العزم حول محور دوران عند الطرف الآخر للقضيب؟',
    options: ['$5 N \\cdot m$', '$10 N \\cdot m$', '$20 N \\cdot m$', '$0 N \\cdot m$'],
    correctAnswerIndex: 2,
    explanation: 'العزم $τ = r \\times F$. بما أن القوة عمودية، فإن $τ = (2 m) \\times (10 N) = 20 N \\cdot m$.'
  },
  {
    questionText: 'قوة مقدارها 40 نيوتن تؤثر على بعد 20 سم من محور دوران بزاوية 30 درجة مع ذراع القوة. ما مقدار العزم؟',
    options: ['$8 N \\cdot m$', '$4 N \\cdot m$', '$2 N \\cdot m$', '$10 N \\cdot m$'],
    correctAnswerIndex: 1,
    explanation: 'العزم $τ = rF\\sin(θ)$. يجب تحويل المسافة إلى متر: $r = 20 cm = 0.2 m$. \n $τ = (0.2 m)(40 N)\\sin(30^\\circ) = 8 \\times 0.5 = 4 N \\cdot m$.'
  },
  {
    questionText: 'إذا أثرت بنفس القوة على مفتاح ربط في نقاط مختلفة، فمتى يكون العزم أكبر ما يمكن؟',
    options: ['عند التأثير في أقرب نقطة من محور الدوران', 'عند التأثير في أبعد نقطة عن محور الدوران', 'عند التأثير في منتصف المفتاح', 'مقدار العزم لا يعتمد على نقطة التأثير'],
    correctAnswerIndex: 1,
    explanation: 'العزم يتناسب طرديًا مع ذراع القوة ($τ = rFsinθ$). للحصول على أكبر عزم بنفس القوة، يجب أن نزيد ذراع القوة (r) إلى أقصى حد ممكن، أي بالتأثير في أبعد نقطة عن محور الدوران.'
  },
];

export default function TorqueQuizPage() {
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
