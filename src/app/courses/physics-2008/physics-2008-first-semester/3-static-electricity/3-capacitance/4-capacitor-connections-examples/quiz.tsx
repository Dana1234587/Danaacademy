
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

// رسومات الدارات - مختلفة عن الحصة السابقة
const SeriesCircuit4 = () => (
    <svg viewBox="0 0 340 70" className="w-full h-16 mb-2">
        <line x1="20" y1="35" x2="45" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="20" x2="45" y2="50" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="27" x2="52" y2="43" stroke="#333" strokeWidth="2" />
        <text x="48" y="62" textAnchor="middle" fontSize="10" fill="#666">48V</text>
        <line x1="52" y1="35" x2="85" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="85" y1="20" x2="85" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="100" y1="20" x2="100" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="92" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">8μF</text>
        <line x1="100" y1="35" x2="145" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="145" y1="20" x2="145" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="160" y1="20" x2="160" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="152" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">4μF</text>
        <line x1="160" y1="35" x2="205" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="205" y1="20" x2="205" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="220" y1="20" x2="220" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="212" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">8μF</text>
        <line x1="220" y1="35" x2="320" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="320" y1="35" x2="320" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="320" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
);

const ParallelCircuit4 = () => (
    <svg viewBox="0 0 280 130" className="w-full h-28 mb-2">
        <line x1="20" y1="65" x2="45" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="50" x2="45" y2="80" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="57" x2="52" y2="73" stroke="#333" strokeWidth="2" />
        <text x="48" y="95" textAnchor="middle" fontSize="10" fill="#666">36V</text>
        <line x1="52" y1="65" x2="80" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="80" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="80" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="25" x2="110" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="15" x2="110" y2="35" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="15" x2="125" y2="35" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="48" textAnchor="middle" fontSize="10" fill="#16a34a">2μF</text>
        <line x1="125" y1="25" x2="180" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="65" x2="110" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="55" x2="110" y2="75" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="55" x2="125" y2="75" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="88" textAnchor="middle" fontSize="10" fill="#16a34a">4μF</text>
        <line x1="125" y1="65" x2="180" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="105" x2="110" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="110" y1="95" x2="110" y2="115" stroke="#16a34a" strokeWidth="2" />
        <line x1="125" y1="95" x2="125" y2="115" stroke="#16a34a" strokeWidth="2" />
        <text x="117" y="125" textAnchor="middle" fontSize="10" fill="#16a34a">6μF</text>
        <line x1="125" y1="105" x2="180" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="25" x2="180" y2="105" stroke="#333" strokeWidth="2" />
        <line x1="180" y1="65" x2="260" y2="65" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="65" x2="260" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="5" x2="20" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="5" x2="20" y2="65" stroke="#333" strokeWidth="2" />
    </svg>
);

const MixedCircuit2 = () => (
    <svg viewBox="0 0 320 100" className="w-full h-24 mb-2">
        <line x1="20" y1="50" x2="45" y2="50" stroke="#333" strokeWidth="2" />
        <line x1="45" y1="35" x2="45" y2="65" stroke="#333" strokeWidth="3" />
        <line x1="52" y1="42" x2="52" y2="58" stroke="#333" strokeWidth="2" />
        <text x="48" y="78" textAnchor="middle" fontSize="10" fill="#666">20V</text>
        <line x1="52" y1="50" x2="80" y2="50" stroke="#333" strokeWidth="2" />
        {/* فرع علوي - توالي */}
        <line x1="80" y1="50" x2="80" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="25" x2="105" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="105" y1="15" x2="105" y2="35" stroke="#dc2626" strokeWidth="2" />
        <line x1="118" y1="15" x2="118" y2="35" stroke="#dc2626" strokeWidth="2" />
        <text x="111" y="48" textAnchor="middle" fontSize="9" fill="#dc2626">3μF</text>
        <line x1="118" y1="25" x2="145" y2="25" stroke="#333" strokeWidth="2" />
        <line x1="145" y1="15" x2="145" y2="35" stroke="#dc2626" strokeWidth="2" />
        <line x1="158" y1="15" x2="158" y2="35" stroke="#dc2626" strokeWidth="2" />
        <text x="151" y="48" textAnchor="middle" fontSize="9" fill="#dc2626">6μF</text>
        <line x1="158" y1="25" x2="200" y2="25" stroke="#333" strokeWidth="2" />
        {/* فرع سفلي */}
        <line x1="80" y1="50" x2="80" y2="75" stroke="#333" strokeWidth="2" />
        <line x1="80" y1="75" x2="130" y2="75" stroke="#333" strokeWidth="2" />
        <line x1="130" y1="65" x2="130" y2="85" stroke="#16a34a" strokeWidth="2" />
        <line x1="145" y1="65" x2="145" y2="85" stroke="#16a34a" strokeWidth="2" />
        <text x="137" y="95" textAnchor="middle" fontSize="10" fill="#16a34a">4μF</text>
        <line x1="145" y1="75" x2="200" y2="75" stroke="#333" strokeWidth="2" />
        {/* التجميع */}
        <line x1="200" y1="25" x2="200" y2="75" stroke="#333" strokeWidth="2" />
        <line x1="200" y1="50" x2="300" y2="50" stroke="#333" strokeWidth="2" />
        <line x1="300" y1="50" x2="300" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="300" y1="5" x2="20" y2="5" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="5" x2="20" y2="50" stroke="#333" strokeWidth="2" />
    </svg>
);

