
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

// رسم وصلة
const JunctionDiagram = () => (
    <svg viewBox="0 0 250 120" className="w-full h-28 bg-white rounded border">
        <circle cx="125" cy="60" r="6" fill="#3b82f6" />
        <line x1="20" y1="30" x2="119" y2="55" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrG)" />
        <text x="40" y="25" fontSize="10" fill="#16a34a">5A</text>
        <line x1="20" y1="90" x2="119" y2="65" stroke="#16a34a" strokeWidth="2" markerEnd="url(#arrG)" />
        <text x="40" y="105" fontSize="10" fill="#16a34a">3A</text>
        <line x1="131" y1="60" x2="230" y2="30" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="200" y="25" fontSize="10" fill="#dc2626">?</text>
        <line x1="131" y1="60" x2="230" y2="90" stroke="#dc2626" strokeWidth="2" markerEnd="url(#arrR)" />
        <text x="200" y="105" fontSize="10" fill="#dc2626">2A</text>
        <defs>
            <marker id="arrG" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#16a34a" /></marker>
            <marker id="arrR" markerWidth="8" markerHeight="8" refX="7" refY="3" orient="auto"><path d="M0,0 L0,6 L8,3 z" fill="#dc2626" /></marker>
        </defs>
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الوصلة المجاورة، ما قيمة التيار المجهول؟',
        options: ['$6 \\, A$', '$8 \\, A$', '$4 \\, A$', '$10 \\, A$'],
        correctAnswerIndex: 0,
        explanation: 'قاعدة الوصلة: مجموع الداخل = مجموع الخارج\n$5 + 3 = I + 2$\n$8 = I + 2$\n$I = 6 \\, A$',
        hasGraph: true,
        GraphComponent: JunctionDiagram
    },
    {
        questionText: 'قاعدة كيرتشوف الأولى تطبق مبدأ:',
        options: ['حفظ الطاقة', 'حفظ الشحنة', 'حفظ الزخم', 'حفظ الكتلة'],
        correctAnswerIndex: 1,
        explanation: 'قاعدة كيرتشوف الأولى (قاعدة الوصلة) تطبق مبدأ حفظ الشحنة الكهربائية.'
    },
    {
        questionText: 'ما اسم قاعدة كيرتشوف الأولى؟',
        options: ['قاعدة العروة', 'قاعدة الوصلة', 'قاعدة الجهد', 'قاعدة المقاومة'],
        correctAnswerIndex: 1,
        explanation: 'قاعدة كيرتشوف الأولى تسمى "قاعدة الوصلة" (Junction Rule) لأنها تُطبق عند نقاط التفرع.'
    },
    {
        questionText: 'متى نستخدم قاعدتي كيرتشوف بدلاً من قانون الدارة البسيطة؟',
        options: [
            'عندما تكون الدارة بسيطة',
            'عندما يتفرع التيار في البطارية',
            'عندما تكون المقاومة الداخلية صفراً',
            'عندما لا يوجد تفرع'
        ],
        correctAnswerIndex: 1,
        explanation: 'نستخدم قاعدتي كيرتشوف عندما يتفرع التيار في البطارية (دارة معقدة).\nفي هذه الحالة، ممنوع استخدام قانون الدارة البسيطة.'
    },
    {
        questionText: 'ثلاثة تيارات تدخل وصلة: $2A, 3A, 5A$. وتيار واحد يخرج قيمته $4A$. ما قيمة التيار الخارج الآخر؟',
        options: ['$4 \\, A$', '$6 \\, A$', '$10 \\, A$', '$14 \\, A$'],
        correctAnswerIndex: 1,
        explanation: 'الداخل = الخارج\n$2 + 3 + 5 = 4 + I$\n$10 = 4 + I$\n$I = 6 \\, A$'
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
