'use client';

import { motion } from 'framer-motion';
import { useState, useCallback, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Play, Pause, RotateCcw, FastForward, Rewind } from 'lucide-react';

// ============= VECTOR2D CLASS =============
export class Vector2D {
    constructor(public x: number = 0, public y: number = 0) { }

    static zero(): Vector2D {
        return new Vector2D(0, 0);
    }

    static fromAngle(angle: number, magnitude: number = 1): Vector2D {
        return new Vector2D(
            Math.cos(angle) * magnitude,
            Math.sin(angle) * magnitude
        );
    }

    clone(): Vector2D {
        return new Vector2D(this.x, this.y);
    }

    add(v: Vector2D): Vector2D {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    subtract(v: Vector2D): Vector2D {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    multiply(scalar: number): Vector2D {
        return new Vector2D(this.x * scalar, this.y * scalar);
    }

    divide(scalar: number): Vector2D {
        if (scalar === 0) return this.clone();
        return new Vector2D(this.x / scalar, this.y / scalar);
    }

    magnitude(): number {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    magnitudeSquared(): number {
        return this.x * this.x + this.y * this.y;
    }

    normalize(): Vector2D {
        const mag = this.magnitude();
        if (mag === 0) return Vector2D.zero();
        return this.divide(mag);
    }

    dot(v: Vector2D): number {
        return this.x * v.x + this.y * v.y;
    }

    cross(v: Vector2D): number {
        return this.x * v.y - this.y * v.x;
    }

    angle(): number {
        return Math.atan2(this.y, this.x);
    }

    rotate(angle: number): Vector2D {
        const cos = Math.cos(angle);
        const sin = Math.sin(angle);
        return new Vector2D(
            this.x * cos - this.y * sin,
            this.x * sin + this.y * cos
        );
    }

    perpendicular(): Vector2D {
        return new Vector2D(-this.y, this.x);
    }

    lerp(v: Vector2D, t: number): Vector2D {
        return this.add(v.subtract(this).multiply(t));
    }

    distance(v: Vector2D): number {
        return this.subtract(v).magnitude();
    }

    reflect(normal: Vector2D): Vector2D {
        const d = this.dot(normal) * 2;
        return this.subtract(normal.multiply(d));
    }
}

// ============= RIGID BODY INTERFACE =============
export interface RigidBody {
    id: string;
    position: Vector2D;
    velocity: Vector2D;
    acceleration: Vector2D;
    mass: number;
    inverseMass: number;
    restitution: number; // Coefficient of restitution (bounciness)
    friction: number;

    // Angular properties
    angle: number;
    angularVelocity: number;
    angularAcceleration: number;
    momentOfInertia: number;
    inverseMomentOfInertia: number;

    // For rendering
    radius?: number;
    width?: number;
    height?: number;
}

export function createRigidBody(options: Partial<RigidBody> & { id: string; mass: number }): RigidBody {
    const mass = options.mass > 0 ? options.mass : 1;
    const momentOfInertia = options.momentOfInertia || mass * 100;

    return {
        id: options.id,
        position: options.position || Vector2D.zero(),
        velocity: options.velocity || Vector2D.zero(),
        acceleration: options.acceleration || Vector2D.zero(),
        mass: mass,
        inverseMass: mass > 0 ? 1 / mass : 0,
        restitution: options.restitution ?? 1,
        friction: options.friction ?? 0,
        angle: options.angle ?? 0,
        angularVelocity: options.angularVelocity ?? 0,
        angularAcceleration: options.angularAcceleration ?? 0,
        momentOfInertia: momentOfInertia,
        inverseMomentOfInertia: momentOfInertia > 0 ? 1 / momentOfInertia : 0,
        radius: options.radius,
        width: options.width,
        height: options.height,
    };
}

// ============= PHYSICS ENGINE =============
export interface PhysicsState {
    bodies: RigidBody[];
    time: number;
    gravity: Vector2D;
}

export interface PhysicsConfig {
    gravity?: number;
    fixedDeltaTime?: number;
    maxSubsteps?: number;
    timeScale?: number;
}

const DEFAULT_CONFIG: Required<PhysicsConfig> = {
    gravity: 9.8,
    fixedDeltaTime: 1 / 60,
    maxSubsteps: 8,
    timeScale: 1,
};

// Velocity Verlet Integration - more accurate than Euler
function integrateVelocityVerlet(body: RigidBody, dt: number, gravity: Vector2D): void {
    // Linear motion
    // x(t+dt) = x(t) + v(t)*dt + 0.5*a(t)*dt²
    const halfDt2 = 0.5 * dt * dt;
    body.position = body.position.add(
        body.velocity.multiply(dt).add(body.acceleration.multiply(halfDt2))
    );

    // Store old acceleration
    const oldAcceleration = body.acceleration.clone();

    // Calculate new acceleration (gravity + any applied forces)
    body.acceleration = gravity.multiply(body.inverseMass > 0 ? 1 : 0);

    // v(t+dt) = v(t) + 0.5*(a(t) + a(t+dt))*dt
    body.velocity = body.velocity.add(
        oldAcceleration.add(body.acceleration).multiply(0.5 * dt)
    );

    // Apply friction/drag
    if (body.friction > 0) {
        const dragFactor = 1 - body.friction * dt;
        body.velocity = body.velocity.multiply(Math.max(0, dragFactor));
    }

    // Angular motion
    body.angle += body.angularVelocity * dt + 0.5 * body.angularAcceleration * dt * dt;
    const oldAngularAcc = body.angularAcceleration;
    body.angularVelocity += 0.5 * (oldAngularAcc + body.angularAcceleration) * dt;
}

// Circle-Circle collision detection
export function checkCircleCollision(a: RigidBody, b: RigidBody): boolean {
    if (!a.radius || !b.radius) return false;
    const distance = a.position.distance(b.position);
    return distance <= a.radius + b.radius;
}

// Resolve collision using impulse method
export function resolveCollision(a: RigidBody, b: RigidBody): void {
    if (!a.radius || !b.radius) return;

    const normal = b.position.subtract(a.position).normalize();
    const relativeVelocity = a.velocity.subtract(b.velocity);
    const velocityAlongNormal = relativeVelocity.dot(normal);

    // Don't resolve if velocities are separating
    if (velocityAlongNormal > 0) return;

    // Coefficient of restitution (use minimum)
    const e = Math.min(a.restitution, b.restitution);

    // Calculate impulse scalar
    // j = -(1+e) * (v_rel · n) / (1/m_a + 1/m_b)
    const j = -(1 + e) * velocityAlongNormal / (a.inverseMass + b.inverseMass);

    // Apply impulse
    const impulse = normal.multiply(j);
    a.velocity = a.velocity.add(impulse.multiply(a.inverseMass));
    b.velocity = b.velocity.subtract(impulse.multiply(b.inverseMass));

    // Positional correction to prevent sinking
    const penetration = (a.radius + b.radius) - a.position.distance(b.position);
    if (penetration > 0) {
        const correction = normal.multiply(penetration * 0.5);
        a.position = a.position.subtract(correction);
        b.position = b.position.add(correction);
    }
}

// ============= PHYSICS ENGINE HOOK =============
export function usePhysicsEngine(config: PhysicsConfig = {}) {
    const settings = { ...DEFAULT_CONFIG, ...config };
    const [timeScale, setTimeScale] = useState(settings.timeScale);
    const accumulatorRef = useRef(0);
    const lastTimeRef = useRef(0);
    const stateRef = useRef<PhysicsState>({
        bodies: [],
        time: 0,
        gravity: new Vector2D(0, settings.gravity),
    });

    const step = useCallback((deltaTime: number) => {
        const state = stateRef.current;
        const dt = settings.fixedDeltaTime;

        accumulatorRef.current += deltaTime * timeScale;

        // Fixed timestep with accumulator
        let steps = 0;
        while (accumulatorRef.current >= dt && steps < settings.maxSubsteps) {
            // Update all bodies
            for (const body of state.bodies) {
                integrateVelocityVerlet(body, dt, state.gravity);
            }

            // Check collisions
            for (let i = 0; i < state.bodies.length; i++) {
                for (let j = i + 1; j < state.bodies.length; j++) {
                    if (checkCircleCollision(state.bodies[i], state.bodies[j])) {
                        resolveCollision(state.bodies[i], state.bodies[j]);
                    }
                }
            }

            state.time += dt;
            accumulatorRef.current -= dt;
            steps++;
        }

        // Clamp accumulator to prevent spiral of death
        if (accumulatorRef.current > dt * settings.maxSubsteps) {
            accumulatorRef.current = 0;
        }

        return state;
    }, [timeScale, settings]);

    const addBody = useCallback((body: RigidBody) => {
        stateRef.current.bodies.push(body);
    }, []);

    const removeBody = useCallback((id: string) => {
        stateRef.current.bodies = stateRef.current.bodies.filter(b => b.id !== id);
    }, []);

    const getBody = useCallback((id: string) => {
        return stateRef.current.bodies.find(b => b.id === id);
    }, []);

    const reset = useCallback(() => {
        stateRef.current = {
            bodies: [],
            time: 0,
            gravity: new Vector2D(0, settings.gravity),
        };
        accumulatorRef.current = 0;
    }, [settings.gravity]);

    const setGravity = useCallback((g: number) => {
        stateRef.current.gravity = new Vector2D(0, g);
    }, []);

    return {
        step,
        addBody,
        removeBody,
        getBody,
        reset,
        setGravity,
        timeScale,
        setTimeScale,
        state: stateRef.current,
    };
}

// ============= ENHANCED ANIMATION LOOP =============
export function useAnimationLoop(
    callback: (deltaTime: number, totalTime: number) => void,
    isRunning: boolean
) {
    const frameRef = useRef<number>(0);
    const lastTimeRef = useRef<number>(0);
    const totalTimeRef = useRef<number>(0);

    useEffect(() => {
        if (!isRunning) {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
            return;
        }

        const animate = (currentTime: number) => {
            if (lastTimeRef.current === 0) {
                lastTimeRef.current = currentTime;
            }

            const deltaTime = Math.min((currentTime - lastTimeRef.current) / 1000, 0.05); // Cap at 50ms
            lastTimeRef.current = currentTime;
            totalTimeRef.current += deltaTime;

            callback(deltaTime, totalTimeRef.current);
            frameRef.current = requestAnimationFrame(animate);
        };

        frameRef.current = requestAnimationFrame(animate);

        return () => {
            if (frameRef.current) {
                cancelAnimationFrame(frameRef.current);
            }
        };
    }, [isRunning, callback]);

    return {
        reset: () => {
            lastTimeRef.current = 0;
            totalTimeRef.current = 0;
        }
    };
}

// ============= UI COMPONENTS =============
interface SimulationControlsProps {
    isPlaying: boolean;
    onPlay: () => void;
    onPause: () => void;
    onReset: () => void;
    timeScale?: number;
    onTimeScaleChange?: (scale: number) => void;
    showTimeControls?: boolean;
}

export function SimulationControls({
    isPlaying,
    onPlay,
    onPause,
    onReset,
    timeScale = 1,
    onTimeScaleChange,
    showTimeControls = false,
}: SimulationControlsProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-wrap items-center justify-center gap-4"
        >
            {/* Time scale controls */}
            {showTimeControls && onTimeScaleChange && (
                <div className="flex items-center gap-2 bg-black/40 backdrop-blur-xl rounded-full px-4 py-2 border border-white/10">
                    <button
                        onClick={() => onTimeScaleChange(0.25)}
                        className={`px-2 py-1 rounded text-xs ${timeScale === 0.25 ? 'bg-purple-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                        0.25x
                    </button>
                    <button
                        onClick={() => onTimeScaleChange(0.5)}
                        className={`px-2 py-1 rounded text-xs ${timeScale === 0.5 ? 'bg-purple-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                        0.5x
                    </button>
                    <button
                        onClick={() => onTimeScaleChange(1)}
                        className={`px-2 py-1 rounded text-xs ${timeScale === 1 ? 'bg-purple-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                        1x
                    </button>
                    <button
                        onClick={() => onTimeScaleChange(2)}
                        className={`px-2 py-1 rounded text-xs ${timeScale === 2 ? 'bg-purple-500 text-white' : 'text-white/60 hover:text-white'}`}
                    >
                        2x
                    </button>
                </div>
            )}

            {/* Main controls */}
            <div className="flex items-center gap-3">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/20 transition-all"
                >
                    <RotateCcw className="w-6 h-6" />
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={isPlaying ? onPause : onPlay}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white shadow-xl shadow-purple-500/25 hover:shadow-purple-500/40 transition-all"
                >
                    {isPlaying ? (
                        <Pause className="w-10 h-10" />
                    ) : (
                        <Play className="w-10 h-10 ml-1" />
                    )}
                </motion.button>

                <div className="w-14" /> {/* Spacer for symmetry */}
            </div>
        </motion.div>
    );
}

interface ParameterSliderProps {
    label: string;
    value: number;
    min: number;
    max: number;
    step: number;
    unit: string;
    onChange: (value: number) => void;
    disabled?: boolean;
}

export function ParameterSlider({
    label,
    value,
    min,
    max,
    step,
    unit,
    onChange,
    disabled = false,
}: ParameterSliderProps) {
    return (
        <div className={`space-y-3 ${disabled ? 'opacity-50' : ''}`}>
            <div className="flex items-center justify-between">
                <label className="text-white/80 text-sm font-medium">{label}</label>
                <span className="text-white font-mono text-sm bg-white/10 px-3 py-1 rounded-lg">
                    {value.toFixed(step < 1 ? 1 : 0)} {unit}
                </span>
            </div>
            <Slider
                value={[value]}
                min={min}
                max={max}
                step={step}
                onValueChange={(vals) => onChange(vals[0])}
                disabled={disabled}
                className="py-2"
            />
        </div>
    );
}

interface SimulationCanvasProps {
    children: React.ReactNode;
    className?: string;
}

export function SimulationCanvas({ children, className = '' }: SimulationCanvasProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className={`relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden border border-white/10 shadow-2xl ${className}`}
        >
            {/* Animated gradient border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 opacity-50" />
            <div className="absolute inset-[1px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

// ============= UTILITY FUNCTIONS =============
export function lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
}

export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

export function mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
    return outMin + (outMax - outMin) * ((value - inMin) / (inMax - inMin));
}

export function degreesToRadians(degrees: number): number {
    return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
    return radians * (180 / Math.PI);
}

// Energy calculations
export function kineticEnergy(mass: number, velocity: Vector2D | number): number {
    const v = velocity instanceof Vector2D ? velocity.magnitude() : velocity;
    return 0.5 * mass * v * v;
}

export function potentialEnergy(mass: number, height: number, g: number = 9.8): number {
    return mass * g * height;
}

export function momentum(mass: number, velocity: Vector2D | number): number | Vector2D {
    if (velocity instanceof Vector2D) {
        return velocity.multiply(mass);
    }
    return mass * velocity;
}

// Rotational calculations
export function torque(force: number, leverArm: number, angle: number = Math.PI / 2): number {
    return force * leverArm * Math.sin(angle);
}

export function angularMomentum(momentOfInertia: number, angularVelocity: number): number {
    return momentOfInertia * angularVelocity;
}

export function rotationalKineticEnergy(momentOfInertia: number, angularVelocity: number): number {
    return 0.5 * momentOfInertia * angularVelocity * angularVelocity;
}