const EnergyCircuit = () => (
    <svg viewBox="0 0 280 70" className="w-full h-16 mb-2">
        <line x1="20" y1="35" x2="50" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="50" stroke="#333" strokeWidth="3" />
        <line x1="58" y1="27" x2="58" y2="43" stroke="#333" strokeWidth="2" />
        <text x="54" y="62" textAnchor="middle" fontSize="10" fill="#666">100V</text>
        <line x1="58" y1="35" x2="120" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="120" y1="20" x2="120" y2="50" stroke="#f59e0b" strokeWidth="2" />
        <line x1="140" y1="20" x2="140" y2="50" stroke="#f59e0b" strokeWidth="2" />
        <text x="130" y="62" textAnchor="middle" fontSize="10" fill="#f59e0b">50μF</text>
        <line x1="140" y1="35" x2="260" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="35" x2="260" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
);

const SeriesVoltage = () => (
    <svg viewBox="0 0 280 70" className="w-full h-16 mb-2">
        <line x1="20" y1="35" x2="50" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="50" y1="20" x2="50" y2="50" stroke="#333" strokeWidth="3" />
        <line x1="58" y1="27" x2="58" y2="43" stroke="#333" strokeWidth="2" />
        <text x="54" y="62" textAnchor="middle" fontSize="10" fill="#666">60V</text>
        <line x1="58" y1="35" x2="90" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="90" y1="20" x2="90" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="105" y1="20" x2="105" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="97" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">10μF</text>
        <line x1="105" y1="35" x2="150" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="150" y1="20" x2="150" y2="50" stroke="#2563eb" strokeWidth="2" />
        <line x1="165" y1="20" x2="165" y2="50" stroke="#2563eb" strokeWidth="2" />
        <text x="157" y="62" textAnchor="middle" fontSize="10" fill="#2563eb">20μF</text>
        <line x1="165" y1="35" x2="260" y2="35" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="35" x2="260" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="260" y1="10" x2="20" y2="10" stroke="#333" strokeWidth="2" />
        <line x1="20" y1="10" x2="20" y2="35" stroke="#333" strokeWidth="2" />
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الدارة التالية، ما مقدار الشحنة على المواسع $C_2 = 4 \\mu F$؟',
        diagram: SeriesCircuit4,
        options: ['$48 \\mu C$', '$96 \\mu C$', '$192 \\mu C$', '$24 \\mu C$'],
        correctAnswerIndex: 1,
        explanation: 'أولاً نحسب المواسعة المكافئة: $\\frac{1}{C_{eq}} = \\frac{1}{8} + \\frac{1}{4} + \\frac{1}{8} = \\frac{1+2+1}{8} = \\frac{4}{8} = \\frac{1}{2}$\nإذاً $C_{eq} = 2 \\mu F$\nالشحنة الكلية: $Q = C_{eq} \\times V = 2 \\times 48 = 96 \\mu C$\nفي التوالي الشحنة ثابتة على جميع المواسعات، إذاً $Q_2 = 96 \\mu C$'
    },
    {
        questionText: 'في الدارة التالية (ثلاثة مواسعات على التوازي)، ما مقدار الشحنة على المواسع $C_3 = 6 \\mu F$؟',
        diagram: ParallelCircuit4,
        options: ['$72 \\mu C$', '$144 \\mu C$', '$216 \\mu C$', '$432 \\mu C$'],
        correctAnswerIndex: 2,
        explanation: 'في التوازي الجهد ثابت على جميع المواسعات = جهد المصدر = 36V\nالشحنة على $C_3$: $Q_3 = C_3 \\times V = 6 \\times 36 = 216 \\mu C$'
    },
    {
        questionText: 'في الدارة التالية (3μF و 6μF على التوالي، ثم المجموعة على التوازي مع 4μF)، احسب المواسعة المكافئة الكلية:',
        diagram: MixedCircuit2,
        options: ['$2 \\mu F$', '$4 \\mu F$', '$6 \\mu F$', '$13 \\mu F$'],
        correctAnswerIndex: 2,
        explanation: 'نحل من الداخل للخارج:\n1. المواسعان على التوالي: $C_{series} = \\frac{3 \\times 6}{3 + 6} = \\frac{18}{9} = 2 \\mu F$\n2. ثم $C_{series}$ موصول على التوازي مع $4 \\mu F$:\n$C_{eq} = 2 + 4 = 6 \\mu F$'
    },
    {
        questionText: 'مواسع مواسعته $50 \\mu F$ موصول ببطارية جهدها $100 V$ (كما في الشكل). ما مقدار الطاقة المخزنة في المواسع؟',
        diagram: EnergyCircuit,
        options: ['$0.25 J$', '$0.5 J$', '$2.5 J$', '$5 J$'],
        correctAnswerIndex: 0,
        explanation: 'الطاقة المخزنة: $PE = \\frac{1}{2}CV^2 = \\frac{1}{2} \\times 50 \\times 10^{-6} \\times (100)^2$\n$PE = \\frac{1}{2} \\times 50 \\times 10^{-6} \\times 10000 = \\frac{1}{2} \\times 0.5 = 0.25 J$'
    },
    {
        questionText: 'مواسعان موصولان على التوالي كما في الشكل. ما مقدار الجهد على المواسع $C_1 = 10 \\mu F$؟',
        diagram: SeriesVoltage,
        options: ['$20 V$', '$30 V$', '$40 V$', '$60 V$'],
        correctAnswerIndex: 2,
        explanation: 'أولاً نحسب المواسعة المكافئة: $C_{eq} = \\frac{10 \\times 20}{10 + 20} = \\frac{200}{30} = \\frac{20}{3} \\mu F$\nالشحنة الكلية (وهي نفسها على كل مواسع في التوالي): $Q = C_{eq} \\times V = \\frac{20}{3} \\times 60 = 400 \\mu C$\nالجهد على $C_1$: $V_1 = \\frac{Q}{C_1} = \\frac{400}{10} = 40 V$\n(ملاحظة: المواسع الأصغر يأخذ جهداً أكبر في التوالي)'
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
