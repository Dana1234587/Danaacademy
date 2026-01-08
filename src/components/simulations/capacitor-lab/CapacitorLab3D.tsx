'use client';

import React, { Suspense, useRef, useState, useCallback, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Environment, Html, Text, RoundedBox, ContactShadows, Lightformer } from '@react-three/drei';
import * as THREE from 'three';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Zap, BookOpen, Gamepad2, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// ==================== CONSTANTS ====================
const EPSILON_0 = 8.854e-12;

// ==================== PHYSICS HOOK ====================
function useCapacitorPhysics(voltage: number, plateArea: number, separation: number, isClosed: boolean) {
    const [currentVoltage, setCurrentVoltage] = useState(0);

    React.useEffect(() => {
        if (isClosed && currentVoltage < voltage) {
            const timer = setTimeout(() => setCurrentVoltage(v => Math.min(v + 2, voltage)), 30);
            return () => clearTimeout(timer);
        }
        if (!isClosed && currentVoltage > 0) {
            const timer = setTimeout(() => setCurrentVoltage(v => Math.max(v - 4, 0)), 25);
            return () => clearTimeout(timer);
        }
    }, [isClosed, currentVoltage, voltage]);

    return useMemo(() => {
        const area = plateArea * 1e-4;
        const d = separation * 1e-3;
        const actualV = isClosed ? currentVoltage : 0;
        const capacitance = (EPSILON_0 * area) / d;
        const charge = capacitance * actualV;
        const energy = 0.5 * capacitance * actualV * actualV;

        return {
            voltage: actualV,
            capacitance,
            charge,
            energy,
            chargeRatio: Math.min(actualV / 100, 1),
        };
    }, [currentVoltage, plateArea, separation, isClosed, voltage]);
}

// ==================== LAB BENCH (Wooden Table) ====================
function LabBench3D() {
    return (
        <group position={[0, -0.5, 0]}>
            {/* Table top - wooden surface */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[5, 0.1, 3]} />
                <meshStandardMaterial color="#8B5A2B" metalness={0.1} roughness={0.8} />
            </mesh>

            {/* Table edge trim */}
            <mesh position={[0, -0.02, 1.5]} castShadow>
                <boxGeometry args={[5, 0.06, 0.05]} />
                <meshStandardMaterial color="#5D3A1A" metalness={0.2} roughness={0.7} />
            </mesh>

            {/* Table legs */}
            {[[-2.3, -0.4, 1.3], [2.3, -0.4, 1.3], [-2.3, -0.4, -1.3], [2.3, -0.4, -1.3]].map((pos, i) => (
                <mesh key={i} position={pos as [number, number, number]} castShadow>
                    <boxGeometry args={[0.1, 0.7, 0.1]} />
                    <meshStandardMaterial color="#4A4A4A" metalness={0.8} roughness={0.3} />
                </mesh>
            ))}

            {/* Table support bars */}
            <mesh position={[0, -0.3, 1.3]} castShadow>
                <boxGeometry args={[4.6, 0.05, 0.05]} />
                <meshStandardMaterial color="#4A4A4A" metalness={0.8} roughness={0.3} />
            </mesh>
            <mesh position={[0, -0.3, -1.3]} castShadow>
                <boxGeometry args={[4.6, 0.05, 0.05]} />
                <meshStandardMaterial color="#4A4A4A" metalness={0.8} roughness={0.3} />
            </mesh>
        </group>
    );
}

// ==================== HORIZONTAL BATTERY (Laying on table) ====================
function HorizontalBattery3D({ position, voltage }: { position: [number, number, number]; voltage: number }) {
    return (
        <group position={position} rotation={[0, 0, Math.PI / 2]}>
            {/* Main cylinder body */}
            <mesh castShadow receiveShadow>
                <cylinderGeometry args={[0.25, 0.25, 0.8, 64]} />
                <meshStandardMaterial color="#2D3748" metalness={0.9} roughness={0.2} />
            </mesh>

            {/* Positive end cap */}
            <mesh castShadow position={[0, 0.42, 0]}>
                <cylinderGeometry args={[0.22, 0.25, 0.05, 64]} />
                <meshStandardMaterial color="#718096" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Positive terminal nub */}
            <mesh castShadow position={[0, 0.48, 0]}>
                <cylinderGeometry args={[0.08, 0.08, 0.08, 32]} />
                <meshStandardMaterial color="#C53030" metalness={0.85} roughness={0.15} />
            </mesh>

            {/* Negative end */}
            <mesh castShadow position={[0, -0.42, 0]}>
                <cylinderGeometry args={[0.25, 0.22, 0.05, 64]} />
                <meshStandardMaterial color="#718096" metalness={0.95} roughness={0.1} />
            </mesh>

            {/* Battery label wrap */}
            <mesh position={[0, 0, 0]}>
                <cylinderGeometry args={[0.252, 0.252, 0.5, 64]} />
                <meshStandardMaterial color="#1A202C" metalness={0.1} roughness={0.9} />
            </mesh>

            {/* Voltage label */}
            <Html position={[0.26, 0, 0]} rotation={[0, 0, -Math.PI / 2]} center>
                <div className="text-green-400 font-mono text-sm font-bold select-none whitespace-nowrap" style={{ textShadow: '0 0 8px #22C55E' }}>
                    {voltage}V
                </div>
            </Html>
        </group>
    );
}

