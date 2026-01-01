'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef } from 'react';
import {
    SimulationControls,
    ParameterSlider,
    SimulationCanvas,
    useAnimationLoop,
    lerp,
    clamp,
    radiansToDegrees,
} from './simulation-base';
import { Scale, Info, Plus, Minus } from 'lucide-react';

interface EquilibriumSimulatorProps {
    className?: string;
}

// Physics constants
const g = 9.8;
const FIXED_DT = 1 / 120;

export function EquilibriumSimulator({ className = '' }: EquilibriumSimulatorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeScale, setTimeScale] = useState(1);

    // Beam properties
    const beamMass = 2; // kg
    const beamLength = 2; // m

    // Weights
    const [leftWeight, setLeftWeight] = useState(3); // kg
    const [leftPosition, setLeftPosition] = useState(0.6); // m from pivot
    const [rightWeight, setRightWeight] = useState(2); // kg
    const [rightPosition, setRightPosition] = useState(0.8); // m from pivot

    // Canvas
    const canvasWidth = 800;
    const canvasHeight = 450;
    const pivotX = canvasWidth / 2;
    const pivotY = 200;
    const pixelsPerMeter = 180;

    // Physics state
    const stateRef = useRef({
        theta: 0, // radians
        omega: 0, // rad/s
        prevTheta: 0,
        time: 0,
    });

    // Calculate moment of inertia
    // Beam: I_beam = (1/12)*m*L² about center
    // Weights: I = m*r² each (point masses)
    const beamI = (1 / 12) * beamMass * beamLength * beamLength;
    const leftI = leftWeight * leftPosition * leftPosition;
    const rightI = rightWeight * rightPosition * rightPosition;
    const totalI = beamI + leftI + rightI;

    // Calculate torques (positive = counterclockwise)
    // τ_left = m_left * g * r_left * cos(θ) (causes clockwise)
    // τ_right = m_right * g * r_right * cos(θ) (causes counterclockwise)
    const leftTorque = leftWeight * g * leftPosition; // clockwise (negative)
    const rightTorque = rightWeight * g * rightPosition; // counterclockwise (positive)
    const netTorque = rightTorque - leftTorque; // at theta=0

    // Damping (pivot friction + air resistance)
    const damping = 0.3;

    const accumulatorRef = useRef(0);

    const [renderState, setRenderState] = useState({
        theta: 0,
        omega: 0,
    });

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        accumulatorRef.current = 0;
        stateRef.current = { theta: 0, omega: 0, prevTheta: 0, time: 0 };
        setRenderState({ theta: 0, omega: 0 });
    }, []);

    // Check equilibrium
    const isBalanced = Math.abs(leftTorque - rightTorque) < 0.1;

    // Physics step (compound pendulum)
    const physicsStep = useCallback((dt: number) => {
        const state = stateRef.current;
        state.prevTheta = state.theta;

        // Net torque including gravity effect on tilted beam
        // τ_net = (m_right * r_right - m_left * r_left) * g * cos(θ)
        // Note: when beam tilts, torque changes due to cos(θ)
        const effectiveTorque = (rightWeight * rightPosition - leftWeight * leftPosition) * g * Math.cos(state.theta);

        // Angular acceleration: α = τ/I - damping*ω
        const alpha = effectiveTorque / totalI - damping * state.omega;

        // Velocity Verlet
        const newTheta = state.theta + state.omega * dt + 0.5 * alpha * dt * dt;
        const newAlpha = effectiveTorque / totalI - damping * state.omega; // recalculate
        const newOmega = state.omega + 0.5 * (alpha + newAlpha) * dt;

        // Clamp to prevent extreme angles
        state.theta = clamp(newTheta, -Math.PI / 4, Math.PI / 4);
        state.omega = newOmega;

        // Stop if nearly stopped at equilibrium
        if (Math.abs(state.omega) < 0.001 && Math.abs(state.theta) < 0.001 && isBalanced) {
            state.theta = 0;
            state.omega = 0;
        }

        state.time += dt;
    }, [leftWeight, leftPosition, rightWeight, rightPosition, totalI, damping, isBalanced]);

    useAnimationLoop((deltaTime) => {
        const scaledDt = deltaTime * timeScale;
        accumulatorRef.current += scaledDt;

        let steps = 0;
        while (accumulatorRef.current >= FIXED_DT && steps < 16) {
            physicsStep(FIXED_DT);
            accumulatorRef.current -= FIXED_DT;
            steps++;
        }

        const state = stateRef.current;
        const alpha = clamp(accumulatorRef.current / FIXED_DT, 0, 1);
        const interpTheta = lerp(state.prevTheta, state.theta, alpha);

        setRenderState({
            theta: interpTheta,
            omega: state.omega,
        });
    }, isPlaying);

    const thetaDeg = radiansToDegrees(renderState.theta);

    // Weight visual sizes
    const getWeightSize = (mass: number) => 20 + mass * 6;

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Scale className="w-6 h-6 text-emerald-400" />
                    <h2 className="text-3xl font-black text-white">
                        محاكاة <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-400 bg-clip-text text-transparent">التوازن</span>
                    </h2>
                    <Scale className="w-6 h-6 text-emerald-400" />
                </div>
                <p className="text-white/60">Compound Pendulum Dynamics</p>
            </motion.div>

            {/* Status Banner */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                    opacity: 1,
                    scale: 1,
                    backgroundColor: isBalanced ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)'
                }}
                className={`max-w-md mx-auto rounded-2xl p-4 border ${isBalanced ? 'border-green-500/30' : 'border-red-500/30'} backdrop-blur-xl text-center`}
            >
                <motion.div
                    animate={{ scale: isBalanced ? [1, 1.1, 1] : 1 }}
                    transition={{ duration: 0.5, repeat: isBalanced ? Infinity : 0, repeatDelay: 1 }}
                    className="flex items-center justify-center gap-3"
                >
                    <span className="text-2xl">{isBalanced ? '⚖️' : '⚠️'}</span>
                    <span className={`text-xl font-bold ${isBalanced ? 'text-green-400' : 'text-red-400'}`}>
                        {isBalanced ? 'متوازن!' : 'غير متوازن'}
                    </span>
                </motion.div>
                <p className="text-sm text-white/60 mt-1">
                    τ_left = {leftTorque.toFixed(2)} N·m | τ_right = {rightTorque.toFixed(2)} N·m
                </p>
            </motion.div>

            {/* Main Canvas */}
            <SimulationCanvas className="h-[420px] relative overflow-hidden">
                <svg width="100%" height="100%" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="relative z-10">
                    <defs>
                        <linearGradient id="beamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#4b5563" />
                            <stop offset="50%" stopColor="#6b7280" />
                            <stop offset="100%" stopColor="#4b5563" />
                        </linearGradient>
                        <linearGradient id="leftWeightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="100%" stopColor="#2563eb" />
                        </linearGradient>
                        <linearGradient id="rightWeightGrad" x1="50%" y1="0%" x2="50%" y2="100%">
                            <stop offset="0%" stopColor="#f472b6" />
                            <stop offset="100%" stopColor="#db2777" />
                        </linearGradient>
                        <radialGradient id="pivotGrad2" cx="30%" cy="30%">
                            <stop offset="0%" stopColor="#fcd34d" />
                            <stop offset="50%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#b45309" />
                        </radialGradient>
                        <filter id="shadowFilter" x="-50%" y="-50%" width="200%" height="200%">
                            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* Support Stand */}
                    <polygon points={`${pivotX - 40},${pivotY + 180} ${pivotX + 40},${pivotY + 180} ${pivotX + 20},${pivotY + 30} ${pivotX - 20},${pivotY + 30}`} fill="#374151" />
                    <rect x={pivotX - 50} y={pivotY + 175} width={100} height={20} rx={5} fill="#4b5563" />

                    {/* Rotating beam group */}
                    <g transform={`rotate(${thetaDeg} ${pivotX} ${pivotY})`}>
                        {/* Beam */}
                        <rect
                            x={pivotX - beamLength * pixelsPerMeter / 2}
                            y={pivotY - 10}
                            width={beamLength * pixelsPerMeter}
                            height={20}
                            rx={4}
                            fill="url(#beamGrad)"
                            filter="url(#shadowFilter)"
                        />
                        {/* Beam highlight */}
                        <rect
                            x={pivotX - beamLength * pixelsPerMeter / 2 + 5}
                            y={pivotY - 7}
                            width={beamLength * pixelsPerMeter - 10}
                            height={3}
                            rx={2}
                            fill="rgba(255,255,255,0.15)"
                        />

                        {/* Distance markers */}
                        {[-0.8, -0.6, -0.4, -0.2, 0.2, 0.4, 0.6, 0.8].map((d, i) => (
                            <g key={i}>
                                <line
                                    x1={pivotX + d * pixelsPerMeter}
                                    y1={pivotY - 12}
                                    x2={pivotX + d * pixelsPerMeter}
                                    y2={pivotY - 18}
                                    stroke="rgba(255,255,255,0.3)"
                                    strokeWidth={1}
                                />
                            </g>
                        ))}

                        {/* Left weight and rope */}
                        <g transform={`translate(${pivotX - leftPosition * pixelsPerMeter}, ${pivotY})`}>
                            {/* Rope */}
                            <line x1={0} y1={10} x2={0} y2={60} stroke="#a78bfa" strokeWidth={3} strokeLinecap="round" />
                            {/* Weight hook */}
                            <path d="M -5 55 Q 0 65, 5 55" stroke="#a78bfa" strokeWidth={2} fill="none" />
                            {/* Weight */}
                            <motion.rect
                                x={-getWeightSize(leftWeight) / 2}
                                y={65}
                                width={getWeightSize(leftWeight)}
                                height={getWeightSize(leftWeight) * 0.8}
                                rx={4}
                                fill="url(#leftWeightGrad)"
                                filter="url(#shadowFilter)"
                                animate={{ y: isPlaying ? [65, 67, 65] : 65 }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                            {/* Weight label */}
                            <text x={0} y={65 + getWeightSize(leftWeight) * 0.5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                {leftWeight}kg
                            </text>
                            {/* Position label */}
                            <text x={0} y={-20} textAnchor="middle" fill="#60a5fa" fontSize="10">
                                {leftPosition}m
                            </text>
                        </g>

                        {/* Right weight and rope */}
                        <g transform={`translate(${pivotX + rightPosition * pixelsPerMeter}, ${pivotY})`}>
                            {/* Rope */}
                            <line x1={0} y1={10} x2={0} y2={60} stroke="#f472b6" strokeWidth={3} strokeLinecap="round" />
                            {/* Weight hook */}
                            <path d="M -5 55 Q 0 65, 5 55" stroke="#f472b6" strokeWidth={2} fill="none" />
                            {/* Weight */}
                            <motion.rect
                                x={-getWeightSize(rightWeight) / 2}
                                y={65}
                                width={getWeightSize(rightWeight)}
                                height={getWeightSize(rightWeight) * 0.8}
                                rx={4}
                                fill="url(#rightWeightGrad)"
                                filter="url(#shadowFilter)"
                                animate={{ y: isPlaying ? [65, 67, 65] : 65 }}
                                transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}
                            />
                            {/* Weight label */}
                            <text x={0} y={65 + getWeightSize(rightWeight) * 0.5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
                                {rightWeight}kg
                            </text>
                            {/* Position label */}
                            <text x={0} y={-20} textAnchor="middle" fill="#f472b6" fontSize="10">
                                {rightPosition}m
                            </text>
                        </g>
                    </g>

                    {/* Pivot (on top) */}
                    <circle cx={pivotX} cy={pivotY} r={18} fill="url(#pivotGrad2)" filter="url(#shadowFilter)" />
                    <circle cx={pivotX - 4} cy={pivotY - 4} r={4} fill="rgba(255,255,255,0.4)" />
                    <circle cx={pivotX} cy={pivotY} r={5} fill="#78350f" />

                    {/* Angle indicator */}
                    {Math.abs(thetaDeg) > 1 && (
                        <>
                            <path
                                d={`M ${pivotX} ${pivotY - 50} A 50 50 0 0 ${thetaDeg > 0 ? 0 : 1} ${pivotX + 50 * Math.sin(renderState.theta)} ${pivotY - 50 * Math.cos(renderState.theta)}`}
                                stroke="#fbbf24"
                                strokeWidth={2}
                                fill="none"
                            />
                            <text x={pivotX + 60} y={pivotY - 45} fill="#fbbf24" fontSize="11">
                                {Math.abs(thetaDeg).toFixed(1)}°
                            </text>
                        </>
                    )}
                </svg>

                {/* Formula */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-emerald-500/20">
                    <p className="text-xs text-emerald-400/70 mb-1">شرط التوازن</p>
                    <p className="text-white font-mono text-sm" dir="ltr">Στ = 0</p>
                    <p className="text-white/70 font-mono text-sm" dir="ltr">m₁gr₁ = m₂gr₂</p>
                    <div className="mt-2 pt-2 border-t border-white/10">
                        <p className={`text-lg font-bold ${isBalanced ? 'text-green-400' : 'text-red-400'}`} dir="ltr">
                            Δτ = {Math.abs(netTorque).toFixed(2)} N·m
                        </p>
                    </div>
                </motion.div>
            </SimulationCanvas>

            {/* Controls */}
            <SimulationControls
                isPlaying={isPlaying}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                onReset={handleReset}
                timeScale={timeScale}
                onTimeScaleChange={setTimeScale}
                showTimeControls={true}
            />

            {/* Parameters */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Weight */}
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-blue-500/10 to-indigo-500/5 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">←</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">الثقل الأيسر</h3>
                            <p className="text-xs text-blue-300/60">τ = {leftTorque.toFixed(2)} N·m</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <ParameterSlider label="الكتلة" value={leftWeight} min={1} max={10} step={0.5} unit="kg" onChange={setLeftWeight} />
                        <ParameterSlider label="البعد عن المحور" value={leftPosition} min={0.2} max={0.9} step={0.1} unit="m" onChange={setLeftPosition} />
                    </div>
                </motion.div>

                {/* Right Weight */}
                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-xl rounded-2xl p-5 border border-pink-500/20">
                    <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-xl flex items-center justify-center">
                            <span className="text-white font-bold">→</span>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-white">الثقل الأيمن</h3>
                            <p className="text-xs text-pink-300/60">τ = {rightTorque.toFixed(2)} N·m</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <ParameterSlider label="الكتلة" value={rightWeight} min={1} max={10} step={0.5} unit="kg" onChange={setRightWeight} />
                        <ParameterSlider label="البعد عن المحور" value={rightPosition} min={0.2} max={0.9} step={0.1} unit="m" onChange={setRightPosition} />
                    </div>
                </motion.div>
            </div>

            {/* Data Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'العزم الأيسر', value: leftTorque.toFixed(2), unit: 'N·m', icon: '⬅️', gradient: 'from-blue-400 to-indigo-400' },
                    { label: 'العزم الأيمن', value: rightTorque.toFixed(2), unit: 'N·m', icon: '➡️', gradient: 'from-pink-400 to-rose-400' },
                    { label: 'الفرق', value: Math.abs(netTorque).toFixed(2), unit: 'N·m', icon: '⚖️', gradient: isBalanced ? 'from-green-400 to-emerald-400' : 'from-red-400 to-orange-400' },
                    { label: 'الزاوية', value: Math.abs(thetaDeg).toFixed(1), unit: '°', icon: '📐', gradient: 'from-amber-400 to-yellow-400' },
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}
                        className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                    >
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-lg">{item.icon}</span>
                            <span className="text-white/50 text-xs">{item.label}</span>
                        </div>
                        <p className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.value}<span className="text-xs text-white/40 mr-1">{item.unit}</span>
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Challenge */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                        <span className="text-xl">🎯</span>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white">تحدي التوازن!</h4>
                        <p className="text-white/60 text-sm">
                            حاول ضبط الأثقال والمسافات بحيث يتوازن الميزان. تذكر: <strong className="text-emerald-400">m₁ × r₁ = m₂ × r₂</strong>
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-1">⚖️ شرط التوازن</h4>
                        <p className="text-white/60 text-sm">
                            لتحقيق التوازن: مجموع العزوم = صفر. هذا يعني <strong className="text-emerald-400">τ₁ = τ₂</strong> أو <strong className="text-emerald-400">m₁gr₁ = m₂gr₂</strong>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
