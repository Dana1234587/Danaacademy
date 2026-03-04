
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
            id: 1,
            questionText: "أي العوامل التالية لا تعتمد عليها القوة الدافعة الكهربائية الحثية المتولدة في موصل مستقيم يتحرك داخل مجال مغناطيسي؟",
            options: [
                "سرعة تحريك الموصل.",
                "طول الموصل.",
                "مساحة عرض مقطع الموصل (سمكه).",
                "المجال المغناطيسي الموضوع فيه."
            ],
            correctAnswerIndex: 2,
            explanation: "حسب القانون $\\varepsilon = B \\ell v \\sin \\theta$، فإن المقطع العرضي للموصل (أو سمكه) لا يدخل في حساب القوة הدافعة الحثية بل يعتمد فقط على طوله وسرعته وشدة المجال المغناطيسي والزاوية."
        },
        {
            id: 2,
            questionText: "ملف يتكون من لفة واحدة، ينعكس اتجاه المجال المغناطيسي المؤثر عليه خلال زمن معين. إذا ضاعفنا عدد لفات الملف إلى 5 لفات واستغرق انعكاس المجال نصف الزمن السابق، فإن القوة הدافعة الكهربائية الحثية المتولدة تصبح مقارنة بالحالة الأولى:",
            options: [
                "10 أضعاف القوة الدافعة السابقة.",
                "5 أضعاف.",
                "نصف القوة הدافعة السابقة.",
                "نفس القوة بدون تغيير."
            ],
            correctAnswerIndex: 0,
            explanation: "القانون $\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t}$. ضاعفنا $N$ بخمسة أضعاف، وأصبح الزمن بالمقام $\\frac{1}{2} \\Delta t$. إذن المعامل الجديد يساوي $\\frac{5}{1/2} = 10$. فتتضاعف القوة הدافعة عشر مرات."
        },
        {
            id: 3,
            questionText: "منحنى (التدفق المغناطيسي مقابل الزمن) لملف دائري يظهر خطاً مستقيماً ميله سالب. هذا يدل على أن:",
            options: [
                "القوة الدافعة الحثية ستكون صفراً.",
                "التدفق المغناطيسي في حالة تزايد.",
                "القوة הدافعة החثية المتولدة ثابتة المقدار وموجبة الإشارة.",
                "التيار החثي معدوم."
            ],
            correctAnswerIndex: 2,
            explanation: "الميل هو $\\frac{\\Delta \\Phi}{\\Delta t}$. وبما أنه خط مستقيم فالمعدل ثابت. وبما أن الميل سالب، فإن المقدار $\\frac{\\Delta \\Phi}{\\Delta t}$ سالب القيمة. وحسب قانون فاراداي $\\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t}$، فإن القوة الدافعة ستكون ثابتة وموجبة (سالب × سالب = موجب). "
        },
        {
            id: 4,
            questionText: "وضع إطار مستطيل أبعاده $10 \\text{ cm} \\times 20 \\text{ cm}$ بحيث يكون مستواه موازياً تماماً لمجال مغناطيسي $0.4 \\text{ T}$. التدفق في هذه اللحظة والقوة الدافعة الحثية إذا بقي ثابتاً على هذه الحالة لفترة دقيقة هما على التوالي:",
            options: [
                "($0.008 \\text{ Wb}$ , $0 \\text{ V}$)",
                "($0 \\text{ Wb}$ , $0 \\text{ V}$)",
                "($0.8 \\text{ Wb}$ , $0.8 \\text{ V}$)",
                "($0 \\text{ Wb}$ , $0.008 \\text{ V}$)"
            ],
            correctAnswerIndex: 1,
            explanation: "بما أن مستوى الإطار مواز للمجال (الزاوية $90^\\circ$ مع مساحة السطح)، فإن التدفق المبدئي $\\Phi = 0 \\text{ Wb}$. وبما أن الحالة لن تتغير (التغير بالتدفق = صفر)، فإن القوة הدافعة هي الأخرى $0 \\text{ V}$."
        },
        {
            id: 5,
            questionText: "تحرك موصل طوله نصف متر شرقا بسرعة ثابتة مقدارها $10 \\text{ m/s}$ داخل مجال مغناطيسي مقداره $2 \\text{ T}$ يتجه شمالا. إذا قطعت أطراف الموصل المجال، كم تكون القوة الدافعة الكهربائية الحثية المتولدة فيه؟",
            options: [
                "$10 \\text{ V}$",
                "$2 \\text{ V}$",
                "صفر فولت",
                "$5 \\text{ V}$"
            ],
            correctAnswerIndex: 0,
            explanation: "بما أن الموصل يتحرك شرقاً والمجال يتجه شمالاً، فإنه يقطع خطوط المجال عمودياً (الزاوية $\\theta = 90^\\circ$ لسرعته). إذن $\\varepsilon = B \\ell v \\sin \\theta = 2 \\times 0.5 \\times 10 \\times \\sin(90^\\circ) = 10 \\text{ V}$."
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
