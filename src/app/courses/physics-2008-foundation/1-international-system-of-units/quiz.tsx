
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
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const quizQuestions = [
  {
    questionText: 'أي من التالية هي وحدة أساسية في النظام الدولي للوحدات (SI)؟',
    options: ['النيوتن (N)', 'الجول (J)', 'الكيلوغرام (kg)', 'الواط (W)'],
    correctAnswerIndex: 2,
    explanation: 'الكيلوغرام هو الوحدة الأساسية لقياس الكتلة في النظام الدولي. النيوتن والجول والواط هي وحدات مشتقة.'
  },
  {
    questionText: 'وحدة القوة، النيوتن (N)، تكافئ أي من الوحدات الأساسية التالية؟',
    options: ['$kg \\cdot m/s$', '$kg \\cdot m^2/s^2$', '$kg \\cdot m/s^2$', '$kg/m \\cdot s$'],
    correctAnswerIndex: 2,
    explanation: 'من قانون نيوتن الثاني، $F=ma$. وحدة الكتلة (m) هي kg، ووحدة التسارع (a) هي $m/s^2$. إذن، النيوتن يكافئ $kg \\cdot m/s^2$.'
  },
  {
    questionText: 'إذا كانت معادلة ما هي $v = at$, حيث v هي السرعة و t هو الزمن، فما هي وحدة التسارع a لكي تكون المعادلة متجانسة؟',
    options: ['$m/s$', '$m \\cdot s$', '$s/m$', '$m/s^2$'],
    correctAnswerIndex: 3,
    explanation: 'لكي تكون المعادلة متجانسة، يجب أن تكون وحدة الطرف الأيسر (m/s) مساوية لوحدة الطرف الأيمن. وحدة الطرف الأيمن هي (وحدة a) × (وحدة t). إذن، $m/s = (\\text{وحدة a}) \\times s$. بقسمة الطرفين على s، نجد أن وحدة a يجب أن تكون $m/s^2$.'
  },
  {
    questionText: 'أي كمية فيزيائية تقاس بوحدة الجول (J)؟',
    options: ['القوة', 'القدرة', 'الطاقة', 'الزخم'],
    correctAnswerIndex: 2,
    explanation: 'الجول هو وحدة قياس الطاقة أو الشغل في النظام الدولي. وهو يكافئ $N \\cdot m$ أو $kg \\cdot m^2/s^2$.'
  },
  {
    questionText: 'أي من القوانين الآتية يمكن أن يكون صحيحًا لوصف قوة (مثل القوة المركزية) بناءً على تحليل الوحدات؟',
    options: ['$F = mv/r^2$', '$F = mv^2/r$', '$F = m^2v/r$', '$F = vr/m$'],
    correctAnswerIndex: 1,
    explanation: 'وحدة القوة هي النيوتن ($kg \\cdot m/s^2$). بالتحقق من الخيار الصحيح (ب):\nصيغة القانون: $F = \\frac{mv^2}{r}$\nتحليل الوحدات: $\\frac{kg \\cdot (m/s)^2}{m} = \\frac{kg \\cdot m^2/s^2}{m} = kg \\cdot m/s^2$. هذه الوحدة تكافئ النيوتن، إذن هذا هو القانون المحتمل.'
  },
];

export default function QuizPage() {
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
