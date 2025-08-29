
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { SimpleCircuit } from './diagram';

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
    questionText: 'في دارة كهربائية بسيطة كما في الشكل، ما هي الخطوة الأولى دائمًا لتحليلها؟',
    diagram: true,
    options: ['حساب التيار في كل فرع', 'حساب القدرة المستهلكة', 'حساب المقاومة المكافئة للدارة', 'حساب فرق الجهد لكل مقاومة'],
    correctAnswerIndex: 2,
    explanation: 'الخطوة الأولى والأهم هي تبسيط الدارة عن طريق إيجاد المقاومة المكافئة لجميع المقاومات الخارجية. هذا يسمح لنا بحساب التيار الكلي الصادر من البطارية.'
  },
  {
    questionText: 'في دارة بسيطة، إذا زادت المقاومة الخارجية الكلية، فإن التيار الكلي المار في الدارة...',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'وفقًا لقانون أوم للدارة البسيطة ($I = \\varepsilon / (R_{eq} + r)$)، التيار الكلي يتناسب عكسيًا مع المقاومة الكلية (الخارجية + الداخلية). زيادة المقاومة تؤدي إلى نقصان التيار.'
  },
  {
    questionText: 'في الدارة الموضحة، كيف يتم توزيع التيار عند النقطة التي يتفرع فيها إلى المقاومتين R2 و R3؟',
    diagram: true,
    options: ['يتوزع بالتساوي دائمًا', 'يمر التيار الأكبر في المقاومة الأكبر', 'يمر التيار الأكبر في المقاومة الأصغر', 'يتوقف التيار عند نقطة التفرع'],
    correctAnswerIndex: 2,
    explanation: 'التيار يفضل دائمًا المسار الأسهل (الأقل مقاومة). في التوصيل على التوازي، يكون فرق الجهد ثابتًا، ومن $I=V/R$، يتناسب التيار عكسيًا مع المقاومة. لذا، الفرع ذو المقاومة الأصغر سيحصل على النصيب الأكبر من التيار.'
  },
  {
    questionText: 'إذا كانت قراءة فولتميتر موصول على التوازي مع بطارية في دارة مغلقة أقل من القوة الدافعة للبطارية، فهذا يدل على أن...',
    options: ['البطارية فارغة', 'الفولتميتر معطل', 'البطارية لها مقاومة داخلية', 'قانون أوم لا ينطبق'],
    correctAnswerIndex: 2,
    explanation: 'قراءة الفولتميتر تمثل فرق الجهد الطرفي (V). العلاقة هي $V = \\varepsilon - Ir$. إذا كان $V < \\varepsilon$ فهذا يعني أن قيمة $Ir$ موجبة، مما يثبت وجود مقاومة داخلية (r) تسبب هبوطًا في الجهد.'
  },
  {
    questionText: 'أميتر مثالي يتم توصيله في الدارة على... وفولتميتر مثالي يتم توصيله على...',
    options: ['التوالي، التوالي', 'التوازي، التوازي', 'التوالي، التوازي', 'التوازي، التوالي'],
    correctAnswerIndex: 2,
    explanation: 'الأميتر يقيس التيار، لذا يجب أن يمر به التيار نفسه المراد قياسه، فيتم توصيله على التوالي. الفولتميتر يقيس فرق الجهد بين نقطتين، لذا يتم توصيله على التوازي مع العنصر المراد قياس جهده.'
  },
];

export default function SimpleCircuitsQuizPage() {
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
              {q.diagram && <SimpleCircuit />}
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
