
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
    questionText: 'ما هو "فرق الكتلة" (Mass Defect) في سياق الفيزياء النووية؟',
    options: ['الفرق بين كتلة الإلكترون وكتلة البروتون.', 'الطاقة المفقودة أثناء التفاعل النووي.', 'الفرق بين مجموع كتل النيوكليونات المنفردة والكتلة الفعلية للنواة.', 'الكتلة التي تتحول إلى سرعة حسب معادلة أينشتاين.'],
    correctAnswerIndex: 2,
    explanation: 'فرق الكتلة هو النقص في الكتلة الذي يحدث عندما تتجمع البروتونات والنيوترونات لتكوين نواة. هذه الكتلة "المفقودة" تتحول إلى طاقة ربط نووية وفقًا لمعادلة $E=mc^2$.'
  },
  {
    questionText: 'إذا كانت طاقة الربط النووية لنواة الهيليوم ($^{4}_{2}He$) تساوي $28.3 MeV$، فما هي طاقة الربط لكل نيوكليون؟',
    options: ['$28.3 MeV$/نيوكليون', '$14.15 MeV$/نيوكليون', '$7.075 MeV$/نيوكليون', '$4.0 MeV$/نيوكليون'],
    correctAnswerIndex: 2,
    explanation: 'طاقة الربط لكل نيوكليون = (طاقة الربط الكلية) / (العدد الكتلي A). \n العدد الكتلي للهيليوم-4 هو 4. \n إذن، $28.3 MeV / 4 = 7.075 MeV$/نيوكليون.'
  },
  {
    questionText: 'ماذا تستنتج من منحنى طاقة الربط لكل نيوكليون؟',
    options: ['الأنوية الخفيفة جدًا والثقيلة جدًا أقل استقرارًا من الأنوية متوسطة الكتلة.', 'جميع الأنوية لها نفس درجة الاستقرار.', 'الأنوية الأثقل هي دائمًا الأكثر استقرارًا.', 'الأنوية الأخف هي دائمًا الأكثر استقرارًا.'],
    correctAnswerIndex: 0,
    explanation: 'يُظهر منحنى طاقة الربط لكل نيوكليون أن القيمة تصل إلى ذروتها عند الأنوية متوسطة الكتلة (مثل الحديد-56). هذا يعني أن هذه الأنوية هي الأكثر استقرارًا. الأنوية الخفيفة جدًا (مثل الهيدروجين) والثقيلة جدًا (مثل اليورانيوم) لديها طاقة ربط أقل لكل نيوكليون، وبالتالي هي أقل استقرارًا.'
  },
  {
    questionText: 'عمليتا الانشطار النووي والاندماج النووي كلتاهما تنتجان طاقة. كيف يمكن ذلك؟',
    options: ['لأن كلتا العمليتين تخلقان كتلة.', 'لأن النواتج في كلتا العمليتين لديها طاقة ربط لكل نيوكليون أكبر من المتفاعلات.', 'لأن الانشطار يحدث للأنوية الخفيفة والاندماج للثقيلة.', 'هذا غير ممكن، واحدة منهما فقط تنتج طاقة.'],
    correctAnswerIndex: 1,
    explanation: 'تحدث عملية إنتاج الطاقة عندما تكون النواتج النهائية أكثر استقرارًا (لديها طاقة ربط أعلى لكل نيوكليون) من المتفاعلات. في الانشطار، نواة ثقيلة تنقسم إلى نوى متوسطة أكثر استقرارًا. في الاندماج، نوى خفيفة تندمج لتكوين نواة أثقل وأكثر استقرارًا. في كلتا الحالتين، ننتقل نحو قمة منحنى طاقة الربط.'
  },
  {
    questionText: 'ما هي وحدة الكتل الذرية (u)؟',
    options: ['كتلة بروتون واحد.', 'كتلة إلكترون واحد.', '$1/12$ من كتلة ذرة الكربون-12.', 'كتلة نواة الهيدروجين.'],
    correctAnswerIndex: 2,
    explanation: 'تُعرَّف وحدة الكتل الذرية (u) بأنها تساوي بالضبط $1/12$ من كتلة ذرة نظير الكربون-12 المتعادلة كهربائيًا وفي حالتها القاعية.'
  },
];

export default function NuclearBindingEnergyQuizPage() {
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
                    <SmartTextRenderer as="p" text={q.explanation} className="text-muted-foreground" />
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
