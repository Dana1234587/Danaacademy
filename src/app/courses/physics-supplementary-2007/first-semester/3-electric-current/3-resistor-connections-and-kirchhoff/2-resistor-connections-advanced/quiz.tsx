
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { WheatstoneBridge } from './diagram';

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
    questionText: 'متى يتم إلغاء مقاومة في دارة كهربائية؟',
    options: ['عندما توصل على التوالي مع البطارية', 'عندما يوصل سلك عديم المقاومة على التوازي معها', 'عندما تكون قيمتها كبيرة جداً', 'عندما يمر بها تيار عالٍ'],
    correctAnswerIndex: 1,
    explanation: 'عند توصيل سلك مثالي (مقاومته صفر) على التوازي مع مقاومة، سيمر كل التيار عبر السلك (لأنه يوفر مسارًا أسهل بكثير)، ولن يمر أي تيار في المقاومة، وبالتالي يتم إلغاؤها من حسابات الدارة.'
  },
  {
    questionText: 'في قنطرة وتستون الموضحة، ما هو شرط اتزانها؟',
    diagram: 'wheatstone',
    options: ['$R_1/R_3 = R_2/R_4$', '$R_1 R_2 = R_3 R_4$', '$R_1 + R_2 = R_3 + R_4$', 'جميع ما سبق'],
    correctAnswerIndex: 0,
    explanation: 'تكون قنطرة وتستون متزنة عندما يكون فرق الجهد بين النقطتين c و d صفرًا، مما يعني عدم مرور تيار في المقاومة $R_5$. يتحقق هذا الشرط عندما تكون نسبة المقاومات في أحد فرعي القنطرة تساوي نسبتها في الفرع الآخر: $R_1/R_3 = R_2/R_4$.'
  },
  {
    questionText: 'في قنطرة وتستون متزنة، إذا كانت $R_1=10\\Omega$, $R_3=20\\Omega$, و $R_2=5\\Omega$, فما قيمة $R_4$؟',
    diagram: 'wheatstone',
    options: ['$2.5 \\Omega$', '$10 \\Omega$', '$40 \\Omega$', '$15 \\Omega$'],
    correctAnswerIndex: 1,
    explanation: 'من شرط الاتزان: $R_1/R_3 = R_2/R_4$. \n $10/20 = 5/R_4 \\implies 0.5 = 5/R_4 \\implies R_4 = 5 / 0.5 = 10 \\Omega$.'
  },
  {
    questionText: 'في دارة تحتوي على مقاومات متماثلة مرتبة بشكل متماثل حول محور، يمكن تبسيط الدارة عن طريق...',
    options: ['إزالة المقاومة الموجودة على محور التماثل', 'مضاعفة قيمة المقاومة الموجودة على محور التماثل', 'تجاهل جميع المقاومات', 'لا يمكن تبسيطها'],
    correctAnswerIndex: 0,
    explanation: 'إذا كانت الدارة متماثلة حول محور معين، فإن النقاط المتناظرة على جانبي المحور يكون لها نفس الجهد. إذا كانت مقاومة تقع على محور التماثل، فإن فرق الجهد بين طرفيها سيكون صفرًا، وبالتالي لا يمر بها تيار ويمكن إزالتها لتبسيط الدارة.'
  },
  {
    questionText: 'مقاومة قيمتها R وصلت بين نقطتين a و b. ثم وصلت مقاومة أخرى قيمتها R على التوازي معها. المقاومة المكافئة الجديدة هي:',
    options: ['2R', 'R', 'R/2', 'R/4'],
    correctAnswerIndex: 2,
    explanation: 'عند توصيل مقاومتين متماثلتين (R) على التوازي، فإن المقاومة المكافئة تُعطى بالعلاقة: $\\frac{1}{R_{eq}} = \\frac{1}{R} + \\frac{1}{R} = \\frac{2}{R}$. إذن، $R_{eq} = R/2$.'
  },
];

export default function ResistorConnectionsAdvancedQuizPage() {
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
              {q.diagram === 'wheatstone' && <WheatstoneBridge r1={qIndex === 2 ? "10Ω" : "R1"} r2={qIndex === 2 ? "5Ω" : "R2"} r3={qIndex === 2 ? "20Ω" : "R3"} r4={qIndex === 2 ? "R4" : "R4"} r5="R5"/>}
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
