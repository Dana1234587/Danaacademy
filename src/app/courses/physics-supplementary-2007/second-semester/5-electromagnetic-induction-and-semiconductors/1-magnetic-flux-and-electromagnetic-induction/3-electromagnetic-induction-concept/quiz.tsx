
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
    questionText: 'ما هو الشرط الأساسي لتوليد قوة دافعة كهربائية حثية في ملف؟',
    options: ['وجود مجال مغناطيسي قوي.', 'وجود ملف بعدد لفات كبير.', 'تغير التدفق المغناطيسي الذي يخترق الملف.', 'حركة الملف بسرعة ثابتة.'],
    correctAnswerIndex: 2,
    explanation: 'ينص قانون فارادي على أن القوة الدافعة الحثية تتولد فقط عند حدوث تغير في التدفق المغناطيسي عبر الملف مع الزمن. وجود تدفق ثابت لا يولد أي تيار.'
  },
  {
    questionText: 'عند تقريب القطب الشمالي لمغناطيس من حلقة موصلة، ماذا يحدث؟',
    options: ['يتولد تيار حثي في الحلقة.', 'لا يحدث شيء.', 'تنجذب الحلقة نحو المغناطيس فقط.', 'تتنافر الحلقة مع المغناطيس فقط.'],
    correctAnswerIndex: 0,
    explanation: 'حركة المغناطيس بالنسبة للحلقة تغير التدفق المغناطيسي عبر الحلقة. هذا التغير في التدفق يولد قوة دافعة كهربائية حثية، والتي بدورها تسبب سريان تيار حثي في الحلقة (إذا كانت مغلقة).'
  },
  {
    questionText: 'أي من الإجراءات التالية لن يولد تيارًا حثيًا في حلقة موصلة موضوعة في مجال مغناطيسي منتظم؟',
    options: ['زيادة شدة المجال المغناطيسي.', 'تدوير الحلقة حول محور في مستواها.', 'سحب الحلقة خارج المجال.', 'تحريك الحلقة بموازاة خطوط المجال داخل المنطقة التي يكون فيها المجال منتظمًا.'],
    correctAnswerIndex: 3,
    explanation: 'تحريك الحلقة بموازاة خطوط المجال داخل منطقة منتظمة لا يغير من التدفق المغناطيسي (لا B ولا A ولا $\\theta$ تتغير)، وبالتالي لن يتولد تيار حثي. جميع الإجراءات الأخرى تسبب تغيرًا في التدفق.'
  },
  {
    questionText: 'ظاهرة الحث الكهرومغناطيسي هي عملية تحويل...',
    options: ['الطاقة الكهربائية إلى طاقة مغناطيسية.', 'الطاقة الحركية إلى طاقة كهربائية.', 'الطاقة الكيميائية إلى طاقة كهربائية.', 'الطاقة المغناطيسية إلى طاقة حرارية.'],
    correctAnswerIndex: 1,
    explanation: 'الحث الكهرومغناطيسي هو المبدأ الأساسي لعمل المولدات الكهربائية، حيث يتم تحويل الطاقة الميكانيكية (الحركية) إلى طاقة كهربائية عن طريق تدوير ملف في مجال مغناطيسي (أو العكس).'
  },
  {
    questionText: 'مكتشف ظاهرة الحث الكهرومغناطيسي هو العالم:',
    options: ['أندريه أمبير', 'مايكل فارادي', 'جيمس كلارك ماكسويل', 'هانز كريستيان أورستد'],
    correctAnswerIndex: 1,
    explanation: 'يعود الفضل في اكتشاف ظاهرة الحث الكهرومغناطيسي بشكل مستقل لكل من مايكل فارادي في إنجلترا وجوزيف هنري في الولايات المتحدة حوالي عام 1831، لكن فارادي هو من نشر نتائجه أولاً.'
  },
];

export default function ElectromagneticInductionConceptQuizPage() {
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
