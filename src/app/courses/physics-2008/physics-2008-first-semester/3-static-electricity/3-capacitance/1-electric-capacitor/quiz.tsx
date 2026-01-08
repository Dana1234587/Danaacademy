
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
    // Conceptual Question 1
    {
        questionText: 'ما الذي يحدث للمواسعة الكهربائية لمواسع عند زيادة فرق الجهد المطبق عليه؟',
        options: ['تزداد', 'تنقص', 'تبقى ثابتة', 'تصبح صفراً'],
        correctAnswerIndex: 2,
        explanation: 'المواسعة الكهربائية خاصية ثابتة للمواسع تعتمد على شكله وأبعاده ونوع العازل فقط، ولا تتغير بتغير الشحنة أو فرق الجهد. عند زيادة فرق الجهد تزداد الشحنة المخزنة بنفس النسبة، فتبقى النسبة C = Q/V ثابتة.'
    },
    // Conceptual Question 2
    {
        questionText: 'متى تنتهي عملية شحن مواسع موصول ببطارية؟',
        options: ['عندما تصبح الشحنة على المواسع صفراً', 'عندما يصبح فرق الجهد بين لوحي المواسع مساوياً لجهد البطارية', 'عندما تصل المواسعة لقيمتها القصوى', 'لا تنتهي أبداً'],
        correctAnswerIndex: 1,
        explanation: 'تنتهي عملية الشحن عندما يصبح فرق الجهد بين لوحي المواسع مساوياً لفرق جهد البطارية. عند هذه اللحظة، لا يوجد فرق جهد يدفع الشحنات للانتقال، فيتوقف التيار الكهربائي.'
    },
    // Calculation Question 1
    {
        questionText: 'مواسع مواسعته $10 \\mu F$ موصول ببطارية جهدها $12 V$. ما مقدار الشحنة المخزنة عليه؟',
        options: ['$120 \\mu C$', '$1.2 \\mu C$', '$0.83 \\mu C$', '$12 \\mu C$'],
        correctAnswerIndex: 0,
        explanation: 'من قانون المواسعة: $C = \\frac{Q}{V}$ \n$Q = C \\times V = (10 \\times 10^{-6}) \\times 12 = 120 \\times 10^{-6} C = 120 \\mu C$'
    },
    // Calculation Question 2
    {
        questionText: 'مواسع يخزن شحنة $200 \\mu C$ عندما يكون فرق الجهد بين لوحيه $50 V$. ما مقدار مواسعته؟',
        options: ['$10000 \\mu F$', '$4 \\mu F$', '$0.25 \\mu F$', '$250 \\mu F$'],
        correctAnswerIndex: 1,
        explanation: 'من قانون المواسعة: \n$C = \\frac{Q}{V} = \\frac{200 \\times 10^{-6}}{50} = 4 \\times 10^{-6} F = 4 \\mu F$'
    },
    // Calculation Question 3
    {
        questionText: 'مواسع مواسعته $5 \\mu F$ موصول ببطارية جهدها $100 V$. ما مقدار الطاقة المخزنة فيه؟',
        options: ['$250 \\mu J$', '$25 mJ$', '$500 \\mu J$', '$50 mJ$'],
        correctAnswerIndex: 1,
        explanation: 'نستخدم قانون طاقة الوضع: \n$PE = \\frac{1}{2} C V^2 = \\frac{1}{2} \\times (5 \\times 10^{-6}) \\times (100)^2$ \n$= \\frac{1}{2} \\times 5 \\times 10^{-6} \\times 10000 = 0.025 J = 25 mJ$'
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
