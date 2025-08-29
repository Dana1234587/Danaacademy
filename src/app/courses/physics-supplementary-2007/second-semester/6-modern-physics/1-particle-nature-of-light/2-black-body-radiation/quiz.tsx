
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
    questionText: 'ما هو "الجسم الأسود" في الفيزياء؟',
    options: ['جسم لا يعكس الضوء أبدًا.', 'جسم يمتص كل الإشعاع الكهرومغناطيسي الساقط عليه.', 'جسم لونه أسود دائمًا.', 'جسم لا يصدر أي إشعاع.'],
    correctAnswerIndex: 1,
    explanation: 'الجسم الأسود هو جسم مثالي يمتص جميع الإشعاعات الكهرومغناطيسية التي تسقط عليه، بغض النظر عن ترددها أو زاوية سقوطها. وهو أيضًا باعث مثالي للإشعاع عندما يكون ساخنًا.'
  },
  {
    questionText: 'وفقًا لمنحنيات إشعاع الجسم الأسود، ماذا يحدث للطول الموجي الذي تقابله شدة الإشعاع العظمى ($\lambda_{max}$) عندما تزداد درجة حرارة الجسم؟',
    options: ['يزداد (ينزاح نحو الأحمر)', 'يقل (ينزاح نحو الأزرق)', 'يبقى ثابتًا', 'يصبح صفرًا'],
    correctAnswerIndex: 1,
    explanation: 'وفقًا لقانون فين للإزاحة، يتناسب الطول الموجي ذو الشدة القصوى عكسيًا مع درجة الحرارة المطلقة. كلما زادت الحرارة، انزاحت القمة نحو الأطوال الموجية الأقصر (الزرقاء).'
  },
  {
    questionText: 'ما هي "كارثة الأشعة فوق البنفسجية"؟',
    options: ['فشل الفيزياء الكلاسيكية في تفسير سبب إصدار الأجسام الساخنة للأشعة فوق البنفسجية.', 'الكمية الكبيرة من الأشعة فوق البنفسجية الصادرة من الشمس.', 'تنبؤ الفيزياء الكلاسيكية الخاطئ بأن شدة الإشعاع ستزداد إلى ما لا نهاية مع زيادة التردد.', 'تأثير الأشعة فوق البنفسجية الضار على الجلد.'],
    correctAnswerIndex: 2,
    explanation: 'تنبأت النظرية الكلاسيكية (قانون رايلي-جينز) بأن الجسم الأسود يجب أن يشع طاقة لانهائية عند الأطوال الموجية القصيرة (الترددات العالية)، وهو ما يتعارض بشكل صارخ مع النتائج التجريبية. هذا الفشل الذريع أُطلق عليه اسم كارثة الأشعة فوق البنفسجية.'
  },
  {
    questionText: 'كيف حل ماكس بلانك مشكلة إشعاع الجسم الأسود؟',
    options: ['بافتراض أن الضوء موجة فقط.', 'باستخدام قوانين نيوتن.', 'بافتراض أن طاقة الاهتزازات في جدران الجسم الأسود مكمّاة.', 'بإثبات أن النظرية الكلاسيكية كانت صحيحة.'],
    correctAnswerIndex: 2,
    explanation: 'افترض بلانك أن الطاقة لا يمكن أن تنبعث أو تمتص إلا على شكل كميات منفصلة (كمّات) تتناسب مع التردد ($E=nhf$). هذا الافتراض حدّ من انبعاث الإشعاع عالي التردد وتطابقت نتائجه مع البيانات التجريبية بشكل مثالي.'
  },
  {
    questionText: 'إذا كان لديك جسمان أسودان، الأول عند درجة حرارة 3000 كلفن والثاني عند 6000 كلفن، فإن الجسم الثاني يشع طاقة كلية...',
    options: ['ضعف الأول', 'أربع مرات قدر الأول', 'ثماني مرات قدر الأول', 'ست عشرة مرة قدر الأول'],
    correctAnswerIndex: 3,
    explanation: 'وفقًا لقانون ستيفان-بولتزمان، تتناسب القدرة الكلية المشعة من الجسم الأسود مع القوة الرابعة لدرجة الحرارة المطلقة ($P \\propto T^4$). بما أن الحرارة تضاعفت (6000/3000 = 2)، فإن القدرة المشعة تزداد بمعامل $2^4 = 16$.'
  },
];

export default function BlackBodyRadiationQuizPage() {
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
