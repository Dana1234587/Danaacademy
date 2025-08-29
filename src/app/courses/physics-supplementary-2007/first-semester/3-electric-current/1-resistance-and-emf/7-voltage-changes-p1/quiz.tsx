
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
    questionText: 'عند الانتقال عبر مقاومة (R) في نفس اتجاه التيار (I)، فإن التغير في الجهد الكهربائي يكون:',
    options: ['$V$ يزداد بمقدار IR', '$V$ يقل بمقدار IR', '$V$ يبقى ثابتًا', '$V$ يزداد بمقدار I/R'],
    correctAnswerIndex: 1,
    explanation: 'التيار يتدفق دائمًا من الجهد الأعلى إلى الجهد الأدنى عبر مقاومة. لذلك، عند عبور المقاومة مع اتجاه التيار، يحدث هبوط في الجهد مقداره IR.'
  },
  {
    questionText: 'عند الانتقال عبر بطارية من قطبها السالب إلى قطبها الموجب، فإن التغير في الجهد الكهربائي يكون:',
    options: ['يزداد بمقدار القوة الدافعة ($\\varepsilon$)', 'يقل بمقدار القوة الدافعة ($\\varepsilon$)', 'يقل بمقدار (Ir)', 'يعتمد على اتجاه التيار'],
    correctAnswerIndex: 0,
    explanation: 'البطارية ترفع الجهد. عند الانتقال من القطب السالب (الجهد المنخفض) إلى القطب الموجب (الجهد المرتفع)، يزداد الجهد بمقدار القوة الدافعة الكهربائية للبطارية.'
  },
  {
    questionText: 'لحساب فرق الجهد بين نقطتين a و b ($V_{ab} = V_a - V_b$)، نبدأ من النقطة a ونتجه إلى النقطة b ونجمع التغيرات في الجهد.',
    options: ['هذه العبارة خاطئة', 'هذه العبارة صحيحة'],
    correctAnswerIndex: 1,
    explanation: 'هذه هي الطريقة الصحيحة. $V_{ab}$ هو $V_a - V_b$. لحسابه نبدأ من النقطة b ونجمع التغيرات في الجهد حتى نصل إلى a ($V_a = V_b + \\Sigma \\Delta V$). إذن، $V_a - V_b = \\Sigma \\Delta V$ عند الانتقال من b إلى a.'
  },
  {
    questionText: 'في دارة كهربائية، إذا كان جهد نقطة ما 10 فولت، وبعد عبور عنصر ما أصبح الجهد 6 فولت، فهذا العنصر يمكن أن يكون:',
    options: ['بطارية 4 فولت موصولة من السالب إلى الموجب', 'مقاومة يمر بها تيار', 'بطارية 4 فولت موصولة من الموجب إلى السالب', 'مكثف مشحون بالكامل'],
    correctAnswerIndex: 1,
    explanation: 'بما أن الجهد قل (من 10 إلى 6)، فهذا يعني حدوث هبوط في الجهد. الهبوط في الجهد يحدث عند عبور مقاومة مع اتجاه التيار.'
  },
  {
    questionText: 'إذا كان فرق الجهد بين نقطتين في دارة يساوي صفر، فهذا يعني بالضرورة أن:',
    options: ['لا يوجد تيار يمر بينهما', 'لا توجد مقاومات بينهما', 'النقطتان متصلتان بسلك مثالي (مقاومته صفر)', 'جميع ما سبق قد يكون صحيحًا'],
    correctAnswerIndex: 2,
    explanation: 'في الحالة المثالية، جميع نقاط السلك الواحد لها نفس الجهد. إذا كان فرق الجهد بين نقطتين صفرًا، فهذا يعني أنهما متصلتان بسلك عديم المقاومة.'
  },
];

export default function VoltageChangesP1QuizPage() {
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
