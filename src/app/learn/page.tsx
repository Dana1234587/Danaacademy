'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { portals } from '@/data/portals';
import { countries } from '@/data/countries';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, GraduationCap, Globe, ArrowLeft, Zap, Trophy, Users, Star, BookOpen, Gamepad2, FlaskConical, FileQuestion, BookMarked } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

// Animated background particles
function FloatingParticles() {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-2 h-2 bg-primary/20 rounded-full"
                    initial={{
                        x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000),
                        y: Math.random() * 600,
                        scale: Math.random() * 0.5 + 0.5,
                        opacity: 0.3
                    }}
                    animate={{
                        y: [null, Math.random() * -200 - 100],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: Math.random() * 10 + 10,
                        repeat: Infinity,
                        ease: "linear"
                    }}
                />
            ))}
        </div>
    );
}

// 3D Tilt Card Effect
function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateY,
                rotateX,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            <div style={{ transform: "translateZ(50px)", transformStyle: "preserve-3d" }}>
                {children}
            </div>
        </motion.div>
    );
}

// Animated Counter
function AnimatedNumber({ value }: { value: number }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const duration = 2000;
        const steps = 60;
        const increment = value / steps;
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
                setCount(value);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);

        return () => clearInterval(timer);
    }, [value]);

    return <span>{count.toLocaleString()}</span>;
}

