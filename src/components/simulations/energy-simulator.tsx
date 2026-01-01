'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
    SimulationControls,
    ParameterSlider,
    SimulationCanvas,
    useAnimationLoop,
    Vector2D,
    lerp,
    clamp,
    kineticEnergy as calcKE,
    potentialEnergy as calcPE,
} from './simulation-base';
import { Zap, Battery, Activity, Info, ArrowDown } from 'lucide-react';

interface EnergySimulatorProps {
    className?: string;
}

// Physics constants
const g = 9.80665; // Standard gravity m/s²
const FIXED_DT = 1 / 120; // 120 Hz physics for accuracy
const PIXELS_PER_METER = 1.8;

export function EnergySimulator({ className = '' }: EnergySimulatorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [timeScale, setTimeScale] = useState(1);

    // Parameters
    const [mass, setMass] = useState(2); // kg
    const [initialHeight, setInitialHeight] = useState(150); // m
    const [airResistance, setAirResistance] = useState(0); // drag coefficient
    const [restitution, setRestitution] = useState(0.9); // bounce coefficient

    // Canvas dimensions
    const canvasWidth = 800;
    const canvasHeight = 420;
    const groundY = 380;
    const ballX = canvasWidth / 2;
    const ballRadius = 20 + mass * 4;

    // Physics state refs
    const stateRef = useRef({
        y: initialHeight, // meters from ground
        vy: 0, // m/s, positive = upward
        prevY: initialHeight,
        time: 0,
    });

    // For energy graph
    const [energyHistory, setEnergyHistory] = useState<{ t: number; pe: number; ke: number }[]>([]);
    const maxHistoryLength = 200;

    // Accumulator for fixed timestep
    const accumulatorRef = useRef(0);

    // Initial energy for verification
    const initialEnergy = mass * g * initialHeight;

    // Reset
    const handleReset = useCallback(() => {
        setIsPlaying(false);
        accumulatorRef.current = 0;
        stateRef.current = {
            y: initialHeight,
            vy: 0,
            prevY: initialHeight,
            time: 0,
        };
        setEnergyHistory([]);
    }, [initialHeight]);

    // Physics step using Velocity Verlet
    const physicsStep = useCallback((dt: number) => {
        const state = stateRef.current;
        state.prevY = state.y;

        // Current acceleration (gravity + drag)
        // Drag force: F_d = 0.5 * C_d * A * ρ * v² (simplified)
        const dragAccel = airResistance > 0
            ? -Math.sign(state.vy) * airResistance * 0.01 * state.vy * state.vy / mass
            : 0;
        const a = -g + dragAccel;

        // Velocity Verlet:
        // y(t+dt) = y(t) + v(t)*dt + 0.5*a*dt²
        const newY = state.y + state.vy * dt + 0.5 * a * dt * dt;

        // New acceleration at new position (same for uniform gravity)
        const newDragAccel = airResistance > 0
            ? -Math.sign(state.vy) * airResistance * 0.01 * state.vy * state.vy / mass
            : 0;
        const newA = -g + newDragAccel;

        // v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
        const newVy = state.vy + 0.5 * (a + newA) * dt;

        state.y = newY;
        state.vy = newVy;
        state.time += dt;

        // Ground collision with proper impulse resolution
        if (state.y <= 0) {
            state.y = 0;

            // Energy-based restitution
            // v_after = -e * v_before
            state.vy = -state.vy * restitution;

            // Stop if velocity too low
            if (Math.abs(state.vy) < 0.1) {
                state.vy = 0;
                setIsPlaying(false);
            }
        }

        // Ceiling limit (shouldn't happen normally)
        if (state.y > 250) {
            state.y = 250;
            state.vy = -Math.abs(state.vy) * 0.5;
        }

    }, [airResistance, restitution, mass]);

    // Render state
    const [renderState, setRenderState] = useState({
        y: initialHeight,
        vy: 0,
        pe: mass * g * initialHeight,
        ke: 0,
        total: mass * g * initialHeight,
    });

    // Trail
    const [trail, setTrail] = useState<{ y: number; opacity: number }[]>([]);

    // Animation loop
    useAnimationLoop((deltaTime) => {
        const scaledDt = deltaTime * timeScale;
        accumulatorRef.current += scaledDt;

        // Fixed timestep physics
        let steps = 0;
        while (accumulatorRef.current >= FIXED_DT && steps < 16) {
            physicsStep(FIXED_DT);
            accumulatorRef.current -= FIXED_DT;
            steps++;
        }

        const state = stateRef.current;
        const alpha = clamp(accumulatorRef.current / FIXED_DT, 0, 1);

        // Interpolated position
        const interpY = lerp(state.prevY, state.y, alpha);
        const screenY = groundY - interpY * PIXELS_PER_METER - ballRadius;

        // Calculate energies
        const pe = mass * g * Math.max(0, state.y);
        const ke = 0.5 * mass * state.vy * state.vy;
        const total = pe + ke;

        setRenderState({
            y: interpY,
            vy: state.vy,
            pe,
            ke,
            total,
        });

        // Update trail
        setTrail(prev => [
            { y: screenY, opacity: 1 },
            ...prev.map(t => ({ ...t, opacity: t.opacity * 0.92 }))
        ].filter(t => t.opacity > 0.05).slice(0, 25));

        // Update energy history for graph
        setEnergyHistory(prev => {
            const newEntry = { t: state.time, pe, ke };
            const updated = [...prev, newEntry];
            if (updated.length > maxHistoryLength) {
                return updated.slice(-maxHistoryLength);
            }
            return updated;
        });

    }, isPlaying);

    // Calculate screen position
    const ballScreenY = groundY - renderState.y * PIXELS_PER_METER - ballRadius;

    // Energy percentages
    const maxEnergy = Math.max(initialEnergy, renderState.total, 1);
    const pePercent = (renderState.pe / maxEnergy) * 100;
    const kePercent = (renderState.ke / maxEnergy) * 100;

    // Squash and stretch based on velocity
    const squashFactor = clamp(1 - Math.abs(renderState.vy) / 50 * 0.3, 0.7, 1);
    const stretchFactor = clamp(1 + Math.abs(renderState.vy) / 50 * 0.3, 1, 1.3);

    // Color based on dominant energy
    const ballColor = kePercent > pePercent ? '#f59e0b' : '#22c55e';

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-yellow-500/20 to-green-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Zap className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-3xl font-black text-white">
                        محاكاة <span className="bg-gradient-to-r from-yellow-400 via-green-400 to-yellow-400 bg-clip-text text-transparent">الطاقة</span>
                    </h2>
                    <Battery className="w-6 h-6 text-green-400" />
                </div>
                <p className="text-white/60">Velocity Verlet Integration @ 120Hz</p>
            </motion.div>

            {/* Energy Bars */}
            <div className="max-w-2xl mx-auto grid grid-cols-2 gap-4">
                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-green-500/20">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-500"
                                animate={{ scale: pePercent > 50 ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                            <span className="text-white/70 text-sm">طاقة الوضع (PE)</span>
                        </div>
                        <span className="text-green-400 font-mono text-sm">{renderState.pe.toFixed(1)} J</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full"
                            animate={{ width: `${clamp(pePercent, 0, 100)}%` }}
                            transition={{ duration: 0.05 }}
                        />
                    </div>
                </div>

                <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-4 border border-orange-500/20">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <motion.div
                                className="w-3 h-3 rounded-full bg-gradient-to-r from-orange-400 to-red-500"
                                animate={{ scale: kePercent > 50 ? [1, 1.3, 1] : 1 }}
                                transition={{ duration: 0.5, repeat: Infinity }}
                            />
                            <span className="text-white/70 text-sm">طاقة الحركة (KE)</span>
                        </div>
                        <span className="text-orange-400 font-mono text-sm">{renderState.ke.toFixed(1)} J</span>
                    </div>
                    <div className="h-4 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-orange-500 to-red-400 rounded-full"
                            animate={{ width: `${clamp(kePercent, 0, 100)}%` }}
                            transition={{ duration: 0.05 }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Canvas */}
            <SimulationCanvas className="h-[450px] relative overflow-hidden">
                <svg width="100%" height="100%" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="relative z-10">
                    <defs>
                        <radialGradient id="energyBallGrad" cx="30%" cy="30%">
                            <stop offset="0%" stopColor={kePercent > pePercent ? '#fcd34d' : '#86efac'} />
                            <stop offset="50%" stopColor={kePercent > pePercent ? '#f59e0b' : '#22c55e'} />
                            <stop offset="100%" stopColor={kePercent > pePercent ? '#ea580c' : '#15803d'} />
                        </radialGradient>
                        <linearGradient id="groundGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="0%" stopColor="#374151" />
                            <stop offset="100%" stopColor="#1f2937" />
                        </linearGradient>
                        <filter id="ballGlow" x="-100%" y="-100%" width="300%" height="300%">
                            <feGaussianBlur stdDeviation="8" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="motionBlur" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation={`0 ${clamp(Math.abs(renderState.vy) / 10, 0, 8)}`} />
                        </filter>
                    </defs>

                    {/* Height markers */}
                    {[0, 50, 100, 150, 200].map((h, i) => (
                        <g key={i}>
                            <line x1={80} y1={groundY - h * PIXELS_PER_METER} x2={100} y2={groundY - h * PIXELS_PER_METER} stroke="rgba(255,255,255,0.3)" strokeWidth={2} />
                            <text x={65} y={groundY - h * PIXELS_PER_METER + 4} fill="rgba(255,255,255,0.5)" fontSize="11" textAnchor="end">{h}m</text>
                        </g>
                    ))}

                    {/* Initial height reference */}
                    <line x1={110} y1={groundY - initialHeight * PIXELS_PER_METER} x2={canvasWidth - 100} y2={groundY - initialHeight * PIXELS_PER_METER} stroke="rgba(34, 197, 94, 0.3)" strokeWidth={2} strokeDasharray="8,4" />
                    <text x={canvasWidth - 90} y={groundY - initialHeight * PIXELS_PER_METER + 4} fill="rgba(34, 197, 94, 0.6)" fontSize="11">h₀</text>

                    {/* Ground */}
                    <rect x={0} y={groundY} width={canvasWidth} height={canvasHeight - groundY} fill="url(#groundGrad)" />
                    <line x1={0} y1={groundY} x2={canvasWidth} y2={groundY} stroke="#4ade80" strokeWidth={3} />

                    {/* Trail with motion blur effect */}
                    {trail.map((point, i) => (
                        <ellipse
                            key={i}
                            cx={ballX}
                            cy={point.y}
                            rx={ballRadius * 0.3 * point.opacity}
                            ry={ballRadius * 0.5 * point.opacity}
                            fill={kePercent > pePercent ? `rgba(251, 191, 36, ${point.opacity * 0.4})` : `rgba(74, 222, 128, ${point.opacity * 0.4})`}
                        />
                    ))}

                    {/* Shadow */}
                    <ellipse
                        cx={ballX}
                        cy={groundY - 3}
                        rx={ballRadius * clamp(1 - renderState.y / 200, 0.3, 1)}
                        ry={ballRadius * 0.15 * clamp(1 - renderState.y / 200, 0.3, 1)}
                        fill="rgba(0,0,0,0.4)"
                    />

                    {/* Ball with squash/stretch */}
                    <g transform={`translate(${ballX}, ${clamp(ballScreenY, 30, groundY - ballRadius)})`}>
                        <motion.ellipse
                            cx={0}
                            cy={0}
                            rx={ballRadius * (renderState.y <= 1 ? stretchFactor : 1)}
                            ry={ballRadius * (renderState.y <= 1 ? squashFactor : 1)}
                            fill="url(#energyBallGrad)"
                            filter={Math.abs(renderState.vy) > 10 ? "url(#ballGlow)" : ""}
                        />
                        {/* Shine */}
                        <ellipse cx={-ballRadius * 0.25} cy={-ballRadius * 0.25} rx={ballRadius * 0.2} ry={ballRadius * 0.12} fill="rgba(255,255,255,0.5)" />
                        {/* Mass */}
                        <text x={0} y={5} textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">{mass}kg</text>
                    </g>

                    {/* Velocity arrow */}
                    {Math.abs(renderState.vy) > 1 && (
                        <g transform={`translate(${ballX + ballRadius + 20}, ${clamp(ballScreenY, 50, groundY - 50)})`}>
                            <line x1={0} y1={0} x2={0} y2={-renderState.vy * 2} stroke="#f59e0b" strokeWidth={4} strokeLinecap="round" />
                            <polygon
                                points="-6,0 6,0 0,-10"
                                fill="#f59e0b"
                                transform={`translate(0, ${-renderState.vy * 2}) ${renderState.vy < 0 ? 'rotate(180)' : ''}`}
                            />
                            <text x={15} y={-renderState.vy} fill="#fcd34d" fontSize="11" fontWeight="bold">
                                v = {Math.abs(renderState.vy).toFixed(1)} m/s
                            </text>
                        </g>
                    )}

                    {/* Energy bar on side */}
                    <g transform={`translate(${canvasWidth - 70}, 40)`}>
                        <rect x={0} y={0} width={25} height={300} fill="rgba(255,255,255,0.1)" rx={4} />
                        <rect x={0} y={300 - (pePercent + kePercent) / 100 * 300} width={25} height={kePercent / 100 * 300} fill="#f59e0b" rx={4} />
                        <rect x={0} y={300 - pePercent / 100 * 300} width={25} height={pePercent / 100 * 300} fill="#22c55e" rx={4} />
                        <text x={12} y={320} textAnchor="middle" fill="white" fontSize="9">E</text>
                    </g>
                </svg>

                {/* Formula */}
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute top-4 left-4 bg-black/60 backdrop-blur-xl rounded-2xl p-4 border border-white/10">
                    <p className="text-xs text-white/50 mb-1">Energy Conservation</p>
                    <p className="text-green-400 font-mono text-xs" dir="ltr">PE = mgh = {renderState.pe.toFixed(1)} J</p>
                    <p className="text-orange-400 font-mono text-xs" dir="ltr">KE = ½mv² = {renderState.ke.toFixed(1)} J</p>
                    <div className="mt-2 pt-2 border-t border-white/10">
                        <p className={`text-lg font-bold ${Math.abs(renderState.total - initialEnergy) < initialEnergy * 0.05 ? 'text-green-400' : 'text-yellow-400'}`} dir="ltr">
                            E = {renderState.total.toFixed(1)} J
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
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-2xl p-5 border border-blue-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">m</span>
                        </div>
                        <span className="text-white font-semibold">الكتلة</span>
                    </div>
                    <ParameterSlider label="" value={mass} min={0.5} max={5} step={0.5} unit="kg" onChange={(v) => { setMass(v); handleReset(); }} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="bg-gradient-to-br from-green-500/10 to-emerald-500/5 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                            <ArrowDown className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-semibold">الارتفاع</span>
                    </div>
                    <ParameterSlider label="" value={initialHeight} min={50} max={200} step={25} unit="m" onChange={(v) => { setInitialHeight(v); handleReset(); }} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-gradient-to-br from-red-500/10 to-orange-500/5 backdrop-blur-xl rounded-2xl p-5 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-red-500 to-orange-500 rounded-lg flex items-center justify-center">
                            <Activity className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-white font-semibold">مقاومة الهواء</span>
                    </div>
                    <ParameterSlider label="" value={airResistance} min={0} max={10} step={1} unit="" onChange={setAirResistance} />
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="bg-gradient-to-br from-purple-500/10 to-pink-500/5 backdrop-blur-xl rounded-2xl p-5 border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                            <span className="text-white text-xs font-bold">e</span>
                        </div>
                        <span className="text-white font-semibold">معامل الارتداد</span>
                    </div>
                    <ParameterSlider label="" value={restitution} min={0} max={1} step={0.1} unit="" onChange={setRestitution} />
                </motion.div>
            </div>

            {/* Data Dashboard */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {[
                    { label: 'الارتفاع', value: renderState.y.toFixed(1), unit: 'm', icon: '📏', gradient: 'from-blue-400 to-cyan-400' },
                    { label: 'السرعة', value: Math.abs(renderState.vy).toFixed(1), unit: 'm/s', icon: '🏃', gradient: 'from-orange-400 to-red-400' },
                    { label: 'PE', value: renderState.pe.toFixed(0), unit: 'J', icon: '🏔️', gradient: 'from-green-400 to-emerald-400' },
                    { label: 'KE', value: renderState.ke.toFixed(0), unit: 'J', icon: '⚡', gradient: 'from-yellow-400 to-orange-400' },
                    { label: 'الطاقة الكلية', value: renderState.total.toFixed(0), unit: 'J', icon: '🔋', gradient: 'from-purple-400 to-pink-400', highlight: true },
                ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.03 }}
                        className={`bg-black/40 backdrop-blur-xl rounded-xl p-3 border ${item.highlight ? 'border-purple-500/30' : 'border-white/10'}`}
                    >
                        <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-sm">{item.icon}</span>
                            <span className="text-white/50 text-xs">{item.label}</span>
                        </div>
                        <p className={`text-xl font-bold bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                            {item.value}<span className="text-sm text-white/40 mr-1">{item.unit}</span>
                        </p>
                    </motion.div>
                ))}
            </div>

            {/* Verification */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-2xl p-5 border border-green-500/20">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center">
                        <span className="text-xl">✓</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-lg font-bold text-white mb-1">🔬 التحقق من حفظ الطاقة</h4>
                        <div className="flex gap-6 text-sm">
                            <div>
                                <span className="text-white/50">الطاقة الابتدائية: </span>
                                <span className="text-green-400 font-mono">{initialEnergy.toFixed(1)} J</span>
                            </div>
                            <div>
                                <span className="text-white/50">الحالية: </span>
                                <span className={`font-mono ${Math.abs(renderState.total - initialEnergy) < initialEnergy * 0.02 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {renderState.total.toFixed(1)} J
                                </span>
                            </div>
                            <div>
                                <span className="text-white/50">الحفظ: </span>
                                <span className={`font-mono ${renderState.total / initialEnergy > 0.98 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {((renderState.total / initialEnergy) * 100).toFixed(1)}%
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-gradient-to-r from-yellow-500/10 to-green-500/10 backdrop-blur-xl rounded-2xl p-5 border border-white/10">
                <div className="flex items-start gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-500 to-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                        <Info className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-1">⚡ قانون حفظ الطاقة الميكانيكية</h4>
                        <p className="text-white/60 text-sm">
                            <strong className="text-green-400">PE = mgh</strong> تتحول إلى <strong className="text-orange-400">KE = ½mv²</strong> والعكس.
                            جرب تغيير معامل الارتداد (e) لترى فقدان الطاقة عند كل ارتطام!
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
