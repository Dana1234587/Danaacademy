
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
        questionText: 'سلك مقاومته $R$. إذا تضاعف طوله وتنصفت مساحة مقطعه، فإن مقاومته الجديدة تساوي:',
        options: ['$R$', '$2R$', '$4R$', '$\\frac{R}{2}$'],
        correctAnswerIndex: 2,
        explanation: 'من قانون $R = \\rho \\frac{L}{A}$:\n$R_{new} = \\rho \\frac{2L}{A/2} = \\rho \\frac{2L \\times 2}{A} = 4 \\times \\rho \\frac{L}{A} = 4R$'
    },
    {
        questionText: 'سلك مقاومته $R$. إذا تضاعف نصف قطره مع بقاء طوله ثابتاً، فإن مقاومته الجديدة تساوي:',
        options: ['$2R$', '$4R$', '$\\frac{R}{2}$', '$\\frac{R}{4}$'],
        correctAnswerIndex: 3,
        explanation: 'مساحة الدائرة $A = \\pi r^2$\nإذا $r \\to 2r$، فإن $A \\to \\pi(2r)^2 = 4\\pi r^2 = 4A$\nمن $R = \\rho \\frac{L}{A}$:\n$R_{new} = \\rho \\frac{L}{4A} = \\frac{1}{4} \\times \\rho \\frac{L}{A} = \\frac{R}{4}$'
    },
    {
        questionText: 'سلكان (أ) و (ب) من نفس المادة وعند نفس درجة الحرارة. السلك (أ) طوله ضعف طول السلك (ب) ومساحة مقطعه نصف مساحة مقطع (ب). نسبة مقاومة (أ) إلى مقاومة (ب) تساوي:',
        options: ['$1:1$', '$2:1$', '$4:1$', '$1:4$'],
        correctAnswerIndex: 2,
        explanation: 'بما أنهما من نفس المادة ونفس الحرارة: $\\rho_a = \\rho_b = \\rho$\n$R_a = \\rho \\frac{2L_b}{A_b/2} = \\rho \\frac{4L_b}{A_b}$\n$R_b = \\rho \\frac{L_b}{A_b}$\n$\\frac{R_a}{R_b} = \\frac{4L_b/A_b}{L_b/A_b} = 4:1$'
    },
    {
        questionText: 'سلكان من نفس المادة (نحاس) وعند نفس درجة الحرارة، لكن أبعادهما مختلفة. أي العبارات التالية صحيحة؟',
        options: [
            'مقاومتيهما متساويتان',
            'مقاوميتيهما متساويتان',
            'مقاومتيهما ومقاوميتيهما متساويتان',
            'لا علاقة بينهما'
        ],
        correctAnswerIndex: 1,
        explanation: 'المقاومية (ρ) تعتمد فقط على نوع المادة ودرجة الحرارة.\nبما أنهما من نفس المادة (نحاس) ونفس الحرارة ← مقاوميتيهما متساويتان.\nلكن المقاومة (R) تعتمد أيضاً على الأبعاد، وبما أن أبعادهما مختلفة ← مقاومتيهما ليست بالضرورة متساويتين.'
    },
    {
        questionText: 'سلك مقاومته $R$ ومقاوميته $\\rho$. إذا قُطع السلك إلى نصفين متساويين، فإن مقاومية كل جزء ومقاومته تساوي:',
        options: [
            'المقاومية $\\rho$ والمقاومة $R$',
            'المقاومية $\\frac{\\rho}{2}$ والمقاومة $\\frac{R}{2}$',
            'المقاومية $\\rho$ والمقاومة $\\frac{R}{2}$',
            'المقاومية $2\\rho$ والمقاومة $\\frac{R}{2}$'
        ],
        correctAnswerIndex: 2,
        explanation: 'المقاومية (ρ): لا تتأثر بالأبعاد ← تبقى $\\rho$\nكل جزء طوله $\\frac{L}{2}$ ونفس المساحة A:\n$R_{جزء} = \\rho \\frac{L/2}{A} = \\frac{1}{2} \\times \\rho \\frac{L}{A} = \\frac{R}{2}$'
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
