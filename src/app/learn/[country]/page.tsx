'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { getCountryById } from '@/data/countries';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowRight, BookOpen, Calendar, ChevronLeft, Star, Sparkles, Clock, Layers } from 'lucide-react';
import { notFound } from 'next/navigation';
import { useState, useRef } from 'react';

// 3D Tilt Effect for Cards
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });
    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const xPct = (e.clientX - rect.left) / rect.width - 0.5;
        const yPct = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            style={{ rotateY, rotateX, transformStyle: "preserve-3d" }}
            className={className}
        >
            <div style={{ transform: "translateZ(40px)" }}>{children}</div>
        </motion.div>
    );
}

// Grade Card Component
function GradeCard({ grade, country, index }: { grade: any; country: any; index: number }) {
    const [isHovered, setIsHovered] = useState(false);
    const totalUnits = grade.semesters.reduce((sum: number, s: any) => sum + s.units.length, 0);
    const isAvailable = totalUnits > 0;

    const gradients = [
        'from-violet-600 via-purple-600 to-indigo-700',
        'from-cyan-500 via-blue-600 to-indigo-600',
        'from-rose-500 via-pink-600 to-purple-600',
        'from-emerald-500 via-teal-600 to-cyan-600',
    ];

    return (
        <Link
            href={isAvailable ? `/learn/${country.id}/${grade.id}` : '#'}
            onClick={(e) => !isAvailable && e.preventDefault()}
            className={!isAvailable ? 'cursor-not-allowed' : ''}
        >
            <TiltCard>
                <motion.div
                    initial={{ opacity: 0, y: 60, rotateX: -15 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className={`relative group ${!isAvailable ? 'opacity-50' : ''}`}
                >
                    {/* Glow Effect */}
                    {isAvailable && (
                        <motion.div
                            className={`absolute -inset-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-3xl blur-xl`}
                            animate={{ opacity: isHovered ? 0.7 : 0 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}

                    {/* Main Card */}
                    <div className="relative bg-slate-900/80 backdrop-blur-2xl rounded-3xl overflow-hidden border border-white/10">
                        {/* Gradient Header */}
                        <div className={`relative h-32 bg-gradient-to-br ${gradients[index % gradients.length]} p-6 overflow-hidden`}>
                            {/* Decorative circles */}
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
                            <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/20 rounded-full blur-2xl" />

                            {/* Icon */}
                            <motion.div
                                animate={{ rotate: isHovered ? 10 : 0, scale: isHovered ? 1.1 : 1 }}
                                transition={{ type: "spring", stiffness: 400 }}
                                className="w-16 h-16 bg-white/20 backdrop-blur-xl rounded-2xl flex items-center justify-center border border-white/30"
                            >
                                <BookOpen className="w-8 h-8 text-white" />
                            </motion.div>

                            {/* Badge */}
                            {!isAvailable && (
                                <div className="absolute top-4 left-4 bg-black/40 backdrop-blur-xl px-3 py-1 rounded-full text-xs text-white/80 border border-white/20">
                                    قريباً
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-6">
                            <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                                {grade.nameAr}
                            </h3>

                            <div className="flex items-center gap-6 text-white/50 text-sm mb-4">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{grade.semesters.length} فصول</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Layers className="w-4 h-4" />
                                    <span>{totalUnits} وحدات</span>
                                </div>
                            </div>

                            {/* Progress bar simulation */}
                            {isAvailable && (
                                <div className="relative">
                                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-gradient-to-r ${gradients[index % gradients.length]} rounded-full`}
                                            initial={{ width: 0 }}
                                            animate={{ width: isHovered ? '100%' : '70%' }}
                                            transition={{ duration: 0.5 }}
                                        />
                                    </div>
                                    <p className="text-xs text-white/40 mt-2">محتوى جاهز للتعلم</p>
                                </div>
                            )}
                        </div>

                        {/* Hover Arrow */}
                        {isAvailable && (
                            <motion.div
                                className="absolute bottom-6 left-6 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center"
                                animate={{ x: isHovered ? -5 : 0, backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)' }}
                            >
                                <ArrowRight className="w-5 h-5 text-white rotate-180" />
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            </TiltCard>
        </Link>
    );
}

export default function CountryPage() {
    const params = useParams();
    const countryId = params.country as string;
    const country = getCountryById(countryId);

    if (!country) {
        notFound();
    }

    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/5 via-transparent to-transparent" />
                </div>

                <div className="relative container mx-auto px-4 py-12">
                    {/* Breadcrumb */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-8"
                    >
                        <Link
                            href="/learn"
                            className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors group"
                        >
                            <motion.div
                                whileHover={{ x: 5 }}
                                className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                            <span>العودة لاختيار الدولة</span>
                        </Link>
                    </motion.div>

                    {/* Hero Section */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        {/* Country Flag */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                            className="relative inline-block mb-6"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-2xl opacity-50 scale-150" />
                            <div className="relative text-9xl filter drop-shadow-2xl">{country.flag}</div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-5xl md:text-6xl font-black text-white mb-4"
                        >
                            مناهج{' '}
                            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                                {country.nameAr}
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                            className="text-xl text-white/50 max-w-xl mx-auto"
                        >
                            اختر المنهج الدراسي الخاص بك وابدأ رحلة التعلم
                        </motion.p>

                        {/* Decorative line */}
                        <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: 120 }}
                            transition={{ delay: 0.5, duration: 0.8 }}
                            className="h-1 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 mx-auto mt-8 rounded-full"
                        />
                    </motion.div>

                    {/* Grades Grid */}
                    <div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto"
                        style={{ perspective: '1500px' }}
                    >
                        {country.grades.map((grade, index) => (
                            <GradeCard key={grade.id} grade={grade} country={country} index={index} />
                        ))}
                    </div>
                </div>

                {/* Bottom Gradient */}
                <div className="h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
        </MarketingLayout>
    );
}
