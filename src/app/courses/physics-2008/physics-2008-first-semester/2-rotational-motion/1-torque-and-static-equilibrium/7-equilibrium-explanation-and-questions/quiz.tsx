
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { SeesawBalanced, BeamOnTwoSupports, HangingSign, Ladder, BeamWithWeight } from './diagram';

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
    questionText: 'لوح خشبي متزن أفقيًا كما في الشكل. ما مقدار القوة F اللازمة لتحقيق الاتزان؟ (أهمل وزن اللوح)',
    diagram: 'seesaw',
    options: ['428.6 N', '600 N', '840 N', '300 N'],
    correctAnswerIndex: 0,
    explanation: 'للاتزان الدوراني، مجموع العزوم حول نقطة الارتكاز يساوي صفرًا. \n عزم القوة الأولى (عكس عقارب الساعة) = $600 N \\times 2.0 m = 1200 N \\cdot m$. \n عزم القوة الثانية (مع عقارب الساعة) = $-F \\times 1.4 m$. \n $\\Sigma\\tau = 1200 - 1.4F = 0 \\implies 1.4F = 1200 \\implies F = 1200 / 1.4 \\approx 428.6 N$.'
  },
  {
    questionText: 'لوح منتظم طوله 8 م ووزنه 400 نيوتن، يرتكز على حاملين. إذا وُضع جسم وزنه 800 نيوتن على بعد 1.5 متر من الحامل الأيمن، فما مقدار قوة رد الفعل عند الحامل الأول F1؟',
    diagram: 'beam',
    options: ['600 N', '800 N', '1200 N', '371 N'],
    correctAnswerIndex: 3,
    explanation: 'نأخذ العزوم حول الحامل الثاني (F2). طول اللوح 8م ووزنه يؤثر في المنتصف (على بعد 3م من F2). الجسم 800N على بعد 1.5م من F2. المسافة بين الحاملين هي 7م. \n $\\Sigma \\tau_{F2} = (F_1 \\times 7) - (400 \\times 3) - (800 \\times 1.5) = 0$. \n $7F_1 - 1200 - 1200 = 0 \\implies 7F_1 = 2400 \\implies F_1 \\approx 371.4 N$.'
  },
   {
    questionText: 'لوح خشبي مهمل الوزن طوله L، يرتكز على حامل في منتصفه. إذا وُضع جسم وزنه W على بعد L/4 من الطرف الأيسر، فأين يجب وضع جسم آخر وزنه 2W لتحقيق الاتزان؟',
    diagram: 'seesaw_symbolic',
    options: ['على بعد L/8 من الطرف الأيمن', 'على بعد L/4 من الطرف الأيمن', 'على بعد L/8 من المركز', 'على بعد L/4 من المركز'],
    correctAnswerIndex: 2,
    explanation: 'للاتزان، يجب أن يكون العزم الذي يحدثه الجسم الأول مساوياً للعزم الذي يحدثه الجسم الثاني حول نقطة الارتكاز (المركز). \n $\\tau_1 = \\tau_2 \\implies F_1 d_1 = F_2 d_2$. \n الجسم الأول وزنه W ومسافته عن المركز هي L/4. \n $W \\times (L/4) = (2W) \\times d_2$. \n بقسمة الطرفين على W: $L/4 = 2d_2 \\implies d_2 = L/8$. \n يجب وضع الجسم الثاني على بعد L/8 من المركز على الجهة المقابلة.'
  },
  {
    questionText: 'سلم منتظم وزنه 300 نيوتن يستند على حائط رأسي أملس وأرض أفقية خشنة كما في الشكل. ما مقدار قوة الاحتكاك السكوني اللازمة لمنع السلم من الانزلاق؟',
    diagram: 'ladder',
    options: ['300 N', '150 N', '86.6 N', '173.2 N'],
    correctAnswerIndex: 2,
    explanation: 'للاتزان، نأخذ العزوم حول نقطة استناد السلم على الأرض. القوى التي تسبب العزم هي وزن السلم (مع عقارب الساعة) ورد فعل الحائط $N_2$ (عكس عقارب الساعة). وزن السلم يؤثر في المنتصف. \n $\\Sigma\\tau = N_2(L\\sin60) - W(L/2 \\cos60) = 0$. \n $N_2 (L \\times 0.866) = 300(L/2 \\times 0.5) \\implies 0.866 N_2 = 75 \\implies N_2 \\approx 86.6 N$. \n من الاتزان الأفقي، قوة الاحتكاك $f_s$ يجب أن تساوي رد فعل الحائط $N_2$. إذن $f_s \\approx 86.6 N$.'
  },
  {
    questionText: 'قضيب مهمل الوزن متزن أفقيًا. ما مقدار القوة F اللازمة لتحقيق هذا الاتزان؟',
    diagram: 'beam_with_weight',
    options: ['35.7 N', '50 N', '100 N', '28 N'],
    correctAnswerIndex: 0,
    explanation: 'للاتزان الدوراني حول نقطة الارتكاز (المحور): مجموع العزوم مع عقارب الساعة = مجموع العزوم عكس عقارب الساعة. \n عزم الوزن (مع عقارب الساعة) = $100 N \\times 1.0 m = 100 N \\cdot m$. \n عزم القوة F (عكس عقارب الساعة) = $F \\times 2.8 m$. \n $F \\times 2.8 = 100 \\implies F = 100 / 2.8 \\approx 35.7 N$.'
  },
];


export default function EquilibriumQuestionsQuizPage() {
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
                {q.diagram === 'seesaw' && <SeesawBalanced />}
                {q.diagram === 'beam' && <BeamOnTwoSupports />}
                {q.diagram === 'seesaw_symbolic' && <HangingSign />}
                {q.diagram === 'ladder' && <Ladder />}
                {q.diagram === 'beam_with_weight' && <BeamWithWeight />}
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

