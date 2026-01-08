'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
    Zap, Battery, ToggleLeft, ToggleRight, Gauge, BookOpen,
    Gamepad2, Trophy, CheckCircle, XCircle, ArrowRight, RotateCcw,
    Lightbulb, TrendingUp, Eye, EyeOff
} from 'lucide-react';
import { cn } from '@/lib/utils';

// ==================== TYPES ====================
interface QuizQuestion {
    id: string;
    type: 'conceptual' | 'calculation' | 'direction';
    difficulty: 'easy' | 'medium' | 'hard';
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
    hint?: string;
}

// ==================== QUIZ QUESTIONS ====================
const quizQuestions: QuizQuestion[] = [
    // Easy - Conceptual
    {
        id: 'e1',
        type: 'conceptual',
        difficulty: 'easy',
        question: 'ما هي وحدة قياس المواسعة الكهربائية؟',
        options: ['Volt (V)', 'Farad (F)', 'Coulomb (C)', 'Joule (J)'],
        correctIndex: 1,
        explanation: 'وحدة المواسعة هي الفاراد (F)، وتُعرّف بأنها: 1F = 1C/1V',
    },
    {
        id: 'e2',
        type: 'direction',
        difficulty: 'easy',
        question: 'ما اتجاه خطوط المجال الكهربائي داخل المواسع؟',
        options: ['من السالب إلى الموجب', 'من الموجب إلى السالب', 'دائرية', 'لا يوجد مجال'],
        correctIndex: 1,
        explanation: 'خطوط المجال الكهربائي تتجه دائماً من الشحنة الموجبة (+) إلى الشحنة السالبة (-)',
    },
    {
        id: 'e3',
        type: 'conceptual',
        difficulty: 'easy',
        question: 'ماذا يحدث للشحنة على المواسع عند زيادة فرق الجهد؟',
        options: ['تنقص', 'تبقى ثابتة', 'تزداد', 'تصبح صفر'],
        correctIndex: 2,
        explanation: 'من القانون Q = CV، عند زيادة V مع ثبات C، تزداد الشحنة Q طردياً',
    },
    // Medium - Calculations
    {
        id: 'm1',
        type: 'calculation',
        difficulty: 'medium',
        question: 'مواسع سعته 10μF وفرق الجهد عليه 20V، ما مقدار الشحنة المخزنة؟',
        options: ['0.2 mC', '2 mC', '200 μC', '20 μC'],
        correctIndex: 2,
        explanation: 'Q = CV = 10×10⁻⁶ × 20 = 200×10⁻⁶ = 200μC',
        hint: 'استخدم القانون Q = CV',
    },
    {
        id: 'm2',
        type: 'calculation',
        difficulty: 'medium',
        question: 'مواسع يخزن شحنة 50μC عند جهد 10V، ما مقدار سعته؟',
        options: ['5 μF', '500 μF', '0.5 μF', '50 μF'],
        correctIndex: 0,
        explanation: 'C = Q/V = 50×10⁻⁶ / 10 = 5×10⁻⁶ = 5μF',
        hint: 'أعد ترتيب القانون: C = Q/V',
    },
    {
        id: 'm3',
        type: 'calculation',
        difficulty: 'medium',
        question: 'ما طاقة الوضع المخزنة في مواسع 4μF عند جهد 50V؟',
        options: ['5 mJ', '10 mJ', '2.5 mJ', '1 mJ'],
        correctIndex: 0,
        explanation: 'PE = ½CV² = ½ × 4×10⁻⁶ × (50)² = ½ × 4×10⁻⁶ × 2500 = 5×10⁻³ = 5mJ',
        hint: 'استخدم PE = ½CV²',
    },
    // Hard - Advanced
    {
        id: 'h1',
        type: 'calculation',
        difficulty: 'hard',
        question: 'مواسع مشحون بـ 100μC مفصول عن البطارية. إذا تضاعفت المسافة بين الصفيحتين، ما التغير في طاقة الوضع؟',
        options: ['تتضاعف', 'تتنصّف', 'تبقى ثابتة', 'تصبح 4 أضعاف'],
        correctIndex: 0,
        explanation: 'مفصول → Q ثابت، PE = ½Q²/C. عند مضاعفة d، تتنصف C. بما أن PE ∝ 1/C، فإن PE تتضاعف!',
        hint: 'Q ثابت لأنه مفصول، استخدم PE = ½Q²/C',
    },
    {
        id: 'h2',
        type: 'conceptual',
        difficulty: 'hard',
        question: 'مواسع متصل ببطارية 12V. إذا ضاعفنا المساحة، ماذا يحدث للطاقة المخزنة؟',
        options: ['تتنصف', 'تتضاعف', 'تبقى ثابتة', 'تصبح 4 أضعاف'],
        correctIndex: 1,
        explanation: 'متصل → V ثابت، PE = ½CV². عند مضاعفة A، تتضاعف C. بما أن PE ∝ C، فإن PE تتضاعف!',
        hint: 'V ثابت لأنه متصل، استخدم PE = ½CV²',
    },
    {
        id: 'h3',
        type: 'calculation',
        difficulty: 'hard',
        question: 'من الرسم البياني Q-V، إذا كانت الشحنة 80μC عند جهد 40V، ما الطاقة المخزنة؟',
        options: ['1.6 mJ', '3.2 mJ', '0.8 mJ', '6.4 mJ'],
        correctIndex: 0,
        explanation: 'الطاقة = مساحة المثلث تحت المنحنى = ½ × Q × V = ½ × 80×10⁻⁶ × 40 = 1.6×10⁻³ = 1.6mJ',
        hint: 'الطاقة = المساحة تحت منحنى Q-V (مثلث)',
    },
];

