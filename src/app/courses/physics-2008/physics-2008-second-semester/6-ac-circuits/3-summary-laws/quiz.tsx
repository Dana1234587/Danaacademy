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
        <Wrapper className="leading-relaxed text-right md:text-lg">
            {lines.map((line, lineIndex) => (
                <span key={lineIndex} className="block my-1">
                    {line.split('$').map(renderPart)}
                </span>
            ))}
        </Wrapper>
    );
};

const quizQuestions = [
    {
        id: 1,
        questionText: "العلاقة التي تربط القيمة العظمى بالجهد الفعال للتيار المتردد هي:",
        options: [
            "$V_{rms} = \\sqrt{2} V_{max}$",
            "$V_{max} = \\sqrt{2} V_{rms}$",
            "$V_{rms} = V_{max} \\div 2$",
            "$V_{rms} = 2 V_{max}$"
        ],
        correctAnswerIndex: 1,
        explanation: "العلاقة الأساسية هي $V_{rms} = \\frac{V_{max}}{\\sqrt{2}}$. بالضرب التبادلي ينتج أن $V_{max} = \\sqrt{2} V_{rms}$."
    },
    {
        id: 2,
        questionText: "في الدائرة التي تحتوي على مقاومة أومية فقط، إذا زادت القيمة الفعالة للجهد إلى الضعف مع بقاء المقاومة ثابتة، فإن القدرة المستهلكة:",
        options: [
            "تزداد إلى الضعف",
            "تقل إلى النصف",
            "تزداد إلى أربعة أمثالها",
            "تبقى ثابتة"
        ],
        correctAnswerIndex: 2,
        explanation: "القدرة $P = \\frac{V_{rms}^2}{R}$. بما أن الجهد الفعال زاد للضعف، والقدرة تتناسب طردياً مع مربعه، إذن تزداد القدرة $2^2 = 4$ مرات."
    },
    {
        id: 3,
        questionText: "أي المعادلات التالية تمثل الشكل العام لمعادلة التيار اللحظي؟",
        options: [
            "$i = I_{rms} \\sin(\\frac{2\\pi}{T} t)$",
            "$i = I_{max} \\sin(2\\pi f t)$",
            "$v = V_{max} \\cos(\\omega t)$",
            "$i = \\frac{I_{max}}{\\sqrt{2}} \\sin(\\omega t)$"
        ],
        correctAnswerIndex: 1,
        explanation: "المعادلة العامة هي $i = I_{max} \\sin(\\omega t)$. وبما أن $\\omega = 2\\pi f$، فتصاغ المعادلة أيضاً كـ $i = I_{max} \\sin(2\\pi f t)$."
    }
];

