'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { getCountryById, getGradeById, getSemesterById } from '@/data/countries';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, ChevronLeft, FileText, Clock, Play, Zap, Target, Star } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState } from 'react';

function UnitCard({ unit, basePath, index }: { unit: any; basePath: string; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    const gradients = [
        { bg: 'from-violet-600 via-purple-600 to-indigo-700', glow: 'from-violet-500 to-indigo-600' },
        { bg: 'from-rose-600 via-pink-600 to-fuchsia-700', glow: 'from-rose-500 to-fuchsia-600' },
        { bg: 'from-amber-500 via-orange-600 to-red-600', glow: 'from-amber-500 to-red-600' },
        { bg: 'from-emerald-500 via-teal-600 to-cyan-600', glow: 'from-emerald-500 to-cyan-600' },
        { bg: 'from-blue-500 via-cyan-600 to-teal-600', glow: 'from-blue-500 to-teal-600' },
        { bg: 'from-fuchsia-600 via-purple-600 to-violet-700', glow: 'from-fuchsia-500 to-violet-600' },
    ];

    const gradient = gradients[index % gradients.length];

    return (
        <Link href={`${basePath}/${unit.id}`}>
            <motion.div
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80, rotateY: index % 2 === 0 ? -10 : 10 }}
                animate={{ opacity: 1, x: 0, rotateY: 0 }}
                transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ scale: 1.02 }}
                className="relative group cursor-pointer"
            >
                {/* Glow Effect */}
                <motion.div
                    className={`absolute -inset-1 bg-gradient-to-r ${gradient.glow} rounded-3xl blur-xl`}
                    animate={{ opacity: isHovered ? 0.6 : 0 }}
                    transition={{ duration: 0.3 }}
                />

                {/* Card */}
                <div className="relative bg-slate-900/90 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10">
                    {/* Gradient Header */}
                    <div className={`relative bg-gradient-to-br ${gradient.bg} p-6 overflow-hidden`}>
                        {/* Decorative Elements */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                        <div className="absolute bottom-0 left-0 w-24 h-24 bg-black/20 rounded-full blur-xl translate-y-1/2 -translate-x-1/2" />

                        {/* Animated Pattern */}
                        <motion.div
                            className="absolute inset-0 opacity-20"
                            style={{
                                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                backgroundSize: '24px 24px'
                            }}
                            animate={{ backgroundPosition: isHovered ? '24px 24px' : '0px 0px' }}
                            transition={{ duration: 0.5 }}
                        />

                        {/* Content */}
                        <div className="relative flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {/* Icon */}
                                <motion.div
                                    animate={{ rotate: isHovered ? 10 : 0, scale: isHovered ? 1.1 : 1 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                    className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center text-4xl border border-white/30 shadow-xl"
                                >
                                    {unit.icon}
                                </motion.div>

                                <div>
                                    <span className="text-white/70 text-sm font-medium">الوحدة {unit.number}</span>
                                    <h3 className="text-2xl font-bold text-white">{unit.nameAr}</h3>
                                </div>
                            </div>

                            {/* Arrow */}
                            <motion.div
                                animate={{ x: isHovered ? -5 : 0 }}
                                className="w-12 h-12 bg-white/20 backdrop-blur-xl rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors"
                            >
                                <ArrowRight className="w-6 h-6 text-white rotate-180" />
                            </motion.div>
                        </div>
                    </div>

                    {/* Body */}
                    <div className="p-6">
                        <p className="text-white/60 mb-6 leading-relaxed">
                            {unit.descriptionAr}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-2 text-purple-400 mb-1">
                                    <FileText className="w-4 h-4" />
                                    <span className="text-sm font-medium">الدروس</span>
                                </div>
                                <span className="text-2xl font-bold text-white">{unit.lessonsCount}</span>
                            </div>
                            <div className="bg-white/5 rounded-xl p-4 border border-white/5">
                                <div className="flex items-center gap-2 text-cyan-400 mb-1">
                                    <Clock className="w-4 h-4" />
                                    <span className="text-sm font-medium">المدة</span>
                                </div>
                                <span className="text-2xl font-bold text-white">~{unit.lessonsCount * 15} د</span>
                            </div>
                        </div>

                        {/* Progress Preview */}
                        <motion.div
                            className="mt-4 pt-4 border-t border-white/10"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: isHovered ? 1 : 0.5 }}
                        >
                            <div className="flex items-center justify-between text-sm mb-2">
                                <span className="text-white/50">ابدأ من هنا</span>
                                <span className="text-primary font-medium">0%</span>
                            </div>
                            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    className={`h-full bg-gradient-to-r ${gradient.glow} rounded-full`}
                                    animate={{ width: isHovered ? '10%' : '0%' }}
                                    transition={{ duration: 0.5 }}
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* CTA Overlay */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end justify-center pb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    >
                        <motion.div
                            initial={{ y: 20 }}
                            animate={{ y: isHovered ? 0 : 20 }}
                            className={`flex items-center gap-2 px-6 py-3 bg-gradient-to-r ${gradient.bg} rounded-full text-white font-medium shadow-xl`}
                        >
                            <Play className="w-5 h-5" />
                            <span>ابدأ التعلم الآن</span>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function SemesterPage() {
    const params = useParams();
    const countryId = params.country as string;
    const gradeId = params.grade as string;
    const semesterId = params.semester as string;

    const country = getCountryById(countryId);
    const grade = getGradeById(countryId, gradeId);
    const semester = getSemesterById(countryId, gradeId, semesterId);

    if (!country || !grade || !semester) {
        notFound();
    }

    const basePath = `/learn/${countryId}/${gradeId}/${semesterId}`;

    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/3 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
                    <div className="absolute bottom-0 right-1/3 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[150px]" />
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-pink-500/3 rounded-full blur-[200px]" />
                </div>

                <div className="relative container mx-auto px-4 py-12">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8 flex items-center gap-2 text-sm flex-wrap"
                    >
                        <Link href="/learn" className="text-white/40 hover:text-white transition-colors">تعلّم</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}`} className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
                            <span>{country.flag}</span>
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}/${gradeId}`} className="text-white/40 hover:text-white transition-colors">
                            {grade.nameAr}
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <span className="text-white font-medium">{semester.nameAr}</span>
                    </motion.div>

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full mb-6"
                        >
                            <BookOpen className="w-5 h-5 text-purple-400" />
                            <span className="text-white/80">{grade.nameAr} - {semester.nameAr}</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
                            <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                                الوحدات الدراسية
                            </span>
                        </h1>

                        <p className="text-xl text-white/50 max-w-lg mx-auto mb-8">
                            اختر الوحدة وابدأ رحلة التعلم الممتعة
                        </p>

                        {/* Stats */}
                        <div className="flex justify-center gap-8">
                            {[
                                { icon: Target, value: semester.units.length, label: 'وحدات' },
                                { icon: FileText, value: semester.units.reduce((sum, u) => sum + u.lessonsCount, 0), label: 'درس' },
                                { icon: Star, value: '100%', label: 'مجاني' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-12 h-12 mx-auto mb-2 bg-white/5 rounded-xl flex items-center justify-center border border-white/10">
                                        <stat.icon className="w-6 h-6 text-purple-400" />
                                    </div>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-white/40">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Units Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
                        {semester.units.map((unit, index) => (
                            <UnitCard key={unit.id} unit={unit} basePath={basePath} index={index} />
                        ))}
                    </div>

                    {/* Empty State */}
                    {semester.units.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="text-center py-20"
                        >
                            <div className="w-32 h-32 mx-auto mb-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full flex items-center justify-center border border-white/10">
                                <Zap className="w-16 h-16 text-purple-400" />
                            </div>
                            <h3 className="text-3xl font-bold text-white mb-3">قريباً</h3>
                            <p className="text-white/50 text-lg">سيتم إضافة محتوى هذا الفصل قريباً</p>
                        </motion.div>
                    )}
                </div>

                {/* Bottom Gradient */}
                <div className="h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
        </MarketingLayout>
    );
}