// ==================== PLATE WITH STAND ====================
function PlateWithStand3D({
    position,
    width,
    isPositive,
    chargeCount,
    connected
}: {
    position: [number, number, number];
    width: number;
    isPositive: boolean;
    chargeCount: number;
    connected: boolean;
}) {
    const accentColor = isPositive ? '#C53030' : '#2B6CB0';

    return (
        <group position={position}>
            {/* Stand base - on the table */}
            <mesh castShadow receiveShadow position={[0, -0.3, 0]}>
                <boxGeometry args={[0.4, 0.05, 0.4]} />
                <meshStandardMaterial color="#4A4A4A" metalness={0.8} roughness={0.3} />
            </mesh>

            {/* Stand rod */}
            <mesh castShadow position={[0, -0.15, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.3, 16]} />
                <meshStandardMaterial color="#718096" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Plate clamp */}
            <mesh castShadow position={[0, 0, 0]}>
                <boxGeometry args={[0.08, 0.12, 0.08]} />
                <meshStandardMaterial color="#4A4A4A" metalness={0.7} roughness={0.4} />
            </mesh>

            {/* Main plate */}
            <mesh castShadow receiveShadow position={[0, 0, 0]}>
                <boxGeometry args={[width, 0.04, 0.5]} />
                <meshStandardMaterial
                    color="#C0C0C0"
                    metalness={0.95}
                    roughness={0.08}
                    envMapIntensity={1.8}
                />
            </mesh>

            {/* Colored edge indicator */}
            <mesh position={[-width / 2 - 0.015, 0, 0]} castShadow>
                <boxGeometry args={[0.03, 0.04, 0.5]} />
                <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Terminal post for wire connection */}
            <mesh castShadow position={[width / 2 - 0.1, 0.05, 0]}>
                <cylinderGeometry args={[0.03, 0.03, 0.06, 16]} />
                <meshStandardMaterial color="#D69E2E" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Charges on plate surface */}
            {chargeCount > 0 && Array.from({ length: chargeCount }).map((_, i) => {
                const xOffset = (i - chargeCount / 2 + 0.5) * (width * 0.8 / chargeCount);
                const zOffset = (Math.random() - 0.5) * 0.3;
                return (
                    <ChargeParticle
                        key={i}
                        position={[xOffset, 0.04, zOffset]}
                        isPositive={isPositive}
                    />
                );
            })}

            {/* Polarity label */}
            <Text
                position={[0, 0.15, 0]}
                fontSize={0.1}
                color={accentColor}
                anchorX="center"
            >
                {isPositive ? '+' : '−'}
            </Text>
        </group>
    );
}

// ==================== 3D CAPACITOR PLATE ====================
function CapacitorPlate3D({
    position,
    width,
    isPositive,
    chargeCount,
    connected
}: {
    position: [number, number, number];
    width: number;
    isPositive: boolean;
    chargeCount: number;
    connected: boolean;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const accentColor = isPositive ? '#DC2626' : '#2563EB';

    // Animated metallic sheen
    useFrame((state) => {
        if (meshRef.current) {
            const material = meshRef.current.material as THREE.MeshStandardMaterial;
            if (connected) {
                material.emissive.setHex(isPositive ? 0x331111 : 0x111133);
            } else {
                material.emissive.setHex(0x000000);
            }
        }
    });

    return (
        <group position={position}>
            {/* Main plate */}
            <mesh ref={meshRef} castShadow receiveShadow>
                <boxGeometry args={[width, 0.08, 0.6]} />
                <meshStandardMaterial
                    color="#9CA3AF"
                    metalness={0.9}
                    roughness={0.1}
                />
            </mesh>

            {/* Colored edge strip */}
            <mesh position={[-width / 2 - 0.02, 0, 0]} castShadow>
                <boxGeometry args={[0.04, 0.08, 0.6]} />
                <meshStandardMaterial color={accentColor} metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Screw terminal */}
            <group position={[0, isPositive ? 0.15 : -0.15, 0]}>
                <mesh castShadow>
                    <cylinderGeometry args={[0.08, 0.08, 0.1, 16]} />
                    <meshStandardMaterial color="#D97706" metalness={0.8} roughness={0.2} />
                </mesh>
                <mesh position={[0, 0.06, 0]} castShadow>
                    <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
                    <meshStandardMaterial color="#FCD34D" metalness={0.9} roughness={0.1} />
                </mesh>
            </group>

            {/* Charges (animated spheres) */}
            {Array.from({ length: chargeCount }).map((_, i) => (
                <ChargeParticle
                    key={i}
                    position={[(i - chargeCount / 2 + 0.5) * (width / (chargeCount + 1)), 0.06, 0]}
                    isPositive={isPositive}
                />
            ))}

            {/* Label */}
            <Text
                position={[width / 2 + 0.3, 0, 0]}
                fontSize={0.12}
                color="#64748B"
                anchorX="left"
            >
                {isPositive ? 'صفيحة (+)' : 'صفيحة (−)'}
            </Text>
        </group>
    );
}