// Country Card with Premium Design
function CountryCard({ country, index }: { country: typeof countries[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    const gradients = [
        'from-rose-500 via-pink-500 to-purple-600',
        'from-blue-500 via-cyan-500 to-teal-500',
        'from-amber-500 via-orange-500 to-red-500',
        'from-emerald-500 via-green-500 to-teal-600',
    ];

    return (
        <Link href={`/learn/${country.id}`}>
            <TiltCard>
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    onHoverStart={() => setIsHovered(true)}
                    onHoverEnd={() => setIsHovered(false)}
                    className="relative group cursor-pointer"
                >
                    {/* Glow Effect */}
                    <motion.div
                        className={`absolute -inset-1 bg-gradient-to-r ${gradients[index % gradients.length]} rounded-3xl blur-xl opacity-0 group-hover:opacity-70 transition-all duration-500`}
                        animate={{ scale: isHovered ? 1.05 : 1 }}
                    />

                    {/* Card */}
                    <div className="relative bg-black/40 backdrop-blur-xl rounded-3xl p-8 border border-white/10 overflow-hidden">
                        {/* Shimmer Effect */}
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full"
                            animate={{ x: isHovered ? '200%' : '-100%' }}
                            transition={{ duration: 0.8 }}
                        />

                        {/* Flag */}
                        <motion.div
                            className="text-8xl mb-6 filter drop-shadow-2xl"
                            animate={{
                                scale: isHovered ? 1.1 : 1,
                                rotateY: isHovered ? 10 : 0
                            }}
                            transition={{ type: "spring", stiffness: 300 }}
                        >
                            {country.flag}
                        </motion.div>

                        {/* Country Name */}
                        <h3 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">
                            {country.nameAr}
                        </h3>

                        {/* Stats */}
                        <div className="flex items-center gap-4 text-white/70">
                            <div className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span>{country.grades.length} مناهج</span>
                            </div>
                        </div>

                        {/* Arrow */}
                        <motion.div
                            className="absolute bottom-6 left-6 w-12 h-12 bg-white/10 rounded-full flex items-center justify-center"
                            animate={{
                                x: isHovered ? -5 : 0,
                                backgroundColor: isHovered ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)'
                            }}
                        >
                            <ArrowLeft className="w-5 h-5 text-white" />
                        </motion.div>
                    </div>
                </motion.div>
            </TiltCard>
        </Link>
    );
}

// Portal Card with Premium Design
function PortalCard({ portal, index }: { portal: typeof portals[0]; index: number }) {
    const [isHovered, setIsHovered] = useState(false);

    const icons: { [key: string]: any } = {
        'learn': BookOpen,
        'simulations': FlaskConical,
        'games': Gamepad2,
        'exams-archive': FileQuestion,
        'books': BookMarked,
    };

    const Icon = icons[portal.id] || BookOpen;

    return (
        <Link href={portal.href}>
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                whileHover={{ y: -10 }}
                className="relative group cursor-pointer"
            >
                {/* Glow */}
                <div className={`absolute -inset-0.5 bg-gradient-to-r ${portal.gradient} rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                {/* Card */}
                <div className="relative h-full bg-slate-900/90 backdrop-blur-xl rounded-2xl p-6 border border-white/5 overflow-hidden">
                    {/* Background Pattern */}
                    <div className="absolute inset-0 opacity-5">
                        <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                            backgroundSize: '20px 20px'
                        }} />
                    </div>

                    {/* Icon */}
                    <motion.div
                        className={`w-16 h-16 bg-gradient-to-br ${portal.gradient} rounded-2xl flex items-center justify-center mb-4 shadow-lg`}
                        animate={{ rotate: isHovered ? 5 : 0, scale: isHovered ? 1.1 : 1 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Icon className="w-8 h-8 text-white" />
                    </motion.div>

                    {/* Content */}
                    <h3 className="text-xl font-bold text-white mb-2">{portal.nameAr}</h3>
                    <p className="text-sm text-white/60 leading-relaxed">{portal.descriptionAr}</p>

                    {/* Hover Arrow */}
                    <motion.div
                        className="absolute bottom-4 left-4"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : 10 }}
                    >
                        <ArrowLeft className="w-5 h-5 text-white/60" />
                    </motion.div>
                </div>
            </motion.div>
        </Link>
    );
}

export default function LearnPage() {
    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
                {/* Animated Background */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
                    <FloatingParticles />
                </div>

                {/* Hero Section */}
                <div className="relative pt-20 pb-16 px-4">
                    <div className="container mx-auto">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-center mb-8"
                        >
                            <div className="relative">
                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-full blur opacity-75 animate-pulse" />
                                <div className="relative inline-flex items-center gap-2 bg-black/50 backdrop-blur-xl text-white px-6 py-3 rounded-full border border-white/10">
                                    <Sparkles className="w-5 h-5 text-yellow-400" />
                                    <span className="font-medium">منصة التعلم المجانية الأولى عربياً</span>
                                    <Star className="w-5 h-5 text-yellow-400" />
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Title */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-center mb-6"
                        >
                            <h1 className="text-5xl md:text-7xl font-black text-white mb-4">
                                <span className="bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">
                                    اكتشف عالم
                                </span>
                                <br />
                                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-blue-400 bg-clip-text text-transparent animate-gradient">
                                    الفيزياء الساحر
                                </span>
                            </h1>
                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-xl text-white/60 max-w-2xl mx-auto mb-6"
                            >
                                رحلة تعليمية فريدة مع شرح تفاعلي، محاكاة حية، وألعاب تعليمية
                            </motion.p>

                            {/* Free Login CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="flex justify-center"
                            >
                                <Link
                                    href="/free-login"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:-translate-y-1"
                                >
                                    <svg viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                                        <path fill="#fff" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                                        <path fill="#fff" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2970244 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                                        <path fill="#fff" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                                        <path fill="#fff" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7301709 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                                    </svg>
                                    <span>سجّل بحساب Google مجاناً</span>
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="flex justify-center gap-8 md:gap-16 mb-16"
                        >
                            {[
                                { icon: Users, value: 5000, label: 'طالب نشط' },
                                { icon: BookOpen, value: 100, label: 'درس تفاعلي' },
                                { icon: Trophy, value: 95, label: '% نسبة النجاح', suffix: '%' },
                            ].map((stat, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.5 + i * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="w-14 h-14 mx-auto mb-2 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl flex items-center justify-center border border-white/10">
                                        <stat.icon className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <div className="text-3xl font-bold text-white">
                                        <AnimatedNumber value={stat.value} />
                                        {stat.suffix}
                                    </div>
                                    <div className="text-sm text-white/50">{stat.label}</div>
                                </motion.div>
                            ))}
                        </motion.div>

                        {/* Countries Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mb-20"
                        >
                            <div className="text-center mb-10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100px' }}
                                    transition={{ delay: 0.5, duration: 0.8 }}
                                    className="h-1 bg-gradient-to-r from-purple-500 to-pink-500 mx-auto mb-6 rounded-full"
                                />
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    اختر <span className="text-purple-400">دولتك</span>
                                </h2>
                                <p className="text-white/50">محتوى مخصص لمنهجك الدراسي</p>
                            </div>

                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" style={{ perspective: '1000px' }}>
                                {countries.map((country, index) => (
                                    <CountryCard key={country.id} country={country} index={index} />
                                ))}
                            </div>
                        </motion.div>

                        {/* Portals Section */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <div className="text-center mb-10">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '100px' }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                    className="h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto mb-6 rounded-full"
                                />
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                                    استكشف <span className="text-blue-400">البوابات التعليمية</span>
                                </h2>
                                <p className="text-white/50">أدوات تعليمية متنوعة لتجربة فريدة</p>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 max-w-6xl mx-auto">
                                {portals.map((portal, index) => (
                                    <PortalCard key={portal.id} portal={portal} index={index} />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Gradient */}
                <div className="h-32 bg-gradient-to-t from-background to-transparent" />
            </div>
        </MarketingLayout>
    );
}
