
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
    questionText: 'في نظام معزول، إذا كان التغير في الزخم الخطي لجسم A يساوي $+40 \\text{ kg} \\cdot \\text{m/s}$، وكان الجسم B الذي كتلته $5 kg$ قد بدأ حركته من السكون، فما سرعته النهائية؟',
    options: ['$-4 m/s$', '$+4 m/s$', '$+8 m/s$', '$-8 m/s$'],
    correctAnswerIndex: 3,
    explanation: 'في نظام معزول، $\\Delta p_A + \\Delta p_B = 0$, إذن $\\Delta p_B = -\\Delta p_A = -40 \\text{ kg} \\cdot \\text{m/s}$.\n ولدينا $\\Delta p_B = m_B(v_{Bf} - v_{Bi})$.\n $-40 = 5(v_{Bf} - 0) \\implies v_{Bf} = -8 m/s$.'
  },
  {
    questionText: 'كرة كتلتها $2 kg$ تتحرك بسرعة $6 m/s$ تصطدم بكرة أخرى ساكنة كتلتها $4 kg$. إذا ارتدت الكرة الأولى بسرعة $2 m/s$ في الاتجاه المعاكس، فما سرعة الكرة الثانية بعد التصادم؟',
    options: ['$4 m/s$', '$6 m/s$', '$8 m/s$', '$2 m/s$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق حفظ الزخم، مع اعتبار الاتجاه الابتدائي موجبًا: $\\Sigma p_i = \\Sigma p_f$. \n $m_1 v_{1i} + m_2 v_{2i} = m_1 v_{1f} + m_2 v_{2f}$. \n $(2)(+6) + (4)(0) = (2)(-2) + (4)v_{2f}$. \n $12 = -4 + 4v_{2f}$. \n $16 = 4v_{2f} \\Rightarrow v_{2f} = 4 m/s$.'
  },
  {
    questionText: 'جسمان A و B لهما نفس الكتلة $m$. يتحرك A بسرعة $v$ ويصطدم بـ B الساكن. بعد التصادم، أصبحت سرعة A هي $\\frac{v}{3}$ بنفس الاتجاه. ما هي سرعة الجسم B ($v_B$) بعد التصادم؟',
    options: ['$v_B = \\frac{v}{3}$', '$v_B = \\frac{2v}{3}$', '$v_B = v$', '$v_B = \\frac{4v}{3}$'],
    correctAnswerIndex: 1,
    explanation: 'من حفظ الزخم: $p_i = p_f$. \n $m_A v_{Ai} + m_B v_{Bi} = m_A v_{Af} + m_B v_{Bf}$. \n بما أن $m_A=m_B=m$ و $v_{Bi}=0$: \n $m v = m(\\frac{v}{3}) + m v_{Bf}$. \n بقسمة المعادلة على $m$: $v = \\frac{v}{3} + v_{Bf}$. \n $v_{Bf} = v - \\frac{v}{3} = \\frac{2v}{3}$.'
  },
  {
    questionText: 'جسم كتلته $2 kg$ يتحرك بسرعة $3 m/s$ يصطدم بجسم آخر كتلته $4 kg$ يتحرك بالاتجاه المعاكس بسرعة $1.5 m/s$. ما هو مقدار التغير في الزخم الخطي للنظام بأكمله بعد التصادم؟',
    options: ['$0 \\text{ kg} \\cdot \\text{m/s}$', '$6 \\text{ kg} \\cdot \\text{m/s}$', '$12 \\text{ kg} \\cdot \\text{m/s}$', 'لا يمكن تحديده بدون معرفة سرعات ما بعد التصادم'],
    correctAnswerIndex: 0,
    explanation: 'بما أن التصادم يحدث في نظام معزول (لا توجد قوى خارجية مؤثرة)، فإن الزخم الخطي الكلي للنظام يكون محفوظًا. حفظ الزخم يعني أن الزخم الكلي قبل التصادم يساوي الزخم الكلي بعد التصادم. وبالتالي، فإن التغير في الزخم الكلي للنظام يساوي صفرًا دائمًا. $\\Delta p_{system} = p_{final} - p_{initial} = 0$.'
  },
  {
    questionText: 'عربة رمل كتلتها $450 kg$ تتحرك بسرعة $20 m/s$ على سطح أفقي أملس. إذا بدأ الرمل يتسرب منها بمعدل ثابت حتى أصبحت كتلتها $400 kg$ وسرعتها $22 m/s$. ما مقدار التغير في زخمها الخطي؟',
    options: ['$-200 kg \\cdot m/s$', '$200 kg \\cdot m/s$', '$17800 kg \\cdot m/s$', '$-8800 kg \\cdot m/s$'],
    correctAnswerIndex: 0,
    explanation: 'الزخم الابتدائي $p_i = m_i v_i = 450 \\times 20 = 9000 kg \\cdot m/s$. \nالزخم النهائي $p_f = m_f v_f = 400 \\times 22 = 8800 kg \\cdot m/s$. \nالتغير في الزخم $\\Delta p = p_f - p_i = 8800 - 9000 = -200 kg \\cdot m/s$.'
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
