
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
    questionText: 'ما هو مصدر المجال المغناطيسي؟',
    options: ['الشحنات الكهربائية الساكنة', 'الشحنات الكهربائية المتحركة (التيارات)', 'المجالات الكهربائية الثابتة', 'الكتلة'],
    correctAnswerIndex: 1,
    explanation: 'المصدر الأساسي للمجال المغناطيسي هو حركة الشحنات الكهربائية، والتي تشكل تيارًا كهربائيًا. هذا هو اكتشاف أورستد الأساسي.'
  },
  {
    questionText: 'أي من العبارات التالية تصف خطوط المجال المغناطيسي بشكل صحيح؟',
    options: ['تبدأ من القطب الشمالي وتنتهي عند القطب الجنوبي داخل المغناطيس', 'هي مسارات مفتوحة تبدأ من الشحنات الموجبة وتنتهي عند السالبة', 'هي مسارات مغلقة لا تتقاطع أبدًا', 'تتقاطع عند الأقطاب المغناطيسية'],
    correctAnswerIndex: 2,
    explanation: 'خطوط المجال المغناطيسي هي دائمًا مسارات مغلقة (حلقات)، تخرج من القطب الشمالي وتدخل في الجنوبي خارج المغناطيس، وتكمل مسارها داخل المغناطيس. وهي لا تتقاطع أبدًا.'
  },
  {
    questionText: 'عند وضع بوصلة في مجال مغناطيسي، إلى ماذا يشير قطبها الشمالي؟',
    options: ['اتجاه القطب الشمالي الجغرافي دائمًا', 'اتجاه القوة المغناطيسية', 'اتجاه خط المجال المغناطيسي عند تلك النقطة', 'عكس اتجاه خط المجال المغناطيسي'],
    correctAnswerIndex: 2,
    explanation: 'يُعرَّف اتجاه المجال المغناطيسي عند نقطة ما بأنه الاتجاه الذي سيشير إليه القطب الشمالي لإبرة بوصلة حرة الحركة موضوعة عند تلك النقطة.'
  },
  {
    questionText: 'ما هو قانون بيو-سافار؟',
    options: ['قانون يصف القوة على شحنة متحركة', 'قانون يصف القوة بين سلكين متوازيين', 'قانون لحساب المجال المغناطيسي الناتج عن عنصر تيار صغير', 'قانون يصف التدفق المغناطيسي'],
    correctAnswerIndex: 2,
    explanation: 'قانون بيو-سافار هو القانون الأساسي الذي يسمح لنا بحساب المجال المغناطيسي ($d\\vec{B}$) الناتج عن عنصر صغير جدًا من سلك يمر به تيار ($I d\\vec{l}$).'
  },
  {
    questionText: 'وحدة قياس شدة المجال المغناطيسي (B) في النظام الدولي هي:',
    options: ['ويبر (Wb)', 'هنري (H)', 'تسلا (T)', 'فاراد (F)'],
    correctAnswerIndex: 2,
    explanation: 'وحدة قياس شدة المجال المغناطيسي في النظام الدولي للوحدات هي التسلا (Tesla)، وتُرمز لها بالرمز T.'
  },
];

export default function MagneticFieldConceptQuizPage() {
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
