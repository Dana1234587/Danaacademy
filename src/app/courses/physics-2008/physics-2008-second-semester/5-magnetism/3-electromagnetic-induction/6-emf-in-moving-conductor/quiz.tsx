
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
            questionText: "موصل مستقيم طوله $0.5 \\text{ m}$، يتحرك بسرعة $4 \\text{ m/s}$ عمودياً على مجال مغناطيسي منتظم مقداره $0.2 \\text{ T}$. مقدار القوة الدافعة الكهربائية الحثية المتولدة فيه يساوي:",
            options: [
                "$0.04 \\text{ V}$",
                "$0.4 \\text{ V}$",
                "$4 \\text{ V}$",
                "صفر"
            ],
            correctAnswerIndex: 1,
            explanation: "بما أن الحركة عمودية، الزاوية $\\theta = 90^\\circ$ و$\\sin(90^\\circ) = 1$. بتعويض المُعطيات: $\\varepsilon = B \\ell v = (0.2)(0.5)(4) = 0.4 \\text{ V}$."
        },
        {
            id: 2,
            questionText: "متى تنعدم القوة الدافعة الكهربائية الحثية المتولدة بين طرفي موصل يتحرك في مجال مغناطيسي منتظم رغم حركته المستمرة الدائمة؟",
            options: [
                "عندما يتحرك الموصل بسرعة كبيرة جداً.",
                "عندما تكون حركته عمودية على اتجاه المجال المغناطيسي.",
                "عندما يتحرك بموازاة خطوط المجال المغناطيسي.",
                "عندما يكون الموصل مصنوعاً من النحاس."
            ],
            correctAnswerIndex: 2,
            explanation: "لإنتاج قوة دافعة حثية يجب أن تقوم حركة الموصل بـ\"قطع\" خطوط المجال (علاقة $\\sin \\theta$). إذا تحرك الموصل بموازاة الخطوط (الزاوية शून्य أو 180)، فإن $\\sin(0) = 0$ ولا يتولد قوة دافعة."
        },
        {
            id: 3,
            questionText: "في الموصل المتحرك عمودياً على مجال مغناطيسي، ماذا يمثل الطرف الذي تتراكم فيه الشحنات الموجبة بالنسبة للموصل لو اعتبرناه بطارية؟",
            options: [
                "القطب السالب للبطارية (الجهد المنخفض).",
                "القطب الموجب للبطارية (الجهد العالي).",
                "المقاومة الداخلية للبطارية.",
                "لا يمثل شيئاً."
            ],
            correctAnswerIndex: 1,
            explanation: "الطرف الذي تندفع إليه وتتراكم فيه الشحنات الموجبة بفعل القوة المغناطيسية يمتلك جهداً كهربائياً أعلى، وبالتالي يمثل القطب الموجب لهذه \"البطارية\" الوهمية."
        },
        {
            id: 4,
            questionText: "موصل طوله $L$ يتحرك بسرعة $v$ داخل مجال $B$ وبزاوية $\\theta$ مع المجال. كيف يمكننا مضاعفة القوة الدافعة الكهربائية الحثية المتولدة فيه مرتين؟",
            options: [
                "بمضاعفة شدة المجال المغناطيسي ($B$)، وطول الموصل ($L$).",
                "بإنقاص سرعة تحريك המوصل ($v$) للنصف.",
                "بمضاعفة سرعة تحريك الموصل ($v$) مرتين.",
                "بمضاعفة كل المتغيرات ($B, L, v$) مرتين."
            ],
            correctAnswerIndex: 2,
            explanation: "القانون $\\varepsilon = B \\ell v \\sin \\theta$. من العلاقة الطردية، يكفي مضاعفة أحد المعطيات لمرة واحدة لتتضاعف القوة הدافعة. لذا مضاعفة السرعة لمرتين ستضاعف القوة. (الخيار الأول يضاعفها أربع مرات، والأخير ثمان مرات)."
        },
        {
            id: 5,
            questionText: "تتراكم الشحنات عند أطراف الموصل المتحرك داخل مجال مغناطيسي حتى تصل إلى حالة اتزان. في حالة الاتزان هذه، تصبح: ",
            options: [
                "القوة الكهربائية الناتجة عن فرق الجهد تساوي صفراً.",
                "القوة المغناطيسية المؤثرة على الشحنات تساوي صفراً.",
                "القوة المغناطيسية الدافعة تتساوى تماماً مع القوة الكهربائية المعاكسة لها.",
                "السرعة المتجهة للموصل تنعكس."
            ],
            correctAnswerIndex: 2,
            explanation: "يستمر اندفاع تراكم الشحنات تحت تأثير القوة المغناطيسية ($qvB$) حتى ينشأ مجال كهربائي يولد قوة كهربائية ($qE$) معاكسة وتساوي تماماً القوة المغناطيسية. عندئذ يحدث الاتزان ويتوقف التراكم."
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
