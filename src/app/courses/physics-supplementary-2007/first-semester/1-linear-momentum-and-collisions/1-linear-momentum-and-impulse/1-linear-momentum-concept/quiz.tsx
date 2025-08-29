
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
    questionText: 'أي من الكميات التالية هي كمية فيزيائية متجهة؟',
    options: ['الكتلة', 'السرعة القياسية', 'الزخم الخطي', 'الطاقة الحركية'],
    correctAnswerIndex: 2,
    explanation: 'الزخم الخطي كمية متجهة لأنه حاصل ضرب الكتلة (كمية قياسية) في السرعة المتجهة (كمية متجهة)، واتجاهه هو نفس اتجاه السرعة.'
  },
  {
    questionText: 'سيارة كتلتها $1000 kg$ تتحرك بسرعة $20 m/s$ شرقًا. ما مقدار زخمها الخطي؟',
    options: ['$20,000 kg \\cdot m/s$ شرقًا', '$50 kg \\cdot m/s$ شرقًا', '$20,000 kg/m \\cdot s$ شرقًا', '$200,000 kg \\cdot m/s$ شرقًا'],
    correctAnswerIndex: 0,
    explanation: 'الزخم الخطي (p) = الكتلة (m) × السرعة (v). إذن، $p = 1000 kg \\times 20 m/s = 20,000 kg \\cdot m/s$. الاتجاه هو نفس اتجاه السرعة، أي شرقًا.'
  },
  {
    questionText: 'ما هي وحدة قياس الزخم الخطي في النظام الدولي للوحدات (SI)؟',
    options: ['نيوتن (N)', '$kg/s$', '$kg \\cdot m/s$', 'جول (J)'],
    correctAnswerIndex: 2,
    explanation: 'وحدة الزخم هي حاصل ضرب وحدة الكتلة (kg) في وحدة السرعة (m/s)، فتكون الوحدة هي $kg \\cdot m/s$.'
  },
  {
    questionText: 'إذا تضاعفت سرعة جسم مع بقاء كتلته ثابتة، فإن زخمه الخطي...',
    options: ['يتضاعف', 'يقل إلى النصف', 'يبقى ثابتًا', 'يزداد أربع مرات'],
    correctAnswerIndex: 0,
    explanation: 'بما أن الزخم يتناسب طرديًا مع السرعة ($p = mv$)، فعندما تتضاعف السرعة، يتضاعف الزخم الخطي أيضًا.'
  },
  {
    questionText: 'جسمان A و B لهما نفس الزخم الخطي. إذا كانت كتلة الجسم A ضعف كتلة الجسم B، فإن سرعة الجسم A تكون...',
    options: ['ضعف سرعة B', 'نصف سرعة B', 'تساوي سرعة B', 'ربع سرعة B'],
    correctAnswerIndex: 1,
    explanation: 'لدينا $p_A = p_B$, إذن $m_A v_A = m_B v_B$. بما أن $m_A = 2m_B$, نعوض في المعادلة: $(2m_B) v_A = m_B v_B$. بقسمة الطرفين على $m_B$, نحصل على $2v_A = v_B$, أي أن $v_A = \\frac{1}{2} v_B$.'
  },
];

export default function LinearMomentumConceptQuizPage() {
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

