'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Filter, Trophy, Target, Zap, Star } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
  const lines = text.split('\n');
  const renderPart = (part: string, index: number) => {
    if (index % 2 === 0) return <span key={index} dir="rtl">{part}</span>;
    return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
  };
  return (
    <Wrapper className="leading-relaxed">
      {lines.map((line, lineIndex) => (
        <React.Fragment key={lineIndex}>
          {line.split('$').map(renderPart)}
          {lineIndex < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </Wrapper>
  );
};

type Difficulty = 'easy' | 'medium' | 'hard' | 'excellence' | 'all';

interface QuizQuestion {
  questionText: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'excellence';
}

const difficultyConfig = {
  easy: { label: 'سهل', color: 'bg-green-500', icon: Target, textColor: 'text-green-600' },
  medium: { label: 'متوسط', color: 'bg-yellow-500', icon: Zap, textColor: 'text-yellow-600' },
  hard: { label: 'صعب', color: 'bg-orange-500', icon: Trophy, textColor: 'text-orange-600' },
  excellence: { label: 'تميز', color: 'bg-red-500', icon: Star, textColor: 'text-red-600' },
};

const quizQuestions: QuizQuestion[] = [
  // ===== سهل (Easy) =====
  {
    questionText: 'قانون حفظ الزخم يطبق عندما تكون:',
    options: ['محصلة القوى الخارجية أكبر ما يمكن', 'محصلة القوى الخارجية تساوي صفر', 'الطاقة الحركية محفوظة', 'السرعة ثابتة'],
    correctAnswerIndex: 1,
    explanation: 'قانون حفظ الزخم يطبق فقط على الأنظمة المعزولة، أي عندما تكون محصلة القوى الخارجية المؤثرة على النظام = صفر.',
    difficulty: 'easy'
  },
  {
    questionText: 'النظام المعزول هو النظام الذي:',
    options: ['لا توجد فيه قوى داخلية', 'محصلة القوى الخارجية عليه تساوي صفر', 'تكون سرعته ثابتة دائمًا', 'لا يتفاعل أجسامه مع بعضها'],
    correctAnswerIndex: 1,
    explanation: 'النظام المعزول هو الذي تكون محصلة القوى الخارجية عليه = صفر. القوى الداخلية (مثل التصادم) لا تؤثر على الزخم الكلي.',
    difficulty: 'easy'
  },
  {
    questionText: 'عند ارتداد البندقية عند إطلاق رصاصة، يكون الزخم الكلي للنظام (بندقية + رصاصة):',
    options: ['يزداد', 'يقل', 'يبقى ثابتًا = صفر', 'يعتمد على سرعة الرصاصة'],
    correctAnswerIndex: 2,
    explanation: 'قبل الإطلاق: الزخم الكلي = صفر (كلاهما ساكن).\nبعد الإطلاق: زخم الرصاصة للأمام + زخم البندقية للخلف = صفر (محفوظ).',
    difficulty: 'easy'
  },

  // ===== متوسط (Medium) =====
  {
    questionText: 'عربة كتلتها $3 \\text{ kg}$ تتحرك بسرعة $4 \\text{ m/s}$ تصطدم بعربة ساكنة كتلتها $1 \\text{ kg}$ فتلتحمان. ما سرعتهما بعد الالتحام؟',
    options: ['$1 \\text{ m/s}$', '$2 \\text{ m/s}$', '$3 \\text{ m/s}$', '$4 \\text{ m/s}$'],
    correctAnswerIndex: 2,
    explanation: 'من حفظ الزخم:\n$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v_f$\n$(3)(4) + (1)(0) = (3+1) v_f$\n$12 = 4 v_f$\n$v_f = 3 \\text{ m/s}$',
    difficulty: 'medium'
  },
  {
    questionText: 'بندقية كتلتها $5 \\text{ kg}$ تطلق رصاصة كتلتها $0.05 \\text{ kg}$ بسرعة $500 \\text{ m/s}$. ما سرعة ارتداد البندقية؟',
    options: ['$5 \\text{ m/s}$', '$50 \\text{ m/s}$', '$0.5 \\text{ m/s}$', '$25 \\text{ m/s}$'],
    correctAnswerIndex: 0,
    explanation: 'من حفظ الزخم (الزخم قبل = صفر):\n$0 = m_{\\text{رصاصة}} v_{\\text{رصاصة}} + m_{\\text{بندقية}} v_{\\text{بندقية}}$\n$0 = (0.05)(500) + (5) v_B$\n$v_B = -\\frac{25}{5} = -5 \\text{ m/s}$\nالمقدار = $5 \\text{ m/s}$ (بالاتجاه المعاكس)',
    difficulty: 'medium'
  },
  {
    questionText: 'جسمان متماثلان في الكتلة، أحدهما ساكن والآخر يتحرك بسرعة $v$. بعد تصادمهما التحما. ما سرعتهما المشتركة؟',
    options: ['$v$', '$\\frac{v}{2}$', '$2v$', 'صفر'],
    correctAnswerIndex: 1,
    explanation: 'من حفظ الزخم:\n$m v + m(0) = (m + m) v_f$\n$mv = 2m v_f$\n$v_f = \\frac{v}{2}$',
    difficulty: 'medium'
  },

  // ===== صعب (Hard) =====
  {
    questionText: 'كرة كتلتها $2 \\text{ kg}$ تتحرك بسرعة $6 \\text{ m/s}$ تصطدم بكرة ساكنة كتلتها $4 \\text{ kg}$. إذا ارتدت الكرة الأولى بسرعة $2 \\text{ m/s}$ بالاتجاه المعاكس، ما سرعة الكرة الثانية؟',
    options: ['$2 \\text{ m/s}$', '$4 \\text{ m/s}$', '$6 \\text{ m/s}$', '$8 \\text{ m/s}$'],
    correctAnswerIndex: 1,
    explanation: 'من حفظ الزخم:\n$(2)(+6) + (4)(0) = (2)(-2) + (4) v_2$\n$12 = -4 + 4 v_2$\n$16 = 4 v_2$\n$v_2 = 4 \\text{ m/s}$',
    difficulty: 'hard'
  },
  {
    questionText: 'في نظام معزول، إذا كان التغير في زخم الجسم A يساوي $+40 \\text{ kg} \\cdot \\text{m/s}$، فإن التغير في زخم الجسم B يساوي:',
    options: ['$+40 \\text{ kg} \\cdot \\text{m/s}$', '$-40 \\text{ kg} \\cdot \\text{m/s}$', 'صفر', 'لا يمكن تحديده'],
    correctAnswerIndex: 1,
    explanation: 'في النظام المعزول، مجموع التغير في الزخم = صفر.\n$\\Delta p_A + \\Delta p_B = 0$\n$+40 + \\Delta p_B = 0$\n$\\Delta p_B = -40 \\text{ kg} \\cdot \\text{m/s}$',
    difficulty: 'hard'
  },
  {
    questionText: 'قذيفة كتلتها $10 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$ انفجرت إلى قطعتين. إذا كانت كتلة القطعة الأولى $3 \\text{ kg}$ وسرعتها $60 \\text{ m/s}$ بنفس الاتجاه، ما سرعة القطعة الثانية؟',
    options: ['$2.86 \\text{ m/s}$', '$5 \\text{ m/s}$', '$10 \\text{ m/s}$', '$28.6 \\text{ m/s}$'],
    correctAnswerIndex: 0,
    explanation: 'زخم القذيفة قبل: $p_i = (10)(20) = 200$\nكتلة القطعة الثانية: $m_2 = 10 - 3 = 7 \\text{ kg}$\nمن حفظ الزخم:\n$200 = (3)(60) + (7) v_2$\n$200 = 180 + 7 v_2$\n$v_2 = \\frac{20}{7} \\approx 2.86 \\text{ m/s}$',
    difficulty: 'hard'
  },

  // ===== تميز (Excellence) =====
  {
    questionText: 'عربة رمل كتلتها $450 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$. تسرب منها رمل حتى أصبحت كتلتها $400 \\text{ kg}$ وسرعتها $22 \\text{ m/s}$. ما التغير في زخمها؟',
    options: ['$+200 \\text{ kg} \\cdot \\text{m/s}$', '$-200 \\text{ kg} \\cdot \\text{m/s}$', '$+1200 \\text{ kg} \\cdot \\text{m/s}$', 'صفر'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الابتدائي: $p_i = (450)(20) = 9000$\nالزخم النهائي: $p_f = (400)(22) = 8800$\nالتغير: $\\Delta p = 8800 - 9000 = -200 \\text{ kg} \\cdot \\text{m/s}$',
    difficulty: 'excellence'
  },
  {
    questionText: 'جسم كتلته $2 \\text{ kg}$ يتحرك بسرعة $3 \\text{ m/s}$ يصطدم بجسم كتلته $4 \\text{ kg}$ يتحرك بالاتجاه المعاكس بسرعة $1.5 \\text{ m/s}$. ما التغير في الزخم الكلي للنظام بعد التصادم؟',
    options: ['$6 \\text{ kg} \\cdot \\text{m/s}$', '$12 \\text{ kg} \\cdot \\text{m/s}$', 'صفر', 'لا يمكن تحديده'],
    correctAnswerIndex: 2,
    explanation: 'في النظام المعزول، الزخم الكلي محفوظ دائمًا.\nالتغير في الزخم الكلي = $p_f - p_i = 0$\n(بغض النظر عن تفاصيل التصادم)',
    difficulty: 'excellence'
  },
  {
    questionText: 'رائد فضاء كتلته $80 \\text{ kg}$ ساكن في الفضاء. رمى أداة كتلتها $2 \\text{ kg}$ بسرعة $10 \\text{ m/s}$. بعد كم ثانية يبتعد عن موقعه الأصلي مسافة $1 \\text{ m}$؟',
    options: ['$4 \\text{ s}$', '$0.25 \\text{ s}$', '$2 \\text{ s}$', '$8 \\text{ s}$'],
    correctAnswerIndex: 0,
    explanation: 'من حفظ الزخم:\n$0 = (2)(10) + (80) v_{\\text{رائد}}$\n$v_{\\text{رائد}} = -0.25 \\text{ m/s}$\nالزمن: $t = \\frac{d}{v} = \\frac{1}{0.25} = 4 \\text{ s}$',
    difficulty: 'excellence'
  },
];

export default function MomentumConservationQuestionsQuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('all');

  const filteredQuestions = difficultyFilter === 'all'
    ? quizQuestions
    : quizQuestions.filter(q => q.difficulty === difficultyFilter);

  const handleAnswerChange = (questionIndex: number, optionIndex: number) => {
    if (isSubmitted) return;
    const actualIndex = quizQuestions.indexOf(filteredQuestions[questionIndex]);
    const newAnswers = [...selectedAnswers];
    newAnswers[actualIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedAnswers(new Array(quizQuestions.length).fill(null));
  };

  const calculateScore = () => {
    return filteredQuestions.filter((q) => {
      const actualIndex = quizQuestions.indexOf(q);
      return selectedAnswers[actualIndex] === q.correctAnswerIndex;
    }).length;
  };

  const getFilteredAnswer = (questionIndex: number) => {
    const actualIndex = quizQuestions.indexOf(filteredQuestions[questionIndex]);
    return selectedAnswers[actualIndex];
  };

  return (
    <div className="p-4 bg-muted/40">
      <div className="max-w-4xl mx-auto">

        {/* Difficulty Filter */}
        <Card className="mb-6 p-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Filter className="w-4 h-4" />
              <span className="font-medium">تصفية حسب المستوى:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={difficultyFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => { setDifficultyFilter('all'); handleReset(); }}
              >
                الكل ({quizQuestions.length})
              </Button>
              {Object.entries(difficultyConfig).map(([key, config]) => {
                const count = quizQuestions.filter(q => q.difficulty === key).length;
                return (
                  <Button
                    key={key}
                    variant={difficultyFilter === key ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => { setDifficultyFilter(key as Difficulty); handleReset(); }}
                    className={difficultyFilter === key ? config.color : ''}
                  >
                    <config.icon className="w-3 h-3 me-1" />
                    {config.label} ({count})
                  </Button>
                );
              })}
            </div>
          </div>
        </Card>

        <div className="space-y-8">
          {filteredQuestions.map((q, qIndex) => {
            const config = difficultyConfig[q.difficulty];
            const currentAnswer = getFilteredAnswer(qIndex);

            return (
              <Card key={qIndex} className={`border-2 ${isSubmitted ? (currentAnswer === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg`}>
                <CardHeader>
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <CardTitle><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></CardTitle>
                    <Badge className={`${config.color} text-white`}>
                      <config.icon className="w-3 h-3 me-1" />
                      {config.label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))}
                    value={currentAnswer?.toString()}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    {q.options.map((option, oIndex) => (
                      <Label
                        key={oIndex}
                        htmlFor={`q${qIndex}-o${oIndex}`}
                        className={`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer transition-all hover:bg-accent ${currentAnswer === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}`}
                      >
                        <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} disabled={isSubmitted} />
                        <SmartTextRenderer as="span" text={option} />
                        {isSubmitted && currentAnswer === oIndex && currentAnswer !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto" />}
                        {isSubmitted && oIndex === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500 ms-auto" />}
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
            )
          })}
        </div>

        <div className="mt-8 text-center">
          {!isSubmitted ? (
            <Button onClick={handleSubmit} size="lg" className="w-full max-w-xs mx-auto">
              إظهار النتائج
            </Button>
          ) : (
            <Card className="max-w-sm mx-auto p-6">
              <CardTitle className="text-2xl mb-4">نتيجتك النهائية</CardTitle>
              <p className="text-3xl font-bold text-primary">
                {calculateScore()} / {filteredQuestions.length}
              </p>
              <div className="text-sm text-muted-foreground mt-2">
                {difficultyFilter !== 'all' && `(مستوى: ${difficultyConfig[difficultyFilter as keyof typeof difficultyConfig]?.label})`}
              </div>
              <Button onClick={handleReset} variant="outline" className="mt-6">
                إعادة الاختبار
              </Button>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
