
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
        questionText: 'ما تعريف المقاومية؟',
        options: [
            'مقاومة موصل طوله 1m ومساحة مقطعه 1m²',
            'مقاومة موصل طوله 1m ونصف قطره 1m',
            'مقاومة أي موصل بغض النظر عن أبعاده',
            'مقاومة موصل عند درجة حرارة صفر مطلق'
        ],
        correctAnswerIndex: 0,
        explanation: 'المقاومية (ρ) هي مقاومة موصل طوله 1 متر ومساحة مقطعه العرضي 1 متر مربع.'
    },
    {
        questionText: 'ما وحدة قياس المقاومية؟',
        options: ['$\\Omega$ (أوم)', '$\\Omega / m$', '$\\Omega \\cdot m$ (أوم.متر)', '$\\Omega \\cdot m^2$'],
        correctAnswerIndex: 2,
        explanation: 'وحدة المقاومية هي أوم·متر (Ω·m)\nمن $\\rho = R \\times \\frac{A}{L}$، الوحدة = $\\Omega \\times \\frac{m^2}{m} = \\Omega \\cdot m$'
    },
    {
        questionText: 'إذا تضاعف طول سلك مع بقاء باقي العوامل ثابتة، فإن:',
        options: [
            'المقاومة والمقاومية تتضاعفان',
            'المقاومة تتضاعف والمقاومية لا تتأثر',
            'المقاومية تتضاعف والمقاومة لا تتأثر',
            'المقاومة والمقاومية لا تتأثران'
        ],
        correctAnswerIndex: 1,
        explanation: 'من قانون $R = \\rho \\frac{L}{A}$:\n- المقاومة (R): L في البسط ← علاقة طردية ← تتضاعف\n- المقاومية (ρ): لا تعتمد على الأبعاد ← لا تتأثر'
    },
    {
        questionText: 'عند ارتفاع درجة الحرارة، فإن:',
        options: [
            'المقاومة فقط تزداد',
            'المقاومية فقط تزداد',
            'المقاومة والمقاومية تزدادان',
            'المقاومة والمقاومية تنقصان'
        ],
        correctAnswerIndex: 2,
        explanation: 'درجة الحرارة تؤثر على كل من المقاومة والمقاومية.\nبزيادة الحرارة:\n- المقاومية (ρ) تزداد (علاقة طردية مع الحرارة)\n- المقاومة (R) تزداد (لأنها تعتمد على ρ)'
    },
    {
        questionText: 'سلكان من النحاس عند نفس درجة الحرارة، لكن أحدهما أطول من الآخر. أي العبارات صحيحة؟',
        options: [
            'لهما نفس المقاومة ونفس المقاومية',
            'لهما نفس المقاومية لكن مقاومتيهما مختلفتان',
            'لهما نفس المقاومة لكن مقاوميتيهما مختلفتان',
            'مقاومتيهما ومقاوميتيهما مختلفتان'
        ],
        correctAnswerIndex: 1,
        explanation: 'بما أن السلكين من نفس المادة (نحاس) وعند نفس الحرارة:\n- المقاومية (ρ) متساوية ← لأنها تعتمد على نوع المادة والحرارة فقط\n- المقاومة (R) مختلفة ← لأنها تعتمد أيضاً على الطول (والأطوال مختلفة)'
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
