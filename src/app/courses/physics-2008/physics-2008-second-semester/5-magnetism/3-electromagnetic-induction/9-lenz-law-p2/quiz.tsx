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
        questionText: 'عند إغلاق مفتاح دارة ملف ابتدائي مجاور لملف ثانوي، ماذا يحدث للتدفق المغناطيسي الذي يخترق الملف الثانوي؟',
        options: [
            'يقل التدفق.',
            'يزداد التدفق.',
            'يبقى ثابتاً.',
            'ينعدم فوراً.'
        ],
        correctAnswerIndex: 1,
        explanation: 'عند إغلاق المفتاح ينمو التيار في الملف الابتدائي من الصفر، فيزداد المجال المغناطيسي الناشئ عنه، وبالتالي يزداد التدفق المغناطيسي الذي يخترق الملف الثانوي.'
    },
    {
        questionText: 'لحظة فتح مفتاح دارة ملف ابتدائي مجاور لملف ثانوي، يكون اتجاه المجال المغناطيسي الحثي المتولد في الملف الثانوي:',
        options: [
            'معاكساً لاتجاه المجال المغناطيسي الأصلي.',
            'في نفس اتجاه المجال المغناطيسي الأصلي.',
            'عمودياً على اتجاه المجال المغناطيسي الأصلي.',
            'لا يتولد مجال مغناطيسي حثي لأن الدارة فُتحت.'
        ],
        correctAnswerIndex: 1,
        explanation: 'عند فتح الدارة يتلاشى التيار ويقل التدفق. ليقاوم الملف الثانوي هذا النقص، يولد تياراً حثياً ينتج مجالاً مغناطيسياً في نفس اتجاه المجال الأصلي (ليعوض النقصان).'
    },
    {
        questionText: 'إذا زادت مقاومة دارة الملف الابتدائي (بواسطة ريوستات) أثناء مرور تيار فيها، فإن التيار الحثي المتولد في الملف الثانوي المجاور:',
        options: [
            'يقاوم الزيادة في التدفق بإنتاج مجال معاكس.',
            'ينعدم لأن المقاومة لا تؤثر على التدفق.',
            'يتولد ليعوض النقصان في التدفق بإنتاج مجال في نفس الاتجاه.',
            'يعكس اتجاه التيار الأصلي مباشرة.'
        ],
        correctAnswerIndex: 2,
        explanation: 'زيادة المقاومة تؤدي إلى نقصان التيار في الملف الابتدائي، مما يقلل المجال المغناطيسي والتدفق، فيتولد في الثانوي تيار ينتج مجالاً في نفس اتجاه المجال الأصلي لتعويض النقص.'
    },
    {
        questionText: 'في تجربة ملفين متجاورين، متى لا يتولد تيار حثي في الملف الثانوي؟',
        options: [
            'لحظة إغلاق دارة الملف الابتدائي.',
            'لحظة فتح دارة الملف الابتدائي.',
            'عند زيادة أو تقليل مقدار التيار في الملف الابتدائي.',
            'عندما يثبت مقدار التيار المار في الملف الابتدائي لمدة زمنية.'
        ],
        correctAnswerIndex: 3,
        explanation: 'يتولد التيار الحثي فقط عند "تغير" التدفق. ثبات التيار في الملف الابتدائي يعني ثبات المجال المغناطيسي وثبات التدفق، فلا يحدث تغير للتوليد قوة دافعة حثية.'
    },
    {
        questionText: 'وفقاً لتطبيق قانون لنز على ملفين، فإن قاعدة اليد اليمنى تساعدنا على:',
        options: [
            'حساب مقدار القوة الدافعة الكهربائية الحثية.',
            'معرفة اتجاه التيار الحثي بعد تحديد اتجاه المجال الحثي المطلوب.',
            'قياس مقدار التغير في التدفق.',
            'تحديد ما إذا كان الملف الابتدائي يحتوي على تيار أم لا.'
        ],
        correctAnswerIndex: 1,
        explanation: 'بعد تحديد طبيعة التغير (زيادة أو نقصان) واتجاه المجال المغناطيسي الحثي المطلوب لمقاومة هذا التغير باستخدام استنتاجات قانون لنز، نطبق قاعدة اليد اليمنى لمعرفة اتجاه سريان التيار في حلقات اللفات.'
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
