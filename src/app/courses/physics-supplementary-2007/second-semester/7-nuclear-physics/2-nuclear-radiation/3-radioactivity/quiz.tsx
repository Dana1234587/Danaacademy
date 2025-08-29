
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
    questionText: 'ما هو تعريف عمر النصف (T½)؟',
    options: ['الزمن الذي تستغرقه العينة لتفقد كل نشاطيتها.', 'نصف عمر العينة.', 'الزمن اللازم لاضمحلال نصف عدد الأنوية المشعة في العينة.', 'الزمن اللازم ليتضاعف النشاط الإشعاعي.'],
    correctAnswerIndex: 2,
    explanation: 'عمر النصف هو مقياس ثابت ومميز لكل نظير مشع، ويمثل الفترة الزمنية التي يحتاجها نصف عدد الأنوية في أي عينة لتضمحل.'
  },
  {
    questionText: 'عينة من مادة مشعة عمر النصف لها 10 سنوات. ما هي النسبة المتبقية من المادة الأصلية بعد 30 سنة؟',
    options: ['1/2', '1/4', '1/8', '1/16'],
    correctAnswerIndex: 2,
    explanation: 'بعد 10 سنوات (عمر نصف واحد)، يتبقى 1/2. \n بعد 20 سنة (عمر نصف ثانٍ)، يتبقى (1/2) من النصف، أي 1/4. \n بعد 30 سنة (عمر نصف ثالث)، يتبقى (1/2) من الربع، أي 1/8.'
  },
  {
    questionText: 'ثابت الاضمحلال ($\\lambda$) لنظير مشع كبير. هذا يعني أن النظير...',
    options: ['يضمحل ببطء شديد وله عمر نصف طويل.', 'يضمحل بسرعة وله عمر نصف قصير.', 'مستقر تمامًا.', 'له عدد كتلي كبير.'],
    correctAnswerIndex: 1,
    explanation: 'العلاقة بين عمر النصف وثابت الاضمحلال هي $T_{1/2} = 0.693 / \\lambda$. هذه علاقة عكسية. ثابت اضمحلال كبير يعني أن احتمالية اضمحلال النواة في الثانية الواحدة كبيرة، وبالتالي فإن المادة تضمحل بسرعة ويكون عمر النصف لها قصيرًا.'
  },
  {
    questionText: 'ما هي وحدة النشاطية الإشعاعية في النظام الدولي (SI)؟',
    options: ['كوري (Ci)', 'رونتجن (R)', 'بكريل (Bq)', 'غراي (Gy)'],
    correctAnswerIndex: 2,
    explanation: 'وحدة النشاطية الإشعاعية في النظام الدولي هي البكريل (Becquerel)، وتعرف بأنها اضمحلال واحد في الثانية (1 Bq = 1 dps).'
  },
  {
    questionText: 'إذا كان لديك $N_0$ من الأنوية المشعة في البداية، فكم عدد الأنوية المتبقية بعد مرور زمن يساوي أربعة أضعاف عمر النصف؟',
    options: ['$N_0/4$', '$N_0/8$', '$N_0/16$', 'صفر'],
    correctAnswerIndex: 2,
    explanation: 'بعد كل عمر نصف، يتضاعف المقام في الكسر المتبقي: \n $1 T_{1/2} \\rightarrow N_0/2$ \n $2 T_{1/2} \\rightarrow N_0/4$ \n $3 T_{1/2} \\rightarrow N_0/8$ \n $4 T_{1/2} \\rightarrow N_0/16$.'
  },
];

export default function RadioactivityQuizPage() {
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
