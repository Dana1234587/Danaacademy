
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
    questionText: 'نواة الثوريوم-234 ($^{234}_{90}Th$) تضمحل عن طريق إطلاق جسيم بيتا السالبة. ما هي النواة الناتجة؟',
    options: ['$^{234}_{91}Pa$', '$^{230}_{88}Ra$', '$^{234}_{89}Ac$', '$^{235}_{90}Th$'],
    correctAnswerIndex: 0,
    explanation: 'في اضمحلال بيتا السالبة، يزداد العدد الذري بمقدار 1 ويبقى العدد الكتلي ثابتًا. $Z\' = 90 + 1 = 91$. $A\'=234$. العنصر الذي عدده الذري 91 هو البروتكتينيوم (Pa).'
  },
  {
    questionText: 'ما هي الخاصية التي تجعل القوة النووية القوية قادرة على ربط النواة معًا على الرغم من التنافر الكهربائي بين البروتونات؟',
    options: ['أنها أضعف من القوة الكهرومغناطيسية.', 'أنها طويلة المدى.', 'أنها أقوى بكثير من القوة الكهرومغناطيسية على المسافات القصيرة.', 'أنها تؤثر فقط على النيوترونات.'],
    correctAnswerIndex: 2,
    explanation: 'على الرغم من أن القوة النووية قصيرة المدى، إلا أنها في نطاقها (داخل النواة) تكون أقوى بكثير من قوة التنافر الكهرومغناطيسي، مما يسمح لها بالتغلب على هذا التنافر وربط النواة.'
  },
  {
    questionText: 'عينة من الكوبالت-60 لها عمر نصف يبلغ 5.27 سنوات. ما هي المدة التي تستغرقها العينة لتضمحل إلى 1/16 من قيمتها الأصلية؟',
    options: ['5.27 سنوات', '10.54 سنوات', '15.81 سنوات', '21.08 سنوات'],
    correctAnswerIndex: 3,
    explanation: 'للوصول إلى 1/16، يجب أن تمر العينة بأربع فترات عمر نصف: \n $N_0 \\rightarrow N_0/2 \\rightarrow N_0/4 \\rightarrow N_0/8 \\rightarrow N_0/16$. \n الزمن الكلي = $4 \\times T_{1/2} = 4 \\times 5.27 = 21.08$ سنوات.'
  },
  {
    questionText: 'في تفاعل اندماج الديوتيريوم والتريتيوم، $^2_1H + ^3_1H \\rightarrow ^4_2He + ?$، ما هو الجسيم المجهول؟',
    options: ['بروتون ($^1_1p$)', 'إلكترون ($^0_{-1}e$)', 'نيوترون ($^1_0n$)', 'جسيم ألفا ($^4_2He$)'],
    correctAnswerIndex: 2,
    explanation: 'نوازن الأعداد الكتلية والذرية. \n العدد الكتلي: 2 + 3 = 5 على اليسار. 4 + A = 5 على اليمين $\\implies A=1$. \n العدد الذري: 1 + 1 = 2 على اليسار. 2 + Z = 2 على اليمين $\\implies Z=0$. \n الجسيم الذي له A=1 و Z=0 هو النيوترون.'
  },
  {
    questionText: 'لماذا تعتبر طاقة الربط لكل نيوكليون مقياسًا أفضل لاستقرار النواة من طاقة الربط الكلية؟',
    options: ['لأنها أسهل في الحساب.', 'لأنها تأخذ في الاعتبار حجم النواة.', 'لأنها تزيل تأثير زيادة عدد النيوكليونات مع زيادة حجم النواة.', 'لأنها دائمًا عدد صحيح.'],
    correctAnswerIndex: 2,
    explanation: 'طاقة الربط الكلية تزداد بشكل طبيعي مع زيادة عدد النيوكليونات. قسمة طاقة الربط على العدد الكتلي تعطينا متوسط الطاقة التي تربط كل نيوكليون، وهو مقياس أكثر عدلاً لمقارنة الاستقرار بين الأنوية المختلفة الأحجام.'
  },
];

export default function ChapterQuestionsQuizPage() {
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
          <Card key={qIndex} className={\`border-2 \${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg\`}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={\`السؤال \${qIndex + 1}: \${q.questionText}\`} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={\`q\${qIndex}-o\${oIndex}\`} className={\`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent \${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}\`}>
                    <RadioGroupItem value={oIndex.toString()} id={\`q\${qIndex}-o\${oIndex}\`} disabled={isSubmitted} />
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
