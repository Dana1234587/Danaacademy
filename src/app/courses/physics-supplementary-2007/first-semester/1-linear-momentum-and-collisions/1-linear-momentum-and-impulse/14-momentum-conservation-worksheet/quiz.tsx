
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
    questionText: 'تتحرك كرة كتلتها $4 kg$ بسرعة $3 m/s$ نحو الشرق، فتصطدم بكرة أخرى ساكنة كتلتها $2 kg$. إذا التحمت الكرتان معًا بعد التصادم، فما سرعتهما المشتركة؟',
    options: ['$1 m/s$ شرقًا', '$2 m/s$ شرقًا', '$3 m/s$ شرقًا', '$1.5 m/s$ شرقًا'],
    correctAnswerIndex: 1,
    explanation: 'هذا تصادم عديم المرونة. نطبق حفظ الزخم: $p_i = p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = (m_1+m_2)v_f$. \n $(4)(3) + (2)(0) = (4+2)v_f$. \n $12 = 6v_f \\Rightarrow v_f = 2 m/s$ شرقًا.'
  },
  {
    questionText: 'قذيفة كتلتها $5 kg$ تتحرك أفقيًا بسرعة $100 m/s$ تنفجر إلى جزأين. الأول كتلته $2 kg$ ويتحرك بنفس اتجاه القذيفة الأصلي بسرعة $250 m/s$. ما سرعة الجزء الثاني الذي كتلته $3 kg$؟',
    options: ['$0 m/s$', '$100 m/s$ بنفس الاتجاه', '$50 m/s$ بعكس الاتجاه', '$0 m/s$ وتتحرك بعكس الاتجاه'],
    correctAnswerIndex: 3,
    explanation: 'الزخم الابتدائي $p_i = 5 \\times 100 = 500 kg \\cdot m/s$. \n الزخم النهائي $p_f = (2)(250) + (3)v_{2f} = 500 + 3v_{2f}$. \n من حفظ الزخم: $p_i = p_f$. \n $500 = 500 + 3v_{2f} \\Rightarrow 3v_{2f} = 0 \\Rightarrow v_{2f} = 0 m/s$. الجزء الثاني يتوقف.'
  },
  {
    questionText: 'ما مقدار الطاقة الحركية المفقودة في التصادم الموصوف في السؤال الأول؟',
    options: ['$6 J$', '$12 J$', '$18 J$', '$24 J$'],
    correctAnswerIndex: 0,
    explanation: 'الطاقة الابتدائية $K_i = \\frac{1}{2}m_1 v_{1i}^2 = \\frac{1}{2}(4)(3^2) = 18 J$. \n الطاقة النهائية $K_f = \\frac{1}{2}(m_1+m_2)v_f^2 = \\frac{1}{2}(6)(2^2) = 12 J$. \n الطاقة المفقودة = $K_i - K_f = 18 - 12 = 6 J$.'
  },
  {
    questionText: 'رائد فضاء كتلته $70 kg$ يطفو في الفضاء، قام برمي مفتاح ربط كتلته $2 kg$ بسرعة $10 m/s$ بعيدًا عنه. ما هي سرعة ارتداد رائد الفضاء؟',
    options: ['$0.29 m/s$', '$0.5 m/s$', '$1.4 m/s$', '$2 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'النظام (رائد الفضاء + المفتاح) كان ساكنًا، إذن الزخم الابتدائي = 0. \n من حفظ الزخم: $0 = m_a v_a + m_w v_w$. \n $0 = (70)v_a + (2)(10)$. \n $70 v_a = -20 \\Rightarrow v_a = -20/70 \\approx -0.286 m/s$. المقدار هو 0.29 m/s تقريبًا.'
  },
  {
    questionText: 'في أي نوع من التصادمات يكون الزخم الخطي والطاقة الحركية محفوظين دائمًا؟',
    options: ['غير المرن', 'عديم المرونة', 'المرن', 'جميع ما سبق'],
    correctAnswerIndex: 2,
    explanation: 'التصادم المرن هو النوع الوحيد من التصادمات الذي يتم فيه حفظ كل من الزخم الخطي الكلي والطاقة الحركية الكلية للنظام.'
  },
];

export default function MomentumConservationWorksheetQuizPage() {
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