// ==================== CAPACITOR PLATES COMPONENT ====================
function CapacitorPlates({
    charge,
    maxCharge,
    showFieldLines,
    isCharging
}: {
    charge: number;
    maxCharge: number;
    showFieldLines: boolean;
    isCharging: boolean;
}) {
    const chargeRatio = Math.min(charge / maxCharge, 1);
    const numCharges = Math.floor(chargeRatio * 8) + 1;

    return (
        <div className="relative w-48 h-32 mx-auto">
            {/* Left Plate (Positive) */}
            <div className="absolute left-0 top-0 w-4 h-full bg-gradient-to-r from-red-600 to-red-500 rounded-l-lg shadow-lg flex flex-col justify-around items-center py-2">
                {Array.from({ length: numCharges }).map((_, i) => (
                    <span
                        key={`pos-${i}`}
                        className={cn(
                            "text-white font-bold text-xs transition-all duration-300",
                            isCharging && "animate-pulse"
                        )}
                        style={{
                            opacity: 0.5 + (chargeRatio * 0.5),
                            transform: `scale(${0.8 + chargeRatio * 0.4})`
                        }}
                    >
                        +
                    </span>
                ))}
            </div>

            {/* Right Plate (Negative) */}
            <div className="absolute right-0 top-0 w-4 h-full bg-gradient-to-l from-blue-600 to-blue-500 rounded-r-lg shadow-lg flex flex-col justify-around items-center py-2">
                {Array.from({ length: numCharges }).map((_, i) => (
                    <span
                        key={`neg-${i}`}
                        className={cn(
                            "text-white font-bold text-xs transition-all duration-300",
                            isCharging && "animate-pulse"
                        )}
                        style={{
                            opacity: 0.5 + (chargeRatio * 0.5),
                            transform: `scale(${0.8 + chargeRatio * 0.4})`
                        }}
                    >
                        −
                    </span>
                ))}
            </div>

            {/* Electric Field Lines */}
            {showFieldLines && charge > 0 && (
                <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-full h-full" viewBox="0 0 192 128">
                        {[20, 40, 60, 80, 108].map((y, i) => (
                            <g key={i}>
                                <line
                                    x1="20" y1={y} x2="172" y2={y}
                                    stroke="orange"
                                    strokeWidth="1.5"
                                    strokeDasharray="4,4"
                                    opacity={0.3 + chargeRatio * 0.5}
                                />
                                <polygon
                                    points={`150,${y - 4} 158,${y} 150,${y + 4}`}
                                    fill="orange"
                                    opacity={0.5 + chargeRatio * 0.5}
                                />
                            </g>
                        ))}
                    </svg>
                </div>
            )}

            {/* Dielectric Label */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <span className="text-xs text-muted-foreground bg-background/80 px-2 py-1 rounded">
                    هواء
                </span>
            </div>
        </div>
    );
}

// ==================== Q-V GRAPH COMPONENT ====================
function QVGraph({
    voltage,
    charge,
    capacitance,
    showAreaUnderCurve
}: {
    voltage: number;
    charge: number;
    capacitance: number;
    showAreaUnderCurve: boolean;
}) {
    const maxV = 100;
    const maxQ = capacitance * maxV;

    const vRatio = voltage / maxV;
    const qRatio = charge / maxQ;

    // Graph dimensions
    const width = 200;
    const height = 150;
    const padding = 30;
    const graphWidth = width - padding * 2;
    const graphHeight = height - padding * 2;

    const x = padding + vRatio * graphWidth;
    const y = height - padding - qRatio * graphHeight;

    return (
        <Card className="bg-slate-900">
            <CardHeader className="pb-2">
                <CardTitle className="text-sm text-white flex items-center gap-2">
                    <TrendingUp className="w-4 h-4" />
                    منحنى Q-V
                </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
                <svg width={width} height={height} className="mx-auto">
                    {/* Grid */}
                    <defs>
                        <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#334155" strokeWidth="0.5" />
                        </pattern>
                    </defs>
                    <rect x={padding} y={padding} width={graphWidth} height={graphHeight} fill="url(#grid)" />

                    {/* Area under curve (Energy) */}
                    {showAreaUnderCurve && voltage > 0 && (
                        <polygon
                            points={`${padding},${height - padding} ${x},${y} ${x},${height - padding}`}
                            fill="rgba(34, 197, 94, 0.3)"
                            stroke="rgb(34, 197, 94)"
                            strokeWidth="1"
                        />
                    )}

                    {/* Q-V Line */}
                    <line
                        x1={padding} y1={height - padding}
                        x2={padding + graphWidth} y2={padding}
                        stroke="#60a5fa"
                        strokeWidth="2"
                        strokeDasharray="5,5"
                        opacity="0.5"
                    />

                    {/* Current Point */}
                    {voltage > 0 && (
                        <>
                            <line x1={x} y1={height - padding} x2={x} y2={y} stroke="#94a3b8" strokeDasharray="2,2" />
                            <line x1={padding} y1={y} x2={x} y2={y} stroke="#94a3b8" strokeDasharray="2,2" />
                            <circle cx={x} cy={y} r="5" fill="#3b82f6" stroke="white" strokeWidth="2" />
                        </>
                    )}

                    {/* Axes */}
                    <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="white" strokeWidth="2" />
                    <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="white" strokeWidth="2" />

                    {/* Labels */}
                    <text x={width / 2} y={height - 5} fill="white" textAnchor="middle" fontSize="10">V (Volt)</text>
                    <text x={10} y={height / 2} fill="white" textAnchor="middle" fontSize="10" transform={`rotate(-90, 10, ${height / 2})`}>Q (C)</text>

                    {/* Energy Label */}
                    {showAreaUnderCurve && voltage > 0 && (
                        <text x={padding + graphWidth / 4} y={height - padding - 20} fill="#22c55e" fontSize="8" textAnchor="middle">
                            PE = ½QV
                        </text>
                    )}
                </svg>
                <p className="text-xs text-center text-slate-400 mt-1">
                    المساحة المظللة = طاقة الوضع
                </p>
            </CardContent>
        </Card>
    );
}

// ==================== CIRCUIT SWITCH COMPONENT ====================
function CircuitSwitch({
    isOn,
    onToggle
}: {
    isOn: boolean;
    onToggle: () => void;
}) {
    return (
        <button
            onClick={onToggle}
            className={cn(
                "relative w-16 h-16 rounded-full border-4 transition-all duration-300 flex items-center justify-center",
                isOn
                    ? "border-green-500 bg-green-500/20 shadow-lg shadow-green-500/30"
                    : "border-gray-500 bg-gray-500/20"
            )}
        >
            {isOn ? (
                <ToggleRight className="w-8 h-8 text-green-400" />
            ) : (
                <ToggleLeft className="w-8 h-8 text-gray-400" />
            )}
            <span className={cn(
                "absolute -bottom-6 text-xs font-medium",
                isOn ? "text-green-400" : "text-gray-400"
            )}>
                {isOn ? 'مغلق' : 'مفتوح'}
            </span>
        </button>
    );
}

// ==================== VOLTMETER COMPONENT ====================
function Voltmeter({ voltage }: { voltage: number }) {
    return (
        <div className="relative">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-slate-800 to-slate-900 border-4 border-slate-600 flex items-center justify-center shadow-xl">
                <div className="text-center">
                    <span className="text-2xl font-bold text-yellow-400 font-mono">
                        {voltage.toFixed(1)}
                    </span>
                    <span className="text-xs text-yellow-400 block">V</span>
                </div>
            </div>
            <div className="absolute -left-2 top-1/2 w-4 h-4 rounded-full bg-red-500 border-2 border-white" />
            <div className="absolute -right-2 top-1/2 w-4 h-4 rounded-full bg-black border-2 border-white" />
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground">
                فولتميتر
            </span>
        </div>
    );
}

// ==================== MEASUREMENTS PANEL ====================
function MeasurementsPanel({
    voltage,
    capacitance,
    charge,
    energy
}: {
    voltage: number;
    capacitance: number;
    charge: number;
    energy: number;
}) {
    const formatNumber = (num: number, unit: string) => {
        if (num === 0) return `0 ${unit}`;
        if (Math.abs(num) >= 1) return `${num.toFixed(2)} ${unit}`;
        if (Math.abs(num) >= 0.001) return `${(num * 1000).toFixed(2)} m${unit}`;
        if (Math.abs(num) >= 0.000001) return `${(num * 1000000).toFixed(2)} μ${unit}`;
        return `${num.toExponential(2)} ${unit}`;
    };

    return (
        <Card className="bg-gradient-to-br from-indigo-900 to-purple-900 text-white">
            <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                    <Gauge className="w-5 h-5" />
                    القياسات
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-indigo-200">فرق الجهد (V)</p>
                        <p className="text-xl font-bold font-mono">{voltage.toFixed(1)} V</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-indigo-200">المواسعة (C)</p>
                        <p className="text-xl font-bold font-mono">{formatNumber(capacitance, 'F')}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-indigo-200">الشحنة (Q)</p>
                        <p className="text-xl font-bold font-mono">{formatNumber(charge, 'C')}</p>
                    </div>
                    <div className="bg-white/10 rounded-lg p-3">
                        <p className="text-xs text-indigo-200">طاقة الوضع (PE)</p>
                        <p className="text-xl font-bold font-mono">{formatNumber(energy, 'J')}</p>
                    </div>
                </div>

                {/* Formulas */}
                <div className="bg-black/30 rounded-lg p-3 space-y-1">
                    <p className="text-xs text-indigo-200 mb-2">القوانين المستخدمة:</p>
                    <p className="text-sm font-mono">Q = C × V</p>
                    <p className="text-sm font-mono">PE = ½CV² = ½QV</p>
                </div>
            </CardContent>
        </Card>
    );
}

// ==================== LEARN TAB COMPONENT ====================
function LearnTab() {
    return (
        <div className="space-y-4 p-4">
            <Card className="border-blue-200 bg-blue-50/50">
                <CardHeader>
                    <CardTitle className="text-blue-700 flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        تعريف المواسعة الكهربائية
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-blue-800">
                        المواسعة (C) هي قدرة المواسع على تخزين الشحنة الكهربائية لكل وحدة فرق جهد.
                    </p>
                    <div className="bg-blue-100 p-4 rounded-lg text-center">
                        <p className="text-2xl font-bold font-mono text-blue-900">C = Q / V</p>
                    </div>
                    <p className="text-sm text-blue-600">
                        وحدة المواسعة: الفاراد (F) = كولوم / فولت
                    </p>
                </CardContent>
            </Card>

            <Card className="border-green-200 bg-green-50/50">
                <CardHeader>
                    <CardTitle className="text-green-700 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        طاقة الوضع المخزنة
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <p className="text-green-800">
                        طاقة الوضع المخزنة في المواسع تساوي المساحة تحت منحنى Q-V:
                    </p>
                    <div className="bg-green-100 p-4 rounded-lg text-center space-y-2">
                        <p className="text-xl font-bold font-mono text-green-900">PE = ½ Q V</p>
                        <p className="text-xl font-bold font-mono text-green-900">PE = ½ C V²</p>
                        <p className="text-xl font-bold font-mono text-green-900">PE = ½ Q² / C</p>
                    </div>
                    <p className="text-sm text-green-600">
                        💡 الطاقة = مساحة المثلث = ½ × القاعدة (V) × الارتفاع (Q)
                    </p>
                </CardContent>
            </Card>

            <Card className="border-orange-200 bg-orange-50/50">
                <CardHeader>
                    <CardTitle className="text-orange-700 flex items-center gap-2">
                        <ArrowRight className="w-5 h-5" />
                        خطوط المجال الكهربائي
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-orange-800">
                        <li>• تتجه من الصفيحة الموجبة (+) إلى السالبة (-)</li>
                        <li>• متوازية ومتساوية الكثافة داخل المواسع</li>
                        <li>• عمودية على سطح الصفيحتين</li>
                        <li>• المجال منتظم بين الصفيحتين</li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}

// ==================== QUIZ TAB COMPONENT ====================
function QuizTab() {
    const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy');
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [score, setScore] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const filteredQuestions = useMemo(() =>
        quizQuestions.filter(q => q.difficulty === difficulty),
        [difficulty]
    );

    const currentQuestion = filteredQuestions[currentQuestionIndex];
    const isComplete = currentQuestionIndex >= filteredQuestions.length;

    const handleAnswer = (index: number) => {
        if (showResult) return;
        setSelectedAnswer(index);
        setShowResult(true);
        if (index === currentQuestion.correctIndex) {
            setScore(prev => prev + 1);
        }
    };

    const handleNext = () => {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
        setShowResult(false);
        setShowHint(false);
    };

    const handleReset = () => {
        setCurrentQuestionIndex(0);
        setSelectedAnswer(null);
        setShowResult(false);
        setScore(0);
        setShowHint(false);
    };

    const difficultyColors = {
        easy: 'bg-green-500',
        medium: 'bg-yellow-500',
        hard: 'bg-red-500'
    };

    const difficultyLabels = {
        easy: 'سهل',
        medium: 'متوسط',
        hard: 'صعب'
    };

    if (isComplete) {
        const percentage = (score / filteredQuestions.length) * 100;
        return (
            <div className="p-6 text-center space-y-6">
                <Trophy className={cn(
                    "w-20 h-20 mx-auto",
                    percentage >= 80 ? "text-yellow-500" : percentage >= 50 ? "text-gray-400" : "text-orange-400"
                )} />
                <h2 className="text-2xl font-bold">انتهى التحدي!</h2>
                <p className="text-4xl font-bold text-primary">
                    {score} / {filteredQuestions.length}
                </p>
                <Progress value={percentage} className="h-4" />
                <p className="text-muted-foreground">
                    {percentage >= 80 ? 'ممتاز! أداء رائع 🎉' :
                        percentage >= 50 ? 'جيد! حاول مرة أخرى للتحسين 💪' :
                            'لا تستسلم! راجع الدرس وحاول مجدداً 📚'}
                </p>
                <div className="flex gap-4 justify-center">
                    <Button onClick={handleReset} variant="outline">
                        <RotateCcw className="w-4 h-4 me-2" /> إعادة التحدي
                    </Button>
                    <Button onClick={() => {
                        setDifficulty(difficulty === 'easy' ? 'medium' : difficulty === 'medium' ? 'hard' : 'easy');
                        handleReset();
                    }}>
                        المستوى التالي
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="p-4 space-y-4">
            {/* Difficulty Selector */}
            <div className="flex gap-2 justify-center">
                {(['easy', 'medium', 'hard'] as const).map((d) => (
                    <Button
                        key={d}
                        variant={difficulty === d ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => { setDifficulty(d); handleReset(); }}
                        className={cn(difficulty === d && difficultyColors[d])}
                    >
                        {difficultyLabels[d]}
                    </Button>
                ))}
            </div>

            {/* Progress */}
            <div className="flex items-center gap-4">
                <Progress value={((currentQuestionIndex) / filteredQuestions.length) * 100} className="flex-1" />
                <Badge variant="secondary">
                    {currentQuestionIndex + 1} / {filteredQuestions.length}
                </Badge>
            </div>

            {/* Question */}
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <Badge className={difficultyColors[currentQuestion.difficulty]}>
                            {difficultyLabels[currentQuestion.difficulty]}
                        </Badge>
                        <Badge variant="outline">
                            {currentQuestion.type === 'conceptual' ? 'مفاهيمي' :
                                currentQuestion.type === 'direction' ? 'اتجاه' : 'حسابي'}
                        </Badge>
                    </div>
                    <CardTitle className="text-lg mt-2">{currentQuestion.question}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                        <Button
                            key={index}
                            variant="outline"
                            className={cn(
                                "w-full justify-start text-start h-auto py-3 px-4",
                                showResult && index === currentQuestion.correctIndex && "border-green-500 bg-green-50",
                                showResult && selectedAnswer === index && index !== currentQuestion.correctIndex && "border-red-500 bg-red-50",
                                !showResult && selectedAnswer === index && "border-primary"
                            )}
                            onClick={() => handleAnswer(index)}
                            disabled={showResult}
                        >
                            <span className="flex items-center gap-3">
                                {showResult && index === currentQuestion.correctIndex && (
                                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                                )}
                                {showResult && selectedAnswer === index && index !== currentQuestion.correctIndex && (
                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                )}
                                {!showResult && (
                                    <span className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-sm flex-shrink-0">
                                        {String.fromCharCode(65 + index)}
                                    </span>
                                )}
                                <span>{option}</span>
                            </span>
                        </Button>
                    ))}

                    {/* Hint */}
                    {currentQuestion.hint && !showResult && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowHint(!showHint)}
                            className="text-muted-foreground"
                        >
                            <Lightbulb className="w-4 h-4 me-2" />
                            {showHint ? 'إخفاء التلميح' : 'تلميح'}
                        </Button>
                    )}
                    {showHint && !showResult && (
                        <p className="text-sm text-amber-600 bg-amber-50 p-3 rounded-lg">
                            💡 {currentQuestion.hint}
                        </p>
                    )}

                    {/* Explanation */}
                    {showResult && (
                        <div className={cn(
                            "p-4 rounded-lg",
                            selectedAnswer === currentQuestion.correctIndex ? "bg-green-50" : "bg-red-50"
                        )}>
                            <p className="font-medium mb-2">
                                {selectedAnswer === currentQuestion.correctIndex ? '✅ إجابة صحيحة!' : '❌ إجابة خاطئة'}
                            </p>
                            <p className="text-sm text-muted-foreground">{currentQuestion.explanation}</p>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* Next Button */}
            {showResult && (
                <Button onClick={handleNext} className="w-full">
                    {currentQuestionIndex < filteredQuestions.length - 1 ? 'السؤال التالي' : 'عرض النتيجة'}
                    <ArrowRight className="w-4 h-4 ms-2" />
                </Button>
            )}
        </div>
    );
}

