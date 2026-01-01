'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCcw, Timer, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

// Smart text renderer for LaTeX
const SmartText = ({ text, className = '' }: { text: string; className?: string }) => {
    const parts = text.split('$');
    return (
        <span className={className}>
            {parts.map((part, i) =>
                i % 2 === 0 ? (
                    <span key={i}>{part}</span>
                ) : (
                    <span key={i} dir="ltr" className="inline-block mx-1">
                        <InlineMath math={part} />
                    </span>
                )
            )}
        </span>
    );
};

// ─────────────────────────────────────────────────────────────
// MATCHING GAME
// ─────────────────────────────────────────────────────────────

interface MatchItem {
    id: string;
    term: string;
    definition: string;
}

interface MatchingGameProps {
    items: MatchItem[];
    title?: string;
    onComplete?: (score: number) => void;
}

export function MatchingGame({ items, title = "لعبة المطابقة", onComplete }: MatchingGameProps) {
    const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
    const [matches, setMatches] = useState<Record<string, string>>({});
    const [wrongMatch, setWrongMatch] = useState<string | null>(null);
    const [shuffledDefinitions, setShuffledDefinitions] = useState<MatchItem[]>([]);
    const [isComplete, setIsComplete] = useState(false);

    useEffect(() => {
        setShuffledDefinitions([...items].sort(() => Math.random() - 0.5));
    }, [items]);

    const handleTermClick = (termId: string) => {
        if (matches[termId]) return; // Already matched
        setSelectedTerm(termId);
        setWrongMatch(null);
    };

    const handleDefinitionClick = (defId: string) => {
        if (!selectedTerm) return;
        if (Object.values(matches).includes(defId)) return; // Already matched

        // Check if correct
        if (selectedTerm === defId) {
            setMatches({ ...matches, [selectedTerm]: defId });
            setSelectedTerm(null);

            // Check completion
            if (Object.keys(matches).length + 1 === items.length) {
                setIsComplete(true);
                onComplete?.(100);
            }
        } else {
            setWrongMatch(defId);
            setTimeout(() => setWrongMatch(null), 500);
        }
    };

    const handleReset = () => {
        setMatches({});
        setSelectedTerm(null);
        setWrongMatch(null);
        setIsComplete(false);
        setShuffledDefinitions([...items].sort(() => Math.random() - 0.5));
    };

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl">🎯</span>
                    {title}
                </h3>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleReset}
                    className="border-white/20 text-white hover:bg-white/10"
                >
                    <RefreshCcw className="w-4 h-4 me-2" />
                    إعادة
                </Button>
            </div>

            {isComplete ? (
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center py-12"
                >
                    <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                    <h4 className="text-2xl font-bold text-white mb-2">أحسنت! 🎉</h4>
                    <p className="text-white/60 mb-6">أكملت جميع المطابقات بنجاح</p>
                    <Button onClick={handleReset} className="bg-gradient-to-r from-purple-600 to-pink-600">
                        العب مرة أخرى
                    </Button>
                </motion.div>
            ) : (
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Terms Column */}
                    <div className="space-y-3">
                        <p className="text-white/50 text-sm mb-2">المصطلحات</p>
                        {items.map((item) => (
                            <motion.button
                                key={item.id}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleTermClick(item.id)}
                                disabled={!!matches[item.id]}
                                className={`w-full p-4 rounded-xl text-right transition-all ${matches[item.id]
                                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                                        : selectedTerm === item.id
                                            ? 'bg-purple-500/30 border-2 border-purple-500 text-white'
                                            : 'bg-white/5 border-2 border-white/10 text-white hover:border-white/30'
                                    }`}
                            >
                                <SmartText text={item.term} />
                                {matches[item.id] && <CheckCircle2 className="inline-block w-5 h-5 ms-2 text-green-400" />}
                            </motion.button>
                        ))}
                    </div>

                    {/* Definitions Column */}
                    <div className="space-y-3">
                        <p className="text-white/50 text-sm mb-2">التعريفات</p>
                        {shuffledDefinitions.map((item) => (
                            <motion.button
                                key={item.id + '-def'}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleDefinitionClick(item.id)}
                                disabled={Object.values(matches).includes(item.id)}
                                className={`w-full p-4 rounded-xl text-right transition-all ${Object.values(matches).includes(item.id)
                                        ? 'bg-green-500/20 border-2 border-green-500 text-green-400'
                                        : wrongMatch === item.id
                                            ? 'bg-red-500/30 border-2 border-red-500 text-red-400 animate-shake'
                                            : 'bg-white/5 border-2 border-white/10 text-white hover:border-white/30'
                                    }`}
                            >
                                <SmartText text={item.definition} />
                                {Object.values(matches).includes(item.id) && <CheckCircle2 className="inline-block w-5 h-5 ms-2 text-green-400" />}
                            </motion.button>
                        ))}
                    </div>
                </div>
            )}

            {/* Progress */}
            {!isComplete && (
                <div className="mt-6">
                    <div className="flex items-center justify-between text-sm text-white/50 mb-2">
                        <span>التقدم</span>
                        <span>{Object.keys(matches).length} / {items.length}</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                            animate={{ width: `${(Object.keys(matches).length / items.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// FILL IN THE BLANKS GAME
// ─────────────────────────────────────────────────────────────

interface FillBlankQuestion {
    id: string;
    sentence: string; // Use ___ for blank
    answer: string;
    options: string[];
}

interface FillBlanksGameProps {
    questions: FillBlankQuestion[];
    title?: string;
    onComplete?: (score: number) => void;
}

export function FillBlanksGame({ questions, title = "أكمل الفراغ", onComplete }: FillBlanksGameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<string, string>>({});
    const [showResult, setShowResult] = useState(false);

    const currentQuestion = questions[currentIndex];

    const handleAnswer = (answer: string) => {
        setAnswers({ ...answers, [currentQuestion.id]: answer });
        setShowResult(true);

        setTimeout(() => {
            setShowResult(false);
            if (currentIndex < questions.length - 1) {
                setCurrentIndex(currentIndex + 1);
            }
        }, 1500);
    };

    const isCorrect = answers[currentQuestion.id] === currentQuestion.answer;
    const score = Object.entries(answers).filter(([id, ans]) =>
        questions.find(q => q.id === id)?.answer === ans
    ).length;

    const allComplete = Object.keys(answers).length === questions.length && !showResult;

    if (allComplete) {
        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
            >
                <div className="text-6xl mb-4">{score === questions.length ? '🏆' : score > questions.length / 2 ? '🎯' : '💪'}</div>
                <h4 className="text-2xl font-bold text-white mb-2">
                    {score === questions.length ? 'ممتاز!' : score > questions.length / 2 ? 'جيد جداً!' : 'حاول مرة أخرى'}
                </h4>
                <p className="text-white/60 mb-6">
                    نتيجتك: {score} / {questions.length}
                </p>
                <Button
                    onClick={() => { setAnswers({}); setCurrentIndex(0); }}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                >
                    إعادة المحاولة
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <span className="text-2xl">✏️</span>
                    {title}
                </h3>
                <span className="text-white/50 text-sm">
                    {currentIndex + 1} / {questions.length}
                </span>
            </div>

            <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-8">
                    {/* Sentence with blank */}
                    <p className="text-xl text-white mb-8 leading-relaxed text-center">
                        {currentQuestion.sentence.split('___').map((part, i, arr) => (
                            <span key={i}>
                                <SmartText text={part} />
                                {i < arr.length - 1 && (
                                    <span className={`inline-block min-w-[100px] border-b-2 mx-2 px-2 ${showResult
                                            ? isCorrect ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
                                            : 'border-purple-500'
                                        }`}>
                                        {answers[currentQuestion.id] || '______'}
                                    </span>
                                )}
                            </span>
                        ))}
                    </p>

                    {/* Options */}
                    <div className="grid grid-cols-2 gap-4">
                        {currentQuestion.options.map((option, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => !showResult && handleAnswer(option)}
                                disabled={showResult}
                                className={`p-4 rounded-xl border-2 transition-all ${showResult && option === currentQuestion.answer
                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                        : showResult && answers[currentQuestion.id] === option && !isCorrect
                                            ? 'bg-red-500/20 border-red-500 text-red-400'
                                            : 'bg-white/5 border-white/20 text-white hover:border-purple-500'
                                    }`}
                            >
                                <SmartText text={option} />
                            </motion.button>
                        ))}
                    </div>

                    {/* Result Feedback */}
                    <AnimatePresence>
                        {showResult && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0 }}
                                className={`mt-6 p-4 rounded-xl text-center ${isCorrect ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                    }`}
                            >
                                {isCorrect ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <CheckCircle2 className="w-5 h-5" /> صحيح!
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <XCircle className="w-5 h-5" /> الإجابة الصحيحة: <SmartText text={currentQuestion.answer} />
                                    </span>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>

            {/* Progress */}
            <div className="mt-6">
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                        animate={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                        transition={{ duration: 0.3 }}
                    />
                </div>
            </div>
        </div>
    );
}

// ─────────────────────────────────────────────────────────────
// QUICK QUIZ GAME  
// ─────────────────────────────────────────────────────────────

interface QuickQuizQuestion {
    id: string;
    question: string;
    options: string[];
    correctIndex: number;
    timeLimit?: number; // seconds
}

interface QuickQuizGameProps {
    questions: QuickQuizQuestion[];
    title?: string;
    timePerQuestion?: number;
    onComplete?: (score: number, time: number) => void;
}

export function QuickQuizGame({
    questions,
    title = "اختبار سريع",
    timePerQuestion = 15,
    onComplete
}: QuickQuizGameProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timePerQuestion);
    const [answered, setAnswered] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
    const [isComplete, setIsComplete] = useState(false);
    const [totalTime, setTotalTime] = useState(0);

    const currentQuestion = questions[currentIndex];

    useEffect(() => {
        if (answered || isComplete) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    handleTimeout();
                    return timePerQuestion;
                }
                return prev - 1;
            });
            setTotalTime((prev) => prev + 1);
        }, 1000);

        return () => clearInterval(timer);
    }, [currentIndex, answered, isComplete]);

    const handleTimeout = () => {
        setAnswered(true);
        setTimeout(() => moveToNext(), 1500);
    };

    const handleAnswer = (index: number) => {
        if (answered) return;
        setSelectedIndex(index);
        setAnswered(true);

        if (index === currentQuestion.correctIndex) {
            setScore(score + 1);
        }

        setTimeout(() => moveToNext(), 1500);
    };

    const moveToNext = () => {
        if (currentIndex < questions.length - 1) {
            setCurrentIndex(currentIndex + 1);
            setAnswered(false);
            setSelectedIndex(null);
            setTimeLeft(timePerQuestion);
        } else {
            setIsComplete(true);
            onComplete?.(score + (selectedIndex === currentQuestion.correctIndex ? 1 : 0), totalTime);
        }
    };

    const handleRestart = () => {
        setCurrentIndex(0);
        setScore(0);
        setTimeLeft(timePerQuestion);
        setAnswered(false);
        setSelectedIndex(null);
        setIsComplete(false);
        setTotalTime(0);
    };

    if (isComplete) {
        const finalScore = score;
        const percentage = Math.round((finalScore / questions.length) * 100);

        return (
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-12"
            >
                <div className="text-7xl mb-4">
                    {percentage >= 80 ? '🏆' : percentage >= 60 ? '🎯' : percentage >= 40 ? '💪' : '📚'}
                </div>
                <h4 className="text-3xl font-bold text-white mb-2">
                    {percentage}%
                </h4>
                <p className="text-xl text-white/60 mb-2">
                    {finalScore} / {questions.length} إجابة صحيحة
                </p>
                <p className="text-sm text-white/40 mb-8">
                    الوقت: {Math.floor(totalTime / 60)}:{(totalTime % 60).toString().padStart(2, '0')}
                </p>
                <Button onClick={handleRestart} className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <RefreshCcw className="w-4 h-4 me-2" />
                    حاول مرة أخرى
                </Button>
            </motion.div>
        );
    }

    return (
        <div className="py-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-3">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    {title}
                </h3>
                <div className="flex items-center gap-4">
                    <span className="text-white/50 text-sm">
                        {currentIndex + 1} / {questions.length}
                    </span>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full ${timeLeft <= 5 ? 'bg-red-500/20 text-red-400' : 'bg-white/10 text-white'
                        }`}>
                        <Timer className="w-4 h-4" />
                        {timeLeft}
                    </span>
                </div>
            </div>

            {/* Timer Bar */}
            <div className="h-1 bg-white/10 rounded-full mb-6 overflow-hidden">
                <motion.div
                    className={`h-full ${timeLeft <= 5 ? 'bg-red-500' : 'bg-gradient-to-r from-green-500 to-emerald-500'}`}
                    animate={{ width: `${(timeLeft / timePerQuestion) * 100}%` }}
                    transition={{ duration: 0.3 }}
                />
            </div>

            <Card className="bg-slate-800/50 border-white/10">
                <CardContent className="p-8">
                    <p className="text-xl text-white mb-8 text-center">
                        <SmartText text={currentQuestion.question} />
                    </p>

                    <div className="grid gap-3">
                        {currentQuestion.options.map((option, i) => (
                            <motion.button
                                key={i}
                                whileHover={!answered ? { scale: 1.02 } : {}}
                                whileTap={!answered ? { scale: 0.98 } : {}}
                                onClick={() => handleAnswer(i)}
                                disabled={answered}
                                className={`p-4 rounded-xl border-2 text-right transition-all ${answered && i === currentQuestion.correctIndex
                                        ? 'bg-green-500/20 border-green-500 text-green-400'
                                        : answered && selectedIndex === i && i !== currentQuestion.correctIndex
                                            ? 'bg-red-500/20 border-red-500 text-red-400'
                                            : 'bg-white/5 border-white/20 text-white hover:border-purple-500'
                                    }`}
                            >
                                <SmartText text={option} />
                            </motion.button>
                        ))}
                    </div>
                </CardContent>
            </Card>

            {/* Score */}
            <div className="mt-6 text-center">
                <span className="text-white/50">النتيجة الحالية: </span>
                <span className="text-white font-bold">{score}</span>
            </div>
        </div>
    );
}
