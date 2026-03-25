import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const quizQuestions = [
  {
    questionText: 'ما هو تعريف الجهد المتردد (AC)؟',
    options: [
      'الجهد المستمر (DC) الذي لا يتغير مع الزمن.',
      'الجهد الذي يتغير قيمته واتجاهه دورياً مع الزمن.',
      'الجهد الذي يزداد فقط في الاتجاه الموجب.',
      'الجهد الثابت في الدائرة.'
    ],
    correctAnswerIndex: 1,
    explanation: 'الجهد المتردد يتغير قيمته واتجاهه بشكل دوري، عادةً على شكل موجة جيبية.'
  },
  {
    questionText: 'ما هو العلاقة بين التردد (f) والزمن الدوري (T)؟',
    options: [
      'f = T',
      'f = 1/T',
      'f = 2πT',
      'f = √T'
    ],
    correctAnswerIndex: 1,
    explanation: 'التردد هو عدد الدورات في الثانية، وهو مقلوب الزمن الدوري.'
  },
  {
    questionText: 'ما هو التعبير عن الجهد اللحظي (v) في دارة AC؟',
    options: [
      'v = V_{max} \cos(\omega t)',
      'v = V_{max} \sin(\omega t)',
      'v = I_{max} \sin(\omega t)',
      'v = I_{max} \cos(\omega t)'
    ],
    correctAnswerIndex: 1,
    explanation: 'الجهد اللحظي يُعطى بالمعادلة v = V_{max} \sin(\omega t).'
  }
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleAnswerChange = (qIdx, oIdx) => {
    if (isSubmitted) return;
    const newAns = [...selectedAnswers];
    newAns[qIdx] = oIdx;
    setSelectedAnswers(newAns);
  };

  const calculateScore = () => selectedAnswers.filter((ans, i) => ans === quizQuestions[i].correctAnswerIndex).length;

  return (
    <div className="p-4 bg-muted/40">
      <div className="max-w-4xl mx-auto space-y-8">
        {quizQuestions.map((q, qIdx) => (
          <Card key={qIdx} className={`border-2 ${isSubmitted ? (selectedAnswers[qIdx] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors`)}>
            <CardHeader>
              <CardTitle>
                <div dir="rtl" className="text-right">السؤال {qIdx + 1}: {q.questionText}</div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup value={selectedAnswers[qIdx]?.toString() ?? ''} onValueChange={v => handleAnswerChange(qIdx, parseInt(v))} className="grid grid-cols-1 gap-4">
                {q.options.map((opt, oIdx) => (
                  <Label key={oIdx} className={`p-3 rounded border flex items-center gap-2 cursor-pointer ${selectedAnswers[qIdx] === oIdx ? 'bg-primary/10 border-primary' : 'bg-background'}`} htmlFor={`q${qIdx}-o${oIdx}`} dir="rtl">
                    <RadioGroupItem id={`q${qIdx}-o${oIdx}`} value={oIdx.toString()} disabled={isSubmitted} />
                    <span>{opt}</span>
                    {isSubmitted && selectedAnswers[qIdx] === oIdx && selectedAnswers[qIdx] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto" />}
                    {isSubmitted && oIdx === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500 ms-auto" />}
                  </Label>
                ))}
              </RadioGroup>
            </CardContent>
            {isSubmitted && (
              <CardFooter className="bg-muted/20 p-4">
                <p className="font-bold">الشرح:</p>
                <p>{q.explanation}</p>
              </CardFooter>
            )}
          </Card>
        ))}
        <div className="text-center mt-8">
          {!isSubmitted ? (
            <Button onClick={() => setIsSubmitted(true)} size="lg" className="w-full max-w-xs mx-auto">إظهار النتائج</Button>
          ) : (
            <Card className="max-w-sm mx-auto p-6">
              <CardTitle className="text-2xl mb-4">نتيجتك النهائية</CardTitle>
              <p className="text-3xl font-bold text-primary">{calculateScore()} / {quizQuestions.length}</p>
              <Button onClick={() => { setIsSubmitted(false); setSelectedAnswers(new Array(quizQuestions.length).fill(null)); }} variant="outline" className="mt-6">إعادة الاختبار</Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
