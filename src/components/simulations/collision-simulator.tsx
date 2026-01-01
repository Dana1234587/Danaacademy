'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import {
    SimulationControls,
    ParameterSlider,
    SimulationCanvas,
    useAnimationLoop,
    Vector2D,
    createRigidBody,
    RigidBody,
    kineticEnergy,
    momentum,
    lerp,
    clamp,
} from './simulation-base';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Info, Sparkles } from 'lucide-react';

interface CollisionSimulatorProps {
    className?: string;
}

// Physics constants
const PIXELS_PER_METER = 50;
const FIXED_DT = 1 / 60;

export function CollisionSimulator({ className = '' }: CollisionSimulatorProps) {
    const [isPlaying, setIsPlaying] = useState(false);
    const [collisionType, setCollisionType] = useState<'elastic' | 'inelastic'>('elastic');
    const [hasCollided, setHasCollided] = useState(false);
    const [collisionPoint, setCollisionPoint] = useState<{ x: number; y: number } | null>(null);
    const [timeScale, setTimeScale] = useState(1);

    // Ball parameters (real physics units)
    const [mass1, setMass1] = useState(2); // kg
    const [velocity1, setVelocity1] = useState(3); // m/s
    const [mass2, setMass2] = useState(1); // kg
    const [velocity2, setVelocity2] = useState(-2); // m/s

    // Canvas dimensions
    const canvasWidth = 800;
    const canvasHeight = 350;
    const centerY = canvasHeight / 2;
    const groundY = centerY + 60;

    // Calculate radii based on mass (visual only)
    const getRadius = (mass: number) => 25 + mass * 10;

    // Initial positions (in meters, converted from pixels)
    const initialX1 = 2.5; // meters from left
    const initialX2 = 13.5; // meters from left

    // Physics state using refs for performance
    const ball1Ref = useRef({
        x: initialX1,
        vx: velocity1,
        mass: mass1,
        prevX: initialX1,
    });

    const ball2Ref = useRef({
        x: initialX2,
        vx: velocity2,
        mass: mass2,
        prevX: initialX2,
    });

    // Render state (interpolated)
    const [renderState, setRenderState] = useState({
        ball1X: initialX1 * PIXELS_PER_METER,
        ball1Vx: velocity1,
        ball2X: initialX2 * PIXELS_PER_METER,
        ball2Vx: velocity2,
    });

    // Trail state
    const [trails, setTrails] = useState<{ ball1: { x: number; y: number; opacity: number }[]; ball2: { x: number; y: number; opacity: number }[] }>({
        ball1: [],
        ball2: [],
    });

    // Store initial values for conservation display
    const initialMomentum = useRef(mass1 * velocity1 + mass2 * velocity2);
    const initialKE = useRef(0.5 * mass1 * velocity1 ** 2 + 0.5 * mass2 * velocity2 ** 2);

    // Collision processed flag
    const collisionProcessed = useRef(false);

    // Accumulator for fixed timestep
    const accumulatorRef = useRef(0);

    // Reset simulation
    const handleReset = useCallback(() => {
        setIsPlaying(false);
        setHasCollided(false);
        setCollisionPoint(null);
        collisionProcessed.current = false;
        accumulatorRef.current = 0;

        ball1Ref.current = {
            x: initialX1,
            vx: velocity1,
            mass: mass1,
            prevX: initialX1,
        };

        ball2Ref.current = {
            x: initialX2,
            vx: velocity2,
            mass: mass2,
            prevX: initialX2,
        };

        initialMomentum.current = mass1 * velocity1 + mass2 * velocity2;
        initialKE.current = 0.5 * mass1 * velocity1 ** 2 + 0.5 * mass2 * velocity2 ** 2;

        setRenderState({
            ball1X: initialX1 * PIXELS_PER_METER,
            ball1Vx: velocity1,
            ball2X: initialX2 * PIXELS_PER_METER,
            ball2Vx: velocity2,
        });

        setTrails({ ball1: [], ball2: [] });
    }, [mass1, mass2, velocity1, velocity2]);

    // Physics step (fixed timestep)
    const physicsStep = useCallback((dt: number) => {
        const ball1 = ball1Ref.current;
        const ball2 = ball2Ref.current;

        // Store previous positions for interpolation
        ball1.prevX = ball1.x;
        ball2.prevX = ball2.x;

        // Velocity Verlet integration (simplified for 1D)
        // x(t+dt) = x(t) + v(t)*dt
        ball1.x += ball1.vx * dt;
        ball2.x += ball2.vx * dt;

        // Get radii in meters
        const r1 = getRadius(ball1.mass) / PIXELS_PER_METER;
        const r2 = getRadius(ball2.mass) / PIXELS_PER_METER;

        // Wall boundaries (in meters)
        const leftWall = r1;
        const rightWall = canvasWidth / PIXELS_PER_METER - r2;

        // Wall collisions for ball 1
        if (ball1.x <= r1) {
            ball1.x = r1;
            ball1.vx = -ball1.vx;
        } else if (ball1.x >= canvasWidth / PIXELS_PER_METER - r1) {
            ball1.x = canvasWidth / PIXELS_PER_METER - r1;
            ball1.vx = -ball1.vx;
        }

        // Wall collisions for ball 2
        if (ball2.x <= r2) {
            ball2.x = r2;
            ball2.vx = -ball2.vx;
        } else if (ball2.x >= canvasWidth / PIXELS_PER_METER - r2) {
            ball2.x = canvasWidth / PIXELS_PER_METER - r2;
            ball2.vx = -ball2.vx;
        }

        // Ball-ball collision detection
        const distance = Math.abs(ball1.x - ball2.x);
        const minDistance = r1 + r2;

        if (distance <= minDistance && !collisionProcessed.current) {
            collisionProcessed.current = true;
            setHasCollided(true);
            setCollisionPoint({
                x: ((ball1.x + ball2.x) / 2) * PIXELS_PER_METER,
                y: centerY
            });

            const v1 = ball1.vx;
            const v2 = ball2.vx;
            const m1 = ball1.mass;
            const m2 = ball2.mass;

            // Relative velocity
            const relVel = v1 - v2;

            // Only collide if approaching
            if ((ball1.x < ball2.x && relVel > 0) || (ball1.x > ball2.x && relVel < 0)) {
                if (collisionType === 'elastic') {
                    // Elastic collision: both momentum AND kinetic energy conserved
                    // v1' = ((m1-m2)*v1 + 2*m2*v2) / (m1+m2)
                    // v2' = ((m2-m1)*v2 + 2*m1*v1) / (m1+m2)
                    ball1.vx = ((m1 - m2) * v1 + 2 * m2 * v2) / (m1 + m2);
                    ball2.vx = ((m2 - m1) * v2 + 2 * m1 * v1) / (m1 + m2);
                } else {
                    // Perfectly inelastic: objects stick together
                    // v_final = (m1*v1 + m2*v2) / (m1+m2)
                    const vf = (m1 * v1 + m2 * v2) / (m1 + m2);
                    ball1.vx = vf;
                    ball2.vx = vf;
                }

                // Separate overlapping balls
                const overlap = minDistance - distance;
                if (overlap > 0) {
                    const separation = overlap / 2 + 0.01;
                    if (ball1.x < ball2.x) {
                        ball1.x -= separation;
                        ball2.x += separation;
                    } else {
                        ball1.x += separation;
                        ball2.x -= separation;
                    }
                }
            }
        }

        // Reset collision flag when separated
        if (distance > minDistance * 1.2) {
            collisionProcessed.current = false;
            setHasCollided(false);
        }
    }, [collisionType, centerY, canvasWidth]);

    // Animation loop with fixed timestep
    useAnimationLoop((deltaTime) => {
        const scaledDt = deltaTime * timeScale;
        accumulatorRef.current += scaledDt;

        // Fixed timestep physics
        let steps = 0;
        while (accumulatorRef.current >= FIXED_DT && steps < 8) {
            physicsStep(FIXED_DT);
            accumulatorRef.current -= FIXED_DT;
            steps++;
        }

        // Interpolation factor for smooth rendering
        const alpha = accumulatorRef.current / FIXED_DT;

        const ball1 = ball1Ref.current;
        const ball2 = ball2Ref.current;

        // Interpolate positions for rendering
        const renderX1 = lerp(ball1.prevX, ball1.x, alpha) * PIXELS_PER_METER;
        const renderX2 = lerp(ball2.prevX, ball2.x, alpha) * PIXELS_PER_METER;

        setRenderState({
            ball1X: renderX1,
            ball1Vx: ball1.vx,
            ball2X: renderX2,
            ball2Vx: ball2.vx,
        });

        // Update trails
        setTrails(prev => ({
            ball1: [
                { x: renderX1, y: centerY, opacity: 1 },
                ...prev.ball1.map(t => ({ ...t, opacity: t.opacity * 0.9 }))
            ].filter(t => t.opacity > 0.05).slice(0, 20),
            ball2: [
                { x: renderX2, y: centerY, opacity: 1 },
                ...prev.ball2.map(t => ({ ...t, opacity: t.opacity * 0.9 }))
            ].filter(t => t.opacity > 0.05).slice(0, 20),
        }));
    }, isPlaying);

    // Calculate current physics values
    const currentMomentum = ball1Ref.current.mass * renderState.ball1Vx + ball2Ref.current.mass * renderState.ball2Vx;
    const currentKE = 0.5 * ball1Ref.current.mass * renderState.ball1Vx ** 2 + 0.5 * ball2Ref.current.mass * renderState.ball2Vx ** 2;
    const momentum1 = ball1Ref.current.mass * renderState.ball1Vx;
    const momentum2 = ball2Ref.current.mass * renderState.ball2Vx;

    // Render collision particles
    const renderCollisionParticles = () => {
        if (!collisionPoint) return null;

        return (
            <AnimatePresence>
                {hasCollided && (
                    <>
                        {[...Array(12)].map((_, i) => (
                            <motion.circle
                                key={i}
                                cx={collisionPoint.x}
                                cy={collisionPoint.y}
                                r={4}
                                fill={i % 2 === 0 ? '#fbbf24' : '#f97316'}
                                initial={{ scale: 0, x: 0, y: 0, opacity: 1 }}
                                animate={{
                                    scale: [1, 0],
                                    x: Math.cos((i * 30) * Math.PI / 180) * 80,
                                    y: Math.sin((i * 30) * Math.PI / 180) * 80,
                                    opacity: [1, 0],
                                }}
                                transition={{ duration: 0.6, ease: 'easeOut' }}
                            />
                        ))}
                        <motion.circle
                            cx={collisionPoint.x}
                            cy={collisionPoint.y}
                            r={10}
                            fill="url(#collisionGlow)"
                            initial={{ scale: 0, opacity: 1 }}
                            animate={{ scale: 8, opacity: 0 }}
                            transition={{ duration: 0.5 }}
                        />
                    </>
                )}
            </AnimatePresence>
        );
    };

    return (
        <div className={`space-y-6 ${className}`}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center relative"
            >
                <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 w-32 h-32 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                    transition={{ duration: 3, repeat: Infinity }}
                />
                <div className="flex items-center justify-center gap-2 mb-2">
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                    <h2 className="text-3xl font-black text-white">
                        محاكاة <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">التصادمات</span>
                    </h2>
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <p className="text-white/60">محرك فيزياء واقعي مع Velocity Verlet Integration</p>
            </motion.div>

            {/* Collision Type Tabs */}
            <Tabs value={collisionType} onValueChange={(v) => { setCollisionType(v as 'elastic' | 'inelastic'); handleReset(); }} className="w-full">
                <TabsList className="grid w-full max-w-lg mx-auto grid-cols-2 bg-black/40 backdrop-blur-xl border border-white/10 p-1 rounded-2xl h-14">
                    <TabsTrigger
                        value="elastic"
                        className="rounded-xl text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white"
                    >
                        ⚡ تصادم مرن
                    </TabsTrigger>
                    <TabsTrigger
                        value="inelastic"
                        className="rounded-xl text-base data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                    >
                        💥 تصادم غير مرن
                    </TabsTrigger>
                </TabsList>
            </Tabs>

            {/* Simulation Canvas */}
            <SimulationCanvas className="h-[380px] relative overflow-hidden">
                <div className="absolute inset-0 opacity-30">
                    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                                <path d="M 50 0 L 0 0 0 50" fill="none" stroke="rgba(139, 92, 246, 0.3)" strokeWidth="0.5" />
                            </pattern>
                        </defs>
                        <rect width="100%" height="100%" fill="url(#grid)" />
                    </svg>
                </div>

                <svg width="100%" height="100%" viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="relative z-10">
                    <defs>
                        <radialGradient id="ball1Gradient" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#93c5fd" />
                            <stop offset="40%" stopColor="#3b82f6" />
                            <stop offset="100%" stopColor="#1d4ed8" />
                        </radialGradient>
                        <radialGradient id="ball2Gradient" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="#f9a8d4" />
                            <stop offset="40%" stopColor="#ec4899" />
                            <stop offset="100%" stopColor="#be185d" />
                        </radialGradient>
                        <radialGradient id="collisionGlow" cx="50%" cy="50%" r="50%">
                            <stop offset="0%" stopColor="#fbbf24" stopOpacity="1" />
                            <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                        </radialGradient>
                        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="4" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <linearGradient id="groundGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="rgba(139, 92, 246, 0)" />
                            <stop offset="50%" stopColor="rgba(139, 92, 246, 0.5)" />
                            <stop offset="100%" stopColor="rgba(139, 92, 246, 0)" />
                        </linearGradient>
                    </defs>

                    {/* Ground */}
                    <line x1={40} y1={groundY} x2={canvasWidth - 40} y2={groundY} stroke="url(#groundGradient)" strokeWidth={3} strokeLinecap="round" />

                    {/* Trails */}
                    {trails.ball1.map((point, i) => (
                        <circle key={`t1-${i}`} cx={point.x} cy={point.y} r={getRadius(mass1) * 0.3 * point.opacity} fill={`rgba(59, 130, 246, ${point.opacity * 0.5})`} />
                    ))}
                    {trails.ball2.map((point, i) => (
                        <circle key={`t2-${i}`} cx={point.x} cy={point.y} r={getRadius(mass2) * 0.3 * point.opacity} fill={`rgba(236, 72, 153, ${point.opacity * 0.5})`} />
                    ))}

                    {/* Shadows */}
                    <ellipse cx={renderState.ball1X} cy={groundY - 5} rx={getRadius(mass1) * 0.7} ry={getRadius(mass1) * 0.15} fill="rgba(0,0,0,0.3)" />
                    <ellipse cx={renderState.ball2X} cy={groundY - 5} rx={getRadius(mass2) * 0.7} ry={getRadius(mass2) * 0.15} fill="rgba(0,0,0,0.3)" />

                    {/* Ball 1 */}
                    <g>
                        <circle cx={renderState.ball1X} cy={centerY} r={getRadius(mass1)} fill="url(#ball1Gradient)" />
                        <ellipse cx={renderState.ball1X - getRadius(mass1) * 0.3} cy={centerY - getRadius(mass1) * 0.3} rx={getRadius(mass1) * 0.2} ry={getRadius(mass1) * 0.12} fill="rgba(255,255,255,0.5)" />
                        <text x={renderState.ball1X} y={centerY + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{mass1} kg</text>
                    </g>

                    {/* Ball 2 */}
                    <g>
                        <circle cx={renderState.ball2X} cy={centerY} r={getRadius(mass2)} fill="url(#ball2Gradient)" />
                        <ellipse cx={renderState.ball2X - getRadius(mass2) * 0.3} cy={centerY - getRadius(mass2) * 0.3} rx={getRadius(mass2) * 0.2} ry={getRadius(mass2) * 0.12} fill="rgba(255,255,255,0.5)" />
                        <text x={renderState.ball2X} y={centerY + 5} textAnchor="middle" fill="white" fontSize="14" fontWeight="bold">{mass2} kg</text>
                    </g>

                    {/* Velocity Arrows */}
                    {Math.abs(renderState.ball1Vx) > 0.1 && (
                        <g transform={`translate(${renderState.ball1X}, ${centerY - getRadius(mass1) - 20})`}>
                            <line x1={0} y1={0} x2={renderState.ball1Vx * 20} y2={0} stroke="#60a5fa" strokeWidth={4} strokeLinecap="round" filter="url(#glow)" />
                            <polygon points={renderState.ball1Vx > 0 ? `${renderState.ball1Vx * 20 - 6},-5 ${renderState.ball1Vx * 20 - 6},5 ${renderState.ball1Vx * 20 + 3},0` : `${renderState.ball1Vx * 20 + 6},-5 ${renderState.ball1Vx * 20 + 6},5 ${renderState.ball1Vx * 20 - 3},0`} fill="#60a5fa" />
                            <text x={renderState.ball1Vx * 10} y={-10} textAnchor="middle" fill="#93c5fd" fontSize="12" fontWeight="600">v₁ = {renderState.ball1Vx.toFixed(2)} m/s</text>
                        </g>
                    )}
                    {Math.abs(renderState.ball2Vx) > 0.1 && (
                        <g transform={`translate(${renderState.ball2X}, ${centerY - getRadius(mass2) - 20})`}>
                            <line x1={0} y1={0} x2={renderState.ball2Vx * 20} y2={0} stroke="#f472b6" strokeWidth={4} strokeLinecap="round" filter="url(#glow)" />
                            <polygon points={renderState.ball2Vx > 0 ? `${renderState.ball2Vx * 20 - 6},-5 ${renderState.ball2Vx * 20 - 6},5 ${renderState.ball2Vx * 20 + 3},0` : `${renderState.ball2Vx * 20 + 6},-5 ${renderState.ball2Vx * 20 + 6},5 ${renderState.ball2Vx * 20 - 3},0`} fill="#f472b6" />
                            <text x={renderState.ball2Vx * 10} y={-10} textAnchor="middle" fill="#f9a8d4" fontSize="12" fontWeight="600">v₂ = {renderState.ball2Vx.toFixed(2)} m/s</text>
                        </g>
                    )}

                    {renderCollisionParticles()}
                </svg>

                {/* Formula Display */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="absolute top-4 right-4 bg-black/60 backdrop-blur-xl rounded-xl p-4 border border-white/10"
                >
                    <p className="text-xs text-white/50 mb-1">قانون حفظ الزخم</p>
                    <p className="text-white font-mono text-sm" dir="ltr">m₁v₁ + m₂v₂ = const</p>
                </motion.div>
            </SimulationCanvas>

            {/* Controls with Time Scale */}
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
                <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-blue-500/10 to-cyan-500/5 backdrop-blur-xl rounded-3xl p-6 border border-blue-500/20">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold text-white">1</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">الجسم الأول</h3>
                            <p className="text-xs text-blue-300/60">p₁ = {momentum1.toFixed(2)} kg·m/s</p>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <ParameterSlider label="الكتلة (m₁)" value={mass1} min={0.5} max={5} step={0.5} unit="kg" onChange={(v) => { setMass1(v); handleReset(); }} />
                        <ParameterSlider label="السرعة (v₁)" value={velocity1} min={-5} max={5} step={0.5} unit="m/s" onChange={(v) => { setVelocity1(v); handleReset(); }} />
                    </div>
                </motion.div>

                <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-gradient-to-br from-pink-500/10 to-rose-500/5 backdrop-blur-xl rounded-3xl p-6 border border-pink-500/20">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
                            <span className="text-xl font-bold text-white">2</span>
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white">الجسم الثاني</h3>
                            <p className="text-xs text-pink-300/60">p₂ = {momentum2.toFixed(2)} kg·m/s</p>
                        </div>
                    </div>
                    <div className="space-y-5">
                        <ParameterSlider label="الكتلة (m₂)" value={mass2} min={0.5} max={5} step={0.5} unit="kg" onChange={(v) => { setMass2(v); handleReset(); }} />
                        <ParameterSlider label="السرعة (v₂)" value={velocity2} min={-5} max={5} step={0.5} unit="m/s" onChange={(v) => { setVelocity2(v); handleReset(); }} />
                    </div>
                </motion.div>
            </div>

            {/* Conservation Verification */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-xl rounded-3xl p-6 border border-green-500/20">
                <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">✓</span>
                    </div>
                    <div className="flex-1">
                        <h4 className="text-xl font-bold text-white mb-3">🔬 التحقق من قوانين الحفظ</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-white/50">الزخم الأولي</p>
                                <p className="text-green-400 font-mono text-lg">{initialMomentum.current.toFixed(3)}</p>
                            </div>
                            <div>
                                <p className="text-white/50">الزخم الحالي</p>
                                <p className={`font-mono text-lg ${Math.abs(currentMomentum - initialMomentum.current) < 0.01 ? 'text-green-400' : 'text-yellow-400'}`}>
                                    {currentMomentum.toFixed(3)}
                                </p>
                            </div>
                            <div>
                                <p className="text-white/50">الطاقة الأولية</p>
                                <p className="text-blue-400 font-mono text-lg">{initialKE.current.toFixed(2)} J</p>
                            </div>
                            <div>
                                <p className="text-white/50">الطاقة الحالية</p>
                                <p className={`font-mono text-lg ${collisionType === 'elastic' ? (Math.abs(currentKE - initialKE.current) < 0.1 ? 'text-green-400' : 'text-yellow-400') : 'text-orange-400'}`}>
                                    {currentKE.toFixed(2)} J
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Info */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`bg-gradient-to-r ${collisionType === 'elastic' ? 'from-blue-500/10 to-cyan-500/10' : 'from-orange-500/10 to-red-500/10'} backdrop-blur-xl rounded-3xl p-6 border border-white/10`}>
                <div className="flex items-start gap-4">
                    <div className={`w-14 h-14 bg-gradient-to-br ${collisionType === 'elastic' ? 'from-blue-500 to-cyan-500' : 'from-orange-500 to-red-500'} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Info className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h4 className="text-xl font-bold text-white mb-2">
                            {collisionType === 'elastic' ? '⚡ التصادم المرن' : '💥 التصادم غير المرن'}
                        </h4>
                        <p className="text-white/60 text-sm">
                            {collisionType === 'elastic'
                                ? 'يُحفظ الزخم والطاقة الحركية. لاحظ كيف تبقى كلتا القيمتين ثابتتين!'
                                : 'يُحفظ الزخم فقط. لاحظ كيف ينخفض الطاقة بعد التصادم (تتحول لحرارة/صوت).'
                            }
                        </p>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