// ==================== CHARGE PARTICLE ====================
function ChargeParticle({ position, isPositive }: { position: [number, number, number]; isPositive: boolean }) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 3 + position[0] * 5) * 0.02;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <sphereGeometry args={[0.05, 16, 16]} />
            <meshStandardMaterial
                color={isPositive ? '#EF4444' : '#3B82F6'}
                emissive={isPositive ? '#EF4444' : '#3B82F6'}
                emissiveIntensity={0.5}
            />
        </mesh>
    );
}

// ==================== 3D WIRE ====================
function Wire3D({ points, isActive }: { points: THREE.Vector3[]; isActive: boolean }) {
    const curve = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

    return (
        <mesh castShadow>
            <tubeGeometry args={[curve, 64, 0.04, 8, false]} />
            <meshStandardMaterial
                color={isActive ? '#22C55E' : '#6B7280'}
                metalness={0.8}
                roughness={0.2}
            />
        </mesh>
    );
}

// ==================== 3D SWITCH ====================
function Switch3D({
    position,
    isClosed,
    onClick
}: {
    position: [number, number, number];
    isClosed: boolean;
    onClick: () => void;
}) {
    const leverRef = useRef<THREE.Mesh>(null);

    useFrame(() => {
        if (leverRef.current) {
            const targetRotation = isClosed ? 0 : Math.PI / 4;
            leverRef.current.rotation.z = THREE.MathUtils.lerp(
                leverRef.current.rotation.z,
                targetRotation,
                0.1
            );
        }
    });

    return (
        <group position={position} onClick={onClick}>
            {/* Base */}
            <mesh castShadow receiveShadow>
                <boxGeometry args={[0.3, 0.1, 0.2]} />
                <meshStandardMaterial color="#1F2937" metalness={0.5} roughness={0.5} />
            </mesh>

            {/* Contact points */}
            <mesh position={[-0.1, 0.06, 0]} castShadow>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.1} />
            </mesh>
            <mesh position={[0.1, 0.06, 0]} castShadow>
                <sphereGeometry args={[0.04, 16, 16]} />
                <meshStandardMaterial color="#D97706" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Lever */}
            <mesh ref={leverRef} position={[-0.1, 0.08, 0]} castShadow>
                <boxGeometry args={[0.25, 0.03, 0.05]} />
                <meshStandardMaterial
                    color={isClosed ? '#22C55E' : '#F97316'}
                    metalness={0.7}
                    roughness={0.3}
                />
            </mesh>

            {/* Label */}
            <Html position={[0, -0.15, 0]} center>
                <div className="text-xs text-slate-500 font-bold select-none">
                    {isClosed ? 'مغلق ✓' : 'مفتوح'}
                </div>
            </Html>
        </group>
    );
}

