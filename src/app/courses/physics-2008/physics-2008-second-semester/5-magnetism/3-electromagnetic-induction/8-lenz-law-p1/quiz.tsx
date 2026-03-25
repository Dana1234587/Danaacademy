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
        questionText: 'ما هو المبدأ الأساسي الذي يرتكز عليه قانون لنز؟',
        options: [
            'المجال المغناطيسي يتناسب طردياً مع التيار.',
            'حفظ الشحنة الكهربائية.',
            'مقاومة التيار الحثي للتغير في التدفق المغناطيسي الذي أحدثه.',
            'توليد تيار حثي فقط عند زيادة التدفق المغناطيسي.'
        ],
        correctAnswerIndex: 2,
        explanation: 'ينص قانون لنز بوضوح على أن اتجاه التيار الحثي يكون بحيث يقاوم التغير في التدفق المغناطيسي المسبب له، وهذا يعتبر تطبيقاً لقانون حفظ الطاقة.'
    },
    {
        questionText: 'عند تقريب القطب الشمالي لمغناطيس الدائم نحو وجه ملف دائري، ما نوع القطب المغناطيسي المتكون على ذلك الوجه للملف؟',
        options: [
            'قطب جنوبي (S).',
            'قطب شمالي (N).',
            'لا يتكون أي قطب.',
            'يتكون قطب متعادل.'
        ],
        correctAnswerIndex: 1,
        explanation: 'تقريب القطب الشمالي يزيد التدفق المغناطيسي، لذا يتكون مجال حثي معاكس عبر نشوء قطب شمالي للملف على الوجه المقابل ليقاوم عملية التقريب (يحدث تنافر).'
    },
    {
        questionText: 'إذا سقط مغناطيس دائم بحيث اقترب قطبه الجنوبي (S) من ملف، فإنه للتغلب على التغير في التدفق المغناطيسي:',
        options: [
            'سيصبح وجه الملف العلوي قطباً شمالياً.',
            'سيصبح وجه الملف العلوي قطباً جنوبياً.',
            'سيولد الملف مجالاً في نفس اتجاه المجال المغناطيسي للسقوط.',
            'تسرع حركة المغناطيس للأمام.'
        ],
        correctAnswerIndex: 1,
        explanation: 'عند تقريب قطب جنوبي يتزايد التدفق المغناطيسي. الملف يمانع الزيادة عن طريق وضع قطب مشابه (جنوبي) في الوجه العلوي ليحدث قوة تنافر تقاوم الاقتراب.'
    },
    {
        questionText: 'أثناء إبعاد قطب شمالي عن ملف لولبي، كيف نستدل على اتجاه التيار الحثي باستخدام قاعدة اليد اليمنى؟',
        options: [
            'يشير الإبهام نحو المغناطيس المبتعد لأنه قطب شمالي يجذب.',
            'تشير اليد للأعلى دائماً.',
            'يشير الإبهام بعيداً عن المغناطيس لأن الملف أحدث قطباً جنوبياً مقابل المغناطيس.',
            'لا يمكننا استخدام قاعدة اليد اليمنى في هذه الحالة.'
        ],
        correctAnswerIndex: 0,
        explanation: 'عند إبعاد القطب الشمالي، يمانع الملف هذا النقصان فيتكون قطب جنوبي على الطرف القريب للمغناطيس، وبالتالي يكون القطب الشمالي الخاص بالملف (المجال الحثي) متجهاً نحو المغناطيس المبتعد. ولذلك يشير الإبهام لاتجاه المغناطيس.'
    },
    {
        questionText: 'ما أهمية وجود الإشارة السالبة (-) في قانون فاراداي $ \\varepsilon = -N \\frac{\\Delta \\Phi}{\\Delta t} $؟',
        options: [
            'للتعبير عن أن التيار والجهد كميات متجهة سالبة أحياناً.',
            'أن زيادة عدد اللفات ينقص الجهد الكلي.',
            'تطبيق رياضي لقانون لنز الذي يدل على أن القوة الدافعة החثية تقاوم التغير في التدفق المغناطيسي.',
            'أن التدفق المغناطيسي دائما يقل ولا يمكن أن يزداد.'
        ],
        correctAnswerIndex: 2,
        explanation: 'الإشارة السالبة هي التعبير الرياضي لقانون لنز؛ فهي تعني أن القوة الدافعة الحثية המתولدة تعاكس دائماً في أثرها التغير في التدفق المغناطيسي الذي أنشأها.'
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
