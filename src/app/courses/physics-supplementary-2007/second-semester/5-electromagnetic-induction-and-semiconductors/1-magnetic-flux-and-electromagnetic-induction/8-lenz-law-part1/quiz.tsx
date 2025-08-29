
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
    questionText: 'قانون لنز هو تعبير عن أي من مبادئ الحفظ التالية؟',
    options: ['حفظ الشحنة', 'حفظ الزخم', 'حفظ الطاقة', 'حفظ الكتلة'],
    correctAnswerIndex: 2,
    explanation: 'قانون لنز هو مظهر من مظاهر مبدأ حفظ الطاقة. الشغل المبذول لتقريب المغناطيس (أو أي تغيير آخر) هو الذي يتحول إلى طاقة كهربائية في الحلقة. لو كان التيار الحثي يساعد الحركة، لحصلنا على طاقة من لا شيء، وهذا يخالف مبدأ حفظ الطاقة.'
  },
  {
    questionText: 'عند تقريب قطب شمالي من حلقة موصلة، ما هو اتجاه التيار الحثي المتولد في الحلقة (عند النظر إليها من جهة المغناطيس)؟',
    options: ['مع عقارب الساعة', 'عكس عقارب الساعة', 'لا يتولد تيار', 'يعتمد على سرعة المغناطيس'],
    correctAnswerIndex: 1,
    explanation: 'ل مقاومة الزيادة في التدفق (الناتج عن اقتراب القطب الشمالي)، ستولد الحلقة مجالًا مغناطيسيًا خاصًا بها يكون قطبه الشمالي مواجهًا للمغناطيس. باستخدام قاعدة اليد اليمنى، لإنتاج قطب شمالي، يجب أن يكون التيار عكس اتجاه عقارب الساعة.'
  },
  {
    questionText: 'عند إبعاد قطب جنوبي عن حلقة موصلة، ما هو نوع القطب المغناطيسي الذي يتكون في وجه الحلقة القريب من المغناطيس؟',
    options: ['قطب شمالي', 'قطب جنوبي', 'لا يتكون أي قطب', 'يعتمد على المادة'],
    correctAnswerIndex: 0,
    explanation: 'ل مقاومة النقصان في التدفق (الناتج عن ابتعاد القطب الجنوبي)، ستحاول الحلقة توليد قوة تجاذب. لذا، ستكون وجه الحلقة القريب قطبًا شماليًا ليجذب القطب الجنوبي المبتعد.'
  },
  {
    questionText: 'ماذا تعني الإشارة السالبة في قانون فارادي $\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t}$؟',
    options: ['أن القوة الدافعة سالبة دائمًا', 'أن الزمن سالب', 'أن التيار الحثي يقاوم التغير المسبب له', 'أن عدد اللفات يتناقص'],
    correctAnswerIndex: 2,
    explanation: 'الإشارة السالبة هي التعبير الرياضي عن قانون لنز، وتشير إلى أن القوة الدافعة الحثية (والتيار الحثي) تتولد في اتجاه يعاكس أو يقاوم التغير في التدفق المغناطيسي الذي أدى إلى توليدها.'
  },
  {
    questionText: 'حلقة تسقط سقوطًا حرًا وتدخل منطقة مجال مغناطيسي منتظم يتجه إلى داخل الصفحة. ما اتجاه التيار الحثي في الحلقة أثناء دخولها المجال؟',
    options: ['مع عقارب الساعة', 'عكس عقارب الساعة', 'لا يوجد تيار حثي', 'للأعلى'],
    correctAnswerIndex: 1,
    explanation: 'أثناء دخول الحلقة، يزداد التدفق المغناطيسي الداخل إلى الصفحة. لمقاومة هذه الزيادة، ستولد الحلقة تيارًا ينتج مجالًا مغناطيسيًا خاصًا بها يكون اتجاهه خارجًا من الصفحة. باستخدام قاعدة اليد اليمنى، يكون اتجاه التيار عكس عقارب الساعة.'
  },
];

export default function LenzLawPart1QuizPage() {
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
