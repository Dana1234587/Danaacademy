
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

// رسم دارة معقدة
const ComplexCircuit = () => (
    <svg viewBox="0 0 280 140" className="w-full h-32 bg-white rounded border">
        {/* الحلقة اليسرى */}
        <rect x="20" y="20" width="100" height="100" fill="none" stroke="#333" strokeWidth="2" />
        {/* بطارية يسرى */}
        <line x1="70" y1="20" x2="70" y2="8" stroke="#333" strokeWidth="3" />
        <line x1="70" y1="8" x2="70" y2="6" stroke="none" />
        <text x="70" y="12" textAnchor="middle" fontSize="8" fill="#16a34a">ε₁=10V</text>
        {/* مقاومة علوية يسرى */}
        <rect x="25" y="75" width="8" height="30" fill="none" stroke="#2563eb" strokeWidth="1.5" transform="rotate(-90 29 90)" />
        <text x="20" y="60" fontSize="7" fill="#2563eb">R₁</text>

        {/* الحلقة اليمنى */}
        <rect x="120" y="20" width="100" height="100" fill="none" stroke="#333" strokeWidth="2" />
        {/* بطارية يمنى */}
        <line x1="170" y1="20" x2="170" y2="8" stroke="#333" strokeWidth="2" />
        <text x="170" y="12" textAnchor="middle" fontSize="8" fill="#16a34a">ε₂=6V</text>

        {/* المقاومة المشتركة */}
        <rect x="112" y="55" width="16" height="30" fill="none" stroke="#dc2626" strokeWidth="2" />
        <text x="120" y="100" textAnchor="middle" fontSize="7" fill="#dc2626">R₃</text>

        {/* تيارات */}
        <text x="55" y="70" fontSize="8" fill="#8b5cf6">I₁</text>
        <text x="180" y="70" fontSize="8" fill="#8b5cf6">I₂</text>
        <text x="130" y="70" fontSize="8" fill="#8b5cf6">I₃</text>
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الدارة المجاورة، إذا علمت أن $I_1 = 2A$ و $I_2 = 1A$، فما قيمة $I_3$؟',
        options: ['$3 \\, A$', '$1 \\, A$', '$2 \\, A$', '$0.5 \\, A$'],
        correctAnswerIndex: 0,
        explanation: 'قاعدة الوصلة عند تقاطع التيارات:\n$I_1 + I_2 = I_3$\n$2 + 1 = 3 \\, A$',
        hasGraph: true,
        GraphComponent: ComplexCircuit
    },
    {
        questionText: 'ما الذي يميز الدارة المعقدة عن البسيطة؟',
        options: [
            'وجود أكثر من مقاومة',
            'تفرع التيار في البطارية',
            'وجود أكثر من بطارية',
            'وجود مقاومة داخلية'
        ],
        correctAnswerIndex: 1,
        explanation: 'الدارة المعقدة: يتفرع التيار داخل البطارية.\nالدارة البسيطة: التيار لا يتفرع في البطارية.'
    },
    {
        questionText: 'كم معادلة نحتاج لحل دارة بها 3 تيارات مجهولة؟',
        options: ['معادلة واحدة', 'معادلتين', '3 معادلات', '4 معادلات'],
        correctAnswerIndex: 2,
        explanation: 'نحتاج عدد معادلات مساوٍ لعدد المجاهيل.\n3 تيارات مجهولة = 3 معادلات (وصلة + عروتين)'
    },
    {
        questionText: 'عند تطبيق قاعدة العروة، إذا حصلنا على قيمة سالبة للتيار فهذا يعني:',
        options: [
            'خطأ في الحل',
            'اتجاه التيار الحقيقي عكس الاتجاه المفترض',
            'لا يوجد تيار',
            'المقاومة سالبة'
        ],
        correctAnswerIndex: 1,
        explanation: 'القيمة السالبة تعني أن اتجاه التيار الحقيقي معاكس للاتجاه الذي افترضناه في البداية.'
    },
    {
        questionText: 'في دارة معقدة بها حلقتان، نستخدم:',
        options: [
            'قاعدة العروة فقط',
            'قاعدة الوصلة فقط',
            'قاعدة الوصلة + قاعدة العروة',
            'قانون الدارة البسيطة'
        ],
        correctAnswerIndex: 2,
        explanation: 'في الدارات المعقدة نستخدم قاعدتي كيرتشوف معاً:\n- قاعدة الوصلة للتيارات عند نقط التفرع\n- قاعدة العروة للجهد حول الحلقات'
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

    const handleSubmit = () => setIsSubmitted(true);
    const calculateScore = () => selectedAnswers.filter((answer, index) => answer === quizQuestions[index].correctAnswerIndex).length;

    return (
        <div className="p-4 bg-muted/40">
            <div className="max-w-4xl mx-auto">
                <div className="space-y-8">
                    {quizQuestions.map((q, qIndex) => (
                        <Card key={qIndex} className={`border-2 ${isSubmitted ? (selectedAnswers[qIndex] === q.correctAnswerIndex ? 'border-green-500' : 'border-red-500') : 'border-border'}`}>
                            <CardHeader>
                                <CardTitle><SmartTextRenderer as="div" text={`السؤال ${qIndex + 1}: ${q.questionText}`} /></CardTitle>
                                {q.hasGraph && q.GraphComponent && <div className="mt-3"><q.GraphComponent /></div>}
                            </CardHeader>
                            <CardContent>
                                <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {q.options.map((option, oIndex) => (
                                        <Label key={oIndex} htmlFor={`q${qIndex}-o${oIndex}`} className={`p-4 rounded-lg border-2 flex items-center gap-4 cursor-pointer ${selectedAnswers[qIndex] === oIndex ? 'bg-primary/10 border-primary' : 'bg-background'}`}>
                                            <RadioGroupItem value={oIndex.toString()} id={`q${qIndex}-o${oIndex}`} disabled={isSubmitted} />
                                            <SmartTextRenderer as="span" text={option} />
                                            {isSubmitted && selectedAnswers[qIndex] === oIndex && selectedAnswers[qIndex] !== q.correctAnswerIndex && <XCircle className="w-5 h-5 text-red-500 ms-auto" />}
                                            {isSubmitted && oIndex === q.correctAnswerIndex && <CheckCircle className="w-5 h-5 text-green-500 ms-auto" />}
                                        </Label>
                                    ))}
                                </RadioGroup>
                            </CardContent>
                            {isSubmitted && (
                                <CardFooter className="flex flex-col items-start bg-muted/50 p-4">
                                    <p className="font-bold">الشرح:</p>
                                    <SmartTextRenderer as="p" text={q.explanation} />
                                </CardFooter>
                            )}
                        </Card>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    {!isSubmitted ? (
                        <Button onClick={handleSubmit} size="lg" className="w-full max-w-xs">إظهار النتائج</Button>
                    ) : (
                        <Card className="max-w-sm mx-auto p-6">
                            <CardTitle className="text-2xl mb-4">نتيجتك</CardTitle>
                            <p className="text-3xl font-bold text-primary">{calculateScore()} / {quizQuestions.length}</p>
                            <Button onClick={() => { setIsSubmitted(false); setSelectedAnswers(new Array(quizQuestions.length).fill(null)); }} variant="outline" className="mt-6">إعادة</Button>
                        </Card>
                    )}
                </div>
            </div>
        </div>
    );
}
