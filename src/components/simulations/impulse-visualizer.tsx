'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useMemo } from 'react';
import {
    SimulationControls,
    ParameterSlider,
    SimulationCanvas,
    useAnimationLoop
} from './simulation-base';
import { TrendingUp, Clock, Zap, Info, Sparkles } from 'lucide-react';

interface ImpulseVisualizerProps {
    className?: string;
}

export function ImpulseVisualizer({ className = '' }: ImpulseVisualizerProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [scenario, setScenario] = useState<'short' | 'long'>('short');

    // Parameters
    const [totalImpulse] = useState(100);

    // Scenarios
    const scenarios = {
        short: { force: 500, time: 0.2, description: 'قوة كبيرة لزمن قصير', color: 'orange' },
        long: { force: 50, time: 2, description: 'قوة صغيرة لزمن طويل', color: 'emerald' },
    };

    const currentScenario = scenarios[scenario];
    const maxTime = Math.max(scenarios.short.time, scenarios.long.time) + 0.5;

    // Calculated values
    const calculatedImpulse = currentScenario.force * currentScenario.time;

    // Chart dimensions
    const chartWidth = 700;
    const chartHeight = 300;
    const padding = { top: 40, right: 50, bottom: 60, left: 70 };
    const plotWidth = chartWidth - padding.left - padding.right;
    const plotHeight = chartHeight - padding.top - padding.bottom;

    // Scale functions
    const scaleX = (t: number) => padding.left + (t / maxTime) * plotWidth;
    const scaleY = (f: number) => chartHeight - padding.bottom - (f / 600) * plotHeight;

    // Generate filled area path
    const generateAreaPath = () => {
        const { force, time } = currentScenario;
        const animatedTime = Math.min(currentTime, time);

        return `
            M ${scaleX(0)} ${scaleY(0)}
            L ${scaleX(0)} ${scaleY(force)}
            L ${scaleX(animatedTime)} ${scaleY(force)}
            L ${scaleX(animatedTime)} ${scaleY(0)}
            Z
        `;
    };

    // Current impulse based on animation
    const currentImpulseValue = useMemo(() => {
        const { time, force } = currentScenario;
        const animatedTime = Math.min(currentTime, time);
        return force * animatedTime;
    }, [currentTime, currentScenario]);

    const progressPercentage = Math.min((currentImpulseValue / calculatedImpulse) * 100, 100);

    // Animation
    useAnimationLoop((deltaTime) => {
        setCurrentTime(prev => {
            const newTime = prev + deltaTime * 0.8;
            if (newTime >= maxTime) {
                setIsPlaying(false);
                return maxTime;
            }
            return newTime;
        });
    }, isPlaying);

    const handleReset = () => {
        setIsPlaying(false);
        setCurrentTime(0);
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Premium Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-3xl font-black text-white">
                        محاكاة <span className="bg-gradient-to-r from-emerald-400 via-cyan-400 to-emerald-400 bg-clip-text text-transparent">الدفع</span>
                    </h2>
                    <Zap className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-white/60">الدفع = القوة × الزمن = المساحة تحت منحنى القوة-الزمن</p>
            </motion.div>

            {/* Scenario Toggle - Premium Style */}
            <div className="flex justify-center gap-4">
                {[
                    { key: 'short', icon: Zap, label: 'قوة كبيرة - زمن قصير', gradient: 'from-orange-500 to-red-500', shadowColor: 'shadow-orange-500/25' },
                    { key: 'long', icon: Clock, label: 'قوة صغيرة - زمن طويل', gradient: 'from-emerald-500 to-cyan-500', shadowColor: 'shadow-emerald-500/25' },
                ].map((btn) => (
                    <motion.button
                        key={btn.key}
                        onClick={() => { setScenario(btn.key as 'short' | 'long'); handleReset(); }}
                        className={`relative px-6 py-4 rounded-2xl border transition-all duration-300 overflow-hidden ${scenario === btn.key
                                ? `bg-gradient-to-r ${btn.gradient} border-transparent text-white shadow-xl ${btn.shadowColor}`
                                : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                            }`}
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        {scenario === btn.key && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                                initial={{ x: '-100%' }}
                                animate={{ x: '100%' }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                            />
                        )}
                        <div className="relative flex items-center gap-2">
                            <btn.icon className="w-5 h-5" />
                            <span className="font-medium">{btn.label}</span>
                        </div>
                    </motion.button>
                ))}
            </div>

            {/* Progress Bar */}
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-md mx-auto"
            >
                <div className="flex justify-between text-sm text-white/50 mb-2">
                    <span>تقدم الدفع</span>
                    <span>{progressPercentage.toFixed(0)}%</span>
                </div>
                <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                        className={`h-full bg-gradient-to-r ${scenario === 'short' ? 'from-orange-500 to-red-500' : 'from-emerald-500 to-cyan-500'} rounded-full`}
                        style={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
            </motion.div>

            {/* Premium Chart */}
            <SimulationCanvas className="p-8">
                <svg width="100%" height="100%" viewBox={`0 0 ${chartWidth} ${chartHeight}`} className="relative z-10">
                    <defs>
                        {/* Gradient fills */}
                        <linearGradient id="shortAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#f97316" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                        </linearGradient>
                        <linearGradient id="longAreaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.9" />
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0.2" />
                        </linearGradient>

                        {/* Glow filter */}
                        <filter id="chartGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>

                    {/* Background Grid */}
                    {[0, 100, 200, 300, 400, 500].map(f => (
                        <g key={f}>
                            <line
                                x1={padding.left}
                                y1={scaleY(f)}
                                x2={chartWidth - padding.right}
                                y2={scaleY(f)}
                                stroke="rgba(255,255,255,0.08)"
                                strokeDasharray="6,6"
                            />
                            <text
                                x={padding.left - 15}
                                y={scaleY(f) + 4}
                                textAnchor="end"
                                fill="rgba(255,255,255,0.4)"
                                fontSize="12"
                                fontWeight="500"
                            >
                                {f}
                            </text>
                        </g>
                    ))}

                    {/* X-axis labels */}
                    {[0, 0.5, 1, 1.5, 2, 2.5].map(t => (
                        <g key={t}>
                            <line
                                x1={scaleX(t)}
                                y1={chartHeight - padding.bottom}
                                x2={scaleX(t)}
                                y2={chartHeight - padding.bottom + 8}
                                stroke="rgba(255,255,255,0.3)"
                            />
                            <text
                                x={scaleX(t)}
                                y={chartHeight - padding.bottom + 25}
                                textAnchor="middle"
                                fill="rgba(255,255,255,0.4)"
                                fontSize="12"
                                fontWeight="500"
                            >
                                {t}s
                            </text>
                        </g>
                    ))}

                    {/* Axes with gradient */}
                    <line x1={padding.left} y1={padding.top - 10} x2={padding.left} y2={chartHeight - padding.bottom} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                    <line x1={padding.left} y1={chartHeight - padding.bottom} x2={chartWidth - padding.right + 10} y2={chartHeight - padding.bottom} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />

                    {/* Axis labels */}
                    <text
                        x={padding.left - 50}
                        y={chartHeight / 2}
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                        transform={`rotate(-90, ${padding.left - 50}, ${chartHeight / 2})`}
                    >
                        القوة (N)
                    </text>
                    <text
                        x={chartWidth / 2}
                        y={chartHeight - 15}
                        textAnchor="middle"
                        fill="white"
                        fontSize="14"
                        fontWeight="600"
                    >
                        الزمن (s)
                    </text>

                    {/* Force Rectangle Outline (full height) */}
                    <rect
                        x={scaleX(0)}
                        y={scaleY(currentScenario.force)}
                        width={scaleX(currentScenario.time) - scaleX(0)}
                        height={scaleY(0) - scaleY(currentScenario.force)}
                        fill="none"
                        stroke={scenario === 'short' ? 'rgba(249, 115, 22, 0.3)' : 'rgba(16, 185, 129, 0.3)'}
                        strokeWidth={2}
                        strokeDasharray="8,4"
                    />

                    {/* Filled Area (Impulse) - Animated */}
                    <motion.path
                        d={generateAreaPath()}
                        fill={scenario === 'short' ? 'url(#shortAreaGradient)' : 'url(#longAreaGradient)'}
                        filter="url(#chartGlow)"
                    />

                    {/* Force Line (Top of rectangle) */}
                    <line
                        x1={scaleX(0)}
                        y1={scaleY(currentScenario.force)}
                        x2={scaleX(Math.min(currentTime, currentScenario.time))}
                        y2={scaleY(currentScenario.force)}
                        stroke={scenario === 'short' ? '#f97316' : '#10b981'}
                        strokeWidth={4}
                        strokeLinecap="round"
                    />

                    {/* Current time indicator line */}
                    {currentTime > 0 && currentTime <= currentScenario.time && (
                        <motion.g>
                            <line
                                x1={scaleX(currentTime)}
                                y1={scaleY(currentScenario.force)}
                                x2={scaleX(currentTime)}
                                y2={scaleY(0)}
                                stroke={scenario === 'short' ? '#f97316' : '#10b981'}
                                strokeWidth={3}
                                strokeLinecap="round"
                            />
                            {/* Animated dot */}
                            <motion.circle
                                cx={scaleX(currentTime)}
                                cy={scaleY(currentScenario.force)}
                                r={8}
                                fill={scenario === 'short' ? '#f97316' : '#10b981'}
                                filter="url(#chartGlow)"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                        </motion.g>
                    )}

                    {/* Area Label */}
                    {currentTime > 0.1 && (
                        <motion.text
                            x={scaleX(Math.min(currentTime, currentScenario.time) / 2)}
                            y={scaleY(currentScenario.force / 2)}
                            textAnchor="middle"
                            fill="white"
                            fontSize="18"
                            fontWeight="bold"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            J = {currentImpulseValue.toFixed(1)} N·s
                        </motion.text>
                    )}
                </svg>

                {/* Formula Display */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10"
                >
                    <p className="text-xs text-white/50 mb-2">قانون الدفع</p>
                    <p className="text-white font-mono text-lg" dir="ltr">
                        J = F × Δt
                    </p>
                    <p className="text-white font-mono text-sm mt-1" dir="ltr">
                        J = ∫F dt
                    </p>
                </motion.div>
            </SimulationCanvas>

            {/* Controls */}
            <SimulationControls
                isPlaying={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onReset={handleReset}
            />

            {/* Premium Values Display */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                    { label: 'القوة (F)', value: currentScenario.force, unit: 'N', gradient: scenario === 'short' ? 'from-orange-400 to-red-400' : 'from-emerald-400 to-cyan-400', icon: '💪' },
                    { label: 'الزمن (Δt)', value: currentScenario.time, unit: 's', gradient: scenario === 'short' ? 'from-orange-400 to-red-400' : 'from-emerald-400 to-cyan-400', icon: '⏱️' },
                    { label: 'الدفع الحالي', value: currentImpulseValue.toFixed(1), unit: 'N·s', gradient: 'from-purple-400 to-pink-400', icon: '📊' },
                    { label: 'الدفع الكلي (J)', value: calculatedImpulse, unit: 'N·s', gradient: 'from-yellow-400 to-orange-400', icon: '⚡', highlight: true },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className={`relative bg-black/40 backdrop-blur-xl rounded-2xl p-4 border ${item.highlight ? 'border-yellow-500/30' : 'border-white/10'} overflow-hidden`}
                    >
                        {item.highlight && (
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 to-orange-500/10"
                                animate={{ opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        )}
                        <div className="relative">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-lg">{item.icon}</span>
                                <p className="text-white/50 text-xs">{item.label}</p>
                            </div>
                            <p className={`text-2xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                                {item.value}
                                <span className="text-sm text-white/40 mr-1">{item.unit}</span>
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Info Card */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className={`bg-gradient-to-r ${scenario === 'short' ? 'from-orange-500/10 to-red-500/10' : 'from-emerald-500/10 to-cyan-500/10'} backdrop-blur-xl rounded-3xl p-6 border border-white/10`}
            >
                <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${scenario === 'short' ? 'from-orange-500 to-red-500' : 'from-emerald-500 to-cyan-500'} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg`}>
                        <Info className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">🔬 نظرية الدفع والزخم</h4>
                        <p className="text-white/60 text-sm leading-relaxed">
                            الدفع (J) يساوي حاصل ضرب القوة في الزمن: <span className={`${scenario === 'short' ? 'text-orange-400' : 'text-emerald-400'} font-mono`}>J = F × Δt</span>
                            <br /><br />
                            🎯 <strong>لاحظ:</strong> الدفع ثابت في كلا الحالتين ({calculatedImpulse} N·s) رغم اختلاف القوة والزمن!
                            <br /><br />
                            💡 <strong>تطبيق عملي:</strong> الوسائد الهوائية تزيد زمن التصادم فتقلل القوة على الجسم، مما يحمي الركاب أثناء الحوادث.
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
