
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
    questionText: 'رجل يقف في مركز قرص دوار ساكن. إذا بدأ الرجل يمشي على طول حافة القرص عكس اتجاه عقارب الساعة، فإن القرص...',
    options: ['سيبقى ساكنًا', 'سيدور عكس عقارب الساعة', 'سيدور مع عقارب الساعة', 'سيدور بنفس سرعة الرجل'],
    correctAnswerIndex: 2,
    explanation: 'نظام (الرجل + القرص) معزول، لذا يجب أن يبقى زخمه الزاوي الكلي صفرًا. عندما يكتسب الرجل زخمًا زاويًا موجبًا (عكس عقارب الساعة)، يجب أن يكتسب القرص زخمًا زاويًا مساويًا في المقدار وسالبًا في الإشارة (مع عقارب الساعة) للحفاظ على المجموع صفرًا.'
  },
  {
    questionText: 'كرتان متماثلتان A و B مربوطتان بقضيب مهمل الكتلة ويدوران حول مركز كتلتهما. إذا اقتربت الكرتان من بعضهما البعض على طول القضيب، فإن الطاقة الحركية الدورانية للنظام...',
    options: ['تزداد', 'تقل', 'تبقى ثابتة', 'تصبح صفرًا'],
    correctAnswerIndex: 0,
    explanation: 'القوى التي تحرك الكرات للداخل هي قوى داخلية، لذا فالزخم الزاوي L محفوظ. الطاقة الحركية الدورانية $K = L^2 / (2I)$. عندما تقترب الكرات من بعضها، يقل عزم القصور الذاتي I. بما أن I في المقام، فإن نقصانها يؤدي إلى زيادة الطاقة الحركية K.'
  },
  {
    questionText: 'ماذا يحدث للزخم الزاوي للأرض إذا ذابت القمم الجليدية القطبية وتوزعت المياه بشكل متساوٍ على سطح الأرض؟',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 2,
    explanation: 'ذوبان الجليد وإعادة توزيعه هو عملية داخلية في نظام الأرض. لا يوجد عزم خارجي محصل، وبالتالي فإن الزخم الزاوي للأرض يبقى ثابتًا.'
  },
  {
    questionText: 'بناءً على السؤال السابق، ماذا يحدث لطول اليوم الأرضي (مدة دوران الأرض حول نفسها)؟',
    options: ['يزداد (يصبح اليوم أطول)', 'يقل (يصبح اليوم أقصر)', 'يبقى كما هو', 'يتذبذب'],
    correctAnswerIndex: 0,
    explanation: 'عندما يتوزع الماء من القطبين نحو خط الاستواء، فإنه يبتعد عن محور دوران الأرض. هذا يزيد من عزم القصور الذاتي للأرض (I). بما أن الزخم الزاوي ($L=I\\omega$) محفوظ، فإن زيادة I يجب أن يقابلها نقصان في السرعة الزاوية ω. سرعة زاوية أقل تعني زمنًا أطول للدورة الواحدة، أي أن اليوم يصبح أطول.'
  },
  {
    questionText: 'عجلة دراجة تدور بحرية في الهواء. إذا قمت بقلب محور دورانها رأسيًا، فإنك تشعر بقوة تحاول تدويرك. هذه الظاهرة هي مثال على...',
    options: ['تأثير كوريوليس', 'حفظ الزخم الخطي', 'حفظ الزخم الزاوي', 'قانون نيوتن الثالث'],
    correctAnswerIndex: 2,
    explanation: 'العجلة الدوارة تمتلك زخمًا زاويًا. عندما تحاول تغيير اتجاه متجه زخمها الزاوي (بقلب المحور)، فإنك تطبق عزمًا عليها. وفقًا لقانون نيوتن الثالث، تطبق العجلة عزمًا معاكسًا عليك، وهو ما تشعر به. هذه الظاهرة هي مثال مباشر على الطبيعة المتجهة للزخم الزاوي وحفظه.'
  },
];

export default function AdvancedQuestionsQuizPage() {
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
