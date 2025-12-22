
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { UniformFieldDiagram } from './diagram';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


const quizQuestions = [
  {
    questionText: 'الجهد الكهربائي عند نقطة في مجال كهربائي هو...',
    options: ['الطاقة الكلية للشحنة عند تلك النقطة.', 'طاقة الوضع الكهربائية للشحنة عند تلك النقطة.', 'طاقة الوضع الكهربائية لكل وحدة شحنة عند تلك النقطة.', 'القوة المؤثرة على الشحنة عند تلك النقطة.'],
    correctAnswerIndex: 2,
    explanation: 'الجهد الكهربائي (V) هو كمية قياسية تصف خاصية للمكان نفسه، وتعرف بأنها طاقة الوضع الكهربائية (PE) التي ستمتلكها شحنة اختبار موجبة قيمتها واحد كولوم إذا وُضعت عند تلك النقطة. $V = PE/q$.'
  },
  {
    questionText: 'وحدة قياس الجهد الكهربائي (الفولت) تكافئ أيًا من الوحدات التالية؟',
    options: ['جول / كولوم', 'كولوم / جول', 'نيوتن / كولوم', 'جول / ثانية'],
    correctAnswerIndex: 0,
    explanation: 'بما أن الجهد هو طاقة الوضع لكل وحدة شحنة ($V = PE/q$), فإن وحدته هي وحدة الطاقة (جول) مقسومة على وحدة الشحنة (كولوم).'
  },
  {
    questionText: 'عند تحريك شحنة اختبار موجبة مع اتجاه خط المجال الكهربائي، فإن جهدها الكهربائي...',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'خطوط المجال الكهربائي تشير دائمًا من منطقة الجهد المرتفع إلى منطقة الجهد المنخفض. لذلك، عند التحرك مع اتجاه المجال، فإن الجهد الكهربائي يقل.'
  },
   {
    questionText: 'الجهد الكهربائي عند نقطة تبعد مسافة (r) عن شحنة مصدر نقطية (Q) يعتمد على:',
    options: ['مقدار شحنة المصدر (Q) فقط', 'مقدار شحنة الاختبار الموضوعة عند النقطة فقط', 'كلا من شحنة المصدر وشحنة الاختبار', 'لا يعتمد على أي من الشحنتين'],
    correctAnswerIndex: 0,
    explanation: 'الجهد الكهربائي هو خاصية للنقطة في الفضاء ناتجة عن شحنة المصدر (Q)، ولا يعتمد على وجود أو مقدار شحنة الاختبار. قانونه هو $V = kQ/r$. أما طاقة الوضع، فهي التي تعتمد على كلتا الشحنتين ($PE = kQq/r$).'
  },
  {
    questionText: 'في الشكل، تتحرك شحنة سالبة بسرعة (v) مع اتجاه المجال الكهربائي المنتظم (E). ماذا يحدث لطاقة وضعها الكهربائية، وما إشارة شغل القوة الخارجية اللازمة لتحريكها بسرعة ثابتة؟',
    diagram: 'uniform-field',
    options: ['تزداد طاقة الوضع، شغل القوة الخارجية موجب.', 'تقل طاقة الوضع، شغل القوة الخارجية سالب.', 'تزداد طاقة الوضع، شغل القوة الخارجية سالب.', 'تقل طاقة الوضع، شغل القوة الخارجية موجب.'],
    correctAnswerIndex: 0,
    explanation: '1. اتجاه القوة الكهربائية على الشحنة السالبة يكون **عكس** اتجاه المجال (E).\n2. الشحنة تتحرك **مع** اتجاه المجال، أي أنها تتحرك **عكس** اتجاه القوة الكهربائية المؤثرة عليها.\n3. عندما تتحرك شحنة عكس اتجاه القوة الكهربائية، فإن شغل القوة الكهربائية يكون سالبًا، وبالتالي **تزداد** طاقة وضعها الكهربائية ($\\Delta PE = -W_{elec}$).\n4. بما أن الحركة بسرعة ثابتة، يجب أن تبذل قوة خارجية شغلاً موجبًا للتغلب على القوة الكهربائية ($W_{ext} = \\Delta PE$). إذن إشارة شغل القوة الخارجية **موجبة**.'
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
              {q.diagram === 'uniform-field' && <UniformFieldDiagram />}
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

