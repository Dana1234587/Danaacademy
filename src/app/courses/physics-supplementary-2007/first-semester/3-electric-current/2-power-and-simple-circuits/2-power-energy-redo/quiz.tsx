
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
    questionText: 'ما هي وحدة قياس القدرة الكهربائية في النظام الدولي؟',
    options: ['جول (J)', 'كولوم (C)', 'واط (W)', 'فولت (V)'],
    correctAnswerIndex: 2,
    explanation: 'وحدة قياس القدرة هي الواط (Watt)، والذي يكافئ جول لكل ثانية (J/s).'
  },
  {
    questionText: 'بطارية قوتها الدافعة $\\varepsilon$ ومقاومتها الداخلية $r$. القدرة العظمى التي يمكن أن تقدمها هذه البطارية للدارة الخارجية تحدث عندما...',
    options: ['تكون المقاومة الخارجية صغيرة جدًا (تؤول لصفر)', 'تكون المقاومة الخارجية كبيرة جدًا (تؤول للمالانهاية)', 'تكون المقاومة الخارجية مساوية للمقاومة الداخلية ($R=r$)', 'لا تعتمد على المقاومة الخارجية'],
    correctAnswerIndex: 2,
    explanation: 'تحدث القدرة العظمى المنقولة إلى المقاومة الخارجية عندما تتساوى قيمة المقاومة الخارجية مع قيمة المقاومة الداخلية للبطارية. هذا مبدأ مهم في نقل القدرة.'
  },
  {
    questionText: 'مصباحان، الأول مقاومته R والثاني مقاومته 2R. إذا وصلا على التوالي ببطارية، فإن...',
    options: ['قدرة المصباح الأول ضعف قدرة الثاني', 'قدرة المصباح الثاني ضعف قدرة الأول', 'قدرة المصباح الثاني أكبر بأربع مرات', 'قدرة المصباح الأول نصف قدرة الثاني'],
    correctAnswerIndex: 1,
    explanation: 'في التوصيل على التوالي، يمر نفس التيار (I) في كلا المصباحين. القدرة $P = I^2R$. بما أن التيار ثابت، فإن القدرة تتناسب طرديًا مع المقاومة. المصباح ذو المقاومة الأكبر (2R) سيستهلك قدرة أكبر. $P_2 = I^2(2R) = 2(I^2R) = 2P_1$.'
  },
  {
    questionText: 'مصباحان، الأول مقاومته R والثاني مقاومته 2R. إذا وصلا على التوازي ببطارية، فإن...',
    options: ['قدرة المصباح الأول ضعف قدرة الثاني', 'قدرة المصباح الثاني ضعف قدرة الأول', 'قدرة المصباح الثاني أكبر بأربع مرات', 'لهما نفس القدرة'],
    correctAnswerIndex: 0,
    explanation: 'في التوصيل على التوازي، يكون فرق الجهد (V) متساويًا عبر كلا المصباحين. القدرة $P = V^2/R$. بما أن الجهد ثابت، فإن القدرة تتناسب عكسيًا مع المقاومة. المصباح ذو المقاومة الأقل (R) سيستهلك قدرة أكبر. $P_1 = V^2/R$ و $P_2 = V^2/(2R)$, إذن $P_1 = 2P_2$.'
  },
  {
    questionText: 'الطاقة الكهربائية (E) والقدرة (P) والزمن (t) ترتبط بالعلاقة:',
    options: ['$E = P/t$', '$E = Pt$', '$P = Et$', '$t = EP$'],
    correctAnswerIndex: 1,
    explanation: 'القدرة هي معدل استهلاك الطاقة، أي الطاقة لكل وحدة زمن. لذلك، الطاقة المستهلكة تساوي حاصل ضرب القدرة في الزمن الذي عمل فيه الجهاز.'
  },
];

export default function PowerEnergyRedoQuizPage() {
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
