
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
    questionText: 'للحصول على شبه موصل من النوع n، تتم إشابة بلورة السيليكون (رباعي التكافؤ) بذرات عنصر...',
    options: ['ثلاثي التكافؤ مثل البورون', 'رباعي التكافؤ مثل الجرمانيوم', 'خماسي التكافؤ مثل الزرنيخ', 'أحادي التكافؤ مثل الصوديوم'],
    correctAnswerIndex: 2,
    explanation: 'تتم إضافة ذرات خماسية التكافؤ (مانحة) مثل الزرنيخ أو الفسفور. أربعة من إلكتروناتها تشارك في الروابط التساهمية، ويبقى الإلكترون الخامس حراً ليزيد من الموصلية.'
  },
  {
    questionText: 'في شبه الموصل من النوع p، ما هي حاملات الشحنة الأغلبية؟',
    options: ['الإلكترونات', 'الفجوات', 'الأيونات الموجبة', 'الأيونات السالبة'],
    correctAnswerIndex: 1,
    explanation: 'في النوع p، يتم استخدام شوائب ثلاثية التكافؤ (متقبلة)، مما يخلق نقصًا في الإلكترونات في الروابط، وهو ما يُعرف بالفجوات (Holes)، والتي تتصرف كحاملات شحنة موجبة وهي الأغلبية.'
  },
  {
    questionText: 'كيف تتغير مقاومة شبه الموصل النقي مع ارتفاع درجة الحرارة؟',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'على عكس الفلزات، عند ارتفاع درجة حرارة شبه الموصل، تكتسب الإلكترونات طاقة كافية للقفز من حزمة التكافؤ إلى حزمة التوصيل، مما يزيد من عدد حاملات الشحنة (الإلكترونات والفجوات) ويقلل من المقاومة بشكل كبير.'
  },
  {
    questionText: 'ما هي "فجوة الطاقة" في أشباه الموصلات؟',
    options: ['المسافة بين الذرات', 'منطقة فارغة داخل النواة', 'الطاقة اللازمة لتحرير بروتون', 'الطاقة اللازمة لنقل إلكترون من حزمة التكافؤ إلى حزمة التوصيل'],
    correctAnswerIndex: 3,
    explanation: 'فجوة الطاقة هي منطقة من مستويات الطاقة الممنوعة التي تفصل بين حزمة التكافؤ المملوءة وحزمة التوصيل الفارغة. يجب على الإلكترون اكتساب طاقة تساوي على الأقل طاقة الفجوة ليصبح حراً ويشارك في التوصيل.'
  },
  {
    questionText: 'عند إشابة شبه موصل بذرات مانحة، فإن المادة الناتجة تكون...',
    options: ['موجبة الشحنة ككل', 'سالبة الشحنة ككل', 'متعادلة الشحنة ككل', 'تعتمد على درجة الحرارة'],
    correctAnswerIndex: 2,
    explanation: 'على الرغم من وجود فائض من الإلكترونات الحرة (حاملات الشحنة)، فإن الذرات المانحة نفسها تصبح أيونات موجبة، والبلورة ككل تبقى متعادلة كهربائيًا لأنها بدأت بذرات متعادلة.'
  },
];

export default function DopingQuizPage() {
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
