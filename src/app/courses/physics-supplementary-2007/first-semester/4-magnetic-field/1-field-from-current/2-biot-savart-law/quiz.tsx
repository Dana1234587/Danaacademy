
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
    questionText: 'قانون بيو-سافار يستخدم لحساب المجال المغناطيسي الناتج عن...',
    options: ['مغناطيس دائم', 'شحنة نقطية متحركة', 'عنصر صغير من سلك يمر به تيار', 'مجال كهربائي متغير'],
    correctAnswerIndex: 2,
    explanation: 'قانون بيو-سافار هو القانون الأساسي الذي يعطينا المجال المغناطيسي ($d\\vec{B}$) الناتج عن عنصر تفاضلي صغير ($d\\vec{l}$) من سلك يحمل تيارًا (I). لحساب المجال الكلي، يتم التكامل على طول السلك.'
  },
  {
    questionText: 'مقدار المجال المغناطيسي ($dB$) الناتج عن عنصر تيار ($Idl$) يتناسب عكسيًا مع...',
    options: ['مقدار التيار (I)', 'مربع المسافة من العنصر (r²)', 'طول العنصر (dl)', 'جيب الزاوية (sinθ)'],
    correctAnswerIndex: 1,
    explanation: 'وفقًا لقانون بيو-سافار، $dB = \\frac{\\mu_0}{4\\pi} \\frac{I dl \\sin\\theta}{r^2}$. من الواضح أن المجال يتناسب عكسيًا مع مربع المسافة (r²).'
  },
  {
    questionText: 'باستخدام قاعدة اليد اليمنى، إذا كان إبهامك يشير إلى اتجاه التيار في سلك مستقيم، فإلى ماذا تشير أصابعك الملتفة؟',
    options: ['اتجاه القوة المغناطيسية', 'اتجاه المجال الكهربائي', 'اتجاه خطوط المجال المغناطيسي الدائرية حول السلك', 'لا شيء مما سبق'],
    correctAnswerIndex: 2,
    explanation: 'هذه هي قاعدة اليد اليمنى الأولى لتحديد اتجاه المجال المغناطيسي حول سلك مستقيم. الإبهام مع التيار، والتفاف الأصابع يعطي اتجاه دوران خطوط المجال المغناطيسي.'
  },
  {
    questionText: 'في أي حالة يكون المجال المغناطيسي الناتج عن عنصر تيار عند نقطة ما يساوي صفرًا؟',
    options: ['عندما تكون النقطة قريبة جدًا من السلك', 'عندما تكون النقطة بعيدة جدًا عن السلك', 'عندما تقع النقطة على امتداد خط عنصر التيار', 'عندما تكون النقطة عمودية تمامًا على عنصر التيار'],
    correctAnswerIndex: 2,
    explanation: 'المجال المغناطيسي $dB$ يعتمد على $sin\\theta$, حيث $\\theta$ هي الزاوية بين عنصر التيار $d\\vec{l}$ ومتجه الموضع $\\vec{r}$. إذا كانت النقطة تقع على امتداد خط التيار، فإن الزاوية $\\theta$ تكون 0 أو 180 درجة، وفي كلتا الحالتين $sin\\theta = 0$, وبالتالي ينعدم المجال.'
  },
  {
    questionText: 'ما هي قيمة ثابت النفاذية المغناطيسية للفراغ ($\\mu_0$)؟',
    options: ['$8.85 \\times 10^{-12} T \\cdot m/A$', '$4\\pi \\times 10^{-7} T \\cdot m/A$', '$6.67 \\times 10^{-11} T \\cdot m/A$', '$9 \\times 10^9 T \\cdot m/A$'],
    correctAnswerIndex: 1,
    explanation: 'ثابت النفاذية المغناطيسية للفراغ أو الهواء هو ثابت فيزيائي أساسي، وقيمته تساوي بالضبط $4\\pi \\times 10^{-7} T \\cdot m/A$.'
  },
];

export default function BiotSavartLawQuizPage() {
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
