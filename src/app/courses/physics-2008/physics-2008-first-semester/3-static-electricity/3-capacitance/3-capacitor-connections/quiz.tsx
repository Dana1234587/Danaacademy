
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

// رسومات الدارات
const SeriesCircuit2 = () => (
    <svg viewBox="0 0 280 70" className="w-full h-16 mb-2">
        <line x1="20" y1="35" x2="50" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="50" stroke="#333" strokeWidth="3" />
        <line x1="58" y1="27" x2="58" y2="43" stroke="#333" strokeWidth="2" />
        <text x="54" y="62" textAnchor="middle" fontSize="10" fill="#666">12V</text>
        <line x1="58" y1="35" x2="90" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="90" y1="20" x2="90" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="105" y1="20" x2="105" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="97" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">6μF</text>
        <line x1="105" y1="35" x2="150" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="150" y1="20" x2="150" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="165" y1="20" x2="165" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="157" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">3μF</text>
        <line x1="165" y1="35" x2="260" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="35" x2="260" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
);

const ParallelCircuit2 = () => (
    <svg viewBox="0 0 250 110" className="w-full h-24 mb-2">
        <line x1="20" y1="55" x2="45" y2="55" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="42" x2="45" y2="68" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="47" x2="52" y2="63" stroke="#333" strokeWidth="2" />
        <text x="48" y="82" textAnchor="middle" fontSize="10" fill="#666">24V</text>
        <line x1="52" y1="55" x2="80" y2="55" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="55" x2="80" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="55" x2="80" y2="85" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="25" x2="110" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="15" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="15" x2="125" y2="35" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="48" textAnchor="middle" fontSize="10" fill="#16a34a">4μF</text>
        <line x1="125" y1="25" x2="170" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="85" x2="110" y2="85" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="75" x2="110" y2="95" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="75" x2="125" y2="95" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="108" textAnchor="middle" fontSize="10" fill="#16a34a">8μF</text>
        <line x1="125" y1="85" x2="170" y2="85" stroke="#333" strokeWidth="2" />
        <line x1="170" y1="25" x2="170" y2="85" stroke="#333" strokeWidth="2" />
        <line x1="170" y1="55" x2="230" y2="55" stroke="#333" strokeWidth="2" />
        <line x1="230" y1="55" x2="230" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="230" y1="5" x2="20" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="5" x2="20" y2="55" stroke="#333" strokeWidth="2" />
    </svg>
);

const SeriesCircuit3 = () => (
    <svg viewBox="0 0 340 70" className="w-full h-16 mb-2">
        <line x1="20" y1="35" x2="45" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="20" x2="45" y2="50" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="27" x2="52" y2="43" stroke="#333" strokeWidth="2" />
        <text x="48" y="62" textAnchor="middle" fontSize="10" fill="#666">30V</text>
        <line x1="52" y1="35" x2="85" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="85" y1="20" x2="85" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="100" y1="20" x2="100" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="92" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">2μF</text>
        <line x1="100" y1="35" x2="145" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="145" y1="20" x2="145" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="160" y1="20" x2="160" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="152" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">3μF</text>
        <line x1="160" y1="35" x2="205" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="205" y1="20" x2="205" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="220" y1="20" x2="220" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="212" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">6μF</text>
        <line x1="220" y1="35" x2="320" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="320" y1="35" x2="320" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="320" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
);

const MixedCircuit1 = () => (
    <svg viewBox="0 0 300 120" className="w-full h-28 mb-2">
        <line x1="20" y1="60" x2="45" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="45" x2="45" y2="75" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="52" x2="52" y2="68" stroke="#333" strokeWidth="2" />
        <text x="48" y="88" textAnchor="middle" fontSize="10" fill="#666">18V</text>
        <line x1="52" y1="60" x2="85" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="85" y1="45" x2="85" y2="75" stroke="#dc2626" strokeWidth="2" />
        <line x1="100" y1="45" x2="100" y2="75" stroke="#dc2626" strokeWidth="2" />
        <text x="92" y="88" textAnchor="middle" fontSize="10" fill="#dc2626">6μF</text>
        <line x1="100" y1="60" x2="130" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="60" x2="130" y2="30" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="60" x2="130" y2="90" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="30" x2="160" y2="30" stroke="#333" strokeWidth="2" />
        <line x1="160" y1="20" x2="160" y2="40" stroke="#16a34a" strokeWidth="2" />
        <line x1="175" y1="20" x2="175" y2="40" stroke="#16a34a" strokeWidth="2" />
        <text x="167" y="52" textAnchor="middle" fontSize="10" fill="#16a34a">4μF</text>
        <line x1="175" y1="30" x2="210" y2="30" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="90" x2="160" y2="90" stroke="#333" strokeWidth="2" />
        <line x1="160" y1="80" x2="160" y2="100" stroke="#16a34a" strokeWidth="2" />
        <line x1="175" y1="80" x2="175" y2="100" stroke="#16a34a" strokeWidth="2" />
        <text x="167" y="112" textAnchor="middle" fontSize="10" fill="#16a34a">4μF</text>
        <line x1="175" y1="90" x2="210" y2="90" stroke="#333" strokeWidth="2" />
        <line x1="210" y1="30" x2="210" y2="90" stroke="#333" strokeWidth="2" />
        <line x1="210" y1="60" x2="280" y2="60" stroke="#333" strokeWidth="2" />
        <line x1="280" y1="60" x2="280" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="280" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="60" stroke="#333" strokeWidth="2" />
    </svg>
);

