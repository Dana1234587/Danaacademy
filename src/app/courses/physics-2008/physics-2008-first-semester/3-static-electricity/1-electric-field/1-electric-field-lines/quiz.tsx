
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
    questionText: 'أي من العبارات التالية لا تعتبر من خصائص خطوط المجال الكهربائي؟',
    options: ['تخرج من الشحنة الموجبة وتدخل في السالبة.', 'لا يمكن أن تتقاطع.', 'تدل كثافتها على شدة المجال.', 'تكون دائمًا مستقيمة.'],
    correctAnswerIndex: 3,
    explanation: 'خطوط المجال الكهربائي تكون مستقيمة فقط في حالة المجال المنتظم، لكنها تكون منحنية في حالة المجالات غير المنتظمة (مثل المجال حول شحنتين نقطيتين).'
  },
  {
    questionText: 'ما هي الخاصية الأساسية لشحنة الاختبار المستخدمة في الفيزياء؟',
    options: ['أن تكون سالبة وكبيرة.', 'أن تكون موجبة وصغيرة جدًا.', 'أن تكون متعادلة.', 'أن تكون متحركة بسرعة ثابتة.'],
    correctAnswerIndex: 1,
    explanation: 'تُعرّف شحنة الاختبار بأنها شحنة موجبة وصغيرة جدًا بحيث لا يؤثر وجودها على المجال الكهربائي الأصلي المراد قياسه.'
  },
  {
    questionText: 'أين يمكن الحصول على مجال كهربائي منتظم تقريبًا؟',
    options: ['بالقرب من شحنة نقطية.', 'بين صفيحتين متوازيتين مشحونتين بشحنتين مختلفتين.', 'داخل كرة موصلة مشحونة.', 'حول سلك طويل مشحون.'],
    correctAnswerIndex: 1,
    explanation: 'المجال الكهربائي بين صفيحتين كبيرتين متوازيتين مشحونتين بشحنتين متساويتين في المقدار ومختلفتين في النوع يكون منتظمًا (ثابت المقدار والاتجاه) في المنطقة البعيدة عن الحواف.'
  },
  {
    questionText: 'إذا وُضعت شحنة اختبار موجبة في مجال كهربائي، فإنها ستتحرك...',
    options: ['عكس اتجاه خطوط المجال.', 'بشكل عمودي على خطوط المجال.', 'مع اتجاه خطوط المجال.', 'في مسار دائري.'],
    correctAnswerIndex: 2,
    explanation: 'اتجاه المجال الكهربائي يُعرّف بأنه اتجاه القوة التي تؤثر على شحنة اختبار موجبة. لذلك، ستتحرك الشحنة الموجبة دائمًا مع اتجاه خطوط المجال.'
  },
  {
    questionText: 'المجال الكهربائي الناشئ عن كرة موصلة مشحونة يعتبر مثالاً على...',
    options: ['مجال كهربائي منتظم.', 'مجال كهربائي غير منتظم.', 'مجال مغناطيسي.', 'عدم وجود مجال.'],
    correctAnswerIndex: 1,
    explanation: 'المجال الكهربائي حول كرة مشحونة (أو شحنة نقطية) يتغير مقداره مع المسافة (يقل كلما ابتعدنا)، واتجاهه يشع للخارج من المركز، لذا فهو مثال كلاسيكي على المجال غير المنتظم.'
  },
];

export default function QuizPage() {
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
