
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
        questionText: 'ملف مستطيل عدد لفاته 100 لفة، مساحته $0.02$ m² يمر به تيار $2$ A، موضوع في مجال مغناطيسي شدته $0.5$ T. ما أقصى عزم ازدواج يمكن أن يؤثر عليه؟',
        options: ['$1$ N·m', '$2$ N·m', '$0.5$ N·m', '$4$ N·m'],
        correctAnswerIndex: 1,
        explanation: 'نطبق قانون العزم الأقصى: $\\tau_{max} = NBIA$\n$\\tau_{max} = (100)(0.5)(2)(0.02) = 2$ N·m'
    },
    {
        questionText: 'ملف مربع طول ضلعه $10$ cm، عدد لفاته $50$ لفة، يمر به تيار $3$ A. إذا كان عزم الازدواج المؤثر عليه $0.15$ N·m، ما شدة المجال المغناطيسي؟',
        options: ['$0.1$ T', '$0.5$ T', '$1$ T', '$0.2$ T'],
        correctAnswerIndex: 2,
        explanation: 'المساحة: $A = (0.1)^2 = 0.01$ m²\nمن قانون العزم الأقصى (بفرض العزم أقصى): $\\tau = NBIA$\n$B = \\frac{\\tau}{NIA} = \\frac{0.15}{(50)(3)(0.01)} = \\frac{0.15}{1.5} = 0.1$ T'
    },
    {
        questionText: 'حلقة مستطيلة تحمل تياراً موضوعة في مجال مغناطيسي منتظم. رتب الحالات التالية تنازلياً حسب مقدار عزم الازدواج: (أ) مستوى الحلقة موازٍ للمجال، (ب) مستوى الحلقة عمودي على المجال، (ج) مستوى الحلقة يصنع زاوية 45° مع المجال.',
        options: ['(أ) > (ج) > (ب)', '(ب) > (ج) > (أ)', '(ج) > (أ) > (ب)', '(أ) > (ب) > (ج)'],
        correctAnswerIndex: 0,
        explanation: '• (أ) مستوى موازٍ للمجال ← العمودي يصنع 90° ← $\\tau = \\tau_{max}$ (أكبر قيمة)\n• (ج) زاوية 45° ← العمودي يصنع 45° ← $\\tau = \\tau_{max} \\sin(45°)$ (قيمة متوسطة)\n• (ب) مستوى عمودي للمجال ← العمودي يصنع 0° ← $\\tau = 0$ (أصغر قيمة)\nالترتيب: (أ) > (ج) > (ب)'
    },
    {
        questionText: 'حلقة مستطيلة موضوعة في مجال مغناطيسي منتظم وبدأت بالدوران مع عقارب الساعة (عند النظر من الأعلى). ما اتجاه التيار في الضلع العلوي؟',
        options: ['نحو اليمين', 'نحو اليسار', 'نحو الداخل', 'نحو الخارج'],
        correctAnswerIndex: 0,
        explanation: 'عند دوران الحلقة مع عقارب الساعة، يجب أن تكون القوة على الضلع العلوي متجهة للخارج (نحوك). باستخدام قاعدة اليد اليمنى بالعكس: إذا كانت القوة للخارج والمجال للأعلى مثلاً، فإن التيار في الضلع العلوي يتجه نحو اليمين.'
    },
    {
        questionText: 'أي ضلعين من حلقة مستطيلة مغمورة في مجال مغناطيسي منتظم لا تؤثر عليهما قوة مغناطيسية؟',
        options: ['الضلعان العموديان على المجال', 'الضلعان الموازيان للمجال', 'جميع الأضلاع تتأثر', 'لا يوجد ضلع يتأثر'],
        correctAnswerIndex: 1,
        explanation: 'الضلعان الموازيان لاتجاه المجال المغناطيسي لا تؤثر عليهما قوة، لأن الزاوية بين اتجاه التيار واتجاه المجال = 0° أو 180°، و $\\sin(0°) = \\sin(180°) = 0$، لذلك $F = BIL\\sin(0°) = 0$.'
    },
];

export default function TorqueQuizPage() {
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