// ==================== 3D VOLTMETER (Premium) ====================
function Voltmeter3D({
    position,
    voltage
}: {
    position: [number, number, number];
    voltage: number;
}) {
    return (
        <group position={position}>
            {/* Body - premium finish */}
            <RoundedBox args={[0.8, 1.1, 0.3]} radius={0.05} castShadow receiveShadow>
                <meshStandardMaterial color="#1F2937" metalness={0.15} roughness={0.85} />
            </RoundedBox>

            {/* Screen bezel (inset) */}
            <mesh position={[0, 0.3, 0.13]}>
                <boxGeometry args={[0.65, 0.35, 0.04]} />
                <meshStandardMaterial color="#0D0D0D" metalness={0.2} roughness={0.8} />
            </mesh>

            {/* LCD Screen (emissive glow) */}
            <mesh position={[0, 0.3, 0.155]}>
                <planeGeometry args={[0.58, 0.28]} />
                <meshStandardMaterial
                    color="#0D1117"
                    emissive="#064E3B"
                    emissiveIntensity={0.4}
                />
            </mesh>

            {/* LCD Display with glow */}
            <Html position={[0, 0.3, 0.16]} center>
                <div
                    className="font-mono text-2xl font-bold select-none"
                    style={{
                        color: '#4ADE80',
                        textShadow: '0 0 15px #22C55E, 0 0 30px #22C55E',
                        fontFamily: 'Courier New, monospace'
                    }}
                >
                    {voltage.toFixed(1)} V
                </div>
            </Html>

            {/* Dial base */}
            <mesh position={[0, -0.1, 0.14]} castShadow>
                <cylinderGeometry args={[0.17, 0.17, 0.04, 64]} />
                <meshStandardMaterial color="#374151" metalness={0.7} roughness={0.3} />
            </mesh>

            {/* Dial knob */}
            <mesh position={[0, -0.1, 0.17]} castShadow>
                <cylinderGeometry args={[0.13, 0.13, 0.04, 64]} />
                <meshStandardMaterial color="#1F2937" metalness={0.4} roughness={0.6} />
            </mesh>

            {/* Dial pointer */}
            <mesh position={[0.05, -0.1, 0.19]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.08, 0.015, 0.008]} />
                <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={0.4} />
            </mesh>

            {/* Probe input - Red */}
            <mesh position={[-0.15, -0.4, 0.14]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.06, 32]} />
                <meshStandardMaterial color="#DC2626" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
            </mesh>
            <mesh position={[-0.15, -0.4, 0.17]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
                <meshStandardMaterial color="#0D0D0D" />
            </mesh>

            {/* Probe input - Black */}
            <mesh position={[0.15, -0.4, 0.14]} castShadow>
                <cylinderGeometry args={[0.05, 0.05, 0.06, 32]} />
                <meshStandardMaterial color="#1F2937" metalness={0.9} roughness={0.1} envMapIntensity={1.5} />
            </mesh>
            <mesh position={[0.15, -0.4, 0.17]}>
                <cylinderGeometry args={[0.025, 0.025, 0.02, 16]} />
                <meshStandardMaterial color="#0D0D0D" />
            </mesh>

            {/* Labels */}
            <Text position={[-0.15, -0.5, 0.16]} fontSize={0.05} color="#DC2626" fontWeight="bold">
                VΩmA
            </Text>
            <Text position={[0.15, -0.5, 0.16]} fontSize={0.05} color="#6B7280" fontWeight="bold">
                COM
            </Text>
        </group>
    );
}

// ==================== 3D PROBE ====================
function Probe3D({
    position,
    color,
    darkColor,
    onDrag,
    isDragging
}: {
    position: [number, number, number];
    color: string;
    darkColor: string;
    onDrag?: (pos: THREE.Vector3) => void;
    isDragging: boolean;
}) {
    const groupRef = useRef<THREE.Group>(null);

    return (
        <group ref={groupRef} position={position}>
            {/* Handle */}
            <mesh castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Grip rings */}
            {[0, 0.08, 0.16, -0.08, -0.16].map((y, i) => (
                <mesh key={i} position={[0, y, 0]} castShadow>
                    <torusGeometry args={[0.065, 0.01, 8, 16]} />
                    <meshStandardMaterial color={darkColor} />
                </mesh>
            ))}

            {/* Metal collar */}
            <mesh position={[0, 0.22, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.06, 0.04, 16]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Metal shaft */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#E5E7EB" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Pointed tip */}
            <mesh position={[0, 0.58, 0]} castShadow>
                <coneGeometry args={[0.025, 0.06, 8]} />
                <meshStandardMaterial color="#F3F4F6" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Glow when dragging */}
            {isDragging && (
                <pointLight color={color} intensity={2} distance={0.5} />
            )}
        </group>
    );
}

// ==================== ELECTRIC FIELD LINES ====================
function ElectricFieldLines3D({
    topY,
    bottomY,
    width,
    visible,
    chargeRatio
}: {
    topY: number;
    bottomY: number;
    width: number;
    visible: boolean;
    chargeRatio: number;
}) {
    const linesRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (linesRef.current && visible) {
            linesRef.current.children.forEach((child, i) => {
                const arrow = child as THREE.ArrowHelper;
                const offset = Math.sin(state.clock.elapsedTime * 2 + i) * 0.02;
                arrow.position.y = (topY + bottomY) / 2 + offset;
            });
        }
    });

    if (!visible || chargeRatio < 0.1) return null;

    const lineCount = Math.floor(chargeRatio * 6);
    const spacing = width / (lineCount + 1);

    return (
        <group ref={linesRef}>
            {Array.from({ length: lineCount }).map((_, i) => {
                const x = -width / 2 + (i + 1) * spacing;
                const dir = new THREE.Vector3(0, -1, 0);
                const origin = new THREE.Vector3(x, topY - 0.1, 0);
                const length = bottomY - topY + 0.2;

                return (
                    <arrowHelper
                        key={i}
                        args={[dir, origin, Math.abs(length) * chargeRatio, 0x8B5CF6, 0.1, 0.05]}
                    />
                );
            })}
        </group>
    );
}

