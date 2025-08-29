
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
    questionText: 'في دارة بسيطة، عند إغلاق مفتاح يضيف فرعًا جديدًا على التوازي مع جزء من الدارة، ماذا يحدث للمقاومة المكافئة للدارة والتيار الكلي الخارج من البطارية؟',
    options: ['تزداد المقاومة ويقل التيار', 'تقل المقاومة ويزداد التيار', 'لا يتغيران', 'تقل المقاومة ويقل التيار'],
    correctAnswerIndex: 1,
    explanation: 'إضافة فرع على التوازي دائمًا تقلل المقاومة المكافئة للجزء الذي تمت إضافته إليه، وبالتالي تقل المقاومة الكلية للدارة. وبما أن المقاومة الكلية قلت، فإن التيار الكلي الخارج من البطارية سيزداد وفقًا لقانون أوم للدارة البسيطة.'
  },
  {
    questionText: 'أميتر مثالي مقاومته... وفولتميتر مثالي مقاومته...',
    options: ['صفر، صفر', 'لانهاية، لانهاية', 'صفر، لانهاية', 'لانهاية، صفر'],
    correctAnswerIndex: 2,
    explanation: 'الأميتر المثالي يجب ألا يؤثر على التيار الذي يقيسه، لذا يجب أن تكون مقاومته صفرًا. الفولتميتر المثالي يجب ألا يسحب أي تيار من الدارة التي يقيس جهدها، لذا يجب أن تكون مقاومته لا نهائية.'
  },
  {
    questionText: 'بطارية قوتها الدافعة $\\varepsilon$ ومقاومتها الداخلية $r$. عند زيادة المقاومة الخارجية الموصولة بها، فإن فرق الجهد بين قطبي البطارية...',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يساوي القوة الدافعة دائمًا'],
    correctAnswerIndex: 0,
    explanation: 'عند زيادة المقاومة الخارجية، يقل التيار الكلي المار في الدارة ($I = \\varepsilon / (R+r)$). فرق الجهد الطرفي هو $V = \\varepsilon - Ir$. بما أن $I$ تقل، فإن المقدار المطروح ($Ir$) يقل، وبالتالي قيمة $V$ تزداد وتقترب من $\\varepsilon$.'
  },
  {
    questionText: 'مقاومتان $R_1 = 3\\Omega$ و $R_2 = 6\\Omega$ موصولتان على التوازي ببطارية 12 فولت. ما القدرة الكلية المستهلكة في المقاومتين؟',
    options: ['12 واط', '18 واط', '36 واط', '72 واط'],
    correctAnswerIndex: 3,
    explanation: 'نحسب أولاً المقاومة المكافئة: $1/R_{eq} = 1/3 + 1/6 = 3/6 \\Rightarrow R_{eq} = 2\\Omega$. ثم نحسب القدرة الكلية: $P = V^2 / R_{eq} = (12V)^2 / 2\\Omega = 144 / 2 = 72$ واط. أو نحسب قدرة كل مقاومة على حدة ونجمع: $P_1 = V^2/R_1 = 144/3=48W$, $P_2=V^2/R_2 = 144/6=24W$. المجموع $48+24=72W$.'
  },
  {
    questionText: 'في دارة تحتوي على بطارية ومقاومة، إذا كانت قراءة الفولتميتر عبر المقاومة تساوي قراءة الفولتميتر عبر البطارية، فهذا يعني أن...',
    options: ['مقاومة البطارية الداخلية صفر', 'مقاومة أسلاك التوصيل صفر', 'كلاهما صحيح', 'هذا مستحيل'],
    correctAnswerIndex: 2,
    explanation: 'الجهد عبر المقاومة الخارجية هو $V=IR$. الجهد عبر البطارية هو $V = \\varepsilon - Ir$. لكي يتساوى المقداران، يجب أن يكون $IR = \\varepsilon - Ir$. بما أن $I = \\varepsilon / (R+r)$, بالتعويض نجد أن هذا لا يتحقق إلا إذا كانت مقاومة الأسلاك والمقاومة الداخلية صفر.'
  },
];

export default function SimpleCircuitsExtraExamplesQuizPage() {
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
