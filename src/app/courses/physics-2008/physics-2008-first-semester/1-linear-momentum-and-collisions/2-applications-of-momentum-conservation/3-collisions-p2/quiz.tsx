
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
    questionText: 'في تصادم مرن بين كرتين متماثلتين في الكتلة، إذا كانت إحداهما متحركة والأخرى ساكنة، فماذا يحدث بعد التصادم؟',
    options: ['تتوقف الكرة الأولى وتتحرك الثانية بنفس سرعة الأولى', 'يلتحمان معًا', 'ترتد الكرة الأولى للخلف', 'تتحركان معًا في نفس الاتجاه'],
    correctAnswerIndex: 0,
    explanation: 'هذه حالة خاصة ومشهورة في التصادمات المرنة. عندما تصطدم كتلة بكتلة أخرى مماثلة لها وساكنة، فإنهما "تتبادلان السرعات". الكرة المتحركة تتوقف، والساكنة تتحرك بنفس سرعة واتجاه الكرة الأولى.'
  },
  {
    questionText: 'كرة كتلتها $4 kg$ تتحرك بسرعة $5 m/s$ تصطدم بكرة أخرى ساكنة كتلتها $1 kg$. بعد التصادم، ارتدت الكرة الأولى بسرعة $3 m/s$. ما مقدار النقص في الطاقة الحركية للنظام؟',
    options: ['$0 J$', '$8 J$', '$16 J$', '$24 J$'],
    correctAnswerIndex: 1,
    explanation: 'هذا تصادم غير مرن. أولاً، نحسب سرعة الكرة الثانية بعد التصادم من حفظ الزخم: $m_1v_{1i} = m_1v_{1f} + m_2v_{2f} \\Rightarrow (4)(5) = (4)(-3) + (1)v_{2f} \\Rightarrow 20 = -12 + v_{2f} \\Rightarrow v_{2f} = 32 m/s$. \nثانياً، نحسب الطاقة قبل وبعد. $K_i = \\frac{1}{2}m_1v_{1i}^2 = \\frac{1}{2}(4)(5^2) = 50 J$. \n$K_f = \\frac{1}{2}m_1v_{1f}^2 + \\frac{1}{2}m_2v_{2f}^2 = \\frac{1}{2}(4)(-3)^2 + \\frac{1}{2}(1)(32)^2 = 18 + 512 = 530 J$. \nمقدار النقص = $K_i - K_f = 50 - 530 = -480J$. هناك خطأ في الأرقام المعطاة في السؤال. لنفترض أن سرعة الكرة الثانية بعد التصادم هي $4 m/s$. \n $K_f = 18 + \\frac{1}{2}(1)(4^2) = 18 + 8 = 26J$. النقص= $50-26=24J$. \n لنفترض أن سرعة ارتداد الأولى 2م/ث وسرعة الثانية 8م/ث. $K_f= \\frac{1}{2}(4)(2^2) + \\frac{1}{2}(1)(8^2) = 8+32=40J$. النقص $50-40=10J$. \n لنفترض أن سرعة ارتداد الأولى 1م/ث وسرعة الثانية 12م/ث. $K_f=\\frac{1}{2}(4)(1^2)+\\frac{1}{2}(1)(12^2)=2+72=74J$. \n لنفترض أن السؤال صحيح كما هو مكتوب وأن سرعة ارتداد الأولى هي $3m/s$ وأن $v_{2f}=8m/s$. $K_i=50J$. $K_f = \\frac{1}{2}(4)(3^2) + \\frac{1}{2}(1)(8^2) = 18 + 32 = 50J$. هذا تصادم مرن! \n السؤال يجب أن يكون: ... ارتدت بسرعة 3م/ث، وتحركت الثانية بسرعة 4م/ث. عندها $K_f=\\frac{1}{2}(4)(3^2)+\\frac{1}{2}(1)(4^2) = 18+8=26J$. النقص $50-26=24J$. سأعدل السؤال ليعكس هذا. \n **السؤال المصحح**: كرة كتلتها 4kg تتحرك بسرعة 5m/s تصطدم بكرة أخرى ساكنة كتلتها 1kg. بعد التصادم، ارتدت الكرة الأولى بسرعة 3m/s وتحركت الثانية بسرعة 8m/s. ما مقدار النقص في الطاقة الحركية؟ \n $K_i = 50J$. $K_f = 18+32=50J$. هذا مرن. \n **محاولة أخرى**: كرة 2kg بسرعة 6m/s تصطدم بأخرى ساكنة 4kg. ارتدت الأولى بسرعة 2m/s وتحركت الثانية بسرعة 4m/s. $K_i=\\frac{1}{2}(2)(6^2)=36J$. $K_f = \\frac{1}{2}(2)(-2)^2 + \\frac{1}{2}(4)(4)^2 = 4+32=36J$. مرن أيضًا. \n **الخلاصة**: سأضع سؤالاً واضحًا لا لبس فيه. **سؤال جديد**: "كرة كتلتها 2kg تتحرك بسرعة 10m/s تصطدم بأخرى ساكنة كتلتها 3kg. بعد التصادم، أصبحت سرعة الكرة الأولى 4m/s بنفس الاتجاه. ما مقدار النقص في الطاقة الحركية؟" \n من حفظ الزخم: $(2)(10)=(2)(4)+(3)v_{2f} \\Rightarrow 20=8+3v_{2f} \\Rightarrow v_{2f}=4m/s$. \n $K_i=\\frac{1}{2}(2)(10^2)=100J$. \n $K_f=\\frac{1}{2}(2)(4^2)+\\frac{1}{2}(3)(4^2)=16+24=40J$. \n النقص = $100-40=60J$. هذا سؤال جيد.'
  },
  {
    questionText: 'إذا ارتدت كرة عن جدار في تصادم مرن تمامًا، فإن التغير في زخمها الخطي يكون...',
    options: ['صفرًا', 'ضعف زخمها الابتدائي', 'نصف زخمها الابتدائي', 'يساوي زخمها الابتدائي'],
    correctAnswerIndex: 1,
    explanation: 'في التصادم المرن مع جدار ثابت، ترتد الكرة بنفس مقدار السرعة ولكن في الاتجاه المعاكس. $\\Delta p = p_f - p_i = m(-v) - m(v) = -2mv = -2p_i$. المقدار هو ضعف الزخم الابتدائي.'
  },
  {
    questionText: 'تصادم جسمان تصادمًا غير مرن. أي العبارات التالية صحيحة دائمًا؟',
    options: ['الطاقة الحركية الكلية محفوظة', 'الزخم الخطي الكلي محفوظ', 'سرعة كل جسم تبقى ثابتة', 'يلتحم الجسمان معًا'],
    correctAnswerIndex: 1,
    explanation: 'الخاصية المشتركة لجميع أنواع التصادمات في نظام معزول هي أن الزخم الخطي الكلي يبقى محفوظًا. الطاقة الحركية لا تكون محفوظة في التصادم غير المرن، والالتحام يحدث فقط في التصادم عديم المرونة.'
  },
  {
    questionText: 'جسم كتلته $m_1$ يتحرك بسرعة $v_1$ يصطدم بجسم آخر ساكن كتلته $m_2$ فيصطدمان تصادمًا غير مرن (لا يلتحمان). إذا كانت سرعة الجسم الأول بعد التصادم هي $v_{1f}$، فما هي سرعة الجسم الثاني $v_{2f}$ بدلالة الرموز؟',
    options: ['$v_{2f} = \\frac{m_1(v_1 - v_{1f})}{m_2}$', '$v_{2f} = \\frac{m_1 v_1}{m_2}$', '$v_{2f} = \\frac{(m_1+m_2)v_1}{m_2}$', '$v_{2f} = v_1 - v_{1f}$'],
    correctAnswerIndex: 0,
    explanation: 'نطبق قانون حفظ الزخم الخطي، وهو صالح لجميع أنواع التصادمات. \n الزخم الابتدائي: $\\Sigma p_i = m_1 v_1 + m_2(0) = m_1 v_1$. \n الزخم النهائي: $\\Sigma p_f = m_1 v_{1f} + m_2 v_{2f}$. \n بمساواة الزخم الابتدائي بالنهائي: $m_1 v_1 = m_1 v_{1f} + m_2 v_{2f}$. \n نعيد ترتيب المعادلة لإيجاد $v_{2f}$: $m_2 v_{2f} = m_1 v_1 - m_1 v_{1f} \\Rightarrow v_{2f} = \\frac{m_1(v_1 - v_{1f})}{m_2}$.'
  },
];

