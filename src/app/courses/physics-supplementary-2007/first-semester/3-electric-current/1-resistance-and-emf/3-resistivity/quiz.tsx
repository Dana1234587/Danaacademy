
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
    questionText: 'على ماذا تعتمد مقاومية ($\\rho$) الموصل الفلزي؟',
    options: ['طول الموصل ومساحة مقطعه', 'فرق الجهد المطبق عليه', 'نوع مادة الموصل ودرجة حرارته', 'شدة التيار المار فيه'],
    correctAnswerIndex: 2,
    explanation: 'المقاومية (Resistivity) هي خاصية فيزيائية للمادة نفسها، وتعتمد بشكل أساسي على نوع المادة ودرجة حرارتها، ولا تعتمد على الأبعاد الهندسية للموصل.'
  },
  {
    questionText: 'سلك نحاسي طوله L ومساحة مقطعه A ومقاومته R. إذا تم سحب السلك بحيث زاد طوله إلى 2L مع بقاء حجمه ثابتًا، فما مقاومته الجديدة؟',
    options: ['R/2', 'R', '2R', '4R'],
    correctAnswerIndex: 3,
    explanation: 'عند سحب السلك، يبقى حجمه ثابتًا (V = A × L). إذا أصبح الطول الجديد $L\' = 2L$، فإن مساحة المقطع الجديدة $A\' = A/2$. المقاومة الجديدة $R\' = \\rho \\frac{L\'}{A\'} = \\rho \\frac{2L}{A/2} = 4 (\\rho \\frac{L}{A}) = 4R$.'
  },
  {
    questionText: 'ماذا يحدث لمقاومية معظم الفلزات عند زيادة درجة حرارتها؟',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تصبح صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'بزيادة درجة الحرارة، تزداد سعة اهتزاز ذرات الفلز، مما يزيد من عدد تصادمات الإلكترونات الحرة معها ويعيق حركتها، وبالتالي تزداد المقاومية.'
  },
  {
    questionText: 'وحدة قياس المقاومية ($\\rho$) هي:',
    options: ['أوم ($\\Omega$)', 'أوم / متر ($\\Omega/m$)', 'أوم . متر ($\\Omega \\cdot m$)', 'متر / أوم ($m/\\Omega$)'],
    correctAnswerIndex: 2,
    explanation: 'من قانون المقاومة $R = \\rho L/A$, يمكننا إعادة ترتيبه للحصول على $\\rho = RA/L$. وبالتالي، وحدتها هي (أوم × متر مربع) / متر = أوم . متر.'
  },
  {
    questionText: 'موصلان من نفس المادة ولهما نفس الطول. إذا كانت مساحة مقطع الموصل الأول ضعف مساحة مقطع الثاني، فإن مقاومة الأول تكون...',
    options: ['ضعف مقاومة الثاني', 'نصف مقاومة الثاني', 'تساوي مقاومة الثاني', 'ربع مقاومة الثاني'],
    correctAnswerIndex: 1,
    explanation: 'المقاومة تتناسب عكسيًا مع مساحة المقطع ($R \\propto 1/A$). بما أن $A_1 = 2A_2$, فإن $R_1$ ستكون نصف $R_2$.'
  },
];

export default function ResistivityQuizPage() {
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
