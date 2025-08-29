
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
    questionText: 'ما هو تعريف "الازدواج" في الفيزياء؟',
    options: ['أي قوتين تؤثران على جسم', 'قوتان متساويتان في المقدار ومتعاكستان في الاتجاه وليس لهما خط العمل نفسه', 'قوتان متساويتان في المقدار وفي نفس الاتجاه', 'قوة واحدة تؤثر بعيدًا عن محور الدوران'],
    correctAnswerIndex: 1,
    explanation: 'الازدواج يتكون من قوتين متساويتين مقدارًا ومتعاكستين اتجاهًا، وشرط أساسي أن يكون خطا عملهما غير متطابقين، مما يسبب دورانًا صافيًا.'
  },
  {
    questionText: 'قوتان مقدار كل منهما 20 نيوتن تؤثران على طرفي عجلة قيادة قطرها 40 سم لتكوين ازدواج. ما مقدار عزم الازدواج؟',
    options: ['$4 N \\cdot m$', '$8 N \\cdot m$', '$16 N \\cdot m$', '$800 N \\cdot m$'],
    correctAnswerIndex: 1,
    explanation: 'عزم الازدواج = (مقدار إحدى القوتين) × (المسافة العمودية بينهما). \n المسافة العمودية هي قطر العجلة = 40 سم = 0.4 متر. \n $τ = 20 N \\times 0.4 m = 8 N \\cdot m$.'
  },
  {
    questionText: 'إذا أثر ازدواج على جسم، فإن محصلة القوى المؤثرة على الجسم تساوي...',
    options: ['ضعف مقدار إحدى القوتين', 'نصف مقدار إحدى القوتين', 'صفر', 'تعتمد على ذراع القوة'],
    correctAnswerIndex: 2,
    explanation: 'بما أن الازدواج يتكون من قوتين متساويتين في المقدار ومتعاكستين في الاتجاه، فإن مجموعهما المتجهي (القوة المحصلة) يساوي صفرًا. لذلك، الازدواج يسبب دورانًا فقط دون إحداث حركة انتقالية.'
  },
  {
    questionText: 'عزم الازدواج المؤثر على جسم لا يعتمد على...',
    options: ['مقدار القوتين', 'المسافة العمودية بين القوتين', 'موضع محور الدوران', 'اتجاه القوتين'],
    correctAnswerIndex: 2,
    explanation: 'من خصائص عزم الازدواج أنه لا يعتمد على موضع محور الدوران، فطالما أن القوتين تحققان شروط الازدواج، سيكون عزمهما ثابتًا بغض النظر عن النقطة التي نحسب العزم حولها.'
  },
  {
    questionText: 'تؤثر قوتان مقدار كل منهما F على قضيب مهمل الكتلة طوله L كما في الشكل (عند الطرفين وبزاوية 30 درجة مع العمودي). ما مقدار عزم الازدواج؟',
    options: ['$FL$', '$FL\\sin(30)$', '$FL\\cos(30)$', '$2FL$'],
    correctAnswerIndex: 1,
    explanation: 'عزم الازدواج يساوي إحدى القوتين مضروبة في المسافة العمودية بينهما. المسافة العمودية هنا هي $d = L\\sin(30)$. إذن $τ = F \\times (L\\sin(30))$.'
  },
];

export default function CoupleTorqueQuizPage() {
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