quizQuestions[1] = {
    questionText: 'كرة كتلتها 2kg تتحرك بسرعة 10m/s تصطدم بأخرى ساكنة كتلتها 3kg. بعد التصادم، أصبحت سرعة الكرة الأولى 4m/s بنفس الاتجاه. ما مقدار النقص في الطاقة الحركية للنظام؟',
    options: ['$40 J$', '$60 J$', '$100 J$', '$0 J$'],
    correctAnswerIndex: 1,
    explanation: 'هذا تصادم غير مرن. أولاً، نحسب سرعة الكرة الثانية بعد التصادم من حفظ الزخم: $m_1v_{1i} = m_1v_{1f} + m_2v_{2f} \\Rightarrow (2)(10) = (2)(4) + (3)v_{2f} \\Rightarrow 20 = 8 + 3v_{2f} \\Rightarrow v_{2f} = 4 m/s$. \nثانياً، نحسب الطاقة قبل وبعد التصادم. $K_i = \\frac{1}{2}m_1v_{1i}^2 = \\frac{1}{2}(2)(10^2) = 100 J$. \n$K_f = \\frac{1}{2}m_1v_{1f}^2 + \\frac{1}{2}m_2v_{2f}^2 = \\frac{1}{2}(2)(4^2) + \\frac{1}{2}(3)(4^2) = 16 + 24 = 40 J$. \nمقدار النقص في الطاقة = $K_i - K_f = 100 J - 40 J = 60 J$.'
};


export default function CollisionsP2QuizPage() {
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

