'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { getCountryById, getGradeById, getSemesterById, getUnitById } from '@/data/countries';
import { momentumUnit, Lesson } from '@/data/curricula/jordan/tawjihi-2008/semester-1/momentum';
import { workEnergyUnit } from '@/data/curricula/jordan/tawjihi-2008/semester-1/work-energy';
import { rotationalMotionUnit } from '@/data/curricula/jordan/tawjihi-2008/semester-1/rotational-motion';
import { equilibriumElasticityUnit } from '@/data/curricula/jordan/tawjihi-2008/semester-1/equilibrium-elasticity';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowRight, BookOpen, ChevronLeft, FileText, Clock,
    Play, CheckCircle2, ChevronDown, ChevronUp,
    Lightbulb, Calculator, ListChecks, Sparkles, Zap,
    GraduationCap, Target, Star, ArrowLeft
} from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import 'katex/dist/katex.min.css';
import { BlockMath } from 'react-katex';

// Formula Card Component
function FormulaCard({ formula, index }: { formula: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative"
        >
            {/* Glow on hover */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl opacity-0 group-hover:opacity-50 blur transition-all duration-300" />

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                        <Calculator className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-bold text-white">{formula.name}</h4>
                </div>

                {/* Formula Display */}
                <div className="bg-gradient-to-r from-blue-950/50 to-cyan-950/50 rounded-xl p-6 mb-4 border border-blue-500/20" dir="ltr">
                    <div className="text-center text-2xl text-blue-100">
                        <BlockMath math={formula.latex} />
                    </div>
                </div>

                {/* Description */}
                <p className="text-white/60 text-sm mb-4">{formula.description}</p>

                {/* Variables */}
                {formula.variables.length > 0 && (
                    <div className="space-y-2">
                        <span className="text-xs text-white/40 font-medium">المتغيرات:</span>
                        <div className="grid gap-2">
                            {formula.variables.map((v: any, i: number) => (
                                <div key={i} className="flex items-center gap-2 bg-white/5 rounded-lg px-3 py-2" dir="ltr">
                                    <span className="font-mono text-cyan-400 font-bold">{v.symbol}</span>
                                    <span className="text-white/50">:</span>
                                    <span className="text-white/70 text-sm" dir="rtl">{v.meaning}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}

// Example Card Component
function ExampleCard({ example, index }: { example: any; index: number }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
        >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl opacity-0 group-hover:opacity-30 blur transition-all duration-300" />

            <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-white/10">
                {/* Question Header */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-full p-6 flex items-start gap-4 text-start hover:bg-white/5 transition-colors"
                >
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shrink-0 text-white font-bold">
                        {index + 1}
                    </div>
                    <div className="flex-1">
                        <p className="text-white font-medium leading-relaxed">{example.question}</p>
                    </div>
                    <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        className="shrink-0 w-8 h-8 bg-white/10 rounded-full flex items-center justify-center"
                    >
                        <ChevronDown className="w-5 h-5 text-white/60" />
                    </motion.div>
                </button>

                {/* Solution */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 pb-6 border-t border-white/10 pt-4">
                                {/* Solution Steps */}
                                <div className="space-y-3 mb-4">
                                    {example.solution.map((step: string, i: number) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-start gap-3"
                                        >
                                            <div className="w-6 h-6 bg-amber-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                                <span className="text-xs text-amber-400 font-mono">{i + 1}</span>
                                            </div>
                                            <p className="text-white/80 leading-relaxed">{step}</p>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Answer */}
                                <div className="bg-gradient-to-r from-emerald-500/10 to-green-500/10 rounded-xl p-4 border border-emerald-500/20">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                                            <CheckCircle2 className="w-5 h-5 text-white" />
                                        </div>
                                        <div>
                                            <span className="text-sm text-emerald-400">الجواب النهائي</span>
                                            <p className="text-xl font-bold text-white">{example.answer}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

// Lesson Content Component
function LessonContent({ lesson }: { lesson: Lesson }) {
    return (
        <motion.div
            key={lesson.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Introduction */}
            <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl opacity-20 blur" />
                <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-white/10">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                            <Lightbulb className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">مقدمة</h2>
                    </div>
                    <p className="text-lg text-white/70 leading-relaxed whitespace-pre-line">
                        {lesson.content.introduction}
                    </p>
                </div>
            </div>

            {/* Sections */}
            {lesson.content.sections.map((section, index) => (
                <motion.div
                    key={section.id}
                    initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="relative"
                >
                    <div className="bg-slate-900/60 backdrop-blur-xl rounded-2xl p-8 border border-white/10 hover:border-purple-500/30 transition-colors">
                        <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-3">
                            <span className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center text-purple-400 font-mono text-sm">
                                {index + 1}
                            </span>
                            {section.title}
                        </h3>
                        <div className="text-white/60 leading-relaxed whitespace-pre-line">
                            {section.content}
                        </div>
                    </div>
                </motion.div>
            ))}

            {/* Formulas */}
            {lesson.content.formulas.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                            <Calculator className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">القوانين</h2>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        {lesson.content.formulas.map((formula, index) => (
                            <FormulaCard key={formula.id} formula={formula} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Examples */}
            {lesson.content.examples.length > 0 && (
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                            <FileText className="w-6 h-6 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">أمثلة محلولة</h2>
                        <span className="text-sm text-white/40">(اضغط للتوسيع)</span>
                    </div>
                    <div className="space-y-4">
                        {lesson.content.examples.map((example, index) => (
                            <ExampleCard key={example.id} example={example} index={index} />
                        ))}
                    </div>
                </div>
            )}

            {/* Summary */}
            {lesson.content.summary.length > 0 && (
                <div className="relative">
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-green-500 rounded-2xl opacity-20 blur" />
                    <div className="relative bg-slate-900/90 backdrop-blur-xl rounded-2xl p-8 border border-emerald-500/20">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-500 rounded-xl flex items-center justify-center">
                                <ListChecks className="w-6 h-6 text-white" />
                            </div>
                            <h2 className="text-2xl font-bold text-white">ملخص الدرس</h2>
                        </div>
                        <ul className="space-y-3">
                            {lesson.content.summary.map((point, index) => (
                                <motion.li
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3"
                                >
                                    <div className="w-6 h-6 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                                    </div>
                                    <span className="text-white/80">{point}</span>
                                </motion.li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </motion.div>
    );
}

// Sidebar Lesson Item
function LessonItem({ lesson, index, isSelected, onClick }: { lesson: Lesson; index: number; isSelected: boolean; onClick: () => void }) {
    return (
        <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={onClick}
            className={`w-full p-4 text-start flex items-center gap-4 transition-all duration-300 ${isSelected
                ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-r-4 border-purple-500'
                : 'hover:bg-white/5'
                }`}
        >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 font-bold transition-all ${isSelected
                ? 'bg-gradient-to-br from-purple-500 to-pink-500 text-white'
                : 'bg-white/10 text-white/60'
                }`}>
                {index + 1}
            </div>
            <div className="flex-1 min-w-0">
                <p className={`font-medium truncate ${isSelected ? 'text-white' : 'text-white/80'}`}>
                    {lesson.titleAr}
                </p>
                <p className="text-xs text-white/40 flex items-center gap-1 mt-1">
                    <Clock className="w-3 h-3" />
                    {lesson.duration} دقيقة
                </p>
            </div>
            {isSelected && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-2 h-2 bg-purple-500 rounded-full"
                />
            )}
        </motion.button>
    );
}

export default function UnitPage() {
    const params = useParams();
    const countryId = params.country as string;
    const gradeId = params.grade as string;
    const semesterId = params.semester as string;
    const unitId = params.unit as string;

    const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

    const country = getCountryById(countryId);
    const grade = getGradeById(countryId, gradeId);
    const semester = getSemesterById(countryId, gradeId, semesterId);
    const unit = getUnitById(countryId, gradeId, semesterId, unitId);

    if (!country || !grade || !semester || !unit) {
        notFound();
    }

    // Get unit data based on unitId
    const getUnitData = (id: string) => {
        switch (id) {
            case 'momentum': return momentumUnit;
            case 'work-energy': return workEnergyUnit;
            case 'rotational-motion': return rotationalMotionUnit;
            case 'equilibrium-elasticity': return equilibriumElasticityUnit;
            default: return null;
        }
    };

    const unitData = getUnitData(unitId);
    const currentLesson = selectedLesson && unitData
        ? unitData.lessons.find(l => l.id === selectedLesson)
        : null;

    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
                {/* Background Effects */}
                <div className="fixed inset-0 pointer-events-none">
                    <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[150px]" />
                </div>

                <div className="relative container mx-auto px-4 py-8">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-6 flex items-center gap-2 text-sm flex-wrap"
                    >
                        <Link href="/learn" className="text-white/40 hover:text-white transition-colors">تعلّم</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}`} className="text-white/40 hover:text-white transition-colors">{country.flag}</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}/${gradeId}`} className="text-white/40 hover:text-white transition-colors">{grade.nameAr}</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}/${gradeId}/${semesterId}`} className="text-white/40 hover:text-white transition-colors">{semester.nameAr}</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <span className="text-white font-medium">{unit.nameAr}</span>
                    </motion.div>

                    <div className="grid lg:grid-cols-[350px_1fr] gap-8">
                        {/* Sidebar */}
                        <motion.div
                            initial={{ opacity: 0, x: -40 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="lg:sticky lg:top-24 lg:h-fit"
                        >
                            <div className="bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10">
                                {/* Header */}
                                <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-purple-600 p-6">
                                    <div className="flex items-center gap-4">
                                        <div className="text-5xl">{unit.icon}</div>
                                        <div>
                                            <span className="text-white/70 text-sm">الوحدة {unit.number}</span>
                                            <h2 className="text-2xl font-bold text-white">{unit.nameAr}</h2>
                                        </div>
                                    </div>
                                </div>

                                {/* Progress */}
                                <div className="px-6 py-4 border-b border-white/10">
                                    <div className="flex items-center justify-between text-sm mb-2">
                                        <span className="text-white/50">تقدمك</span>
                                        <span className="text-purple-400">0/{unitData?.lessons.length || 0}</span>
                                    </div>
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full w-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full" />
                                    </div>
                                </div>

                                {/* Lessons List */}
                                <div className="divide-y divide-white/5">
                                    {unitData ? (
                                        unitData.lessons.map((lesson, index) => (
                                            <LessonItem
                                                key={lesson.id}
                                                lesson={lesson}
                                                index={index}
                                                isSelected={selectedLesson === lesson.id}
                                                onClick={() => setSelectedLesson(lesson.id)}
                                            />
                                        ))
                                    ) : (
                                        <div className="p-8 text-center text-white/50">
                                            محتوى الوحدة قيد الإعداد
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Content */}
                        <div className="min-h-[70vh]">
                            <AnimatePresence mode="wait">
                                {currentLesson ? (
                                    <div key={currentLesson.id}>
                                        {/* Lesson Header */}
                                        <motion.div
                                            initial={{ opacity: 0, y: -20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            className="mb-8"
                                        >
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="bg-purple-500/20 text-purple-400 text-sm px-3 py-1 rounded-full">
                                                    الدرس {currentLesson.number}
                                                </span>
                                                <span className="text-white/40 text-sm flex items-center gap-1">
                                                    <Clock className="w-4 h-4" />
                                                    {currentLesson.duration} دقيقة
                                                </span>
                                            </div>
                                            <h1 className="text-4xl font-black text-white">
                                                {currentLesson.titleAr}
                                            </h1>
                                        </motion.div>

                                        <LessonContent lesson={currentLesson} />
                                    </div>
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="flex flex-col items-center justify-center py-20 text-center"
                                    >
                                        <motion.div
                                            animate={{ rotate: [0, 10, -10, 0] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="text-9xl mb-8"
                                        >
                                            {unit.icon}
                                        </motion.div>
                                        <h2 className="text-4xl font-black text-white mb-4">
                                            مرحباً بك في وحدة {unit.nameAr}
                                        </h2>
                                        <p className="text-xl text-white/50 mb-8 max-w-md">
                                            {unit.descriptionAr}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex gap-8 mb-10">
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-purple-400">{unit.lessonsCount}</div>
                                                <div className="text-white/40">دروس</div>
                                            </div>
                                            <div className="text-center">
                                                <div className="text-3xl font-bold text-pink-400">~{unit.lessonsCount * 15}</div>
                                                <div className="text-white/40">دقيقة</div>
                                            </div>
                                        </div>

                                        {unitData && unitData.lessons.length > 0 && (
                                            <Button
                                                size="lg"
                                                onClick={() => setSelectedLesson(unitData.lessons[0].id)}
                                                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 text-lg px-8 py-6 rounded-xl shadow-xl shadow-purple-500/25"
                                            >
                                                <Play className="w-6 h-6 mr-2" />
                                                ابدأ الدرس الأول
                                            </Button>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </MarketingLayout>
    );
}
