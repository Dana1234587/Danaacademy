
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
    questionText: 'ما هي صيغة القوة المغناطيسية (F) المؤثرة على سلك مستقيم طوله (L) يمر به تيار (I) وموضوع في مجال مغناطيسي (B)؟',
    options: ['$F = ILB \\cos\\theta$', '$F = I L B \\sin\\theta$', '$F = I L / B$', '$F = B L / I$'],
    correctAnswerIndex: 1,
    explanation: 'مقدار القوة المغناطيسية على سلك مستقيم يُعطى بالعلاقة $F = I L B \\sin\\theta$, حيث $\\theta$ هي الزاوية بين اتجاه التيار واتجاه المجال المغناطيسي.'
  },
  {
    questionText: 'سلك طوله 50 سم يمر به تيار 4 أمبير، ويوضع عموديًا على مجال مغناطيسي شدته 0.2 تسلا. ما مقدار القوة المؤثرة على السلك؟',
    options: ['0.4 نيوتن', '4 نيوتن', '0.2 نيوتن', '40 نيوتن'],
    correctAnswerIndex: 0,
    explanation: 'بما أن السلك عمودي على المجال، فإن $\\sin\\theta = \\sin(90^\\circ) = 1$. \n$F = ILB = 4A \\times 0.5m \\times 0.2T = 0.4 N$.'
  },
  {
    questionText: 'متى تكون القوة المغناطيسية المؤثرة على سلك يحمل تيارًا في مجال مغناطيسي تساوي صفرًا؟',
    options: ['عندما يكون السلك عموديًا على المجال', 'عندما يكون السلك موازيًا للمجال', 'عندما يكون التيار كبيرًا جدًا', 'لا يمكن أن تساوي صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'تعتمد القوة على $\\sin\\theta$. إذا كان السلك موازيًا للمجال (اتجاه التيار يوازي اتجاه المجال)، فإن الزاوية $\\theta$ تكون 0 أو 180 درجة، وفي كلتا الحالتين $\\sin\\theta=0$, وبالتالي تنعدم القوة.'
  },
  {
    questionText: 'سلك يمر به تيار من اليسار إلى اليمين، وموضوع في مجال مغناطيسي يتجه إلى داخل الصفحة. ما هو اتجاه القوة المغناطيسية المؤثرة على السلك؟',
    options: ['نحو الأعلى', 'نحو الأسفل', 'نحو اليمين', 'نحو اليسار'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم قاعدة اليد اليمنى. نوجه الأصابع باتجاه التيار (نحو اليمين)، ونجعل المجال يخرج من راحة اليد (إذا كان للداخل، يجب أن تكون راحة اليد للأعلى). سيشير الإبهام إلى اتجاه القوة، وهو نحو الأعلى.'
  },
  {
    questionText: 'لتحقيق اتزان سلك أفقي وزنه W يمر به تيار I في مجال مغناطيسي أفقي B، يجب أن تكون القوة المغناطيسية...',
    options: ['مساوية للوزن واتجاهها للأعلى', 'مساوية للوزن واتجاهها للأسفل', 'عمودية على الوزن', 'صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'لكي يتزن السلك، يجب أن تكون محصلة القوى عليه صفرًا. هذا يتطلب وجود قوة مغناطيسية مساوية في المقدار للوزن ومعاكسة له في الاتجاه، أي يجب أن تكون القوة المغناطيسية رأسية واتجاهها للأعلى.'
  },
];

export default function ForceOnConductorQuizPage() {
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
