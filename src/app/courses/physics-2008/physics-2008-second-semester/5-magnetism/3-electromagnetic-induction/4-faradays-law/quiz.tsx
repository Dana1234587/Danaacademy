
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CheckCircle, XCircle } from 'lucide-react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: any }) => {
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
            id: 1,
            questionText: "ملف يتكون من 100 لفة يخترقه تدفق مغناطيسي مقداره $0.2 \\text{ Wb}$. إذا انعكس اتجاه المجال المغناطيسي المؤثر عليه خلال $0.1 \\text{ s}$، ما مقدار القوة الدافعة الكهربائية الحثية المتولدة فيه؟",
            options: [
                "$0 \\text{ V}$",
                "$200 \\text{ V}$",
                "$400 \\text{ V}$",
                "$-200 \\text{ V}$"
            ],
            correctAnswerIndex: 2,
            explanation: "بما أن اتجاه المجال قد انقلب (انعكس)، فإن $\\Delta \\Phi = -2 \\Phi_i = -2(0.2) = -0.4 \\text{ Wb}$. بتطبيق قانون فاراداي: $\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t} = -100 \\times \\frac{-0.4}{0.1} = 400 \\text{ V}$."
        },
        {
            id: 2,
            questionText: "ملف مساحته $A$ وعرضة لمجال مغناطيسي $B$ عمودي على مستواه. إذا تم سحب الملف بالكامل وإخراجه من المجال خلال زمن $\\Delta t$، فإن القوة الدافعة החثية المتولدة في لفة واحدة فيه تساوي:",
            options: [
                "$0$",
                "$\\frac{BA}{\\Delta t}$",
                "$\\frac{-BA}{\\Delta t}$",
                "$\\frac{B}{\\Delta t}$"
            ],
            correctAnswerIndex: 1,
            explanation: "التدفق الابتدائي $\\Phi_i = BA \\cos(0) = BA$. بعد سحب الملف ينعدم المجال وبالتالي ينعدم التدفق النهائي، أي $\\Phi_f = 0$. التغير في التدفق $\\Delta \\Phi = 0 - BA = -BA$. القوة الدافعة לلفة واحدة ($N=1$): $\\varepsilon = - (1) \\frac{-BA}{\\Delta t} = \\frac{BA}{\\Delta t}$."
        },
        {
            id: 3,
            questionText: "ما وحدة قياس \"المعدل الزمني للتغير في التدفق المغناطيسي\" والتي تقيس مقدار التغير كل ثانية؟",
            options: [
                "فولت (V)",
                "تسلا (T)",
                "يبر (Wb)",
                "يبر لكل ثانية (Wb/s) وتكافئ فولت (V)"
            ],
            correctAnswerIndex: 3,
            explanation: "المعدل الزمني هو مقدار $\\frac{\\Delta \\Phi}{\\Delta t}$، ووحدته هي ويبر للتدفق على ثانية للزمن ($Wb/s$). وحسب قانون فاراداي $\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t}$ فإن وحدة الفولت تكافئ وحدة (يبر/ثانية)."
        },
        {
            id: 4,
            questionText: "ملف عدد لفاته 50 لفة، يتغير التدفق الذي يخترقه من $0.5 \\text{ Wb}$ إلى $0.1 \\text{ Wb}$ خلال $0.2 \\text{ s}$. مقدار التيار الحثي المتولد فيه علماً بأن مقاومة الملف الكلية 10 أوم يساوي:",
            options: [
                "$1 \\text{ A}$",
                "$5 \\text{ A}$",
                "$10 \\text{ A}$",
                "$100 \\text{ A}$"
            ],
            correctAnswerIndex: 2,
            explanation: "أولاً نحسب $\\Delta \\Phi = 0.1 - 0.5 = -0.4 \\text{ Wb}$. القوة الدافعة الحثية $\\varepsilon = -50 \\times \\frac{-0.4}{0.2} = -50 \\times (-2) = 100 \\text{ V}$. وبحسب قانون دوائر بسيطة، التيار החثي $I = \\frac{\\varepsilon}{R} = \\frac{100}{10} = 10 \\text{ A}$."
        },
        {
            id: 5,
            questionText: "متى تكون القوة الدافعة الكهربائية الحثية سالبة الإشارة (بناءً على قانون فاراداي)؟",
            options: [
                "عندما يزداد التدفق المغناطيسي الذي يخترق الملف.",
                "عندما يقل التدفق المغناطيسي الذي يخترق الملف.",
                "عندما ينعكس اتجاه المجال المغناطيسي بالكامل.",
                "جميع الحالات السابقة تعطي قوة دافعة سالبة."
            ],
            correctAnswerIndex: 0,
            explanation: "حسب القاعدة: $\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t}$. إذا زاد التدفق، فإن $\\Delta \\Phi$ (النهائي - الابتدائي) يكون موجباً. وحاصل ضرب الموجب في الإشارة السالبة للقانون يعطي $\\varepsilon$ سالبة الإشارة لمعاكسة هذه الزيادة (قانون لنز)."
        }
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
