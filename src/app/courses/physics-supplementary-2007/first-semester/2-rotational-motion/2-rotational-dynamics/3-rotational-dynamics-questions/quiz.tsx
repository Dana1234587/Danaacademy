
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
    questionText: 'أربع جسيمات نقطية متطابقة كتلة كل منها m موضوعة عند رؤوس مربع طول ضلعه L. ما هو عزم القصور الذاتي للنظام حول محور يمر بمركزه وعمودي على مستواه؟',
    options: ['$mL^2$', '$2mL^2$', '$3mL^2$', '$4mL^2$'],
    correctAnswerIndex: 1,
    explanation: 'المسافة من المركز إلى أي رأس هي $d = \\sqrt{(L/2)^2 + (L/2)^2} = \\sqrt{L^2/2} = L/\\sqrt{2}$. عزم القصور لكل جسيم هو $m d^2 = m(L/\\sqrt{2})^2 = mL^2/2$. العزم الكلي هو $4 \\times (mL^2/2) = 2mL^2$.'
  },
  {
    questionText: 'ما النسبة بين عزم القصور الذاتي لكرة مصمتة وعزم القصور الذاتي لأسطوانة مصمتة لهما نفس الكتلة M ونفس نصف القطر R، ويدوران حول محور يمر بمركزهما؟ $I_{كرة} = \\frac{2}{5}MR^2$, $I_{اسطوانة} = \\frac{1}{2}MR^2$.',
    options: ['4/5', '5/4', '2/5', '1'],
    correctAnswerIndex: 0,
    explanation: 'النسبة المطلوبة هي $\\frac{I_{كرة}}{I_{اسطوانة}} = \\frac{\\frac{2}{5}MR^2}{\\frac{1}{2}MR^2} = \\frac{2/5}{1/2} = \\frac{4}{5}$.'
  },
  {
    questionText: 'قضيب رفيع كتلته M وطوله L. إذا كان عزم قصوره الذاتي حول أحد طرفيه هو $I_1$ وحول منتصفه هو $I_2$. ما العلاقة بينهما؟',
    options: ['$I_1 = I_2$', '$I_1 = 2I_2$', '$I_1 = 4I_2$', '$I_2 = 4I_1$'],
    correctAnswerIndex: 2,
    explanation: '$I_1 = \\frac{1}{3}ML^2$ و $I_2 = \\frac{1}{12}ML^2$. النسبة $\\frac{I_1}{I_2} = \\frac{1/3}{1/12} = 4$. إذن، $I_1 = 4I_2$.'
  },
  {
    questionText: 'يدور إطار سيارة حول محوره. إذا أضيفت قطعة من الطين إلى حافة الإطار الخارجية، فإن عزم قصوره الذاتي...',
    options: ['يزداد', 'يقل', 'يبقى كما هو', 'يصبح صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'إضافة كتلة جديدة إلى النظام، وخصوصًا عند أبعد نقطة عن محور الدوران (الحافة الخارجية)، يزيد من القيمة الإجمالية لـ $\\sum mr^2$, وبالتالي يزداد عزم القصور الذاتي.'
  },
  {
    questionText: 'إذا كان لديك قرص مصمت وحلقة لهما نفس الكتلة ونفس نصف القطر الخارجي. أي منهما سيتدحرج إلى أسفل منحدر مائل بشكل أبطأ إذا بدءا من السكون معًا؟',
    options: ['القرص المصمت', 'الحلقة', 'سيصلان في نفس الوقت', 'لا يمكن التحديد'],
    correctAnswerIndex: 1,
    explanation: 'الجسم ذو عزم القصور الذاتي الأكبر سيقاوم التغير في حركته الدورانية أكثر، وبالتالي سيكون تسارعه الزاوي أقل، وسيصل إلى أسفل المنحدر أبطأ. الحلقة لها عزم قصور ذاتي ($MR^2$) أكبر من القرص المصمت ($\frac{1}{2}MR^2$)، لذا ستكون أبطأ.'
  },
];

export default function RotationalDynamicsQuestionsQuizPage() {
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
