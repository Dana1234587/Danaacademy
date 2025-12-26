
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
    questionText: 'في مجال كهربائي منتظم، كلما تحركنا مع اتجاه المجال، فإن الجهد الكهربائي...',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'خطوط المجال الكهربائي تشير دائمًا من منطقة الجهد المرتفع إلى منطقة الجهد المنخفض. لذلك، التحرك مع اتجاه المجال يؤدي إلى نقصان الجهد.'
  },
  {
    questionText: 'نقطتان A و B في مجال كهربائي منتظم شدته 500 N/C. المسافة بينهما 10 سم، والإزاحة من A إلى B تصنع زاوية 60 درجة مع اتجاه المجال. ما هو فرق الجهد $V_{BA} = V_B - V_A$؟',
    options: ['25 فولت', '-25 فولت', '50 فولت', '-50 فولت'],
    correctAnswerIndex: 1,
    explanation: 'العلاقة هي $V_B - V_A = -Ed\\cos\\theta$, حيث d هي المسافة بين النقطتين و $\\theta$ هي الزاوية بين الإزاحة من A إلى B والمجال. \n $\\Delta V = -(500 N/C)(0.1 m)\\cos(60^\\circ) = -50 \\times 0.5 = -25$ فولت.'
  },
  {
    questionText: 'ما هو "سطح تساوي الجهد"؟',
    options: ['سطح تكون شدة المجال الكهربائي عليه ثابتة.', 'سطح يكون فرق الجهد بين أي نقطتين عليه يساوي صفرًا.', 'سطح يكون موازيًا دائمًا لخطوط المجال.', 'سطح كروي حول شحنة.'],
    correctAnswerIndex: 1,
    explanation: 'سطح تساوي الجهد هو السطح الذي يكون لجميع نقاطه نفس الجهد الكهربائي. نتيجة لذلك، فرق الجهد بين أي نقطتين على هذا السطح يساوي صفرًا، ولا يلزم بذل شغل لنقل شحنة بينهما.'
  },
  {
    questionText: 'ما هي الزاوية بين خطوط المجال الكهربائي وسطوح تساوي الجهد؟',
    options: ['$0^\\circ$', '$45^\\circ$', '$90^\\circ$', '$180^\\circ$'],
    correctAnswerIndex: 2,
    explanation: 'خطوط المجال الكهربائي تكون دائمًا عمودية على سطوح تساوي الجهد عند أي نقطة. هذا لأن الشغل المبذول لنقل شحنة على سطح تساوي الجهد هو صفر، مما يتطلب أن تكون القوة (وبالتالي المجال) عمودية على الإزاحة.'
  },
  {
    questionText: 'إذا كان فرق الجهد $V_{ab} = V_a - V_b = 10V$، فما مقدار شغل القوة الكهربائية اللازم لنقل شحنة $2C$ من النقطة a إلى النقطة b؟',
    options: ['20 جول', '-20 جول', '5 جول', '-5 جول'],
    correctAnswerIndex: 1,
    explanation: 'شغل القوة الكهربائية $W_{ab} = -q \\Delta V = -q(V_b - V_a)$. \n بما أن $V_a - V_b = 10V$, فإن $V_b - V_a = -10V$. \n إذن، $W_{ab} = -(2C)(-10V) = +20J$. لكن السؤال يطلب الشغل لنقلها من a إلى b. \n شغل القوة الكهربائية عند الانتقال من a إلى b هو $W_{ab} = -q(V_b - V_a)$. \n $V_{ab} = V_a - V_b = 10V$. \n $V_b - V_a = -10V$. \n $W_{ab} = -(2C)(-10V) = +20J$. هناك خطأ في الخيارات. \n الصحيح: $W_{a \\to b} = q(V_a - V_b) = (2C)(10V) = 20J$. الشغل الذي تبذله القوة الكهربائية هو موجب. \n إذا كان السؤال عن شغل القوة الخارجية، فسيكون سالب. \n لنفترض أن السؤال هو: ما مقدار شغل القوة الكهربائية لنقل شحنة $2C$ من a إلى b إذا كان $V_b - V_a = 10V$. عندها $W = -q(V_b-V_a) = -2*10 = -20J$. هذا أفضل.\n شرح الإجابة: شغل القوة الكهربائية لنقل شحنة من a إلى b هو $W_{elec} = -q(V_b - V_a)$.\n$V_a - V_b = 10V \implies V_b - V_a = -10V$.\n$W_{elec} = -(2C)(-10V) = +20J$. إذا كانت الخيارات معكوسة. لنجعل السؤال $V_b - V_a = 10V$. عندها $W_{elec} = -2*10 = -20J$. هذا هو الخيار ب.'
  },
];

// Let's fix question 5 to be correct and clear
quizQuestions[4] = {
  questionText: 'إذا كان فرق الجهد بين نقطتين $V_B - V_A = 10V$, فما مقدار شغل القوة الكهربائية لنقل شحنة مقدارها $2C$ من النقطة A إلى النقطة B؟',
  options: ['20 جول', '-20 جول', '5 جول', '-5 جول'],
  correctAnswerIndex: 1,
  explanation: 'شغل القوة الكهربائية لنقل شحنة من نقطة ابتدائية إلى نهائية يُعطى بالعلاقة: $W_{elec} = -q \\Delta V = -q (V_{final} - V_{initial})$.\nفي هذه الحالة, $V_{final} = V_B$ و $V_{initial} = V_A$. \n$W_{A \\to B} = -q(V_B - V_A) = -(2C)(10V) = -20$ جول.'
};


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
