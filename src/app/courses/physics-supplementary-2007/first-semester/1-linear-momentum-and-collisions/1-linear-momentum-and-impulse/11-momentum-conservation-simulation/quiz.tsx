
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
    questionText: 'في نظام معزول يتكون من جسمين متصادمين، أي كمية فيزيائية تبقى محفوظة دائمًا؟',
    options: ['الطاقة الحركية الكلية', 'الزخم الخطي الكلي', 'سرعة كل جسم', 'طاقة كل جسم الحركية'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الخطي الكلي لنظام معزول (لا تؤثر عليه قوى خارجية محصلة) يبقى محفوظًا دائمًا، بغض النظر عن نوع التصادم (مرن أو غير مرن).'
  },
  {
    questionText: 'في التصادم المرن تمامًا، أي من العبارات التالية صحيحة؟',
    options: ['الزخم محفوظ والطاقة الحركية غير محفوظة', 'الزخم غير محفوظ والطاقة الحركية محفوظة', 'الزخم والطاقة الحركية كلاهما محفوظ', 'الزخم والطاقة الحركية كلاهما غير محفوظ'],
    correctAnswerIndex: 2,
    explanation: 'التصادم المرن هو تصادم مثالي يتم فيه حفظ الزخم الخطي الكلي والطاقة الحركية الكلية للنظام.'
  },
  {
    questionText: 'في التصادم عديم المرونة تمامًا، ماذا يحدث للجسمين بعد التصادم؟',
    options: ['يرتدان عن بعضهما بسرعات مختلفة', 'يتبادلان السرعات', 'يلتحمان ويتحركان معًا كجسم واحد', 'يتوقفان تمامًا'],
    correctAnswerIndex: 2,
    explanation: 'في التصادم عديم المرونة، يلتحم الجسمان المتصادمان ويتحركان معًا بنفس السرعة النهائية. هذا النوع من التصادمات يشهد أكبر قدر من فقدان الطاقة الحركية.'
  },
  {
    questionText: 'عندما تشاهد محاكاة لتصادم غير مرن (ليس عديم المرونة)، ماذا تلاحظ بشأن الطاقة الحركية الكلية للنظام؟',
    options: ['تزداد بعد التصادم', 'تبقى ثابتة', 'تتناقص بعد التصادم', 'تصبح صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'في أي تصادم غير مرن، يتم فقدان جزء من الطاقة الحركية الكلية وتحويلها إلى أشكال أخرى من الطاقة مثل الحرارة أو الصوت أو التشوه. لذلك، الطاقة الحركية النهائية تكون أقل من الابتدائية.'
  },
  {
    questionText: 'إذا اصطدمت كرة بلياردو بيضاء متحركة بكرة أخرى حمراء ساكنة ومماثلة لها في الكتلة تصادمًا مرنًا، ماذا يحدث بعد التصادم حسب ما تظهره المحاكاة؟',
    options: ['تتوقف الكرة البيضاء وتتحرك الحمراء بنفس سرعة البيضاء الابتدائية', 'ترتد الكرة البيضاء للخلف', 'تتحرك الكرتان معًا', 'تتحركان في اتجاهين متعامدين'],
    correctAnswerIndex: 0,
    explanation: 'هذه حالة خاصة ومشهورة في التصادمات المرنة. عندما تصطدم كتلة بكتلة أخرى مماثلة لها وساكنة، فإنهما "تتبادلان السرعات". الكرة المتحركة تتوقف، والساكنة تتحرك بنفس سرعة واتجاه الكرة الأولى.'
  },
];

export default function MomentumConservationSimulationQuizPage() {
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