export default function QuizPage() {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [score, setScore] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleOptionSelect = (value: string) => {
        setSelectedAnswer(parseInt(value));
    };

    const handleSubmit = () => {
        if (selectedAnswer !== null) {
            setIsSubmitted(true);
            if (selectedAnswer === quizQuestions[currentQuestion].correctAnswerIndex) {
                setScore(score + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestion < quizQuestions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setIsSubmitted(false);
        } else {
            setShowResults(true);
        }
    };

    const resetQuiz = () => {
        setCurrentQuestion(0);
        setSelectedAnswer(null);
        setIsSubmitted(false);
        setScore(0);
        setShowResults(false);
    };

    if (showResults) {
        return (
            <div className="p-4 sm:p-8" dir="rtl">
                <Card className="max-w-2xl mx-auto shadow-md border-border/50 bg-card text-card-foreground">
                    <CardHeader className="text-center pb-2">
                        <CardTitle className="text-3xl font-bold text-primary mb-2">نتيجة الاختبار</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center pt-6">
                        <div className="w-32 h-32 rounded-full border-8 flex items-center justify-center mb-6 border-primary bg-primary/10">
                            <span className="text-4xl font-bold text-primary">{Math.round((score / quizQuestions.length) * 100)}%</span>
                        </div>
                        <p className="text-xl mb-4 text-center">
                            أجبت بشكل صحيح على <span className="font-bold text-primary">{score}</span> من أصل <span className="font-bold">{quizQuestions.length}</span> أسئلة.
                        </p>
                    </CardContent>
                    <CardFooter className="flex justify-center pb-8">
                        <Button size="lg" onClick={resetQuiz} className="px-8 font-semibold">إعادة الاختبار</Button>
                    </CardFooter>
                </Card>
            </div>
        );
    }

    const question = quizQuestions[currentQuestion];

    return (
        <div className="p-2 sm:p-4" dir="rtl">
            <div className="mb-4 flex justify-between items-center text-sm font-medium text-muted-foreground">
                <span>سؤال {currentQuestion + 1} من {quizQuestions.length}</span>
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full">علامتك: {score}</span>
            </div>

            <Card className="border-border/50 shadow-sm mt-4">
                <CardHeader className="bg-muted/30 pb-4 border-b">
                    <CardTitle className="text-xl font-medium leading-relaxed">
                        <SmartTextRenderer text={question.questionText} />
                    </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                    <RadioGroup
                        onValueChange={handleOptionSelect}
                        value={selectedAnswer?.toString() ?? ""}
                        className="space-y-3"
                    >
                        {question.options.map((option, index) => {
                            const isSelected = selectedAnswer === index;
                            const isCorrect = isSubmitted && index === question.correctAnswerIndex;
                            const isWrong = isSubmitted && isSelected && index !== question.correctAnswerIndex;

                            let optionClasses = "flex items-center space-x-3 space-x-reverse rounded-lg border p-4 transition-all duration-200 cursor-pointer ";
                            if (isSubmitted) {
                                if (isCorrect) optionClasses += "border-green-500 bg-green-50/50 dark:bg-green-950/20 shadow-sm";
                                else if (isWrong) optionClasses += "border-red-500 bg-red-50/50 dark:bg-red-950/20";
                                else optionClasses += "opacity-60 border-transparent bg-muted/20";
                            } else {
                                optionClasses += isSelected ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20" : "border-border hover:bg-muted/50 hover:border-border/80";
                            }

                            return (
                                <div key={index} className={optionClasses}>
                                    <RadioGroupItem
                                        value={index.toString()}
                                        id={`option-${index}`}
                                        disabled={isSubmitted}
                                        className={isSubmitted ? "opacity-70" : ""}
                                    />
                                    <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer text-md leading-relaxed pr-2">
                                        <SmartTextRenderer text={option} />
                                    </Label>
                                    {isSubmitted && isCorrect && <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 animate-in zoom-in" />}
                                    {isSubmitted && isWrong && <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 animate-in zoom-in" />}
                                </div>
                            );
                        })}
                    </RadioGroup>
                </CardContent>
                <CardFooter className="bg-muted/20 border-t flex flex-col items-stretch p-6 space-y-4">
                    {!isSubmitted ? (
                        <Button
                            onClick={handleSubmit}
                            disabled={selectedAnswer === null}
                            className="w-full text-lg h-12"
                        >
                            تأكيد الإجابة
                        </Button>
                    ) : (
                        <div className="w-full space-y-4 animate-in slide-in-from-bottom-2 fade-in duration-300">
                            <div className="bg-background border rounded-lg p-5 shadow-sm">
                                <h4 className="font-bold text-lg mb-2 text-primary flex items-center gap-2">
                                    <CheckCircle className="w-5 h-5" /> التفسير:
                                </h4>
                                <div className="text-muted-foreground text-md leading-relaxed pr-7">
                                    <SmartTextRenderer text={question.explanation} />
                                </div>
                            </div>
                            <Button onClick={handleNext} className="w-full text-lg h-12" variant="default">
                                {currentQuestion < quizQuestions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                            </Button>
                        </div>
                    )}
                </CardFooter>
            </Card>
        </div>
    );
}
