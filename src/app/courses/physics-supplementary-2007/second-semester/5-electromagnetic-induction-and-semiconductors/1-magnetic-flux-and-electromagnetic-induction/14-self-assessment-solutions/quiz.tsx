
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
    questionText: 'أي من الخيارات التالية يمثل التطبيق العملي لظاهرة الحث الذاتي؟',
    options: ['المقاومة الكهربائية', 'المكثف', 'المحث', 'البطارية'],
    correctAnswerIndex: 2,
    explanation: 'المحث (أو الملف) هو العنصر الإلكتروني الذي تم تصميمه خصيصًا للاستفادة من ظاهرة الحث الذاتي، حيث يقاوم التغيرات في التيار المار فيه.'
  },
  {
    questionText: 'في دارة RL، ما الذي يحدد القيمة النهائية للتيار بعد فترة طويلة من إغلاق المفتاح؟',
    options: ['محاثة المحث (L) فقط', 'مقاومة الدارة (R) فقط', 'القوة الدافعة للبطارية والمقاومة الكلية', 'القوة الدافعة للبطارية والمحاثة'],
    correctAnswerIndex: 2,
    explanation: 'بعد فترة طويلة، يصبح التيار ثابتًا ويعمل المحث كسلك عديم المقاومة. في هذه الحالة، يتم تحديد التيار النهائي فقط بواسطة قانون أوم البسيط: $I_{final} = \\varepsilon / R_{total}$.'
  },
  {
    questionText: 'ما هي وظيفة القلب الحديدي الذي يوضع داخل المحولات والملفات؟',
    options: ['تقليل المقاومة الكهربائية للملف', 'زيادة النفاذية المغناطيسية للمسار الذي يسلكه التدفق', 'تبريد الملفات', 'زيادة سرعة تغير التيار'],
    correctAnswerIndex: 1,
    explanation: 'الحديد مادة فيرومغناطيسية لها نفاذية مغناطيسية ($\\mu$) عالية جدًا. وضع قلب حديدي يزيد من تركيز خطوط المجال المغناطيسي ويزيد التدفق بشكل كبير، مما يؤدي إلى زيادة المحاثة وكفاءة المحول.'
  },
  {
    questionText: 'إذا تغير التدفق المغناطيسي عبر ملف من 8 وبر إلى 2 وبر خلال 3 ثوان، وكان عدد لفات الملف 10، فما متوسط القوة الدافعة الحثية؟',
    options: ['-20 فولت', '20 فولت', '-2 فولت', '2 فولت'],
    correctAnswerIndex: 1,
    explanation: 'التغير في التدفق $\\Delta\\Phi_B = \\Phi_f - \\Phi_i = 2 - 8 = -6 Wb$. \n $\\varepsilon = -N \\frac{\\Delta \\Phi_B}{\\Delta t} = -10 \\times \\frac{-6 Wb}{3 s} = -10 \\times (-2) = +20$ فولت.'
  },
  {
    questionText: 'موصل مستقيم يتحرك في مجال مغناطيسي. لكي تتولد فيه أكبر قوة دافعة حثية حركية، يجب أن تكون الزاوية بين متجه السرعة ومتجه المجال المغناطيسي:',
    options: ['$0^\\circ$', '$45^\\circ$', '$90^\\circ$', '$180^\\circ$'],
    correctAnswerIndex: 2,
    explanation: 'القوة الدافعة الحثية الحركية تُعطى بالعلاقة $\\varepsilon = BLv\\sin\\theta$. تصل هذه القوة إلى قيمتها العظمى عندما تكون $\\sin\\theta$ في أكبر قيمة لها، وهي 1، وهذا يحدث عند زاوية $90^\\circ$.'
  },
];

export default function SelfAssessmentSolutionsQuizPage() {
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
