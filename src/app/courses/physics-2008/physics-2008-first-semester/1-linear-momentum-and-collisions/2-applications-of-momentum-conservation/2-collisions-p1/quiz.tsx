
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
    questionText: 'أي من الكميات التالية تكون محفوظة دائمًا في التصادم المرن بين جسمين في نظام معزول؟',
    options: ['الطاقة الحركية فقط', 'الزخم الخطي فقط', 'الزخم الخطي والطاقة الحركية معًا', 'لا شيء منهما يكون محفوظًا'],
    correctAnswerIndex: 2,
    explanation: 'التعريف الأساسي للتصادم المرن هو التصادم الذي يتم فيه حفظ كل من الزخم الخطي الكلي والطاقة الحركية الكلية للنظام.'
  },
  {
    questionText: 'علاقة السرعة النسبية ($\\vec{v}_{1i} + \\vec{v}_{1f} = \\vec{v}_{2i} + \\vec{v}_{2f}$) صالحة للاستخدام في أي نوع من التصادمات؟',
    options: ['المرنة فقط', 'غير المرنة فقط', 'عديمة المرونة فقط', 'جميع أنواع التصادمات'],
    correctAnswerIndex: 0,
    explanation: 'هذه العلاقة هي نتيجة مباشرة للجمع بين قانوني حفظ الزخم وحفظ الطاقة الحركية، وبالتالي لا يمكن استخدامها إلا في حالة التصادمات المرنة تمامًا لتبسيط الحل.'
  },
  {
    questionText: 'كرة كتلتها $m$ تتحرك بسرعة $v$ تصطدم تصادمًا مرنًا بكرة أخرى مماثلة لها في الكتلة وساكنة. ماذا يحدث بعد التصادم؟',
    options: ['تتوقف الكرة الأولى وتتحرك الثانية بسرعة $v$', 'يلتحمان معًا ويتحركان بسرعة $v/2$', 'ترتد الكرة الأولى بسرعة $v/2$ وتتحرك الثانية بسرعة $v/2$', 'ترتد الكرة الأولى بسرعة $v$ وتتحرك الثانية بسرعة $2v$'],
    correctAnswerIndex: 0,
    explanation: 'هذه حالة خاصة ومشهورة: في التصادم المرن بين كتلتين متساويتين وإحداهما ساكنة، يحدث تبادل للسرعات. الكرة المتحركة تتوقف تمامًا، والكرة الساكنة تتحرك بنفس سرعة الكرة الأولى الابتدائية.'
  },
  {
    questionText: 'التصادم بين الجزيئات في غاز مثالي يعتبر مثالاً على التصادم...',
    options: ['غير المرن', 'عديم المرونة', 'المرن', 'فوق المرن'],
    correctAnswerIndex: 2,
    explanation: 'تعتبر التصادمات بين جزيئات الغاز المثالي مرنة تمامًا، حيث لا يوجد فقدان للطاقة الحركية على شكل حرارة أو تشوه أثناء التصادم.'
  },
  {
    questionText: 'كرة كتلتها $m_1 = 2 kg$ تتحرك بسرعة $\\vec{v}_{1i} = +4 m/s$ تصطدم تصادمًا مرنًا بكرة أخرى ساكنة $m_2 = 6 kg$. ما سرعة الكرة الأولى بعد التصادم ($\\vec{v}_{1f}$)?',
    options: ['$-2 m/s$', '$+2 m/s$', '$-4 m/s$', '$0 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم معادلتي حفظ الزخم وعلاقة السرعة النسبية. \n (1) حفظ الزخم: $m_1 v_{1i} = m_1 v_{1f} + m_2 v_{2f} \\Rightarrow (2)(4) = 2v_{1f} + 6v_{2f} \\Rightarrow 8 = 2v_{1f} + 6v_{2f}$. \n (2) السرعة النسبية: $v_{1i} + v_{1f} = v_{2i} + v_{2f} \\Rightarrow 4 + v_{1f} = 0 + v_{2f} \\Rightarrow v_{2f} = 4 + v_{1f}$. \n نعوض (2) في (1): $8 = 2v_{1f} + 6(4 + v_{1f}) \\Rightarrow 8 = 2v_{1f} + 24 + 6v_{1f} \\Rightarrow -16 = 8v_{1f} \\Rightarrow v_{1f} = -2 m/s$.'
  },
];

export default function CollisionsP1QuizPage() {
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
