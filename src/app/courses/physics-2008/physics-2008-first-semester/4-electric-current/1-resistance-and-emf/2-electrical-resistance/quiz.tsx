
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
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
                <span key={lineIndex} className="block my-1 text-right">
                    {line.split('$').map(renderPart)}
                </span>
            ))}
        </Wrapper>
    );
};

const quizQuestions = [
    {
        questionText: 'موصل فرق الجهد بين طرفيه $12 V$ ويمر فيه تيار شدته $3 A$. ما مقاومته؟',
        options: ['$36 \\Omega$', '$4 \\Omega$', '$0.25 \\Omega$', '$15 \\Omega$'],
        correctAnswerIndex: 1,
        explanation: 'من قانون أوم: $R = \\frac{V}{I} = \\frac{12}{3} = 4 \\Omega$'
    },
    {
        questionText: 'سلك نحاسي طوله $2 m$ ومساحة مقطعه $4 \\times 10^{-6} m^2$. إذا كانت مقاوميته $1.7 \\times 10^{-8} \\Omega \\cdot m$، ما مقاومته؟',
        options: ['$8.5 \\times 10^{-3} \\Omega$', '$8.5 \\times 10^{-2} \\Omega$', '$0.85 \\Omega$', '$8.5 \\Omega$'],
        correctAnswerIndex: 0,
        explanation: 'من قانون الأبعاد: $R = \\rho \\frac{L}{A} = 1.7 \\times 10^{-8} \\times \\frac{2}{4 \\times 10^{-6}}$\n$R = 1.7 \\times 10^{-8} \\times 0.5 \\times 10^{6} = 0.85 \\times 10^{-2} = 8.5 \\times 10^{-3} \\Omega$'
    },
    {
        questionText: 'سلك دائري المقطع نصف قطره $2 mm$. ما مساحة مقطعه بوحدة $m^2$؟',
        options: ['$4\\pi \\times 10^{-6} m^2$', '$4\\pi \\times 10^{-3} m^2$', '$2\\pi \\times 10^{-6} m^2$', '$\\pi \\times 10^{-6} m^2$'],
        correctAnswerIndex: 0,
        explanation: 'نحول نصف القطر: $r = 2 mm = 2 \\times 10^{-3} m$\nمساحة الدائرة: $A = \\pi r^2 = \\pi \\times (2 \\times 10^{-3})^2 = \\pi \\times 4 \\times 10^{-6} = 4\\pi \\times 10^{-6} m^2$'
    },
    {
        questionText: 'إذا تضاعف طول سلك مع بقاء مساحة مقطعه ثابتة، فإن مقاومته:',
        options: ['تبقى ثابتة', 'تتضاعف', 'تتربع', 'تنتصف'],
        correctAnswerIndex: 1,
        explanation: 'من قانون $R = \\rho \\frac{L}{A}$، L في البسط = علاقة طردية.\nإذا $L$ تضاعف → $R$ تتضاعف.\n$R_{new} = \\rho \\frac{2L}{A} = 2 \\times \\rho \\frac{L}{A} = 2R$'
    },
    {
        questionText: 'موصل مقاومته $10 \\Omega$ ويمر فيه تيار $2 A$. إذا زاد فرق الجهد للضعف، فإن التيار الجديد (للمقاومة الأومية):',
        options: ['$1 A$', '$2 A$', '$4 A$', '$8 A$'],
        correctAnswerIndex: 2,
        explanation: 'فرق الجهد الأصلي: $V = IR = 2 \\times 10 = 20 V$\nفرق الجهد الجديد: $V_{new} = 2 \\times 20 = 40 V$\nللمقاومة الأومية R ثابتة:\n$I_{new} = \\frac{V_{new}}{R} = \\frac{40}{10} = 4 A$'
    },
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
