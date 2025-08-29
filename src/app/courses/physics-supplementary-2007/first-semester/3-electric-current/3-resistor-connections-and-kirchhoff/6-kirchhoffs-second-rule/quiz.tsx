
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
    questionText: 'قاعدة كيرشوف الثانية (قاعدة العروة) هي تطبيق مباشر لأي من مبادئ الحفظ التالية؟',
    options: ['حفظ الطاقة', 'حفظ الزخم', 'حفظ الشحنة', 'حفظ الكتلة'],
    correctAnswerIndex: 0,
    explanation: 'تنص قاعدة العروة على أن المجموع الجبري لتغيرات الجهد عبر أي مسار مغلق يساوي صفرًا. هذا يعني أن الطاقة التي تكتسبها الشحنة من البطاريات يجب أن تساوي الطاقة التي تفقدها في المقاومات، وهو تعبير عن مبدأ حفظ الطاقة.'
  },
  {
    questionText: 'عند تطبيق قاعدة كيرشوف الثانية، إذا عبرنا مقاومة (R) عكس اتجاه التيار (I) المار فيها، فإن تغير الجهد يكون:',
    options: ['$+IR$', '$-IR$', '$+I/R$', '$-I/R$'],
    correctAnswerIndex: 0,
    explanation: 'التيار يتدفق من الجهد الأعلى إلى الأدنى. عند العبور عكس اتجاه التيار، فإننا ننتقل من جهد أدنى إلى جهد أعلى، لذا يكون هناك ارتفاع في الجهد مقداره $+IR$.'
  },
  {
    questionText: 'عند تطبيق قاعدة كيرشوف الثانية، إذا عبرنا بطارية قوتها الدافعة ($\\varepsilon$) من قطبها الموجب إلى قطبها السالب، فإن تغير الجهد يكون:',
    options: ['$+\\varepsilon$', '$-\\varepsilon$', '$+Ir$', '$-Ir$'],
    correctAnswerIndex: 1,
    explanation: 'عند الانتقال من القطب الموجب (جهد أعلى) إلى القطب السالب (جهد أدنى)، يحدث هبوط في الجهد مقداره يساوي القوة الدافعة للبطارية، أي $-\\varepsilon$.'
  },
  {
    questionText: 'في مسار مغلق، كان مجموع ارتفاعات الجهد عبر البطاريات 20 فولت. ما هو مجموع هبوطات الجهد عبر المقاومات في نفس المسار؟',
    options: ['10 فولت', '40 فولت', '20 فولت', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقاعدة العروة، المجموع الجبري للتغيرات في الجهد يساوي صفرًا. هذا يعني أن مجموع الارتفاعات في الجهد يجب أن يساوي مجموع الهبوطات في الجهد. إذا كان الارتفاع 20 فولت، فيجب أن يكون الهبوط 20 فولت.'
  },
  {
    questionText: 'لماذا لا يمكن تبسيط بعض الدارات الكهربائية باستخدام قوانين التوصيل على التوالي والتوازي فقط؟',
    options: ['لأنها تحتوي على أسلاك طويلة', 'لأنها تحتوي على أكثر من بطارية أو نقاط تفرع معقدة', 'لأن مقاومتها متغيرة', 'لأن قانون أوم لا ينطبق عليها'],
    correctAnswerIndex: 1,
    explanation: 'الدارات التي تحتوي على أكثر من مصدر جهد (بطارية) في أفرع مختلفة، أو التي تكون فيها المقاومات موصولة بطريقة لا يمكن تبسيطها إلى مجموعات توالي وتوازي بحتة، تتطلب استخدام قاعدتي كيرشوف لحلها.'
  },
];

export default function KirchhoffsSecondRuleQuizPage() {
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
