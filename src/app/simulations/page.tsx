'use client';

import { MarketingLayout } from '@/components/layout/marketing-layout';
import { motion, AnimatePresence } from 'framer-motion';
import { FlaskConical, ArrowLeft, Zap, Atom, RotateCw, Scale, ChevronLeft, ChevronRight, Sparkles, Battery } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { CollisionSimulator, ImpulseVisualizer, TorqueSimulator, EquilibriumSimulator, EnergySimulator } from '@/components/simulations';
import { Button } from '@/components/ui/button';

interface SimulationCard {
    id: string;
    title: string;
    description: string;
    icon: React.ElementType;
    gradient: string;
    shadowColor: string;
    available: boolean;
    unit: string;
    isNew?: boolean;
}

const simulations: SimulationCard[] = [
    {
        id: 'collision',
        title: 'محاكاة التصادمات',
        description: 'شاهد التصادم المرن وغير المرن مع محرك فيزياء Velocity Verlet',
        icon: Atom,
        gradient: 'from-purple-500 via-pink-500 to-purple-600',
        shadowColor: 'shadow-purple-500/25',
        available: true,
        unit: 'الزخم',
        isNew: true,
    },
    {
        id: 'impulse',
        title: 'محاكاة الدفع',
        description: 'استكشف العلاقة بين القوة والزمن والدفع',
        icon: Zap,
        gradient: 'from-emerald-500 via-cyan-500 to-teal-500',
        shadowColor: 'shadow-emerald-500/25',
        available: true,
        unit: 'الزخم',
    },
    {
        id: 'torque',
        title: 'محاكاة العزم',
        description: 'تعلم كيف يؤثر ذراع القوة والزاوية على العزم',
        icon: RotateCw,
        gradient: 'from-orange-500 via-amber-500 to-yellow-500',
        shadowColor: 'shadow-orange-500/25',
        available: true,
        unit: 'الحركة الدورانية',
        isNew: true,
    },
    {
        id: 'equilibrium',
        title: 'محاكاة التوازن',
        description: 'تحدَّ نفسك لتحقيق شروط الاتزان الميكانيكي',
        icon: Scale,
        gradient: 'from-blue-500 via-indigo-500 to-violet-500',
        shadowColor: 'shadow-blue-500/25',
        available: true,
        unit: 'التوازن والمرونة',
        isNew: true,
    },
    {
        id: 'energy',
        title: 'محاكاة الطاقة',
        description: 'شاهد تحول الطاقة بين الوضع والحركة',
        icon: Battery,
        gradient: 'from-yellow-500 via-green-500 to-emerald-500',
        shadowColor: 'shadow-yellow-500/25',
        available: true,
        unit: 'الشغل والطاقة',
        isNew: true,
    },
];

