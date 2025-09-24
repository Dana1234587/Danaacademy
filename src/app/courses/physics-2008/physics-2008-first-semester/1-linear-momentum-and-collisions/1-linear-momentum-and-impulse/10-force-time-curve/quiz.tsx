
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { Diagram1, Diagram2 } from './diagram';

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
    questionText: 'في منحنى (القوة-الزمن)، ماذا تمثل المساحة المحصورة تحت المنحنى؟',
    options: ['الشغل المبذول', 'التغير في طاقة الحركة', 'الدفع (التغير في الزخم)', 'القوة المتوسطة'],
    correctAnswerIndex: 2,
    explanation: 'المساحة تحت منحنى (القوة-الزمن) تمثل تكامل القوة بالنسبة للزمن ($I = \\int F dt$)، وهو ما يُعرف بالدفع، والذي يساوي بدوره التغير في الزخم الخطي.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني الأول، ما مقدار الدفع المؤثر على الجسم خلال الثواني الأربع الأولى؟',
    diagram: 'diagram1',
    options: ['$40 Ns$', '$80 Ns$', '$120 Ns$', '$160 Ns$'],
    correctAnswerIndex: 1,
    explanation: 'الدفع هو المساحة تحت المنحنى. الشكل هو مثلث. \n المساحة = $\\frac{1}{2} \\times القاعدة \\times الارتفاع = \\frac{1}{2} \\times 4 s \\times 40 N = 80 Ns$.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني الأول، إذا كانت كتلة الجسم $10 kg$ وبدأ حركته من السكون، فما سرعته النهائية بعد $4 s$؟',
    diagram: 'diagram1',
    options: ['$4 m/s$', '$8 m/s$', '$10 m/s$', '$40 m/s$'],
    correctAnswerIndex: 1,
    explanation: 'من السؤال السابق، الدفع $I = 80 Ns$. \n الدفع يساوي التغير في الزخم: $I = \\Delta p = m(v_f - v_i)$. \n $80 = 10(v_f - 0) \\Rightarrow v_f = 8 m/s$.'
  },
  {
    questionText: 'بالاعتماد على الرسم البياني الثاني، ما هي القوة المتوسطة المؤثرة على الجسم خلال الفترة الزمنية من $t=0$ إلى $t=5 s$؟',
    diagram: 'diagram2',
    options: ['$10 N$', '$12 N$', '$15 N$', '$20 N$'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نحسب الدفع الكلي وهو المساحة الكلية. الشكل عبارة عن شبه منحرف. \n المساحة = $\\frac{1}{2} \\times (مجموع القاعدتين المتوازيتين) \\times الارتفاع = \\frac{1}{2} \\times ((5-0) + (4-1)) \\times 15 = \\frac{1}{2} \\times (5 + 3) \\times 15 = 60 Ns$. \n القوة المتوسطة $F_{avg} = \\frac{I}{\\Delta t} = \\frac{60 Ns}{5 s} = 12 N$.'
  },
  {
    questionText: 'جسم كتلته $2 kg$ تأثر بقوة كما في الرسم البياني الثاني، إذا كان الجسم ساكناً في البداية، فما مقدار طاقة حركته النهائية عند $t = 5 s$؟',
    diagram: 'diagram2',
    options: ['$450 J$', '$600 J$', '$900 J$', '$1200 J$'],
    correctAnswerIndex: 2,
    explanation: 'أولاً، نحسب الدفع الكلي وهو 60Ns (من السؤال السابق). \n الدفع يساوي التغير في الزخم: $I = \\Delta p = m(v_f - v_i)$. \n $60 = 2(v_f - 0) \\Rightarrow v_f = 30 m/s$. \n الآن نحسب الطاقة الحركية النهائية: $K_f = \\frac{1}{2} m v_f^2 = \\frac{1}{2} (2) (30)^2 = 900 J$.'
  },
];

export default function ForceTimeCurveQuizPage() {
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
              {q.diagram === 'diagram1' && <Diagram1 />}
              {q.diagram === 'diagram2' && <Diagram2 />}
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
