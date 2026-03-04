
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
            questionText: "إطار مربع الشكل طول ضلعه $10 \\text{ cm}$ وضع في مجال مغناطيسي منتظم مقداره $0.5 \\text{ T}$ بحيث يكون مستواه عمودياً على خطوط المجال المغناطيسي. ما مقدار التدفق المغناطيسي الذي يخترقه؟",
            options: [
                "$0.5 \\times 10^{-2} \\text{ Wb}$",
                "$5 \\times 10^{-2} \\text{ Wb}$",
                "$0.05 \\text{ Wb}$",
                "صفر"
            ],
            correctAnswerIndex: 0,
            explanation: "مستوى الإطار عمودي على المجال، إذن الزاوية بين متجه المساحة والمجال $\\theta = 0$. المساحة $A = L^2 = (10 \\times 10^{-2})^2 = 1 \\times 10^{-2} \\text{ m}^2$. التدفق $\\Phi = B \\cdot A \\cdot \\cos(0) = 0.5 \\times 10^{-2} \\times 1 = 0.5 \\times 10^{-2} \\text{ Wb}$."
        },
        {
            id: 2,
            questionText: "سطح مساحته $A$ موضوع في مجال مغناطيسي $B$. إذا كان مستوى السطح يصنع زاوية $30^\\circ$ مع خطوط المجال المغناطيسي، فإن التدفق المغناطيسي يعطى بالعلاقة:",
            options: [
                "$BA \\cos(30^\\circ)$",
                "$BA \\sin(30^\\circ)$",
                "$BA \\cos(60^\\circ)$",
                "الخيارات ب والجيم معاً"
            ],
            correctAnswerIndex: 3,
            explanation: "بما أن الزاوية مع **مستوى السطح** هي $30^\\circ$، فإن الزاوية $\\theta$ مع **متجه المساحة** هي $90^\\circ - 30^\\circ = 60^\\circ$. التدفق يعطى بالقانون $BA \\cos(60^\\circ)$. ومتمتها الجيبية هي $BA \\sin(30^\\circ)$، لذا الخياران صحيحان رياضياً لكن الأصح والأبسط استخدام المتممة في قانون الجيب التمام."
        },
        {
            id: 3,
            questionText: "يدور ملف دائري مساحته $A$ بسرعة زاوية ثابتة داخل مجال مغناطيسي $B$ منتظم. متى يصبح التغير بالتدفق المغناطيسي أعظم ما يمكن، رغم أن التدفق نفسه عبر الملف يكون صفراً؟",
            options: [
                "عندما يكون السطح موازياً للمجال.",
                "عندما يصنع السطح زاوية 45 درجة.",
                "عندما تبدأ خطوط المجال بالخروج تماماً.",
                "عندما تكون خطوط المجال عمودية على السطح."
            ],
            correctAnswerIndex: 0,
            explanation: "يكون التدفق نفسه مساوياً للصفر عندما يكون السطح موازياً للمجال ($\\theta = 90^\\circ$). لكن في هذه اللحظة، معدل التغير بالزاوية (مشتقة جيب التمام وهي سالب الجيب) يبلغ قيمة عظمى (حيث $\\sin(90^\\circ) = 1$)."
        },
        {
            id: 4,
            questionText: "ملف مساحته $0.2 \\text{ m}^2$ وضع في مجال $B = 0.4 \\text{ T}$، فكان التدفق المغناطيسي مقداره $0.04 \\text{ Wb}$. ما هي الزاوية التي يصنعها مستوى الملف مع خطوط المجال المغناطيسي؟",
            options: [
                "$60^\\circ$",
                "$30^\\circ$",
                "$0^\\circ$",
                "$90^\\circ$"
            ],
            correctAnswerIndex: 1,
            explanation: "بناء على المعطيات: $\\Phi = BA \\cos(\\theta)  \\rightarrow  0.04 = (0.4)(0.2) \\cos(\\theta) \\rightarrow \\cos(\\theta) = 0.04 / 0.08 = 0.5$. إذن الزاوية $\\theta = 60^\\circ$ مع متجه المساحة. بالتالي الزاوية مع **مستوى الملف** هي $90^\\circ - 60^\\circ = 30^\\circ$."
        },
        {
            id: 5,
            questionText: "إذا تضاعف المجال المغناطيسي المؤثر على سطح مرتين، ثم نقصت المساحة المعرضة للمجال إلى النصف مع بقاء الزاوية ثابتة، فإن مقدار التدفق المغناطيسي:",
            options: [
                "يقل للنصف.",
                "يتضاعف مرتين.",
                "يقل للربع.",
                "يبقى ثابتاً لا يتغير."
            ],
            correctAnswerIndex: 3,
            explanation: "التدفق تناسبي طردي مع المجال والمساحة ($\\Phi = BA \\cos(\\theta)$). فإذا أصبح المجال $2B$ والمساحة أصبحت $\\frac{1}{2}A$، فإن حاصل ضربهما يعود لـ $(2B) \\times (\\frac{1}{2}A) = BA$، فيبقى التدفق كما هو."
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
