
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
        questionText: 'تمر شحنة مقدارها $6 C$ عبر مقطع موصل خلال $3 s$. ما شدة التيار الكهربائي؟',
        options: ['$18 A$', '$2 A$', '$0.5 A$', '$9 A$'],
        correctAnswerIndex: 1,
        explanation: 'من قانون التيار: $I = \\frac{Q}{t} = \\frac{6}{3} = 2 A$'
    },
    {
        questionText: 'تيار كهربائي شدته $5 A$ يمر في موصل لمدة $10 s$. ما مقدار الشحنة المتدفقة بالميكروكولوم ($\\mu C$)؟',
        options: ['$50 \\mu C$', '$50,000 \\mu C$', '$50,000,000 \\mu C$', '$0.5 \\mu C$'],
        correctAnswerIndex: 2,
        explanation: 'من قانون التيار: $Q = I \\times t = 5 \\times 10 = 50 C$\nللتحويل إلى ميكروكولوم: $50 C = 50 \\times 10^{6} \\mu C = 50,000,000 \\mu C$'
    },
    {
        questionText: 'إذا مرت شحنة مقدارها $0.005 C$ خلال $2 s$، ما شدة التيار بالميلي أمبير ($mA$)؟',
        options: ['$0.0025 mA$', '$2.5 mA$', '$25 mA$', '$250 mA$'],
        correctAnswerIndex: 1,
        explanation: 'من قانون التيار: $I = \\frac{Q}{t} = \\frac{0.005}{2} = 0.0025 A$\nللتحويل إلى ميلي أمبير: $0.0025 A = 0.0025 \\times 10^{3} mA = 2.5 mA$'
    },
    {
        questionText: 'ما اتجاه التيار الاصطلاحي في الدارة الكهربائية (خارج البطارية)؟',
        options: [
            'من القطب السالب إلى القطب الموجب',
            'من القطب الموجب إلى القطب السالب',
            'عشوائي ويتغير مع الزمن',
            'لا يوجد له اتجاه محدد'
        ],
        correctAnswerIndex: 1,
        explanation: 'التيار الاصطلاحي يسير من القطب الموجب (+) إلى القطب السالب (−) خارج البطارية (في السلك الخارجي).\nهذا عكس اتجاه حركة الإلكترونات الفعلية.'
    },
    {
        questionText: 'إذا كان التيار المتوسط (DC) ثابتاً ومقداره $3 A$، وزاد الزمن من $5 s$ إلى $10 s$، فإن:',
        options: [
            'الشحنة تبقى ثابتة',
            'الشحنة تتضاعف والتيار يتضاعف',
            'الشحنة تتضاعف والتيار يبقى ثابتاً',
            'التيار يتناقص للنصف'
        ],
        correctAnswerIndex: 2,
        explanation: 'التيار المتوسط (DC) ثابت بالمقدار والاتجاه.\nمن $Q = I \\times t$:\n- عند $t = 5s$: $Q = 3 \\times 5 = 15 C$\n- عند $t = 10s$: $Q = 3 \\times 10 = 30 C$\nالشحنة تضاعفت، لكن التيار بقي ثابتاً = $3 A$'
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
