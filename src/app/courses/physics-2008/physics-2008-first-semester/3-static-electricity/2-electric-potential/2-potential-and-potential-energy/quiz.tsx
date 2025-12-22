
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { NegativeChargeAgainstField, NegativeChargeWithField } from './diagram';

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
    questionText: 'في الشكل، تتحرك شحنة سالبة بفعل قوة خارجية مع اتجاه المجال بسرعة ثابتة. إشارة شغل القوة الخارجية وما يحدث لطاقة وضع الشحنة هما:',
    diagram: 'negative-charge-with-field',
    options: ['شغل موجب، طاقة الوضع تقل', 'شغل سالب، طاقة الوضع تزداد', 'شغل موجب، طاقة الوضع تزداد', 'شغل سالب، طاقة الوضع تقل'],
    correctAnswerIndex: 2,
    explanation: '1. القوة الكهربائية ($F_e$) على الشحنة السالبة تكون عكس اتجاه المجال (لليسار). \n2. بما أن الشحنة تتحرك مع المجال (لليمين) بفعل قوة خارجية، فإن القوة الخارجية تبذل شغلاً **موجبًا** لأنها بنفس اتجاه الحركة. \n3. بما أن السرعة ثابتة، فإن شغل القوة الخارجية يتحول بالكامل إلى زيادة في طاقة الوضع الكهربائية للشحنة ($W_{ext} = \\Delta PE$). لذلك، طاقة الوضع **تزداد**.'
  },
  {
    questionText: 'في الشكل، تتحرك شحنة سالبة بفعل القوة الكهربائية في مجال كهربائي منتظم. إشارة شغل القوة الكهربائية وما يحدث لطاقة الوضع للشحنة هما:',
    diagram: 'negative-charge-against-field',
    options: ['شغل موجب، طاقة الوضع تقل', 'شغل سالب، طاقة الوضع تزداد', 'شغل موجب، طاقة الوضع تزداد', 'شغل سالب، طاقة الوضع تقل'],
    correctAnswerIndex: 0,
    explanation: '1. اتجاه القوة الكهربائية ($F_e$) على شحنة سالبة يكون **عكس** اتجاه المجال الكهربائي (E). إذن، القوة تتجه نحو اليسار. \n2. بما أن الشحنة تتحرك بفعل القوة الكهربائية، فإن اتجاه حركتها (السرعة v) يكون بنفس اتجاه القوة، أي نحو اليسار. \n3. الشغل المبذول بواسطة القوة الكهربائية يكون **موجبًا** لأن اتجاه القوة بنفس اتجاه الإزاحة. \n4. بما أن القوة الكهربائية قوة محافظة وتبذل شغلاً موجبًا، فإن طاقة الوضع الكهربائية **تقل** ($W_{elec} = -\\Delta PE$).'
  }
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
              {q.diagram === 'negative-charge-with-field' && <NegativeChargeWithField />}
              {q.diagram === 'negative-charge-against-field' && <NegativeChargeAgainstField />}
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
