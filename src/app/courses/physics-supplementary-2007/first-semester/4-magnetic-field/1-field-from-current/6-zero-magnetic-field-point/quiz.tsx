
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
    questionText: 'ما هما شرطا وجود نقطة انعدام للمجال المغناطيسي الناتج عن مصدرين؟',
    options: ['أن يكون المجالان متساويين في المقدار وفي نفس الاتجاه', 'أن يكون المجالان مختلفين في المقدار وفي نفس الاتجاه', 'أن يكون المجالان متساويين في المقدار ومتعاكسين في الاتجاه', 'أن يكون أحد المجالين صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'لكي ينعدم المجال المحصل عند نقطة ما، يجب أن يكون هناك مجالان على الأقل، وأن يكون هذان المجالان متساويين في المقدار ومتعاكسين تمامًا في الاتجاه، بحيث يكون مجموعهما المتجهي صفرًا.'
  },
  {
    questionText: 'سلكان مستقيمان متوازيان يمر فيهما تياران بنفس الاتجاه. أين تقع نقطة انعدام المجال المغناطيسي؟',
    options: ['بينهما وأقرب إلى السلك الذي يمر به تيار أكبر', 'بينهما وأقرب إلى السلك الذي يمر به تيار أصغر', 'خارجهما وعلى جهة السلك الأقوى تيارًا', 'لا توجد نقطة انعدام'],
    correctAnswerIndex: 1,
    explanation: 'عندما يكون التياران بنفس الاتجاه، يكون المجالان بين السلكين متعاكسين. لكي يتساوى المجالان في المقدار ($B_1=B_2$), يجب أن تكون النقطة أقرب إلى السلك الذي يمر به التيار الأضعف لتعويض ضعفه.'
  },
  {
    questionText: 'سلكان مستقيمان متوازيان يمر فيهما تياران متعاكسان في الاتجاه. أين تقع نقطة انعدام المجال المغناطيسي؟',
    options: ['بينهما', 'خارجهما وعلى جهة السلك الذي يمر به تيار أكبر', 'خارجهما وعلى جهة السلك الذي يمر به تيار أصغر', 'لا توجد نقطة انعدام'],
    correctAnswerIndex: 2,
    explanation: 'عندما يكون التياران متعاكسين، يكون المجالان بين السلكين في نفس الاتجاه، فلا يمكن أن ينعدم المجال بينهما. ينعدم المجال في المنطقة التي يكون فيها المجالان متعاكسين، وهي خارج السلكين. ولكي يتساوى المجالان، يجب أن تكون النقطة أقرب إلى السلك الأضعف تيارًا.'
  },
  {
    questionText: 'سلكان متوازيان المسافة بينهما d، يمر فيهما تياران متساويان في المقدار وفي نفس الاتجاه. أين تقع نقطة انعدام المجال؟',
    options: ['على مسافة d/2 من أي منهما', 'على مسافة d/4 من السلك الأول', 'لا توجد نقطة انعدام', 'خارج السلكين'],
    correctAnswerIndex: 0,
    explanation: 'بما أن التياران متساويان وفي نفس الاتجاه، فإن نقطة الانعدام تقع بينهما. ولكي يتساوى المجالان، يجب أن تكون المسافات متساوية أيضًا. إذن، تقع النقطة في منتصف المسافة تمامًا بينهما.'
  },
  {
    questionText: 'حلقتان دائريتان متحدتا المركز وفي نفس المستوى، يمر في الأولى تيار I وفي الثانية 2I. لكي ينعدم المجال في المركز، يجب أن يكون اتجاه التيار في الحلقتين...',
    options: ['في نفس الاتجاه', 'متعاكسًا', 'متعامدًا', 'يعتمد على نصف القطر'],
    correctAnswerIndex: 1,
    explanation: 'لكي ينعدم المجال في المركز، يجب أن يكون المجال الناتج عن الحلقة الأولى مساويًا في المقدار ومعاكسًا في الاتجاه للمجال الناتج عن الحلقة الثانية. ولكي يكون المجالان متعاكسين، يجب أن يكون اتجاه التيار في الحلقتين متعاكسًا.'
  },
];

export default function ZeroMagneticFieldPointQuizPage() {
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
