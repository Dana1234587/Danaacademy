
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
    questionText: 'قضيب طوله 4 متر ومحور دورانه في منتصفه. أثرت عليه قوتان متساويتان في المقدار (10 نيوتن) ومتعاكستان في الاتجاه عند طرفيه، وكلاهما عمودية على القضيب. ما مقدار العزم المحصل؟',
    options: ['$0 N \\cdot m$', '$20 N \\cdot m$', '$40 N \\cdot m$', '$80 N \\cdot m$'],
    correctAnswerIndex: 2,
    explanation: 'هذه حالة عزم ازدواج. كل قوة تبعد 2 متر عن المحور. القوتان تسببان دورانًا في نفس الاتجاه. عزم القوة الأولى = $10 N \\times 2 m = 20 N \\cdot m$. عزم القوة الثانية = $10 N \\times 2 m = 20 N \\cdot m$. العزم المحصل = $20 + 20 = 40 N \\cdot m$.'
  },
  {
    questionText: 'لفتح صنبور ماء عالق، يفضل استخدام مفتاح ربط...',
    options: ['ذو ذراع قصير', 'ذو ذراع طويل', 'ذو ذراع سميك', 'لا يهم طول الذراع'],
    correctAnswerIndex: 1,
    explanation: 'للحصول على عزم كافٍ لفتح الصنبور بنفس القوة، يجب زيادة ذراع القوة. استخدام مفتاح ربط ذي ذراع أطول يزيد من العزم الناتج عن نفس القوة المطبقة.'
  },
  {
    questionText: 'إذا كان العزم المحصل المؤثر على جسم يساوي صفرًا، فهذا يعني أن الجسم...',
    options: ['لا يتحرك إطلاقًا', 'يتحرك بسرعة خطية ثابتة', 'لا يدور أو يدور بسرعة زاوية ثابتة', 'يتسارع خطيًا'],
    correctAnswerIndex: 2,
    explanation: 'انعدام العزم المحصل هو شرط الاتزان الدوراني. هذا يعني أن التسارع الزاوي للجسم يساوي صفرًا، وبالتالي فإما أن يكون الجسم في حالة سكون دوراني (لا يدور) أو أنه يدور بسرعة زاوية منتظمة.'
  },
  {
    questionText: 'قوة مقدارها 20 نيوتن تؤثر على جسم عند نقطة متجه موضعها $\\vec{r} = 3\\hat{i} + 4\\hat{j}$ متر. إذا كانت القوة باتجاه محور y الموجب ($\\vec{F} = 20\\hat{j}$ نيوتن)، فما مقدار العزم حول نقطة الأصل؟',
    options: ['$60 N \\cdot m$', '$80 N \\cdot m$', '$100 N \\cdot m$', '$140 N \\cdot m$'],
    correctAnswerIndex: 0,
    explanation: 'العزم هو $\\vec{\\tau} = \\vec{r} \\times \\vec{F} = (3\\hat{i} + 4\\hat{j}) \\times (20\\hat{j})$. \n $\\vec{\\tau} = (3\\hat{i} \\times 20\\hat{j}) + (4\\hat{j} \\times 20\\hat{j})$. \n بما أن $\\hat{j} \\times \\hat{j} = 0$ و $\\hat{i} \\times \\hat{j} = \\hat{k}$, فإن: \n $\\vec{\\tau} = 60\\hat{k}$. مقدار العزم هو 60 نيوتن.متر.'
  },
  {
    questionText: 'لتحقيق أكبر عزم ممكن بواسطة قوة معينة F على قضيب يمكنه الدوران حول أحد طرفيه، يجب أن تؤثر القوة...',
    options: ['عند الطرف الحر وبشكل عمودي على القضيب', 'عند منتصف القضيب وبشكل عمودي', 'عند الطرف الحر وبشكل موازٍ للقضيب', 'عند محور الدوران'],
    correctAnswerIndex: 0,
    explanation: 'لتحقيق أكبر عزم، يجب أن يكون كل من ذراع القوة (r) وجيب الزاوية (sinθ) أكبر ما يمكن. أكبر ذراع للقوة يكون عند الطرف الحر (أبعد نقطة عن المحور)، وأكبر قيمة لـ sinθ هي 1 وتحدث عندما تكون الزاوية 90 درجة (القوة عمودية).'
  },
];

export default function ConceptualQuestionsQuizPage() {
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
