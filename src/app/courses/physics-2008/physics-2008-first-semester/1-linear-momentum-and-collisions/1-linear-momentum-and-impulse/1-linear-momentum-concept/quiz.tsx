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
import { useQuizProgress } from '@/hooks/useQuizProgress';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
  const lines = text.split('\n');

  const renderPart = (part: string, index: number) => {
    if (index % 2 === 0) {
      return <span key={index}>{part}</span>;
    } else {
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
  // ===== سهل (Easy) - 25% =====
  {
    questionText: 'الزخم الخطي هو كمية فيزيائية:',
    options: ['قياسية', 'متجهة', 'ليس لها وحدة', 'ثابتة دائمًا'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الخطي كمية متجهة لأنه حاصل ضرب الكتلة (كمية قياسية) في السرعة المتجهة (كمية متجهة)، واتجاهه هو نفس اتجاه السرعة.',
    difficulty: 'easy'
  },
  {
    questionText: 'وحدة قياس الزخم الخطي في النظام الدولي هي:',
    options: ['$\\text{kg} / \\text{m}$', '$\\text{N} / \\text{s}$', '$\\text{kg} \\cdot \\text{m/s}$', '$\\text{m/s}^2$'],
    correctAnswerIndex: 2,
    explanation: 'وحدة الزخم هي $\\text{kg} \\cdot \\text{m/s}$ أو $\\text{N} \\cdot \\text{s}$، وهي ناتجة من ضرب وحدة الكتلة (kg) في وحدة السرعة (m/s).',
    difficulty: 'easy'
  },
  {
    questionText: 'اتجاه الزخم الخطي لجسم متحرك يكون:',
    options: ['عموديًا على اتجاه السرعة', 'معاكسًا لاتجاه السرعة', 'بنفس اتجاه السرعة', 'ليس له اتجاه محدد'],
    correctAnswerIndex: 2,
    explanation: 'اتجاه الزخم الخطي هو دائمًا نفس اتجاه السرعة المتجهة للجسم، لأن الكتلة كمية موجبة لا تغير الاتجاه.',
    difficulty: 'easy'
  },

  // ===== متوسط (Medium) - 35% =====
  {
    questionText: 'سيارة كتلتها $1000 \\text{ kg}$ تتحرك بسرعة $20 \\text{ m/s}$ شرقًا. ما مقدار زخمها الخطي؟',
    options: ['$20000 \\text{ kg} \\cdot \\text{m/s}$ شرقًا', '$50 \\text{ kg} \\cdot \\text{m/s}$ شرقًا', '$20000 \\text{ N} \\cdot \\text{s}$ غربًا', '$200000 \\text{ kg} \\cdot \\text{m/s}$ شرقًا'],
    correctAnswerIndex: 0,
    explanation: 'الزخم الخطي $p = m \\times v = 1000 \\times 20 = 20000 \\text{ kg} \\cdot \\text{m/s}$. الاتجاه هو نفس اتجاه السرعة، أي شرقًا.',
    difficulty: 'medium'
  },
  {
    questionText: 'كرة قدم كتلتها $0.45 \\text{ kg}$ تتحرك بسرعة $30 \\text{ m/s}$. ما مقدار زخمها؟',
    options: ['$13.5 \\text{ kg} \\cdot \\text{m/s}$', '$66.7 \\text{ kg} \\cdot \\text{m/s}$', '$30.45 \\text{ kg} \\cdot \\text{m/s}$', '$0.015 \\text{ kg} \\cdot \\text{m/s}$'],
    correctAnswerIndex: 0,
    explanation: '$p = m \\times v = 0.45 \\times 30 = 13.5 \\text{ kg} \\cdot \\text{m/s}$',
    difficulty: 'medium'
  },
  {
    questionText: 'إذا تضاعفت سرعة جسم مع بقاء كتلته ثابتة، فإن زخمه الخطي:',
    options: ['يتضاعف', 'يقل إلى النصف', 'يبقى ثابتًا', 'يزداد أربع مرات'],
    correctAnswerIndex: 0,
    explanation: 'بما أن الزخم يتناسب طرديًا مع السرعة ($p = mv$)، فعندما تتضاعف السرعة، يتضاعف الزخم الخطي أيضًا.',
    difficulty: 'medium'
  },
  {
    questionText: 'جسم زخمه $48 \\text{ kg} \\cdot \\text{m/s}$ وكتلته $6 \\text{ kg}$. ما سرعته؟',
    options: ['$288 \\text{ m/s}$', '$42 \\text{ m/s}$', '$8 \\text{ m/s}$', '$54 \\text{ m/s}$'],
    correctAnswerIndex: 2,
    explanation: 'من قانون الزخم $p = mv$، نحصل على $v = \\frac{p}{m} = \\frac{48}{6} = 8 \\text{ m/s}$',
    difficulty: 'medium'
  },

  // ===== صعب (Hard) - 25% =====
  {
    questionText: 'أي من الأجسام التالية هو الأصعب إيقافًا؟',
    options: [
      'جسم كتلته $2 \\text{ kg}$ يتحرك بسرعة $6 \\text{ m/s}$',
      'جسم كتلته $3 \\text{ kg}$ يتحرك بسرعة $5 \\text{ m/s}$',
      'جسم كتلته $4 \\text{ kg}$ يتحرك بسرعة $3 \\text{ m/s}$',
      'جسم كتلته $1 \\text{ kg}$ يتحرك بسرعة $10 \\text{ m/s}$'
    ],
    correctAnswerIndex: 1,
    explanation: 'صعوبة الإيقاف تعتمد على مقدار الزخم:\n• الخيار أ: $p = 2 \\times 6 = 12$\n• الخيار ب: $p = 3 \\times 5 = 15$ ✓ (الأكبر)\n• الخيار ج: $p = 4 \\times 3 = 12$\n• الخيار د: $p = 1 \\times 10 = 10$',
    difficulty: 'hard'
  },
  {
    questionText: 'جسمان A و B لهما نفس الزخم الخطي. إذا كانت كتلة الجسم A ضعف كتلة الجسم B، فإن سرعة الجسم A تكون:',
    options: ['ضعف سرعة B', 'نصف سرعة B', 'تساوي سرعة B', 'ربع سرعة B'],
    correctAnswerIndex: 1,
    explanation: 'لدينا $p_A = p_B$، إذن $m_A v_A = m_B v_B$.\nبما أن $m_A = 2m_B$:\n$(2m_B) v_A = m_B v_B$\n$v_A = \\frac{v_B}{2}$\nأي أن سرعة A نصف سرعة B.',
    difficulty: 'hard'
  },
  {
    questionText: 'رصاصة كتلتها $20 \\text{ g}$ تتحرك بسرعة $400 \\text{ m/s}$، وسيارة كتلتها $2000 \\text{ kg}$ تتحرك بسرعة $4 \\text{ m/s}$. قارن بين زخميهما:',
    options: [
      'زخم الرصاصة أكبر',
      'زخم السيارة أكبر',
      'زخماهما متساويان',
      'لا يمكن المقارنة'
    ],
    correctAnswerIndex: 1,
    explanation: 'زخم الرصاصة: $p_1 = 0.02 \\times 400 = 8 \\text{ kg} \\cdot \\text{m/s}$\nزخم السيارة: $p_2 = 2000 \\times 4 = 8000 \\text{ kg} \\cdot \\text{m/s}$\nزخم السيارة أكبر بـ 1000 مرة!',
    difficulty: 'hard'
  },

  // ===== تميز (Excellence) - 15% =====
  {
    questionText: 'جسم كتلته $m$ يتحرك بسرعة $v$ فيكون زخمه $p$. إذا زادت كتلته إلى $3m$ وزادت سرعته إلى $2v$، فإن زخمه الجديد يساوي:',
    options: ['$5p$', '$6p$', '$9p$', '$12p$'],
    correctAnswerIndex: 1,
    explanation: 'الزخم الأصلي: $p = mv$\nالزخم الجديد: $p_{new} = (3m)(2v) = 6mv = 6p$',
    difficulty: 'excellence'
  },
  {
    questionText: 'كرة كتلتها $0.2 \\text{ kg}$ تتحرك بسرعة $15 \\text{ m/s}$ نحو اليمين. ما مقدار واتجاه زخمها إذا اعتبرنا اتجاه اليسار موجبًا؟',
    options: [
      '$+3 \\text{ kg} \\cdot \\text{m/s}$',
      '$-3 \\text{ kg} \\cdot \\text{m/s}$',
      '$+0.013 \\text{ kg} \\cdot \\text{m/s}$',
      '$-0.013 \\text{ kg} \\cdot \\text{m/s}$'
    ],
    correctAnswerIndex: 1,
    explanation: 'بما أن اليسار موجب، فإن اليمين سالب.\n$v = -15 \\text{ m/s}$\n$p = mv = 0.2 \\times (-15) = -3 \\text{ kg} \\cdot \\text{m/s}$\nالإشارة السالبة تدل على الاتجاه نحو اليمين.',
    difficulty: 'excellence'
  },
];

export default function QuizPage() {
  const [selectedAnswers, setSelectedAnswers] = useState<(number | null)[]>(new Array(quizQuestions.length).fill(null));
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [difficultyFilter, setDifficultyFilter] = useState<Difficulty>('all');
  const { submitQuizResult } = useQuizProgress();

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

  const calculateScore = () => {
    return filteredQuestions.filter((q, index) => {
      const actualIndex = quizQuestions.indexOf(q);
      return selectedAnswers[actualIndex] === q.correctAnswerIndex;
    }).length;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    // إرسال نتائج الاختبار لنظام التتبع
    const score = calculateScore();
    submitQuizResult(score, filteredQuestions.length);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSelectedAnswers(new Array(quizQuestions.length).fill(null));
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
