
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
const CircuitDiagram1 = () => (
    <svg viewBox="0 0 250 100" className="w-full h-24 bg-white rounded border">
        <line x1="20" y1="50" x2="50" y2="50" stroke="#333" strokeWidth="2" />
        <rect x="50" y="40" width="40" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="70" y="75" textAnchor="middle" fontSize="10" fill="#2563eb">6Ω</text>
        <line x1="90" y1="50" x2="120" y2="50" stroke="#333" strokeWidth="2" />
        <rect x="120" y="40" width="40" height="20" fill="none" stroke="#2563eb" strokeWidth="2" />
        <text x="140" y="75" textAnchor="middle" fontSize="10" fill="#2563eb">3Ω</text>
        <line x1="160" y1="50" x2="230" y2="50" stroke="#333" strokeWidth="2" />
        <line x1="230" y1="50" x2="230" y2="20" stroke="#333" strokeWidth="2" />
        <line x1="230" y1="20" x2="20" y2="20" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="20" x2="20" y2="50" stroke="#333" strokeWidth="2" />
    </svg>
);

const CircuitDiagram2 = () => (
    <svg viewBox="0 0 200 120" className="w-full h-28 bg-white rounded border">
        <line x1="20" y1="60" x2="60" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="60" y1="60" x2="60" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="60" y1="60" x2="60" y2="95" stroke="#333" strokeWidth="2" />
        <rect x="60" y="15" width="40" height="20" fill="none" stroke="#16a34a" strokeWidth="2" />
        <text x="80" y="12" textAnchor="middle" fontSize="9" fill="#16a34a">4Ω</text>
        <rect x="60" y="85" width="40" height="20" fill="none" stroke="#16a34a" strokeWidth="2" />
        <text x="80" y="118" textAnchor="middle" fontSize="9" fill="#16a34a">4Ω</text>
        <line x1="100" y1="25" x2="140" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="100" y1="95" x2="140" y2="95" stroke="#333" strokeWidth="2" />
        <line x1="140" y1="25" x2="140" y2="95" stroke="#333" strokeWidth="2" />
        <line x1="140" y1="60" x2="180" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="60" x2="180" y2="110" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="110" x2="20" y2="110" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="110" x2="20" y2="60" stroke="#333" strokeWidth="2" />
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الدارة المجاورة، ما قيمة المقاومة المكافئة؟',
        options: ['$9 \\, \\Omega$', '$2 \\, \\Omega$', '$18 \\, \\Omega$', '$3 \\, \\Omega$'],
        correctAnswerIndex: 0,
        explanation: 'المقاومتان موصولتان على التوالي:\n$R_{eq} = R_1 + R_2 = 6 + 3 = 9 \\, \\Omega$',
        hasGraph: true,
        GraphComponent: CircuitDiagram1
    },
    {
        questionText: 'في الدارة المجاورة، مقاومتان متماثلتان موصولتان على التوازي. ما المقاومة المكافئة؟',
        options: ['$8 \\, \\Omega$', '$4 \\, \\Omega$', '$2 \\, \\Omega$', '$16 \\, \\Omega$'],
        correctAnswerIndex: 2,
        explanation: 'مقاومتان متماثلتان على التوازي:\n$R_{eq} = \\frac{R}{n} = \\frac{4}{2} = 2 \\, \\Omega$\nأو: $R_{eq} = \\frac{R_1 \\times R_2}{R_1 + R_2} = \\frac{4 \\times 4}{4 + 4} = \\frac{16}{8} = 2 \\, \\Omega$',
        hasGraph: true,
        GraphComponent: CircuitDiagram2
    },
    {
        questionText: 'شخص لديه مقاومات $6\\Omega$ و $3\\Omega$ و $5\\Omega$. كيف يوصلها للحصول على مقاومة مكافئة $7\\Omega$؟',
        options: [
            'الثلاثة على التوالي',
            '$6\\Omega$ و $3\\Omega$ على التوازي، ثم الناتج مع $5\\Omega$ على التوالي',
            '$3\\Omega$ و $5\\Omega$ على التوازي، ثم الناتج مع $6\\Omega$ على التوالي',
            'الثلاثة على التوازي'
        ],
        correctAnswerIndex: 1,
        explanation: '1. نوصل $6\\Omega$ و $3\\Omega$ على التوازي:\n$R_{parallel} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2 \\, \\Omega$\n2. نوصل الناتج ($2\\Omega$) مع $5\\Omega$ على التوالي:\n$R_{eq} = 2 + 5 = 7 \\, \\Omega$ ✅'
    },
    {
        questionText: '4 مقاومات متماثلة قيمة كل منها $12\\Omega$ موصولة على التوازي. ما المقاومة المكافئة؟',
        options: ['$48 \\, \\Omega$', '$3 \\, \\Omega$', '$12 \\, \\Omega$', '$6 \\, \\Omega$'],
        correctAnswerIndex: 1,
        explanation: 'n مقاومات متماثلة على التوازي:\n$R_{eq} = \\frac{R}{n} = \\frac{12}{4} = 3 \\, \\Omega$'
    },
    {
        questionText: 'ما قيمة المقاومة المكافئة إذا وصلنا $8\\Omega$ و $8\\Omega$ على التوازي، ثم وصلنا الناتج مع $4\\Omega$ على التوالي؟',
        options: ['$8 \\, \\Omega$', '$20 \\, \\Omega$', '$4 \\, \\Omega$', '$12 \\, \\Omega$'],
        correctAnswerIndex: 0,
        explanation: '1. التوازي: $R = \\frac{8}{2} = 4 \\, \\Omega$ (متماثلتان)\n2. التوالي: $R_{eq} = 4 + 4 = 8 \\, \\Omega$'
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
