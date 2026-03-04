
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
            questionText: "الشرط الأساسي لتوليد قوة دافعة كهربائية حثية في ملف موضوع في مجال مغناطيسي هو:",
            options: [
                "أن يكون المجال المغناطيسي قوياً جداً.",
                "أن يخترق الملف تدفق مغناطيسي كبير.",
                "أن يكون هناك تغير في التدفق المغناطيسي الذي يخترق الملف مع الزمن.",
                "أن يكون الملف مصنوعاً من مادة مغناطيسية قوية."
            ],
            correctAnswerIndex: 2,
            explanation: "لا يكفي وجود تدفق لكي تتولد قوة دافعة، بل يجب أن يكون هناك تغيّر في هذا التدفق، كما نص عليه مبدأ فاراداي للحث، وإلا فإن القوة الدافعة الحثية ستكون صفراً."
        },
        {
            id: 2,
            questionText: "ملف دائري موصول بجهاز جلفانوميتر موضوع في مجال مغناطيسي منتظم ثابت، إذا بقي الملف ساكناً وبمساحة ثابتة دون دوران، ماذا ستكون قراءة الجلفانوميتر؟",
            options: [
                "قيمة موجبة ثابتة تتناسب مع مساحة الملف.",
                "صفراً.",
                "قيمة تتغير بمرور الزمن.",
                "تعتمد على عدد لفات الملف."
            ],
            correctAnswerIndex: 1,
            explanation: "بما أن الملف ساكن (الزاوية ثابتة)، ومساحته ثابتة، والمجال المغناطيسي ثابت، فإن التدفق المغناطيسي يكون ثابتاً، مما يعني أن التغير بالتدفق $\\Delta \\Phi = 0$ والنتيجة عدم تولد قوة دافعة كهربائية חثية أو تيار حثي."
        },
        {
            id: 3,
            questionText: "أي العبارات التالية لوصف التيار الحثّي تعتبر صحيحة؟",
            options: [
                "يتولد فقط في موصل مفتوح.",
                "دائماً يمتلك قيمة سالبة.",
                "يتولد في الدارات المغلقة نتيجة نشوء قوة دافعة حثية إثر تغير بالتدفق.",
                "يعتمد اتجاهه فقط على مساحة السطح التي تقطع التدفق."
            ],
            correctAnswerIndex: 2,
            explanation: "التيار الحثي (الحث الكهرومغناطيسي) ينشأ نتيجة تغير في التدفق المغناطيسي في مسار مغلق يؤدي إلى توليد القوة الدافعة الحثّية المحركة للشحنات على شكل تيار."
        },
        {
            id: 4,
            questionText: "كيف يمكن إحداث تغير في التدفق المغناطيسي لملف مستطيل الشكل موضوع في مجال مغناطيسي؟",
            options: [
                "عن طريق إنقاص أو زيادة شدة المجال المغناطيسي فقط.",
                "عن طريق إحداث تشوه وتغيير في مساحة الملف فقط.",
                "عن طريق تدوير الملف حول محور فقط.",
                "جميع الخيارات السابقة صحيحة."
            ],
            correctAnswerIndex: 3,
            explanation: "التدفق $\\Phi = B \\cdot A \\cdot \\cos(\\theta)$، ويمكن تغيير التدفق عن طريق تغيير مقدار $B$ (خيارات أ)، أو تغيير مقدار المساحة $A$ (الخيار ب)، أو عن طريق تدوير الإطار لتغيير الزاوية $\\theta$ (الخيار ج)."
        },
        {
            id: 5,
            questionText: "مجال مغناطيسي مقداره (10 T) يخترق مساحة سطح بشكل عمودي ومقدارها (5 م مربع). إذا استمر هذا المجال بهذه القوة لزمن طويل، ما هي قيمة القوة الدافعة החثية المتولدة في السطح بعد مرور ساعتين؟",
            options: [
                "50 فولت",
                "-50 فولت",
                "10 فولت",
                "صفر فولت"
            ],
            correctAnswerIndex: 3,
            explanation: "طالما أن المجال ظل ثابتاً (10 T) والمساحة ظلت ثابتة، فإن التدفق سيظل ثابتاً عند مقداره بقيمة 50 ويبر. وبما أن التدفق ثابت، فإن التغير بالتدفق يساوي صفر (النهائي - الابتدائي = 50 - 50 = صفر). لذا القوة الدافعة החثية تساوي صفراً."
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
