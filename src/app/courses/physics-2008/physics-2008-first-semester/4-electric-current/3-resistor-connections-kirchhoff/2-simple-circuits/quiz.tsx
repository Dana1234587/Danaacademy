
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

// رسم دارة بسيطة
const SimpleCircuit = () => (
    <svg viewBox="0 0 300 120" className="w-full h-28 bg-white rounded border">
        <line x1="30" y1="60" x2="50" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="40" x2="50" y2="80" stroke="#333" strokeWidth="3" />
        <line x1="58" y1="48" x2="58" y2="72" stroke="#333" strokeWidth="2" />
        <text x="54" y="95" textAnchor="middle" fontSize="9" fill="#666">12V, 2Ω</text>
        <line x1="58" y1="60" x2="100" y2="60" stroke="#333" strokeWidth="2" />
        <rect x="100" y="50" width="50" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="125" y="85" textAnchor="middle" fontSize="9" fill="#2563eb">4Ω</text>
        <line x1="150" y1="60" x2="270" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="270" y1="60" x2="270" y2="20" stroke="#333" strokeWidth="2" />
        <line x1="270" y1="20" x2="30" y2="20" stroke="#333" strokeWidth="2" />
        <line x1="30" y1="20" x2="30" y2="60" stroke="#333" strokeWidth="2" />
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الدارة المجاورة، ما قيمة التيار المار؟',
        options: ['$3 \\, A$', '$2 \\, A$', '$6 \\, A$', '$1.5 \\, A$'],
        correctAnswerIndex: 1,
        explanation: 'باستخدام قانون الدارة البسيطة:\n$I = \\frac{\\varepsilon}{r + R} = \\frac{12}{2 + 4} = \\frac{12}{6} = 2 \\, A$',
        hasGraph: true,
        GraphComponent: SimpleCircuit
    },
    {
        questionText: 'في نفس الدارة السابقة، ما قراءة فولتميتر موصول على طرفي المقاومة $4\\Omega$؟',
        options: ['$12 \\, V$', '$8 \\, V$', '$4 \\, V$', '$10 \\, V$'],
        correctAnswerIndex: 1,
        explanation: 'قراءة الفولتميتر على المقاومة = قانون أوم:\n$V = I \\times R = 2 \\times 4 = 8 \\, V$'
    },
    {
        questionText: 'في نفس الدارة، ما قراءة فولتميتر موصول على طرفي البطارية؟',
        options: ['$12 \\, V$', '$8 \\, V$', '$4 \\, V$', '$10 \\, V$'],
        correctAnswerIndex: 1,
        explanation: 'قراءة الفولتميتر على البطارية:\n$V = \\varepsilon - I \\times r = 12 - 2 \\times 2 = 12 - 4 = 8 \\, V$'
    },
    {
        questionText: 'بطارية مثالية ($r = 0$) قوتها الدافعة $10V$. ما قراءة فولتميتر موصول على طرفيها؟',
        options: ['$0 \\, V$', '$5 \\, V$', '$10 \\, V$', 'يعتمد على المقاومة الخارجية'],
        correctAnswerIndex: 2,
        explanation: 'البطارية المثالية: $r = 0$\n$V = \\varepsilon - I \\times 0 = \\varepsilon = 10 \\, V$\nقراءة الفولتميتر = القوة الدافعة'
    },
    {
        questionText: 'دارة بسيطة تحتوي بطاريتين على التوالي ($\\varepsilon_1 = 6V, r_1 = 0.5\\Omega$) و ($\\varepsilon_2 = 3V, r_2 = 0.5\\Omega$) ومقاومة خارجية $4\\Omega$. ما التيار إذا كانتا بنفس الاتجاه؟',
        options: ['$1.8 \\, A$', '$0.6 \\, A$', '$1.5 \\, A$', '$2 \\, A$'],
        correctAnswerIndex: 0,
        explanation: 'بنفس الاتجاه:\n$\\sum \\varepsilon = 6 + 3 = 9 \\, V$\n$\\sum r = 0.5 + 0.5 = 1 \\, \\Omega$\n$I = \\frac{9}{1 + 4} = \\frac{9}{5} = 1.8 \\, A$'
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
                                {q.hasGraph && q.GraphComponent && (
                                    <div className="mt-3">
                                        <q.GraphComponent />
                                    </div>
                                )}
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