const ParallelCircuit3 = () => (
    <svg viewBox="0 0 280 130" className="w-full h-28 mb-2">
        <line x1="20" y1="65" x2="45" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="50" x2="45" y2="80" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="57" x2="52" y2="73" stroke="#333" strokeWidth="2" />
        <text x="48" y="95" textAnchor="middle" fontSize="10" fill="#666">V</text>
        <line x1="52" y1="65" x2="80" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="80" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="80" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="25" x2="110" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="15" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="15" x2="125" y2="35" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="48" textAnchor="middle" fontSize="10" fill="#16a34a">C₁=?</text>
        <line x1="125" y1="25" x2="180" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="110" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="55" x2="110" y2="75" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="55" x2="125" y2="75" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="88" textAnchor="middle" fontSize="10" fill="#16a34a">6μF</text>
        <line x1="125" y1="65" x2="180" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="105" x2="110" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="95" x2="110" y2="115" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="95" x2="125" y2="115" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="125" textAnchor="middle" fontSize="10" fill="#16a34a">3μF</text>
        <line x1="125" y1="105" x2="180" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="25" x2="180" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="65" x2="260" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="65" x2="260" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="5" x2="20" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="5" x2="20" y2="65" stroke="#333" strokeWidth="2" />
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الدارة التالية، احسب المواسعة المكافئة للمواسعين الموصولين على التوالي:',
        diagram: SeriesCircuit2,
        options: ['$9 \\mu F$', '$2 \\mu F$', '$3 \\mu F$', '$18 \\mu F$'],
        correctAnswerIndex: 1,
        explanation: 'في التوالي: $\\frac{1}{C_{eq}} = \\frac{1}{C_1} + \\frac{1}{C_2} = \\frac{1}{6} + \\frac{1}{3} = \\frac{1}{6} + \\frac{2}{6} = \\frac{3}{6} = \\frac{1}{2}$\nإذاً $C_{eq} = 2 \\mu F$\nأو مباشرة: $C_{eq} = \\frac{C_1 \\times C_2}{C_1 + C_2} = \\frac{6 \\times 3}{6 + 3} = \\frac{18}{9} = 2 \\mu F$'
    },
    {
        questionText: 'في الدارة التالية، احسب الشحنة الكلية المخزنة في المواسعين:',
        diagram: ParallelCircuit2,
        options: ['$96 \\mu C$', '$192 \\mu C$', '$288 \\mu C$', '$384 \\mu C$'],
        correctAnswerIndex: 2,
        explanation: 'في التوازي: $C_{eq} = C_1 + C_2 = 4 + 8 = 12 \\mu F$\nالشحنة الكلية: $Q = C_{eq} \\times V = 12 \\times 10^{-6} \\times 24 = 288 \\mu C$'
    },
    {
        questionText: 'في الدارة التالية، ما مقدار الجهد على المواسع $C_2 = 3 \\mu F$؟',
        diagram: SeriesCircuit3,
        options: ['$5 V$', '$10 V$', '$15 V$', '$30 V$'],
        correctAnswerIndex: 1,
        explanation: 'أولاً نحسب المواسعة المكافئة: $\\frac{1}{C_{eq}} = \\frac{1}{2} + \\frac{1}{3} + \\frac{1}{6} = \\frac{3+2+1}{6} = 1$\nإذاً $C_{eq} = 1 \\mu F$\nالشحنة الكلية (وهي نفسها على كل مواسع في التوالي): $Q = C_{eq} \\times V = 1 \\times 30 = 30 \\mu C$\nالجهد على $C_2$: $V_2 = \\frac{Q}{C_2} = \\frac{30}{3} = 10 V$'
    },
    {
        questionText: 'في الدارة التالية (مواسع 6μF موصول على التوالي مع مواسعين 4μF على التوازي)، احسب المواسعة المكافئة الكلية:',
        diagram: MixedCircuit1,
        options: ['$14 \\mu F$', '$3 \\mu F$', '$6 \\mu F$', '$8 \\mu F$'],
        correctAnswerIndex: 1,
        explanation: 'نحل من الداخل للخارج:\n1. المواسعان على التوازي: $C_{parallel} = 4 + 4 = 8 \\mu F$\n2. ثم $C_{parallel}$ موصول على التوالي مع $6 \\mu F$:\n$C_{eq} = \\frac{6 \\times 8}{6 + 8} = \\frac{48}{14} ≈ 3.43 \\mu F ≈ 3 \\mu F$'
    },
    {
        questionText: 'ثلاثة مواسعات موصولة على التوازي كما في الشكل. إذا كانت المواسعة المكافئة = 15μF، والشحنة على المواسع 6μF تساوي 36μC، ما قيمة $C_1$؟',
        diagram: ParallelCircuit3,
        options: ['$3 \\mu F$', '$6 \\mu F$', '$9 \\mu F$', '$12 \\mu F$'],
        correctAnswerIndex: 1,
        explanation: 'في التوازي الجهد ثابت على جميع المواسعات.\nنجد الجهد من المواسع 6μF: $V = \\frac{Q}{C} = \\frac{36}{6} = 6 V$\nفي التوازي: $C_{eq} = C_1 + 6 + 3 = 15$\nإذاً: $C_1 = 15 - 6 - 3 = 6 \\mu F$'
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
                    {quizQuestions.map((q, qIndex) => {
                        const DiagramComponent = q.diagram;
                        return (
                            <Card key={qIndex} className={`border-2 ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'} transition-colors duration-300 shadow-lg`}>
                                <CardHeader>
                                    <CardTitle><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></CardTitle>
                                    <div className="bg-white p-3 rounded-lg border mt-3">
                                        <DiagramComponent />
                                    </div>
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
                        );
                    })}
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
