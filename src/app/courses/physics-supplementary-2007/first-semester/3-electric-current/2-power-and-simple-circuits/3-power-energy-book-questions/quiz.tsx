
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
    questionText: 'مدفأة كهربائية مقاومتها 48.4 أوم، تعمل على فرق جهد 242 فولت. ما مقدار القدرة التي تستهلكها المدفأة؟',
    options: ['5 واط', '500 واط', '1210 واط', '11.7 كيلوواط'],
    correctAnswerIndex: 2,
    explanation: 'نستخدم صيغة القدرة $P = V^2 / R$. \n $P = (242V)^2 / 48.4\\Omega = 58564 / 48.4 = 1210$ واط.'
  },
  {
    questionText: 'جهاز كهربائي قدرته 100 واط يعمل لمدة 5 دقائق. ما مقدار الطاقة الكهربائية التي يستهلكها بالجول؟',
    options: ['500 جول', '1200 جول', '30000 جول', '20 جول'],
    correctAnswerIndex: 2,
    explanation: 'الطاقة (E) = القدرة (P) × الزمن (t). \n يجب تحويل الزمن إلى ثواني: 5 دقائق = $5 \\times 60 = 300$ ثانية. \n $E = 100W \\times 300s = 30000$ جول.'
  },
  {
    questionText: 'ما هي وحدة الكيلوواط-ساعة (kWh)؟',
    options: ['وحدة قدرة', 'وحدة طاقة', 'وحدة تيار', 'وحدة جهد'],
    correctAnswerIndex: 1,
    explanation: 'الكيلوواط هي وحدة قدرة، والساعة هي وحدة زمن. حاصل ضرب القدرة في الزمن يعطي الطاقة. هذه هي الوحدة التي تستخدمها شركات الكهرباء لحساب استهلاك الطاقة.'
  },
  {
    questionText: 'بطارية سيارة قوتها الدافعة 12 فولت ومقاومتها الداخلية 0.05 أوم. إذا كانت تزود المارش بتيار 30 أمبير، فما القدرة التي تصل إلى المارش؟',
    options: ['360 واط', '315 واط', '45 واط', '405 واط'],
    correctAnswerIndex: 1,
    explanation: 'القدرة التي تصل للمارش هي القدرة الخارجية. \n أولاً نحسب فرق الجهد الطرفي: $V = \\varepsilon - Ir = 12 - (30 \\times 0.05) = 12 - 1.5 = 10.5$ فولت. \n القدرة الخارجية $P_{out} = VI = 10.5V \\times 30A = 315$ واط.'
  },
  {
    questionText: 'مقاومتان، R1 و R2، موصولتان على التوازي. إذا كانت R1 > R2، فأي مقاومة تستهلك قدرة أكبر؟',
    options: ['R1 تستهلك قدرة أكبر', 'R2 تستهلك قدرة أكبر', 'تستهلكان نفس القدرة', 'يعتمد على قيمة البطارية'],
    correctAnswerIndex: 1,
    explanation: 'في التوصيل على التوازي، يكون فرق الجهد متساويًا عبر المقاومتين. نستخدم العلاقة $P = V^2/R$. بما أن V ثابتة، فإن القدرة تتناسب عكسيًا مع المقاومة. المقاومة الأصغر (R2) تستهلك قدرة أكبر.'
  },
];

export default function PowerEnergyBookQuestionsQuizPage() {
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
