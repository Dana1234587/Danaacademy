
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
    questionText: 'قاعدة كيرشوف الأولى (قاعدة الوصلة) هي تطبيق مباشر لأي من مبادئ الحفظ التالية؟',
    options: ['حفظ الطاقة', 'حفظ الزخم الخطي', 'حفظ الشحنة الكهربائية', 'حفظ الكتلة'],
    correctAnswerIndex: 2,
    explanation: 'تنص قاعدة الوصلة على أن مجموع التيارات الداخلة إلى وصلة يساوي مجموع التيارات الخارجة منها. بما أن التيار هو تدفق الشحنة، فهذا يعني أن الشحنة لا تتراكم عند الوصلة ولا تفنى، وهو تعبير عن مبدأ حفظ الشحنة الكهربائية.'
  },
  {
    questionText: 'عند وصلة في دارة كهربائية، يدخل تياران قيمتهما 3 أمبير و 4 أمبير، ويخرج تيار قيمته 5 أمبير. ما مقدار واتجاه التيار الرابع المجهول؟',
    options: ['2 أمبير، خارج من الوصلة', '2 أمبير، داخل إلى الوصلة', '12 أمبير، خارج من الوصلة', 'لا يمكن تحديد الاتجاه'],
    correctAnswerIndex: 0,
    explanation: 'نطبق قاعدة كيرشوف الأولى: $\\Sigma I_{in} = \\Sigma I_{out}$. \n التيارات الداخلة = $3A + 4A = 7A$. \n التيارات الخارجة = $5A + I_{unknown}$. \n لموازنة المعادلة، يجب أن يكون مجموع التيارات الخارجة 7A أيضًا. إذن، $I_{unknown} = 7A - 5A = 2A$. وبما أننا افترضناه خارجًا وحصلنا على قيمة موجبة، فهو خارج من الوصلة.'
  },
  {
    questionText: 'في أي نوع من الدارات يكون استخدام قاعدة كيرشوف الأولى ضروريًا؟',
    options: ['الدارات التي تحتوي على مقاومات على التوالي فقط', 'الدارات التي تحتوي على مكثفات فقط', 'الدارات التي تحتوي على نقاط تفرع (وصلات)', 'الدارات التي تحتوي على بطارية واحدة فقط'],
    correctAnswerIndex: 2,
    explanation: 'تُطبق قاعدة كيرشوف الأولى عند أي نقطة يتفرع فيها التيار إلى مسارين أو أكثر، أو تلتقي فيها عدة مسارات. هذه النقاط تسمى الوصلات أو العقد.'
  },
  {
    questionText: 'إذا كانت جميع التيارات عند وصلة ما متجهة نحو الداخل، فماذا يعني ذلك؟',
    options: ['أن الوصلة تشحن', 'أن هذا الموقف مستحيل فيزيائيًا في دارة مستقرة', 'أن الوصلة هي مصدر الجهد', 'أن جميع المقاومات متساوية'],
    correctAnswerIndex: 1,
    explanation: 'وفقًا لقاعدة كيرشوف الأولى، يجب أن يكون مجموع التيارات الداخلة مساويًا لمجموع التيارات الخارجة. إذا كانت جميع التيارات داخلة، فإن مجموعها لا يمكن أن يساوي صفرًا (وهو مجموع التيارات الخارجة)، وهذا يخالف مبدأ حفظ الشحنة في دارة مستقرة.'
  },
  {
    questionText: 'قاعدة كيرشوف الأولى تُعرف أيضًا باسم...',
    options: ['قانون أوم', 'قاعدة العروة', 'قاعدة الوصلة', 'قانون فارادي'],
    correctAnswerIndex: 2,
    explanation: 'الاسم الآخر لقاعدة كيرشوف الأولى هو "قاعدة الوصلة" (Junction Rule) لأنها تُطبق على الوصلات (نقاط التفرع) في الدارة.'
  },
];

export default function KirchhoffsFirstRuleQuizPage() {
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
