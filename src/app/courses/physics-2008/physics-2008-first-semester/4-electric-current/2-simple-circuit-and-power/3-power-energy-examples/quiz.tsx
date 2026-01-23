
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
        questionText: 'ما تعريف القدرة الكهربائية؟',
        options: [
            'الشغل المبذول في وحدة الزمن',
            'الشحنة المنقولة في وحدة الزمن',
            'الطاقة المخزنة في المقاومة',
            'التيار المار في وحدة المقاومة'
        ],
        correctAnswerIndex: 0,
        explanation: 'القدرة الكهربائية هي الشغل المبذول في وحدة الزمن: $P = \\frac{W}{t}$'
    },
    {
        questionText: 'ما وحدة القدرة الكهربائية؟ وما تعريفها؟',
        options: [
            'Joule - طاقة مبذولة',
            'Watt - جول لكل ثانية',
            'Ampere - كولوم لكل ثانية',
            'Volt - جول لكل كولوم'
        ],
        correctAnswerIndex: 1,
        explanation: 'وحدة القدرة هي الواط (Watt)، وتُعرَّف بأنها جول واحد لكل ثانية: $1 \\, W = 1 \\, J/s$'
    },
    {
        questionText: 'أي من التالي ليس قانوناً صحيحاً للقدرة المستهلكة في مقاومة؟',
        options: [
            '$P = I \\cdot V$',
            '$P = I^2 \\cdot R$',
            '$P = V^2 \\cdot R$',
            '$P = \\frac{V^2}{R}$'
        ],
        correctAnswerIndex: 2,
        explanation: 'القوانين الصحيحة للقدرة هي:\n$P = IV$\n$P = I^2R$\n$P = \\frac{V^2}{R}$\nالخيار $P = V^2 \\cdot R$ خاطئ، الصحيح هو $P = \\frac{V^2}{R}$'
    },
    {
        questionText: 'مصباح قدرته $100W$ يعمل لمدة ساعتين. ما الطاقة المستهلكة بوحدة $kWh$؟',
        options: ['$0.2 \\, kWh$', '$200 \\, kWh$', '$2 \\, kWh$', '$0.02 \\, kWh$'],
        correctAnswerIndex: 0,
        explanation: 'نحول القدرة: $100W = 0.1 \\, kW$\nالطاقة: $E = P \\times t = 0.1 \\times 2 = 0.2 \\, kWh$'
    },
    {
        questionText: 'لحساب الطاقة بالجول، يجب أن تكون القدرة بوحدة:',
        options: ['kW والزمن بالساعات', 'W والزمن بالثواني', 'W والزمن بالساعات', 'kW والزمن بالثواني'],
        correctAnswerIndex: 1,
        explanation: 'للحصول على الطاقة بالجول (J):\n- القدرة يجب أن تكون بالواط (W)\n- الزمن يجب أن يكون بالثواني (s)\n$E(J) = P(W) \\times t(s)$'
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
                                <RadioGroup onValueChange={(value) => handleAnswerChange(qIndex, parseInt(value))} value={selectedAnswers[qIndex]?.toString()} className="grid grid-cols-1 gap-4">
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
