
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
    // V ثابت - حساب
    {
        questionText: 'مواسع ذو صفيحتين متوازيتين مواسعته $10 \\mu F$ موصول ببطارية جهدها $20 V$. إذا ضاعفنا المسافة بين اللوحين مع بقائه متصلاً بالبطارية، ما مقدار الشحنة الجديدة؟',
        options: ['$200 \\mu C$', '$100 \\mu C$', '$400 \\mu C$', '$50 \\mu C$'],
        correctAnswerIndex: 1,
        explanation: 'من القانون $C = \\varepsilon_0 \\frac{A}{d}$ (d في المقام = علاقة عكسية) \nعند مضاعفة المسافة (d×2): $C_{جديد} = \\frac{C}{2} = \\frac{10}{2} = 5 \\mu F$ \nبما أنه متصل بالبطارية، V ثابت = 20V \n$Q_{جديد} = C_{جديد} \\times V = 5 \\times 10^{-6} \\times 20 = 100 \\mu C$'
    },
    // Q ثابت - حساب
    {
        questionText: 'مواسع مشحون بشحنة $100 \\mu C$ مفصول عن البطارية ومواسعته $5 \\mu F$. إذا ضاعفنا المسافة بين اللوحين، ما مقدار فرق الجهد الجديد؟',
        options: ['$10 V$', '$20 V$', '$40 V$', '$5 V$'],
        correctAnswerIndex: 2,
        explanation: 'من القانون $C = \\varepsilon_0 \\frac{A}{d}$ (d في المقام = علاقة عكسية) \nعند مضاعفة المسافة (d×2): $C_{جديد} = \\frac{C}{2} = \\frac{5}{2} = 2.5 \\mu F$ \nبما أنه مفصول عن البطارية، Q ثابت = 100μC \n$V_{جديد} = \\frac{Q}{C_{جديد}} = \\frac{100 \\times 10^{-6}}{2.5 \\times 10^{-6}} = 40 V$'
    },
    // طاقة - متصل
    {
        questionText: 'مواسع موصول ببطارية وطاقته المخزنة $50 mJ$. إذا ضاعفنا مساحة لوحيه مع بقائه متصلاً بالبطارية، ما مقدار الطاقة الجديدة؟',
        options: ['$25 mJ$', '$50 mJ$', '$100 mJ$', '$200 mJ$'],
        correctAnswerIndex: 2,
        explanation: 'من القانون $C = \\varepsilon_0 \\frac{A}{d}$ (A في البسط = علاقة طردية) \nعند مضاعفة المساحة (A×2): $C_{جديد} = 2C$ \nبما أنه متصل بالبطارية، V ثابت → نستخدم $PE = \\frac{1}{2}CV^2$ \nإذا C تضاعف و V ثابت: $PE_{جديد} = 2 \\times PE_{قديم} = 2 \\times 50 = 100 mJ$'
    },
    // طاقة - مفصول
    {
        questionText: 'مواسع مفصول عن البطارية وطاقته المخزنة $80 mJ$. إذا ضاعفنا مساحة لوحيه، ما مقدار الطاقة الجديدة؟',
        options: ['$40 mJ$', '$80 mJ$', '$160 mJ$', '$20 mJ$'],
        correctAnswerIndex: 0,
        explanation: 'من القانون $C = \\varepsilon_0 \\frac{A}{d}$ (A في البسط = علاقة طردية) \nعند مضاعفة المساحة (A×2): $C_{جديد} = 2C$ \nبما أنه مفصول عن البطارية، Q ثابت → نستخدم $PE = \\frac{1}{2}\\frac{Q^2}{C}$ \nC في المقام، إذا C تضاعف: $PE_{جديد} = \\frac{PE_{قديم}}{2} = \\frac{80}{2} = 40 mJ$'
    },
    // مفاهيمي - مقارنة
    {
        questionText: 'مواسعان متماثلان شُحنا بنفس الشحنة ثم فُصلا عن البطارية. إذا ضاعفنا المسافة في الأول وضاعفنا المساحة في الثاني، أي مواسع يخزن طاقة أكبر؟',
        options: ['الأول (الذي زادت مسافته)', 'الثاني (الذي زادت مساحته)', 'متساويان', 'لا يمكن التحديد'],
        correctAnswerIndex: 0,
        explanation: 'كلاهما مفصول → Q ثابت → $PE = \\frac{1}{2}\\frac{Q^2}{C}$ (C في المقام) \n• الأول: d تضاعف → من $C = \\varepsilon_0 \\frac{A}{d}$: C تنصّف → PE تتضاعف \n• الثاني: A تضاعف → من $C = \\varepsilon_0 \\frac{A}{d}$: C تتضاعف → PE تنصّف \nإذاً الأول يخزن طاقة أكبر.'
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
