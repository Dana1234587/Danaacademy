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
    questionText: 'نظرية الدفع والزخم تنص على أن:',
    options: ['الدفع يساوي الزخم الخطي الابتدائي', 'القوة تساوي التغير في الدفع', 'الدفع يساوي التغير في الزخم الخطي', 'الدفع يساوي الطاقة الحركية'],
    correctAnswerIndex: 2,
    explanation: 'نظرية الدفع-الزخم تنص على أن الدفع المؤثر على جسم يساوي تمامًا التغير في الزخم الخطي لذلك الجسم: $J = \\Delta p$',
    difficulty: 'easy'
  },
  {
    questionText: 'وحدة قياس الدفع هي:',
    options: ['$\\text{N} / \\text{s}$', '$\\text{N} \\cdot \\text{s}$', '$\\text{kg} / \\text{m}$', '$\\text{J} \\cdot \\text{s}$'],
    correctAnswerIndex: 1,
    explanation: 'وحدة الدفع = وحدة القوة × وحدة الزمن = $\\text{N} \\cdot \\text{s}$ وهي تكافئ وحدة الزخم $\\text{kg} \\cdot \\text{m/s}$',
    difficulty: 'easy'
  },
  {
    questionText: 'لماذا تُزود السيارات بوسائد هوائية؟',
    options: ['لزيادة القوة عند التصادم', 'لزيادة زمن التصادم وتقليل القوة', 'لتقليل زمن التصادم', 'لزيادة التغير في الزخم'],
    correctAnswerIndex: 1,
    explanation: 'الوسائد الهوائية تزيد زمن توقف الراكب ($\\Delta t \\uparrow$). بما أن $F = \\frac{\\Delta p}{\\Delta t}$، فإن زيادة الزمن تقلل القوة على جسم الراكب.',
    difficulty: 'easy'
  },

  // ===== متوسط (Medium) =====
  {
    questionText: 'قوة مقدارها $50 \\text{ N}$ أثرت على جسم لمدة $0.2 \\text{ s}$. ما مقدار الدفع؟',
    options: ['$10 \\text{ N} \\cdot \\text{s}$', '$250 \\text{ N} \\cdot \\text{s}$', '$50.2 \\text{ N} \\cdot \\text{s}$', '$5 \\text{ N} \\cdot \\text{s}$'],
    correctAnswerIndex: 0,
    explanation: 'الدفع = القوة × الزمن:\n$J = F \\times \\Delta t = 50 \\times 0.2 = 10 \\text{ N} \\cdot \\text{s}$',
    difficulty: 'medium'
  },
  {
    questionText: 'جسم كتلته $2 \\text{ kg}$ يتحرك بسرعة $5 \\text{ m/s}$. أثرت عليه قوة فأصبحت سرعته $15 \\text{ m/s}$ بنفس الاتجاه. ما مقدار الدفع؟',
    options: ['$10 \\text{ N} \\cdot \\text{s}$', '$20 \\text{ N} \\cdot \\text{s}$', '$30 \\text{ N} \\cdot \\text{s}$', '$40 \\text{ N} \\cdot \\text{s}$'],
    correctAnswerIndex: 1,
    explanation: 'الدفع = التغير في الزخم:\n$J = m(v_f - v_i) = 2(15 - 5) = 2 \\times 10 = 20 \\text{ N} \\cdot \\text{s}$',
    difficulty: 'medium'
  },
  {
    questionText: 'لاعب يركل كرة قدم كتلتها $0.45 \\text{ kg}$ فتغيرت سرعتها من الصفر إلى $20 \\text{ m/s}$. إذا كان زمن التلامس $0.01 \\text{ s}$، ما مقدار القوة؟',
    options: ['$90 \\text{ N}$', '$450 \\text{ N}$', '$900 \\text{ N}$', '$9 \\text{ N}$'],
    correctAnswerIndex: 2,
    explanation: 'الدفع: $J = m \\Delta v = 0.45 \\times 20 = 9 \\text{ N} \\cdot \\text{s}$\nالقوة: $F = \\frac{J}{\\Delta t} = \\frac{9}{0.01} = 900 \\text{ N}$',
    difficulty: 'medium'
  },
  {
    questionText: 'إذا تضاعف زمن التصادم مع ثبات التغير في الزخم، فإن القوة:',
    options: ['تتضاعف', 'تقل للنصف', 'تبقى ثابتة', 'تزداد 4 مرات'],
    correctAnswerIndex: 1,
    explanation: 'من العلاقة $F = \\frac{\\Delta p}{\\Delta t}$:\nعند ثبات $\\Delta p$، إذا تضاعف $\\Delta t$، فإن $F$ تقل للنصف (علاقة عكسية).',
    difficulty: 'medium'
  },

  // ===== صعب (Hard) =====
  {
    questionText: 'كرة كتلتها $0.15 \\text{ kg}$ تتحرك بسرعة $40 \\text{ m/s}$ فضُربت بمضرب فارتدت بسرعة $50 \\text{ m/s}$ بالاتجاه المعاكس. ما مقدار الدفع؟',
    options: ['$1.5 \\text{ N} \\cdot \\text{s}$', '$13.5 \\text{ N} \\cdot \\text{s}$', '$9.0 \\text{ N} \\cdot \\text{s}$', '$15 \\text{ N} \\cdot \\text{s}$'],
    correctAnswerIndex: 1,
    explanation: 'نعتبر الاتجاه الابتدائي موجبًا:\n$v_i = +40 \\text{ m/s}$، $v_f = -50 \\text{ m/s}$\n$J = m(v_f - v_i) = 0.15(-50 - 40) = 0.15 \\times (-90) = -13.5 \\text{ N} \\cdot \\text{s}$\nالمقدار = $13.5 \\text{ N} \\cdot \\text{s}$',
    difficulty: 'hard'
  },
  {
    questionText: 'سيارة كتلتها $1000 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$ توقفت خلال $2 \\text{ s}$ عند الفرملة. ما متوسط قوة الفرملة؟',
    options: ['$5000 \\text{ N}$', '$10000 \\text{ N}$', '$20000 \\text{ N}$', '$40000 \\text{ N}$'],
    correctAnswerIndex: 1,
    explanation: 'التغير في الزخم: $\\Delta p = m(v_f - v_i) = 1000(0 - 20) = -20000 \\text{ kg} \\cdot \\text{m/s}$\nالقوة: $F = \\frac{\\Delta p}{\\Delta t} = \\frac{-20000}{2} = -10000 \\text{ N}$\nالمقدار = $10000 \\text{ N}$',
    difficulty: 'hard'
  },
  {
    questionText: 'لاعب ملاكمة يسحب رأسه للخلف عند تلقي لكمة. هذا يؤدي إلى:',
    options: ['زيادة القوة وزيادة الزمن', 'تقليل القوة وزيادة الزمن', 'زيادة التغير في الزخم', 'تقليل الزمن وتقليل القوة'],
    correctAnswerIndex: 1,
    explanation: 'سحب الرأس يزيد زمن التلامس ($\\Delta t \\uparrow$).\nبما أن $\\Delta p$ ثابت (حركة اللكمة لا تتغير)، فإن:\n$F = \\frac{\\Delta p}{\\Delta t}$ → زيادة $\\Delta t$ تقلل $F$',
    difficulty: 'hard'
  },

  // ===== تميز (Excellence) =====
  {
    questionText: 'كرة كتلتها $m$ تتحرك بسرعة $v$ اصطدمت بحائط وارتدت بنفس السرعة. إذا كان زمن التلامس $\\Delta t$، فإن متوسط القوة على الحائط يساوي:',
    options: ['$\\frac{mv}{\\Delta t}$', '$\\frac{2mv}{\\Delta t}$', '$\\frac{mv}{2\\Delta t}$', 'صفر'],
    correctAnswerIndex: 1,
    explanation: 'السرعة الابتدائية: $+v$، السرعة النهائية: $-v$ (ارتدت بالاتجاه المعاكس)\n$\\Delta p = m(-v) - m(+v) = -2mv$\n$F = \\frac{\\Delta p}{\\Delta t} = \\frac{-2mv}{\\Delta t}$\nالمقدار = $\\frac{2mv}{\\Delta t}$',
    difficulty: 'excellence'
  },
  {
    questionText: 'من الرسم البياني (قوة-زمن)، يمثل الدفع:',
    options: ['ميل المنحنى', 'المساحة تحت المنحنى', 'نقطة التقاطع مع محور الزمن', 'أقصى قيمة للقوة'],
    correctAnswerIndex: 1,
    explanation: 'الدفع = $\\int F \\, dt$ = المساحة تحت منحنى القوة-الزمن.\nهذا مهم جدًا في التصادمات حيث تتغير القوة مع الزمن.',
    difficulty: 'excellence'
  },
];

export default function MomentumImpulseRelationQuizPage() {
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
    return filteredQuestions.filter((q, index) => {
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
