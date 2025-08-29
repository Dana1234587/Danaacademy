
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
    questionText: 'سلك مستقيم لانهائي يمر به تيار I يتزايد مع الزمن. وُضعت بجانبه حلقة موصلة. ما اتجاه التيار الحثي في الحلقة؟',
    options: ['مع عقارب الساعة', 'عكس عقارب الساعة', 'لا يتولد تيار', 'يعتمد على شكل الحلقة'],
    correctAnswerIndex: 0,
    explanation: 'بافتراض أن السلك أسفل الحلقة والتيار فيه نحو اليمين. ينتج السلك مجالًا مغناطيسيًا يخرج من الصفحة عبر الحلقة. بما أن التيار يتزايد، فإن التدفق الخارج من الصفحة يزداد. لمقاومة هذه الزيادة، ستولد الحلقة تيارًا ينتج مجالًا معاكسًا (إلى داخل الصفحة). باستخدام قاعدة اليد اليمنى، يكون اتجاه التيار مع عقارب الساعة.'
  },
  {
    questionText: 'عندما يسقط مغناطيس عبر حلقة نحاسية، فإن تسارعه يكون...',
    options: ['أكبر من تسارع الجاذبية (g)', 'أصغر من تسارع الجاذبية (g)', 'يساوي تسارع الجاذبية (g)', 'صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'أثناء سقوط المغناطيس، يتولد تيار حثي في الحلقة. هذا التيار يولد مجالًا مغناطيسيًا يقاوم حركة المغناطيس دائمًا (قوة تنافر عند الاقتراب وقوة تجاذب عند الابتعاد). هذه القوة المغناطيسية المعاكسة للحركة تقلل من التسارع الكلي للمغناطيس، ليصبح أقل من g.'
  },
  {
    questionText: 'موصل مستقيم يتحرك بسرعة v إلى اليمين في مجال مغناطيسي منتظم يتجه إلى داخل الصفحة. ما هو اتجاه القوة المغناطيسية المؤثرة على الإلكترونات الحرة داخل الموصل؟',
    options: ['إلى الأعلى', 'إلى الأسفل', 'إلى اليمين', 'إلى اليسار'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم قاعدة اليد اليمنى. نوجه الأصابع مع السرعة (يمينًا) والمجال يخرج من راحة اليد (إلى داخل الصفحة). يشير الإبهام إلى الأعلى، وهو اتجاه القوة على الشحنات الموجبة. بما أن الإلكترونات شحناتها سالبة، فإن القوة المؤثرة عليها تكون في الاتجاه المعاكس، أي إلى الأسفل.'
  },
  {
    questionText: 'في الشكل المجاور، ماذا يحدث لإضاءة المصباح عندما يتحرك المغناطيس مبتعدًا عن الملف؟',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تصبح صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'ابتعاد المغناطيس يقلل التدفق المغناطيسي عبر الملف. وفقًا لقانون لنز، سيتولد تيار حثي يحاول مقاومة هذا النقصان عن طريق توليد مجال مغناطيسي في نفس اتجاه المجال الأصلي، مما يؤدي إلى مرور تيار في المصباح وزيادة إضاءته لحظيًا.'
  },
  {
    questionText: 'إذا تم استبدال الحلقة النحاسية في السؤال الأول بحلقة خشبية، فإن التيار الحثي المتولد يكون:',
    options: ['أكبر', 'أصغر', 'مساويًا', 'صفرًا'],
    correctAnswerIndex: 3,
    explanation: 'الخشب مادة عازلة، وليست موصلة. على الرغم من أن تغير التدفق سيولد قوة دافعة حثية في الحلقة الخشبية، إلا أنه لن يمر تيار حثي لأن مقاومتها كبيرة جدًا (لا نهائية تقريبًا).'
  },
];

export default function LenzLawPart2QuizPage() {
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
