
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
    questionText: 'في دارة مقاومة صرفة، ما هي زاوية الطور بين الجهد والتيار؟',
    options: ['$90^\\circ$', '$-90^\\circ$', '$0^\\circ$', '$180^\\circ$'],
    correctAnswerIndex: 2,
    explanation: 'في المقاومة الصرفة، الجهد والتيار متفقان في الطور، أي أن الزاوية بينهما صفر.'
  },
  {
    questionText: 'ما هي وحدة قياس كل من المفاعلة الحثية، المفاعلة المواسعية، والمعاوقة؟',
    options: ['هنري، فاراد، أوم', 'أوم، أوم، أوم', 'فولت، فولت، فولت', 'واط، واط، واط'],
    correctAnswerIndex: 1,
    explanation: 'جميع هذه الكميات (المفاعلة الحثية $X_L$, المفاعلة المواسعية $X_C$, والمعاوقة Z) تمثل نوعًا من الممانعة لمرور التيار، وبالتالي تُقاس جميعها بوحدة الأوم ($\\Omega$).'
  },
  {
    questionText: 'في حالة الرنين في دارة RLC على التوالي، فإن المعاوقة الكلية للدارة تساوي...',
    options: ['صفر', '$X_L$', '$X_C$', 'R'],
    correctAnswerIndex: 3,
    explanation: 'عند الرنين، $X_L = X_C$, وبالتالي فإن مصطلح $(X_L - X_C)$ في قانون المعاوقة يصبح صفرًا. $Z = \\sqrt{R^2 + 0^2} = R$.'
  },
  {
    questionText: 'إذا كان الجهد يسبق التيار في دارة RLC، فإن الدارة لها خصائص...',
    options: ['مواسعية ($X_C > X_L$)', 'حثية ($X_L > X_C$)', 'مقاومية ($X_L = X_C$)', 'لا يمكن تحديدها'],
    correctAnswerIndex: 1,
    explanation: 'عندما يسبق الجهد التيار، تكون زاوية الطور موجبة، وهذا يحدث عندما تكون المفاعلة الحثية أكبر من المفاعلة المواسعية، مما يعطي الدارة طابعًا حثيًا.'
  },
  {
    questionText: 'ما هو عامل القدرة (Power Factor) في دارة RLC؟',
    options: ['$\\sin(\\phi)$', '$\\cos(\\phi)$', '$\\tan(\\phi)$', '$Z/R$'],
    correctAnswerIndex: 1,
    explanation: 'عامل القدرة هو النسبة بين القدرة الحقيقية المستهلكة في المقاومة والقدرة الظاهرية التي يسحبها المصدر. ويساوي جيب تمام زاوية الطور: $\\cos(\\phi) = R/Z$.'
  },
];

export default function ACCircuitsSummaryQuizPage() {
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