// ==================== MAIN 3D SCENE ====================
function CapacitorScene({
    voltage,
    plateArea,
    separation,
    isClosed,
    setIsClosed,
    showFieldLines,
    physics,
    redProbePos,
    setRedProbePos,
    blackProbePos,
    setBlackProbePos
}: {
    voltage: number;
    plateArea: number;
    separation: number;
    isClosed: boolean;
    setIsClosed: (v: boolean) => void;
    showFieldLines: boolean;
    physics: ReturnType<typeof useCapacitorPhysics>;
    redProbePos: [number, number, number];
    setRedProbePos: (pos: [number, number, number]) => void;
    blackProbePos: [number, number, number];
    setBlackProbePos: (pos: [number, number, number]) => void;
}) {
    const plateWidth = 0.8 + (plateArea - 50) * 0.006;
    const plateSeparation = 0.5 + (separation - 1) * 0.05;
    const topPlateY = plateSeparation / 2;
    const bottomPlateY = -plateSeparation / 2;

    // Dynamic charge count based on charge (Q = CV)
    const baseChargeCount = Math.max(2, Math.min(10, Math.floor(physics.chargeRatio * (plateArea / 20))));
    const chargeCount = isClosed ? baseChargeCount : 0;

    // Check if probes are on plates (adjusted for table-level positions)
    const plateX = 0.3; // Plate center X position
    const topPlateActualY = topPlateY - 0.2;
    const bottomPlateActualY = bottomPlateY - 0.2;

    const isOnTopPlate = (pos: [number, number, number]) => {
        return Math.abs(pos[0] - plateX) < plateWidth / 2 + 0.15 &&
            Math.abs(pos[1] - topPlateActualY) < 0.2 &&
            Math.abs(pos[2]) < 0.4;
    };

    const isOnBottomPlate = (pos: [number, number, number]) => {
        return Math.abs(pos[0] - plateX) < plateWidth / 2 + 0.15 &&
            Math.abs(pos[1] - bottomPlateActualY) < 0.2 &&
            Math.abs(pos[2]) < 0.4;
    };

    const redOnTop = isOnTopPlate(redProbePos);
    const redOnBottom = isOnBottomPlate(redProbePos);
    const blackOnTop = isOnTopPlate(blackProbePos);
    const blackOnBottom = isOnBottomPlate(blackProbePos);

    // Probes are correctly connected when red is on positive (top) and black is on negative (bottom)
    const probesConnected = (redOnTop && blackOnBottom) || (redOnBottom && blackOnTop);
    const voltmeterReading = probesConnected && isClosed ? physics.voltage : 0;

    // Voltmeter position
    const vmX = 2.2, vmY = 0.2, vmZ = 0;

    return (
        <>
            {/* ========== PREMIUM LIGHTING ========== */}
            <ambientLight intensity={0.15} />

            {/* Main key light */}
            <directionalLight
                position={[5, 8, 5]}
                intensity={1.8}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
                shadow-camera-far={20}
                shadow-camera-left={-5}
                shadow-camera-right={5}
                shadow-camera-top={5}
                shadow-camera-bottom={-5}
            />

            {/* Fill light */}
            <directionalLight position={[-3, 4, -3]} intensity={0.5} />

            {/* Rim light */}
            <directionalLight position={[0, 2, -5]} intensity={0.3} color="#A5B4FC" />

            {/* HDRI Environment for metallic reflections */}
            <Environment preset="city" background={false} />

            {/* Floor */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.3, 0]} receiveShadow>
                <planeGeometry args={[20, 20]} />
                <meshStandardMaterial color="#D1D5DB" metalness={0.05} roughness={0.95} />
            </mesh>

            <ContactShadows position={[0, -1.29, 0]} opacity={0.6} scale={15} blur={3} far={5} />

            {/* ========== LAB BENCH ========== */}
            <LabBench3D />

            {/* ========== HORIZONTAL BATTERY (on table, left side) ========== */}
            <HorizontalBattery3D position={[-1.8, -0.18, 0.5]} voltage={voltage} />

            {/* ========== CAPACITOR PLATES WITH STANDS ========== */}
            <PlateWithStand3D
                position={[0.3, topPlateY - 0.2, 0]}
                width={plateWidth}
                isPositive={true}
                chargeCount={chargeCount}
                connected={isClosed}
            />
            <PlateWithStand3D
                position={[0.3, bottomPlateY - 0.2, 0]}
                width={plateWidth}
                isPositive={false}
                chargeCount={chargeCount}
                connected={isClosed}
            />

            {/* ========== CIRCUIT WIRES (laying on table) ========== */}
            {/* Wire from battery + to switch */}
            <Wire3D
                points={[
                    new THREE.Vector3(-1.3, -0.18, 0.5),
                    new THREE.Vector3(-1.3, -0.35, 0.5),
                    new THREE.Vector3(-1.3, -0.35, 0),
                    new THREE.Vector3(-0.8, -0.35, 0),
                ]}
                isActive={isClosed}
            />
            {/* Wire from switch to top plate */}
            <Wire3D
                points={[
                    new THREE.Vector3(-0.4, -0.35, 0),
                    new THREE.Vector3(0.1, -0.35, 0),
                    new THREE.Vector3(0.1, topPlateY - 0.2, 0),
                ]}
                isActive={isClosed}
            />
            {/* Wire from bottom plate to battery - */}
            <Wire3D
                points={[
                    new THREE.Vector3(0.1, bottomPlateY - 0.2, 0),
                    new THREE.Vector3(0.1, -0.35, -0.3),
                    new THREE.Vector3(-2.3, -0.35, -0.3),
                    new THREE.Vector3(-2.3, -0.18, 0.5),
                ]}
                isActive={isClosed}
            />

            {/* ========== SWITCH (on the table) ========== */}
            <Switch3D
                position={[-0.6, -0.35, 0]}
                isClosed={isClosed}
                onClick={() => setIsClosed(!isClosed)}
            />

            {/* ========== VOLTMETER (on table, right side) ========== */}
            <Voltmeter3D position={[vmX, -0.15, 0.3]} voltage={voltmeterReading} />

            {/* Probe Cables (from voltmeter to probes) */}
            <ProbeCable3D
                start={[vmX - 0.15, -0.55, 0.45]}
                end={redProbePos}
                color="#DC2626"
            />
            <ProbeCable3D
                start={[vmX + 0.15, -0.55, 0.45]}
                end={blackProbePos}
                color="#374151"
            />

            {/* Draggable Probes */}
            <DraggableProbe3D
                position={redProbePos}
                setPosition={setRedProbePos}
                color="#EF4444"
                darkColor="#991B1B"
                isConnected={redOnTop || redOnBottom}
                onDragStart={() => { }}
                onDragEnd={() => { }}
            />
            <DraggableProbe3D
                position={blackProbePos}
                setPosition={setBlackProbePos}
                color="#374151"
                darkColor="#111827"
                isConnected={blackOnTop || blackOnBottom}
                onDragStart={() => { }}
                onDragEnd={() => { }}
            />

            {/* Electric Field Lines */}
            <ElectricFieldLines3D
                topY={topPlateY - 0.04}
                bottomY={bottomPlateY + 0.04}
                width={plateWidth}
                visible={showFieldLines && isClosed}
                chargeRatio={physics.chargeRatio}
            />

            {/* Connection status indicator */}
            {probesConnected && isClosed && (
                <Html position={[vmX, vmY + 0.8, vmZ]} center>
                    <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full animate-pulse">
                        متصل ✓
                    </div>
                </Html>
            )}

            {/* Camera Controls */}
            <OrbitControls
                enablePan={false}
                minDistance={3}
                maxDistance={8}
                minPolarAngle={Math.PI / 6}
                maxPolarAngle={Math.PI / 2}
            />
        </>
    );
}

