'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

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
        questionText: 'يمر تيار كهربائي مستقر مقداره $ 4 \\text{ A} $ في محث محاثته $ 0.5 \\text{ H} $. فجأة فتحت الدارة فتلاشى التيار للصفر خلال $ 0.1 \\text{ s} $. ما مقدار القوة الدافعة الحثية الذاتية المتولدة؟',
        options: [
            '$ 20 \\text{ V} $',
            '$ -20 \\text{ V} $',
            '$ 2 \\text{ V} $',
            '$ 0.2 \\text{ V} $'
        ],
        correctAnswerIndex: 0,
        explanation: 'التيار تلاشى للصفر: $I_2 = 0$ و $I_1 = 4\\text{ A}$، إذن $\\Delta I = 0 - 4 = -4\\text{ A}$. نعوض في قانون $\\varepsilon_L = -L \\frac{\\Delta I}{\\Delta t} = -0.5 \\times \\frac{-4}{0.1} = -0.5 \\times (-40) = +20\\text{ V}$ (وهي طردية لأن التغير نقصان).'
    },
    {
        questionText: 'ملف لولبي عدد لفاته $ 500 $ لفة، يمر فيه تيار، فيتولد تدفق مغناطيسي عبر كل لفة مقداره $ 2 \\times 10^{-3} \\text{ Wb} $. إذا كانت محاثة الملف $ 0.2 \\text{ H} $، فما مقدار التيار المار في الملف؟',
        options: [
            '$ 5 \\text{ A} $',
            '$ 10 \\text{ A} $',
            '$ 2 \\text{ A} $',
            '$ 0.5 \\text{ A} $'
        ],
        correctAnswerIndex: 0,
        explanation: 'نستخدم علاقة الربط $ LI = N \\Phi_B $. بالتعويض: $ 0.2 \\times I = 500 \\times (2 \\times 10^{-3}) $. نجد $ 0.2 \\times I = 1 $. ومنه $ I = 1 / 0.2 = 5 \\text{ A} $.'
    },
    {
        questionText: 'ملف طوله $ \\pi \\text{ m} $ ومساحة مقطعه $ 0.01 \\text{ m}^2 $، وعدد لفاته $ 1000 $ لفة. علماً بأن $ \\mu_0 = 4\\pi \\times 10^{-7} \\text{ T}\\cdot\\text{m/A} $، ما مقدار محاثته ($L$) تقريباً؟',
        options: [
            '$ 4 \\times 10^{-3} \\text{ H} $',
            '$ 2 \\times 10^{-3} \\text{ H} $',
            '$ 4 \\pi \\times 10^{-3} \\text{ H} $',
            '$ 1.25 \\text{ H} $'
        ],
        correctAnswerIndex: 0,
        explanation: 'نحسب المحاثة: $ L = \\frac{\\mu_0 N^2 A}{\\ell} = \\frac{4\\pi \\times 10^{-7} \\times (10^3)^2 \\times 10^{-2}}{\\pi} $. تذهب $\\pi$ مع $\\pi$. الأسس: $-7 + 6 - 2 = -3$. إذن الجواب هو $ 4 \\times 10^{-3} \\text{ H} $.'
    },
    {
        questionText: 'إذا تناقص التيار في ملف لولبي بمعدل $ 100 \\text{ A/s} $، وتولدت قوة دافعة حثية مقدارها $ 5 \\text{ V} $، كم تبلغ محاثة الملف؟',
        options: [
            '$ 500 \\text{ H} $',
            '$ 0.5 \\text{ H} $',
            '$ 0.05 \\text{ H} $',
            '$ 20 \\text{ H} $'
        ],
        correctAnswerIndex: 2,
        explanation: 'المعدل يتناقص يعني $\\frac{\\Delta I}{\\Delta t} = -100 \\text{ A/s}$. القوة الدافعة موجبة تعويضاً للنقص. $ \\varepsilon_L = -L \\frac{\\Delta I}{\\Delta t} \\Rightarrow 5 = -L (-100) \\Rightarrow L = 5 / 100 = 0.05 \\text{ H} $.'
    },
    {
        questionText: 'أي من التغيرات التالية سيؤدي إلى مضاعفة المحاثة ($L$) لملف لولبي إلى "أربعة أضعاف" مع بقاء باقي العوامل ثابتة؟',
        options: [
            'مضاعفة طول الملف للضعف.',
            'مضاعفة مساحة مقطع الملف للضعف.',
            'مضاعفة كل من مساحة المقطع وعدد اللفات.',
            'مضاعفة عدد اللفات للضعف.'
        ],
        correctAnswerIndex: 3,
        explanation: 'المحاثة $L$ تتناسب طردياً مع مربع عدد اللفات ($N^2$) وطردياً مع المساحة وعكسياً مع الطول. لمضاعفتها 4 مرات، يكفي مضاعفة عدد اللفات للضعف لأن $ (2N)^2 = 4N^2 $.'
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
