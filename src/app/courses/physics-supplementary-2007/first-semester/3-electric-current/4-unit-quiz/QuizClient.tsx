
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Redo, XCircle, ListChecks, Info, Rocket, BrainCircuit, BookOpen, Clock, Calculator, Pencil, ClipboardCheck } from 'lucide-react';
import Image from 'next/image';
import type { QuizQuestion } from './quiz-data';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import { Logo } from '@/components/logo';


const QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes


// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index} dir="rtl">{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
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

const HtmlRenderer = ({ htmlString }: { htmlString: string }) => {
    return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const optionLabels = ['أ', 'ب', 'ج', 'د'];

export function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const [quizState, setQuizState] = useState<'not-started' | 'active' | 'finished'>('not-started');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [score, setScore] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (quizState !== 'active') return;

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          finishQuiz();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quizState]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = parseInt(value, 10);
    setAnswers(newAnswers);
  };
  
  const finishQuiz = () => {
      let calculatedScore = 0;
      answers.forEach((answer, index) => {
          if (answer === questions[index].correctAnswerIndex) {
              calculatedScore++;
          }
      });
      setScore(calculatedScore);
      setQuizState('finished');
  };

  const startQuiz = () => {
    setTimeLeft(QUIZ_DURATION_SECONDS);
    setQuizState('active');
  }

  const restartQuiz = () => {
      setCurrentQuestionIndex(0);
      setAnswers(new Array(questions.length).fill(null));
      setQuizState('not-started');
      setShowDetails(false);
      setScore(0);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
  
 if (quizState === 'not-started') {
    return (
        <Card className="max-w-3xl mx-auto border-primary/20 shadow-lg bg-gradient-to-br from-primary/5 via-background to-background">
            <CardHeader className="text-center p-8">
                 <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                    <BrainCircuit className="w-12 h-12 text-primary" />
                 </div>
                <CardTitle className="text-3xl font-bold text-primary">أنت على وشك بدء اختبار الوحدة</CardTitle>
                <CardDescription className="text-muted-foreground text-lg mt-2">
                    استعد لاختبار معلوماتك وتحدي نفسك. بالتوفيق!
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div className="bg-muted/50 p-4 rounded-lg">
                        <BookOpen className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-bold">عدد الأسئلة</h4>
                        <p className="text-muted-foreground"><SmartTextRenderer as="span" text={`$15$ سؤال`} /></p>
                    </div>
                     <div className="bg-muted/50 p-4 rounded-lg">
                        <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-bold">المدة</h4>
                        <p className="text-muted-foreground"><SmartTextRenderer as="span" text={`$60$ دقيقة`} /></p>
                    </div>
                     <div className="bg-muted/50 p-4 rounded-lg">
                        <CheckCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                        <h4 className="font-bold">العلامة الكلية</h4>
                        <p className="text-muted-foreground"><SmartTextRenderer as="span" text={`$60$ علامة`} /></p>
                    </div>
                </div>

                 <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
                    <AlertTriangle className="h-5 w-5 text-destructive" />
                    <AlertTitle className="font-bold">نصائح قبل البدء</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc list-outside space-y-2 mt-2 pe-4">
                            <li className="flex items-start gap-2"><Pencil className="w-4 h-4 mt-1" /><span>تأكد من وجود ورقة وقلم بجانبك للحل.</span></li>
                            <li className="flex items-start gap-2"><Calculator className="w-4 h-4 mt-1" /><span>احضر آلة حاسبة.</span></li>
                            <li className="flex items-start gap-2"><BookOpen className="w-4 h-4 mt-1" /><span>للحصول على تقييم دقيق، تأكد من مراجعتك الكاملة لوحدة "التيار الكهربائي".</span></li>
                        </ul>
                    </AlertDescription>
                </Alert>
            </CardContent>
            <CardFooter className="p-8">
                <Button onClick={startQuiz} className="w-full text-lg py-6" size="lg">
                    <Rocket className="me-2 w-5 h-5 animate-pulse-slow" />
                    لنبدأ الاختبار!
                </Button>
            </CardFooter>
        </Card>
    );
  }


  if (quizState === 'finished') {
    const correctAnswers = score;
    const incorrectAnswers = questions.length - correctAnswers;
    const finalMark = correctAnswers * 4;
    const totalMarks = questions.length * 4;

    return (
      <Card className="max-w-4xl mx-auto w-full">
        <CardHeader className="text-center">
          <CardTitle>النتيجة النهائية</CardTitle>
          <CardDescription>
             لقد أنهيت الاختبار بنجاح. هذه هي نتيجتك.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
            <div className="p-6 bg-muted rounded-lg border flex flex-col sm:flex-row justify-around items-center text-center gap-6">
                <div>
                    <p className="text-muted-foreground text-lg">علامتك النهائية</p>
                     <div className="text-5xl font-bold text-primary">
                       <SmartTextRenderer as="div" text={`$${finalMark}$`} />
                       <span className="text-2xl text-muted-foreground">
                         /
                         <SmartTextRenderer as="span" text={`$${totalMarks}$`} />
                       </span>
                     </div>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5"/>
                        <SmartTextRenderer as="span" text={`$${correctAnswers}$ إجابات صحيحة`} />
                   </div>
                   <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <XCircle className="w-5 h-5"/>
                        <SmartTextRenderer as="span" text={`$${incorrectAnswers}$ إجابات خاطئة`} />
                   </div>
                </div>
            </div>

            {showDetails && (
                 <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-xl font-bold text-center">التفاصيل الكاملة للاختبار</h3>
                    {questions.map((question, index) => (
                        <div key={question.id} className={`p-4 rounded-lg border ${answers[index] === question.correctAnswerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        
                        <div className="flex gap-4 items-start flex-wrap">
                            <div className="flex-1 font-bold mb-2 min-w-[250px]"><SmartTextRenderer as="div" text={`السؤال $${index + 1}$: ${question.questionText}`} /></div>
                             {question.image && (
                                <div className="relative w-48 h-48 flex-shrink-0 mx-auto">
                                    <Image src={question.image} alt={`Question ${question.id}`} layout="fill" objectFit="contain" className="rounded-md" data-ai-hint={question.imageHint || "question diagram"} />
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-4">
                            {question.options.map((option, optionIndex) => {
                                const isCorrect = optionIndex === question.correctAnswerIndex;
                                const isSelected = optionIndex === answers[index];
                                return (
                                    <div key={optionIndex} className={`flex items-center gap-3 p-2 rounded-md text-sm ${isCorrect ? 'bg-green-200/50 text-green-800' : ''} ${isSelected && !isCorrect ? 'bg-red-200/50 text-red-800' : ''}`}>
                                        {isCorrect ? <CheckCircle className="w-4 h-4 text-green-600"/> : (isSelected ? <XCircle className="w-4 h-4 text-red-600"/> : <span className="w-4 h-4 flex-shrink-0"></span>)}
                                        <div className="font-bold">{optionLabels[optionIndex]})</div>
                                        <div className="flex-1"><SmartTextRenderer as="span" text={option} /></div>
                                        {isSelected && <span className="text-xs font-bold ms-auto">{'(إجابتك)'}</span>}
                                        {isCorrect && <span className="text-xs font-bold ms-auto">{'(الصحيحة)'}</span>}
                                    </div>
                                )
                            })}
                        </div>
                        <div className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-md" dir="rtl">
                            <p className="font-bold">الشرح:</p>
                            <HtmlRenderer htmlString={question.explanation} />
                        </div>
                        </div>
                    ))}
                 </div>
            )}
        </CardContent>
        <CardFooter className="flex-col sm:flex-row gap-2">
            <Button onClick={() => setShowDetails(!showDetails)} variant="secondary">
                <ListChecks className="me-2 h-4 w-4" />
                {showDetails ? 'إخفاء التفاصيل' : 'إظهار التفاصيل'}
            </Button>
            <Button onClick={restartQuiz} variant="outline">
                <Redo className="me-2 h-4 w-4" />
                إعادة الاختبار
            </Button>
        </CardFooter>
      </Card>
    );
  }


  return (
    <div className="min-h-screen bg-muted/40 flex flex-col">
        <header className="sticky top-0 z-10 w-full bg-background border-b">
             <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
                <div className="flex flex-col">
                     <p className="text-sm text-primary font-medium">الوحدة الثالثة: التيار الكهربائي</p>
                    <h1 className="text-2xl font-bold mt-1 flex items-center gap-3">
                        <ClipboardCheck className="w-7 h-7" />
                        اختبار الوحدة الثالثة
                    </h1>
                </div>
                 <div className="flex items-center gap-4">
                    <Button asChild variant="outline" size="sm">
                        <Link href="/courses/physics-supplementary-2007">
                          <ChevronLeft className="me-2 h-4 w-4" /> العودة إلى قائمة الدروس
                        </Link>
                    </Button>
                    <Logo className="h-12 w-auto hidden sm:block" />
                 </div>
            </div>
        </header>
        <main className="flex-1 w-full flex items-center justify-center p-4 sm:p-6 lg:p-8">
            <Card className="max-w-4xl mx-auto w-full">
            <CardHeader>
                <div className="flex justify-between items-center">
                    <CardTitle><SmartTextRenderer as="span" text={`السؤال $${currentQuestionIndex + 1}$ من $${questions.length}$`} /></CardTitle>
                    <div className={`font-mono text-lg p-2 rounded-md ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
                        <SmartTextRenderer as="span" text={formatTime(timeLeft)} />
                    </div>
                </div>
                <Progress value={progress} className="mt-2" />
            </CardHeader>
            <CardContent>
                <div className={`grid gap-6 items-start ${currentQuestion.image ? 'md:grid-cols-2' : 'md:grid-cols-1'}`}>
                    <div className="text-lg font-semibold space-y-4">
                    <SmartTextRenderer as="div" text={currentQuestion.questionText} />
                    </div>
                    {currentQuestion.image && (
                        <div className="relative w-48 h-48 mx-auto">
                            <Image src={currentQuestion.image} alt={`Question ${currentQuestion.id}`} layout="fill" objectFit="contain" className="rounded-lg shadow-md" data-ai-hint={currentQuestion.imageHint || 'question image'} />
                        </div>
                    )}
                </div>
                <RadioGroup
                key={currentQuestionIndex}
                value={answers[currentQuestionIndex]?.toString() ?? ""}
                onValueChange={handleAnswerChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6"
                dir="rtl"
                >
                {currentQuestion.options.map((option, index) => (
                    <Label key={index} htmlFor={`q${currentQuestion.id}-o${index}`} className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestion.id}-o${index}`} />
                    <span className="font-bold">{optionLabels[index]})</span>
                    <div className="flex-1 text-base"><SmartTextRenderer as="span" text={option} /></div>
                    </Label>
                ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between">
                <Button onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>
                    <ChevronRight className="ms-2 h-4 w-4" />
                    التالي
                </Button>
                {currentQuestionIndex === questions.length - 1 ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive">
                            إنهاء الاختبار
                            <CheckCircle className="ms-2 h-4 w-4" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد من إنهاء الاختبار؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                لا يمكنك تغيير إجاباتك بعد الإنهاء. سيتم عرض نتيجتك النهائية.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>إلغاء</AlertDialogCancel>
                            <AlertDialogAction onClick={finishQuiz} className="bg-destructive hover:bg-destructive/90">
                                نعم، قم بالإنهاء
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                ) : (
                <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                    السابق
                    <ChevronLeft className="me-2 h-4 w-4" />
                </Button>
                )}
            </CardFooter>
            </Card>
        </main>
    </div>
  );
}
