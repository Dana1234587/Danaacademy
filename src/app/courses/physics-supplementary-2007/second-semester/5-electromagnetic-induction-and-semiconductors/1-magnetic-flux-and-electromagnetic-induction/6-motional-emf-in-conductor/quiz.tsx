
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
    questionText: 'ما هي صيغة القوة الدافعة الكهربائية الحثية الحركية ($\\varepsilon$) المتولدة في موصل طوله L يتحرك بسرعة v عموديًا على مجال مغناطيسي B؟',
    options: ['$\\varepsilon = B L v \\sin\\theta$', '$\\varepsilon = B L v$', '$\\varepsilon = B A / t$', '$\\varepsilon = B L / v$'],
    correctAnswerIndex: 1,
    explanation: 'عندما تكون السرعة v، والمجال B، وطول الموصل L جميعها متعامدة على بعضها البعض، فإن القوة الدافعة الحثية الحركية تصل إلى قيمتها القصوى وتعطى بالعلاقة البسيطة $\\varepsilon = BLv$.'
  },
  {
    questionText: 'موصل طوله 2 متر يتحرك بسرعة 5 م/ث في مجال مغناطيسي شدته 0.4 تسلا. إذا كانت الزاوية بين السرعة والمجال 30 درجة، فما مقدار القوة الدافعة الحثية؟',
    options: ['4 فولت', '2 فولت', '3.46 فولت', '1 فولت'],
    correctAnswerIndex: 1,
    explanation: 'نستخدم الصيغة العامة: $\\varepsilon = BLv\\sin\\theta = (0.4 T)(2 m)(5 m/s)\\sin(30^\\circ) = 4 \\times 0.5 = 2$ فولت.'
  },
  {
    questionText: 'باستخدام قاعدة اليد اليمنى، كيف يتم تحديد قطبية القوة الدافعة الحثية في موصل متحرك؟',
    options: ['الإبهام مع التيار والأصابع مع المجال', 'الأصابع مع السرعة والمجال يخرج من راحة اليد، فيشير الإبهام إلى القطب الموجب', 'الأصابع مع المجال والسرعة تخرج من راحة اليد', 'لا يمكن تحديدها بقاعدة اليد اليمنى'],
    correctAnswerIndex: 1,
    explanation: 'لتحديد قطبية الموصل الذي أصبح كبطارية، نوجه الأصابع باتجاه السرعة (v)، ونجعل خطوط المجال (B) تخرج من راحة اليد. يشير الإبهام إلى اتجاه القوة المغناطيسية على الشحنات الموجبة، والتي تتجمع عند الطرف الذي يصبح هو القطب الموجب.'
  },
  {
    questionText: 'طائرة أفقية تطير بسرعة ثابتة. المسافة بين نهايتي جناحيها 50 متر. إذا كانت المركبة الرأسية للمجال المغناطيسي الأرضي $5 \\times 10^{-5}$ تسلا، والسرعة 200 م/ث، فما فرق الجهد المتولد بين طرفي الجناحين؟',
    options: ['0.5 فولت', '5 فولت', '50 فولت', 'صفر'],
    correctAnswerIndex: 0,
    explanation: 'الجناح يعمل كموصل يتحرك في مجال مغناطيسي. المركبة الرأسية للمجال هي التي تكون عمودية على حركة الجناح الأفقي. إذن، $\\varepsilon = BLv = (5 \\times 10^{-5} T)(50 m)(200 m/s) = 0.5$ فولت.'
  },
  {
    questionText: 'لماذا يجب أن تكون هناك قوة خارجية لسحب موصل بسرعة ثابتة على سكتين موصلتين في وجود مجال مغناطيسي؟',
    options: ['للتغلب على مقاومة الهواء فقط.', 'للتغلب على القوة المغناطيسية المعاكسة للحركة (قوة لنز).', 'لزيادة التيار الحثي.', 'لأن القوة المغناطيسية تساعد على الحركة.'],
    correctAnswerIndex: 1,
    explanation: 'عندما يتولد تيار حثي في الموصل، يؤثر المجال المغناطيسي على هذا التيار بقوة مغناطيسية (F = ILB). وفقًا لقانون لنز، يكون اتجاه هذه القوة دائمًا معاكسًا لاتجاه الحركة. للحفاظ على سرعة ثابتة، يجب تطبيق قوة خارجية مساوية لهذه القوة المعاكسة.'
  },
];

export default function MotionalEmfQuizPage() {
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
