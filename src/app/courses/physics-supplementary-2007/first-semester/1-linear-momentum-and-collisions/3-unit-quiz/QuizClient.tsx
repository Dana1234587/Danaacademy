
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Redo, XCircle, ListChecks, Info } from 'lucide-react';
import Image from 'next/image';
import type { QuizQuestion } from './quiz-data';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes

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
        <Card className="max-w-3xl mx-auto">
            <CardHeader>
                <CardTitle>تعليمات الاختبار</CardTitle>
                <CardDescription>يرجى قراءة التعليمات التالية بعناية قبل البدء.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                 <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>تفاصيل الاختبار</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                           <li>عدد الأسئلة: {questions.length} سؤال.</li>
                           <li>مدة الاختبار: 60 دقيقة.</li>
                           <li>علامة كل سؤال: 4 علامات (المجموع الكلي: {questions.length * 4} علامة).</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                <Alert variant="destructive">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertTitle>نصائح هامة</AlertTitle>
                    <AlertDescription>
                        <ul className="list-disc list-inside space-y-2 mt-2">
                            <li>تأكد من وجود ورقة وقلم بجانبك للحل.</li>
                            <li>احضر آلة حاسبة.</li>
                            <li>للحصول على تقييم دقيق لمستواك، تأكد من أنك قد راجعت وحدة "الزخم الخطي والتصادمات" بشكل كامل.</li>
                        </ul>
                    </AlertDescription>
                </Alert>
                 <p className="text-sm text-muted-foreground text-center">
                    سيبدأ المؤقت بالعد التنازلي فور ضغطك على زر "ابدأ الاختبار الآن". بالتوفيق!
                 </p>
            </CardContent>
            <CardFooter>
                <Button onClick={startQuiz} className="w-full" size="lg">ابدأ الاختبار الآن</Button>
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
      <Card className="max-w-3xl mx-auto">
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
                    <p className="text-5xl font-bold text-primary">{finalMark}<span className="text-2xl text-muted-foreground">/{totalMarks}</span></p>
                </div>
                <div className="space-y-2">
                   <div className="flex items-center gap-2 text-green-600 font-semibold">
                        <CheckCircle className="w-5 h-5"/>
                        <span>{correctAnswers} إجابات صحيحة</span>
                   </div>
                   <div className="flex items-center gap-2 text-red-600 font-semibold">
                        <XCircle className="w-5 h-5"/>
                        <span>{incorrectAnswers} إجابات خاطئة</span>
                   </div>
                </div>
            </div>

            {showDetails && (
                 <div className="space-y-6 pt-6 border-t">
                    <h3 className="text-xl font-bold text-center">التفاصيل الكاملة للاختبار</h3>
                    {questions.map((question, index) => (
                        <div key={question.id} className={`p-4 rounded-lg border ${answers[index] === question.correctAnswerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
                        <p className="font-bold mb-2">السؤال {index + 1}: {question.questionText}</p>
                        {question.image && (
                            <div className="my-4 flex justify-center">
                                <Image src={question.image} alt={`Question ${question.id}`} width={300} height={200} className="rounded-md" data-ai-hint={question.imageHint || "question diagram"} />
                            </div>
                        )}
                        <div className="space-y-2 text-sm">
                            {question.options.map((option, optionIndex) => {
                                const isCorrect = optionIndex === question.correctAnswerIndex;
                                const isSelected = optionIndex === answers[index];
                                return (
                                    <div key={optionIndex} className={`flex items-center gap-2 p-2 rounded-md ${isCorrect ? 'bg-green-200/50 text-green-800' : ''} ${isSelected && !isCorrect ? 'bg-red-200/50 text-red-800' : ''}`}>
                                        {isCorrect ? <CheckCircle className="w-4 h-4 text-green-600"/> : (isSelected ? <XCircle className="w-4 h-4 text-red-600"/> : <span className="w-4 h-4"></span>)}
                                        <span>{option}</span>
                                        {isSelected && <span className="text-xs font-bold ms-auto">{'(إجابتك)'}</span>}
                                        {isCorrect && <span className="text-xs font-bold ms-auto">{'(الإجابة الصحيحة)'}</span>}
                                    </div>
                                )
                            })}
                        </div>
                        <p className="mt-4 text-sm text-muted-foreground bg-muted p-3 rounded-md"><span className="font-bold">الشرح:</span> {question.explanation}</p>
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
    <Card className="max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
            <CardTitle>السؤال {currentQuestionIndex + 1} من {questions.length}</CardTitle>
            <div className={`font-mono text-lg p-2 rounded-md ${timeLeft < 60 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
                {formatTime(timeLeft)}
            </div>
        </div>
        <Progress value={progress} className="mt-2" />
      </CardHeader>
      <CardContent>
        <p className="text-lg font-semibold mb-4 text-center">{currentQuestion.questionText}</p>
        {currentQuestion.image && (
            <div className="my-6 flex justify-center">
                <Image src={currentQuestion.image} alt={`Question ${currentQuestion.id}`} width={400} height={250} className="rounded-lg shadow-md" data-ai-hint={currentQuestion.imageHint || 'question image'} />
            </div>
        )}
        <RadioGroup
          key={currentQuestionIndex}
          value={answers[currentQuestionIndex]?.toString() ?? ""}
          onValueChange={handleAnswerChange}
          className="space-y-4"
        >
          {currentQuestion.options.map((option, index) => (
            <Label key={index} htmlFor={`q${currentQuestion.id}-o${index}`} className="flex items-center gap-4 border p-4 rounded-lg cursor-pointer hover:bg-accent has-[:checked]:bg-primary/10 has-[:checked]:border-primary">
              <RadioGroupItem value={index.toString()} id={`q${currentQuestion.id}-o${index}`} />
              <span className="flex-1 text-base">{option}</span>
            </Label>
          ))}
        </RadioGroup>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button onClick={handlePrevious} disabled={currentQuestionIndex === 0} variant="outline">
            <ChevronLeft className="me-2 h-4 w-4" />
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
          <Button onClick={handleNext}>
            السابق
            <ChevronRight className="ms-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}

