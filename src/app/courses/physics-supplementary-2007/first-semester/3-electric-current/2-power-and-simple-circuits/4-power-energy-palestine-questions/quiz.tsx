
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
    questionText: 'في دارة كهربائية، إذا زادت شدة التيار إلى ثلاثة أمثال قيمتها، فإن القدرة المستهلكة في مقاومة ثابتة...',
    options: ['تزداد 3 مرات', 'تزداد 6 مرات', 'تزداد 9 مرات', 'تبقى ثابتة'],
    correctAnswerIndex: 2,
    explanation: 'القدرة المستهلكة في مقاومة تُعطى بالعلاقة $P = I^2R$. بما أن P تتناسب طرديًا مع مربع التيار ($I^2$), فعندما يصبح التيار $3I$, تصبح القدرة $(3I)^2R = 9(I^2R) = 9P$. أي أنها تزداد 9 مرات.'
  },
  {
    questionText: 'ماذا يحدث لإضاءة مصباح إذا تم توصيله بمصدر جهد له نفس القيمة ولكن بتردد أعلى؟ (اعتبر المصباح مقاومة أومية بحتة)',
    options: ['تزداد إضاءته', 'تقل إضاءته', 'لا تتغير إضاءته', 'ينطفئ المصباح'],
    correctAnswerIndex: 2,
    explanation: 'إضاءة المصباح تعتمد على قدرته، وقدرة المقاومة الأومية لا تعتمد على التردد، بل على القيمة الفعالة للجهد والتيار. بما أن قيمة الجهد الفعالة لم تتغير، فإن القدرة المستهلكة وبالتالي الإضاءة تبقى ثابتة.'
  },
  {
    questionText: 'مقاومتان R1 و R2 حيث R1 > R2. عند توصيلهما على التوالي ببطارية، تكون القدرة المستهلكة P1 و P2. وعند توصيلهما على التوازي بنفس البطارية، تكون القدرة P1\' و P2\'. أي العلاقات التالية صحيحة؟',
    options: ['$P_1 > P_2$ و $P_1\' > P_2\'$', '$P_1 < P_2$ و $P_1\' < P_2\'$', '$P_1 > P_2$ و $P_1\' < P_2\'$', '$P_1 < P_2$ و $P_1\' > P_2\'$'],
    correctAnswerIndex: 2,
    explanation: 'على التوالي: نفس التيار، $P=I^2R$. القدرة طردية مع المقاومة، لذا $P_1 > P_2$. \nعلى التوازي: نفس الجهد، $P=V^2/R$. القدرة عكسية مع المقاومة، لذا $P_1\' < P_2\'$. \nإذن العلاقة الصحيحة هي $P_1 > P_2$ و $P_1\' < P_2\'$.'
  },
  {
    questionText: 'جهاز كهربائي يستهلك طاقة مقدارها 1 جول في 1 ثانية. ماذا نسمي هذه الكمية؟',
    options: ['1 أمبير', '1 فولت', '1 أوم', '1 واط'],
    correctAnswerIndex: 3,
    explanation: 'القدرة هي معدل استهلاك الطاقة. الواط هو وحدة القدرة ويعرف بأنه استهلاك طاقة بمقدار 1 جول خلال زمن قدره 1 ثانية.'
  },
  {
    questionText: 'كفاءة بطارية 80%. إذا كانت قوتها الدافعة 10 فولت، فما فرق الجهد بين طرفيها عند تشغيلها؟',
    options: ['10 فولت', '12.5 فولت', '8 فولت', '2 فولت'],
    correctAnswerIndex: 2,
    explanation: 'الكفاءة ($\\eta$) = $\\frac{V}{\\varepsilon}$. \n $0.80 = \\frac{V}{10V}$. \n إذن، $V = 0.80 \\times 10V = 8$ فولت.'
  },
];

export default function PowerEnergyPalestineQuestionsQuizPage() {
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