function SimulationCardComponent({ sim, onClick, isActive }: { sim: SimulationCard; onClick: () => void; isActive: boolean }) {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            whileHover={{ y: sim.available ? -8 : 0, scale: sim.available ? 1.02 : 1 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            onClick={() => sim.available && onClick()}
            className={`relative group cursor-pointer ${!sim.available && 'opacity-50 cursor-not-allowed'}`}
        >
            {/* Animated Glow Background */}
            <motion.div
                className={`absolute -inset-1 bg-gradient-to-r ${sim.gradient} rounded-3xl blur-xl`}
                animate={{
                    opacity: isHovered || isActive ? 0.7 : 0,
                    scale: isHovered ? 1.05 : 1
                }}
                transition={{ duration: 0.3 }}
            />

            {/* Card */}
            <div className={`relative h-full bg-slate-900/90 backdrop-blur-2xl rounded-3xl p-6 border ${isActive ? 'border-white/40' : 'border-white/10'} overflow-hidden transition-all duration-300`}>
                {/* Shimmer Effect */}
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
                    animate={{ x: isHovered ? '200%' : '-100%' }}
                    transition={{ duration: 0.8 }}
                />

                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                        backgroundSize: '24px 24px'
                    }} />
                </div>

                {/* New Badge */}
                {sim.isNew && (
                    <motion.div
                        className="absolute top-3 left-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1"
                        animate={{ scale: [1, 1.05, 1] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <Sparkles className="w-3 h-3" />
                        جديد
                    </motion.div>
                )}

                {/* Availability Badge */}
                <div className={`absolute top-3 right-3 text-xs px-3 py-1.5 rounded-full font-medium ${sim.available ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'}`}>
                    {sim.available ? '✓ متاح' : 'قريباً'}
                </div>

                {/* Icon */}
                <motion.div
                    className={`w-16 h-16 bg-gradient-to-br ${sim.gradient} rounded-2xl flex items-center justify-center mt-10 mb-5 shadow-xl ${sim.shadowColor}`}
                    animate={{
                        rotate: isHovered ? 10 : 0,
                        scale: isHovered ? 1.1 : 1,
                        y: isHovered ? -5 : 0
                    }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    <sim.icon className="w-8 h-8 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-purple-200 transition-all duration-300">{sim.title}</h3>
                <p className="text-sm text-white/50 mb-4 leading-relaxed">{sim.description}</p>

                {/* Unit Tag */}
                <div className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-gradient-to-r ${sim.gradient} bg-opacity-10 border border-white/10`}>
                    <span className="opacity-70">📚</span>
                    <span className="text-white/70">{sim.unit}</span>
                </div>

                {/* Hover Arrow */}
                <motion.div
                    className="absolute bottom-5 left-5 w-10 h-10 bg-white/5 rounded-full flex items-center justify-center"
                    animate={{
                        x: isHovered ? -5 : 0,
                        backgroundColor: isHovered ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)'
                    }}
                >
                    <ArrowLeft className="w-5 h-5 text-white/60" />
                </motion.div>
            </div>
        </motion.div>
    );
}

export default function SimulationsPage() {
    const [activeSimulation, setActiveSimulation] = useState<string | null>(null);

    const availableSimulations = simulations.filter(s => s.available);
    const currentIndex = availableSimulations.findIndex(s => s.id === activeSimulation);

    const goToNext = () => {
        if (currentIndex < availableSimulations.length - 1) {
            setActiveSimulation(availableSimulations[currentIndex + 1].id);
        }
    };

    const goToPrev = () => {
        if (currentIndex > 0) {
            setActiveSimulation(availableSimulations[currentIndex - 1].id);
        }
    };

    return (
        <MarketingLayout>
            <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden relative">
                {/* Animated Background Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[150px]"
                        animate={{
                            x: [0, 50, 0],
                            y: [0, -30, 0],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-[150px]"
                        animate={{
                            x: [0, -50, 0],
                            y: [0, 30, 0],
                            scale: [1, 1.2, 1]
                        }}
                        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                    />
                    <motion.div
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[100px]"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    />
                </div>

                <div className="container mx-auto px-4 py-12 relative z-10">
                    {/* Premium Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        {/* Floating Icon */}
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                            className="relative inline-block mb-8"
                        >
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl blur-2xl opacity-50"
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.7, 0.5] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            />
                            <div className="relative w-24 h-24 bg-gradient-to-br from-purple-500 via-pink-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/30">
                                <FlaskConical className="w-12 h-12 text-white" />
                            </div>
                        </motion.div>

                        <motion.h1
                            className="text-5xl md:text-7xl font-black text-white mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                        >
                            المختبر{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 animate-gradient">
                                الافتراضي
                            </span>
                        </motion.h1>

                        <motion.p
                            className="text-xl text-white/50 max-w-2xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            استكشف مفاهيم الفيزياء بطريقة لم ترها من قبل - محاكاة تفاعلية بدقة عالية وتصميم مبهر
                        </motion.p>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="flex justify-center gap-8 mt-8"
                        >
                            {[
                                { value: '4', label: 'محاكاة تفاعلية' },
                                { value: '∞', label: 'إمكانية التجربة' },
                                { value: '100%', label: 'دقة فيزيائية' },
                            ].map((stat, i) => (
                                <div key={i} className="text-center">
                                    <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">{stat.value}</p>
                                    <p className="text-sm text-white/40">{stat.label}</p>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Back button when simulation is active */}
                    <AnimatePresence>
                        {activeSimulation && (
                            <motion.div
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="mb-6"
                            >
                                <Button
                                    variant="ghost"
                                    onClick={() => setActiveSimulation(null)}
                                    className="text-white/70 hover:text-white hover:bg-white/10 gap-2"
                                >
                                    <ArrowLeft className="w-4 h-4" />
                                    العودة للقائمة
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Simulation Cards Grid OR Active Simulation */}
                    <AnimatePresence mode="wait">
                        {!activeSimulation ? (
                            <motion.div
                                key="grid"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                            >
                                {simulations.map((sim, index) => (
                                    <motion.div
                                        key={sim.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <SimulationCardComponent
                                            sim={sim}
                                            onClick={() => setActiveSimulation(sim.id)}
                                            isActive={false}
                                        />
                                    </motion.div>
                                ))}
                            </motion.div>
                        ) : (
                            <motion.div
                                key="simulation"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                className="max-w-5xl mx-auto"
                            >
                                {/* Navigation between simulations */}
                                <div className="flex items-center justify-between mb-8">
                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={goToPrev}
                                        disabled={currentIndex <= 0}
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
                                    >
                                        <ChevronRight className="w-5 h-5" />
                                        السابق
                                    </Button>

                                    <div className="flex gap-2">
                                        {availableSimulations.map((sim, i) => (
                                            <motion.button
                                                key={sim.id}
                                                onClick={() => setActiveSimulation(sim.id)}
                                                className={`h-3 rounded-full transition-all duration-300 ${sim.id === activeSimulation ? 'bg-gradient-to-r from-purple-500 to-pink-500 w-10' : 'bg-white/20 hover:bg-white/40 w-3'}`}
                                                whileHover={{ scale: 1.2 }}
                                                whileTap={{ scale: 0.9 }}
                                            />
                                        ))}
                                    </div>

                                    <Button
                                        variant="outline"
                                        size="lg"
                                        onClick={goToNext}
                                        disabled={currentIndex >= availableSimulations.length - 1}
                                        className="bg-white/5 border-white/10 text-white hover:bg-white/10 gap-2"
                                    >
                                        التالي
                                        <ChevronLeft className="w-5 h-5" />
                                    </Button>
                                </div>

                                {/* Render active simulation */}
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeSimulation}
                                        initial={{ opacity: 0, x: 50 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -50 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeSimulation === 'collision3d' && <Collision3DSimulator />}
                                        {activeSimulation === 'collision' && <CollisionSimulator />}
                                        {activeSimulation === 'impulse' && <ImpulseVisualizer />}
                                        {activeSimulation === 'torque' && <TorqueSimulator />}
                                        {activeSimulation === 'equilibrium' && <EquilibriumSimulator />}
                                        {activeSimulation === 'energy' && <EnergySimulator />}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Back to Learn link */}
                    {!activeSimulation && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-center mt-16"
                        >
                            <Link
                                href="/learn"
                                className="inline-flex items-center gap-3 text-white/50 hover:text-white transition-all duration-300 bg-white/5 hover:bg-white/10 px-8 py-4 rounded-2xl border border-white/10 hover:border-white/20 group"
                            >
                                <motion.div
                                    animate={{ x: [0, 5, 0] }}
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                </motion.div>
                                <span className="text-lg">العودة للتعلم</span>
                            </Link>
                        </motion.div>
                    )}
                </div>
            </div>
        </MarketingLayout>
    );
}
