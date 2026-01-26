
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
        questionText: 'إلكترون يتحرك بسرعة $3 \\times 10^6$ m/s عمودياً على مجال مغناطيسي شدته $0.5$ T. ما مقدار القوة المؤثرة عليه؟ (شحنة الإلكترون $= 1.6 \\times 10^{-19}$ C)',
        options: ['$2.4 \\times 10^{-13}$ N', '$4.8 \\times 10^{-13}$ N', '$2.4 \\times 10^{-12}$ N', '$1.5 \\times 10^{-13}$ N'],
        correctAnswerIndex: 0,
        explanation: 'نطبق قانون لورنتز: $F = qvB\\sin(\\theta)$\nبما أن الحركة عمودية على المجال: $\\theta = 90°$ و $\\sin(90°) = 1$\n$F = (1.6 \\times 10^{-19})(3 \\times 10^6)(0.5)(1)$\n$F = 2.4 \\times 10^{-13}$ N'
    },
    {
        questionText: 'بروتون يتحرك بسرعة $4 \\times 10^5$ m/s بزاوية $30°$ مع مجال مغناطيسي شدته $0.8$ T. ما القوة المؤثرة عليه؟',
        options: ['$2.56 \\times 10^{-14}$ N', '$5.12 \\times 10^{-14}$ N', '$1.28 \\times 10^{-14}$ N', '$3.84 \\times 10^{-14}$ N'],
        correctAnswerIndex: 0,
        explanation: 'نطبق القانون: $F = qvB\\sin(\\theta)$\n$F = (1.6 \\times 10^{-19})(4 \\times 10^5)(0.8)(\\sin 30°)$\n$F = (1.6 \\times 10^{-19})(4 \\times 10^5)(0.8)(0.5)$\n$F = 2.56 \\times 10^{-14}$ N'
    },
    {
        questionText: 'ما مقدار المجال المغناطيسي الذي يؤثر بقوة $8 \\times 10^{-14}$ N على شحنة $2 \\times 10^{-19}$ C تتحرك بسرعة $10^6$ m/s عمودياً على المجال؟',
        options: ['$0.2$ T', '$0.4$ T', '$0.5$ T', '$0.8$ T'],
        correctAnswerIndex: 1,
        explanation: 'من قانون لورنتز: $F = qvB\\sin(90°) = qvB$\n$B = \\frac{F}{qv} = \\frac{8 \\times 10^{-14}}{(2 \\times 10^{-19})(10^6)}$\n$B = \\frac{8 \\times 10^{-14}}{2 \\times 10^{-13}} = 0.4$ T'
    },
    {
        questionText: 'أي من الجسيمات التالية لا يتأثر بقوة مغناطيسية عند مروره في مجال مغناطيسي؟',
        options: ['البروتون', 'الإلكترون', 'جسيم ألفا', 'النيوترون'],
        correctAnswerIndex: 3,
        explanation: 'النيوترون جسيم متعادل كهربائياً (q = 0)، لذلك لا يتأثر بأي قوة مغناطيسية بغض النظر عن سرعته أو اتجاه حركته. القوة المغناطيسية تؤثر فقط على الجسيمات المشحونة.'
    },
    {
        questionText: 'لماذا لا تبذل القوة المغناطيسية شغلاً على الشحنة المتحركة؟',
        options: ['لأن القوة صغيرة جداً', 'لأن القوة عمودية دائماً على الإزاحة', 'لأن الشحنة ثابتة', 'لأن المجال متغير'],
        correctAnswerIndex: 1,
        explanation: 'الشغل يُعطى بالعلاقة $W = F \\cdot d \\cdot \\cos(\\angle)$. بما أن القوة المغناطيسية دائماً عمودية على السرعة (أي على اتجاه الحركة)، فإن الزاوية بينهما = 90° و $\\cos(90°) = 0$. لذلك الشغل = صفر، وهذا يعني أن مقدار السرعة لا يتغير (الطاقة الحركية ثابتة)، لكن اتجاهها يتغير.'
    },
];

export default function ForceOnMovingChargeQuizPage() {
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
