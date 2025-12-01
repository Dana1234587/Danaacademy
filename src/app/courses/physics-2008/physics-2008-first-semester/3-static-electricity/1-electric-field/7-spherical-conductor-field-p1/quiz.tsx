
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { ElectricFieldGraph } from './diagram';

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
    questionText: 'ما مقدار المجال الكهربائي عند نقطة تبعد مسافة $r < R$ عن مركز كرة موصلة مشحونة نصف قطرها $R$؟',
    options: ['$E = k \\frac{q}{R^2}$', '$E = k \\frac{q}{r^2}$', '$E = 0$', '$E = k \\frac{q}{r}$'],
    correctAnswerIndex: 2,
    explanation: 'وفقًا لقانون غاوس، لا توجد شحنة محصورة داخل أي سطح غاوسي يُرسم داخل الموصل. لذلك، يكون المجال الكهربائي في أي نقطة داخل الموصل المشحون وفي حالة اتزان يساوي صفرًا.'
  },
  {
    questionText: 'كرة موصلة نصف قطرها $10 cm$ تحمل شحنة مقدارها $4 \\mu C$. ما مقدار المجال الكهربائي عند نقطة تبعد $20 cm$ عن سطحها؟',
    options: ['$1.0 \\times 10^6 N/C$', '$4.0 \\times 10^5 N/C$', '$9.0 \\times 10^5 N/C$', '$4.5 \\times 10^5 N/C$'],
    correctAnswerIndex: 0,
    explanation: 'أولاً، نحسب البعد عن المركز: $r = R + d = 10 cm + 20 cm = 30 cm = 0.3 m$. \nثانياً، نطبق قانون المجال خارج الكرة: $E = k \\frac{q}{r^2} = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{(0.3)^2} = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{0.09} = 100 \\times 10^9 \\times 4 \\times 10^{-6} = 4 \\times 10^5 N/C$. هناك خطأ في الحساب. الحساب الصحيح: $E = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{0.09} = \\frac{36 \\times 10^3}{0.09} = 400 \\times 10^3 = 4 \\times 10^5 N/C$. إذا الخيار ب هو الصحيح. سأصحح الشرح للإجابة (أ). $r=0.3m$. $E = (9 \\times 10^9) \\times (4 \\times 10^{-6}) / (0.3^2) = 36000 / 0.09 = 400000 = 4 \\times 10^5 N/C$. \nيبدو أن هناك خطأ في الخيارات. لنفترض أن السؤال هو "على بعد 20 سم من المركز": $r=0.2m$. $E = (9 \\times 10^9) \\times (4 \\times 10^{-6}) / (0.2^2) = 36000 / 0.04 = 900000 = 9 \\times 10^5 N/C$. (الخيار ج). \nلنجرب الخيار (أ) $1.0 \\times 10^6 N/C$. هذا يعني أن $r^2 = kq/E = 9e9 * 4e-6 / 1e6 = 0.036 \\implies r=0.189m$. \nسأعدل السؤال ليتناسب مع الإجابة. السؤال الجديد: "...نقطة تبعد 30 سم عن المركز". الإجابة $4 \\times 10^5 N/C$.'
  },
  {
    questionText: 'في الرسم البياني للمجال الكهربائي مقابل البعد عن المركز، أين يكون المجال الكهربائي في قيمته العظمى؟',
    diagram: true,
    options: ['عند المركز (r=0)', 'داخل الكرة (r < R)', 'على سطح الكرة (r = R)', 'خارج الكرة (r > R)'],
    correctAnswerIndex: 2,
    explanation: 'كما يوضح الرسم البياني، يكون المجال صفرًا داخل الكرة، ثم يقفز فجأة إلى قيمته العظمى عند السطح (r=R)، ثم يبدأ بالتناقص كلما ابتعدنا عن السطح.'
  },
  {
    questionText: 'ما هي العلاقة الرياضية التي يتبعها تناقص المجال الكهربائي خارج الكرة الموصلة؟',
    diagram: true,
    options: ['$E \\propto \\frac{1}{r}$', '$E \\propto r$', '$E \\propto \\frac{1}{r^2}$', 'E ثابت'],
    correctAnswerIndex: 2,
    explanation: 'خارج الكرة، يتصرف المجال كما لو كان ناتجًا عن شحنة نقطية في المركز. قانون كولوم يخبرنا أن المجال الكهربائي يتناسب عكسيًا مع مربع المسافة ($E = kq/r^2$).'
  },
  {
    questionText: 'إذا علمت أن المجال الكهربائي على سطح كرة موصلة هو $E_0$. فما مقدار المجال عند نقطة تبعد مسافة $2R$ عن مركز الكرة؟',
    options: ['$E_0 / 2$', '$E_0 / 4$', '$E_0 / 9$', '$E_0$'],
    correctAnswerIndex: 1,
    explanation: 'على السطح: $E_0 = kq/R^2$. خارج الكرة عند مسافة $r=2R$: $E = kq/(2R)^2 = kq/(4R^2) = \\frac{1}{4} (kq/R^2) = E_0/4$.'
  }
];

// Correction for question 2 based on analysis
quizQuestions[1] = {
    questionText: 'كرة موصلة نصف قطرها $10 cm$ تحمل شحنة مقدارها $4 \\mu C$. ما مقدار المجال الكهربائي عند نقطة تبعد $30 cm$ عن مركزها؟',
    options: ['$1.0 \\times 10^6 N/C$', '$4.0 \\times 10^5 N/C$', '$9.0 \\times 10^5 N/C$', '$4.5 \\times 10^5 N/C$'],
    correctAnswerIndex: 1,
    explanation: 'النقطة تقع خارج الكرة. نستخدم قانون المجال خارج الكرة: $E = k \\frac{q}{r^2}$. \nالمسافة عن المركز $r = 30 cm = 0.3 m$. \n $E = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{(0.3)^2} = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{0.09} = 4 \\times 10^5 N/C$.'
};


export default function QuizPage() {
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
              {q.diagram && <ElectricFieldGraph />}
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
                    <SmartTextRenderer as="p" text={q.explanation} className="text-muted-foreground" />
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

