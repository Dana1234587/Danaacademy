
'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Redo, XCircle, ListChecks, Info, Rocket, BrainCircuit, BookOpen, Clock, Calculator, Pencil, ClipboardCheck, HelpCircle, Loader2, Eye, Image as ImageIcon } from 'lucide-react';
import Image from 'next/image';
import type { ExamWithQuestions } from './actions';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';
import { useStore } from '@/store/app-store';
import { submitExamAction } from './actions';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

// A robust, universal renderer for bidirectional text
const SmartTextRenderer = ({ text, as: Wrapper = 'p' }: { text: string; as?: React.ElementType }) => {
    if (!text) return null;
    const lines = text.split('\n');

    const renderPart = (part: string, index: number) => {
        // Even indices are text, odd are math
        if (index % 2 === 0) {
            return <span key={index}>{part}</span>;
        } else {
            // This is LaTeX
            return <span key={index} dir="ltr" className="inline-block mx-1"><InlineMath math={part} /></span>;
        }
    };
    
    return (
        <Wrapper className="leading-relaxed" dir="rtl">
            {lines.map((line, lineIndex) => (
                <React.Fragment key={lineIndex}>
                    {line.split('$').map(renderPart)}
                    {lineIndex < lines.length - 1 && <br />}
                </React.Fragment>
            ))}
        </Wrapper>
    );
};


