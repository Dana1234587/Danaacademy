
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
        questionText: 'بروتون كتلته $1.67 \\times 10^{-27}$ kg يتحرك بسرعة $2 \\times 10^6$ m/s عمودياً على مجال مغناطيسي شدته $0.5$ T. ما نصف قطر مساره الدائري؟',
        options: ['$4.18$ cm', '$2.09$ cm', '$8.36$ cm', '$1.04$ cm'],
        correctAnswerIndex: 0,
        explanation: 'نطبق قانون نصف قطر المسار: $r = \\frac{mv}{qB}$\n$r = \\frac{(1.67 \\times 10^{-27})(2 \\times 10^6)}{(1.6 \\times 10^{-19})(0.5)}$\n$r = \\frac{3.34 \\times 10^{-21}}{8 \\times 10^{-20}}$\n$r = 0.0418$ m $= 4.18$ cm'
    },
    {
        questionText: 'جسيم مشحون يتحرك في مسار دائري نصف قطره $0.1$ m في مجال مغناطيسي شدته $0.2$ T. إذا كانت سرعته $10^5$ m/s، ما الشحنة النوعية له؟',
        options: ['$5 \\times 10^6$ C/kg', '$2 \\times 10^6$ C/kg', '$5 \\times 10^7$ C/kg', '$10^7$ C/kg'],
        correctAnswerIndex: 0,
        explanation: 'من قانون الشحنة النوعية: $\\frac{q}{m} = \\frac{v}{rB}$\n$\\frac{q}{m} = \\frac{10^5}{(0.1)(0.2)}$\n$\\frac{q}{m} = \\frac{10^5}{0.02} = 5 \\times 10^6$ C/kg'
    },
    {
        questionText: 'إلكترون يتحرك في مسار دائري نصف قطره $r$ في مجال مغناطيسي $B$. إذا تضاعفت سرعته، ما نصف القطر الجديد؟',
        options: ['$r$', '$2r$', '$4r$', '$\\frac{r}{2}$'],
        correctAnswerIndex: 1,
        explanation: 'من العلاقة $r = \\frac{mv}{qB}$، نلاحظ أن $r \\propto v$.\nإذا تضاعفت السرعة ($v \\rightarrow 2v$)، يتضاعف نصف القطر ($r \\rightarrow 2r$).'
    },
    {
        questionText: 'القوة المغناطيسية تعتبر قوة مركزية لأنها:',
        options: ['تبذل شغلاً على الجسيم', 'موازية لاتجاه الحركة', 'عمودية دائماً على السرعة', 'تغير مقدار السرعة'],
        correctAnswerIndex: 2,
        explanation: 'القوة المغناطيسية عمودية دائماً على السرعة (واتجاه الحركة)، مما يجعلها تغير اتجاه السرعة فقط دون تغيير مقدارها. لذلك تسلك الشحنة مساراً دائرياً وتكون القوة متجهة نحو المركز (قوة مركزية).'
    },
    {
        questionText: 'أي من العبارات التالية صحيحة عند مقارنة القوة الكهربائية بالقوة المغناطيسية؟',
        options: ['كلاهما يؤثران على الشحنات الساكنة', 'القوة الكهربائية عمودية على المجال الكهربائي', 'القوة المغناطيسية تبذل شغلاً على الشحنات', 'القوة الكهربائية تؤثر على الشحنات الساكنة والمتحركة'],
        correctAnswerIndex: 3,
        explanation: 'القوة الكهربائية ($F_E = qE$) تؤثر على الشحنات سواء كانت ساكنة أو متحركة، بينما القوة المغناطيسية تؤثر فقط على الشحنات المتحركة. القوة الكهربائية موازية للمجال الكهربائي وتبذل شغلاً، بينما القوة المغناطيسية عمودية على المجال ولا تبذل شغلاً.'
    },
];

export default function ChargedParticleMotionQuizPage() {
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
