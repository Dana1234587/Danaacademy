
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { AlertTriangle, CheckCircle, ChevronLeft, ChevronRight, Redo, XCircle } from 'lucide-react';
import Image from 'next/image';
import type { QuizQuestion } from './quiz-data';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';

const QUIZ_DURATION_SECONDS = 60 * 60; // 60 minutes

export function QuizClient({ questions }: { questions: QuizQuestion[] }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(new Array(questions.length).fill(null));
  const [timeLeft, setTimeLeft] = useState(QUIZ_DURATION_SECONDS);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (isFinished) return;

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
  }, [isFinished]);

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
      setIsFinished(true);
  };

  const restartQuiz = () => {
      setCurrentQuestionIndex(0);
      setAnswers(new Array(questions.length).fill(null));
      setTimeLeft(QUIZ_DURATION_SECONDS);
      setIsFinished(false);
      setScore(0);
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  if (isFinished) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>النتيجة النهائية</CardTitle>
          <CardDescription>
            لقد حصلت على {score} من {questions.length} بشكل صحيح.
            علامتك هي: {((score / questions.length) * 100).toFixed(2)}%.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {questions.map((question, index) => (
            <div key={question.id} className={`p-4 rounded-lg border ${answers[index] === question.correctAnswerIndex ? 'border-green-500 bg-green-500/10' : 'border-red-500 bg-red-500/10'}`}>
              <p className="font-bold mb-2">السؤال {index + 1}: {question.questionText}</p>
              {question.image && (
                  <div className="my-4 flex justify-center">
                    <Image src={question.image} alt={`Question ${question.id}`} width={300} height={200} className="rounded-md" data-ai-hint={question.imageHint || "question diagram"} />
                  </div>
              )}
              <div className="flex items-center gap-4 text-sm">
                <div className={`flex items-center gap-1 ${answers[index] === question.correctAnswerIndex ? 'text-green-700' : 'text-red-700'}`}>
                    {answers[index] === question.correctAnswerIndex ? <CheckCircle className="w-4 h-4"/> : <XCircle className="w-4 h-4"/>}
                    <span>إجابتك: {answers[index] !== null ? question.options[answers[index]!] : 'لم تجب'}</span>
                </div>
                 {answers[index] !== question.correctAnswerIndex && (
                     <div className="flex items-center gap-1 text-green-700">
                        <CheckCircle className="w-4 h-4"/>
                        <span>الإجابة الصحيحة: {question.options[question.correctAnswerIndex]}</span>
                     </div>
                 )}
              </div>
              <p className="mt-3 text-sm text-muted-foreground bg-muted p-2 rounded-md"><span className="font-bold">الشرح:</span> {question.explanation}</p>
            </div>
          ))}
        </CardContent>
        <CardFooter>
            <Button onClick={restartQuiz}>
                <Redo className="me-2 h-4 w-4" />
                إعادة الاختبار
            </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
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
          <ChevronRight className="me-2 h-4 w-4" />
          السابق
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
            التالي
            <ChevronLeft className="ms-2 h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
