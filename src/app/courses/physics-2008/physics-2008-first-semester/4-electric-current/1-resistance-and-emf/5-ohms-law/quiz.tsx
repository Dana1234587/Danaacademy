
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

// رسم بياني I-V مع خطين
const IVGraph = ({ line1Slope, line2Slope, label1, label2 }: { line1Slope: number, line2Slope: number, label1: string, label2: string }) => (
    <svg viewBox="0 0 200 150" className="w-full h-32 bg-white rounded border">
        <line x1="30" y1="120" x2="180" y2="120" stroke="#333" strokeWidth="1.5" />
        <line x1="30" y1="120" x2="30" y2="20" stroke="#333" strokeWidth="1.5" />
        <text x="175" y="135" fontSize="10" fill="#333">V</text>
        <text x="15" y="25" fontSize="10" fill="#333">I</text>
        <line x1="30" y1="120" x2={30 + 140} y2={120 - (140 * line1Slope)} stroke="#2563eb" strokeWidth="2" />
        <text x={35 + 140} y={125 - (140 * line1Slope)} fontSize="9" fill="#2563eb">{label1}</text>
        <line x1="30" y1="120" x2={30 + 140} y2={120 - (140 * line2Slope)} stroke="#dc2626" strokeWidth="2" />
        <text x={35 + 140} y={125 - (140 * line2Slope)} fontSize="9" fill="#dc2626">{label2}</text>
    </svg>
);

const quizQuestions = [
    {
        questionText: 'في الرسم البياني (I-V) لموصل أومي، ماذا يمثل الميل؟',
        options: ['$R$ (المقاومة)', '$\\frac{1}{R}$ (مقلوب المقاومة)', '$V$ (الجهد)', '$I$ (التيار)'],
        correctAnswerIndex: 1,
        explanation: 'في الرسم البياني I-V (التيار على المحور Y والجهد على المحور X):\nمن $I = \\frac{V}{R}$ نجد أن الميل = $\\frac{\\Delta I}{\\Delta V} = \\frac{1}{R}$'
    },
    {
        questionText: 'في الرسم البياني (V-I) لموصل أومي، ماذا يمثل الميل؟',
        options: ['$R$ (المقاومة)', '$\\frac{1}{R}$ (مقلوب المقاومة)', '$V$ (الجهد)', '$I$ (التيار)'],
        correctAnswerIndex: 0,
        explanation: 'في الرسم البياني V-I (الجهد على المحور Y والتيار على المحور X):\nمن $V = IR$ نجد أن الميل = $\\frac{\\Delta V}{\\Delta I} = R$'
    },
    {
        questionText: 'الشكل يوضح رسماً بيانياً (I-V) لموصل أومي عند درجتي حرارة مختلفتين. أي الخطين يمثل درجة الحرارة الأعلى؟',
        options: ['الخط الأزرق (ذو الميل الأكبر)', 'الخط الأحمر (ذو الميل الأصغر)', 'كلاهما نفس درجة الحرارة', 'لا يمكن تحديد ذلك'],
        correctAnswerIndex: 1,
        explanation: 'في الرسم I-V، الميل = $\\frac{1}{R}$\nعند زيادة درجة الحرارة:\n↑T ← ↑R ← ↓الميل\nلذلك الخط ذو الميل الأصغر (الأحمر) يمثل درجة الحرارة الأعلى.',
        hasGraph: true,
        graphProps: { line1Slope: 0.6, line2Slope: 0.3, label1: '(أ)', label2: '(ب)' }
    },
    {
        questionText: 'الشكل يوضح رسماً بيانياً (V-I) لموصل أومي عند درجتي حرارة مختلفتين. أي الخطين يمثل درجة الحرارة الأعلى؟',
        options: ['الخط الأزرق (ذو الميل الأصغر)', 'الخط الأحمر (ذو الميل الأكبر)', 'كلاهما نفس درجة الحرارة', 'لا يمكن تحديد ذلك'],
        correctAnswerIndex: 1,
        explanation: 'في الرسم V-I، الميل = R\nعند زيادة درجة الحرارة:\n↑T ← ↑R ← ↑الميل\nلذلك الخط ذو الميل الأكبر (الأحمر) يمثل درجة الحرارة الأعلى.',
        hasGraph: true,
        graphProps: { line1Slope: 0.3, line2Slope: 0.6, label1: '(أ)', label2: '(ب)' }
    },
    {
        questionText: 'أي من التالي يعتبر موصلاً لاأومياً؟',
        options: ['سلك من النحاس', 'الدايود (الصمام الثنائي)', 'سلك من الألمنيوم', 'سلك من الفضة'],
        correctAnswerIndex: 1,
        explanation: 'الموصلات اللاأومية هي التي لا تتبع قانون أوم، أي العلاقة بين I و V غير خطية.\nأمثلة: الدايود (Diode)، الترانزستور (Transistor)، LED\nبينما الفلزات (نحاس، ألمنيوم، فضة) موصلات أومية.'
    },
    {
        questionText: 'ما الفرق الرئيسي بين الرسم البياني للموصل الأومي والموصل اللاأومي؟',
        options: [
            'الموصل الأومي: خط مستقيم، الموصل اللاأومي: منحني',
            'الموصل الأومي: منحني، الموصل اللاأومي: خط مستقيم',
            'كلاهما خط مستقيم لكن بميول مختلفة',
            'كلاهما منحني لكن بأشكال مختلفة'
        ],
        correctAnswerIndex: 0,
        explanation: 'الموصل الأومي: العلاقة I-V خطية (خط مستقيم يمر بنقطة الأصل)\nالموصل اللاأومي: العلاقة I-V غير خطية (منحني)\nهذا لأن مقاومة الموصل اللاأومي تتغير مع التيار أو الجهد.'
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
                                {q.hasGraph && q.graphProps && (
                                    <div className="mt-3">
                                        <IVGraph {...q.graphProps} />
                                    </div>
                                )}
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