// ==================== MAIN SIMULATION COMPONENT ====================
export default function CapacitorLabSimulation() {
    const [voltage, setVoltage] = useState(0);
    const [capacitance, setCapacitance] = useState(10e-6); // 10 μF
    const [isSwitchOn, setIsSwitchOn] = useState(false);
    const [showFieldLines, setShowFieldLines] = useState(false);
    const [showAreaUnderCurve, setShowAreaUnderCurve] = useState(true);
    const [targetVoltage, setTargetVoltage] = useState(50);

    // Calculated values
    const actualVoltage = isSwitchOn ? voltage : 0;
    const charge = capacitance * actualVoltage;
    const energy = 0.5 * capacitance * actualVoltage * actualVoltage;
    const maxCharge = capacitance * 100;

    // Charging animation
    useEffect(() => {
        if (isSwitchOn && voltage < targetVoltage) {
            const timer = setTimeout(() => {
                setVoltage(prev => Math.min(prev + 2, targetVoltage));
            }, 50);
            return () => clearTimeout(timer);
        }
        if (!isSwitchOn && voltage > 0) {
            const timer = setTimeout(() => {
                setVoltage(prev => Math.max(prev - 5, 0));
            }, 30);
            return () => clearTimeout(timer);
        }
    }, [isSwitchOn, voltage, targetVoltage]);

    const handleSwitchToggle = () => {
        setIsSwitchOn(!isSwitchOn);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 p-4 md:p-6">
            <div className="max-w-6xl mx-auto space-y-6">
                {/* Header */}
                <div className="text-center text-white space-y-2">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-3">
                        <Zap className="w-8 h-8 text-yellow-400" />
                        مختبر المواسعات الافتراضي
                    </h1>
                    <p className="text-slate-400">تعلّم، جرّب، وتحدَّ نفسك!</p>
                </div>

                <Tabs defaultValue="explore" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-800">
                        <TabsTrigger value="explore" className="data-[state=active]:bg-indigo-600">
                            <Zap className="w-4 h-4 me-2" /> استكشاف
                        </TabsTrigger>
                        <TabsTrigger value="learn" className="data-[state=active]:bg-indigo-600">
                            <BookOpen className="w-4 h-4 me-2" /> تعلّم
                        </TabsTrigger>
                        <TabsTrigger value="quiz" className="data-[state=active]:bg-indigo-600">
                            <Gamepad2 className="w-4 h-4 me-2" /> تحدي
                        </TabsTrigger>
                    </TabsList>

                    {/* EXPLORE TAB */}
                    <TabsContent value="explore" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Main Circuit Area */}
                            <div className="lg:col-span-2 space-y-6">
                                <Card className="bg-slate-800/50 border-slate-700">
                                    <CardHeader>
                                        <CardTitle className="text-white">الدائرة الكهربائية</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="relative space-y-8">
                                            {/* Battery Control */}
                                            <div className="flex items-center gap-4">
                                                <Battery className={cn(
                                                    "w-12 h-12",
                                                    isSwitchOn ? "text-green-400" : "text-gray-400"
                                                )} />
                                                <div className="flex-1 space-y-2">
                                                    <div className="flex justify-between text-white">
                                                        <Label>جهد البطارية</Label>
                                                        <span className="font-mono">{targetVoltage} V</span>
                                                    </div>
                                                    <Slider
                                                        value={[targetVoltage]}
                                                        onValueChange={([v]) => setTargetVoltage(v)}
                                                        min={0}
                                                        max={100}
                                                        step={5}
                                                    />
                                                </div>
                                            </div>

                                            {/* Circuit Visualization */}
                                            <div className="flex items-center justify-around py-8">
                                                <CircuitSwitch isOn={isSwitchOn} onToggle={handleSwitchToggle} />
                                                <CapacitorPlates
                                                    charge={charge}
                                                    maxCharge={maxCharge}
                                                    showFieldLines={showFieldLines}
                                                    isCharging={isSwitchOn && voltage < targetVoltage}
                                                />
                                                <Voltmeter voltage={actualVoltage} />
                                            </div>

                                            {/* Options */}
                                            <div className="flex flex-wrap gap-4 justify-center">
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        id="fieldLines"
                                                        checked={showFieldLines}
                                                        onCheckedChange={setShowFieldLines}
                                                    />
                                                    <Label htmlFor="fieldLines" className="text-white flex items-center gap-2">
                                                        {showFieldLines ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                        خطوط المجال
                                                    </Label>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <Switch
                                                        id="areaUnderCurve"
                                                        checked={showAreaUnderCurve}
                                                        onCheckedChange={setShowAreaUnderCurve}
                                                    />
                                                    <Label htmlFor="areaUnderCurve" className="text-white">
                                                        إظهار الطاقة
                                                    </Label>
                                                </div>
                                            </div>

                                            {/* Capacitance Control */}
                                            <div className="space-y-2">
                                                <div className="flex justify-between text-white">
                                                    <Label>المواسعة (C)</Label>
                                                    <span className="font-mono">{(capacitance * 1e6).toFixed(0)} μF</span>
                                                </div>
                                                <Slider
                                                    value={[capacitance * 1e6]}
                                                    onValueChange={([v]) => setCapacitance(v * 1e-6)}
                                                    min={1}
                                                    max={100}
                                                    step={1}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Q-V Graph */}
                                <QVGraph
                                    voltage={actualVoltage}
                                    charge={charge}
                                    capacitance={capacitance}
                                    showAreaUnderCurve={showAreaUnderCurve}
                                />
                            </div>

                            {/* Side Panel */}
                            <div className="space-y-6">
                                <MeasurementsPanel
                                    voltage={actualVoltage}
                                    capacitance={capacitance}
                                    charge={charge}
                                    energy={energy}
                                />

                                {/* Quick Tips */}
                                <Card className="bg-amber-900/30 border-amber-700">
                                    <CardHeader className="pb-2">
                                        <CardTitle className="text-amber-400 text-sm flex items-center gap-2">
                                            <Lightbulb className="w-4 h-4" />
                                            نصائح سريعة
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="text-amber-200 text-sm space-y-2">
                                        <p>• أغلق المفتاح لشحن المواسع</p>
                                        <p>• زِد الجهد لترى تراكم الشحنات</p>
                                        <p>• فعّل خطوط المجال لترى اتجاهها</p>
                                        <p>• راقب المساحة المظللة = الطاقة</p>
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>

                    {/* LEARN TAB */}
                    <TabsContent value="learn">
                        <Card className="bg-slate-800/50 border-slate-700">
                            <LearnTab />
                        </Card>
                    </TabsContent>

                    {/* QUIZ TAB */}
                    <TabsContent value="quiz">
                        <Card className="bg-slate-800/50 border-slate-700">
                            <QuizTab />
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
