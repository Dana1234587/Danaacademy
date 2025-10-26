
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { UniformBeam, SeesawBalanced, HangingSign, SeesawFindDistance, BeamOnTwoSupports } from './diagram';

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
    questionText: 'لوح خشبي منتظم طوله 5 متر ووزنه 200 نيوتن، يرتكز على حاملين عند طرفيه. إذا جلس طفل وزنه 300 نيوتن على بعد 2 متر من الطرف الأيسر، فما مقدار قوة رد الفعل من الحامل الأيمن ($F_R$)?',
    diagram: 'uniform-beam',
    options: ['190 نيوتن', '220 نيوتن', '250 نيوتن', '500 نيوتن'],
    correctAnswerIndex: 1,
    explanation: 'لتحقيق الاتزان الدوراني، نختار محور الدوران عند الحامل الأيسر ($F_L$) ونطبق $\\Sigma\\tau = 0$. (عكس عقارب الساعة موجب).\nعزم وزن اللوح (يؤثر في المنتصف على بعد 2.5 متر) = $-(200 N)(2.5 m) = -500 N \\cdot m$.\nعزم وزن الطفل = $-(300 N)(2 m) = -600 N \\cdot m$.\nعزم رد فعل الحامل الأيمن ($F_R$) على بعد 5 متر = $+(F_R)(5 m)$.\n$\\Sigma\\tau = 5F_R - 600 - 500 = 0 \\implies 5F_R = 1100 \\implies F_R = 220 N$.'
  },
  {
    questionText: 'لوح منتظم طوله 8 م ووزنه 400 نيوتن، يرتكز على حاملين يبعدان 1م عن كل طرف. إذا وُضع جسم وزنه 800 نيوتن على بعد 1.5 متر من الحامل الأيمن، فما مقدار قوة رد الفعل عند الحامل الأول F1؟',
    diagram: 'beam',
    options: ['600 N', '800 N', '1200 N', '400 N'],
    correctAnswerIndex: 3,
    explanation: 'المسافة بين الحاملين هي $8 - 1 - 1 = 6$ متر. نأخذ العزوم حول الحامل الثاني (F2). \nوزن اللوح يؤثر في المنتصف (على بعد 3م من F2). الجسم 800N على بعد 1.5م من F2. قوة F1 تبعد 6م عن F2.\n$\\Sigma \\tau_{F2} = (F_1 \\times 6) - (400 \\times 3) - (800 \\times 1.5) = 0$. \n $6F_1 - 1200 - 1200 = 0 \\implies 6F_1 = 2400 \\implies F_1 = 400 N$.'
  },
   {
    questionText: 'لوح خشبي مهمل الوزن طوله L، يرتكز على حامل في منتصفه. إذا وُضع جسم وزنه W على بعد L/4 يسار المركز، فأين يجب وضع جسم آخر وزنه 2W لتحقيق الاتزان؟',
    diagram: 'seesaw_symbolic',
    options: ['على بعد L/8 يمين المركز', 'على بعد L/4 يمين المركز', 'على بعد L/2 يمين المركز', 'على بعد L/8 يسار المركز'],
    correctAnswerIndex: 0,
    explanation: 'للاتزان، يجب أن يكون العزم الذي يحدثه الجسم الأول (عكس عقارب الساعة) يجب أن يساوي العزم الذي يحدثه الجسم الثاني (مع عقارب الساعة) حول نقطة الارتكاز (المركز). \n $\\tau_1 = \\tau_2 \\implies F_1 d_1 = F_2 d_2$. \n الجسم الأول وزنه W ومسافته عن المركز هي L/4. \n $W \\times (L/4) = (2W) \\times d_2$. \n بقسمة الطرفين على W: $L/4 = 2d_2 \\implies d_2 = L/8$. \n يجب وضع الجسم الثاني على بعد L/8 من المركز على الجهة المقابلة (اليمين).'
  },
  {
    questionText: 'في لعبة التوازن الموضحة، يجلس طفل وزنه 400 نيوتن على بعد 1.5 متر من نقطة الارتكاز. على أي بعد (d) من نقطة الارتكاز يجب أن يجلس طفل آخر وزنه 300 نيوتن ليحدث اتزان؟',
    diagram: 'seesaw_find_d',
    options: ['1.5 متر', '2.0 متر', '2.5 متر', '1.125 متر'],
    correctAnswerIndex: 1,
    explanation: 'لتحقيق الاتزان الدوراني، يجب أن يكون عزم الطفل الأول مساويًا لعزم الطفل الثاني. \n $\\tau_1 = \\tau_2 \\implies F_1 d_1 = F_2 d$. \n $(400 N)(1.5 m) = (300 N) d$. \n $600 = 300 d \\implies d = 600 / 300 = 2.0$ متر.'
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
                {q.diagram === 'uniform-beam' && <UniformBeam />}
                {q.diagram === 'beam' && <BeamOnTwoSupports />}
                {q.diagram === 'seesaw_symbolic' && <HangingSign />}
                {q.diagram === 'seesaw_find_d' && <SeesawFindDistance />}
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
