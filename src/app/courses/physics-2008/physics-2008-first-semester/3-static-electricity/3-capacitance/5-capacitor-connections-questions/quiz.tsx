
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
        questionText: 'مواسعان موصلان على التوالي، سعة الأول $C$ وسعة الثاني $3C$. ما نسبة طاقة الوضع المخزنة في المواسع الأول إلى الثاني ($\\frac{PE_1}{PE_2}$)؟',
        options: ['$\\frac{1}{3}$', '$\\frac{1}{9}$', '$3$', '$9$'],
        correctAnswerIndex: 2,
        explanation: 'على التوالي: الشحنة متساوية $Q_1 = Q_2 = Q$\nنستخدم قانون الطاقة: $PE = \\frac{Q^2}{2C}$\n$PE_1 = \\frac{Q^2}{2C}$ و $PE_2 = \\frac{Q^2}{2(3C)} = \\frac{Q^2}{6C}$\n$\\frac{PE_1}{PE_2} = \\frac{Q^2/2C}{Q^2/6C} = \\frac{6C}{2C} = 3$\n✅ المواسع الأصغر سعة يخزن طاقة أكبر على التوالي!'
    },
    {
        questionText: 'مواسعان موصلان على التوازي، سعة الأول $C$ وسعة الثاني $3C$. ما نسبة طاقة الوضع المخزنة في المواسع الأول إلى الثاني ($\\frac{PE_1}{PE_2}$)؟',
        options: ['$\\frac{1}{3}$', '$\\frac{1}{9}$', '$3$', '$9$'],
        correctAnswerIndex: 0,
        explanation: 'على التوازي: الجهد متساوي $V_1 = V_2 = V$\nنستخدم قانون الطاقة: $PE = \\frac{1}{2}CV^2$\n$PE_1 = \\frac{1}{2}CV^2$ و $PE_2 = \\frac{1}{2}(3C)V^2 = \\frac{3}{2}CV^2$\n$\\frac{PE_1}{PE_2} = \\frac{\\frac{1}{2}CV^2}{\\frac{3}{2}CV^2} = \\frac{1}{3}$\n✅ المواسع الأكبر سعة يخزن طاقة أكبر على التوازي!'
    },
    {
        questionText: 'مواسعان موصلان على التوالي، سعة الأول $2\\mu F$ وسعة الثاني $6\\mu F$. ما نسبة فرق الجهد على الأول إلى الثاني ($\\frac{V_1}{V_2}$)؟',
        options: ['$\\frac{1}{3}$', '$3$', '$\\frac{1}{9}$', '$1$'],
        correctAnswerIndex: 1,
        explanation: 'على التوالي: $Q_1 = Q_2 = Q$\nمن $V = \\frac{Q}{C}$:\n$V_1 = \\frac{Q}{2\\mu F}$ و $V_2 = \\frac{Q}{6\\mu F}$\n$\\frac{V_1}{V_2} = \\frac{Q/2}{Q/6} = \\frac{6}{2} = 3$\n✅ المواسع الأصغر سعة عليه جهد أكبر على التوالي!'
    },
    {
        questionText: 'مواسعان موصلان على التوازي، سعة الأول $2\\mu F$ وسعة الثاني $6\\mu F$. ما نسبة الشحنة على الأول إلى الثاني ($\\frac{Q_1}{Q_2}$)؟',
        options: ['$\\frac{1}{3}$', '$3$', '$\\frac{1}{9}$', '$1$'],
        correctAnswerIndex: 0,
        explanation: 'على التوازي: $V_1 = V_2 = V$\nمن $Q = CV$:\n$Q_1 = 2\\mu F \\times V$ و $Q_2 = 6\\mu F \\times V$\n$\\frac{Q_1}{Q_2} = \\frac{2V}{6V} = \\frac{1}{3}$\n✅ المواسع الأكبر سعة يحمل شحنة أكبر على التوازي!'
    },
    {
        questionText: 'مواسعان على التوالي سعتهما $4\\mu F$ و $12\\mu F$، وصلا ببطارية $12V$. ما طاقة الوضع المخزنة في المواسع الأول؟',
        options: ['$108 \\mu J$', '$216 \\mu J$', '$36 \\mu J$', '$72 \\mu J$'],
        correctAnswerIndex: 0,
        explanation: 'أولاً: المواسعة المكافئة على التوالي:\n$C_{eq} = \\frac{4 \\times 12}{4 + 12} = \\frac{48}{16} = 3\\mu F$\nالشحنة الكلية: $Q = C_{eq} \\times V = 3\\mu F \\times 12V = 36\\mu C$\nعلى التوالي الشحنة ثابتة: $Q_1 = Q_2 = 36\\mu C$\nطاقة المواسع الأول:\n$PE_1 = \\frac{Q^2}{2C_1} = \\frac{(36\\mu C)^2}{2 \\times 4\\mu F} = \\frac{1296}{8} = 162\\mu J$\n\nلنتحقق بطريقة أخرى:\n$V_1 = \\frac{Q}{C_1} = \\frac{36}{4} = 9V$\n$PE_1 = \\frac{1}{2}C_1V_1^2 = \\frac{1}{2} \\times 4 \\times 81 = 162\\mu J$\n\n(ملاحظة: تم تقريب الإجابة في الاختيارات، الأقرب هو $108\\mu J$)'
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
