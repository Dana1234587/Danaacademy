
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
    questionText: 'قذيفة تتحرك أفقيًا تنفجر في الهواء إلى ثلاث قطع متساوية في الكتلة. قطعة واحدة تستمر في التحرك أفقيًا، وقطعة تسقط رأسيًا لأسفل. ما هو اتجاه حركة القطعة الثالثة مباشرة بعد الانفجار؟',
    options: ['أفقيًا بنفس اتجاه القذيفة الأصلية', 'رأسيًا للأعلى', 'في اتجاه يجمع بين الحركة الأفقية والحركة الرأسية للأعلى', 'في اتجاه يجمع بين الحركة الأفقية والحركة الرأسية للأسفل'],
    correctAnswerIndex: 2,
    explanation: 'الزخم محفوظ في كلا الاتجاهين. الزخم الرأسي الابتدائي كان صفرًا. لذا يجب أن يكون الزخم الرأسي النهائي صفرًا أيضًا. بما أن قطعة سقطت لأسفل (لها زخم رأسي سالب)، يجب أن يكون للقطعة الثالثة زخم رأسي موجب (للأعلى) لإلغائه. الزخم الأفقي الابتدائي كان موجبًا. قطعة استمرت أفقيًا (لها زخم أفقي موجب)، لذا يجب أن يكون للقطعة الثالثة زخم أفقي موجب أيضًا للحفاظ على الزخم الأفقي الكلي. إذن، اتجاهها هو مركب من حركة أفقية وحركة رأسية للأعلى.'
  },
  {
    questionText: 'في تصادم مرن مائل (في بعدين) بين كرتين متماثلتين، إحداهما ساكنة، ما هي الزاوية بين سرعتيهما بعد التصادم؟',
    options: ['$45^\\circ$', '$90^\\circ$', '$180^\\circ$', 'تعتمد على سرعة المقذوف'],
    correctAnswerIndex: 1,
    explanation: 'هذه نتيجة مشهورة للتصادمات المرنة في بعدين بين كتلتين متساويتين عندما تكون إحداهما ساكنة. بعد التصادم، تتحرك الكرتان في اتجاهين يصنعان زاوية 90 درجة بينهما.'
  },
  {
    questionText: 'إذا كانت نسبة الطاقة الحركية المفقودة في تصادم عديم المرونة هي 50%، فما هي نسبة كتلتي الجسمين المتصادمين ($m_1/m_2$)، علمًا أن $m_2$ كان ساكنًا؟',
    options: ['1', '2', '0.5', 'لا يمكن تحديدها'],
    correctAnswerIndex: 0,
    explanation: 'الطاقة المفقودة بنسبة 50% تحدث في التصادم عديم المرونة عندما تكون الكتل متساوية. $K_f = 0.5 K_i$. $\\frac{1}{2}(m_1+m_2)v_f^2 = 0.5(\\frac{1}{2}m_1v_i^2)$. من حفظ الزخم $m_1v_i = (m_1+m_2)v_f$. بالتعويض، نجد أن هذا الشرط يتحقق عندما $m_1=m_2$.'
  },
  {
    questionText: 'عندما تسقط كرة على أرضية وتلتصق بها (تصادم عديم المرونة)، هل الزخم الخطي لنظام (الكرة + الأرض) محفوظ؟',
    options: ['نعم، دائمًا', 'لا، بسبب قوة الجاذبية الخارجية', 'نعم، فقط إذا أهملنا مقاومة الهواء', 'لا، لأن الطاقة غير محفوظة'],
    correctAnswerIndex: 1,
    explanation: 'نظام (الكرة + الأرض) ليس معزولًا بسبب وجود قوة الجاذبية الخارجية التي تؤثر على الكرة. لذلك، الزخم الخطي الكلي للنظام غير محفوظ. ومع ذلك، خلال فترة التصادم القصيرة جدًا، يمكن اعتبار الزخم محفوظًا تقريبيًا لأن قوى التصادم الداخلية أكبر بكثير من قوة الجاذبية.'
  },
  {
    questionText: 'تتحرك عربة كتلتها $M$ بسرعة $v$ على مسار أفقي أملس. سقطت عليها قطعة عجين كتلتها $m$ رأسيًا والتصقت بها. أي كمية تبقى محفوظة بالنسبة لنظام (العربة + العجين) خلال عملية الالتحام؟',
    options: ['الطاقة الحركية الكلية', 'الطاقة الميكانيكية الكلية', 'الزخم الخطي الأفقي', 'الزخم الخطي الرأسي'],
    correctAnswerIndex: 2,
    explanation: 'لا توجد قوى خارجية أفقية تؤثر على النظام، لذا يبقى الزخم الخطي الأفقي محفوظًا. الزخم الرأسي غير محفوظ بسبب قوة الجاذبية والقوة العمودية. الطاقة الحركية غير محفوظة لأنه تصادم عديم المرونة.'
  },
];

export default function CollisionsP3QuizPage() {
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
