'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: any }) => {
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
        questionText: 'ما السبب الذي يجعل التيار الكهربائي يتدفق تدريجياً (ينمو ببطء) عند إغلاق دارة تحتوي على محث (ملف)؟',
        options: [
            'الاحتكاك بين الإلكترونات وأسلاك الملف.',
            'تولد قوة دافعة حثية عكسية في المحث تقاوم نمو التيار.',
            'بسبب ضعف القوة الدافعة الكهربائية للبطارية في البداية.',
            'تولد تيار حثي في نفس اتجاه تيار البطارية.'
        ],
        correctAnswerIndex: 1,
        explanation: 'عند إغلاق الدارة يبدأ التيار بالزيادة، فتنشأ قوة دافعة كهربائية حثية ذاتية في المحث (عكسية) تقاوم هذه الزيادة ตาม قانون لنز، مما يبطئ عملية نمو التيار.'
    },
    {
        questionText: 'أي من الكميات الآتية هي وحدة الهنري (H) المعبرة عن معامل الحث الذاتي؟',
        options: [
            '$V \\cdot s / A$',
            '$A \\cdot s / V$',
            '$V \\cdot A / s$',
            '$T \\cdot m^2 / s$'
        ],
        correctAnswerIndex: 0,
        explanation: 'من قانون $ \\varepsilon_L = -L \\frac{\\Delta I}{\\Delta t} $ نجد أن $ L = \\varepsilon_L \\cdot \\frac{\\Delta t}{\\Delta I} $. لذا وحدة قياس المحاثة $H = V \\cdot s / A$.'
    },
    {
        questionText: 'إذا زُيد عدد لفات محث لولبي ليصبح ضعف ما كان عليه، مع بقاء المساحة والطول ثابتين، فإن محاثته (L) ستصبح:',
        options: [
            'نصف ما كانت عليه.',
            'ضعف ما كانت عليه.',
            'أربعة أضعاف ما كانت عليه.',
            'تبقى ثابتة.'
        ],
        correctAnswerIndex: 2,
        explanation: 'بحسب القانون $ L = \\frac{\\mu N^2 A}{\\ell} $، المحاثة تتناسب طردياً مع مربع عدد اللفات ($N^2$). فإذا زاد عدد اللفات للضعف، تزداد المحاثة بمقدار $(2)^2 = 4$ أضعاف.'
    },
    {
        questionText: 'عندما يتلاشى التيار الكهربائي في محث بمعدل $ 5 \\text{ A/s} $، تتولد بين طرفيه قوة دافعة حثية ذاتية مقدارها $ 10 \\text{ V} $. ما مقدار معامل الحث الذاتي للمحث؟',
        options: [
            '$ 2 \\text{ H} $',
            '$ 0.5 \\text{ H} $',
            '$ 50 \\text{ H} $',
            '$ 15 \\text{ H} $'
        ],
        correctAnswerIndex: 0,
        explanation: 'نستخدم العلاقة $|\\varepsilon_L| = L \\frac{\\Delta I}{\\Delta t}$. هنا $10 = L (5)$، إذاً $L = 10 / 5 = 2 \\text{ H}$.'
    },
    {
        questionText: 'يمر تيار كهربائي مقداره $ 2 \\text{ A} $ في محث يتكون من $ 100 $ لفة، فيتولد تدفق مغناطيسي مستقر مقداره $ 0.04 \\text{ Wb} $ عبر كل لفة. ما مقدار محاثة الملف ($L$)؟',
        options: [
            '$ 0.5 \\text{ H} $',
            '$ 8 \\text{ H} $',
            '$ 2 \\text{ H} $',
            '$ 400 \\text{ H} $'
        ],
        correctAnswerIndex: 2,
        explanation: 'نستخدم علاقة الربط: $ L I = N \\Phi_B $. بالتعويض: $ L (2) = 100 \\times 0.04 $ ومنه $ L (2) = 4 $، إذن $ L = 2 \\text{ H} $.'
    }
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
                                            {isSubmitted && selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto" />}
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
