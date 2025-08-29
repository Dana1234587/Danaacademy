
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
    questionText: 'ما هي "منطقة الاستنزاف" (Depletion Region) في الوصلة p-n؟',
    options: ['منطقة تحتوي على فائض من الإلكترونات والفجوات.', 'منطقة خالية من حاملات الشحنة المتحركة عند الوصلة.', 'الوصلة المعدنية بين القطعتين.', 'المنطقة التي يحدث فيها التوصيل الكهربائي.'],
    correctAnswerIndex: 1,
    explanation: 'منطقة الاستنزاف تتكون عند التقاء القطعتين p و n بسبب انتشار بعض الإلكترونات والفجوات عبر الوصلة وإعادة اتحادها. هذه المنطقة تصبح خالية من حاملات الشحنة الحرة وتتكون فيها أيونات ثابتة موجبة وسالبة.'
  },
  {
    questionText: 'لكي يسمح الثنائي بمرور التيار، يجب توصيله في حالة...',
    options: ['انحياز أمامي', 'انحياز عكسي', 'لا يهم نوع الانحياز', 'توصيل على التوالي'],
    correctAnswerIndex: 0,
    explanation: 'في الانحياز الأمامي (القطب الموجب للبطارية مع p، والسالب مع n)، يقل عرض منطقة الاستنزاف بشكل كبير، مما يسمح للتيار بالمرور بسهولة.'
  },
  {
    questionText: 'ما هي الوظيفة الأساسية للثنائي في الدارات الكهربائية؟',
    options: ['تضخيم التيار', 'تخزين الشحنة', 'تقويم التيار (السماح له بالمرور في اتجاه واحد)', 'زيادة مقاومة الدارة'],
    correctAnswerIndex: 2,
    explanation: 'الخاصية الأساسية للثنائي هي أنه يعمل كصمام كهربائي أحادي الاتجاه، مما يجعله مثاليًا لعملية تقويم التيار المتردد وتحويله إلى تيار مستمر (أو نابض).'
  },
  {
    questionText: 'الترانزستور من نوع npn يتكون من ثلاث مناطق هي:',
    options: ['باعث، قاعدة، جامع', 'مصدر، بوابة، مصرف', 'أنود، كاثود، شبكة', 'ملف ابتدائي، ملف ثانوي، قلب'],
    correctAnswerIndex: 0,
    explanation: 'يتكون الترانزستور ثنائي القطبية من ثلاث مناطق: الباعث (Emitter)، القاعدة (Base)، والجامع (Collector).'
  },
  {
    questionText: 'لكي يعمل الترانزستور npn كمضخم، يجب أن تكون وصلة (باعث-قاعدة) منحازة... ووصلة (جامع-قاعدة) منحازة...',
    options: ['أماميًا، أماميًا', 'عكسيًا، عكسيًا', 'أماميًا، عكسيًا', 'عكسيًا، أماميًا'],
    correctAnswerIndex: 2,
    explanation: 'في وضع التضخيم الفعال، تكون وصلة الباعث-قاعدة منحازة أماميًا للسماح بمرور تيار كبير من الباعث إلى القاعدة، بينما تكون وصلة الجامع-قاعدة منحازة عكسيًا لسحب معظم هذا التيار نحو الجامع.'
  },
];

export default function DiodeAndTransistorQuizPage() {
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
