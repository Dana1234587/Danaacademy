'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useRef } from 'react';
import {
    SimulationControls,
    ParameterSlider,
    SimulationCanvas,
    useAnimationLoop,
    lerp,
    clamp,
} from './simulation-base';
import { RotateCw, Info } from 'lucide-react';

interface TorqueSimulatorProps {
    className?: string;
}

// Physics constants
const FIXED_DT = 1 / 120;
const G = 9.81;

export function TorqueSimulator({ className = '' }: TorqueSimulatorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeScale, setTimeScale] = useState(1);

    // Parameters
    const [leverMass, setLeverMass] = useState(2); // kg
    const [leverLength, setLeverLength] = useState(0.8); // m
    const [damping, setDamping] = useState(0.1); // damping coefficient

    // Canvas dimensions
    const canvasWidth = 800;
    const canvasHeight = 500;
    const pivotX = canvasWidth / 2;
    const pivotY = canvasHeight / 2 - 60;
    const leverPixels = leverLength * 220;

    // Physics state
    // φ = angle from vertical DOWN (φ=0 means hanging straight down = equilibrium)
    // Positive φ = counterclockwise from down
    const stateRef = useRef({
        phi: Math.PI / 3, // Start 60° from vertical (to the right)
        omega: 0,
        prevPhi: Math.PI / 3,
        time: 0,
    });

    // Moment of inertia for uniform rod about end: I = (1/3)mL²
    const momentOfInertia = (1 / 3) * leverMass * leverLength * leverLength;

    // Accumulator
    const accumulatorRef = useRef(0);

    // Render state
    const [renderState, setRenderState] = useState({
        phi: Math.PI / 3,
        omega: 0,
        alpha: 0,
        torque: 0,
    });

    const handleReset = useCallback(() => {
        setIsPlaying(false);
        accumulatorRef.current = 0;
        const initialPhi = Math.PI / 3;
        stateRef.current = { phi: initialPhi, omega: 0, prevPhi: initialPhi, time: 0 };
        setRenderState({ phi: initialPhi, omega: 0, alpha: 0, torque: 0 });
    }, []);

    // Physics step - Simple Physical Pendulum
    // τ = -m*g*(L/2)*sin(φ) where φ is from vertical down
    const physicsStep = useCallback((dt: number) => {
        const state = stateRef.current;
        state.prevPhi = state.phi;

        const comDistance = leverLength / 2;

        // Torque from gravity: τ = -m*g*d*sin(φ)
        // When φ > 0 (lever to the right of vertical), torque is negative (pulls back left)
        // When φ < 0 (lever to the left of vertical), torque is positive (pulls back right)
        const gravityTorque = -leverMass * G * comDistance * Math.sin(state.phi);

        // Angular acceleration with damping
        const alpha = gravityTorque / momentOfInertia - damping * state.omega;

        // Velocity Verlet
        const newPhi = state.phi + state.omega * dt + 0.5 * alpha * dt * dt;
        const newOmega = state.omega + alpha * dt;

        state.phi = newPhi;
        state.omega = newOmega;
        state.time += dt;

    }, [leverLength, leverMass, momentOfInertia, damping]);

    // Animation loop
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
        const t = clamp(accumulatorRef.current / FIXED_DT, 0, 1);
        const interpPhi = lerp(state.prevPhi, state.phi, t);

        const comDistance = leverLength / 2;
        const gravityTorque = -leverMass * G * comDistance * Math.sin(interpPhi);
        const alpha = gravityTorque / momentOfInertia - damping * state.omega;

        setRenderState({
            phi: interpPhi,
            omega: state.omega,
            alpha: alpha,
            torque: gravityTorque,
        });

    }, isPlaying);

    // Convert phi to display angle (from vertical down)
    const phiDeg = (renderState.phi * 180 / Math.PI);
    const displayAngle = Math.abs(phiDeg) % 360;

    // Lever end position
    // φ=0 means pointing down, positive φ = counterclockwise
    // In SVG: down is positive Y
    const leverEndX = pivotX + leverPixels * Math.sin(renderState.phi);
    const leverEndY = pivotY + leverPixels * Math.cos(renderState.phi);

    // Center of mass position
    const comX = pivotX + (leverPixels / 2) * Math.sin(renderState.phi);
    const comY = pivotY + (leverPixels / 2) * Math.cos(renderState.phi);

    // Angle arc - from vertical down to current position
    const arcRadius = 60;

    // Arc path: from vertical down (0°) to current angle
    const arcStartX = pivotX;
    const arcStartY = pivotY + arcRadius; // Vertical down
    const arcEndX = pivotX + arcRadius * Math.sin(renderState.phi);
    const arcEndY = pivotY + arcRadius * Math.cos(renderState.phi);

    // Determine if we need large arc (> 180°)
    const absPhiDeg = Math.abs(phiDeg);
    const largeArc = absPhiDeg > 180 ? 1 : 0;
    // Sweep direction: if phi > 0, sweep counterclockwise (0), if phi < 0, sweep clockwise (1)
    const sweepFlag = renderState.phi >= 0 ? 0 : 1;

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-40 h-40 bg-gradient-to-r from-amber-500/20 to-orange-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 4, repeat: Infinity }}
                />
                <div className="flex items-center justify-center gap-3 mb-2">
                    <RotateCw className="w-7 h-7 text-amber-400" />
                    <h2 className="text-3xl font-black text-white">
                        <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">البندول المركب</span>
                    </h2>
                    <RotateCw className="w-7 h-7 text-amber-400" />
                </div>
                <p className="text-white/60">Physical Pendulum · العزم تحت تأثير الجاذبية</p>
            </motion.div>

            {/* Main Canvas */}
            <SimulationCanvas className="h-[520px] relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900" />

                <svg width="100%" height="100%" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="relative z-10">
                    <defs>
                        <linearGradient id="rodGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#334155" />
                            <stop offset="50%" stopColor="#475569" />
                            <stop offset="100%" stopColor="#334155" />
                        </linearGradient>
                        <radialGradient id="pivotGrad" cx="35%" cy="35%">
                            <stop offset="0%" stopColor="#fcd34d" />
                            <stop offset="60%" stopColor="#f59e0b" />
                            <stop offset="100%" stopColor="#b45309" />
                        </radialGradient>
                        <radialGradient id="massGrad" cx="35%" cy="35%">
                            <stop offset="0%" stopColor="#60a5fa" />
                            <stop offset="70%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </radialGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="shadow">
                            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* Vertical reference line (equilibrium direction) */}
                    <line
                        x1={pivotX} y1={pivotY - 20}
                        x2={pivotX} y2={pivotY + leverPixels + 40}
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth="1"
                        strokeDasharray="6,4"
                    />
                    <text x={pivotX + 10} y={pivotY + leverPixels + 30} fill="rgba(255,255,255,0.3)" fontSize="11">
                        وضع التوازن
                    </text>

                    {/* Angle Arc - from vertical to current position */}
                    {Math.abs(renderState.phi) > 0.01 && (
                        <>
                            <path
                                d={`M ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweepFlag} ${arcEndX} ${arcEndY}`}
                                stroke="#fbbf24"
                                strokeWidth={3}
                                fill="none"
                            />
                            {/* Arc fill */}
                            <path
                                d={`M ${pivotX} ${pivotY} L ${arcStartX} ${arcStartY} A ${arcRadius} ${arcRadius} 0 ${largeArc} ${sweepFlag} ${arcEndX} ${arcEndY} Z`}
                                fill="rgba(251, 191, 36, 0.15)"
                            />
                        </>
                    )}

                    {/* Angle label */}
                    <g transform={`translate(${pivotX + (renderState.phi >= 0 ? 80 : -80)}, ${pivotY + 40})`}>
                        <rect x="-28" y="-14" width="56" height="28" rx="6" fill="rgba(0,0,0,0.7)" />
                        <text x="0" y="5" fill="#fbbf24" fontSize="14" fontWeight="bold" textAnchor="middle" fontFamily="monospace">
                            {displayAngle.toFixed(1)}°
                        </text>
                    </g>

                    {/* Support structure */}
                    <rect x={pivotX - 40} y={pivotY - 50} width={80} height={10} rx={3} fill="#374151" filter="url(#shadow)" />
                    <rect x={pivotX - 5} y={pivotY - 50} width={10} height={50} fill="#4b5563" />

                    {/* The Rod */}
                    <line
                        x1={pivotX}
                        y1={pivotY}
                        x2={leverEndX}
                        y2={leverEndY}
                        stroke="url(#rodGradient)"
                        strokeWidth={12}
                        strokeLinecap="round"
                        filter="url(#shadow)"
                    />
                    {/* Rod highlight */}
                    <line
                        x1={pivotX + 8 * Math.sin(renderState.phi)}
                        y1={pivotY + 8 * Math.cos(renderState.phi)}
                        x2={leverEndX - 8 * Math.sin(renderState.phi)}
                        y2={leverEndY - 8 * Math.cos(renderState.phi)}
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth={2}
                        strokeLinecap="round"
                    />

                    {/* Center of Mass */}
                    <circle cx={comX} cy={comY} r={6} fill="#22c55e" filter="url(#glow)" />
                    <text x={comX + (renderState.phi >= 0 ? 15 : -15)} y={comY + 4}
                        fill="#86efac" fontSize="10" fontWeight="bold"
                        textAnchor={renderState.phi >= 0 ? "start" : "end"}>
                        COM
                    </text>

                    {/* Gravity arrow at COM */}
                    <line
                        x1={comX}
                        y1={comY}
                        x2={comX}
                        y2={comY + 45}
                        stroke="#ef4444"
                        strokeWidth={3}
                    />
                    <polygon
                        points="-5,0 5,0 0,9"
                        fill="#ef4444"
                        transform={`translate(${comX}, ${comY + 45})`}
                    />
                    <text x={comX + 12} y={comY + 35} fill="#fca5a5" fontSize="11" fontWeight="bold">
                        mg
                    </text>

                    {/* Moment arm (horizontal distance from pivot to COM) */}
                    {Math.abs(renderState.phi) > 0.05 && (
                        <>
                            <line
                                x1={pivotX}
                                y1={comY}
                                x2={comX}
                                y2={comY}
                                stroke="#a855f7"
                                strokeWidth={2}
                                strokeDasharray="4,3"
                            />
                            <text x={(pivotX + comX) / 2} y={comY - 8} fill="#c084fc" fontSize="10" textAnchor="middle">
                                d = {Math.abs((leverLength / 2) * Math.sin(renderState.phi)).toFixed(2)}m
                            </text>
                        </>
                    )}

                    {/* End mass */}
                    <circle cx={leverEndX} cy={leverEndY} r={14} fill="url(#massGrad)" filter="url(#glow)" />
                    <circle cx={leverEndX - 3} cy={leverEndY - 3} r={3} fill="rgba(255,255,255,0.4)" />

                    {/* Pivot */}
                    <circle cx={pivotX} cy={pivotY} r={14} fill="url(#pivotGrad)" filter="url(#shadow)" />
                    <circle cx={pivotX - 3} cy={pivotY - 3} r={3} fill="rgba(255,255,255,0.5)" />
                    <circle cx={pivotX} cy={pivotY} r={4} fill="#78350f" />

                    {/* Direction indicator - shows which way it's moving */}
                    {Math.abs(renderState.omega) > 0.1 && (
                        <g transform={`translate(${leverEndX}, ${leverEndY})`}>
                            <circle
                                r={20}
                                fill="none"
                                stroke={renderState.omega > 0 ? "#22c55e" : "#ef4444"}
                                strokeWidth={2}
                                strokeDasharray="3,3"
                                opacity={0.6}
                            />
                            <polygon
                                points="0,-25 5,-18 -5,-18"
                                fill={renderState.omega > 0 ? "#22c55e" : "#ef4444"}
                                transform={`rotate(${renderState.omega > 0 ? -30 : 30})`}
                            />
                        </g>
                    )}

                    {/* Length label */}
                    <text
                        x={(pivotX + leverEndX) / 2 + 25 * Math.cos(renderState.phi)}
                        y={(pivotY + leverEndY) / 2 - 25 * Math.sin(renderState.phi)}
                        fill="#94a3b8"
                        fontSize="11"
                        fontWeight="bold"
                    >
                        L = {leverLength.toFixed(2)}m
                    </text>
                </svg>

                {/* Torque panel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 left-4 bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-amber-500/30"
                >
                    <p className="text-xs text-amber-400/80 mb-2 font-semibold">العزم من الجاذبية</p>
                    <p className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent font-mono">
                        τ = {renderState.torque.toFixed(2)} N·m
                    </p>
                    <p className="text-xs text-white/40 mt-1 font-mono" dir="ltr">τ = -mg(L/2)sin(φ)</p>
                </motion.div>

                {/* Motion panel */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute top-4 right-4 bg-black/70 backdrop-blur-xl rounded-xl p-4 border border-cyan-500/30"
                >
                    <div className="space-y-2 text-sm">
                        <div className="flex justify-between gap-4">
                            <span className="text-white/50">ω:</span>
                            <span className="font-mono text-cyan-400">{renderState.omega.toFixed(2)} rad/s</span>
                        </div>
                        <div className="flex justify-between gap-4">
                            <span className="text-white/50">α:</span>
                            <span className="font-mono text-purple-400">{renderState.alpha.toFixed(2)} rad/s²</span>
                        </div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/20"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">m</span>
                        </div>
                        <span className="text-white font-semibold">الكتلة</span>
                    </div>
                    <ParameterSlider label="" value={leverMass} min={0.5} max={5} step={0.5} unit="kg" onChange={setLeverMass} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                    className="bg-gradient-to-br from-amber-500/10 to-yellow-500/5 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/20"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">L</span>
                        </div>
                        <span className="text-white font-semibold">الطول</span>
                    </div>
                    <ParameterSlider label="" value={leverLength} min={0.4} max={1.2} step={0.1} unit="m" onChange={setLeverLength} />
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gradient-to-br from-rose-500/10 to-pink-500/5 backdrop-blur-xl rounded-2xl p-5 border border-rose-500/20"
                >
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-rose-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">c</span>
                        </div>
                        <span className="text-white font-semibold">الإخماد</span>
                    </div>
                    <ParameterSlider label="" value={damping} min={0} max={0.5} step={0.02} unit="" onChange={setDamping} />
                </motion.div>
            </div>

            {/* Data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                    { label: 'I (عزم القصور)', value: momentOfInertia.toFixed(4), unit: 'kg·m²', gradient: 'from-blue-400 to-cyan-400' },
                    { label: 'τ (العزم)', value: renderState.torque.toFixed(2), unit: 'N·m', gradient: 'from-amber-400 to-orange-400' },
                    { label: 'ω (السرعة الزاوية)', value: renderState.omega.toFixed(2), unit: 'rad/s', gradient: 'from-cyan-400 to-blue-400' },
                    { label: 'α (التسارع الزاوي)', value: renderState.alpha.toFixed(2), unit: 'rad/s²', gradient: 'from-purple-400 to-pink-400' },
                ].map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.05 }}
                        className="bg-black/40 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                    >
                        <span className="text-white/50 text-xs">{item.label}</span>
                        <p className={`text-lg font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent font-mono`}>
                            {item.value} <span className="text-xs text-white/40">{item.unit}</span>
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Explanation */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 backdrop-blur-xl rounded-2xl p-5 border border-amber-500/20"
            >
                <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h4 className="text-base font-bold text-white mb-1">البندول المركب</h4>
                        <p className="text-white/60 text-sm">
                            <strong className="text-amber-400" dir="ltr">τ = -mg(L/2)sin(φ)</strong>
                            <br />
                            العزم يعتمد على <strong className="text-purple-400">ذراع العزم</strong> (المسافة الأفقية من المحور لمركز الكتلة).
                            <br />
                            عند الوضع الرأسي (φ=0) العزم = صفر ← <strong className="text-green-400">توازن مستقر</strong>
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
