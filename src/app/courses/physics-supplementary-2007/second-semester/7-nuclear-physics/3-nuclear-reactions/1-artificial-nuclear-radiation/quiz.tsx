
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
    questionText: 'في تفاعل الانشطار النووي، نواة اليورانيوم-235 تمتص... ثم تنقسم إلى نواتين أخف.',
    options: ['بروتون سريع', 'نيوترون بطيء', 'إلكترون', 'جسيم ألفا'],
    correctAnswerIndex: 1,
    explanation: 'يبدأ الانشطار النووي لليورانيوم-235 عادةً عندما تمتص النواة نيوترونًا حراريًا (بطيئًا)، مما يجعلها غير مستقرة للغاية وقابلة للانقسام.'
  },
  {
    questionText: 'ما هي العملية النووية التي تشغل الشمس والنجوم الأخرى؟',
    options: ['الانشطار النووي', 'الاضمحلال الإشعاعي', 'الاحتراق الكيميائي', 'الاندماج النووي'],
    correctAnswerIndex: 3,
    explanation: 'طاقة الشمس والنجوم تنتج عن الاندماج النووي، حيث تندمج أنوية الهيدروجين الخفيفة تحت ضغط وحرارة هائلين لتكوين أنوية هيليوم أثقل، مطلقة كميات هائلة من الطاقة.'
  },
  {
    questionText: 'أكمل التفاعل النووي التالي: $^{14}_{7}N + ^1_0n \\rightarrow$؟',
    options: ['$^1_1H + ^{14}_{6}C$', '$^4_2He + ^{11}_{5}B$', '$^{15}_{7}N + \\gamma$', '$^{15}_{8}O + ^0_{-1}e$'],
    correctAnswerIndex: 0,
    explanation: 'لحفظ العدد الكتلي والذري: \n العدد الكتلي: 14 + 1 = 15. \n العدد الذري: 7 + 0 = 7. \n يجب أن يكون مجموع الأعداد الكتلية للنواتج 15، ومجموع الأعداد الذرية 7. الخيار (أ) يحقق ذلك: A = 1+14=15, Z = 1+6=7.'
  },
  {
    questionText: 'ما هو "التفاعل المتسلسل" في سياق الانشطار النووي؟',
    options: ['سلسلة من اضمحلالات ألفا وبيتا.', 'عندما تنتج كل عملية انشطار نيوترونات تسبب انشطارات جديدة.', 'عندما تندمج النواتج مع بعضها البعض.', 'عندما ترتفع درجة حرارة المفاعل بشكل كبير.'],
    correctAnswerIndex: 1,
    explanation: 'التفاعل المتسلسل هو العملية التي تكون فيها نواتج التفاعل (النيوترونات) قادرة على بدء نفس التفاعل مرة أخرى. في الانشطار، إذا تسبب كل انشطار في انشطار آخر على الأقل، يستمر التفاعل بشكل متسلسل.'
  },
  {
    questionText: 'لماذا يصعب تحقيق الاندماج النووي على الأرض؟',
    options: ['لأنه لا ينتج طاقة كافية.', 'لأنه يتطلب درجات حرارة وضغط هائلين للتغلب على التنافر بين الأنوية.', 'لأن وقوده (الهيدروجين) نادر جدًا.', 'لأن نواتجه شديدة الإشعاع.'],
    correctAnswerIndex: 1,
    explanation: 'التحدي الرئيسي في الاندماج النووي هو التغلب على قوة التنافر الكهرومغناطيسي الهائلة بين الأنوية الموجبة الشحنة لتقريبها من بعضها البعض بما يكفي لكي تبدأ القوة النووية القوية في العمل. هذا يتطلب درجات حرارة تصل إلى ملايين الدرجات وضغطًا هائلاً، وهي الظروف الموجودة في قلب الشمس.'
  },
];

export default function ArtificialNuclearRadiationQuizPage() {
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
          <Card key={qIndex} className={\`border-2 \${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg\`}>
            <CardHeader>
              <CardTitle><SmartTextRenderer as="div" text={\`السؤال \${qIndex + 1}: \${q.questionText}\`} /></CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.options.map((option, oIndex) => (
                  <Label key={oIndex} htmlFor={\`q\${qIndex}-o\${oIndex}\`} className={\`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent \${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}\`}>
                    <RadioGroupItem value={oIndex.toString()} id={\`q\${qIndex}-o\${oIndex}\`} disabled={isSubmitted} />
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
