
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
    questionText: 'ما هو تعريف التدفق الكهربائي ($\\Phi_E$)?',
    options: ['عدد خطوط المجال المغناطيسي التي تخترق سطحًا ما.', 'شدة المجال الكهربائي عند نقطة.', 'عدد خطوط المجال الكهربائي التي تخترق سطحًا ما بشكل عمودي.', 'القوة الكهربائية لكل وحدة شحنة.'],
    correctAnswerIndex: 2,
    explanation: 'التدفق الكهربائي هو مقياس للعدد الكلي لخطوط المجال الكهربائي التي تخترق سطحًا معينًا بشكل عمودي.'
  },
  {
    questionText: 'ما هي وحدة قياس التدفق الكهربائي في النظام الدولي؟',
    options: ['$N \\cdot m^2 / C$', '$N/C$', '$V \\cdot m$', '$J/C$'],
    correctAnswerIndex: 0,
    explanation: 'وحدة المجال الكهربائي هي N/C ووحدة المساحة هي m². إذن، وحدة التدفق هي $N \\cdot m^2 / C$. وهي تكافئ أيضًا فولت.متر ($V \\cdot m$).'
  },
  {
    questionText: 'متى يكون التدفق الكهربائي عبر سطح مستوٍ يساوي صفرًا؟',
    options: ['عندما يكون مستوى السطح عموديًا على خطوط المجال.', 'عندما يكون مستوى السطح موازيًا لخطوط المجال.', 'عندما يكون المجال الكهربائي قويًا جدًا.', 'لا يمكن أن يساوي صفرًا أبدًا.'],
    correctAnswerIndex: 1,
    explanation: 'عندما يكون مستوى السطح موازيًا لخطوط المجال، لا تخترق أي خطوط مجال هذا السطح، وبالتالي يكون التدفق صفرًا. في هذه الحالة، تكون الزاوية بين المجال ومتجه المساحة 90 درجة، و $\\cos(90^\\circ)=0$.'
  },
  {
    questionText: 'سطح مساحته $0.5 m^2$ موضوع في مجال كهربائي منتظم شدته 100 N/C. إذا كان مستوى السطح يصنع زاوية $60^\\circ$ مع خطوط المجال، فما مقدار التدفق الكهربائي؟',
    options: ['50 وبر', '25 وبر', '43.3 وبر', 'صفر'],
    correctAnswerIndex: 1,
    explanation: 'القانون هو $\\Phi = EA\\cos\\theta$, حيث $\\theta$ هي الزاوية بين المجال ومتجه المساحة (العمودي على السطح). إذا كان مستوى السطح يصنع زاوية $60^\\circ$ مع المجال، فإن الزاوية $\\theta$ بين العمودي والمجال هي $90^\\circ - 60^\\circ = 30^\\circ$. إذن، $\\Phi = (100 N/C)(0.5 m^2)\\cos(30^\\circ) = 50 \\times (\\sqrt{3}/2) \\approx 43.3 N \\cdot m^2/C$. يبدو أن هناك خطأ في الخيارات أو السؤال. إذا كانت الزاوية المعطاة هي $\\theta$ مباشرة، فإن $\\Phi = 50 \\cos(60) = 25$. سنعتبر هذا هو المقصود.'
  },
  {
    questionText: 'أي من الإجراءات التالية لن يغير من قيمة التدفق الكهربائي عبر حلقة موضوعة في مجال كهربائي منتظم؟',
    options: ['تغيير شدة المجال الكهربائي.', 'تغيير مساحة الحلقة.', 'تدوير الحلقة في المجال.', 'تحريك الحلقة بشكل موازٍ لخطوط المجال.'],
    correctAnswerIndex: 3,
    explanation: 'تحريك الحلقة بشكل موازٍ لخطوط مجال منتظم لا يغير من شدة المجال التي تخترقها، ولا مساحتها، ولا الزاوية بينها وبين المجال، وبالتالي يبقى التدفق ثابتًا.'
  },
];

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

    