// ==================== PROBE CABLE ====================
function ProbeCable3D({ start, end, color }: {
    start: [number, number, number];
    end: [number, number, number];
    color: string;
}) {
    const midY = Math.min(start[1], end[1]) - 0.5;
    const curve = useMemo(() => {
        return new THREE.QuadraticBezierCurve3(
            new THREE.Vector3(...start),
            new THREE.Vector3((start[0] + end[0]) / 2, midY, (start[2] + end[2]) / 2),
            new THREE.Vector3(end[0], end[1] + 0.2, end[2])
        );
    }, [start, end, midY]);

    const points = useMemo(() => curve.getPoints(50), [curve]);
    const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points]);

    return (
        <line geometry={geometry}>
            <lineBasicMaterial color={color} linewidth={3} />
        </line>
    );
}

// ==================== DRAGGABLE PROBE ====================
function DraggableProbe3D({
    position,
    setPosition,
    color,
    darkColor,
    isConnected,
    onDragStart,
    onDragEnd
}: {
    position: [number, number, number];
    setPosition: (pos: [number, number, number]) => void;
    color: string;
    darkColor: string;
    isConnected: boolean;
    onDragStart: () => void;
    onDragEnd: () => void;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const { camera, gl } = useThree();
    const [isDragging, setIsDragging] = useState(false);
    const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(0, 0, 1), 0), []);
    const intersection = useMemo(() => new THREE.Vector3(), []);

    const handlePointerDown = (e: React.PointerEvent) => {
        e.stopPropagation();
        setIsDragging(true);
        onDragStart();
        (e.target as HTMLElement).setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: React.PointerEvent) => {
        if (!isDragging) return;
        e.stopPropagation();

        const raycaster = new THREE.Raycaster();
        const mouse = new THREE.Vector2(
            (e.clientX / gl.domElement.clientWidth) * 2 - 1,
            -(e.clientY / gl.domElement.clientHeight) * 2 + 1
        );

        raycaster.setFromCamera(mouse, camera);
        raycaster.ray.intersectPlane(plane, intersection);

        // Constrain movement
        const newX = Math.max(-2, Math.min(3, intersection.x));
        const newY = Math.max(-1.2, Math.min(1.2, intersection.y));

        setPosition([newX, newY, 0.5]);
    };

    const handlePointerUp = (e: React.PointerEvent) => {
        setIsDragging(false);
        onDragEnd();
        (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    };

    return (
        <group
            ref={groupRef}
            position={position}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
        >
            {/* Handle */}
            <mesh castShadow>
                <cylinderGeometry args={[0.06, 0.06, 0.4, 16]} />
                <meshStandardMaterial color={color} metalness={0.2} roughness={0.8} />
            </mesh>

            {/* Grip rings */}
            {[0, 0.08, 0.16, -0.08, -0.16].map((y, i) => (
                <mesh key={i} position={[0, y, 0]} castShadow>
                    <torusGeometry args={[0.065, 0.01, 8, 16]} />
                    <meshStandardMaterial color={darkColor} />
                </mesh>
            ))}

            {/* Metal collar */}
            <mesh position={[0, 0.22, 0]} castShadow>
                <cylinderGeometry args={[0.05, 0.06, 0.04, 16]} />
                <meshStandardMaterial color="#9CA3AF" metalness={0.9} roughness={0.1} />
            </mesh>

            {/* Metal shaft */}
            <mesh position={[0, 0.4, 0]} castShadow>
                <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
                <meshStandardMaterial color="#E5E7EB" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Pointed tip */}
            <mesh position={[0, 0.58, 0]} castShadow>
                <coneGeometry args={[0.025, 0.06, 8]} />
                <meshStandardMaterial color="#F3F4F6" metalness={0.95} roughness={0.05} />
            </mesh>

            {/* Glow when connected or dragging */}
            {(isDragging || isConnected) && (
                <pointLight color={isConnected ? '#22C55E' : color} intensity={3} distance={0.8} />
            )}

            {/* Connection indicator */}
            {isConnected && (
                <mesh position={[0, 0.7, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="#22C55E" emissive="#22C55E" emissiveIntensity={1} />
                </mesh>
            )}
        </group>
    );
}

// ==================== MEASUREMENTS PANEL ====================
function MeasurementsPanel({ physics, plateArea, separation }: {
    physics: ReturnType<typeof useCapacitorPhysics>;
    plateArea: number;
    separation: number;
}) {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
                {[
                    { label: 'فرق الجهد', value: physics.voltage.toFixed(2), unit: 'V', icon: '⚡' },
                    { label: 'السعة', value: (physics.capacitance * 1e12).toFixed(2), unit: 'pF', icon: '📊' },
                    { label: 'الشحنة', value: (physics.charge * 1e12).toFixed(2), unit: 'pC', icon: '🔋' },
                    { label: 'طاقة الوضع', value: (physics.energy * 1e9).toFixed(2), unit: 'nJ', icon: '💡' },
                ].map((item, i) => (
                    <Card key={i} className="bg-white border-slate-200 shadow-sm">
                        <CardContent className="p-4">
                            <div className="text-sm text-slate-500 mb-1">{item.icon} {item.label}</div>
                            <div className="text-2xl font-bold text-slate-800">
                                {item.value} <span className="text-lg text-purple-600">{item.unit}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card className="bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200">
                <CardHeader className="pb-2">
                    <CardTitle className="text-sm text-purple-700">⚡ القوانين الأساسية</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                        <BlockMath math={`C = \\varepsilon_0 \\cdot \\frac{A}{d}`} />
                    </div>
                    <div className="bg-white/80 p-3 rounded-lg shadow-sm">
                        <BlockMath math={`PE = \\frac{1}{2}C \\cdot V^2`} />
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

// ==================== MAIN COMPONENT ====================
export default function CapacitorLab3D() {
    const [voltage, setVoltage] = useState(50);
    const [plateArea, setPlateArea] = useState(100);
    const [separation, setSeparation] = useState(10);
    const [isClosed, setIsClosed] = useState(false);
    const [showFieldLines, setShowFieldLines] = useState(true);
    const [activeTab, setActiveTab] = useState('explore');

    // Probe states (lifted from CapacitorScene)
    const [redProbePos, setRedProbePos] = useState<[number, number, number]>([1.8, -0.35, 0.8]);
    const [blackProbePos, setBlackProbePos] = useState<[number, number, number]>([2.0, -0.35, 0.8]);

    const physics = useCapacitorPhysics(voltage, plateArea, separation, isClosed);

    const resetSimulation = () => {
        setVoltage(50);
        setPlateArea(100);
        setSeparation(10);
        setIsClosed(false);
        setRedProbePos([1.8, -0.35, 0.8]);
        setBlackProbePos([2.0, -0.35, 0.8]);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 via-purple-50 to-indigo-100 text-slate-800 p-4 md:p-8">
            {/* Header */}
            <div className="text-center mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600">
                    ⚡ مختبر المواسعات الافتراضي 3D
                </h1>
                <p className="text-slate-500 mt-2">محاكاة ثلاثية الأبعاد تفاعلية - مستوى جامعي</p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6">
                {/* 3D Canvas */}
                <div className="lg:col-span-2">
                    <Card className="bg-white border-slate-200 shadow-lg overflow-hidden">
                        <CardContent className="p-0">
                            <div className="h-[500px] w-full">
                                <Canvas
                                    shadows
                                    camera={{ position: [4, 3, 4], fov: 50 }}
                                    gl={{ antialias: true }}
                                >
                                    <Suspense fallback={null}>
                                        <CapacitorScene
                                            voltage={voltage}
                                            plateArea={plateArea}
                                            separation={separation}
                                            isClosed={isClosed}
                                            setIsClosed={setIsClosed}
                                            showFieldLines={showFieldLines}
                                            physics={physics}
                                            redProbePos={redProbePos}
                                            setRedProbePos={setRedProbePos}
                                            blackProbePos={blackProbePos}
                                            setBlackProbePos={setBlackProbePos}
                                        />
                                    </Suspense>
                                </Canvas>
                            </div>

                            {/* Controls */}
                            <div className="p-4 bg-slate-50 border-t border-slate-200">
                                <div className="flex items-center justify-between mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center gap-2">
                                            <Switch checked={showFieldLines} onCheckedChange={setShowFieldLines} />
                                            <Label className="text-slate-600 flex items-center gap-1">
                                                {showFieldLines ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                                خطوط المجال
                                            </Label>
                                        </div>
                                    </div>
                                    <Button variant="outline" onClick={resetSimulation} className="border-purple-300 text-purple-600 hover:bg-purple-50">
                                        <RotateCcw className="w-4 h-4 ml-2" />إعادة ضبط
                                    </Button>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4">
                                    <div className="space-y-2 bg-amber-50 p-3 rounded-lg border border-amber-200">
                                        <Label className="text-amber-700 font-semibold">🔋 جهد البطارية: {voltage}V</Label>
                                        <Slider value={[voltage]} onValueChange={([v]) => setVoltage(v)} min={10} max={100} step={5} />
                                    </div>
                                    <div className="space-y-2 bg-blue-50 p-3 rounded-lg border border-blue-200">
                                        <Label className="text-blue-700 font-semibold">📐 مساحة الصفائح: {plateArea}cm²</Label>
                                        <Slider value={[plateArea]} onValueChange={([v]) => setPlateArea(v)} min={50} max={200} step={10} />
                                    </div>
                                    <div className="space-y-2 bg-green-50 p-3 rounded-lg border border-green-200">
                                        <Label className="text-green-700 font-semibold">↕️ المسافة d: {separation}mm</Label>
                                        <Slider value={[separation]} onValueChange={([v]) => setSeparation(v)} min={1} max={20} step={1} />
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Instructions */}
                    <div className="mt-4 bg-white/80 backdrop-blur rounded-lg p-4 border border-purple-200">
                        <h3 className="font-bold text-purple-700 mb-2">🎮 التحكم بالمشهد 3D:</h3>
                        <ul className="text-sm text-slate-600 space-y-1">
                            <li>• <strong>تدوير:</strong> اسحب بالماوس (أو المس واسحب)</li>
                            <li>• <strong>تكبير/تصغير:</strong> عجلة الماوس (أو قرصة بإصبعين)</li>
                            <li>• <strong>إغلاق الدائرة:</strong> اضغط على المفتاح</li>
                        </ul>
                    </div>
                </div>

                {/* Measurements Panel */}
                <div>
                    <MeasurementsPanel physics={physics} plateArea={plateArea} separation={separation} />
                </div>
            </div>
        </div>
    );
}
