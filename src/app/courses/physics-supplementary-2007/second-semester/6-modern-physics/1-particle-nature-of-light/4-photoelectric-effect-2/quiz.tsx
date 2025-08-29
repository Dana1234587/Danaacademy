
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
    questionText: 'ما هي معادلة أينشتاين الكهروضوئية؟',
    options: ['$K_{max} = hf + \\phi$', '$K_{max} = hf - \\phi$', '$K_{max} = \\phi - hf$', '$E = mc^2$'],
    correctAnswerIndex: 1,
    explanation: 'المعادلة تمثل حفظ الطاقة: طاقة الفوتون الساقط ($hf$) تُستخدم في تحرير الإلكترون (تكلف طاقة $\\phi$)، والطاقة المتبقية تظهر على شكل طاقة حركية عظمى للإلكترون ($K_{max}$).'
  },
  {
    questionText: 'سقط ضوء تردده $1.0 \\times 10^{15} Hz$ على فلز اقتران الشغل له 2.5 eV. ما الطاقة الحركية العظمى للإلكترونات المتحررة؟ \n(علماً أن $h \\approx 4.14 \\times 10^{-15} eV\\cdot s$)',
    options: ['1.64 eV', '2.5 eV', '4.14 eV', '6.64 eV'],
    correctAnswerIndex: 0,
    explanation: 'أولاً، نحسب طاقة الفوتون: $E = hf = (4.14 \\times 10^{-15}) \\times (1.0 \\times 10^{15}) = 4.14$ eV. \n ثانياً، نطبق معادلة أينشتاين: $K_{max} = hf - \\phi = 4.14 eV - 2.5 eV = 1.64$ eV.'
  },
  {
    questionText: 'ما هو "جهد الإيقاف" (Stopping Potential)؟',
    options: ['الجهد اللازم لبدء انبعاث الإلكترونات.', 'فرق الجهد الذي يجعل أسرع الإلكترونات المتحررة تتوقف تمامًا قبل الوصول إلى المصعد.', 'جهد البطارية في الدارة.', 'الجهد الذي يحرق الفلز.'],
    correctAnswerIndex: 1,
    explanation: 'جهد الإيقاف ($V_s$) هو فرق الجهد العكسي الذي يجب تطبيقه لإيقاف التيار الكهروضوئي تمامًا. عند هذه النقطة، يكون الشغل المبذول بواسطة المجال الكهربائي مساويًا للطاقة الحركية العظمى لأسرع الإلكترونات: $K_{max} = e V_s$.'
  },
  {
    questionText: 'إذا كانت الطاقة الحركية العظمى للإلكترونات المنبعثة هي 3.2 eV، فما هو جهد الإيقاف؟',
    options: ['3.2 فولت', '1.6 فولت', '0.5 فولت', 'لا يمكن تحديده'],
    correctAnswerIndex: 0,
    explanation: 'العلاقة بين الطاقة الحركية العظمى (بوحدة eV) وجهد الإيقاف (بوحدة فولت) هي علاقة مباشرة. إذا كانت الطاقة 3.2 eV، فإن جهد الإيقاف هو 3.2 فولت.'
  },
  {
    questionText: 'عند زيادة تردد الضوء الساقط على فلز، ماذا يحدث لمقدار جهد الإيقاف؟',
    options: ['يقل', 'يبقى ثابتًا', 'يزداد', 'يصبح صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'زيادة تردد الضوء تزيد من طاقة الفوتون الساقط ($hf$). هذا يؤدي إلى زيادة الطاقة الحركية العظمى للإلكترونات المتحررة ($K_{max} = hf - \\phi$). وبما أن $K_{max} = e V_s$, فإن زيادة $K_{max}$ تؤدي إلى زيادة مقدار جهد الإيقاف $V_s$.'
  },
];

export default function PhotoelectricEffect2QuizPage() {
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
