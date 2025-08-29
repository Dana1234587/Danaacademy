
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
    questionText: 'ملف دائري مساحته $50 cm^2$ موضوع في مجال مغناطيسي منتظم شدته 4 تسلا. ما مقدار التدفق المغناطيسي عندما يكون مستوى الملف عموديًا على المجال؟',
    options: ['0.02 وبر', '200 وبر', 'صفر', '0.2 وبر'],
    correctAnswerIndex: 0,
    explanation: 'عندما يكون مستوى الملف عموديًا على المجال، يكون متجه المساحة موازيًا للمجال، أي $\\theta = 0^\\circ$ و $\\cos(0^\\circ)=1$. المساحة $A = 50 cm^2 = 50 \\times 10^{-4} m^2$. \n $\\Phi = BA\\cos\\theta = (4 T)(50 \\times 10^{-4} m^2)(1) = 200 \\times 10^{-4} Wb = 0.02 Wb$.'
  },
  {
    questionText: 'للحصول على أكبر تدفق مغناطيسي ممكن عبر سطح، يجب وضع السطح بحيث يكون...',
    options: ['مستواه موازيًا للمجال.', 'مستواه عموديًا على المجال.', 'يصنع زاوية 45 درجة مع المجال.', 'لا يهم اتجاهه.'],
    correctAnswerIndex: 1,
    explanation: 'أكبر تدفق يحدث عندما تكون $\\cos\\theta$ في أكبر قيمة لها، وهي 1. هذا يحدث عندما تكون $\\theta = 0^\\circ$, أي عندما يكون متجه المساحة (العمودي على السطح) موازيًا للمجال، وهو ما يعني أن مستوى السطح نفسه يكون عموديًا على خطوط المجال.'
  },
  {
    questionText: 'ملف مستطيل أبعاده 10 سم و 20 سم، موضوع في مجال مغناطيسي 0.5 تسلا. إذا كان التدفق المغناطيسي عبره يساوي $5 \\times 10^{-3}$ وبر، فما هي الزاوية بين المجال ومتجه المساحة؟',
    options: ['$0^\\circ$', '$30^\\circ$', '$60^\\circ$', '$90^\\circ$'],
    correctAnswerIndex: 2,
    explanation: 'المساحة $A = 0.1 m \\times 0.2 m = 0.02 m^2$. \n من قانون التدفق $\\Phi = BA\\cos\\theta$, \n $\\cos\\theta = \\frac{\\Phi}{BA} = \\frac{5 \\times 10^{-3}}{(0.5)(0.02)} = \\frac{5 \\times 10^{-3}}{0.01} = 0.5$. \n الزاوية التي جيب تمامها 0.5 هي $60^\\circ$.'
  },
  {
    questionText: 'إذا تم تدوير ملف في مجال مغناطيسي منتظم، فإن التدفق المغناطيسي عبره...',
    options: ['يبقى ثابتًا دائمًا.', 'يتغير بشكل جيبي مع زاوية الدوران.', 'يساوي صفرًا دائمًا.', 'يزداد دائمًا.'],
    correctAnswerIndex: 1,
    explanation: 'عند تدوير الملف، تتغير الزاوية $\\theta$ بين المجال ومتجه المساحة. بما أن التدفق يعتمد على $\\cos\\theta$, فإنه سيتغير بشكل دوري (جيبي) مع دوران الملف، متراوحًا بين قيمة عظمى موجبة وقيمة عظمى سالبة مرورًا بالصفر.'
  },
  {
    questionText: 'ما هو التغير في التدفق المغناطيسي عبر حلقة إذا تغير المجال المغناطيسي الذي يخترقها عموديًا من 2 تسلا إلى 5 تسلا، ومساحة الحلقة $0.1 m^2$؟',
    options: ['0.3 وبر', '3 وبر', '0.7 وبر', '7 وبر'],
    correctAnswerIndex: 0,
    explanation: 'التغير في التدفق $\\Delta\\Phi = \\Phi_f - \\Phi_i = (B_f A \\cos\\theta) - (B_i A \\cos\\theta) = (B_f - B_i)A\\cos\\theta$. \n بما أن المجال عمودي على السطح، $\\theta=0$. \n $\\Delta\\Phi = (5T - 2T)(0.1 m^2)(1) = 3T \\times 0.1m^2 = 0.3 Wb$.'
  },
];

export default function MagneticFluxQuestionsQuizPage() {
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
