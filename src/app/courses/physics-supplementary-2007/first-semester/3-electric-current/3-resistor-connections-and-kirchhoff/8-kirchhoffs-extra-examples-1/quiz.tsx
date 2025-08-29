
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { VoltmeterCircuit } from './diagram';

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
    questionText: 'في دارة كيرشوف، إذا كان لديك 3 أفرع مجهولة التيار، فستحتاج إلى تطبيق قاعدة الوصلة مرة واحدة وقاعدة العروة...',
    options: ['مرة واحدة', 'مرتين', 'ثلاث مرات', 'لا حاجة لها'],
    correctAnswerIndex: 1,
    explanation: 'لحل 3 مجاهيل، تحتاج إلى 3 معادلات مستقلة. قاعدة الوصلة (على وصلة واحدة) تعطيك معادلة واحدة. لذا، تحتاج إلى معادلتين إضافيتين من قاعدة العروة، وذلك بتطبيقها على مسارين مغلقين مستقلين.'
  },
  {
    questionText: 'لحساب فرق الجهد بين نقطتين a و b في دارة معقدة، أي مما يلي صحيح؟',
    options: ['يجب أن يكون هناك مسار مباشر بينهما', 'يمكن اختيار أي مسار بين النقطتين a و b', 'يجب أن يكون المسار مع اتجاه التيار', 'يجب أن يكون المسار لا يحتوي على بطاريات'],
    correctAnswerIndex: 1,
    explanation: 'فرق الجهد بين نقطتين لا يعتمد على المسار. يمكنك اختيار أي مسار يربط بين النقطتين وتطبيق قاعدة تغيرات الجهد عليه، وستحصل على نفس النتيجة دائمًا.'
  },
  {
    questionText: 'إذا كانت القدرة المستهلكة في مقاومة R موجبة، والقدرة المنتجة من بطارية موجبة، فهذا يعني أن...',
    options: ['التيار يمر في المقاومة والبطارية في حالة شحن', 'التيار يمر في المقاومة والبطارية في حالة تفريغ', 'الدارة لا تعمل', 'هناك خطأ في الحسابات'],
    correctAnswerIndex: 1,
    explanation: 'القدرة المستهلكة في المقاومة موجبة دائمًا. القدرة المنتجة من البطارية تكون موجبة ($P = \\varepsilon I$) عندما تكون البطارية في حالة تفريغ (التيار يخرج من قطبها الموجب).'
  },
  {
    questionText: 'في الدارة الموضحة، إذا كانت قراءة الفولتميتر المثالي هي 4 فولت، فما مقدار القوة الدافعة للبطارية ($\\varepsilon$)? (لم يتم رسم الدارة بشكل صحيح، سيتم تحديثها)',
    diagram: true,
    options: ['6 فولت', '8 فولت', '10 فولت', '12 فولت'],
    correctAnswerIndex: 2,
    explanation: 'هذا السؤال يعتمد على رسمة معينة. بشكل عام، يتم حل مثل هذه الأسئلة بتطبيق قانون كيرشوف للعروة التي تحتوي على الفولتميتر والبطارية والمقاومات الأخرى لإيجاد علاقة بين قراءة الفولتميتر والقوة الدافعة.'
  },
  {
    questionText: 'عند تطبيق قاعدة العروة على مسار مغلق، ما هو المجموع الجبري للتغيرات في الجهد؟',
    options: ['يساوي القوة الدافعة للبطارية الأكبر', 'يساوي صفر', 'يساوي التيار الكلي ضرب المقاومة الكلية', 'يعتمد على اتجاه المسار'],
    correctAnswerIndex: 1,
    explanation: 'نص قاعدة كيرشوف الثانية (قاعدة العروة) هو أن المجموع الجبري لجميع تغيرات الجهد عبر أي مسار مغلق في الدارة يساوي صفرًا دائمًا، وهذا يمثل حفظ الطاقة.'
  },
];

export default function KirchhoffsExtraExamples1QuizPage() {
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
               {q.diagram && <VoltmeterCircuit />}
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
