'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { getCountryById, getGradeById } from '@/data/countries';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, BookMarked, ChevronLeft, Sparkles, Clock } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState } from 'react';

function SemesterCard({ semester, country, grade, index }: { semester: any; country: any; grade: any; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const isAvailable = semester.units.length > 0;

    return (
        <Link
            href={isAvailable ? `/learn/${country.id}/${grade.id}/${semester.id}` : '#'}
            onClick={(e) => !isAvailable && e.preventDefault()}
            className={!isAvailable ? 'cursor-not-allowed' : ''}
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={isAvailable ? { scale: 1.02, y: -10 } : {}}
                className={`relative group ${!isAvailable ? 'opacity-60' : ''}`}
            >
                {/* Outer Glow */}
                {isAvailable && (
                    <motion.div
                        className="absolute -inset-2 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 rounded-[2rem] blur-2xl"
                        animate={{ opacity: isHovered ? 0.5 : 0 }}
                        transition={{ duration: 0.4 }}
                    />
                )}

                {/* Main Card */}
                <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-[2rem] overflow-hidden border border-white/10">
                    {/* Animated Background Pattern */}
                    <div className="absolute inset-0 opacity-30">
                        <motion.div
                            className="absolute inset-0"
                            style={{
                                backgroundImage: `linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.05) 50%, transparent 70%)`
                            }}
                            animate={{ x: isHovered ? '100%' : '-100%' }}
                            transition={{ duration: 1 }}
                        />
                    </div>

                    {/* Top Gradient Bar */}
                    <div className={`h-2 w-full ${index === 0
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500'
                        : 'bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500'}`}
                    />

                    {/* Content */}
                    <div className="p-10 text-center">
                        {/* Icon Container */}
                        <motion.div
                            animate={{
                                rotateY: isHovered ? 180 : 0,
                                scale: isHovered ? 1.1 : 1
                            }}
                            transition={{ duration: 0.6, type: "spring" }}
                            className="relative w-28 h-28 mx-auto mb-8"
                        >
                            {/* Spinning Ring */}
                            <motion.div
                                className={`absolute inset-0 rounded-full border-4 border-dashed ${index === 0 ? 'border-purple-500/30' : 'border-cyan-500/30'}`}
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            />

                            {/* Inner Circle */}
                            <div className={`absolute inset-2 rounded-full bg-gradient-to-br ${index === 0
                                ? 'from-purple-500 to-pink-600'
                                : 'from-cyan-500 to-blue-600'} flex items-center justify-center shadow-2xl`}>
                                <Calendar className="w-12 h-12 text-white" />
                            </div>
                        </motion.div>

                        {/* Title */}
                        <h3 className="text-4xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 group-hover:bg-clip-text transition-all duration-300">
                            {semester.nameAr}
                        </h3>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 text-white/50">
                            <div className="flex items-center gap-2">
                                <BookMarked className="w-5 h-5" />
                                <span className="text-lg">
                                    {semester.units.length > 0 ? `${semester.units.length} وحدات` : 'قريباً'}
                                </span>
                            </div>
                            {semester.units.length > 0 && (
                                <div className="flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    <span className="text-lg">+50 درس</span>
                                </div>
                            )}
                        </div>

                        {/* CTA Button */}
                        {isAvailable && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
                                className="mt-8"
                            >
                                <div className={`inline-flex items-center gap-2 px-6 py-3 rounded-full text-white font-medium
                  ${index === 0
                                        ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-500'}`}>
                                    <span>ابدأ التعلم</span>
                                    <ArrowRight className="w-5 h-5 rotate-180" />
                                </div>
                            </motion.div>
                        )}

                        {/* Badge */}
                        {!isAvailable && (
                            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full text-white/60">
                                <Sparkles className="w-4 h-4" />
                                <span>قريباً</span>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function GradePage() {
    const params = useParams();
    const countryId = params.country as string;
    const gradeId = params.grade as string;

    const country = getCountryById(countryId);
    const grade = getGradeById(countryId, gradeId);

    if (!country || !grade) {
        notFound();
    }

    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[100px]" />
                </div>

                <div className="relative container mx-auto px-4 py-12">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8 flex items-center gap-3 text-sm"
                    >
                        <Link href="/learn" className="text-white/40 hover:text-white transition-colors">تعلّم</Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <Link href={`/learn/${countryId}`} className="flex items-center gap-1 text-white/40 hover:text-white transition-colors">
                            <span>{country.flag}</span>
                            <span>{country.nameAr}</span>
                        </Link>
                        <ChevronLeft className="w-4 h-4 text-white/20" />
                        <span className="text-white font-medium">{grade.nameAr}</span>
                    </motion.div>

                    {/* Hero */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", delay: 0.2 }}
                            className="inline-flex items-center gap-2 bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-full mb-6"
                        >
                            <span className="text-2xl">{country.flag}</span>
                            <span className="text-white/70">{country.nameAr}</span>
                        </motion.div>

                        <h1 className="text-5xl md:text-7xl font-black text-white mb-6">
                            {grade.nameAr}
                        </h1>

                        <p className="text-xl text-white/50 max-w-lg mx-auto">
                            اختر الفصل الدراسي لبدء رحلة التعلم
                        </p>

                        {/* Animated Divider */}
                        <div className="flex items-center justify-center gap-3 mt-8">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 60 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="h-0.5 bg-gradient-to-r from-transparent to-purple-500 rounded-full"
                            />
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5 }}
                                className="w-3 h-3 bg-purple-500 rounded-full"
                            />
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 60 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                className="h-0.5 bg-gradient-to-l from-transparent to-purple-500 rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* Semesters Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                        {grade.semesters.map((semester, index) => (
                            <SemesterCard
                                key={semester.id}
                                semester={semester}
                                country={country}
                                grade={grade}
                                index={index}
                            />
                        ))}
                    </div>
                </div>

                {/* Bottom Gradient */}
                <div className="h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
        </MarketingLayout>
    );
}
