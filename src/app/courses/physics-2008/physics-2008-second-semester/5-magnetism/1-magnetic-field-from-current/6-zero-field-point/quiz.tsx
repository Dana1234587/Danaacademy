
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
        questionText: 'موصلان متوازيان يفصل بينهما مسافة 30 سم، يمر في الأول تيار 6 أمبير وفي الثاني تيار 3 أمبير بنفس الاتجاه. ما بُعد نقطة انعدام المجال عن الموصل الأول؟',
        options: ['$10$ سم', '$15$ سم', '$20$ سم', '$25$ سم'],
        correctAnswerIndex: 2,
        explanation: 'بما أن التيارين بنفس الاتجاه، تقع نقطة الانعدام بينهما. نطبق $B_1 = B_2$:\n$\\frac{\\mu_0 I_1}{2\\pi r_1} = \\frac{\\mu_0 I_2}{2\\pi r_2}$\nنفترض $r_1 = x$ و $r_2 = 0.3 - x$\n$\\frac{6}{x} = \\frac{3}{0.3-x}$\n$6(0.3-x) = 3x$\n$1.8 - 6x = 3x$\n$1.8 = 9x$\n$x = 0.2$ m = 20 سم'
    },
    {
        questionText: 'موصلان متوازيان يمر فيهما تياران متعاكسان في الاتجاه، الأول 8 أمبير والثاني 2 أمبير، والمسافة بينهما 15 سم. أين تقع نقطة انعدام المجال؟',
        options: ['بين الموصلين على بُعد 12 سم من الأول', 'خارج الموصلين على بُعد 5 سم من الثاني', 'خارج الموصلين على بُعد 5 سم من الأول', 'بين الموصلين على بُعد 3 سم من الثاني'],
        correctAnswerIndex: 1,
        explanation: 'بما أن التيارين متعاكسان، تقع نقطة الانعدام خارج الموصلين وأقرب للتيار الأصغر (الموصل الثاني).\nنفترض أن النقطة تبعد $x$ عن الموصل الثاني (خارجه).\n$\\frac{8}{0.15+x} = \\frac{2}{x}$\n$8x = 2(0.15+x)$\n$8x = 0.3 + 2x$\n$6x = 0.3$\n$x = 0.05$ m = 5 سم من الموصل الثاني (خارجه)'
    },
    {
        questionText: 'سلكان متوازيان متساويا التيار والتيار فيهما بنفس الاتجاه، أين تقع نقطة انعدام المجال؟',
        options: ['في منتصف المسافة بينهما', 'أقرب للسلك الأول', 'أقرب للسلك الثاني', 'خارج السلكين'],
        correctAnswerIndex: 0,
        explanation: 'عندما يكون التياران متساويين ($I_1 = I_2$) وفي نفس الاتجاه، تقع نقطة انعدام المجال في منتصف المسافة بينهما بالضبط، لأن $B_1 = B_2$ يتحقق عندما $r_1 = r_2$.'
    },
    {
        questionText: 'متى يكون من المستحيل إيجاد نقطة انعدام للمجال المغناطيسي بين موصلين متوازيين؟',
        options: ['عندما يكون التياران متساويين', 'عندما يكون التياران بنفس الاتجاه', 'عندما يكون التياران متعاكسين', 'لا يوجد حالة مستحيلة'],
        correctAnswerIndex: 2,
        explanation: 'عندما يكون التياران متعاكسين في الاتجاه، تكون المجالات المغناطيسية في المنطقة بين الموصلين في نفس الاتجاه (تتجمع ولا تتعاكس)، لذلك لا يمكن أن يكون هناك نقطة انعدام بينهما. نقطة الانعدام تكون خارج الموصلين فقط.'
    },
    {
        questionText: 'ما الفرق بين قولنا "التيارات متعاكسة" و "المجالات متعاكسة"؟',
        options: ['لا فرق، كلاهما نفس المعنى', 'التيارات المتعاكسة تعني مجالات بنفس الاتجاه بين الموصلين', 'التيارات المتعاكسة تعني مجالات متعاكسة بين الموصلين', 'المجالات دائماً متعاكسة بغض النظر عن اتجاه التيارات'],
        correctAnswerIndex: 1,
        explanation: 'هذا المفهوم أساسي جداً! عندما تكون التيارات متعاكسة في الاتجاه، تكون المجالات المغناطيسية في المنطقة بين الموصلين في نفس الاتجاه. وعندما تكون التيارات بنفس الاتجاه، تكون المجالات متعاكسة في المنطقة بينهما. لذلك نقول: "المجالات عكس بعض وليس التيارات" هي شرط وجود نقطة الانعدام.'
    },
];

export default function ZeroFieldPointQuizPage() {
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