export function ExamClient({ exam, submission }: { exam: ExamWithQuestions, submission: any | null }) {
  const { currentUser } = useStore();
  const router = useRouter();
  const { toast } = useToast();

  const isReviewMode = !!submission;
  const isAdminPreview = currentUser?.role === 'admin' && !isReviewMode;

  const [quizState, setQuizState] = useState<'not-started' | 'active' | 'finished'>(isReviewMode ? 'finished' : 'not-started');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(isReviewMode && submission ? submission.answers : new Array(exam.questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(exam.duration * 60);
  const [score, setScore] = useState(isReviewMode && submission ? submission.score : 0);
  const [showDetails, setShowDetails] = useState(isReviewMode);
  const [isSubmitting, setIsSubmitting] = useState(false);


  const finishQuiz = useCallback(async () => {
      let calculatedScore = 0;
      answers.forEach((answer, index) => {
          if (answer === exam.questions[index].correctAnswerIndex) {
              calculatedScore++;
          }
      });
      setScore(calculatedScore);
      setQuizState('finished');
      setShowDetails(true);

      // Don't save submission for admins or if in review mode
      if (isAdminPreview || isReviewMode) return;

      setIsSubmitting(true);

      if (!currentUser) {
          toast({ variant: "destructive", title: "خطأ", description: "يجب تسجيل الدخول لحفظ النتيجة." });
          setIsSubmitting(false);
          return;
      }
      
      const result = await submitExamAction({
          studentId: currentUser.uid,
          studentName: currentUser.username,
          examId: exam.id,
          examTitle: exam.title,
          courseId: exam.courseId,
          score: calculatedScore,
          totalQuestions: exam.questions.length,
          answers: answers,
          submittedAt: new Date()
      });

      setIsSubmitting(false);

      if (!result.success) {
          toast({ variant: 'destructive', title: 'فشل حفظ النتيجة', description: result.error });
      }

  }, [answers, exam, currentUser, toast, isReviewMode, isAdminPreview]);

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
  }, [quizState, finishQuiz]);

  const handleNext = () => {
    if (currentQuestionIndex < exam.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerChange = (value: string) => {
    if (isReviewMode) return;
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = parseInt(value, 10);
    setAnswers(newAnswers);
  };
  
  const startQuiz = () => {
    setTimeLeft(exam.duration * 60);
    setQuizState('active');
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = exam.questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / exam.questions.length) * 100;
  
 if (quizState === 'not-started') {
    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Card className="max-w-2xl mx-auto border-primary/20 shadow-lg">
                <CardHeader className="text-center p-8">
                    <div className="mx-auto bg-primary/10 p-4 rounded-full w-fit mb-4">
                        <ClipboardCheck className="w-12 h-12 text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-primary">{exam.title}</CardTitle>
                    <CardDescription className="text-muted-foreground text-lg mt-2">
                       {exam.description || `استعد لاختبار معلوماتك في ${exam.title}.`}
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6 px-8">
                    <div className="grid grid-cols-2 gap-6 text-center">
                        <div className="bg-muted/50 p-4 rounded-lg">
                            <HelpCircle className="w-8 h-8 text-primary mx-auto mb-2" />
                            <h4 className="font-bold">عدد الأسئلة</h4>
                            <p className="text-muted-foreground"><SmartTextRenderer as="span" text={`$${exam.questions.length}$ سؤال`} /></p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg">
                            <Clock className="w-8 h-8 text-primary mx-auto mb-2" />
                            <h4 className="font-bold">المدة</h4>
                            <p className="text-muted-foreground"><SmartTextRenderer as="span" text={`$${exam.duration}$ دقيقة`} /></p>
                        </div>
                    </div>
                    <Alert variant="destructive" className="bg-destructive/5 border-destructive/20">
                        <AlertTriangle className="h-5 w-5 text-destructive" />
                        <AlertTitle className="font-bold">تعليمات هامة</AlertTitle>
                        <AlertDescription>
                          بمجرد بدء الاختبار، سيبدأ عداد الوقت ولن يتوقف. تأكد من أنك في مكان هادئ ومستعد للتركيز.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter className="p-8 flex-col gap-4">
                    <Button onClick={startQuiz} className="w-full text-lg py-6" size="lg">
                        <Rocket className="me-2 w-5 h-5" />
                        {isAdminPreview ? "بدء المعاينة كمسؤول" : "ابدأ الاختبار الآن"}
                    </Button>
                    <Button variant="outline" className="w-full" asChild>
                        <Link href="/my-exams">العودة لقائمة الامتحانات</Link>
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }


  if (quizState === 'finished') {
    const correctAnswers = score;
    const incorrectAnswers = exam.questions.length - correctAnswers;
    const finalMark = correctAnswers * 4;
    const totalMarks = exam.questions.length * 4;

    return (
        <div className="min-h-screen bg-muted/40 flex items-center justify-center p-4">
            <Card className="max-w-4xl mx-auto w-full">
                <CardHeader className="text-center">
                <CardTitle>النتيجة النهائية</CardTitle>
                <CardDescription>
                    {isReviewMode ? "مراجعة إجاباتك." : isAdminPreview ? "تمت المعاينة بنجاح. لم يتم حفظ هذه النتيجة." : "لقد أنهيت الاختبار بنجاح. هذه هي نتيجتك."}
                </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="p-6 bg-muted rounded-lg border flex flex-col sm:flex-row justify-around items-center text-center gap-6">
                        <div>
                            <p className="text-muted-foreground text-lg">علامتك النهائية</p>
                             <div className="text-5xl font-bold text-primary flex items-baseline justify-center gap-1">
                               <SmartTextRenderer as="span" text={`$${finalMark}$`} />
                               <span className="text-2xl text-muted-foreground">
                                 / <SmartTextRenderer as="span" text={`$${totalMarks}$`} />
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
                            <h3 className="text-xl font-bold text-center">مراجعة الإجابات</h3>
                            {exam.questions.map((question, index) => {
                                const studentAnswerIndex = answers[index];
                                const isCorrect = studentAnswerIndex === question.correctAnswerIndex;
                                return (
                                    <div key={question.id} className={`p-4 rounded-lg border ${isCorrect ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                                    <div className="font-bold mb-2"><SmartTextRenderer as="div" text={`السؤال $${index + 1}$: ${question.text}`} /></div>
                                    {question.imageUrl && (
                                        <div className="my-4 flex justify-center">
                                            <Image src={question.imageUrl} alt={`Question ${question.id}`} width={300} height={200} className="rounded-md" />
                                        </div>
                                    )}
                                    <div className="space-y-2 text-sm">
                                        {question.options.map((option, optionIndex) => {
                                            const isCorrectOption = optionIndex === question.correctAnswerIndex;
                                            const isSelected = optionIndex === studentAnswerIndex;
                                            return (
                                                <div key={optionIndex} className={`flex items-center gap-2 p-2 rounded-md ${isCorrectOption ? 'bg-green-200/50 text-green-800' : ''} ${isSelected && !isCorrectOption ? 'bg-red-200/50 text-red-800' : ''}`}>
                                                    {isCorrectOption ? <CheckCircle className="w-4 h-4 text-green-600"/> : (isSelected ? <XCircle className="w-4 h-4 text-red-600"/> : <span className="w-4 h-4"></span>)}
                                                    <div className="flex-1"><SmartTextRenderer as="span" text={option.text} /></div>
                                                    {isSelected && <span className="text-xs font-bold ms-auto">{'(إجابتك)'}</span>}
                                                </div>
                                            )
                                        })}
                                    </div>
                                    {question.explanation && (
                                        <div className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-md" dir="rtl">
                                            <p className="font-bold text-foreground">الشرح:</p>
                                            <SmartTextRenderer as="div" text={question.explanation}/>
                                             {question.explanationImageUrl && <Image src={question.explanationImageUrl} alt="Explanation" width={250} height={150} className="rounded-md mt-2" />}
                                        </div>
                                    )}
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </CardContent>
                <CardFooter className="flex-col sm:flex-row gap-2">
                     <Button onClick={() => setShowDetails(!showDetails)} variant="secondary">
                        <Eye className="me-2 h-4 w-4" />
                        {showDetails ? 'إخفاء مراجعة الإجابات' : 'إظهار مراجعة الإجابات'}
                    </Button>
                    <Button onClick={() => router.push(currentUser?.role === 'admin' ? '/admin/exams' : '/my-exams')} variant="default">
                        العودة للامتحانات
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
  }


  return (
     <div className="min-h-screen bg-muted/40 p-4">
        <Card className="max-w-4xl mx-auto my-8">
            <CardHeader className="border-b">
                <div className="flex justify-between items-center flex-wrap gap-4">
                    <div>
                        <CardTitle className="text-2xl">{exam.title}</CardTitle>
                        <CardDescription>
                           <SmartTextRenderer as="span" text={`السؤال $${currentQuestionIndex + 1}$ من $${exam.questions.length}$`} />
                        </CardDescription>
                    </div>
                    <div className={`font-mono text-xl p-2 rounded-md border ${timeLeft < 60 ? 'text-destructive bg-destructive/10 border-destructive/20 animate-pulse' : 'text-foreground bg-muted'}`}>
                        <SmartTextRenderer as="span" text={formatTime(timeLeft)} />
                    </div>
                </div>
                <Progress value={progress} className="mt-4" />
            </CardHeader>
            <CardContent className="p-6">
                <div className="text-lg font-semibold mb-6">
                    <SmartTextRenderer as="div" text={currentQuestion.text} />
                </div>
                {currentQuestion.imageUrl && (
                    <div className="relative w-full h-64 mb-6">
                        <Image src={currentQuestion.imageUrl} alt={`Question ${currentQuestion.id}`} layout="fill" objectFit="contain" className="rounded-lg" />
                    </div>
                )}

                <RadioGroup
                key={currentQuestion.id}
                value={answers[currentQuestionIndex]?.toString() ?? ""}
                onValueChange={handleAnswerChange}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                dir="rtl"
                >
                {currentQuestion.options.map((option, index) => (
                    <Label key={index} htmlFor={`q${currentQuestion.id}-o${index}`} className="flex items-start gap-4 border p-4 rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary has-[:checked]:ring-2 has-[:checked]:ring-primary/50 transition-all">
                    <RadioGroupItem value={index.toString()} id={`q${currentQuestion.id}-o${index}`} className="mt-1" />
                     <div className="flex-1 text-base">
                        <SmartTextRenderer as="span" text={option.text} />
                        {option.imageUrl && <Image src={option.imageUrl} alt={`Option ${index + 1}`} width={200} height={120} className="rounded-md mt-2" />}
                    </div>
                    </Label>
                ))}
                </RadioGroup>
            </CardContent>
            <CardFooter className="flex justify-between border-t p-6">
                <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
                    <ChevronRight className="me-2 h-4 w-4" />
                    السابق
                </Button>
                {currentQuestionIndex === exam.questions.length - 1 ? (
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button variant="destructive" disabled={isSubmitting}>
                           {isSubmitting ? <Loader2 className="me-2 h-4 w-4 animate-spin"/> : <CheckCircle className="me-2 h-4 w-4" />}
                           {isAdminPreview ? "إنهاء المعاينة" : "إنهاء وتسليم"}
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>هل أنت متأكد من إنهاء الاختبار؟</AlertDialogTitle>
                            <AlertDialogDescription>
                                لا يمكنك تغيير إجاباتك بعد التسليم. سيتم حساب نتيجتك النهائية.
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
                <Button onClick={handleNext}>
                    التالي
                    <ChevronLeft className="ms-2 h-4 w-4" />
                </Button>
                )}
            </CardFooter>
        </Card>
    </div>
  );
}
