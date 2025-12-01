
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
    questionText: 'كرة موصلة نصف قطرها $10 cm$ تحمل شحنة مقدارها $4 \\mu C$. ما مقدار المجال الكهربائي عند نقطة تبعد $30 cm$ عن مركزها؟',
    options: ['$1.0 \\times 10^6 N/C$', '$4.0 \\times 10^5 N/C$', '$9.0 \\times 10^5 N/C$', '$4.5 \\times 10^5 N/C$'],
    correctAnswerIndex: 1,
    explanation: 'النقطة تقع خارج الكرة. نستخدم قانون المجال خارج الكرة: $E = k \\frac{q}{r^2}$. \nالمسافة عن المركز $r = 30 cm = 0.3 m$. \n $E = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{(0.3)^2} = (9 \\times 10^9) \\frac{4 \\times 10^{-6}}{0.09} = 4 \\times 10^5 N/C$.'
  },
  {
    questionText: 'إذا علمت أن المجال الكهربائي على سطح كرة موصلة هو $E_0$. فما مقدار المجال عند نقطة تبعد مسافة $2R$ عن مركز الكرة؟',
    options: ['$E_0 / 2$', '$E_0 / 4$', '$E_0 / 9$', '$E_0$'],
    correctAnswerIndex: 1,
    explanation: 'على السطح: $E_0 = kq/R^2$. خارج الكرة عند مسافة $r=2R$: $E = kq/(2R)^2 = kq/(4R^2) = \\frac{1}{4} (kq/R^2) = E_0/4$.'
  },
  {
    questionText: 'كرة موصلة مشحونة نصف قطرها 5 سم. إذا كان المجال الكهربائي عند نقطة على بعد 10 سم من سطحها هو $9 \\times 10^4 N/C$، فما مقدار شحنة الكرة؟',
    options: ['$1.5 \\mu C$', '$2.25 \\mu C$', '$6 \\mu C$', '$9 \\mu C$'],
    correctAnswerIndex: 1,
    explanation: 'أولاً، نجد البعد عن المركز: $r = R + d = 5 cm + 10 cm = 15 cm = 0.15 m$. \n ثانياً، نستخدم قانون المجال خارج الكرة ونعزل الشحنة q: $q = \\frac{E r^2}{k}$. \n $q = \\frac{(9 \\times 10^4) \\times (0.15)^2}{9 \\times 10^9} = \\frac{10^4 \\times 0.0225}{10^9} = 225 \\times 10^{-9} C = 0.225 \\mu C$. هناك خطأ في الخيارات. لنعدل السؤال لتكون المسافة من المركز 15 سم. إذا كانت $q=2.25\\mu C$, $E = (9e9 * 2.25e-6) / 0.15^2 = 900000 = 9e5$. الخيارات لا تزال غير متوافقة. \n لنفترض أن المجال $10^5 N/C$. $q = (10^5 * 0.15^2) / 9e9 = 0.25 \\mu C$. \n سأصحح السؤال لتكون الإجابة منطقية مع أحد الخيارات. **سؤال مصحح**: كرة نصف قطرها 5سم، والمجال على بعد 10سم من المركز هو $9 \\times 10^5 N/C$. $q = (9e5 * 0.1^2) / 9e9 = 1 \\mu C$. \n **سؤال مصحح آخر**: كرة نصف قطرها 10 سم، والمجال على بعد 15 سم من المركز هو $10^5 N/C$. $q = (10^5 * 0.15^2)/9e9 = 0.25\\mu C$. \n سأقوم بتغيير السؤال بالكامل لسؤال حسابي واضح. **سؤال جديد**: ما مقدار المجال الكهربائي على سطح كرة موصلة نصف قطرها $3 cm$ وشحنتها $+1.2 nC$؟ \n$E = kq/R^2 = (9 \\times 10^9) \\times (1.2 \\times 10^{-9}) / (0.03)^2 = 10.8 / 0.0009 = 12000 N/C$.'
  },
  {
    questionText: 'نقطتان A و B، تقعان خارج كرة موصلة مشحونة. إذا كانت النقطة A على بعد ضعف المسافة التي تبعدها النقطة B عن مركز الكرة، فإن النسبة بين شدة المجال عند A إلى شدة المجال عند B ($E_A / E_B$) هي:',
    options: ['2', '1/2', '4', '1/4'],
    correctAnswerIndex: 3,
    explanation: 'المجال خارج الكرة يتناسب عكسيًا مع مربع المسافة ($E \\propto 1/r^2$). \n لدينا $r_A = 2r_B$. \n النسبة $\\frac{E_A}{E_B} = \\frac{1/r_A^2}{1/r_B^2} = (\\frac{r_B}{r_A})^2 = (\\frac{r_B}{2r_B})^2 = (\\frac{1}{2})^2 = \\frac{1}{4}$.'
  }
];

// Correction for question 4 for clarity and correctness
quizQuestions[3] = {
    questionText: 'ما مقدار المجال الكهربائي على سطح كرة موصلة نصف قطرها $3 cm$ وشحنتها $+1.2 nC$؟',
    options: ['$1.2 \\times 10^4 N/C$', '$4 \\times 10^3 N/C$', '$3.6 \\times 10^5 N/C$', '$1200 N/C$'],
    correctAnswerIndex: 0,
    explanation: 'المجال على السطح يُحسب من العلاقة $E = k \\frac{q}{R^2}$.\n$E = (9 \\times 10^9 \\frac{N \\cdot m^2}{C^2}) \\times \\frac{1.2 \\times 10^{-9} C}{(0.03 m)^2} = \\frac{10.8}{0.0009} = 12000 N/C = 1.2 \\times 10^4 N/C$.'
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
