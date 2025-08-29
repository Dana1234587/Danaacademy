
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
    questionText: 'ما هي صيغة المجال المغناطيسي (B) على بعد مسافة عمودية (r) من سلك مستقيم طويل جدًا يمر به تيار (I)؟',
    options: ['$B = \\frac{\\mu_0 I}{2\\pi r^2}$', '$B = \\frac{\\mu_0 I}{2 r}$', '$B = \\frac{\\mu_0 I}{2\\pi r}$', '$B = \\frac{\\mu_0 I r}{2\\pi}$'],
    correctAnswerIndex: 2,
    explanation: 'المجال المغناطيسي الناتج عن سلك طويل ومستقيم يُعطى بالعلاقة $B = \\frac{\\mu_0 I}{2\\pi r}$, حيث $\\mu_0$ هو ثابت النفاذية المغناطيسية.'
  },
  {
    questionText: 'سلك مستقيم طويل يمر به تيار 10 أمبير. ما مقدار المجال المغناطيسي على بعد 20 سم من السلك؟',
    options: ['$1 \\times 10^{-5} T$', '$2 \\times 10^{-5} T$', '$1 \\times 10^{-6} T$', '$2 \\times 10^{-6} T$'],
    correctAnswerIndex: 0,
    explanation: 'نستخدم القانون $B = \\frac{\\mu_0 I}{2\\pi r}$. \n $B = \\frac{(4\\pi \\times 10^{-7}) \\times 10}{2\\pi \\times 0.20} = \\frac{2 \\times 10^{-7} \\times 10}{0.20} = \\frac{2 \\times 10^{-6}}{0.20} = 10 \\times 10^{-6} = 1 \\times 10^{-5} T$.'
  },
  {
    questionText: 'إذا تضاعف التيار المار في سلك طويل، وتضاعفت المسافة من السلك، فإن المجال المغناطيسي...',
    options: ['يتضاعف', 'يقل إلى النصف', 'يبقى كما هو', 'يزداد أربع مرات'],
    correctAnswerIndex: 2,
    explanation: 'المجال $B \\propto I/r$. إذا أصبح التيار $2I$ والمسافة $2r$, فإن المجال الجديد $B\' \\propto (2I)/(2r) = I/r$. إذن، المجال يبقى كما هو.'
  },
  {
    questionText: 'سلك مستقيم يمر به تيار نحو الأعلى. ما هو اتجاه المجال المغناطيسي عند نقطة تقع على يمين السلك؟',
    options: ['نحو الأعلى', 'نحو الأسفل', 'خارج من الصفحة', 'داخل إلى الصفحة'],
    correctAnswerIndex: 3,
    explanation: 'باستخدام قاعدة اليد اليمنى، نوجه الإبهام مع اتجاه التيار (للأعلى). عند نقطة على يمين السلك، ستشير أصابعنا الملتفة إلى داخل الصفحة.'
  },
  {
    questionText: 'عند أي نقطة يكون المجال المغناطيسي لسلك طويل لانهائي أكبر ما يمكن؟',
    options: ['عندما تكون المسافة r كبيرة جدًا', 'عندما تكون r=0 (داخل السلك)', 'عندما تكون r تساوي طول السلك', 'المجال ثابت في كل مكان'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $B = \\frac{\\mu_0 I}{2\\pi r}$, نرى أن المجال يتناسب عكسيًا مع المسافة r. كلما اقتربنا من السلك (قلت r)، زاد المجال. نظريًا، يكون المجال لانهائيًا عند r=0، ولكن عمليًا يكون أكبر ما يمكن على سطح السلك.'
  },
];

export default function FieldFromLongWireQuizPage() {
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
