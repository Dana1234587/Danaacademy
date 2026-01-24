
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
        questionText: 'قاعدة كيرتشوف الثانية تطبق مبدأ:',
        options: ['حفظ الشحنة', 'حفظ الطاقة', 'حفظ الزخم', 'حفظ الكتلة'],
        correctAnswerIndex: 1,
        explanation: 'قاعدة كيرتشوف الثانية (قاعدة العروة) تطبق مبدأ حفظ الطاقة.'
    },
    {
        questionText: 'ما اسم قاعدة كيرتشوف الثانية؟',
        options: ['قاعدة الوصلة', 'قاعدة العروة', 'قاعدة التيار', 'قاعدة المقاومة'],
        correctAnswerIndex: 1,
        explanation: 'قاعدة كيرتشوف الثانية تسمى "قاعدة العروة" (Loop Rule).'
    },
    {
        questionText: 'عند المرور بمقاومة $R$ مع اتجاه التيار $I$، تغير الجهد يكون:',
        options: ['$+IR$', '$-IR$', '$+\\varepsilon$', '$-\\varepsilon$'],
        correctAnswerIndex: 1,
        explanation: 'عند المرور بمقاومة مع اتجاه التيار، يحدث هبوط في الجهد:\n$\\Delta V = -IR$'
    },
    {
        questionText: 'عند المرور ببطارية من القطب السالب إلى الموجب، تغير الجهد يكون:',
        options: ['$-\\varepsilon$', '$+\\varepsilon$', '$-IR$', '$+IR$'],
        correctAnswerIndex: 1,
        explanation: 'عند المرور ببطارية من - إلى +، يحدث ارتفاع في الجهد:\n$\\Delta V = +\\varepsilon$'
    },
    {
        questionText: 'في مسار من A إلى B نمر ببطارية ($\\varepsilon = 12V$, من - إلى +) ثم مقاومة ($IR = 5V$, مع التيار). ما قيمة $V_{AB}$؟',
        options: ['$17 \\, V$', '$7 \\, V$', '$-7 \\, V$', '$-17 \\, V$'],
        correctAnswerIndex: 1,
        explanation: '$V_{AB} = +\\varepsilon - IR = 12 - 5 = 7 \\, V$'
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
